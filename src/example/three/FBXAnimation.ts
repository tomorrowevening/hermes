import { AnimationMixer, Object3D } from 'three';
// @ts-ignore
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { models } from './loader';

export default class FBXAnimation extends Object3D {
  private mixer: AnimationMixer;

  constructor(name: string) {
    super();
    this.name = name;
    this.scale.setScalar(0.5);

    const model = models.get(name)!;
    const modelInstance = clone(model);
    this.add(modelInstance);

    this.mixer = new AnimationMixer(modelInstance);
    modelInstance['mixer'] = this.mixer;
    const action = this.mixer.clipAction(modelInstance.animations[0]);
    action.play();
  }

  update(delta: number) {
    this.mixer.update(delta);
  }
}
