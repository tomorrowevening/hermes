import { ShaderMaterial as e } from "three";
const r = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <batching_vertex>

  #if defined ( USE_SKINNING )
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
  #endif

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <worldpos_vertex>
}`, n = `
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>
  if (opacity < 0.015) discard;
  gl_FragColor = vec4(vec3(vUv, 0.0), opacity);
}`;
class l extends e {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      uniforms: {
        opacity: { value: 1 }
      },
      vertexShader: r,
      fragmentShader: n,
      transparent: !0
    });
  }
}
export {
  l as default
};
