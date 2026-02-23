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

let renderer: WebGLRenderer | WebGPURenderer;
let currentScene: BaseScene;
let sceneName = '';

type AppProps = {
  app: Application
}

let rendererReady = false;

function App(props: AppProps) {
  const app = props.app;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const three = props.app.components.get('three') as RemoteThree;

  console.log('Settings', app.settings);

  // Renderer setup
  if (app.isApp) {
    useEffect(() => {
      const canvas = canvasRef.current!;
      // TODO - Add WebGPU support
      const useWebGPU = true;
      if (useWebGPU) {
        renderer = new WebGPURenderer({
          canvas,
          stencil: false
        });
      } else {
        renderer = new WebGLRenderer({
          canvas,
          stencil: false
        });
        rendererReady = true;
      }
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(devicePixelRatio);
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
  
      // Start RAF
      let raf = -1;
  
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
        raf = requestAnimationFrame(updateApp);
      };
  
      window.addEventListener('resize', onResize);
      onResize();
      updateApp();

      // Dispose
      return () => {
        if (currentScene !== undefined) {
          three.removeCamera(currentScene.camera);
          three.removeScene(currentScene);
          dispose(currentScene);
        }
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(raf);
        raf = -1;
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
            <button onClick={createScene1}>Scene 1</button>
            <button onClick={createScene2}>Scene 2</button>
            <button onClick={createScene3}>Scene 3</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;