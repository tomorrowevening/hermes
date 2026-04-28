import { ReactNode, useEffect, useState } from 'react';
import Application from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';

type HermesAppProps = {
  /**
   * Application instance (with RemoteTheatre + RemoteThree already added as
   * components). Use a custom subclass like ExampleApplication to extend behaviour.
   */
  app: Application

  // ── Editor ───────────────────────────────────────────────────────────────

  /**
   * Render prop for the editor UI. Receives the RemoteThree instance.
   * Only called when app.editor is true. Omitting this prop means ThreeEditor
   * is never imported, keeping it out of your production bundle entirely.
   *
   * @example
   * import ThreeEditor from '@tomorrowevening/hermes/editor/ThreeEditor';
   * <HermesApp
   *   app={app}
   *   renderEditor={(three) => <ThreeEditor three={three} scenes={scenes} />}
   * />
   */
  renderEditor?: (three: RemoteThree) => ReactNode

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
 * Handles detectSettings, the loading gate, and switching between editor
 * and app rendering. The editor UI is supplied via renderEditor so that
 * ThreeEditor (and all its deps) are only bundled in projects that
 * explicitly import and pass it.
 *
 * @example
 * // App only (no editor in bundle)
 * <HermesApp app={app} onLoad={loadAssets}>
 *   {(app) => <MyCanvas app={app} />}
 * </HermesApp>
 *
 * @example
 * // With editor (dev builds only)
 * import ThreeEditor from '@tomorrowevening/hermes/editor/ThreeEditor';
 * <HermesApp
 *   app={app}
 *   renderEditor={(three) => (
 *     <ThreeEditor three={three} scenes={scenes} onSceneAdd={onSceneAdd} />
 *   )}
 *   onLoad={loadAssets}
 * >
 *   {(app) => <MyCanvas app={app} />}
 * </HermesApp>
 */
export default function HermesApp(props: HermesAppProps) {
  const {
    app,
    renderEditor,
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

  if (app.editor && renderEditor) {
    const three = app.components.get('three') as RemoteThree;
    return <>{renderEditor(three)}</>;
  }

  return <>{children?.(app)}</>;
}
