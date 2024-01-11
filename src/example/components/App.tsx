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
import SceneInspector from '../../editor/sceneHierarchy/inspector/SceneInspector';
import { debugDispatcher, ToolEvents } from '../../editor/global';
import MultiView from '../../editor/sceneHierarchy/inspector/MultiView/MultiView';

let renderer: WebGLRenderer;
let exampleScene: ExampleScene;

const useTweakpane = false;
const threeCameras: any[] = [];

function App() {
  const elementRef = useRef<HTMLDivElement>(null!);
  const [showSceneInspector, setShowSceneInspector] = useState(false);
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

  // ThreeJS
  useEffect(() => {
    renderer = new WebGLRenderer({ stencil: false });
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setClearColor(0x000000);
    elementRef.current.parentElement!.appendChild(renderer.domElement);

    exampleScene = new ExampleScene();
    threeCameras.push(exampleScene.camera);

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

      if (IS_DEV) {
        stats = new Stats();
        stats.init(renderer);
        document.body.appendChild(stats.dom);
      }
    }

    // Start RAF
    let raf = -1;

    const onResize = () => {
      let width = window.innerWidth;
      const height = window.innerHeight;
      if (app.editor) {
        width -= 300;
        renderer.setSize(width, height);
      } else {
        post.setSize(width, height);
      }
      exampleScene.resize(width, height);
    };

    const onUpdate = () => {
      exampleScene.update();
      if (IS_DEV) stats.begin();
      renderer.clear();
      post.render();
      if (IS_DEV) {
        stats.end();
        stats.update();
      }
      raf = requestAnimationFrame(onUpdate);
    };

    app.three.setScene(exampleScene);
    onResize();
    window.addEventListener('resize', onResize);
    if (!app.editor) onUpdate();
    setShowSceneInspector(true);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      cancelAnimationFrame(raf);
      raf = -1;
    };
  }, []);

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

      {IS_DEV && showSceneInspector && (
        <SceneInspector scene={exampleScene} three={app.three} />
      )}

      {IS_DEV && showSceneInspector && app.editor && (
        <MultiView scene={exampleScene} renderer={renderer} cameras={threeCameras} />
      )}
    </>
  );
}

export default App;