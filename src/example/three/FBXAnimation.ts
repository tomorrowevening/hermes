import { AnimationMixer, Object3D } from "three";
import { models } from "./loader";

export default class FBXAnimation extends Object3D {
  mixer?: AnimationMixer;

  constructor(name: string) {
    super();
    this.name = name;
    this.scale.setScalar(0.5);

    const model = models.get(name)!;
    this.add(model);

    this.mixer = new AnimationMixer(model);
    const action = this.mixer.clipAction(model.animations[0]);
    action.play();
  }

  update(delta: number) {
    this.mixer?.update(delta);
  }
}
