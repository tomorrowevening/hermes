// Libs
import React, { useEffect, useRef, useState } from 'react';
import { types } from '@theatre/core';
import { WebGLRenderer } from 'three';
import Stats from 'stats-gl';
// Models
import { app, IS_DEV } from '../constants';
// Components
import './App.css';
import BaseScene from '../three/BaseScene';
import Scene1 from '../three/Scene1';
import Scene2 from '../three/Scene2';
import { debugDispatcher, ToolEvents } from '../../editor/global';
import { loadAssets } from '../three/loader';
import { dispose } from '../../editor/utils';
import SceneInspector from '../../editor/sidePanel/inspector/SceneInspector';

let renderer: WebGLRenderer;
let currentScene: BaseScene;

const useTweakpane = false;

function App() {
  const elementRef = useRef<HTMLDivElement>(null!);
  const [loaded, setLoaded] = useState(false);

  // Theatre
  useEffect(() => {
    if (app.theatre === undefined) return;
    const container = elementRef.current!;
    container.style.visibility = app.editor ? 'hidden' : 'inherit';

    // Theatre Example
    app.theatre.sheet('App');
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
    
    let stats: Stats;
    if (!app.editor) {
      stats = new Stats();
      stats.init(renderer);
      document.body.appendChild(stats.dom);
    }

    // Start RAF
    let raf = -1;

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      currentScene?.resize(width, height);
      renderer.setSize(width, height);
    };

    const updateApp = () => {
      currentScene?.update();
      stats.begin();
      renderer.clear();
      currentScene?.draw();
      stats.end();
      stats.update();
      raf = requestAnimationFrame(updateApp);
    };

    if (!app.editor) {
      window.addEventListener('resize', onResize);
      onResize();
      updateApp();
    }

    return () => {
      if (currentScene !== undefined) {
        app.three.removeCamera(currentScene.camera);
        dispose(currentScene);
      }
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

  const createScene = (newScene: BaseScene) => {
    if (currentScene !== undefined) {
      if (currentScene.camera !== undefined) app.three.removeCamera(currentScene.camera);
      dispose(currentScene);
    }
    currentScene = newScene;
    currentScene.resize(window.innerWidth, window.innerHeight);
    app.three.setScene(currentScene);
    app.three.addCamera(currentScene.camera);
  };

  const createScene1 = () => {
    createScene(new Scene1(renderer));
  };

  const createScene2 = () => {
    createScene(new Scene2(renderer));
  };

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
      {!loaded && <p>Loading...</p>}
      <div id='box' ref={elementRef}>
        <button onClick={() => {
          app.send({
            target: 'editor',
            event: 'custom',
            data: 'hello editor!'
          });
        }}>Click</button>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
      }}>
        <button onClick={createScene1}>Scene 1</button>
        <button onClick={createScene2}>Scene 2</button>
      </div>

      {IS_DEV && (
        <SceneInspector three={app.three} />
      )}
    </>
  );
}

export default App;