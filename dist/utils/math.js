function E(n, t, r) {
  return Math.min(t, Math.max(n, r));
}
function B(n, t, r) {
  return (r - n) / (t - n);
}
function T(n, t, r) {
  return n * (1 - r) + t * r;
}
function G(n, t, r, o, c) {
  return T(r, o, B(n, t, c));
}
function I(n, t) {
  const r = n - t;
  return Math.sqrt(r * r);
}
function L(n, t, r, o) {
  return T(n, t, 1 - Math.exp(-r * o));
}
function N(n, t = 1) {
  return Number(n.toFixed(t));
}
function j(n, t, r, o) {
  return Math.atan2(o - t, r - n);
}
function S(n, t, r, o) {
  return n === t && r === o;
}
function q(n, t, r, o) {
  return 1 / (3 * t * n * n + 2 * r * n + o);
}
function C(n, t, r, o, c) {
  return t * (n * n * n) + r * (n * n) + o * n + c;
}
function D(n, t, r, o, c) {
  const u = n * n;
  return t * (u * n) + r * u + o * n + c;
}
function k(n, t, r, o, c) {
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  if (S(t, r, o, c)) return n;
  const u = 0, a = 0, s = t, f = r, x = o, h = c, $ = 1, g = 1, M = $ - 3 * x + 3 * s - u, d = 3 * x - 6 * s + 3 * u, l = 3 * s - 3 * u, y = u, b = g - 3 * h + 3 * f - a, p = 3 * h - 6 * f + 3 * a, H = 3 * f - 3 * a, z = a;
  let i = n;
  for (let F = 0; F < 5; F++) {
    const A = C(i, M, d, l, y);
    let m = q(i, M, d, l);
    m === 1 / 0 && (m = n), i -= (A - n) * m, i = Math.min(Math.max(i, 0), 1);
  }
  return D(i, b, p, H, z);
}
const e = (n) => Math.round(Math.min(1, Math.max(0, n)) * 255).toString(16).padStart(2, "0");
function w({ r: n, g: t, b: r, a: o = 1 }) {
  const c = `#${e(n)}${e(t)}${e(r)}`;
  return o < 1 ? `${c}${e(o)}` : c;
}
export {
  E as clamp,
  k as cubicBezier,
  L as damp,
  I as distance,
  j as getAngle,
  G as map,
  T as mix,
  B as normalize,
  w as rgbaToHex,
  N as roundTo
};
