const s = a([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "button",
  "pointerId",
  "pointerType",
  "clientX",
  "clientY",
  "pageX",
  "pageY"
]), l = a([
  "clientX",
  "clientY",
  "deltaX",
  "deltaY",
  "deltaMode"
]), h = a([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "keyCode"
]);
function y(e, n) {
  e.preventDefault(), l(e, n);
}
function f(e) {
  e.preventDefault();
}
function m(e, n, t) {
  for (const r of n)
    t[r] = e[r];
}
function a(e) {
  return function(t, r) {
    const o = { type: t.type };
    m(t, e, o), r(o);
  };
}
function c(e, n) {
  const t = [], r = { type: e.type, touches: t };
  for (let o = 0; o < e.touches.length; ++o) {
    const i = e.touches[o];
    t.push({
      pageX: i.pageX,
      pageY: i.pageY
    });
  }
  n(r);
}
const w = {
  37: !0,
  // left
  38: !0,
  // up
  39: !0,
  // right
  40: !0
  // down
};
function v(e, n) {
  const { keyCode: t } = e;
  w[t] && (e.preventDefault(), h(e, n));
}
const E = {
  contextmenu: f,
  mousedown: s,
  mousemove: s,
  mouseup: s,
  pointerdown: s,
  pointermove: s,
  pointerup: s,
  touchstart: c,
  touchmove: c,
  touchend: c,
  wheel: y,
  keydown: v
};
let g = 0;
class H {
  id;
  worker;
  constructor(n, t, r) {
    this.id = g++, this.worker = t;
    const o = (d) => {
      this.worker.postMessage({
        type: "event",
        id: this.id,
        data: d
      });
    };
    t.postMessage({
      type: "makeProxy",
      id: this.id
    });
    for (const [d, p] of Object.entries(r))
      n.addEventListener(d, (u) => {
        p(u, o);
      });
    function i() {
      o({
        type: "resize",
        left: 0,
        top: 0,
        width: innerWidth,
        height: innerHeight
      });
    }
    window.addEventListener("resize", i), i();
  }
}
export {
  H as ElementProxy,
  E as WebworkerEventHandlers
};
