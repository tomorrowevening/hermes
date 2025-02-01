import { useEffect } from 'react';
import { AnimationMixer, SkeletonHelper } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
import InspectorGroup from '../InspectorGroup';
import { AnimationClipInfo, RemoteObject } from '../../types';
import MultiView from '@/editor/multiView/MultiView';
import { dispose } from '@/utils/three';
import { Application } from '@/core/Application';

type InspectAnimationProps = {
  app: Application
  object: RemoteObject;
  three: RemoteThree;
}

export default function InspectAnimation(props: InspectAnimationProps) {
  const object = props.object;
  const three = props.three;
  function expandedName(): string {
    return `${three.app.appID}_animation`;
  }

  const expandedValue = localStorage.getItem(expandedName());
  const expanded = expandedValue !== null ? expandedValue === 'open' : false;

  function saveExpanded(value: boolean) {
    localStorage.setItem(expandedName(), value ? 'open' : 'closed');
  }

  const items: any[] = [];
  const animations: any[] = [];
  let maxDuration = 0;
  object.animations.forEach((clipInfo: AnimationClipInfo) => {
    // Add animation
    maxDuration = Math.max(maxDuration, clipInfo.duration);
    if (clipInfo.duration > 0) {
      animations.push({
        title: clipInfo.name,
        items: [
          {
            title: 'Duration',
            type: 'number',
            value: clipInfo.duration,
            disabled: true,
          },
          {
            title: 'Blend Mode',
            type: 'option',
            disabled: true,
            options: [
              {
                title: 'Normal',
                value: 2500,
              },
              {
                title: 'Additive',
                value: 2501,
              },
            ],
          }
        ]
      });
    }
  });
  items.push({
    title: 'Animations',
    items: animations
  });

  let helper: SkeletonHelper | undefined = undefined;
  const scene = three.getScene(object.uuid);
  if (scene !== null) {
    const child = scene.getObjectByProperty('uuid', object.uuid);
    if (child !== undefined) {
      const mixer = child['mixer'] as AnimationMixer;
      const hasMixer = mixer !== undefined;
      if (hasMixer) {
        const mixerItems: any[] = [
          {
            title: 'Time Scale',
            type: 'range',
            value: mixer.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (_: string, value: any) => {
              mixer.timeScale = value;
              three.updateObject(object.uuid, 'mixer.timeScale', value);
            },
          },
        ];
        mixerItems.push({
          title: 'Stop All',
          type: 'button',
          onChange: () => {
            mixer.stopAllAction();
            three.requestMethod(object.uuid, 'stopAllAction', undefined, 'mixer');
          }
        });
        items.push({
          title: 'Mixer',
          items: mixerItems
        });

        helper = new SkeletonHelper(child);
        MultiView.instance?.scene.add(helper);
      }
    }
  }

  useEffect(() => {
    return () => {
      if (helper !== undefined) dispose(helper);
    };
  }, []);

  return (
    <InspectorGroup
      app={props.app}
      title='Animation'
      items={items}
      expanded={expanded}
      onToggle={(value: boolean) => {
        saveExpanded(value);
      }}
    />
  );
}
