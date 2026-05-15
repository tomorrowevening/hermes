import { defaultTheatreCallback as t, noop as a } from "./core/types.js";
import { detectSettings as l } from "./utils/detectSettings.js";
import { ImageSequenceCapturer as m } from "./utils/ImageSequenceCapturer.js";
import { clamp as i, cubicBezier as n, damp as d, distance as c, getAngle as x, map as f, mix as u, normalize as M, rgbaToHex as T, roundTo as b } from "./utils/math.js";
import { animateObjectMaterial as O, animateObjectTransform as g, applyObjectMaterial as j, getObjectMaterialObject as y, getObjectMaterialProps as B, useStudio as C } from "./utils/theatre.js";
import { ExportTexture as A, anchorGeometry as E, anchorGeometryTL as P, createMask as R, dispose as S, disposeMaterial as v, disposeTexture as H, hierarchyUUID as z, orthoCamera as G, parseModelLite as I, renderToTexture as L, resetThreeObjects as U, setMaterialBlendAdd as q, setMaterialBlendMultiply as w, setMaterialBlendNormal as D, setMaterialBlendScreen as N, supportsOffscreenCanvas as W, totalThreeObjects as F, triangle as J, updateCameraOrtho as K, updateCameraOrtho16x9 as Q, useMask as V } from "./utils/three.js";
import { ElementProxy as Y, WebworkerEventHandlers as Z } from "./webworkers/EventHandling.js";
import { ElementProxyReceiver as $, ProxyManager as ee } from "./webworkers/ProxyManager.js";
import { default as te } from "./core/Application.js";
import { default as oe } from "./core/remote/BaseRemote.js";
import { default as pe } from "./core/remote/RemoteTheatre.js";
import { default as se } from "./core/remote/RemoteThree.js";
import { default as ne } from "./editor/HermesApp.js";
export {
  te as Application,
  oe as BaseRemote,
  Y as ElementProxy,
  $ as ElementProxyReceiver,
  A as ExportTexture,
  ne as HermesApp,
  m as ImageSequenceCapturer,
  ee as ProxyManager,
  pe as RemoteTheatre,
  se as RemoteThree,
  Z as WebworkerEventHandlers,
  E as anchorGeometry,
  P as anchorGeometryTL,
  O as animateObjectMaterial,
  g as animateObjectTransform,
  j as applyObjectMaterial,
  i as clamp,
  R as createMask,
  n as cubicBezier,
  d as damp,
  t as defaultTheatreCallback,
  l as detectSettings,
  S as dispose,
  v as disposeMaterial,
  H as disposeTexture,
  c as distance,
  x as getAngle,
  y as getObjectMaterialObject,
  B as getObjectMaterialProps,
  z as hierarchyUUID,
  f as map,
  u as mix,
  a as noop,
  M as normalize,
  G as orthoCamera,
  I as parseModelLite,
  L as renderToTexture,
  U as resetThreeObjects,
  T as rgbaToHex,
  b as roundTo,
  q as setMaterialBlendAdd,
  w as setMaterialBlendMultiply,
  D as setMaterialBlendNormal,
  N as setMaterialBlendScreen,
  W as supportsOffscreenCanvas,
  F as totalThreeObjects,
  J as triangle,
  K as updateCameraOrtho,
  Q as updateCameraOrtho16x9,
  V as useMask,
  C as useStudio
};
