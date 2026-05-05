import { defaultTheatreCallback as t, noop as a } from "./core/types.js";
import { capitalize as l, colorToHex as p, copyToClipboard as f, isColor as m, randomID as s } from "./editor/utils.js";
import { detectMaxFrameRate as i, detectSettings as n } from "./utils/detectSettings.js";
import { ImageSequenceCapturer as u } from "./utils/ImageSequenceCapturer.js";
import { clamp as M, cubicBezier as b, damp as T, distance as h, getAngle as g, map as C, mix as O, normalize as j, rgbaToHex as I, roundTo as y } from "./utils/math.js";
import { animateObjectMaterial as G, animateObjectTransform as B, applyObjectMaterial as D, customizeTheatreElements as P, getObjectMaterialObject as S, getObjectMaterialProps as H, useStudio as A } from "./utils/theatre.js";
import { ExportTexture as R, anchorGeometry as U, anchorGeometryTL as k, createMask as v, dispose as w, disposeMaterial as z, disposeTexture as V, hierarchyUUID as L, orthoCamera as q, parseModelLite as F, renderToTexture as W, resetThreeObjects as J, setMaterialBlendAdd as K, setMaterialBlendMultiply as Q, setMaterialBlendNormal as X, setMaterialBlendScreen as Y, supportsOffscreenCanvas as Z, totalThreeObjects as _, triangle as $, updateCameraOrtho as ee, updateCameraOrtho16x9 as re, useMask as te } from "./utils/three.js";
import { clearComposerGroups as oe, generateCubemap as le, inspectComposer as pe, inspectComposerPass as fe } from "./utils/post.js";
import { ElementProxy as se, WebworkerEventHandlers as de } from "./webworkers/EventHandling.js";
import { ElementProxyReceiver as ne, ProxyManager as xe } from "./webworkers/ProxyManager.js";
import { default as ce } from "./core/Application.js";
import { default as be } from "./core/remote/BaseRemote.js";
import { default as he } from "./core/remote/RemoteTheatre.js";
import { default as Ce } from "./core/remote/RemoteThree.js";
import { default as je } from "./editor/components/NavButton.js";
import { default as ye } from "./editor/components/DraggableItem.js";
import { default as Ge } from "./editor/components/Draggable.js";
import { default as De } from "./editor/components/DropdownItem.js";
import { default as Se } from "./editor/components/Dropdown.js";
import { default as Ae } from "./editor/sidePanel/SidePanel.js";
import { default as Re } from "./editor/sidePanel/Accordion.js";
import { default as ke } from "./editor/sidePanel/ChildObject.js";
import { default as we } from "./editor/sidePanel/ContainerObject.js";
import { default as Ve } from "./editor/sidePanel/inspector/Inspector.js";
import { default as qe } from "./editor/multiView/MultiView.js";
import { default as We } from "./editor/Editor.js";
import { default as Ke } from "./editor/ThreeEditor.js";
import { default as Xe } from "./editor/HermesApp.js";
import { default as Ze } from "./editor/tools/Transform.js";
import { default as $e } from "./editor/tools/splineEditor/Spline.js";
import { default as rr } from "./editor/tools/splineEditor/index.js";
import { default as ar } from "./editor/multiView/InfiniteGridMaterial.js";
import { default as lr } from "./editor/multiView/InfiniteGridNodeMaterial.js";
import { default as fr } from "./editor/multiView/InfiniteGridHelper.js";
import { default as sr } from "./editor/multiView/InfiniteGridHelperGPU.js";
import { default as ir } from "./editor/multiView/DepthNodeMaterial.js";
import { default as xr } from "./editor/multiView/UVMaterial.js";
import { default as cr } from "./editor/multiView/UVNodeMaterial.js";
export {
  Re as Accordion,
  ce as Application,
  be as BaseRemote,
  ke as ChildObject,
  we as ContainerObject,
  ir as DepthNodeMaterial,
  Ge as Draggable,
  ye as DraggableItem,
  Se as Dropdown,
  De as DropdownItem,
  We as Editor,
  se as ElementProxy,
  ne as ElementProxyReceiver,
  R as ExportTexture,
  Xe as HermesApp,
  u as ImageSequenceCapturer,
  fr as InfiniteGridHelper,
  sr as InfiniteGridHelperGPU,
  ar as InfiniteGridMaterial,
  lr as InfiniteGridNodeMaterial,
  Ve as Inspector,
  qe as MultiView,
  je as NavButton,
  xe as ProxyManager,
  he as RemoteTheatre,
  Ce as RemoteThree,
  Ae as SidePanel,
  $e as Spline,
  rr as SplineEditor,
  Ke as ThreeEditor,
  Ze as Transform,
  xr as UVMaterial,
  cr as UVNodeMaterial,
  de as WebworkerEventHandlers,
  U as anchorGeometry,
  k as anchorGeometryTL,
  G as animateObjectMaterial,
  B as animateObjectTransform,
  D as applyObjectMaterial,
  l as capitalize,
  M as clamp,
  oe as clearComposerGroups,
  p as colorToHex,
  f as copyToClipboard,
  v as createMask,
  b as cubicBezier,
  P as customizeTheatreElements,
  T as damp,
  t as defaultTheatreCallback,
  i as detectMaxFrameRate,
  n as detectSettings,
  w as dispose,
  z as disposeMaterial,
  V as disposeTexture,
  h as distance,
  le as generateCubemap,
  g as getAngle,
  S as getObjectMaterialObject,
  H as getObjectMaterialProps,
  L as hierarchyUUID,
  pe as inspectComposer,
  fe as inspectComposerPass,
  m as isColor,
  C as map,
  O as mix,
  a as noop,
  j as normalize,
  q as orthoCamera,
  F as parseModelLite,
  s as randomID,
  W as renderToTexture,
  J as resetThreeObjects,
  I as rgbaToHex,
  y as roundTo,
  K as setMaterialBlendAdd,
  Q as setMaterialBlendMultiply,
  X as setMaterialBlendNormal,
  Y as setMaterialBlendScreen,
  Z as supportsOffscreenCanvas,
  _ as totalThreeObjects,
  $ as triangle,
  ee as updateCameraOrtho,
  re as updateCameraOrtho16x9,
  te as useMask,
  A as useStudio
};
