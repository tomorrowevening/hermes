import { NodeMaterial as q, DoubleSide as E, Color as j } from "three/webgpu";
import { uniform as u, varyingProperty as k, Fn as v, positionLocal as A, vec3 as B, cameraPosition as n, float as i, fwidth as H, abs as x, fract as J, min as h, max as D, distance as K, log as P, pow as S, floor as Q, mix as C, If as U, lessThanEqual as V, Discard as X, vec4 as Y } from "three/tsl";
class ii extends q {
  uScale;
  uDivisions;
  uColor;
  uDistance;
  uSubgridOpacity;
  uGridOpacity;
  constructor(t) {
    super(), this.name = "InfiniteGrid", this.side = E, this.transparent = !0, this.uScale = u(t?.scale ?? 0.1), this.uDivisions = u(t?.divisions ?? 10), this.uColor = u(t?.color ?? new j(16777215)), this.uDistance = u(t?.distance ?? 1e4), this.uSubgridOpacity = u(t?.subgridOpacity ?? 0.15), this.uGridOpacity = u(t?.gridOpacity ?? 0.25);
    const { uScale: c, uDivisions: a, uColor: N, uDistance: y, uSubgridOpacity: f, uGridOpacity: d } = this, l = k("vec3", "vWorldPosition");
    this.positionNode = v(() => {
      const s = A.xzy.mul(y).add(
        B(n.x, i(0), n.z)
      );
      return l.assign(s), s;
    })();
    const g = v(([s]) => {
      const e = l.xz.div(s), b = H(e), r = x(J(e.sub(0.5)).sub(0.5)).div(b).div(2), o = h(r.x, r.y);
      return i(1).sub(h(o, i(1)));
    });
    this.outputNode = v(() => {
      const s = l, e = D(i(200), x(n.y.sub(s.y))), b = i(K(n, s)), r = P(e).div(P(a)), o = S(a, Q(r)), m = o.mul(a), z = m.mul(a), F = g(o.mul(c)), I = g(m.mul(c)), T = g(z.mul(c)), L = e.sub(o).div(m.sub(o)), O = i(0.3), G = D(
        L.sub(i(1)).add(O),
        i(0)
      ).div(O), p = F.mul(
        S(i(1).sub(h(b.div(y), i(1))), i(3))
      ), M = i(0.5), R = p.sub(G).mul(f), W = C(
        R,
        p.mul(d).sub(
          G.mul(d.sub(f)).mul(M)
        ),
        I
      ), w = i(C(W, p.mul(d), T));
      return U(V(w, i(1 / 127)), () => {
        X();
      }), Y(N, w);
    })();
  }
  // Getters / Setters
  get color() {
    return this.uColor.value;
  }
  set color(t) {
    this.uColor.value = t;
  }
  get gridOpacity() {
    return this.uGridOpacity.value;
  }
  set gridOpacity(t) {
    this.uGridOpacity.value = t;
  }
  get subgridOpacity() {
    return this.uSubgridOpacity.value;
  }
  set subgridOpacity(t) {
    this.uSubgridOpacity.value = t;
  }
}
export {
  ii as default
};
