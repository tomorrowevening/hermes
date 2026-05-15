import { getGPUTier as c } from "detect-gpu";
function h(s = !1, r = !1) {
  return new Promise((a) => {
    c().then((e) => {
      let t = !1;
      const o = document.createElement("canvas"), f = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (t = "transferControlToOffscreen" in o, f) {
        const n = navigator.userAgent.match(/version\/(\d+)/i);
        t = (n ? parseInt(n[1]) : 0) >= 17;
      }
      const i = {
        dpr: devicePixelRatio,
        width: innerWidth,
        height: innerHeight,
        mobile: e.isMobile !== void 0 ? e.isMobile : !1,
        supportOffScreenCanvas: t,
        supportWebGPU: !!navigator.gpu,
        quality: "Low",
        dev: s,
        editor: r
      };
      e.tier === 3 ? i.quality = "High" : e.tier === 2 && (i.quality = "Medium"), a(i);
    });
  });
}
export {
  h as detectSettings
};
