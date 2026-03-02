// Libs
import { useEffect, useRef } from 'react';
import { WebGLRenderer } from 'three';
import { WebGPURenderer } from 'three/webgpu';
import Stats from 'stats-gl';
// Models
import Application from '../../core/Application';
// Components
import RemoteThree from '../../core/remote/RemoteThree';
// Three
import BaseScene from '../three/scenes/BaseScene';
import Scene1 from '../three/scenes/Scene1';
import Scene2 from '../three/scenes/Scene2';
import Scene3 from '../three/scenes/Scene3';
// Utils
import { dispose } from '../../utils/three';
import { clearComposerGroups } from '../../utils/post';
import { Inspector } from 'three/examples/jsm/inspector/Inspector.js';

let renderer: WebGLRenderer | WebGPURenderer;
let currentScene: BaseScene;
let sceneName = '';

type AppProps = {
  app: Application
}

let rendererReady = false;
const useWebGPU = true;

function App(props: AppProps) {
  const app = props.app;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const three = props.app.components.get('three') as RemoteThree;

  console.log('Settings', app.settings);

  // Renderer setup
  if (app.isApp) {
    useEffect(() => {
      const canvas = canvasRef.current!;
      const params = {
        canvas,
        stencil: false,
      };
      if (useWebGPU) {
        renderer = new WebGPURenderer(params);
        renderer.inspector = new Inspector();
      } else {
        renderer = new WebGLRenderer(params);
        rendererReady = true;
      }
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(Math.min(1.5, devicePixelRatio));
      renderer.setClearColor(0x000000);
      three.setRenderer(renderer, canvas);

      if (useWebGPU) {
        (renderer as WebGPURenderer).init().then(() => {
          rendererReady = true;
        });
      }

      // ThreeJS
      const stats = new Stats();
      stats.init(renderer);
      document.body.appendChild(stats.dom);
  
      const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        currentScene?.resize(width, height);
        renderer.setSize(width, height);
      };
  
      const updateApp = () => {
        if (rendererReady) {
          currentScene?.update();
          currentScene?.draw();
        }
        stats.update();
      };
  
      renderer.setAnimationLoop(updateApp);
      window.addEventListener('resize', onResize);
      onResize();

      // Dispose
      return () => {
        if (currentScene !== undefined) {
          three.removeCamera(currentScene.camera);
          three.removeScene(currentScene);
          dispose(currentScene);
        }
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      };
    }, []);
  }

  // Load the scenes

  const createScene = () => {
    if (currentScene !== undefined) {
      if (currentScene.camera !== undefined) three.removeCamera(currentScene.camera);
      three.removeScene(currentScene);
      dispose(currentScene);
      clearComposerGroups(three);
    }
    if (sceneName === 'scene1') {
      currentScene = new Scene1();
    } else if (sceneName === 'scene2') {
      currentScene = new Scene2();
    } else {
      currentScene = new Scene3();
    }
    currentScene.setup(app, renderer);
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

  const createScene3 = () => {
    if (sceneName === 'scene3') return;
    sceneName = 'scene3';
    createScene();
  };

  return (
    <>
      {app.isApp && (
        <>
          <canvas ref={canvasRef} />
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
          }}>
            {!useWebGPU && <button onClick={createScene1}>WebGL</button>}
            <button onClick={createScene2}>WebGPU 1</button>
            {useWebGPU && <button onClick={createScene3}>WebGPU 2</button>}
          </div>
        </>
      )}
    </>
  );
}

export default App;