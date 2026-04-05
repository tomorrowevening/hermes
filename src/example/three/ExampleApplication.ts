import { WebGPURenderer } from 'three/webgpu';
import { Inspector } from 'three/examples/jsm/inspector/Inspector.js';
import Application from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';

export default class ExampleApplication extends Application {
  theatre: RemoteTheatre;
  three: RemoteThree;

  constructor(projectName: string, dev: boolean, editor: boolean) {
    super(dev, editor);
    this.theatre = new RemoteTheatre(dev, editor);
    this.three = new RemoteThree(projectName, dev, editor);
    this.addComponent('theatre', this.theatre);
    this.addComponent('three', this.three);
  }

  init(canvas: HTMLCanvasElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isApp) {
        const renderer = new WebGPURenderer({
          canvas,
          stencil: false,
        });
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(Math.min(1.5, devicePixelRatio));
        renderer.setClearColor(0x000000);
        renderer.inspector = new Inspector();
        this.three.setRenderer(renderer, canvas);
        renderer.init()
          .then(() => {
            resolve();
          })
          .catch(() => {
            console.log('Error creating WebGPU Renderer');
            reject();
          });
      } else {
        reject();
      }
    });
  }
}
