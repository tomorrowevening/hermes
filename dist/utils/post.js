import { WebGLRenderTarget as x, RGBAFormat as m } from "three";
import { ExportTexture as g } from "./three.js";
let b = [];
function E(r, n, a = !0) {
  g.renderer = n.renderer;
  const p = [];
  p.push({
    type: "boolean",
    prop: "Enabled",
    value: r.enabled
  });
  let f = (u, e) => {
    console.log("Default Handle Pass:", u, e);
  };
  if (r.name === "EffectPass")
    r.effects.forEach((u) => {
      u.uniforms.size > 0 && u.uniforms.forEach((e, o) => {
        if (o === "map") return;
        const t = `${u.name.replace("Effect", "")} ${o}`;
        if (e.value === null && a)
          p.push({
            prop: o,
            title: t,
            type: "image",
            value: {
              offset: [0, 0],
              repeat: [1, 1],
              src: ""
            }
          });
        else if (e.value.isTexture && a) {
          const s = e.value, i = g.renderToBlob(s);
          p.push({
            prop: o,
            title: t,
            type: "image",
            value: {
              offset: [s.offset.x, s.offset.y],
              repeat: [s.repeat.x, s.repeat.y],
              src: i
            }
          });
        } else typeof e.value == "number" ? p.push({
          prop: o,
          title: t,
          type: "number",
          value: e.value,
          step: 0.01
        }) : typeof e.value == "string" ? p.push({
          prop: o,
          title: t,
          type: "string",
          value: e.value
        }) : typeof e.value == "boolean" && p.push({
          prop: o,
          title: t,
          type: "boolean",
          value: e.value
        });
      });
    }), f = (u, e) => {
      r.effects.forEach((o) => {
        o.uniforms.size > 0 && o.uniforms.forEach((t, s) => {
          s === u && (t.value = e);
        });
      });
    };
  else if (r.name === "ShaderPass") {
    const u = r.fullscreenMaterial;
    for (const e in u.uniforms) {
      if (e === "inputBuffer" || e === "map") continue;
      const o = u.uniforms[e], t = `${u.name.replace("Material", "")} ${e}`;
      if (o.value === null && a)
        p.push({
          title: t,
          prop: e,
          type: "image",
          value: {
            offset: [0, 0],
            repeat: [1, 1],
            src: ""
          }
        });
      else if (o.value.isTexture && a) {
        const s = o.value, i = g.renderToBlob(s);
        p.push({
          title: t,
          prop: e,
          type: "image",
          value: {
            offset: [s.offset.x, s.offset.y],
            repeat: [s.repeat.x, s.repeat.y],
            src: i
          }
        });
      } else typeof o.value == "number" ? p.push({
        title: t,
        prop: e,
        type: "number",
        value: o.value,
        step: 0.01
      }) : typeof o.value == "string" ? p.push({
        title: t,
        prop: e,
        type: "string",
        value: o.value
      }) : typeof o.value == "boolean" && p.push({
        title: t,
        prop: e,
        type: "boolean",
        value: o.value
      });
    }
    f = (e, o) => {
      const t = u.uniforms[e];
      t.value = o;
    };
  } else
    return;
  const l = `${r.name}: ${r.scene.name}`;
  n.addGroup({
    title: l,
    items: p,
    onUpdate: (u, e) => {
      u === "Enabled" ? r.enabled = e : f(u, e);
    }
  }), b.push(l);
}
function M(r, n) {
  r.passes.forEach((a) => {
    E(a, n);
  });
}
function B(r) {
  b.forEach((n) => {
    r.removeGroup(n);
  }), b = [];
}
function C(r, n, a, p = 1024) {
  return new Promise((f) => {
    const l = n.aspect, u = n.fov, e = n.rotation.clone(), o = a.outputBuffer;
    n.aspect = 1, n.fov = 90, n.updateProjectionMatrix();
    const t = new x(p, p, {
      format: m,
      depthBuffer: !0,
      stencilBuffer: !1
    });
    a.outputBuffer = t, c(r, t, n, "nx", a, p).then(() => {
      c(r, t, n, "ny", a, p).then(() => {
        c(r, t, n, "nz", a, p).then(() => {
          c(r, t, n, "px", a, p).then(() => {
            c(r, t, n, "py", a, p).then(() => {
              c(r, t, n, "pz", a, p).then(() => {
                n.aspect = l, n.fov = u, n.rotation.copy(e), n.updateMatrixWorld(), n.updateProjectionMatrix(), a.outputBuffer = o, t.dispose(), f();
              });
            });
          });
        });
      });
    });
  });
}
function c(r, n, a, p, f, l) {
  return new Promise((u) => {
    const e = Math.PI / 2;
    switch (p) {
      case "nx":
        a.rotation.set(0, -e, 0);
        break;
      case "ny":
        a.rotation.set(-e, 0, Math.PI);
        break;
      case "nz":
        a.rotation.set(0, 0, 0);
        break;
      case "px":
        a.rotation.set(0, e, 0);
        break;
      case "py":
        a.rotation.set(e, 0, Math.PI);
        break;
      case "pz":
        a.rotation.set(0, Math.PI, 0);
        break;
    }
    a.updateMatrixWorld(), f.render();
    const o = new Uint8Array(l * l * 4);
    r.readRenderTargetPixels(n, 0, 0, l, l, o);
    const t = document.createElement("canvas");
    t.width = t.height = l;
    const s = t.getContext("2d"), i = s.createImageData(l, l);
    i.data.set(o), s.putImageData(i, 0, 0);
    const d = document.createElement("canvas");
    d.width = d.height = l;
    const h = d.getContext("2d");
    h.translate(0, l), h.scale(1, -1), h.drawImage(t, 0, 0);
    const y = d.toDataURL("image/png"), v = document.createElement("a");
    v.href = y, v.download = `${a.name}_${p}.png`, document.body.appendChild(v), v.click(), v.remove(), u();
  });
}
export {
  B as clearComposerGroups,
  C as generateCubemap,
  M as inspectComposer,
  E as inspectComposerPass
};
