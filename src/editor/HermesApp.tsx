import { ReactNode, useEffect, useState } from 'react';
import { Scene } from 'three';
import Application from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';
import ThreeEditor from './ThreeEditor';

type HermesAppProps = {
  /**
   * Application instance (with RemoteTheatre + RemoteThree already added as
   * components). Use a custom subclass like ExampleApplication to extend behaviour.
   */
  app: Application

  // ── Editor ───────────────────────────────────────────────────────────────

  /** Map of scene name → scene class, passed to MultiView */
  scenes: Map<string, any>
  /**
   * Called when MultiView instantiates a scene.
   * Defaults to: scene.setup(app, renderer); scene.init()
   */
  onSceneAdd?: (scene: any) => void
  /** Called every frame for the active scene */
  onSceneUpdate?: (scene: any) => void
  /** Called when MultiView resizes a scene */
  onSceneResize?: (scene: Scene, width: number, height: number) => void

  // ── App ──────────────────────────────────────────────────────────────────

  /**
   * Asset loading function. HermesApp waits for this to resolve before
   * rendering children. Omit if you don't need a loading gate.
   */
  onLoad?: (app: Application) => Promise<void>
  /** Shown while detectSettings or onLoad is pending */
  renderLoading?: ReactNode
  /** App content rendered after loading completes (not shown in editor mode) */
  children?: (app: Application) => ReactNode
}

/**
 * HermesApp — drop-in bootstrap for a Hermes-powered project.
 *
 * Receives an Application instance (or custom subclass) and handles
 * detectSettings, the loading gate, Theatre Studio initialisation, and
 * switching between editor and app rendering.
 *
 * @example
 * // Minimal app
 * const app = new Application(IS_DEV, IS_EDITOR);
 * <HermesApp app={app} onLoad={loadAssets}>
 *   {(app) => <MyCanvas app={app} />}
 * </HermesApp>
 *
 * @example
 * // Custom application subclass
 * const app = new ExampleApplication('My Project', IS_DEV, IS_EDITOR);
 * <HermesApp
 *   app={app}
 *   scenes={scenes}
 *   onSceneAdd={(scene, app, renderer) => { scene.setup(app, renderer); scene.init(); }}
 *   onSceneUpdate={(scene) => scene.update()}
 *   onLoad={loadAssets}
 * >
 *   {(app) => <MyCanvas app={app} />}
 * </HermesApp>
 */
export default function HermesApp(props: HermesAppProps) {
  const {
    app,
    scenes,
    onSceneAdd,
    onSceneUpdate,
    onSceneResize,
    onLoad,
    renderLoading = null,
    children,
  } = props;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    app.detectSettings().then(() => {
      if (onLoad) {
        onLoad(app).then(() => setReady(true));
      } else {
        setReady(true);
      }
    });
  }, []);

  if (!ready) return <>{renderLoading}</>;

  const three = app.components.get('three') as RemoteThree;

  if (app.editor) {
    return (
      <ThreeEditor
        three={three}
        scenes={scenes}
        onSceneAdd={onSceneAdd}
        onSceneUpdate={onSceneUpdate}
        onSceneResize={onSceneResize}
      />
    );
  }

  return <>{children?.(app)}</>;
}
