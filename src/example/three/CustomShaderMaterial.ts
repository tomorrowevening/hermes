import { Color, Euler, Matrix3, Matrix4, ShaderMaterial, Texture, Vector2, Vector3, Vector4 } from 'three';
import { textureFromSrc } from '../../editor/sidePanel/utils';

const vertex = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragment = `struct Light {
  float intensity;
  vec3 position;
  vec3 color;
};

uniform float time;
uniform float opacity;
uniform vec2 resolution;
uniform vec3 diffuse;
uniform vec3 mouse;
uniform sampler2D map;
uniform Light light;
uniform Light lights[3];
varying vec2 vUv;

#define MIN_ALPHA 2.0 / 255.0

void main() {
  if (opacity < MIN_ALPHA) discard;
  vec2 imageUV = vUv * 10.0;
  vec3 image = texture2D(map, imageUV).rgb;
  vec3 col = image * diffuse;
  col += (sin(time * 0.1) * 0.5 + 0.5) * 0.2;
  col += vec3(resolution, 0.0);
  col += mouse;
  gl_FragColor = vec4(col, opacity);
}`;

// eslint-disable-next-line max-len
const smile = `data:image/png;base64,R0lGODlhCAAIAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjIgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjVENjQyODM4QTYzMTFFRUJFQTBFOTJFNjA1OTQ5N0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjVENjQyODQ4QTYzMTFFRUJFQTBFOTJFNjA1OTQ5N0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NUQ2NDI4MThBNjMxMUVFQkVBMEU5MkU2MDU5NDk3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NUQ2NDI4MjhBNjMxMUVFQkVBMEU5MkU2MDU5NDk3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAIAAgAAAIOjH8AprzRkHyspqSoNAUAOw==`;

export default class CustomShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      name: 'ExampleScene/SimpleShader',
      transparent: true,
      uniforms: {
        diffuse: {
          value: new Color(0xffffff)
        },
        opacity: {
          value: 1,
        },
        time: {
          value: 0,
        },
        map: {
          value: null,
        },
        resolution: {
          value: new Vector2(),
        },
        mouse: {
          value: new Vector3()
        },
        v4: {
          value: new Vector4()
        },
        euler: {
          value: new Euler()
        },
        testM3: {
          value: new Matrix3()
        },
        testM4: {
          value: new Matrix4()
        },
        light: {
          value: {
            position: new Vector2(5, 10),
            intensity: 1,
            color: new Color(0xff00ff),
          }
        },
        lights: {
          value: [
            {
              position: new Vector2(1, 1),
              intensity: 1,
              color: new Color(0xff0000),
            },
            {
              position: new Vector2(2, 2),
              intensity: 2,
              color: new Color(0x00ff00),
            },
            {
              position: new Vector2(3, 3),
              intensity: 3,
              color: new Color(0x0000ff),
            },
          ],
        },
      },
    });

    textureFromSrc(smile).then((texture: Texture) => {
      this.uniforms.map.value = texture;
    });
  }

  update(delta: number) {
    this.uniforms.opacity.value = this.opacity;
    this.uniforms.time.value += delta;
  }
}
