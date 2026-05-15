// Libs
import { useEffect, useRef } from 'react';
import { WebGPURenderer } from 'three/webgpu';
import { Inspector } from 'three/examples/jsm/inspector/Inspector.js';
// Models
import Application from '../../core/Application';
// Components
import RemoteThree from '../../core/remote/RemoteThree';
// Three
import BaseScene from '../three/scenes/BaseScene';
import Scene2 from '../three/scenes/Scene2';
import Scene3 from '../three/scenes/Scene3';
// Utils
import { dispose } from '../../utils/three';
import { IS_DEV, IS_EDITOR } from '../constants';

type AppProps = {
  app: Application
}

const useWebGPU = true;

function App(props: AppProps) {
  const app = props.app;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const three = props.app.components.get('three') as RemoteThree;

  const currentSceneRef = useRef<BaseScene | undefined>(undefined);
  const sceneNameRef = useRef('');

  // Renderer setup
  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = new WebGPURenderer({ canvas, stencil: false });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(Math.min(1.5, devicePixelRatio));
    renderer.setClearColor(0x000000);
    if (IS_DEV && !IS_EDITOR) renderer.inspector = new Inspector();
    three.setRenderer(renderer, canvas);

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      currentSceneRef.current?.resize(width, height);
      renderer.setSize(width, height);
    };

    const updateApp = () => {
      currentSceneRef.current?.update();
      currentSceneRef.current?.draw();
    };

    renderer.init().then(() => {
      renderer.setAnimationLoop(updateApp);
    });

    window.addEventListener('resize', onResize);
    onResize();

    // Dispose
    return () => {
      if (currentSceneRef.current !== undefined) {
        three.removeCamera(currentSceneRef.current.camera);
        three.removeScene(currentSceneRef.current);
        dispose(currentSceneRef.current);
      }
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Load the scenes

  const createScene = () => {
    if (currentSceneRef.current !== undefined) {
      if (currentSceneRef.current.camera !== undefined) three.removeCamera(currentSceneRef.current.camera);
      three.removeScene(currentSceneRef.current);
      dispose(currentSceneRef.current);
    }
    if (sceneNameRef.current === 'scene2') {
      currentSceneRef.current = new Scene2();
    } else {
      currentSceneRef.current = new Scene3();
    }
    currentSceneRef.current.setup(app);
    currentSceneRef.current.init();
    currentSceneRef.current.resize(window.innerWidth, window.innerHeight);
  };

  const createScene1 = () => {
    if (sceneNameRef.current === 'scene1') return;
    sceneNameRef.current = 'scene1';
    createScene();
  };

  const createScene2 = () => {
    if (sceneNameRef.current === 'scene2') return;
    sceneNameRef.current = 'scene2';
    createScene();
  };

  const createScene3 = () => {
    if (sceneNameRef.current === 'scene3') return;
    sceneNameRef.current = 'scene3';
    createScene();
  };

  return (
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
  );
}

export default App;
