// Libs
import { useEffect, useRef } from 'react';
// Components
import RemoteThree from '../../core/remote/RemoteThree';
// Three
import ExampleApplication from '../three/ExampleApplication';
import BaseScene from '../three/scenes/BaseScene';
import Scene1 from '../three/scenes/Scene1';
import Scene2 from '../three/scenes/Scene2';
import Scene3 from '../three/scenes/Scene3';
// Utils
import { dispose } from '../../utils/three';
import { clearComposerGroups } from '../../utils/post';

type AppProps = {
  app: ExampleApplication
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
    app.init(canvas).then(() => {
      console.log('Renderer ready');
    });

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      currentSceneRef.current?.resize(width, height);
      app.three.renderer?.setSize(width, height);
    };

    const updateApp = () => {
      currentSceneRef.current?.update();
      currentSceneRef.current?.draw();
    };

    app.three.renderer?.setAnimationLoop(updateApp);
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
      clearComposerGroups(three);
    }
    if (sceneNameRef.current === 'scene1') {
      currentSceneRef.current = new Scene1();
    } else if (sceneNameRef.current === 'scene2') {
      currentSceneRef.current = new Scene2();
    } else {
      currentSceneRef.current = new Scene3();
    }
    currentSceneRef.current.setup(app, app.three.renderer!);
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
