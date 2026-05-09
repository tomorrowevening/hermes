import { OrthographicCamera as o, Scene as d, MeshBasicMaterial as m, BufferGeometry as p, Float32BufferAttribute as r, Mesh as u, LinearSRGBColorSpace as h } from "three";
let n = 0;
const g = () => {
  n = 0;
}, f = (i) => {
  if (!i) return;
  let e = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${n}`, n++), i.parent !== null && i.parent.uuid.length > 0 && (e = `${i.parent.uuid}.${e}`), i.uuid = e, i.isMesh !== void 0) {
    const t = i;
    if (Array.isArray(t.material))
      t.material.forEach((a, s) => {
        a.uuid = `${e}.material.${s}`;
      });
    else {
      const a = t.material;
      a.uuid = `${e}.material`;
    }
  }
  i.children.forEach((t) => f(t));
};
class v {
  static renderer;
  static canvas;
  static context = null;
  static scene = null;
  static camera = null;
  static material = null;
  static inited = !1;
  static width = 100;
  static height = 100;
  static init() {
    this.inited || (this.canvas = document.createElement("canvas"), this.canvas.width = this.width, this.canvas.height = this.height, this.context = this.canvas.getContext("2d"), this.inited = !0);
  }
  static renderToBlob(e) {
    this.init();
    const t = e.repeat.clone(), a = e.offset.clone();
    if (e.repeat.set(1, 1), e.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const s = e.image;
      if (s != null && s.width > 0) {
        this.canvas.title = e.sourceFile;
        const c = this.canvas.width / s.width, l = this.renderToCanvas(e);
        this.context.drawImage(l, 0, 0, s.width * c, s.height * c);
      }
    }
    return e.repeat.copy(t), e.offset.copy(a), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(e) {
    if (this.material === null) {
      this.camera = new o(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new d(), this.material = new m();
      const t = new p();
      t.setAttribute("position", new r([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new r([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new r([0, 0, 2, 0, 0, 2], 2));
      const a = new u(t, this.material);
      this.scene.add(a);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, a = e.colorSpace;
      this.renderer.outputColorSpace = h, e.colorSpace = h, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = a;
    }
    return this.renderer.domElement;
  }
}
export {
  v as ExportTexture,
  f as hierarchyUUID,
  g as resetThreeObjects
};
