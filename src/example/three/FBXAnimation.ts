import { AnimationMixer, Group, Object3D } from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default class FBXAnimation extends Object3D {
  mixer?: AnimationMixer;

  constructor(source: string) {
    super();
    this.name = source.replace(/\s/g, '').split('.')[0];
    this.scale.setScalar(0.5);

    new FBXLoader()
      .setPath('./models/')
      .loadAsync(source)
      .then((model: Group) => {
        this.add(model);

        // Shadows
        model.traverse((obj: Object3D) => {
          if (obj['isMesh']) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });

        this.mixer = new AnimationMixer(model);
        const action = this.mixer.clipAction(model.animations[0]);
        action.play();
      })
      .catch((reason: any) => {
        console.log(`Couldn't load:`, source);
        console.log(reason);
      })
  }

  update(delta: number) {
    this.mixer?.update(delta);
  }
}
