// Libs
import React, { useEffect, useRef } from 'react';
import { types } from '@theatre/core';
import { WebGLRenderer } from 'three';
import Stats from 'stats-gl';
// Models
import { app, IS_DEV } from '../constants';
// Components
import BaseScene from '../three/scenes/BaseScene';
import Scene1 from '../three/scenes/Scene1';
import Scene2 from '../three/scenes/Scene2';
import { debugDispatcher, ToolEvents } from '../../editor/global';
import { dispose } from '../../editor/utils';
import SceneInspector from '../../editor/sidePanel/inspector/SceneInspector';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import RemoteTweakpane from '../../core/remote/RemoteTweakpane';

let renderer: WebGLRenderer;
let currentScene: BaseScene;
let sceneName = '';

const useTweakpane = false;

app.editor = IS_DEV && document.location.hash.search('editor') > -1;

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const theatre = app.components.get('theatre') as RemoteTheatre;
  const three = app.components.get('three') as RemoteThree;
  const debug = app.components.get('debug') as RemoteTweakpane;

  // Theatre
  useEffect(() => {
    if (theatre === undefined) return;

    const container = elementRef.current!;
    container.style.visibility = app.editor ? 'hidden' : 'inherit';

    // Theatre Example
    theatre.sheet('App');
    const sheetObj = theatre?.sheetObject(
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
      if (sheetObj !== undefined) theatre?.unsubscribe(sheetObj);
      app.dispose();
    };
  }, []);

  // Renderer setup
  if (!app.editor) {
    useEffect(() => {
      renderer = new WebGLRenderer({
        canvas: canvasRef.current!,
        stencil: false
      });
      renderer.autoClear = false;
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(devicePixelRatio);
      renderer.setClearColor(0x000000);
      three.renderer = renderer;
      return () => {
        renderer.dispose();
      };
    }, []);
  }

  // ThreeJS
  useEffect(() => {
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
      RemoteTheatre.rafDriver?.tick(performance.now());
      currentScene?.update();
      stats.begin();
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
        three.removeCamera(currentScene.camera);
        three.removeScene(currentScene);
        dispose(currentScene);
      }
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      raf = -1;
    };
  }, []);

  // Load the scenes

  const createScene = () => {
    if (currentScene !== undefined) {
      if (currentScene.camera !== undefined) three.removeCamera(currentScene.camera);
      three.removeScene(currentScene);
      dispose(currentScene);
    }
    if (sceneName === 'scene1') {
      currentScene = new Scene1(renderer);
    } else {
      currentScene = new Scene2(renderer);
    }
    currentScene.resize(window.innerWidth, window.innerHeight);
  };

  const createScene1 = () => {
    if (sceneName === 'scene1') return;
    sceneName = 'scene1';
    createScene();
  };

  const createScene2 = () => {
    if (sceneName === 'scene2') return;
    sceneName = 'scene2';
    createScene();
  };

  // Debug Components
  if (IS_DEV) {
    useEffect(() => {
      const container = elementRef.current!;
      container.style.visibility = app.editor ? 'hidden' : 'inherit';

      // Tweakpane Example
      if (useTweakpane) {
        const testFolder = debug.addFolder('Test Folder');

        debug.button('Test Button', () => {
          console.log('Test button works!');
        }, testFolder);

        const test = { opacity: 1, rotation: 0 };
        debug.bind(test, 'opacity', {
          min: 0,
          max: 1,
          onChange: (value: number) => {
            container.style.opacity = value.toFixed(2);
          }
        }, testFolder);

        debug.bind(test, 'rotation', {
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
        const scene = evt.value.value;
        if (scene === 'scene1') {
          createScene1();
        } else if (scene === 'scene2') {
          createScene2();
        }
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
      {app.isApp && <canvas ref={canvasRef} />}

      <div id='box' ref={elementRef}>
        <button onClick={() => {
          // app.send({
          //   target: 'editor',
          //   event: 'custom',
          //   data: 'hello editor!'
          // });
          theatre.playSheet('Scene1');
        }}>Click</button>
      </div>

      {app.isApp && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
        }}>
          <button onClick={createScene1}>Scene 1</button>
          <button onClick={createScene2}>Scene 2</button>
        </div>
      )}

      {IS_DEV && <SceneInspector three={three} />}
    </>
  );
}

export default App;