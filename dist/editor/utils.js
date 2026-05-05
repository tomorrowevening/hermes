function d(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function g(t) {
  const n = JSON.stringify(t);
  return navigator.clipboard.writeText(n), n;
}
function h() {
  return Math.round(Math.random() * 1e6).toString();
}
function p(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function f(t) {
  const n = Math.round(t.r * 255), e = Math.round(t.g * 255), i = Math.round(t.b * 255), r = (a) => {
    const o = a.toString(16);
    return o.length === 1 ? "0" + o : o;
  }, c = r(n), u = r(e), s = r(i);
  return "#" + c + u + s;
}
export {
  d as capitalize,
  f as colorToHex,
  g as copyToClipboard,
  p as isColor,
  h as randomID
};
