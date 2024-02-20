import { AnimationMixer } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
import InspectorGroup from '../InspectorGroup';
import { AnimationClipInfo, RemoteObject } from '../../types';

export default function InspectAnimation(obj: RemoteObject, three: RemoteThree) {
  const items: any[] = [];
  const animations: any[] = [];
  let maxDuration = 0;
  obj.animations.forEach((clipInfo: AnimationClipInfo) => {
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

  const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
  let hasMixer = false;
  if (child !== undefined) {
    const mixer = child['mixer'] as AnimationMixer;
    hasMixer = mixer !== undefined;
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
            three.updateObject(obj.uuid, 'mixer.timeScale', value);
          },
        },
      ];
      // animations.forEach((animation: any, index: number) => {
      //   if (obj.animations[index].duration > 0) {
      //     mixerItems.push({
      //       title: `Play: ${animation.title}`,
      //       type: 'button',
      //       onChange: () => {
      //         // Stop Previous
      //         mixer.stopAllAction();
      //         three.requestMethod(obj.uuid, 'stopAllAction', undefined, 'mixer');

      //         //
      //         const clip = child.animations[index] as AnimationClip;
      //         const action = mixer.clipAction(clip);
      //         action.play();
      //       }
      //     });
      //   }
      // });
      mixerItems.push({
        title: 'Stop All',
        type: 'button',
        onChange: () => {
          mixer.stopAllAction();
          three.requestMethod(obj.uuid, 'stopAllAction', undefined, 'mixer');
        }
      });
      items.push({
        title: 'Mixer',
        items: mixerItems
      });
    }
  }
  return (
    <InspectorGroup title='Animation' items={items} />
  );
}
