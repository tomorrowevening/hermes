import { detectSettings as s } from "../utils/detectSettings.js";
class n {
  assets = {
    audio: /* @__PURE__ */ new Map(),
    image: /* @__PURE__ */ new Map(),
    json: /* @__PURE__ */ new Map(),
    model: /* @__PURE__ */ new Map(),
    video: /* @__PURE__ */ new Map()
  };
  components = /* @__PURE__ */ new Map();
  settings = {
    dpr: 1,
    fps: 30,
    width: 0,
    height: 0,
    mobile: !1,
    supportOffScreenCanvas: !1,
    supportWebGPU: !1,
    quality: "Low",
    dev: !1,
    editor: !1
  };
  onUpdateCallback;
  // Protected
  playing = !1;
  rafID = -1;
  constructor(t, e = !1) {
    this.settings.dev = t, this.settings.editor = e;
  }
  dispose() {
    this.pause(), this.components.forEach((t) => t.dispose()), this.components.clear();
  }
  detectSettings() {
    return new Promise((t) => {
      s(this.settings.dev, this.settings.editor).then((e) => {
        this.settings = e, t();
      });
    });
  }
  // Playback
  update() {
  }
  draw() {
  }
  play = () => {
    this.playing || (this.playing = !0, this.onUpdate());
  };
  pause = () => {
    this.playing && (this.playing = !1, cancelAnimationFrame(this.rafID), this.rafID = -1);
  };
  onUpdate = () => {
    this.update(), this.isApp && this.draw(), this.onUpdateCallback && this.onUpdateCallback(), this.rafID = requestAnimationFrame(this.onUpdate);
  };
  // Remote Components
  addComponent(t, e) {
    this.components.set(t, e);
  }
  // Getters
  get debugEnabled() {
    return this.settings.dev;
  }
  get isApp() {
    return !this.editor;
  }
  set isApp(t) {
    this.editor = !t;
  }
  get editor() {
    return this.settings.editor;
  }
  set editor(t) {
    this.settings.editor = t;
  }
}
export {
  n as default
};
