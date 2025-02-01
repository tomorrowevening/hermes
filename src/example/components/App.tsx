// Libs
import React, { useEffect, useRef } from 'react';
import { types } from '@theatre/core';
import { WebGLRenderer } from 'three';
import Stats from 'stats-gl';
// Models
import Application, { ToolEvents } from '../../core/Application';
import { IS_DEV } from '../constants';
// Components
import BaseScene from '../three/scenes/BaseScene';
import Scene1 from '../three/scenes/Scene1';
import Scene2 from '../three/scenes/Scene2';
import { detectSettings } from '../../utils/detectSettings';
import { dispose } from '../../utils/three';
import SceneInspector from '../../editor/sidePanel/inspector/SceneInspector';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';

let renderer: WebGLRenderer;
let currentScene: BaseScene;
let sceneName = '';

type AppProps = {
  app: Application
}

function App(props: AppProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const theatre = props.app.components.get('theatre') as RemoteTheatre;
  const three = props.app.components.get('three') as RemoteThree;

  // Theatre
  useEffect(() => {
    const container = elementRef.current!;
    container.style.visibility = props.app.editor ? 'hidden' : 'inherit';

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
      props.app.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      detectSettings(canvas).then((settings) => console.log('Settings', settings));
    }
  }, []);

  // Renderer setup
  if (props.app.isApp) {
    useEffect(() => {
      const canvas = canvasRef.current!;
      renderer = new WebGLRenderer({
        canvas,
        stencil: false
      });
      renderer.autoClear = false;
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(devicePixelRatio);
      renderer.setClearColor(0x000000);
      three.setRenderer(renderer, canvas);
      return () => {
        renderer.dispose();
      };
    }, []);
  }

  // ThreeJS
  if (props.app.isApp) {
    useEffect(() => {
      const stats = new Stats();
      stats.init(renderer);
      document.body.appendChild(stats.dom);
  
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
        currentScene?.draw();
        stats.end();
        stats.update();
        raf = requestAnimationFrame(updateApp);
      };
  
      window.addEventListener('resize', onResize);
      onResize();
      updateApp();
  
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
  }

  // Load the scenes

  const createScene = () => {
    if (currentScene !== undefined) {
      if (currentScene.camera !== undefined) three.removeCamera(currentScene.camera);
      three.removeScene(currentScene);
      dispose(currentScene);
    }
    if (sceneName === 'scene1') {
      currentScene = new Scene1();
    } else {
      currentScene = new Scene2();
    }
    currentScene.setup(props.app, renderer);
    currentScene.init();
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
      container.style.visibility = props.app.editor ? 'hidden' : 'inherit';

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
      props.app.addEventListener(ToolEvents.CUSTOM, onCustom);
      props.app.addEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown);
      return () => {
        props.app.removeEventListener(ToolEvents.CUSTOM, onCustom);
        props.app.removeEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown);
      };
    }, []);
  }

  return (
    <>
      {props.app.isApp && <canvas ref={canvasRef} />}

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

      {props.app.isApp && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
        }}>
          <button onClick={createScene1}>Scene 1</button>
          <button onClick={createScene2}>Scene 2</button>
        </div>
      )}

      {IS_DEV && <SceneInspector app={props.app} three={three} />}
    </>
  );
}

export default App;