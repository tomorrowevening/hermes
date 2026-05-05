import { getGPUTier as c } from "detect-gpu";
function m(o) {
  let n = 0;
  const i = performance.now();
  function e() {
    n++;
    const t = performance.now();
    if (t - i >= 100) {
      const s = n / ((t - i) / 1e3), f = Math.round(s / 30) * 30;
      o(f);
    } else
      requestAnimationFrame(e);
  }
  requestAnimationFrame(e);
}
function d(o = !1, n = !1) {
  return new Promise((i) => {
    c().then((e) => {
      let t = !1;
      const s = document.createElement("canvas"), f = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (t = "transferControlToOffscreen" in s, f) {
        const a = navigator.userAgent.match(/version\/(\d+)/i);
        t = (a ? parseInt(a[1]) : 0) >= 17;
      }
      const r = {
        dpr: devicePixelRatio,
        fps: 30,
        width: innerWidth,
        height: innerHeight,
        mobile: e.isMobile !== void 0 ? e.isMobile : !1,
        supportOffScreenCanvas: t,
        supportWebGPU: !!navigator.gpu,
        quality: "Low",
        dev: o,
        editor: n
      };
      e.tier === 3 ? r.quality = "High" : e.tier === 2 && (r.quality = "Medium"), m((a) => {
        r.fps = a, i(r);
      });
    });
  });
}
export {
  m as detectMaxFrameRate,
  d as detectSettings
};
