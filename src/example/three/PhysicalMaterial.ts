import { MeshPhysicalMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from 'three';

export default class PhysicalMaterial extends MeshPhysicalMaterial {
  uniforms: any = {
    time: { value: 0 },
  };

  constructor() {
    super({
      name: 'PhysicalMaterial'
    });
  }

  onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
    parameters.uniforms = {
      ...parameters.uniforms,
      ...this.uniforms,
    };
    this.uniforms = parameters.uniforms;
  }

  get time(): number {
    return this.uniforms.time.value;
  }

  set time(value: number) {
    this.uniforms.time.value = value;
  }
}
