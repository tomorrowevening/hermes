# Hermes

An extendable set of Web Tools controlled over a separate window for non-intereference with content (like a remote controller!)

Open the [Application](https://hermes-lovat.vercel.app/) and [editor](https://hermes-lovat.vercel.app/#editor) side-by-side.

## Setup

This example uses [React](https://react.dev/), [ThreeJS](https://threejs.org/), and [TheatreJS](https://theatrejs.com/), and will default to using `BroadcastChannel` instead of `WebSocket` for simplicity.

### Create an `Application`

This acts as the Remote Controller between all components.

The `CustomEditor` is used as a multi-view editor for [ThreeJS](https://threejs.org/), and should be limited to only the Editor app.

```
export default function AppWrapper() {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const IS_DEV = true;
    const IS_EDITOR = IS_DEV && document.location.hash.search('editor') > -1;
    const instance = new Application('My App');
    instance.detectSettings(IS_DEV, IS_EDITOR).then(() => {
      if (IS_DEV) instance.setupRemote();
      instance.addComponent('theatre', new RemoteTheatre(instance));
      instance.addComponent('three', new RemoteThree(instance));
      setApp(instance);
    });
  }, []);

  return (
    <>
      {app !== null && (
        <>
          {app.debugEnabled && <RemoteSetup app={app} />}
          {app.editor && <CustomEditor app={app} />}
          <Wrapper app={app} />
        </>
      )}
    </>
  );
}
```

### Custom remote commands

This component is added only in debug-mode to add extra support for remote-components.

In this example it's added to add custom Remote Component support for:

- [ThreeJS](https://threejs.org/) - `SceneInspector` communicates with the Multi-view editor
- [TheatreJS](https://theatrejs.com/) - Communicates with the `studio` instance

```
type RemoteProps = {
  app: Application
}

export default function RemoteSetup(props: RemoteProps) {
  const app = props.app;
  const three = app.components.get('three') as RemoteThree;

  // Remote Theatre setup
  const theatre = app.components.get('theatre') as RemoteTheatre;
  theatre.studio = studio;
  theatre.handleEditorApp();

  // Custom component support (optional)
  app.addComponent('components', new RemoteComponents(app));

  return (
    <>
      {app.debugEnabled ? <SceneInspector app={app} three={three} /> : null}
    </>
  );
}
```

## Editor

### Tools for:

- Customizable Navigation Dropdowns + Draggable components for Triggers/Event Dispatching
- [TheatreJS](https://www.theatrejs.com/)
- [ThreeJS](https://threejs.org/)
- Custom ThreeJS Scene + Object Inspector

### ThreeJS Editor

| Action | Keys |
| ------ | ------ |
| Zoom to Selected Item | CTRL + 0 |
| Rotate to Front of Selected Item | CTRL + 1 |
| Rotate to Top of Selected Item | CTRL + 2 |
| Rotate to Right of Selected Item | CTRL + 3 |
| Rotate to Back of Selected Item | CTRL + 4 |
| Set Transform Controls to Rotate | r |
| Set Transform Controls to Scale | s |
| Set Transform Controls to Translate | t |
| Toggles Transform Controls between **world** and **local** | q |

### Side Panel

Holding down the **CTRL** key while dragging a number's label will multiply the delta by 10

![Drag Multiplier](images/dragMultiplier.gif)

### Assets

Animation / Models found at [Mixamo](https://www.mixamo.com/)
