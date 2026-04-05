// Libs
import studio from '@tomorrowevening/theatre-studio';
// Models
import { IS_DEV, IS_EDITOR } from '../constants';
import Application from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
//
import HermesApp from '../../editor/HermesApp';
import App from './App';
import CustomEditor from '../CustomEditor';
import ExampleApplication from '../three/ExampleApplication';
import BaseScene from '../three/scenes/BaseScene';
import Scene1 from '../three/scenes/Scene1';
import Scene2 from '../three/scenes/Scene2';
import Scene3 from '../three/scenes/Scene3';
import RTTScene from '../three/scenes/RTTScene';
import { loadAssets } from '../three/loader';

const scenes = new Map<string, any>([
  ['Scene1', Scene1],
  ['Scene2', Scene2],
  ['Scene3', Scene3],
  ['RTTScene', RTTScene],
]);

const app = new ExampleApplication('Hermes Example', IS_DEV, IS_EDITOR);
if (IS_DEV && IS_EDITOR && studio) {
  studio.initialize();
  const theatre = app.components.get('theatre') as RemoteTheatre;
  theatre.studio = studio;
  theatre.handleEditorApp();
}

export default function AppWrapper() {
  return (
    <HermesApp
      app={app}
      scenes={scenes}
      onSceneAdd={(scene, _app, renderer) => {
        scene.setup(_app, renderer);
        scene.init();
      }}
      onSceneUpdate={(scene) => {
        (scene as BaseScene).update();
      }}
      renderEditor={(_app) => <CustomEditor app={_app} />}
      onLoad={loadAssets}
    >
      {(_app: Application) => <App app={_app} />}
    </HermesApp>
  );
}
