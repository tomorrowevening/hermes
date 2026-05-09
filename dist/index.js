import { defaultTheatreCallback as t, noop as a } from "./core/types.js";
import { detectMaxFrameRate as s, detectSettings as p } from "./utils/detectSettings.js";
import { ImageSequenceCapturer as l } from "./utils/ImageSequenceCapturer.js";
import { clamp as n, cubicBezier as c, damp as d, distance as x, getAngle as f, map as u, mix as M, normalize as T, rgbaToHex as b, roundTo as h } from "./utils/math.js";
import { animateObjectMaterial as g, animateObjectTransform as C, applyObjectMaterial as j, customizeTheatreElements as y, getObjectMaterialObject as B, getObjectMaterialProps as E, useStudio as P } from "./utils/theatre.js";
import { ExportTexture as k, anchorGeometry as A, anchorGeometryTL as S, createMask as v, dispose as z, disposeMaterial as G, disposeTexture as H, hierarchyUUID as I, orthoCamera as L, parseModelLite as U, renderToTexture as q, resetThreeObjects as w, setMaterialBlendAdd as D, setMaterialBlendMultiply as F, setMaterialBlendNormal as N, setMaterialBlendScreen as W, supportsOffscreenCanvas as J, totalThreeObjects as K, triangle as Q, updateCameraOrtho as V, updateCameraOrtho16x9 as X, useMask as Y } from "./utils/three.js";
import { clearComposerGroups as _, generateCubemap as $, inspectComposer as ee, inspectComposerPass as re } from "./utils/post.js";
import { ElementProxy as ae, WebworkerEventHandlers as oe } from "./webworkers/EventHandling.js";
import { ElementProxyReceiver as pe, ProxyManager as me } from "./webworkers/ProxyManager.js";
import { default as ie } from "./core/Application.js";
import { default as ce } from "./core/remote/BaseRemote.js";
import { default as xe } from "./core/remote/RemoteTheatre.js";
import { default as ue } from "./core/remote/RemoteThree.js";
import { default as Te } from "./editor/HermesApp.js";
export {
  ie as Application,
  ce as BaseRemote,
  ae as ElementProxy,
  pe as ElementProxyReceiver,
  k as ExportTexture,
  Te as HermesApp,
  l as ImageSequenceCapturer,
  me as ProxyManager,
  xe as RemoteTheatre,
  ue as RemoteThree,
  oe as WebworkerEventHandlers,
  A as anchorGeometry,
  S as anchorGeometryTL,
  g as animateObjectMaterial,
  C as animateObjectTransform,
  j as applyObjectMaterial,
  n as clamp,
  _ as clearComposerGroups,
  v as createMask,
  c as cubicBezier,
  y as customizeTheatreElements,
  d as damp,
  t as defaultTheatreCallback,
  s as detectMaxFrameRate,
  p as detectSettings,
  z as dispose,
  G as disposeMaterial,
  H as disposeTexture,
  x as distance,
  $ as generateCubemap,
  f as getAngle,
  B as getObjectMaterialObject,
  E as getObjectMaterialProps,
  I as hierarchyUUID,
  ee as inspectComposer,
  re as inspectComposerPass,
  u as map,
  M as mix,
  a as noop,
  T as normalize,
  L as orthoCamera,
  U as parseModelLite,
  q as renderToTexture,
  w as resetThreeObjects,
  b as rgbaToHex,
  h as roundTo,
  D as setMaterialBlendAdd,
  F as setMaterialBlendMultiply,
  N as setMaterialBlendNormal,
  W as setMaterialBlendScreen,
  J as supportsOffscreenCanvas,
  K as totalThreeObjects,
  Q as triangle,
  V as updateCameraOrtho,
  X as updateCameraOrtho16x9,
  Y as useMask,
  P as useStudio
};
