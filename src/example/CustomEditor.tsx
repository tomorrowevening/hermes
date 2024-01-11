import React from 'react';
import { app } from './constants';
import Editor from '../editor/Editor';
import Dropdown from '../editor/components/Dropdown';
import SceneHierarchy from '../editor/sceneHierarchy/SceneHierarchy';
import MultiView from '../editor/multiView/MultiView';

export default function CustomEditor() {
  return (
    <Editor
      header={[
        <Dropdown
          title="Scenes"
          key="Scenes"
          options={[
            {
              type: 'option',
              title: 'Scene 1',
              value: 'scene1',
            },
            {
              type: 'option',
              title: 'Scene 2',
              value: 'scene2',
            },
          ]}
          onSelect={(value: string) => {
            app.send({
              target: 'app',
              event: 'selectComponent',
              data: {
                dropdown: 'Scenes',
                value,
              },
            });
          }}
        />
      ]}>
        <SceneHierarchy three={app.three} />
        <MultiView three={app.three} />
      </Editor>
  );
}
