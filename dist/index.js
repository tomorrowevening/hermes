import { defaultTheatreCallback as t, noop as a } from "./core/types.js";
import { EDITOR_UTILS as p, convertImageToBase64 as l, determineIcon as f, getSubItem as m, setItemProps as s, stripObject as d, stripScene as i, textureFromSrc as n } from "./editor/sidePanel/utils.js";
import { capitalize as u, colorToHex as c, copyToClipboard as M, isColor as T, randomID as b } from "./editor/utils.js";
import { detectMaxFrameRate as h, detectSettings as I } from "./utils/detectSettings.js";
import { ImageSequenceCapturer as C } from "./utils/ImageSequenceCapturer.js";
import { clamp as S, cubicBezier as y, damp as E, distance as B, getAngle as D, map as G, mix as P, normalize as H, rgbaToHex as R, roundTo as U } from "./utils/math.js";
import { animateObjectMaterial as A, animateObjectTransform as N, applyObjectMaterial as k, customizeTheatreElements as w, getObjectMaterialObject as z, getObjectMaterialProps as L, useStudio as V } from "./utils/theatre.js";
import { ExportTexture as q, anchorGeometry as W, anchorGeometryTL as _, createMask as J, dispose as K, disposeMaterial as Q, disposeTexture as X, hierarchyUUID as Y, orthoCamera as Z, parseModelLite as $, renderToTexture as ee, resetThreeObjects as re, setMaterialBlendAdd as te, setMaterialBlendMultiply as ae, setMaterialBlendNormal as oe, setMaterialBlendScreen as pe, supportsOffscreenCanvas as le, totalThreeObjects as fe, triangle as me, updateCameraOrtho as se, updateCameraOrtho16x9 as de, useMask as ie } from "./utils/three.js";
import { clearComposerGroups as xe, generateCubemap as ue, inspectComposer as ce, inspectComposerPass as Me } from "./utils/post.js";
import { ElementProxy as be, WebworkerEventHandlers as ge } from "./webworkers/EventHandling.js";
import { ElementProxyReceiver as Ie, ProxyManager as Oe } from "./webworkers/ProxyManager.js";
import { default as je } from "./core/Application.js";
import { default as ye } from "./core/remote/BaseRemote.js";
import { default as Be } from "./core/remote/RemoteTheatre.js";
import { default as Ge } from "./core/remote/RemoteThree.js";
import { default as He } from "./editor/components/NavButton.js";
import { default as Ue } from "./editor/components/DraggableItem.js";
import { default as Ae } from "./editor/components/Draggable.js";
import { default as ke } from "./editor/components/DropdownItem.js";
import { default as ze } from "./editor/components/Dropdown.js";
import { default as Ve } from "./editor/sidePanel/SidePanel.js";
import { default as qe } from "./editor/sidePanel/Accordion.js";
import { default as _e } from "./editor/sidePanel/ChildObject.js";
import { default as Ke } from "./editor/sidePanel/ContainerObject.js";
import { default as Xe } from "./editor/sidePanel/inspector/Inspector.js";
import { default as Ze } from "./editor/multiView/MultiView.js";
import { default as er } from "./editor/Editor.js";
import { default as tr } from "./editor/ThreeEditor.js";
import { default as or } from "./editor/HermesApp.js";
import { default as lr } from "./editor/tools/Transform.js";
import { default as mr } from "./editor/tools/splineEditor/Spline.js";
import { default as dr } from "./editor/tools/splineEditor/index.js";
import { default as nr } from "./editor/multiView/InfiniteGridMaterial.js";
import { default as ur } from "./editor/multiView/InfiniteGridNodeMaterial.js";
import { default as Mr } from "./editor/multiView/InfiniteGridHelper.js";
import { default as br } from "./editor/multiView/InfiniteGridHelperGPU.js";
import { default as hr } from "./editor/multiView/DepthNodeMaterial.js";
import { default as Or } from "./editor/multiView/UVMaterial.js";
import { default as jr } from "./editor/multiView/UVNodeMaterial.js";
export {
  qe as Accordion,
  je as Application,
  ye as BaseRemote,
  _e as ChildObject,
  Ke as ContainerObject,
  hr as DepthNodeMaterial,
  Ae as Draggable,
  Ue as DraggableItem,
  ze as Dropdown,
  ke as DropdownItem,
  p as EDITOR_UTILS,
  er as Editor,
  be as ElementProxy,
  Ie as ElementProxyReceiver,
  q as ExportTexture,
  or as HermesApp,
  C as ImageSequenceCapturer,
  Mr as InfiniteGridHelper,
  br as InfiniteGridHelperGPU,
  nr as InfiniteGridMaterial,
  ur as InfiniteGridNodeMaterial,
  Xe as Inspector,
  Ze as MultiView,
  He as NavButton,
  Oe as ProxyManager,
  Be as RemoteTheatre,
  Ge as RemoteThree,
  Ve as SidePanel,
  mr as Spline,
  dr as SplineEditor,
  tr as ThreeEditor,
  lr as Transform,
  Or as UVMaterial,
  jr as UVNodeMaterial,
  ge as WebworkerEventHandlers,
  W as anchorGeometry,
  _ as anchorGeometryTL,
  A as animateObjectMaterial,
  N as animateObjectTransform,
  k as applyObjectMaterial,
  u as capitalize,
  S as clamp,
  xe as clearComposerGroups,
  c as colorToHex,
  l as convertImageToBase64,
  M as copyToClipboard,
  J as createMask,
  y as cubicBezier,
  w as customizeTheatreElements,
  E as damp,
  t as defaultTheatreCallback,
  h as detectMaxFrameRate,
  I as detectSettings,
  f as determineIcon,
  K as dispose,
  Q as disposeMaterial,
  X as disposeTexture,
  B as distance,
  ue as generateCubemap,
  D as getAngle,
  z as getObjectMaterialObject,
  L as getObjectMaterialProps,
  m as getSubItem,
  Y as hierarchyUUID,
  ce as inspectComposer,
  Me as inspectComposerPass,
  T as isColor,
  G as map,
  P as mix,
  a as noop,
  H as normalize,
  Z as orthoCamera,
  $ as parseModelLite,
  b as randomID,
  ee as renderToTexture,
  re as resetThreeObjects,
  R as rgbaToHex,
  U as roundTo,
  s as setItemProps,
  te as setMaterialBlendAdd,
  ae as setMaterialBlendMultiply,
  oe as setMaterialBlendNormal,
  pe as setMaterialBlendScreen,
  d as stripObject,
  i as stripScene,
  le as supportsOffscreenCanvas,
  n as textureFromSrc,
  fe as totalThreeObjects,
  me as triangle,
  se as updateCameraOrtho,
  de as updateCameraOrtho16x9,
  ie as useMask,
  V as useStudio
};
