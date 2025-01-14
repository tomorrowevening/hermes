import { Scene } from 'three';
import Editor from './Editor';
import MultiView from './multiView/MultiView';
import RemoteThree from '@/core/remote/RemoteThree';
import SidePanel from './sidePanel/SidePanel';
import Dropdown from './components/Dropdown';
import Draggable from './components/Draggable';

interface ThreeEditorProps {
  three: RemoteThree
  scenes: Map<string, any>
  onSceneSet?: (scene: Scene) => void
  onSceneUpdate?: (scene: Scene) => void
  onSceneResize?: (scene: Scene, width: number, height: number) => void
}

export default function ThreeEditor(props: ThreeEditorProps) {
  return (
    <Editor
      header={(
        <>
          <Dropdown
            title='Options'
            options={[
              {
                type: 'option',
                title: 'Option 1',
                value: 'Option 1',
              },
              {
                type: 'option',
                title: 'Option 2',
                value: 'Option 2',
              },
              {
                type: 'option',
                title: 'Option 3',
                value: 'Option 3',
              },
            ]}
            onSelect={(value: any) => {
              console.log('Option >', value);
            }}
          />
          <Draggable
            title='Draggable'
            options={[
              'Drag 1',
              'Drag 2',
              'Dragggggable 3',
              'Drag 4',
              'Drag 5',
            ]}
            onDragComplete={(options: string[]) => {
              console.log('Draggable >', options);
            }}
          />
        </>
      )}
    >
      <>
        <MultiView
          three={props.three}
          scenes={props.scenes}
          onSceneResize={props.onSceneResize}
          onSceneSet={props.onSceneSet}
          onSceneUpdate={props.onSceneUpdate}
        />
        <SidePanel three={props.three} />
      </>
    </Editor>
  );
}
