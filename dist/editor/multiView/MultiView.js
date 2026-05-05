import { jsxs as b, jsx as h, Fragment as v } from "react/jsx-runtime";
import { Component as O, createRef as C } from "react";
import { Group as L, AxesHelper as D, MeshBasicMaterial as x, Raycaster as R, Vector2 as w, Scene as U, Sphere as B, Box3 as F, Spherical as G, Matrix4 as P, Quaternion as z, Vector4 as _, Vector3 as c, WebGPURenderer as A, MeshNormalNodeMaterial as Q, PerspectiveCamera as E, OrthographicCamera as M, CameraHelper as q, Mesh as K, SkinnedMesh as N, SpotLightHelper as $, PointLightHelper as Y, HemisphereLightHelper as J, DirectionalLightHelper as X } from "three/webgpu";
import { WebGLRenderer as T } from "three";
import { RectAreaLightHelper as j } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { OrbitControls as Z } from "three/examples/jsm/controls/OrbitControls.js";
import { mapLinear as g, degToRad as H } from "three/src/math/MathUtils.js";
import p from "camera-controls";
import { ToolEvents as o } from "../../core/remote/RemoteThree.js";
import u, { Dropdown as V } from "./CameraWindow.js";
import ee from "./InfiniteGridHelper.js";
import te from "./InfiniteGridHelperGPU.js";
/* empty css               */
import S from "../sidePanel/DebugData.js";
import { InspectTransform as ie } from "../sidePanel/inspector/utils/InspectTransform.js";
import I from "./Toggle.js";
import se from "./DepthNodeMaterial.js";
import re from "./UVNodeMaterial.js";
import ae from "../tools/splineEditor/index.js";
import m from "../tools/Transform.js";
import { mix as ne } from "../../utils/math.js";
import { dispose as y } from "../../utils/three.js";
const W = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", he = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==", le = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQ0lEQVQ4jWP8////fwYqAxYozUhFM/8zkaKYWIWkGEq0b0ZdSjQY5i79TyWagRGaTUdzFEEw6lLqGzqwLoVVJ1StpwA9sBwbUqAh5gAAAABJRU5ErkJggg==";
class k extends O {
  static instance = null;
  scene;
  renderer;
  currentScene;
  scenes = /* @__PURE__ */ new Map();
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  helpersContainer = new L();
  grid;
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  interactionHelper = new D(25);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial;
  normalsMaterial;
  uvMaterial;
  wireframeMaterial = new x({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  });
  // Playback
  playing = !1;
  rafID = -1;
  cameraControlsRafID = -1;
  width = 0;
  height = 0;
  // Windows
  tlCam = null;
  trCam = null;
  blCam = null;
  brCam = null;
  tlRender = "Renderer";
  trRender = "Renderer";
  blRender = "Renderer";
  brRender = "Renderer";
  cameraVisibility = !0;
  lightVisibility = !0;
  gridVisibility = !0;
  rendererReady = !1;
  // Interactions
  selectedItem = void 0;
  cameraControlsStartTime = 0;
  cameraControlsLastTime = 0;
  debugCamera;
  raycaster = new R();
  pointer = new w();
  cameraControls = void 0;
  // References
  canvasRef;
  containerRef;
  tlWindow;
  trWindow;
  blWindow;
  brWindow;
  editorCameras = [
    "Top",
    "Bottom",
    "Left",
    "Right",
    "Front",
    "Back",
    "Orthographic",
    "UI",
    "Debug"
  ];
  constructor(i) {
    super(i), this.props.three.addEventListener(o.ADD_RENDERER, this.setupRenderer), this.scene = new U(), this.scene.name = this.scene.uuid = "", this.canvasRef = C(), this.containerRef = C(), this.tlWindow = C(), this.trWindow = C(), this.blWindow = C(), this.brWindow = C();
    const e = i.three.name, t = localStorage, s = t.getItem(`${e}_mode`);
    this.state = {
      mode: s !== null ? s : "Single",
      modeOpen: !1,
      renderModeOpen: !1,
      interactionMode: "Orbit",
      interactionModeOpen: !1,
      lastUpdate: Date.now()
    }, t.setItem(`${e}_mode`, this.state.mode), t.setItem(`${e}_tlCam`, t.getItem(`${e}_tlCam`) !== null ? t.getItem(`${e}_tlCam`) : "Debug"), t.setItem(`${e}_trCam`, t.getItem(`${e}_trCam`) !== null ? t.getItem(`${e}_trCam`) : "Orthographic"), t.setItem(`${e}_blCam`, t.getItem(`${e}_blCam`) !== null ? t.getItem(`${e}_blCam`) : "Front"), t.setItem(`${e}_brCam`, t.getItem(`${e}_brCam`) !== null ? t.getItem(`${e}_brCam`) : "Top"), t.setItem(`${e}_tlRender`, t.getItem(`${e}_tlRender`) !== null ? t.getItem(`${e}_tlRender`) : "Renderer"), t.setItem(`${e}_trRender`, t.getItem(`${e}_trRender`) !== null ? t.getItem(`${e}_trRender`) : "Renderer"), t.setItem(`${e}_blRender`, t.getItem(`${e}_blRender`) !== null ? t.getItem(`${e}_blRender`) : "Renderer"), t.setItem(`${e}_brRender`, t.getItem(`${e}_brRender`) !== null ? t.getItem(`${e}_brRender`) : "Renderer");
    const a = {
      Vector2: w,
      Vector3: c,
      Vector4: _,
      Quaternion: z,
      Matrix4: P,
      Spherical: G,
      Box3: F,
      Sphere: B,
      Raycaster: R
    };
    p.install({ THREE: a });
    const r = localStorage.getItem(this.expandedCameraVisibility);
    r !== null && (this.cameraVisibility = r === "open"), this.saveExpandedCameraVisibility();
    const n = localStorage.getItem(this.expandedLightVisibility);
    n !== null && (this.lightVisibility = n === "open"), this.saveExpandedLightVisibility();
    const d = localStorage.getItem(this.expandedGridVisibility);
    d !== null && (this.gridVisibility = d === "open"), this.grid && (this.grid.visible = this.gridVisibility), this.saveExpandedGridVisibility(), k.instance = this;
  }
  componentDidMount() {
    this.setupScene(), this.setupTools(), this.enable(), this.assignControls(), this.resize(), this.play(), m.instance.setApp(this.props.three), m.instance.activeCamera = this.debugCamera, this.props.three.requestRenderer();
  }
  componentDidUpdate(i, e, t) {
    e.mode !== this.state.mode && (this.assignControls(), this.resize());
  }
  componentWillUnmount() {
    this.disable(), this.clear(), S.removeEditorGroup("View Settings");
  }
  render() {
    const i = [];
    return this.cameras.forEach((e, t) => {
      i.push(t);
    }), /* @__PURE__ */ b("div", { className: "multiview", children: [
      /* @__PURE__ */ h("canvas", { ref: this.canvasRef }),
      /* @__PURE__ */ b("div", { className: `cameras ${this.state.mode === "Single" || this.state.mode === "Stacked" ? "single" : ""}`, ref: this.containerRef, children: [
        this.state.mode === "Single" && /* @__PURE__ */ h(v, { children: /* @__PURE__ */ h(
          u,
          {
            name: "tl",
            camera: this.tlCam,
            options: i,
            ref: this.tlWindow,
            onSelectCamera: (e) => {
              this.controls.get(this.tlCam.name)?.dispose();
              const t = this.cameras.get(e);
              t !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = t, localStorage.setItem(`${this.appID}_tlCam`, t.name), this.createControls(t, this.tlWindow.current));
            },
            onSelectRenderMode: (e) => {
              this.tlRender = e, localStorage.setItem(`${this.appID}_tlRender`, e);
            }
          }
        ) }),
        (this.state.mode === "Side by Side" || this.state.mode === "Stacked") && /* @__PURE__ */ b(v, { children: [
          /* @__PURE__ */ h(
            u,
            {
              name: "tl",
              camera: this.tlCam,
              options: i,
              ref: this.tlWindow,
              onSelectCamera: (e) => {
                this.controls.get(this.tlCam.name)?.dispose();
                const t = this.cameras.get(e);
                t !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = t, localStorage.setItem(`${this.appID}_tlCam`, t.name), this.createControls(t, this.tlWindow.current));
              },
              onSelectRenderMode: (e) => {
                this.tlRender = e, localStorage.setItem(`${this.appID}_tlRender`, e);
              }
            }
          ),
          /* @__PURE__ */ h(
            u,
            {
              name: "tr",
              camera: this.trCam,
              options: i,
              ref: this.trWindow,
              onSelectCamera: (e) => {
                this.controls.get(this.trCam.name)?.dispose();
                const t = this.cameras.get(e);
                t !== void 0 && (this.clearCamera(this.trCam), this.trCam = t, localStorage.setItem(`${this.appID}_trCam`, t.name), this.createControls(t, this.trWindow.current));
              },
              onSelectRenderMode: (e) => {
                this.trRender = e, localStorage.setItem(`${this.appID}_trRender`, e);
              }
            }
          )
        ] }),
        this.state.mode === "Quad" && /* @__PURE__ */ b(v, { children: [
          /* @__PURE__ */ h(
            u,
            {
              name: "tl",
              camera: this.tlCam,
              options: i,
              ref: this.tlWindow,
              onSelectCamera: (e) => {
                this.controls.get(this.tlCam.name)?.dispose();
                const t = this.cameras.get(e);
                t !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = t, localStorage.setItem(`${this.appID}_tlCam`, t.name), this.createControls(t, this.tlWindow.current));
              },
              onSelectRenderMode: (e) => {
                this.tlRender = e, localStorage.setItem(`${this.appID}_tlRender`, e);
              }
            }
          ),
          /* @__PURE__ */ h(
            u,
            {
              name: "tr",
              camera: this.trCam,
              options: i,
              ref: this.trWindow,
              onSelectCamera: (e) => {
                this.controls.get(this.trCam.name)?.dispose();
                const t = this.cameras.get(e);
                t !== void 0 && (this.clearCamera(this.trCam), this.trCam = t, localStorage.setItem(`${this.appID}_trCam`, t.name), this.createControls(t, this.trWindow.current));
              },
              onSelectRenderMode: (e) => {
                this.trRender = e, localStorage.setItem(`${this.appID}_trRender`, e);
              }
            }
          ),
          /* @__PURE__ */ h(
            u,
            {
              name: "bl",
              camera: this.blCam,
              options: i,
              ref: this.blWindow,
              onSelectCamera: (e) => {
                this.controls.get(this.blCam.name)?.dispose();
                const t = this.cameras.get(e);
                t !== void 0 && (this.clearCamera(this.blCam), this.blCam = t, localStorage.setItem(`${this.appID}_blCam`, t.name), this.createControls(t, this.blWindow.current));
              },
              onSelectRenderMode: (e) => {
                this.blRender = e, localStorage.setItem(`${this.appID}_blRender`, e);
              }
            }
          ),
          /* @__PURE__ */ h(
            u,
            {
              name: "br",
              camera: this.brCam,
              options: i,
              ref: this.brWindow,
              onSelectCamera: (e) => {
                this.controls.get(this.brCam.name)?.dispose();
                const t = this.cameras.get(e);
                t !== void 0 && (this.clearCamera(this.brCam), this.brCam = t, localStorage.setItem(`${this.appID}_brCam`, t.name), this.createControls(t, this.brWindow.current));
              },
              onSelectRenderMode: (e) => {
                this.brRender = e, localStorage.setItem(`${this.appID}_brRender`, e);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ b("div", { className: "settings", children: [
        /* @__PURE__ */ h(
          V,
          {
            title: "View",
            index: W.indexOf(this.state.mode),
            options: W,
            onSelect: (e) => {
              e !== this.state.mode && (this.killControls(), this.setState({ mode: e }), localStorage.setItem(`${this.appID}_mode`, e));
            },
            open: this.state.modeOpen,
            onToggle: (e) => {
              this.setState({
                modeOpen: e,
                renderModeOpen: !1,
                interactionModeOpen: !1
              });
            }
          }
        ),
        /* @__PURE__ */ h(
          V,
          {
            title: "Interact",
            index: this.state.interactionMode === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (e) => {
              this.interactionHelper.visible = e === "Selection Mode", this.setState({ interactionMode: this.interactionHelper.visible ? "Selection" : "Orbit" });
            },
            open: this.state.interactionModeOpen,
            onToggle: (e) => {
              this.setState({
                modeOpen: !1,
                renderModeOpen: !1,
                interactionModeOpen: e
              });
            }
          }
        ),
        /* @__PURE__ */ h(
          I,
          {
            name: "cameraHelper",
            icon: oe,
            selected: this.cameraVisibility,
            height: 24,
            top: 2,
            onClick: (e) => {
              if (this.cameraVisibility = e, this.saveExpandedCameraVisibility(), this.cameraHelpers.forEach((t) => {
                t.visible = e;
              }), this.selectedItem !== void 0 && !e) {
                const t = this.cameraHelpers.get(this.selectedItem.name);
                t !== void 0 && (t.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ h(
          I,
          {
            name: "lightHelper",
            icon: he,
            selected: this.lightVisibility,
            height: 24,
            top: 4,
            onClick: (e) => {
              if (this.lightVisibility = e, this.saveExpandedLightVisibility(), this.lightHelpers.forEach((t) => {
                t.visible = e;
              }), this.selectedItem !== void 0 && !e && this.selectedItem.isLight === !0) {
                const t = this.lightHelpers.get(this.selectedItem.name);
                t !== void 0 && (t.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ h(
          I,
          {
            name: "gridHelper",
            icon: le,
            selected: this.gridVisibility,
            height: 21,
            width: 21,
            onClick: (e) => {
              this.setGridVisibility(e);
            }
          }
        )
      ] }, this.state.lastUpdate)
    ] });
  }
  // Setup
  setupRenderer = (i) => {
    const e = i.value;
    if (this.renderer) {
      if (this.renderer instanceof T && e.type === "WebGLRenderer" || this.renderer instanceof A && e.type === "WebGPURenderer") return;
      this.renderer.dispose();
    }
    this.rendererReady = !1;
    const t = this.canvasRef.current;
    if (t === null) {
      setTimeout(() => this.props.three.requestRenderer(), 100);
      return;
    }
    this.props.three.canvas = t, e.type === "WebGLRenderer" ? (this.renderer = new T({
      canvas: t,
      stencil: !1
    }), this.grid && (this.scene.remove(this.grid), y(this.grid)), this.grid = new ee(), this.scene.add(this.grid), this.rendererReady = !0) : e.type === "WebGPURenderer" && (this.renderer = new A({
      canvas: t,
      stencil: !1
    }), this.grid && (this.scene.remove(this.grid), y(this.grid)), this.grid = new te(), this.scene.add(this.grid)), this.renderer && (this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setClearColor(0), this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setScissorTest(!0), this.resize(), this.props.three.renderer = this.renderer, this.depthMaterial?.dispose(), this.normalsMaterial?.dispose(), this.uvMaterial?.dispose(), this.depthMaterial = new se(), this.normalsMaterial = new Q(), this.uvMaterial = new re(), e.type === "WebGPURenderer" ? this.renderer.init().then(() => {
      this.rendererReady = !0, this.props.three.requestScene();
    }) : this.props.three.requestScene());
  };
  setupScene() {
    this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.interactionHelper.name = "interactionHelper", this.interactionHelper.visible = !1, this.helpersContainer.add(this.interactionHelper);
    const i = (a, r) => {
      const n = new M(-100, 100, 100, -100, 0, 3e3);
      return n.name = a, n.position.copy(r), n.lookAt(0, 0, 0), this.cameras.set(a, n), n;
    }, e = 1e3;
    i("Top", new c(0, e, 0)), i("Bottom", new c(0, -e, 0)), i("Left", new c(-e, 0, 0)), i("Right", new c(e, 0, 0)), i("Front", new c(0, 0, e)), i("Back", new c(0, 0, -e)), i("Orthographic", new c(e, e, e)), i("UI", new c()), this.debugCamera = new E(60, 1, 0.01, 3e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(300, 300, 300), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const t = localStorage, s = this.props.three.name;
    this.tlCam = this.cameras.get(t.getItem(`${s}_tlCam`)), this.trCam = this.cameras.get(t.getItem(`${s}_trCam`)), this.blCam = this.cameras.get(t.getItem(`${s}_blCam`)), this.brCam = this.cameras.get(t.getItem(`${s}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top")), S.addEditorGroup({
      title: "Editor",
      items: [
        {
          type: "button",
          prop: "Hide All Transforms"
        },
        {
          type: "button",
          prop: "Resize"
        }
      ],
      onUpdate: (a, r) => {
        switch (a) {
          case "Hide All Transforms":
            m.instance.hide();
            break;
          case "Resize":
            this.resize();
            break;
        }
      },
      subgroups: [
        {
          title: "Debug Camera",
          items: [
            {
              type: "range",
              prop: "Near",
              step: 1e-4,
              min: 1e-3,
              max: 1e3,
              value: this.debugCamera.near
            },
            {
              type: "range",
              prop: "Far",
              step: 1e-3,
              min: 1e-3,
              max: 1e4,
              value: this.debugCamera.far
            }
          ],
          onUpdate: (a, r) => {
            switch (a) {
              case "Near":
                this.debugCamera.near = r, this.debugCamera.updateProjectionMatrix();
                break;
              case "Far":
                this.debugCamera.far = r, this.debugCamera.updateProjectionMatrix();
                break;
            }
          }
        },
        {
          title: "Grid",
          items: [
            {
              type: "number",
              prop: "Position",
              value: 0
            },
            {
              type: "color",
              prop: "Color",
              value: "#FFFFFF"
            },
            {
              type: "range",
              prop: "Grid Opacity",
              value: 0.25,
              min: 0,
              max: 1,
              step: 0.01
            },
            {
              type: "range",
              prop: "Subgrid Opacity",
              value: 0.15,
              min: 0,
              max: 1,
              step: 0.01
            }
          ],
          onUpdate: (a, r) => {
            switch (a) {
              case "Position":
                this.grid && (this.grid.position.y = r);
                break;
              case "Color":
                this.grid && this.grid.color.setStyle(r);
                break;
              case "Grid Opacity":
                this.grid && (this.grid.gridOpacity = r);
                break;
              case "Subgrid Opacity":
                this.grid && (this.grid.subgridOpacity = r);
                break;
            }
          }
        }
      ]
    });
  }
  setupTools() {
    this.splineEditor = new ae(this.currentCamera, this.three), this.splineEditor.initDebug(), this.helpersContainer.add(this.splineEditor);
  }
  // Public
  play() {
    this.playing = !0, this.onUpdate();
  }
  pause() {
    this.playing = !1, cancelAnimationFrame(this.rafID), this.rafID = -1;
  }
  toggleOrbitControls(i) {
    this.controls.forEach((e) => {
      e.enabled = !i;
    });
  }
  clear() {
    this.three.dispatchEvent({ type: o.CLEAR_OBJECT }), S.removeAllGroups(), this.clearLightHelpers(), this.clearControls(), this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), m.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = void 0, m.instance.clear(), this.cameras.forEach((i) => {
      this.editorCameras.indexOf(i.name) < 0 && this.three.dispatchEvent({ type: o.REMOVE_CAMERA, value: i });
    }), this.currentCamera = this.debugCamera, this.currentScene = void 0, this.scenes.forEach((i) => {
      this.three.dispatchEvent({ type: o.REMOVE_SCENE, value: i });
    }), this.scenes.clear();
  }
  setGridVisibility(i) {
    this.gridVisibility = i, this.saveExpandedGridVisibility(), this.grid && (this.grid.visible = i);
  }
  // Playback
  update() {
    this.controls.forEach((i) => i.update()), this.cameraHelpers.forEach((i) => i.update()), this.lightHelpers.forEach((i) => {
      i.update !== void 0 && i.update();
    }), this.props.onSceneUpdate !== void 0 && this.currentScene !== void 0 && this.props.onSceneUpdate(this.currentScene);
  }
  draw() {
    if (this.rendererReady)
      switch (this.renderer && this.renderer?.clear(), this.state.mode) {
        case "Single":
          this.drawSingle();
          break;
        case "Side by Side":
        case "Stacked":
          this.drawDouble();
          break;
        case "Quad":
          this.drawQuad();
          break;
      }
  }
  onUpdate = () => {
    this.playing && (this.update(), this.draw(), this.rafID = requestAnimationFrame(this.onUpdate));
  };
  // Events
  enable() {
    const i = this.containerRef.current;
    i.addEventListener("mousemove", this.onMouseMove), i.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), this.three.addEventListener(o.ADD_SCENE, this.addScene), this.three.addEventListener(o.SET_SCENE, this.sceneUpdate), this.three.addEventListener(o.REMOVE_SCENE, this.removeScene), this.three.addEventListener(o.ADD_CAMERA, this.addCamera), this.three.addEventListener(o.REMOVE_CAMERA, this.removeCamera), this.three.addEventListener(o.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const i = this.containerRef.current;
    i.removeEventListener("mousemove", this.onMouseMove), i.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), this.three.removeEventListener(o.ADD_SCENE, this.addScene), this.three.removeEventListener(o.SET_SCENE, this.sceneUpdate), this.three.removeEventListener(o.REMOVE_SCENE, this.removeScene), this.three.removeEventListener(o.ADD_CAMERA, this.addCamera), this.three.removeEventListener(o.REMOVE_CAMERA, this.removeCamera), this.three.removeEventListener(o.SET_OBJECT, this.onSetSelectedItem);
  }
  resize = () => {
    this.width = window.innerWidth - 300, this.height = window.innerHeight, this.renderer?.setSize(this.width, this.height);
    const i = Math.floor(this.width / 2), e = Math.floor(this.height / 2);
    this.props.three.resize(this.width, this.height), this.props.onSceneResize !== void 0 && this.currentScene !== void 0 && this.props.onSceneResize(this.currentScene, this.width, this.height);
    let t = this.width, s = this.height;
    switch (this.state.mode) {
      case "Side by Side":
        t = i, s = this.height;
        break;
      case "Stacked":
        t = this.width, s = e;
        break;
      case "Quad":
        t = i, s = e;
        break;
    }
    const a = t / s;
    this.cameras.forEach((r) => {
      r instanceof M ? (r.left = t / -2, r.right = t / 2, r.top = s / 2, r.bottom = s / -2, r.name === "UI" && (r.position.x = this.width / 2, r.position.y = this.height / -2, r.position.z = 100), r.updateProjectionMatrix()) : r instanceof E && (r.aspect = a, r.updateProjectionMatrix()), this.cameraHelpers.get(r.name)?.update();
    });
  };
  addScene = (i) => {
    const e = this.props.scenes.get(i.value.name);
    if (e !== void 0) {
      const t = this.scenes.get(i.value.name);
      if (t !== void 0) {
        this.props.onSceneAdd !== void 0 && this.props.onSceneAdd(t), this.props.three.scene = t;
        return;
      }
      const s = new e();
      s.visible = !1, this.props.onSceneAdd !== void 0 && this.props.onSceneAdd(s), this.props.three.scene = s, this.scenes.set(i.value.name, s), this.scene.add(s);
    } else
      console.log("Hermes - Scene not found:", i.value.name, this.props.scenes);
  };
  sceneUpdate = (i) => {
    this.currentScene !== void 0 && (this.currentScene.visible = !1, this.clearLightHelpers());
    const e = this.scene.getObjectByName(i.value.name);
    e !== void 0 && (this.currentScene = e, this.currentScene.visible = !0, this.addLightHelpers(this.currentScene)), this.cameraHelpers.forEach((t, s) => {
      const a = this.currentScene !== void 0 && this.currentScene.getObjectByProperty("uuid", s) !== void 0;
      t.visible = this.cameraVisibility && a;
    });
  };
  removeScene = (i) => {
    const e = i.value.name;
    this.scenes.delete(e);
    const t = this.scene.getObjectByName(e);
    t && setTimeout(() => {
      y(t);
    }, 100), this.clearLightHelpers();
  };
  addCamera = (i) => {
    const e = i.value, t = e.uuid, s = this.props.three.scene?.getObjectByProperty("uuid", e.uuid);
    if (s !== void 0) {
      const a = s;
      this.cameras.set(t, a);
      const r = new q(a), n = this.currentScene !== void 0 && this.currentScene.getObjectByProperty("uuid", t) !== void 0;
      r.visible = this.cameraVisibility && n, this.cameraHelpers.set(t, r), this.helpersContainer.add(r), this.setState({ lastUpdate: Date.now() });
    }
  };
  removeCamera = (i) => {
    const t = i.value.uuid, s = this.cameraHelpers.get(t);
    s !== void 0 && (this.helpersContainer.remove(s), s.dispose()), this.cameras.delete(t), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (i) => {
    const e = new w();
    this.renderer?.getSize(e);
    const t = Math.min(i.clientX, e.x), s = Math.min(i.clientY, e.y);
    this.pointer.x = g(t, 0, e.x, -1, 1), this.pointer.y = g(s, 0, e.y, 1, -1);
    const a = e.x / 2, r = e.y / 2, n = () => {
      t < a ? this.pointer.x = g(t, 0, a, -1, 1) : this.pointer.x = g(t, a, e.x, -1, 1);
    }, d = () => {
      s < r ? this.pointer.y = g(s, 0, r, 1, -1) : this.pointer.y = g(s, r, e.y, 1, -1);
    };
    switch (this.state.mode) {
      case "Quad":
        n(), d();
        break;
      case "Side by Side":
        n();
        break;
      case "Stacked":
        d(), d();
        break;
    }
    if (this.updateCamera(t, s, a, r), this.state.interactionMode === "Orbit" || this.currentScene === void 0) return;
    const l = this.raycaster.intersectObjects(this.currentScene.children);
    l.length > 0 && this.interactionHelper.position.copy(l[0].point);
  };
  onClick = (i) => {
    if (this.state.interactionMode === "Orbit" || this.currentScene === void 0) return;
    const e = new w();
    if (this.renderer.getSize(e), i.clientX >= e.x) return;
    this.onMouseMove(i);
    const t = this.raycaster.intersectObjects(this.currentScene.children);
    t.length > 0 && (this.props.three.getObject(t[0].object.uuid), this.interactionHelper.visible = !1, this.setState({ interactionMode: "Orbit", lastUpdate: Date.now() }));
  };
  onKey = (i) => {
    if (this.selectedItem !== void 0) {
      if (i.ctrlKey) {
        if (this.currentCamera.name === "UI") return;
        const e = this.controls.get(this.currentCamera.name);
        i.key === "0" ? (i.preventDefault(), this.clearControls(), this.cameraControls = new p(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof K || this.selectedItem instanceof N ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(e, !0)) : i.key === "1" ? (i.preventDefault(), this.clearControls(), this.cameraControls = new p(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(e)) : i.key === "2" ? (i.preventDefault(), this.clearControls(), this.cameraControls = new p(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(e)) : i.key === "3" ? (i.preventDefault(), this.clearControls(), this.cameraControls = new p(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(e)) : i.key === "4" ? (i.preventDefault(), this.clearControls(), this.cameraControls = new p(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(e)) : i.key === "5" && (i.preventDefault(), this.clearControls(), this.cameraControls = new p(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(H(45), H(45), !0), this.updateCameraControls(e));
      } else if (this.currentTransform !== void 0)
        switch (i.key) {
          case "r":
            this.currentTransform.setMode("rotate");
            break;
          case "s":
            this.currentTransform.setMode("scale");
            break;
          case "t":
            this.currentTransform.setMode("translate");
            break;
          case "q":
            this.currentTransform.setSpace(this.currentTransform.space === "local" ? "world" : "local");
            break;
        }
    }
  };
  onSetSelectedItem = (i) => {
    this.selectedItem !== void 0 && this.updateSelectedItemHelper(!1), this.selectedItem = void 0;
    const e = i.value.uuid;
    if (this.scenes.forEach((t) => {
      e.search(t.uuid) > -1 && (this.selectedItem = t.getObjectByProperty("uuid", e));
    }), this.selectedItem === void 0) {
      console.log(`Hermes - Can't find selected item: ${i.value.uuid}, ${i.value.name}`);
      return;
    }
    this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), m.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = m.instance.add(i.value.name), this.currentTransform && (this.currentTransform.attach(this.selectedItem), this.helpersContainer.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform)), this.updateSelectedItemHelper(!0);
  };
  updateSelectedItemHelper(i) {
    if (this.selectedItem !== void 0)
      if (this.cameraVisibility) {
        if (this.selectedItem.isLight === !0 && !this.lightVisibility) {
          const e = this.lightHelpers.get(this.selectedItem.name);
          e !== void 0 && (e.visible = i);
        }
      } else {
        const e = this.cameraHelpers.get(this.selectedItem.name);
        e !== void 0 && (e.visible = i);
      }
  }
  onUpdateTransform = () => {
    this.selectedItem !== void 0 && (this.props.three.updateObject(this.selectedItem.uuid, "position", this.selectedItem.position), this.props.three.updateObject(this.selectedItem.uuid, "rotation", {
      x: this.selectedItem.rotation.x,
      y: this.selectedItem.rotation.y,
      z: this.selectedItem.rotation.z
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), ie.instance.update());
  };
  // Utils
  clearLightHelpers = () => {
    this.lightHelpers.forEach((i) => {
      this.helpersContainer.remove(i), i.dispose();
    }), this.lightHelpers.clear();
  };
  addLightHelpers = (i) => {
    i.traverse((e) => {
      if (e.type.search("Light") > -1) {
        let t;
        switch (e.type) {
          case "DirectionalLight":
            t = new X(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new J(e, 250), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new j(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new Y(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new $(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(i, e) {
    const t = this.controls.get(i.name);
    if (t !== void 0 && t.dispose(), this.controls.delete(i.name), i.name === "UI") return;
    const s = new Z(i, e);
    switch (s.enableDamping = !0, s.dampingFactor = 0.1, i.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        s.enableRotate = !1;
        break;
    }
    this.controls.set(i.name, s);
  }
  clearCamera(i) {
    const e = this.cameraHelpers.get(i.name);
    e !== void 0 && (this.helpersContainer.remove(e), e.dispose(), this.cameraHelpers.delete(i.name));
    const t = this.controls.get(i.name);
    t !== void 0 && (t.dispose(), this.controls.delete(i.name));
  }
  killControls() {
    this.controls.forEach((i, e) => {
      i.dispose();
      const t = this.cameraHelpers.get(e);
      t !== void 0 && (this.helpersContainer.remove(t), t.dispose()), this.cameraHelpers.delete(e), this.controls.delete(e);
    }), this.controls.clear(), this.cameraHelpers.clear();
  }
  assignControls() {
    switch (this.state.mode) {
      case "Single":
        this.createControls(this.tlCam, this.tlWindow.current);
        break;
      case "Side by Side":
      case "Stacked":
        this.createControls(this.tlCam, this.tlWindow.current), this.createControls(this.trCam, this.trWindow.current);
        break;
      case "Quad":
        this.createControls(this.tlCam, this.tlWindow.current), this.createControls(this.trCam, this.trWindow.current), this.createControls(this.blCam, this.blWindow.current), this.createControls(this.brCam, this.brWindow.current);
        break;
    }
  }
  updateCamera = (i, e, t, s) => {
    switch (this.state.mode) {
      case "Quad":
        e < s ? i < t ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam : i < t ? this.currentCamera = this.blCam : this.currentCamera = this.brCam;
        break;
      case "Side by Side":
        i < t ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam;
        break;
      case "Single":
        this.currentCamera = this.tlCam;
        break;
      case "Stacked":
        e < s ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam;
        break;
    }
    this.splineEditor.camera = this.currentCamera, this.raycaster.setFromCamera(this.pointer, this.currentCamera), this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), m.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (i, e = !1) => {
    if (this.selectedItem === void 0) return;
    cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const t = 0.15;
    this.cameraControlsStartTime = performance.now(), this.cameraControlsLastTime = this.cameraControlsStartTime, this.selectedItem.getWorldPosition(i.target0);
    const s = () => {
      const a = performance.now(), r = (a - this.cameraControlsLastTime) / 1e3;
      this.cameraControlsLastTime = a, this.cameraControls && this.cameraControls.update(r), e && (i.target.lerp(i.target0, t), i.object.position.lerp(i.position0, t), i.object.zoom = ne(i.object.zoom, i.zoom0, t), i.object.updateProjectionMatrix(), i.dispatchEvent({ type: "change" })), (a - this.cameraControlsStartTime) / 1e3 >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(s);
    };
    s();
  };
  clearControls = () => {
    this.cameraControls !== void 0 && (this.cameraControls.disconnect(), this.cameraControls.dispose(), this.cameraControls = void 0);
  };
  saveExpandedCameraVisibility() {
    localStorage.setItem(this.expandedCameraVisibility, this.cameraVisibility ? "open" : "closed");
  }
  saveExpandedLightVisibility() {
    localStorage.setItem(this.expandedLightVisibility, this.lightVisibility ? "open" : "closed");
  }
  saveExpandedGridVisibility() {
    localStorage.setItem(this.expandedGridVisibility, this.gridVisibility ? "open" : "closed");
  }
  // Drawing
  getSceneOverride(i) {
    switch (i) {
      case "Depth":
        return this.depthMaterial;
      case "Normals":
        return this.normalsMaterial;
      case "Renderer":
        return null;
      case "UVs":
        return this.uvMaterial;
      case "Wireframe":
        return this.wireframeMaterial;
    }
    return null;
  }
  drawTo(i, e, t, s, a, r) {
    switch (a.name) {
      case "Left":
      case "Right":
        this.grid && (this.grid.rotation.z = Math.PI / 2);
        break;
      case "Front":
      case "Back":
        this.grid && (this.grid.rotation.x = Math.PI / 2);
        break;
    }
    this.scene.overrideMaterial = r, this.renderer && (this.renderer?.setScissor(i, e, t, s), this.renderer?.setViewport(i, e, t, s), this.renderer?.render(this.scene, a)), this.grid && this.grid.rotation.set(0, 0, 0);
  }
  drawSingle() {
    const i = this.getSceneOverride(this.tlRender);
    this.drawTo(0, 0, this.width, this.height, this.tlCam, i);
  }
  drawDouble = () => {
    const i = this.getSceneOverride(this.tlRender), e = this.getSceneOverride(this.trRender), t = Math.floor(this.width / 2), s = Math.floor(this.height / 2), a = this.renderer instanceof A;
    if (this.state.mode === "Side by Side")
      this.drawTo(0, 0, t, this.height, this.tlCam, i), this.drawTo(t, 0, t, this.height, this.trCam, e);
    else {
      const r = this.height - s;
      a ? (this.drawTo(0, 0, this.width, s, this.tlCam, i), this.drawTo(0, r, this.width, s, this.trCam, e)) : (this.drawTo(0, r, this.width, s, this.tlCam, i), this.drawTo(0, 0, this.width, s, this.trCam, e));
    }
  };
  drawQuad = () => {
    const i = this.renderer instanceof A, e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = this.getSceneOverride(this.blRender), a = this.getSceneOverride(this.brRender), r = Math.floor(this.width / 2), n = Math.floor(this.height / 2), d = this.height - n;
    let l = 0, f = i ? 0 : this.height - n;
    l = 0, this.drawTo(l, f, r, n, this.tlCam, e), l = r, this.drawTo(l, f, r, n, this.trCam, t), f = i ? d : 0, l = 0, this.scene.overrideMaterial = s, this.drawTo(l, f, r, n, this.blCam, s), l = r, this.drawTo(l, f, r, n, this.brCam, a);
  };
  // Getters
  get appID() {
    return this.props.three.name;
  }
  get mode() {
    return this.state.mode;
  }
  get three() {
    return this.props.three;
  }
  get expandedCameraVisibility() {
    return `${this.appID}_multiviewCameraVisibility`;
  }
  get expandedLightVisibility() {
    return `${this.appID}_multiviewLightVisibility`;
  }
  get expandedGridVisibility() {
    return `${this.appID}_multiviewGridVisibility`;
  }
}
export {
  k as default
};
