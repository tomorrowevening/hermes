// Libs
import { Suspense, lazy } from 'react';
import studio from '@tomorrowevening/theatre-studio';
// Models
import { IS_DEV, IS_EDITOR } from '../constants';
import Application from '../../core/Application';
//
import HermesApp from '../../editor/HermesApp';
import App from './App';
import ExampleApplication from '../three/ExampleApplication';
import BaseScene from '../three/scenes/BaseScene';
import Scene2 from '../three/scenes/Scene2';
import Scene3 from '../three/scenes/Scene3';
import RTTScene from '../three/scenes/RTTScene';
import { loadAssets } from '../three/loader';

const app = new ExampleApplication('Hermes Example', IS_DEV, IS_EDITOR);

//////////////////////////////////////////////////
// Debug

const scenes = new Map<string, any>([
  ['Scene2', Scene2],
  ['Scene3', Scene3],
  ['RTTScene', RTTScene],
]);

const ThreeEditor = (IS_DEV && IS_EDITOR)
  ? lazy(() => import('../../editor/ThreeEditor'))
  : null;

if (IS_DEV) {
  if (IS_EDITOR) {
    if (studio) {
      studio.initialize();
      app.theatre.studio = studio;
      app.theatre.handleEditorApp();
    }
  } else {
    import('../../editor/sidePanel/utils').then(({ EDITOR_UTILS }) => {
      app.three.setEditorUtils(EDITOR_UTILS);
    });
  }
}

export default function AppWrapper() {
  return (
    <HermesApp
      app={app}
      onLoad={loadAssets}
      renderEditor={ThreeEditor ? (three) => (
        <Suspense fallback={null}>
          <ThreeEditor
            three={three}
            scenes={scenes}
            onSceneAdd={(scene) => {
              (scene as BaseScene).setup(app);
              (scene as BaseScene).init();
            }}
            onSceneUpdate={(scene) => {
              (scene as BaseScene).update();
            }}
          />
        </Suspense>
      ) : undefined}
    >
      {(_app: Application) => <App app={_app} />}
    </HermesApp>
  );
}
