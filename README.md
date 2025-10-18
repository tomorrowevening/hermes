# Hermes

An extendable set of Web Tools controlled over a separate window for non-intereference with content (like a remote controller!)

Open the [Application](https://hermes-lovat.vercel.app/) and [editor](https://hermes-lovat.vercel.app/#editor) side-by-side.

## Setup

This example uses [React](https://react.dev/), [ThreeJS](https://threejs.org/), and [TheatreJS](https://theatrejs.com/), and will default to using `BroadcastChannel` instead of `WebSocket` for simplicity.

### Create an `Application`

An application isn't required, however it's nice to maintain multiple remotes. Alternatively, Remotes can be created independent.

The `CustomEditor` is used as a multi-view editor for [ThreeJS](https://threejs.org/), and should be limited to only the Editor app.

```
const IS_DEV = true;
const IS_EDITOR = IS_DEV && document.location.hash.search('editor') > -1;

export default function AppWrapper() {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const instance = new Application();
    instance.detectSettings(IS_DEV, IS_EDITOR).then(() => {
      // TheatreJS
      instance.addComponent('theatre', new RemoteTheatre(IS_DEV, IS_EDITOR));

      // ThreeJS
      const scenes: Map<string, any> = new Map();
      scenes.set('ExampleScene', ExampleScene); // extends Scene class
      const three = new RemoteThree('Hermes Example', IS_DEV, IS_EDITOR);
      three.scenes = scenes;
      instance.addComponent('three', three);

      // Ready
      setApp(instance);
    });
  }, []);

  return (
    <>
      {app !== null && (
        <>
          {IS_DEV && <RemoteSetup app={app} />}
          {IS_EDITOR && <CustomEditor app={app} />}
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
  three: RemoteThree
  theatre: RemoteTheatre
}

export default function RemoteSetup(props: RemoteProps) {
  // Remote Theatre setup
  props.theatre.studio = studio;
  props.theatre.handleEditorApp();

  return <SceneInspector three={props.three} />;
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
