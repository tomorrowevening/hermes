// Libs
import React, { useEffect, useRef, useState } from 'react';
import { types } from '@theatre/core';
import { WebGLRenderer } from 'three';
import { BlendFunction, EffectComposer, EffectPass, FXAAEffect, NoiseEffect, RenderPass, TiltShiftEffect, VignetteEffect } from 'postprocessing';
import Stats from 'stats-gl';
// Models
import { app, IS_DEV } from '../constants';
// Components
import './App.css';
import ExampleScene from '../three/ExampleScene';
import { debugDispatcher, ToolEvents } from '../../editor/global';
import { loadAssets } from '../three/loader';
import { dispose } from '../../editor/utils';
import SceneInspector from '../../editor/sidePanel/inspector/SceneInspector';

let renderer: WebGLRenderer;
let exampleScene: ExampleScene;

const useTweakpane = false;

function App() {
  const elementRef = useRef<HTMLDivElement>(null!);
  const [loaded, setLoaded] = useState(false);
  app.theatre?.sheet('App');

  // Theatre
  useEffect(() => {
    const container = elementRef.current!;
    container.style.visibility = app.editor ? 'hidden' : 'inherit';

    // Theatre Example
    const sheetObj = app.theatre?.sheetObject(
      'App',
      'Box',
      {
        x: types.number(100, {range: [0, window.innerWidth]}),
        y: types.number(100, {range: [0, window.innerHeight]}),
      },
      (values: any) => {
        container.style.left = `${values.x}px`;
        container.style.top = `${values.y}px`;
      },
    );
    return () => {
      if (sheetObj !== undefined) app.theatre?.unsubscribe(sheetObj);
      app.dispose();
    };
  }, []);

  // Renderer setup
  if (!app.editor) {
    useEffect(() => {
      renderer = new WebGLRenderer({ stencil: false });
      renderer.autoClear = false;
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(devicePixelRatio);
      renderer.setClearColor(0x000000);
      elementRef.current.parentElement!.appendChild(renderer.domElement);
      return () => {
        renderer.dispose();
      };
    }, []);
  }

  // ThreeJS
  useEffect(() => {
    if (!loaded) return;
    exampleScene = new ExampleScene();

    let post: EffectComposer;
    let stats: Stats;
    if (!app.editor) {
      post = new EffectComposer(renderer);
      post.addPass(new RenderPass(exampleScene, exampleScene.camera));

      const fxaaEffect = new FXAAEffect();
      fxaaEffect.minEdgeThreshold = 0.01;
      post.addPass(new EffectPass(exampleScene.camera, fxaaEffect));
      
      const blur = new TiltShiftEffect({
        focusArea: 0.6
      });
      post.addPass(new EffectPass(exampleScene.camera, blur));

      const noiseEffect = new NoiseEffect({});
      noiseEffect.blendMode.opacity.value = 0.33;
      noiseEffect.blendMode.blendFunction = BlendFunction.MULTIPLY;
      const vignette = new VignetteEffect({});
      post.addPass(new EffectPass(exampleScene.camera, noiseEffect, vignette));

      stats = new Stats();
      stats.init(renderer);
      document.body.appendChild(stats.dom);
    }

    // Start RAF
    let raf = -1;

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      post.setSize(width, height);
      exampleScene.resize(width, height);
    };

    const updateApp = () => {
      exampleScene.update();
      stats.begin();
      renderer.clear();
      post.render();
      stats.end();
      stats.update();
      raf = requestAnimationFrame(updateApp);
    };

    const updateEditor = () => {
      exampleScene.update();
      raf = requestAnimationFrame(updateEditor);
    };

    app.three.setScene(exampleScene);
    app.three.addCamera(exampleScene.camera);

    if (app.editor) {
      updateEditor();
    } else {
      window.addEventListener('resize', onResize);
      onResize();
      updateApp();
    }

    return () => {
      app.three.removeCamera(exampleScene.camera);
      dispose(exampleScene);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      raf = -1;
    };
  }, [loaded]);

  // Preload
  useEffect(() => {
    loadAssets()
      .then(() => {
        setLoaded(true);
      })
      .catch(() => {
        console.log('Error loading files...');
      });
  }, [setLoaded]);

  // Debug Components
  if (IS_DEV) {
    useEffect(() => {
      const container = elementRef.current!;
      container.style.visibility = app.editor ? 'hidden' : 'inherit';

      // Tweakpane Example
      if (useTweakpane) {
        const testFolder = app.debug.addFolder('Test Folder');

        app.debug.button('Test Button', () => {
          console.log('Test button works!');
        }, testFolder);

        const test = { opacity: 1, rotation: 0 };
        app.debug.bind(test, 'opacity', {
          min: 0,
          max: 1,
          onChange: (value: number) => {
            container.style.opacity = value.toFixed(2);
          }
        }, testFolder);

        app.debug.bind(test, 'rotation', {
          min: 0,
          max: 360,
          onChange: (value: number) => {
            container.style.transform = `rotate(${value}deg)`;
          }
        }, testFolder);
      }

      // Components Example
      const onCustom = (evt: any) => {
        console.log('Custom:', evt.value);
      };
      const selectDropdown = (evt: any) => {
        console.log(`Dropdown: ${evt.value.dropdown}, value: ${evt.value.value}`);
      };
      debugDispatcher.addEventListener(ToolEvents.CUSTOM, onCustom);
      debugDispatcher.addEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown);
      return () => {
        debugDispatcher.removeEventListener(ToolEvents.CUSTOM, onCustom);
        debugDispatcher.removeEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown);
      };
    }, []);
  }

  return (
    <>
      <div id='box' ref={elementRef}>
        <button onClick={() => {
          app.send({
            target: 'editor',
            event: 'custom',
            data: 'hello editor!'
          });
        }}>Click</button>
      </div>

      {IS_DEV && (
        <SceneInspector three={app.three} />
      )}
    </>
  );
}

export default App;