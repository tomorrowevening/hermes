import { ShaderMaterial } from "three";

const vertex = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragment = `uniform float time;
varying vec2 vUv;

void main() {
	vec3 col = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0.0, 2.0, 4.0));
	gl_FragColor = vec4(col, 1.0);
}`;

export default class CustomMaterial extends ShaderMaterial {
	constructor() {
		super({
			vertexShader: vertex,
			fragmentShader: fragment,
			uniforms: {
				time: {
					value: 0,
				}
			},
		})
	}

	update(delta: number) {
		this.uniforms.time.value += delta;
	}
}
