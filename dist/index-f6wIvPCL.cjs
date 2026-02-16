"use strict";const ge=require("./index-BbHZrFC2.cjs");function lfe(wn,or){for(var eu=0;eu<or.length;eu++){const na=or[eu];if(typeof na!="string"&&!Array.isArray(na)){for(const ar in na)if(ar!=="default"&&!(ar in wn)){const tu=Object.getOwnPropertyDescriptor(na,ar);tu&&Object.defineProperty(wn,ar,tu.get?tu:{enumerable:!0,get:()=>na[ar]})}}}return Object.freeze(Object.defineProperty(wn,Symbol.toStringTag,{value:"Module"}))}var _d={exports:{}};_d.exports;var jY;function sfe(){return jY||(jY=1,function(wn,or){var eu=Object.create,na=Object.freeze,ar=Object.defineProperty,tu=Object.defineProperties,OY=Object.getOwnPropertyDescriptor,_Y=Object.getOwnPropertyDescriptors,DY=Object.getOwnPropertyNames,Dd=Object.getOwnPropertySymbols,TY=Object.getPrototypeOf,Cg=Object.prototype.hasOwnProperty,kS=Object.prototype.propertyIsEnumerable,Og=(e,t)=>{if(t=Symbol[e])return t;throw Error("Symbol."+e+" is not defined")},wS=Math.pow,_g=(e,t,n)=>t in e?ar(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,F=(e,t)=>{for(var n in t||(t={}))Cg.call(t,n)&&_g(e,n,t[n]);if(Dd)for(var n of Dd(t))kS.call(t,n)&&_g(e,n,t[n]);return e},ne=(e,t)=>tu(e,_Y(t)),nu=(e,t)=>{var n={};for(var o in e)Cg.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&Dd)for(var o of Dd(e))t.indexOf(o)<0&&kS.call(e,o)&&(n[o]=e[o]);return n},w=(e,t)=>()=>(e&&(t=e(e=0)),t),Te=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),SS=(e,t)=>{for(var n in t)ar(e,n,{get:t[n],enumerable:!0})},ES=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of DY(t))!Cg.call(e,i)&&i!==n&&ar(e,i,{get:()=>t[i],enumerable:!(o=OY(t,i))||o.enumerable});return e},V=(e,t,n)=>(n=e!=null?eu(TY(e)):{},ES(t||!e||!e.__esModule?ar(n,"default",{value:e,enumerable:!0}):n,e)),AY=e=>ES(ar({},"__esModule",{value:!0}),e),Je=(e,t,n)=>(_g(e,typeof t!="symbol"?t+"":t,n),n),j=(e,t)=>na(ar(e,"raw",{value:na(e.slice())})),_t=(e,t,n)=>new Promise((o,i)=>{var l=d=>{try{c(n.next(d))}catch(p){i(p)}},u=d=>{try{c(n.throw(d))}catch(p){i(p)}},c=d=>d.done?o(d.value):Promise.resolve(d.value).then(l,u);c((n=n.apply(e,t)).next())}),BY=function(e,t){this[0]=e,this[1]=t},zY=e=>{var t=e[Og("asyncIterator")],n=!1,o,i={};return t==null?(t=e[Og("iterator")](),o=l=>i[l]=u=>t[l](u)):(t=t.call(e),o=l=>i[l]=u=>{if(n){if(n=!1,l==="throw")throw u;return u}return n=!0,{done:!1,value:new BY(new Promise(c=>{var d=t[l](u);if(!(d instanceof Object))throw TypeError("Object expected");c(d)}),1)}}),i[Og("iterator")]=()=>i,o("next"),"throw"in t?o("throw"):i.throw=l=>{throw l},"return"in t&&o("return"),i};function qY(e){PS=e}function Z(){return PS}var PS,Pe=w(()=>{});function ra(e){return t=>typeof t=="object"&&!!t&&t.type===e}var IS,Zr,jS,jt,CS,OS,Dg,Tg,Ja=w(()=>{IS=ra("Theatre_Project"),Zr=ra("Theatre_Sheet"),jS=ra("Theatre_SheetTemplate"),jt=ra("Theatre_SheetObject"),CS=ra("Theatre_Sequence"),OS=ra("Theatre_SheetObjectTemplate"),Dg=ra("Theatre_Sheet_PublicAPI"),Tg=ra("Theatre_SheetObject_PublicAPI")}),_S,Ag,DS=w(()=>{_S=typeof ge.commonjsGlobal=="object"&&ge.commonjsGlobal&&ge.commonjsGlobal.Object===Object&&ge.commonjsGlobal,Ag=_S}),TS,AS,Hn,ir=w(()=>{DS(),TS=typeof self=="object"&&self&&self.Object===Object&&self,AS=Ag||TS||Function("return this")(),Hn=AS}),BS,$n,il=w(()=>{ir(),BS=Hn.Symbol,$n=BS});function MY(e){var t=zS.call(e,ll),n=e[ll];try{e[ll]=void 0;var o=!0}catch{}var i=qS.call(e);return o&&(t?e[ll]=n:delete e[ll]),i}var Bg,zS,qS,ll,MS,RY=w(()=>{il(),Bg=Object.prototype,zS=Bg.hasOwnProperty,qS=Bg.toString,ll=$n?$n.toStringTag:void 0,MS=MY});function FY(e){return FS.call(e)}var RS,FS,LS,LY=w(()=>{RS=Object.prototype,FS=RS.toString,LS=FY});function NY(e){return e==null?e===void 0?VS:NS:zg&&zg in Object(e)?MS(e):LS(e)}var NS,VS,zg,oa,sl=w(()=>{il(),RY(),LY(),NS="[object Null]",VS="[object Undefined]",zg=$n?$n.toStringTag:void 0,oa=NY});function VY(e){return e!=null&&typeof e=="object"}var eo,aa=w(()=>{eo=VY});function KY(e){return typeof e=="symbol"||eo(e)&&oa(e)==KS}var KS,Za,ru=w(()=>{sl(),aa(),KS="[object Symbol]",Za=KY});function UY(e,t){for(var n=-1,o=e==null?0:e.length,i=Array(o);++n<o;)i[n]=t(e[n],n,e);return i}var ul,qg=w(()=>{ul=UY}),US,_n,lr=w(()=>{US=Array.isArray,_n=US});function HS(e){if(typeof e=="string")return e;if(_n(e))return ul(e,HS)+"";if(Za(e))return Rg?Rg.call(e):"";var t=e+"";return t=="0"&&1/e==-$S?"-0":t}var $S,Mg,Rg,WS,HY=w(()=>{il(),qg(),lr(),ru(),$S=1/0,Mg=$n?$n.prototype:void 0,Rg=Mg?Mg.toString:void 0,WS=HS});function $Y(e){for(var t=e.length;t--&&GS.test(e.charAt(t)););return t}var GS,YS,WY=w(()=>{GS=/\s/,YS=$Y});function GY(e){return e&&e.slice(0,YS(e)+1).replace(QS,"")}var QS,XS,YY=w(()=>{WY(),QS=/^\s+/,XS=GY});function QY(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var Wn,to=w(()=>{Wn=QY});function XY(e){if(typeof e=="number")return e;if(Za(e))return Fg;if(Wn(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=Wn(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=XS(e);var n=ZS.test(e);return n||eE.test(e)?tE(e.slice(2),n?2:8):JS.test(e)?Fg:+e}var Fg,JS,ZS,eE,tE,Po,ou=w(()=>{YY(),to(),ru(),Fg=NaN,JS=/^[-+]0x[0-9a-f]+$/i,ZS=/^0b[01]+$/i,eE=/^0o[0-7]+$/i,tE=parseInt,Po=XY});function JY(e){if(!e)return e===0?e:0;if(e=Po(e),e===Lg||e===-Lg){var t=e<0?-1:1;return t*nE}return e===e?e:0}var Lg,nE,Td,rE=w(()=>{ou(),Lg=1/0,nE=17976931348623157e292,Td=JY});function ZY(e){var t=Td(e),n=t%1;return t===t?n?t-n:t:0}var au,Ad=w(()=>{rE(),au=ZY});function eQ(e){return e}var iu,Bd=w(()=>{iu=eQ});function tQ(e){if(!Wn(e))return!1;var t=oa(e);return t==aE||t==iE||t==oE||t==lE}var oE,aE,iE,lE,Ng,sE=w(()=>{sl(),to(),oE="[object AsyncFunction]",aE="[object Function]",iE="[object GeneratorFunction]",lE="[object Proxy]",Ng=tQ}),uE,zd,nQ=w(()=>{ir(),uE=Hn["__core-js_shared__"],zd=uE});function rQ(e){return!!Vg&&Vg in e}var Vg,cE,oQ=w(()=>{nQ(),Vg=function(){var e=/[^.]+$/.exec(zd&&zd.keys&&zd.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),cE=rQ});function aQ(e){if(e!=null){try{return fE.call(e)}catch{}try{return e+""}catch{}}return""}var dE,fE,ia,pE=w(()=>{dE=Function.prototype,fE=dE.toString,ia=aQ});function iQ(e){if(!Wn(e)||cE(e))return!1;var t=Ng(e)?xE:mE;return t.test(ia(e))}var hE,mE,gE,vE,bE,yE,xE,kE,lQ=w(()=>{sE(),oQ(),to(),pE(),hE=/[\\^$.*+?()[\]{}|]/g,mE=/^\[object .+?Constructor\]$/,gE=Function.prototype,vE=Object.prototype,bE=gE.toString,yE=vE.hasOwnProperty,xE=RegExp("^"+bE.call(yE).replace(hE,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),kE=iQ});function sQ(e,t){return e?.[t]}var wE,uQ=w(()=>{wE=sQ});function cQ(e,t){var n=wE(e,t);return kE(n)?n:void 0}var la,ei=w(()=>{lQ(),uQ(),la=cQ}),SE,qd,dQ=w(()=>{ei(),ir(),SE=la(Hn,"WeakMap"),qd=SE}),Kg,EE,PE,fQ=w(()=>{to(),Kg=Object.create,EE=function(){function e(){}return function(t){if(!Wn(t))return{};if(Kg)return Kg(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}(),PE=EE});function pQ(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}var IE,hQ=w(()=>{IE=pQ});function mQ(){}var jE,gQ=w(()=>{jE=mQ});function vQ(e,t){var n=-1,o=e.length;for(t||(t=Array(o));++n<o;)t[n]=e[n];return t}var Ug,CE=w(()=>{Ug=vQ});function bQ(e){var t=0,n=0;return function(){var o=DE(),i=_E-(o-n);if(n=o,i>0){if(++t>=OE)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}var OE,_E,DE,TE,yQ=w(()=>{OE=800,_E=16,DE=Date.now,TE=bQ});function xQ(e){return function(){return e}}var AE,kQ=w(()=>{AE=xQ}),BE,lu,zE=w(()=>{ei(),BE=function(){try{var e=la(Object,"defineProperty");return e({},"",{}),e}catch{}}(),lu=BE}),qE,ME,wQ=w(()=>{kQ(),zE(),Bd(),qE=lu?function(e,t){return lu(e,"toString",{configurable:!0,enumerable:!1,value:AE(t),writable:!0})}:iu,ME=qE}),RE,FE,SQ=w(()=>{wQ(),yQ(),RE=TE(ME),FE=RE});function EQ(e,t){for(var n=-1,o=e==null?0:e.length;++n<o&&t(e[n],n,e)!==!1;);return e}var LE,PQ=w(()=>{LE=EQ});function IQ(e,t,n,o){for(var i=e.length,l=n+(o?1:-1);o?l--:++l<i;)if(t(e[l],l,e))return l;return-1}var Md,Hg=w(()=>{Md=IQ});function jQ(e){return e!==e}var NE,CQ=w(()=>{NE=jQ});function OQ(e,t,n){for(var o=n-1,i=e.length;++o<i;)if(e[o]===t)return o;return-1}var VE,_Q=w(()=>{VE=OQ});function DQ(e,t,n){return t===t?VE(e,t,n):Md(e,NE,n)}var $g,KE=w(()=>{Hg(),CQ(),_Q(),$g=DQ});function TQ(e,t){var n=e==null?0:e.length;return!!n&&$g(e,t,0)>-1}var UE,AQ=w(()=>{KE(),UE=TQ});function BQ(e,t){var n=typeof e;return t=t??HE,!!t&&(n=="number"||n!="symbol"&&$E.test(e))&&e>-1&&e%1==0&&e<t}var HE,$E,su,Rd=w(()=>{HE=9007199254740991,$E=/^(?:0|[1-9]\d*)$/,su=BQ});function zQ(e,t,n){t=="__proto__"&&lu?lu(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}var uu,Fd=w(()=>{zE(),uu=zQ});function qQ(e,t){return e===t||e!==e&&t!==t}var cu,Ld=w(()=>{cu=qQ});function MQ(e,t,n){var o=e[t];(!(GE.call(e,t)&&cu(o,n))||n===void 0&&!(t in e))&&uu(e,t,n)}var WE,GE,Nd,Wg=w(()=>{Fd(),Ld(),WE=Object.prototype,GE=WE.hasOwnProperty,Nd=MQ});function RQ(e,t,n,o){var i=!n;n||(n={});for(var l=-1,u=t.length;++l<u;){var c=t[l],d=o?o(n[c],e[c],c,n,e):void 0;d===void 0&&(d=e[c]),i?uu(n,c,d):Nd(n,c,d)}return n}var du,Vd=w(()=>{Wg(),Fd(),du=RQ});function FQ(e,t,n){return t=Gg(t===void 0?e.length-1:t,0),function(){for(var o=arguments,i=-1,l=Gg(o.length-t,0),u=Array(l);++i<l;)u[i]=o[t+i];i=-1;for(var c=Array(t+1);++i<t;)c[i]=o[i];return c[t]=n(u),IE(e,this,c)}}var Gg,YE,LQ=w(()=>{hQ(),Gg=Math.max,YE=FQ});function NQ(e,t){return FE(YE(e,t,iu),e+"")}var Yg,QE=w(()=>{Bd(),LQ(),SQ(),Yg=NQ});function VQ(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=XE}var XE,Kd,Qg=w(()=>{XE=9007199254740991,Kd=VQ});function KQ(e){return e!=null&&Kd(e.length)&&!Ng(e)}var cl,fu=w(()=>{sE(),Qg(),cl=KQ});function UQ(e,t,n){if(!Wn(n))return!1;var o=typeof t;return(o=="number"?cl(n)&&su(t,n.length):o=="string"&&t in n)?cu(n[t],e):!1}var Xg,HQ=w(()=>{Ld(),fu(),Rd(),to(),Xg=UQ});function $Q(e){var t=e&&e.constructor,n=typeof t=="function"&&t.prototype||JE;return e===n}var JE,Ud,Jg=w(()=>{JE=Object.prototype,Ud=$Q});function WQ(e,t){for(var n=-1,o=Array(e);++n<e;)o[n]=t(n);return o}var ZE,GQ=w(()=>{ZE=WQ});function YQ(e){return eo(e)&&oa(e)==e2}var e2,Zg,QQ=w(()=>{sl(),aa(),e2="[object Arguments]",Zg=YQ}),e0,t2,n2,r2,Hd,t0=w(()=>{QQ(),aa(),e0=Object.prototype,t2=e0.hasOwnProperty,n2=e0.propertyIsEnumerable,r2=Zg(function(){return arguments}())?Zg:function(e){return eo(e)&&t2.call(e,"callee")&&!n2.call(e,"callee")},Hd=r2});function XQ(){return!1}var o2,JQ=w(()=>{o2=XQ}),n0,r0,a2,o0,i2,l2,pu,a0=w(()=>{ir(),JQ(),n0=or&&!or.nodeType&&or,r0=n0&&!0&&wn&&!wn.nodeType&&wn,a2=r0&&r0.exports===n0,o0=a2?Hn.Buffer:void 0,i2=o0?o0.isBuffer:void 0,l2=i2||o2,pu=l2});function ZQ(e){return eo(e)&&Kd(e.length)&&!!ut[oa(e)]}var s2,u2,c2,d2,f2,p2,h2,m2,g2,v2,b2,y2,x2,k2,w2,S2,E2,P2,I2,j2,C2,O2,_2,D2,ut,T2,eX=w(()=>{sl(),Qg(),aa(),s2="[object Arguments]",u2="[object Array]",c2="[object Boolean]",d2="[object Date]",f2="[object Error]",p2="[object Function]",h2="[object Map]",m2="[object Number]",g2="[object Object]",v2="[object RegExp]",b2="[object Set]",y2="[object String]",x2="[object WeakMap]",k2="[object ArrayBuffer]",w2="[object DataView]",S2="[object Float32Array]",E2="[object Float64Array]",P2="[object Int8Array]",I2="[object Int16Array]",j2="[object Int32Array]",C2="[object Uint8Array]",O2="[object Uint8ClampedArray]",_2="[object Uint16Array]",D2="[object Uint32Array]",ut={},ut[S2]=ut[E2]=ut[P2]=ut[I2]=ut[j2]=ut[C2]=ut[O2]=ut[_2]=ut[D2]=!0,ut[s2]=ut[u2]=ut[k2]=ut[c2]=ut[w2]=ut[d2]=ut[f2]=ut[p2]=ut[h2]=ut[m2]=ut[g2]=ut[v2]=ut[b2]=ut[y2]=ut[x2]=!1,T2=ZQ});function tX(e){return function(t){return e(t)}}var dl,hu=w(()=>{dl=tX}),i0,fl,A2,$d,B2,ti,l0=w(()=>{DS(),i0=or&&!or.nodeType&&or,fl=i0&&!0&&wn&&!wn.nodeType&&wn,A2=fl&&fl.exports===i0,$d=A2&&Ag.process,B2=function(){try{var e=fl&&fl.require&&fl.require("util").types;return e||$d&&$d.binding&&$d.binding("util")}catch{}}(),ti=B2}),s0,z2,u0,q2=w(()=>{eX(),hu(),l0(),s0=ti&&ti.isTypedArray,z2=s0?dl(s0):T2,u0=z2});function nX(e,t){var n=_n(e),o=!n&&Hd(e),i=!n&&!o&&pu(e),l=!n&&!o&&!i&&u0(e),u=n||o||i||l,c=u?ZE(e.length,String):[],d=c.length;for(var p in e)(t||R2.call(e,p))&&!(u&&(p=="length"||i&&(p=="offset"||p=="parent")||l&&(p=="buffer"||p=="byteLength"||p=="byteOffset")||su(p,d)))&&c.push(p);return c}var M2,R2,c0,F2=w(()=>{GQ(),t0(),lr(),a0(),Rd(),q2(),M2=Object.prototype,R2=M2.hasOwnProperty,c0=nX});function rX(e,t){return function(n){return e(t(n))}}var d0,L2=w(()=>{d0=rX}),N2,V2,oX=w(()=>{L2(),N2=d0(Object.keys,Object),V2=N2});function aX(e){if(!Ud(e))return V2(e);var t=[];for(var n in Object(e))U2.call(e,n)&&n!="constructor"&&t.push(n);return t}var K2,U2,H2,iX=w(()=>{Jg(),oX(),K2=Object.prototype,U2=K2.hasOwnProperty,H2=aX});function lX(e){return cl(e)?c0(e):H2(e)}var pl,mu=w(()=>{F2(),iX(),fu(),pl=lX});function sX(e){var t=[];if(e!=null)for(var n in Object(e))t.push(n);return t}var $2,uX=w(()=>{$2=sX});function cX(e){if(!Wn(e))return $2(e);var t=Ud(e),n=[];for(var o in e)o=="constructor"&&(t||!G2.call(e,o))||n.push(o);return n}var W2,G2,Y2,dX=w(()=>{to(),Jg(),uX(),W2=Object.prototype,G2=W2.hasOwnProperty,Y2=cX});function fX(e){return cl(e)?c0(e,!0):Y2(e)}var Wd,f0=w(()=>{F2(),dX(),fu(),Wd=fX});function pX(e,t){if(_n(e))return!1;var n=typeof e;return n=="number"||n=="symbol"||n=="boolean"||e==null||Za(e)?!0:X2.test(e)||!Q2.test(e)||t!=null&&e in Object(t)}var Q2,X2,Gd,p0=w(()=>{lr(),ru(),Q2=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,X2=/^\w*$/,Gd=pX}),J2,hl,Yd=w(()=>{ei(),J2=la(Object,"create"),hl=J2});function hX(){this.__data__=hl?hl(null):{},this.size=0}var Z2,mX=w(()=>{Yd(),Z2=hX});function gX(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var eP,vX=w(()=>{eP=gX});function bX(e){var t=this.__data__;if(hl){var n=t[e];return n===tP?void 0:n}return rP.call(t,e)?t[e]:void 0}var tP,nP,rP,oP,yX=w(()=>{Yd(),tP="__lodash_hash_undefined__",nP=Object.prototype,rP=nP.hasOwnProperty,oP=bX});function xX(e){var t=this.__data__;return hl?t[e]!==void 0:iP.call(t,e)}var aP,iP,lP,kX=w(()=>{Yd(),aP=Object.prototype,iP=aP.hasOwnProperty,lP=xX});function wX(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=hl&&t===void 0?sP:t,this}var sP,uP,SX=w(()=>{Yd(),sP="__lodash_hash_undefined__",uP=wX});function ml(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}var h0,EX=w(()=>{mX(),vX(),yX(),kX(),SX(),ml.prototype.clear=Z2,ml.prototype.delete=eP,ml.prototype.get=oP,ml.prototype.has=lP,ml.prototype.set=uP,h0=ml});function PX(){this.__data__=[],this.size=0}var cP,IX=w(()=>{cP=PX});function jX(e,t){for(var n=e.length;n--;)if(cu(e[n][0],t))return n;return-1}var gu,Qd=w(()=>{Ld(),gu=jX});function CX(e){var t=this.__data__,n=gu(t,e);if(n<0)return!1;var o=t.length-1;return n==o?t.pop():fP.call(t,n,1),--this.size,!0}var dP,fP,pP,OX=w(()=>{Qd(),dP=Array.prototype,fP=dP.splice,pP=CX});function _X(e){var t=this.__data__,n=gu(t,e);return n<0?void 0:t[n][1]}var hP,DX=w(()=>{Qd(),hP=_X});function TX(e){return gu(this.__data__,e)>-1}var mP,AX=w(()=>{Qd(),mP=TX});function BX(e,t){var n=this.__data__,o=gu(n,e);return o<0?(++this.size,n.push([e,t])):n[o][1]=t,this}var gP,zX=w(()=>{Qd(),gP=BX});function gl(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}var vu,Xd=w(()=>{IX(),OX(),DX(),AX(),zX(),gl.prototype.clear=cP,gl.prototype.delete=pP,gl.prototype.get=hP,gl.prototype.has=mP,gl.prototype.set=gP,vu=gl}),vP,vl,m0=w(()=>{ei(),ir(),vP=la(Hn,"Map"),vl=vP});function qX(){this.size=0,this.__data__={hash:new h0,map:new(vl||vu),string:new h0}}var bP,MX=w(()=>{EX(),Xd(),m0(),bP=qX});function RX(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}var yP,FX=w(()=>{yP=RX});function LX(e,t){var n=e.__data__;return yP(t)?n[typeof t=="string"?"string":"hash"]:n.map}var bu,Jd=w(()=>{FX(),bu=LX});function NX(e){var t=bu(this,e).delete(e);return this.size-=t?1:0,t}var xP,VX=w(()=>{Jd(),xP=NX});function KX(e){return bu(this,e).get(e)}var kP,UX=w(()=>{Jd(),kP=KX});function HX(e){return bu(this,e).has(e)}var wP,$X=w(()=>{Jd(),wP=HX});function WX(e,t){var n=bu(this,e),o=n.size;return n.set(e,t),this.size+=n.size==o?0:1,this}var SP,GX=w(()=>{Jd(),SP=WX});function bl(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}var yu,g0=w(()=>{MX(),VX(),UX(),$X(),GX(),bl.prototype.clear=bP,bl.prototype.delete=xP,bl.prototype.get=kP,bl.prototype.has=wP,bl.prototype.set=SP,yu=bl});function v0(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(EP);var n=function(){var o=arguments,i=t?t.apply(this,o):o[0],l=n.cache;if(l.has(i))return l.get(i);var u=e.apply(this,o);return n.cache=l.set(i,u)||l,u};return n.cache=new(v0.Cache||yu),n}var EP,b0,PP=w(()=>{g0(),EP="Expected a function",v0.Cache=yu,b0=v0});function YX(e){var t=b0(e,function(o){return n.size===IP&&n.clear(),o}),n=t.cache;return t}var IP,jP,QX=w(()=>{PP(),IP=500,jP=YX}),CP,OP,_P,DP,XX=w(()=>{QX(),CP=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,OP=/\\(\\)?/g,_P=jP(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(CP,function(n,o,i,l){t.push(i?l.replace(OP,"$1"):o||n)}),t}),DP=_P});function JX(e){return e==null?"":WS(e)}var Zd,TP=w(()=>{HY(),Zd=JX});function ZX(e,t){return _n(e)?e:Gd(e,t)?[e]:DP(Zd(e))}var ef,y0=w(()=>{lr(),p0(),XX(),TP(),ef=ZX});function eJ(e){if(typeof e=="string"||Za(e))return e;var t=e+"";return t=="0"&&1/e==-AP?"-0":t}var AP,yl,xu=w(()=>{ru(),AP=1/0,yl=eJ});function tJ(e,t){t=ef(t,e);for(var n=0,o=t.length;e!=null&&n<o;)e=e[yl(t[n++])];return n&&n==o?e:void 0}var tf,x0=w(()=>{y0(),xu(),tf=tJ});function nJ(e,t,n){var o=e==null?void 0:tf(e,t);return o===void 0?n:o}var ni,ku=w(()=>{x0(),ni=nJ});function rJ(e,t){for(var n=-1,o=t.length,i=e.length;++n<o;)e[i+n]=t[n];return e}var nf,k0=w(()=>{nf=rJ});function oJ(e){return _n(e)||Hd(e)||!!(w0&&e&&e[w0])}var w0,BP,aJ=w(()=>{il(),t0(),lr(),w0=$n?$n.isConcatSpreadable:void 0,BP=oJ});function zP(e,t,n,o,i){var l=-1,u=e.length;for(n||(n=BP),i||(i=[]);++l<u;){var c=e[l];t>0&&n(c)?t>1?zP(c,t-1,n,o,i):nf(i,c):o||(i[i.length]=c)}return i}var qP,iJ=w(()=>{k0(),aJ(),qP=zP}),MP,rf,S0=w(()=>{L2(),MP=d0(Object.getPrototypeOf,Object),rf=MP});function lJ(e){if(!eo(e)||oa(e)!=RP)return!1;var t=rf(e);if(t===null)return!0;var n=NP.call(t,"constructor")&&t.constructor;return typeof n=="function"&&n instanceof n&&E0.call(n)==VP}var RP,FP,LP,E0,NP,VP,of,KP=w(()=>{sl(),S0(),aa(),RP="[object Object]",FP=Function.prototype,LP=Object.prototype,E0=FP.toString,NP=LP.hasOwnProperty,VP=E0.call(Object),of=lJ});function sJ(e){var t=Math[e];return function(n,o){if(n=Po(n),o=o==null?0:HP(au(o),292),o&&UP(n)){var i=(Zd(n)+"e").split("e"),l=t(i[0]+"e"+(+i[1]+o));return i=(Zd(l)+"e").split("e"),+(i[0]+"e"+(+i[1]-o))}return t(n)}}var UP,HP,$P,uJ=w(()=>{ir(),Ad(),ou(),TP(),UP=Hn.isFinite,HP=Math.min,$P=sJ});function cJ(e,t,n){return e===e&&(n!==void 0&&(e=e<=n?e:n),t!==void 0&&(e=e>=t?e:t)),e}var WP,dJ=w(()=>{WP=cJ});function fJ(e,t,n){return n===void 0&&(n=t,t=void 0),n!==void 0&&(n=Po(n),n=n===n?n:0),t!==void 0&&(t=Po(t),t=t===t?t:0),WP(Po(e),t,n)}var at,wu=w(()=>{dJ(),ou(),at=fJ});function pJ(){this.__data__=new vu,this.size=0}var GP,hJ=w(()=>{Xd(),GP=pJ});function mJ(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}var YP,gJ=w(()=>{YP=mJ});function vJ(e){return this.__data__.get(e)}var QP,bJ=w(()=>{QP=vJ});function yJ(e){return this.__data__.has(e)}var XP,xJ=w(()=>{XP=yJ});function kJ(e,t){var n=this.__data__;if(n instanceof vu){var o=n.__data__;if(!vl||o.length<JP-1)return o.push([e,t]),this.size=++n.size,this;n=this.__data__=new yu(o)}return n.set(e,t),this.size=n.size,this}var JP,ZP,wJ=w(()=>{Xd(),m0(),g0(),JP=200,ZP=kJ});function xl(e){var t=this.__data__=new vu(e);this.size=t.size}var kl,P0=w(()=>{Xd(),hJ(),gJ(),bJ(),xJ(),wJ(),xl.prototype.clear=GP,xl.prototype.delete=YP,xl.prototype.get=QP,xl.prototype.has=XP,xl.prototype.set=ZP,kl=xl});function SJ(e,t){return e&&du(t,pl(t),e)}var eI,EJ=w(()=>{Vd(),mu(),eI=SJ});function PJ(e,t){return e&&du(t,Wd(t),e)}var tI,IJ=w(()=>{Vd(),f0(),tI=PJ});function jJ(e,t){if(t)return e.slice();var n=e.length,o=O0?O0(n):new e.constructor(n);return e.copy(o),o}var I0,j0,nI,C0,O0,rI,CJ=w(()=>{ir(),I0=or&&!or.nodeType&&or,j0=I0&&!0&&wn&&!wn.nodeType&&wn,nI=j0&&j0.exports===I0,C0=nI?Hn.Buffer:void 0,O0=C0?C0.allocUnsafe:void 0,rI=jJ});function OJ(e,t){for(var n=-1,o=e==null?0:e.length,i=0,l=[];++n<o;){var u=e[n];t(u,n,e)&&(l[i++]=u)}return l}var oI,_J=w(()=>{oI=OJ});function DJ(){return[]}var _0,aI=w(()=>{_0=DJ}),iI,lI,D0,sI,af,T0=w(()=>{_J(),aI(),iI=Object.prototype,lI=iI.propertyIsEnumerable,D0=Object.getOwnPropertySymbols,sI=D0?function(e){return e==null?[]:(e=Object(e),oI(D0(e),function(t){return lI.call(e,t)}))}:_0,af=sI});function TJ(e,t){return du(e,af(e),t)}var uI,AJ=w(()=>{Vd(),T0(),uI=TJ}),cI,dI,A0,fI=w(()=>{k0(),S0(),T0(),aI(),cI=Object.getOwnPropertySymbols,dI=cI?function(e){for(var t=[];e;)nf(t,af(e)),e=rf(e);return t}:_0,A0=dI});function BJ(e,t){return du(e,A0(e),t)}var pI,zJ=w(()=>{Vd(),fI(),pI=BJ});function qJ(e,t,n){var o=t(e);return _n(e)?o:nf(o,n(e))}var B0,hI=w(()=>{k0(),lr(),B0=qJ});function MJ(e){return B0(e,pl,af)}var lf,mI=w(()=>{hI(),T0(),mu(),lf=MJ});function RJ(e){return B0(e,Wd,A0)}var gI,FJ=w(()=>{hI(),fI(),f0(),gI=RJ}),vI,sf,LJ=w(()=>{ei(),ir(),vI=la(Hn,"DataView"),sf=vI}),bI,uf,NJ=w(()=>{ei(),ir(),bI=la(Hn,"Promise"),uf=bI}),yI,ri,xI=w(()=>{ei(),ir(),yI=la(Hn,"Set"),ri=yI}),z0,kI,q0,M0,R0,F0,wI,SI,EI,PI,II,sa,wl,cf=w(()=>{LJ(),m0(),NJ(),xI(),dQ(),sl(),pE(),z0="[object Map]",kI="[object Object]",q0="[object Promise]",M0="[object Set]",R0="[object WeakMap]",F0="[object DataView]",wI=ia(sf),SI=ia(vl),EI=ia(uf),PI=ia(ri),II=ia(qd),sa=oa,(sf&&sa(new sf(new ArrayBuffer(1)))!=F0||vl&&sa(new vl)!=z0||uf&&sa(uf.resolve())!=q0||ri&&sa(new ri)!=M0||qd&&sa(new qd)!=R0)&&(sa=function(e){var t=oa(e),n=t==kI?e.constructor:void 0,o=n?ia(n):"";if(o)switch(o){case wI:return F0;case SI:return z0;case EI:return q0;case PI:return M0;case II:return R0}return t}),wl=sa});function VJ(e){var t=e.length,n=new e.constructor(t);return t&&typeof e[0]=="string"&&CI.call(e,"index")&&(n.index=e.index,n.input=e.input),n}var jI,CI,OI,KJ=w(()=>{jI=Object.prototype,CI=jI.hasOwnProperty,OI=VJ}),_I,Su,DI=w(()=>{ir(),_I=Hn.Uint8Array,Su=_I});function UJ(e){var t=new e.constructor(e.byteLength);return new Su(t).set(new Su(e)),t}var df,L0=w(()=>{DI(),df=UJ});function HJ(e,t){var n=t?df(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var TI,$J=w(()=>{L0(),TI=HJ});function WJ(e){var t=new e.constructor(e.source,AI.exec(e));return t.lastIndex=e.lastIndex,t}var AI,BI,GJ=w(()=>{AI=/\w*$/,BI=WJ});function YJ(e){return V0?Object(V0.call(e)):{}}var N0,V0,zI,QJ=w(()=>{il(),N0=$n?$n.prototype:void 0,V0=N0?N0.valueOf:void 0,zI=YJ});function XJ(e,t){var n=t?df(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}var qI,JJ=w(()=>{L0(),qI=XJ});function ZJ(e,t,n){var o=e.constructor;switch(t){case HI:return df(e);case MI:case RI:return new o(+e);case $I:return TI(e,n);case WI:case GI:case YI:case QI:case XI:case JI:case ZI:case ej:case tj:return qI(e,n);case FI:return new o;case LI:case KI:return new o(e);case NI:return BI(e);case VI:return new o;case UI:return zI(e)}}var MI,RI,FI,LI,NI,VI,KI,UI,HI,$I,WI,GI,YI,QI,XI,JI,ZI,ej,tj,nj,eZ=w(()=>{L0(),$J(),GJ(),QJ(),JJ(),MI="[object Boolean]",RI="[object Date]",FI="[object Map]",LI="[object Number]",NI="[object RegExp]",VI="[object Set]",KI="[object String]",UI="[object Symbol]",HI="[object ArrayBuffer]",$I="[object DataView]",WI="[object Float32Array]",GI="[object Float64Array]",YI="[object Int8Array]",QI="[object Int16Array]",XI="[object Int32Array]",JI="[object Uint8Array]",ZI="[object Uint8ClampedArray]",ej="[object Uint16Array]",tj="[object Uint32Array]",nj=ZJ});function tZ(e){return typeof e.constructor=="function"&&!Ud(e)?PE(rf(e)):{}}var rj,nZ=w(()=>{fQ(),S0(),Jg(),rj=tZ});function rZ(e){return eo(e)&&wl(e)==oj}var oj,aj,oZ=w(()=>{cf(),aa(),oj="[object Map]",aj=rZ}),K0,ij,lj,aZ=w(()=>{oZ(),hu(),l0(),K0=ti&&ti.isMap,ij=K0?dl(K0):aj,lj=ij});function iZ(e){return eo(e)&&wl(e)==sj}var sj,uj,lZ=w(()=>{cf(),aa(),sj="[object Set]",uj=iZ}),U0,cj,dj,sZ=w(()=>{lZ(),hu(),l0(),U0=ti&&ti.isSet,cj=U0?dl(U0):uj,dj=cj});function ff(e,t,n,o,i,l){var u,c=t&fj,d=t&pj,p=t&hj;if(n&&(u=i?n(e,o,i,l):n(e)),u!==void 0)return u;if(!Wn(e))return e;var h=_n(e);if(h){if(u=OI(e),!c)return Ug(e,u)}else{var b=wl(e),g=b==$0||b==yj;if(pu(e))return rI(e,c);if(b==W0||b==H0||g&&!i){if(u=d||g?{}:rj(e),!c)return d?pI(e,tI(u,e)):uI(e,eI(u,e))}else{if(!lt[b])return i?e:{};u=nj(e,b,c)}}l||(l=new kl);var m=l.get(e);if(m)return m;l.set(e,u),dj(e)?e.forEach(function(S){u.add(ff(S,t,n,S,e,l))}):lj(e)&&e.forEach(function(S,E){u.set(E,ff(S,t,n,E,e,l))});var y=p?d?gI:lf:d?Wd:pl,x=h?void 0:y(e);return LE(x||e,function(S,E){x&&(E=S,S=e[E]),Nd(u,E,ff(S,t,n,E,e,l))}),u}var fj,pj,hj,H0,mj,gj,vj,bj,$0,yj,xj,kj,W0,wj,Sj,Ej,Pj,Ij,jj,Cj,Oj,_j,Dj,Tj,Aj,Bj,zj,qj,Mj,lt,Rj,uZ=w(()=>{P0(),PQ(),Wg(),EJ(),IJ(),CJ(),CE(),AJ(),zJ(),mI(),FJ(),cf(),KJ(),eZ(),nZ(),lr(),a0(),aZ(),to(),sZ(),mu(),f0(),fj=1,pj=2,hj=4,H0="[object Arguments]",mj="[object Array]",gj="[object Boolean]",vj="[object Date]",bj="[object Error]",$0="[object Function]",yj="[object GeneratorFunction]",xj="[object Map]",kj="[object Number]",W0="[object Object]",wj="[object RegExp]",Sj="[object Set]",Ej="[object String]",Pj="[object Symbol]",Ij="[object WeakMap]",jj="[object ArrayBuffer]",Cj="[object DataView]",Oj="[object Float32Array]",_j="[object Float64Array]",Dj="[object Int8Array]",Tj="[object Int16Array]",Aj="[object Int32Array]",Bj="[object Uint8Array]",zj="[object Uint8ClampedArray]",qj="[object Uint16Array]",Mj="[object Uint32Array]",lt={},lt[H0]=lt[mj]=lt[jj]=lt[Cj]=lt[gj]=lt[vj]=lt[Oj]=lt[_j]=lt[Dj]=lt[Tj]=lt[Aj]=lt[xj]=lt[kj]=lt[W0]=lt[wj]=lt[Sj]=lt[Ej]=lt[Pj]=lt[Bj]=lt[zj]=lt[qj]=lt[Mj]=!0,lt[bj]=lt[$0]=lt[Ij]=!1,Rj=ff});function cZ(e){return Rj(e,Fj|Lj)}var Fj,Lj,Nj,dZ=w(()=>{uZ(),Fj=1,Lj=4,Nj=cZ});function fZ(e){return this.__data__.set(e,Vj),this}var Vj,Kj,pZ=w(()=>{Vj="__lodash_hash_undefined__",Kj=fZ});function hZ(e){return this.__data__.has(e)}var Uj,mZ=w(()=>{Uj=hZ});function pf(e){var t=-1,n=e==null?0:e.length;for(this.__data__=new yu;++t<n;)this.add(e[t])}var G0,Hj=w(()=>{g0(),pZ(),mZ(),pf.prototype.add=pf.prototype.push=Kj,pf.prototype.has=Uj,G0=pf});function gZ(e,t){for(var n=-1,o=e==null?0:e.length;++n<o;)if(t(e[n],n,e))return!0;return!1}var $j,vZ=w(()=>{$j=gZ});function bZ(e,t){return e.has(t)}var Y0,Wj=w(()=>{Y0=bZ});function yZ(e,t,n,o,i,l){var u=n&Gj,c=e.length,d=t.length;if(c!=d&&!(u&&d>c))return!1;var p=l.get(e),h=l.get(t);if(p&&h)return p==t&&h==e;var b=-1,g=!0,m=n&Yj?new G0:void 0;for(l.set(e,t),l.set(t,e);++b<c;){var y=e[b],x=t[b];if(o)var S=u?o(x,y,b,t,e,l):o(y,x,b,e,t,l);if(S!==void 0){if(S)continue;g=!1;break}if(m){if(!$j(t,function(E,P){if(!Y0(m,P)&&(y===E||i(y,E,n,o,l)))return m.push(P)})){g=!1;break}}else if(!(y===x||i(y,x,n,o,l))){g=!1;break}}return l.delete(e),l.delete(t),g}var Gj,Yj,Q0,Qj=w(()=>{Hj(),vZ(),Wj(),Gj=1,Yj=2,Q0=yZ});function xZ(e){var t=-1,n=Array(e.size);return e.forEach(function(o,i){n[++t]=[i,o]}),n}var Xj,kZ=w(()=>{Xj=xZ});function wZ(e){var t=-1,n=Array(e.size);return e.forEach(function(o){n[++t]=o}),n}var hf,X0=w(()=>{hf=wZ});function SZ(e,t,n,o,i,l,u){switch(n){case cC:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case uC:return!(e.byteLength!=t.byteLength||!l(new Su(e),new Su(t)));case eC:case tC:case oC:return cu(+e,+t);case nC:return e.name==t.name&&e.message==t.message;case aC:case lC:return e==t+"";case rC:var c=Xj;case iC:var d=o&Jj;if(c||(c=hf),e.size!=t.size&&!d)return!1;var p=u.get(e);if(p)return p==t;o|=Zj,u.set(e,t);var h=Q0(c(e),c(t),o,i,l,u);return u.delete(e),h;case sC:if(mf)return mf.call(e)==mf.call(t)}return!1}var Jj,Zj,eC,tC,nC,rC,oC,aC,iC,lC,sC,uC,cC,J0,mf,dC,EZ=w(()=>{il(),DI(),Ld(),Qj(),kZ(),X0(),Jj=1,Zj=2,eC="[object Boolean]",tC="[object Date]",nC="[object Error]",rC="[object Map]",oC="[object Number]",aC="[object RegExp]",iC="[object Set]",lC="[object String]",sC="[object Symbol]",uC="[object ArrayBuffer]",cC="[object DataView]",J0=$n?$n.prototype:void 0,mf=J0?J0.valueOf:void 0,dC=SZ});function PZ(e,t,n,o,i,l){var u=n&fC,c=lf(e),d=c.length,p=lf(t),h=p.length;if(d!=h&&!u)return!1;for(var b=d;b--;){var g=c[b];if(!(u?g in t:hC.call(t,g)))return!1}var m=l.get(e),y=l.get(t);if(m&&y)return m==t&&y==e;var x=!0;l.set(e,t),l.set(t,e);for(var S=u;++b<d;){g=c[b];var E=e[g],P=t[g];if(o)var O=u?o(P,E,g,t,e,l):o(E,P,g,e,t,l);if(!(O===void 0?E===P||i(E,P,n,o,l):O)){x=!1;break}S||(S=g=="constructor")}if(x&&!S){var z=e.constructor,B=t.constructor;z!=B&&"constructor"in e&&"constructor"in t&&!(typeof z=="function"&&z instanceof z&&typeof B=="function"&&B instanceof B)&&(x=!1)}return l.delete(e),l.delete(t),x}var fC,pC,hC,mC,IZ=w(()=>{mI(),fC=1,pC=Object.prototype,hC=pC.hasOwnProperty,mC=PZ});function jZ(e,t,n,o,i,l){var u=_n(e),c=_n(t),d=u?ev:wl(e),p=c?ev:wl(t);d=d==Z0?Eu:d,p=p==Z0?Eu:p;var h=d==Eu,b=p==Eu,g=d==p;if(g&&pu(e)){if(!pu(t))return!1;u=!0,h=!1}if(g&&!h)return l||(l=new kl),u||u0(e)?Q0(e,t,n,o,i,l):dC(e,t,d,n,o,i,l);if(!(n&gC)){var m=h&&tv.call(e,"__wrapped__"),y=b&&tv.call(t,"__wrapped__");if(m||y){var x=m?e.value():e,S=y?t.value():t;return l||(l=new kl),i(x,S,n,o,l)}}return g?(l||(l=new kl),mC(e,t,n,o,i,l)):!1}var gC,Z0,ev,Eu,vC,tv,bC,CZ=w(()=>{P0(),Qj(),EZ(),IZ(),cf(),lr(),a0(),q2(),gC=1,Z0="[object Arguments]",ev="[object Array]",Eu="[object Object]",vC=Object.prototype,tv=vC.hasOwnProperty,bC=jZ});function yC(e,t,n,o,i){return e===t?!0:e==null||t==null||!eo(e)&&!eo(t)?e!==e&&t!==t:bC(e,t,n,o,yC,i)}var nv,xC=w(()=>{CZ(),aa(),nv=yC});function OZ(e,t,n,o){var i=n.length,l=i,u=!o;if(e==null)return!l;for(e=Object(e);i--;){var c=n[i];if(u&&c[2]?c[1]!==e[c[0]]:!(c[0]in e))return!1}for(;++i<l;){c=n[i];var d=c[0],p=e[d],h=c[1];if(u&&c[2]){if(p===void 0&&!(d in e))return!1}else{var b=new kl;if(o)var g=o(p,h,d,e,t,b);if(!(g===void 0?nv(h,p,kC|wC,o,b):g))return!1}}return!0}var kC,wC,SC,_Z=w(()=>{P0(),xC(),kC=1,wC=2,SC=OZ});function DZ(e){return e===e&&!Wn(e)}var rv,EC=w(()=>{to(),rv=DZ});function TZ(e){for(var t=pl(e),n=t.length;n--;){var o=t[n],i=e[o];t[n]=[o,i,rv(i)]}return t}var PC,AZ=w(()=>{EC(),mu(),PC=TZ});function BZ(e,t){return function(n){return n==null?!1:n[e]===t&&(t!==void 0||e in Object(n))}}var ov,IC=w(()=>{ov=BZ});function zZ(e){var t=PC(e);return t.length==1&&t[0][2]?ov(t[0][0],t[0][1]):function(n){return n===e||SC(n,e,t)}}var jC,qZ=w(()=>{_Z(),AZ(),IC(),jC=zZ});function MZ(e,t){return e!=null&&t in Object(e)}var CC,RZ=w(()=>{CC=MZ});function FZ(e,t,n){t=ef(t,e);for(var o=-1,i=t.length,l=!1;++o<i;){var u=yl(t[o]);if(!(l=e!=null&&n(e,u)))break;e=e[u]}return l||++o!=i?l:(i=e==null?0:e.length,!!i&&Kd(i)&&su(u,i)&&(_n(e)||Hd(e)))}var OC,LZ=w(()=>{y0(),t0(),lr(),Rd(),Qg(),xu(),OC=FZ});function NZ(e,t){return e!=null&&OC(e,t,CC)}var _C,VZ=w(()=>{RZ(),LZ(),_C=NZ});function KZ(e,t){return Gd(e)&&rv(t)?ov(yl(e),t):function(n){var o=ni(n,e);return o===void 0&&o===t?_C(n,e):nv(t,o,DC|TC)}}var DC,TC,AC,UZ=w(()=>{xC(),ku(),VZ(),p0(),EC(),IC(),xu(),DC=1,TC=2,AC=KZ});function HZ(e){return function(t){return t?.[e]}}var BC,$Z=w(()=>{BC=HZ});function WZ(e){return function(t){return tf(t,e)}}var zC,GZ=w(()=>{x0(),zC=WZ});function YZ(e){return Gd(e)?BC(yl(e)):zC(e)}var qC,QZ=w(()=>{$Z(),GZ(),p0(),xu(),qC=YZ});function XZ(e){return typeof e=="function"?e:e==null?iu:typeof e=="object"?_n(e)?AC(e[0],e[1]):jC(e):qC(e)}var Sl,Pu=w(()=>{qZ(),UZ(),Bd(),lr(),QZ(),Sl=XZ});function JZ(e,t,n,o){for(var i=-1,l=e==null?0:e.length;++i<l;){var u=e[i];t(o,u,n(u),e)}return o}var MC,ZZ=w(()=>{MC=JZ});function eee(e){return function(t,n,o){for(var i=-1,l=Object(t),u=o(t),c=u.length;c--;){var d=u[e?c:++i];if(n(l[d],d,l)===!1)break}return t}}var RC,tee=w(()=>{RC=eee}),FC,LC,nee=w(()=>{tee(),FC=RC(),LC=FC});function ree(e,t){return e&&LC(e,t,pl)}var av,NC=w(()=>{nee(),mu(),av=ree});function oee(e,t){return function(n,o){if(n==null)return n;if(!cl(n))return e(n,o);for(var i=n.length,l=t?i:-1,u=Object(n);(t?l--:++l<i)&&o(u[l],l,u)!==!1;);return n}}var VC,aee=w(()=>{fu(),VC=oee}),KC,iv,UC=w(()=>{NC(),aee(),KC=VC(av),iv=KC});function iee(e,t,n,o){return iv(e,function(i,l,u){t(o,i,n(i),u)}),o}var HC,lee=w(()=>{UC(),HC=iee});function see(e,t){return function(n,o){var i=_n(n)?MC:HC,l=t?t():{};return i(n,e,Sl(o,2),l)}}var $C,uee=w(()=>{ZZ(),lee(),Pu(),lr(),$C=see}),WC,gf,cee=w(()=>{ir(),WC=function(){return Hn.Date.now()},gf=WC});function dee(e,t,n){var o,i,l,u,c,d,p=0,h=!1,b=!1,g=!0;if(typeof e!="function")throw new TypeError(GC);t=Po(t)||0,Wn(n)&&(h=!!n.leading,b="maxWait"in n,l=b?YC(Po(n.maxWait)||0,t):l,g="trailing"in n?!!n.trailing:g);function m(D){var X=o,M=i;return o=i=void 0,p=D,u=e.apply(M,X),u}function y(D){return p=D,c=setTimeout(E,t),h?m(D):u}function x(D){var X=D-d,M=D-p,_=t-X;return b?QC(_,l-M):_}function S(D){var X=D-d,M=D-p;return d===void 0||X>=t||X<0||b&&M>=l}function E(){var D=gf();if(S(D))return P(D);c=setTimeout(E,x(D))}function P(D){return c=void 0,g&&o?m(D):(o=i=void 0,u)}function O(){c!==void 0&&clearTimeout(c),p=0,o=d=i=c=void 0}function z(){return c===void 0?u:P(gf())}function B(){var D=gf(),X=S(D);if(o=arguments,i=this,d=D,X){if(c===void 0)return y(d);if(b)return clearTimeout(c),c=setTimeout(E,t),m(d)}return c===void 0&&(c=setTimeout(E,t)),u}return B.cancel=O,B.flush=z,B}var GC,YC,QC,lv,XC=w(()=>{to(),cee(),ou(),GC="Expected a function",YC=Math.max,QC=Math.min,lv=dee});function fee(e,t,n){for(var o=-1,i=e==null?0:e.length;++o<i;)if(n(t,e[o]))return!0;return!1}var JC,pee=w(()=>{JC=fee});function hee(e){var t=e==null?0:e.length;return t?e[t-1]:void 0}var Iu,sv=w(()=>{Iu=hee});function mee(e,t,n){var o=e==null?0:e.length;if(!o)return-1;var i=n==null?0:au(n);return i<0&&(i=ZC(o+i,0)),Md(e,Sl(t,3),i)}var ZC,uv,gee=w(()=>{Hg(),Pu(),Ad(),ZC=Math.max,uv=mee});function vee(e,t,n){var o=e==null?0:e.length;if(!o)return-1;var i=o-1;return n!==void 0&&(i=au(n),i=n<0?e5(o+i,0):t5(i,o-1)),Md(e,Sl(t,3),i,!0)}var e5,t5,n5,bee=w(()=>{Hg(),Pu(),Ad(),e5=Math.max,t5=Math.min,n5=vee});function yee(e,t){var n=-1,o=cl(e)?Array(e.length):[];return iv(e,function(i,l,u){o[++n]=t(i,l,u)}),o}var r5,xee=w(()=>{UC(),fu(),r5=yee});function kee(e,t,n){return e>=a5(t,n)&&e<o5(t,n)}var o5,a5,i5,wee=w(()=>{o5=Math.max,a5=Math.min,i5=kee});function See(e,t,n){return t=Td(t),n===void 0?(n=t,t=0):n=Td(n),e=Po(e),i5(e,t,n)}var cv,Eee=w(()=>{wee(),rE(),ou(),cv=See});function Pee(e){return typeof e=="number"&&e==au(e)}var dv,l5=w(()=>{Ad(),dv=Pee}),s5,ua,Iee=w(()=>{Fd(),uee(),s5=$C(function(e,t,n){uu(e,n,t)}),ua=s5});function jee(e,t){var n={};return t=Sl(t,3),av(e,function(o,i,l){uu(n,i,t(o,i,l))}),n}var oi,u5=w(()=>{Fd(),NC(),Pu(),oi=jee});function Cee(e,t,n,o){if(!Wn(e))return e;t=ef(t,e);for(var i=-1,l=t.length,u=l-1,c=e;c!=null&&++i<l;){var d=yl(t[i]),p=n;if(d==="__proto__"||d==="constructor"||d==="prototype")return e;if(i!=u){var h=c[d];p=o?o(h,d,c):void 0,p===void 0&&(p=Wn(h)?h:su(t[i+1])?[]:{})}Nd(c,d,p),c=c[d]}return e}var c5,Oee=w(()=>{Wg(),y0(),Rd(),to(),xu(),c5=Cee});function _ee(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}var d5,Dee=w(()=>{d5=_ee});function Tee(e,t){if(e!==t){var n=e!==void 0,o=e===null,i=e===e,l=Za(e),u=t!==void 0,c=t===null,d=t===t,p=Za(t);if(!c&&!p&&!l&&e>t||l&&u&&d&&!c&&!p||o&&u&&d||!n&&d||!i)return 1;if(!o&&!l&&!p&&e<t||p&&n&&i&&!o&&!l||c&&n&&i||!u&&i||!d)return-1}return 0}var f5,Aee=w(()=>{ru(),f5=Tee});function Bee(e,t,n){for(var o=-1,i=e.criteria,l=t.criteria,u=i.length,c=n.length;++o<u;){var d=f5(i[o],l[o]);if(d){if(o>=c)return d;var p=n[o];return d*(p=="desc"?-1:1)}}return e.index-t.index}var p5,zee=w(()=>{Aee(),p5=Bee});function qee(e,t,n){t.length?t=ul(t,function(l){return _n(l)?function(u){return tf(u,l.length===1?l[0]:l)}:l}):t=[iu];var o=-1;t=ul(t,dl(Sl));var i=r5(e,function(l,u,c){var d=ul(t,function(p){return p(l)});return{criteria:d,index:++o,value:l}});return d5(i,function(l,u){return p5(l,u,n)})}var h5,Mee=w(()=>{qg(),x0(),Pu(),xee(),Dee(),hu(),zee(),Bd(),lr(),h5=qee});function Ree(e,t,n,o){for(var i=n-1,l=e.length;++i<l;)if(o(e[i],t))return i;return-1}var m5,Fee=w(()=>{m5=Ree});function Lee(e,t,n,o){var i=o?m5:$g,l=-1,u=t.length,c=e;for(e===t&&(t=Ug(t)),n&&(c=ul(e,dl(n)));++l<u;)for(var d=0,p=t[l],h=n?n(p):p;(d=i(c,h,d,o))>-1;)c!==e&&fv.call(c,d,1),fv.call(e,d,1);return e}var g5,fv,v5,Nee=w(()=>{qg(),KE(),Fee(),hu(),CE(),g5=Array.prototype,fv=g5.splice,v5=Lee});function Vee(e,t){return e&&e.length&&t&&t.length?v5(e,t):e}var b5,Kee=w(()=>{Nee(),b5=Vee}),y5,x5,Uee=w(()=>{QE(),Kee(),y5=Yg(b5),x5=y5}),k5,w5,Hee=w(()=>{uJ(),k5=$P("round"),w5=k5});function $ee(e,t,n){return e==null?e:c5(e,t,n)}var El,pv=w(()=>{Oee(),El=$ee}),S5,E5,Wee=w(()=>{iJ(),Mee(),QE(),HQ(),S5=Yg(function(e,t){if(e==null)return[];var n=t.length;return n>1&&Xg(e,t[0],t[1])?t=[]:n>2&&Xg(t[0],t[1],t[2])&&(t=[t[0]]),h5(e,qP(t,1),[])}),E5=S5}),P5,I5,j5,Gee=w(()=>{xI(),gQ(),X0(),P5=1/0,I5=ri&&1/hf(new ri([,-0]))[1]==P5?function(e){return new ri(e)}:jE,j5=I5});function Yee(e,t,n){var o=-1,i=UE,l=e.length,u=!0,c=[],d=c;if(n)u=!1,i=JC;else if(l>=C5){var p=t?null:j5(e);if(p)return hf(p);u=!1,i=Y0,d=new G0}else d=t?[]:c;e:for(;++o<l;){var h=e[o],b=t?t(h):h;if(h=n||h!==0?h:0,u&&b===b){for(var g=d.length;g--;)if(d[g]===b)continue e;t&&d.push(b),c.push(h)}else i(d,b,n)||(d!==c&&d.push(b),c.push(h))}return c}var C5,O5,Qee=w(()=>{Hj(),AQ(),pee(),Wj(),Gee(),X0(),C5=200,O5=Yee});function Xee(e){return e&&e.length?O5(e):[]}var sr,Jee=w(()=>{Qee(),sr=Xee}),Qt=w(()=>{wu(),XC(),gee(),Eee(),l5(),KP(),sv(),u5(),PP(),Hee(),Jee()}),Zee=Te((e,t)=>{var n;t.exports=typeof queueMicrotask=="function"?queueMicrotask.bind(typeof window<"u"?window:ge.commonjsGlobal):o=>(n||(n=Promise.resolve())).then(o).catch(i=>setTimeout(()=>{throw i},0))}),ete=Te(e=>{var t=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),g=Symbol.iterator;function m(q){return q===null||typeof q!="object"?null:(q=g&&q[g]||q["@@iterator"],typeof q=="function"?q:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},x=Object.assign,S={};function E(q,G,ue){this.props=q,this.context=G,this.refs=S,this.updater=ue||y}E.prototype.isReactComponent={},E.prototype.setState=function(q,G){if(typeof q!="object"&&typeof q!="function"&&q!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,q,G,"setState")},E.prototype.forceUpdate=function(q){this.updater.enqueueForceUpdate(this,q,"forceUpdate")};function P(){}P.prototype=E.prototype;function O(q,G,ue){this.props=q,this.context=G,this.refs=S,this.updater=ue||y}var z=O.prototype=new P;z.constructor=O,x(z,E.prototype),z.isPureReactComponent=!0;var B=Array.isArray,D=Object.prototype.hasOwnProperty,X={current:null},M={key:!0,ref:!0,__self:!0,__source:!0};function _(q,G,ue){var de,re={},T=null,ee=null;if(G!=null)for(de in G.ref!==void 0&&(ee=G.ref),G.key!==void 0&&(T=""+G.key),G)D.call(G,de)&&!M.hasOwnProperty(de)&&(re[de]=G[de]);var oe=arguments.length-2;if(oe===1)re.children=ue;else if(1<oe){for(var ve=Array(oe),we=0;we<oe;we++)ve[we]=arguments[we+2];re.children=ve}if(q&&q.defaultProps)for(de in oe=q.defaultProps,oe)re[de]===void 0&&(re[de]=oe[de]);return{$$typeof:t,type:q,key:T,ref:ee,props:re,_owner:X.current}}function L(q,G){return{$$typeof:t,type:q.type,key:G,ref:q.ref,props:q.props,_owner:q._owner}}function U(q){return typeof q=="object"&&q!==null&&q.$$typeof===t}function N(q){var G={"=":"=0",":":"=2"};return"$"+q.replace(/[=:]/g,function(ue){return G[ue]})}var se=/\/+/g;function K(q,G){return typeof q=="object"&&q!==null&&q.key!=null?N(""+q.key):G.toString(36)}function ce(q,G,ue,de,re){var T=typeof q;(T==="undefined"||T==="boolean")&&(q=null);var ee=!1;if(q===null)ee=!0;else switch(T){case"string":case"number":ee=!0;break;case"object":switch(q.$$typeof){case t:case n:ee=!0}}if(ee)return ee=q,re=re(ee),q=de===""?"."+K(ee,0):de,B(re)?(ue="",q!=null&&(ue=q.replace(se,"$&/")+"/"),ce(re,G,ue,"",function(we){return we})):re!=null&&(U(re)&&(re=L(re,ue+(!re.key||ee&&ee.key===re.key?"":(""+re.key).replace(se,"$&/")+"/")+q)),G.push(re)),1;if(ee=0,de=de===""?".":de+":",B(q))for(var oe=0;oe<q.length;oe++){T=q[oe];var ve=de+K(T,oe);ee+=ce(T,G,ue,ve,re)}else if(ve=m(q),typeof ve=="function")for(q=ve.call(q),oe=0;!(T=q.next()).done;)T=T.value,ve=de+K(T,oe++),ee+=ce(T,G,ue,ve,re);else if(T==="object")throw G=String(q),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(q).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.");return ee}function J(q,G,ue){if(q==null)return q;var de=[],re=0;return ce(q,de,"","",function(T){return G.call(ue,T,re++)}),de}function W(q){if(q._status===-1){var G=q._result;G=G(),G.then(function(ue){(q._status===0||q._status===-1)&&(q._status=1,q._result=ue)},function(ue){(q._status===0||q._status===-1)&&(q._status=2,q._result=ue)}),q._status===-1&&(q._status=0,q._result=G)}if(q._status===1)return q._result.default;throw q._result}var A={current:null},Y={transition:null},ie={ReactCurrentDispatcher:A,ReactCurrentBatchConfig:Y,ReactCurrentOwner:X};e.Children={map:J,forEach:function(q,G,ue){J(q,function(){G.apply(this,arguments)},ue)},count:function(q){var G=0;return J(q,function(){G++}),G},toArray:function(q){return J(q,function(G){return G})||[]},only:function(q){if(!U(q))throw Error("React.Children.only expected to receive a single React element child.");return q}},e.Component=E,e.Fragment=o,e.Profiler=l,e.PureComponent=O,e.StrictMode=i,e.Suspense=p,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ie,e.cloneElement=function(q,G,ue){if(q==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+q+".");var de=x({},q.props),re=q.key,T=q.ref,ee=q._owner;if(G!=null){if(G.ref!==void 0&&(T=G.ref,ee=X.current),G.key!==void 0&&(re=""+G.key),q.type&&q.type.defaultProps)var oe=q.type.defaultProps;for(ve in G)D.call(G,ve)&&!M.hasOwnProperty(ve)&&(de[ve]=G[ve]===void 0&&oe!==void 0?oe[ve]:G[ve])}var ve=arguments.length-2;if(ve===1)de.children=ue;else if(1<ve){oe=Array(ve);for(var we=0;we<ve;we++)oe[we]=arguments[we+2];de.children=oe}return{$$typeof:t,type:q.type,key:re,ref:T,props:de,_owner:ee}},e.createContext=function(q){return q={$$typeof:c,_currentValue:q,_currentValue2:q,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},q.Provider={$$typeof:u,_context:q},q.Consumer=q},e.createElement=_,e.createFactory=function(q){var G=_.bind(null,q);return G.type=q,G},e.createRef=function(){return{current:null}},e.forwardRef=function(q){return{$$typeof:d,render:q}},e.isValidElement=U,e.lazy=function(q){return{$$typeof:b,_payload:{_status:-1,_result:q},_init:W}},e.memo=function(q,G){return{$$typeof:h,type:q,compare:G===void 0?null:G}},e.startTransition=function(q){var G=Y.transition;Y.transition={};try{q()}finally{Y.transition=G}},e.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},e.useCallback=function(q,G){return A.current.useCallback(q,G)},e.useContext=function(q){return A.current.useContext(q)},e.useDebugValue=function(){},e.useDeferredValue=function(q){return A.current.useDeferredValue(q)},e.useEffect=function(q,G){return A.current.useEffect(q,G)},e.useId=function(){return A.current.useId()},e.useImperativeHandle=function(q,G,ue){return A.current.useImperativeHandle(q,G,ue)},e.useInsertionEffect=function(q,G){return A.current.useInsertionEffect(q,G)},e.useLayoutEffect=function(q,G){return A.current.useLayoutEffect(q,G)},e.useMemo=function(q,G){return A.current.useMemo(q,G)},e.useReducer=function(q,G,ue){return A.current.useReducer(q,G,ue)},e.useRef=function(q){return A.current.useRef(q)},e.useState=function(q){return A.current.useState(q)},e.useSyncExternalStore=function(q,G,ue){return A.current.useSyncExternalStore(q,G,ue)},e.useTransition=function(){return A.current.useTransition()},e.version="18.2.0"}),H=Te((e,t)=>{t.exports=ete()}),tte=Te(e=>{function t(A,Y){var ie=A.length;A.push(Y);e:for(;0<ie;){var q=ie-1>>>1,G=A[q];if(0<i(G,Y))A[q]=Y,A[ie]=G,ie=q;else break e}}function n(A){return A.length===0?null:A[0]}function o(A){if(A.length===0)return null;var Y=A[0],ie=A.pop();if(ie!==Y){A[0]=ie;e:for(var q=0,G=A.length,ue=G>>>1;q<ue;){var de=2*(q+1)-1,re=A[de],T=de+1,ee=A[T];if(0>i(re,ie))T<G&&0>i(ee,re)?(A[q]=ee,A[T]=ie,q=T):(A[q]=re,A[de]=ie,q=de);else if(T<G&&0>i(ee,ie))A[q]=ee,A[T]=ie,q=T;else break e}}return Y}function i(A,Y){var ie=A.sortIndex-Y.sortIndex;return ie!==0?ie:A.id-Y.id}typeof performance=="object"&&typeof performance.now=="function"?(l=performance,e.unstable_now=function(){return l.now()}):(u=Date,c=u.now(),e.unstable_now=function(){return u.now()-c});var l,u,c,d=[],p=[],h=1,b=null,g=3,m=!1,y=!1,x=!1,S=typeof setTimeout=="function"?setTimeout:null,E=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function O(A){for(var Y=n(p);Y!==null;){if(Y.callback===null)o(p);else if(Y.startTime<=A)o(p),Y.sortIndex=Y.expirationTime,t(d,Y);else break;Y=n(p)}}function z(A){if(x=!1,O(A),!y)if(n(d)!==null)y=!0,J(B);else{var Y=n(p);Y!==null&&W(z,Y.startTime-A)}}function B(A,Y){y=!1,x&&(x=!1,E(M),M=-1),m=!0;var ie=g;try{for(O(Y),b=n(d);b!==null&&(!(b.expirationTime>Y)||A&&!U());){var q=b.callback;if(typeof q=="function"){b.callback=null,g=b.priorityLevel;var G=q(b.expirationTime<=Y);Y=e.unstable_now(),typeof G=="function"?b.callback=G:b===n(d)&&o(d),O(Y)}else o(d);b=n(d)}if(b!==null)var ue=!0;else{var de=n(p);de!==null&&W(z,de.startTime-Y),ue=!1}return ue}finally{b=null,g=ie,m=!1}}var D=!1,X=null,M=-1,_=5,L=-1;function U(){return!(e.unstable_now()-L<_)}function N(){if(X!==null){var A=e.unstable_now();L=A;var Y=!0;try{Y=X(!0,A)}finally{Y?se():(D=!1,X=null)}}else D=!1}var se;typeof P=="function"?se=function(){P(N)}:typeof MessageChannel<"u"?(K=new MessageChannel,ce=K.port2,K.port1.onmessage=N,se=function(){ce.postMessage(null)}):se=function(){S(N,0)};var K,ce;function J(A){X=A,D||(D=!0,se())}function W(A,Y){M=S(function(){A(e.unstable_now())},Y)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(A){A.callback=null},e.unstable_continueExecution=function(){y||m||(y=!0,J(B))},e.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<A?Math.floor(1e3/A):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(d)},e.unstable_next=function(A){switch(g){case 1:case 2:case 3:var Y=3;break;default:Y=g}var ie=g;g=Y;try{return A()}finally{g=ie}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(A,Y){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var ie=g;g=A;try{return Y()}finally{g=ie}},e.unstable_scheduleCallback=function(A,Y,ie){var q=e.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?q+ie:q):ie=q,A){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=ie+G,A={id:h++,callback:Y,priorityLevel:A,startTime:ie,expirationTime:G,sortIndex:-1},ie>q?(A.sortIndex=ie,t(p,A),n(d)===null&&A===n(p)&&(x?(E(M),M=-1):x=!0,W(z,ie-q))):(A.sortIndex=G,t(d,A),y||m||(y=!0,J(B))),A},e.unstable_shouldYield=U,e.unstable_wrapCallback=function(A){var Y=g;return function(){var ie=g;g=Y;try{return A.apply(this,arguments)}finally{g=ie}}}}),nte=Te((e,t)=>{t.exports=tte()}),rte=Te(e=>{var t=H(),n=nte();function o(r){for(var a="https://reactjs.org/docs/error-decoder.html?invariant="+r,s=1;s<arguments.length;s++)a+="&args[]="+encodeURIComponent(arguments[s]);return"Minified React error #"+r+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i=new Set,l={};function u(r,a){c(r,a),c(r+"Capture",a)}function c(r,a){for(l[r]=a,r=0;r<a.length;r++)i.add(a[r])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,b={},g={};function m(r){return p.call(g,r)?!0:p.call(b,r)?!1:h.test(r)?g[r]=!0:(b[r]=!0,!1)}function y(r,a,s,f){if(s!==null&&s.type===0)return!1;switch(typeof a){case"function":case"symbol":return!0;case"boolean":return f?!1:s!==null?!s.acceptsBooleans:(r=r.toLowerCase().slice(0,5),r!=="data-"&&r!=="aria-");default:return!1}}function x(r,a,s,f){if(a===null||typeof a>"u"||y(r,a,s,f))return!0;if(f)return!1;if(s!==null)switch(s.type){case 3:return!a;case 4:return a===!1;case 5:return isNaN(a);case 6:return isNaN(a)||1>a}return!1}function S(r,a,s,f,v,k,I){this.acceptsBooleans=a===2||a===3||a===4,this.attributeName=f,this.attributeNamespace=v,this.mustUseProperty=s,this.propertyName=r,this.type=a,this.sanitizeURL=k,this.removeEmptyString=I}var E={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r){E[r]=new S(r,0,!1,r,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(r){var a=r[0];E[a]=new S(a,1,!1,r[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(r){E[r]=new S(r,2,!1,r.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(r){E[r]=new S(r,2,!1,r,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r){E[r]=new S(r,3,!1,r.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(r){E[r]=new S(r,3,!0,r,null,!1,!1)}),["capture","download"].forEach(function(r){E[r]=new S(r,4,!1,r,null,!1,!1)}),["cols","rows","size","span"].forEach(function(r){E[r]=new S(r,6,!1,r,null,!1,!1)}),["rowSpan","start"].forEach(function(r){E[r]=new S(r,5,!1,r.toLowerCase(),null,!1,!1)});var P=/[\-:]([a-z])/g;function O(r){return r[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r){var a=r.replace(P,O);E[a]=new S(a,1,!1,r,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r){var a=r.replace(P,O);E[a]=new S(a,1,!1,r,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(r){var a=r.replace(P,O);E[a]=new S(a,1,!1,r,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(r){E[r]=new S(r,1,!1,r.toLowerCase(),null,!1,!1)}),E.xlinkHref=new S("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(r){E[r]=new S(r,1,!1,r.toLowerCase(),null,!0,!0)});function z(r,a,s,f){var v=E.hasOwnProperty(a)?E[a]:null;(v!==null?v.type!==0:f||!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(x(a,s,v,f)&&(s=null),f||v===null?m(a)&&(s===null?r.removeAttribute(a):r.setAttribute(a,""+s)):v.mustUseProperty?r[v.propertyName]=s===null?v.type===3?!1:"":s:(a=v.attributeName,f=v.attributeNamespace,s===null?r.removeAttribute(a):(v=v.type,s=v===3||v===4&&s===!0?"":""+s,f?r.setAttributeNS(f,a,s):r.setAttribute(a,s))))}var B=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,D=Symbol.for("react.element"),X=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),N=Symbol.for("react.context"),se=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),ce=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),W=Symbol.for("react.lazy"),A=Symbol.for("react.offscreen"),Y=Symbol.iterator;function ie(r){return r===null||typeof r!="object"?null:(r=Y&&r[Y]||r["@@iterator"],typeof r=="function"?r:null)}var q=Object.assign,G;function ue(r){if(G===void 0)try{throw Error()}catch(s){var a=s.stack.trim().match(/\n( *(at )?)/);G=a&&a[1]||""}return`
`+G+r}var de=!1;function re(r,a){if(!r||de)return"";de=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(a)if(a=function(){throw Error()},Object.defineProperty(a.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(a,[])}catch(le){var f=le}Reflect.construct(r,[],a)}else{try{a.call()}catch(le){f=le}r.call(a.prototype)}else{try{throw Error()}catch(le){f=le}r()}}catch(le){if(le&&f&&typeof le.stack=="string"){for(var v=le.stack.split(`
`),k=f.stack.split(`
`),I=v.length-1,R=k.length-1;1<=I&&0<=R&&v[I]!==k[R];)R--;for(;1<=I&&0<=R;I--,R--)if(v[I]!==k[R]){if(I!==1||R!==1)do if(I--,R--,0>R||v[I]!==k[R]){var $=`
`+v[I].replace(" at new "," at ");return r.displayName&&$.includes("<anonymous>")&&($=$.replace("<anonymous>",r.displayName)),$}while(1<=I&&0<=R);break}}}finally{de=!1,Error.prepareStackTrace=s}return(r=r?r.displayName||r.name:"")?ue(r):""}function T(r){switch(r.tag){case 5:return ue(r.type);case 16:return ue("Lazy");case 13:return ue("Suspense");case 19:return ue("SuspenseList");case 0:case 2:case 15:return r=re(r.type,!1),r;case 11:return r=re(r.type.render,!1),r;case 1:return r=re(r.type,!0),r;default:return""}}function ee(r){if(r==null)return null;if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r;switch(r){case M:return"Fragment";case X:return"Portal";case L:return"Profiler";case _:return"StrictMode";case K:return"Suspense";case ce:return"SuspenseList"}if(typeof r=="object")switch(r.$$typeof){case N:return(r.displayName||"Context")+".Consumer";case U:return(r._context.displayName||"Context")+".Provider";case se:var a=r.render;return r=r.displayName,r||(r=a.displayName||a.name||"",r=r!==""?"ForwardRef("+r+")":"ForwardRef"),r;case J:return a=r.displayName||null,a!==null?a:ee(r.type)||"Memo";case W:a=r._payload,r=r._init;try{return ee(r(a))}catch{}}return null}function oe(r){var a=r.type;switch(r.tag){case 24:return"Cache";case 9:return(a.displayName||"Context")+".Consumer";case 10:return(a._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return r=a.render,r=r.displayName||r.name||"",a.displayName||(r!==""?"ForwardRef("+r+")":"ForwardRef");case 7:return"Fragment";case 5:return a;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ee(a);case 8:return a===_?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof a=="function")return a.displayName||a.name||null;if(typeof a=="string")return a}return null}function ve(r){switch(typeof r){case"boolean":case"number":case"string":case"undefined":return r;case"object":return r;default:return""}}function we(r){var a=r.type;return(r=r.nodeName)&&r.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function je(r){var a=we(r)?"checked":"value",s=Object.getOwnPropertyDescriptor(r.constructor.prototype,a),f=""+r[a];if(!r.hasOwnProperty(a)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var v=s.get,k=s.set;return Object.defineProperty(r,a,{configurable:!0,get:function(){return v.call(this)},set:function(I){f=""+I,k.call(this,I)}}),Object.defineProperty(r,a,{enumerable:s.enumerable}),{getValue:function(){return f},setValue:function(I){f=""+I},stopTracking:function(){r._valueTracker=null,delete r[a]}}}}function De(r){r._valueTracker||(r._valueTracker=je(r))}function He(r){if(!r)return!1;var a=r._valueTracker;if(!a)return!0;var s=a.getValue(),f="";return r&&(f=we(r)?r.checked?"true":"false":r.value),r=f,r!==s?(a.setValue(r),!0):!1}function rt(r){if(r=r||(typeof document<"u"?document:void 0),typeof r>"u")return null;try{return r.activeElement||r.body}catch{return r.body}}function Le(r,a){var s=a.checked;return q({},a,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:s??r._wrapperState.initialChecked})}function gt(r,a){var s=a.defaultValue==null?"":a.defaultValue,f=a.checked!=null?a.checked:a.defaultChecked;s=ve(a.value!=null?a.value:s),r._wrapperState={initialChecked:f,initialValue:s,controlled:a.type==="checkbox"||a.type==="radio"?a.checked!=null:a.value!=null}}function Ue(r,a){a=a.checked,a!=null&&z(r,"checked",a,!1)}function Ge(r,a){Ue(r,a);var s=ve(a.value),f=a.type;if(s!=null)f==="number"?(s===0&&r.value===""||r.value!=s)&&(r.value=""+s):r.value!==""+s&&(r.value=""+s);else if(f==="submit"||f==="reset"){r.removeAttribute("value");return}a.hasOwnProperty("value")?Et(r,a.type,s):a.hasOwnProperty("defaultValue")&&Et(r,a.type,ve(a.defaultValue)),a.checked==null&&a.defaultChecked!=null&&(r.defaultChecked=!!a.defaultChecked)}function Ht(r,a,s){if(a.hasOwnProperty("value")||a.hasOwnProperty("defaultValue")){var f=a.type;if(!(f!=="submit"&&f!=="reset"||a.value!==void 0&&a.value!==null))return;a=""+r._wrapperState.initialValue,s||a===r.value||(r.value=a),r.defaultValue=a}s=r.name,s!==""&&(r.name=""),r.defaultChecked=!!r._wrapperState.initialChecked,s!==""&&(r.name=s)}function Et(r,a,s){(a!=="number"||rt(r.ownerDocument)!==r)&&(s==null?r.defaultValue=""+r._wrapperState.initialValue:r.defaultValue!==""+s&&(r.defaultValue=""+s))}var mr=Array.isArray;function Fn(r,a,s,f){if(r=r.options,a){a={};for(var v=0;v<s.length;v++)a["$"+s[v]]=!0;for(s=0;s<r.length;s++)v=a.hasOwnProperty("$"+r[s].value),r[s].selected!==v&&(r[s].selected=v),v&&f&&(r[s].defaultSelected=!0)}else{for(s=""+ve(s),a=null,v=0;v<r.length;v++){if(r[v].value===s){r[v].selected=!0,f&&(r[v].defaultSelected=!0);return}a!==null||r[v].disabled||(a=r[v])}a!==null&&(a.selected=!0)}}function $t(r,a){if(a.dangerouslySetInnerHTML!=null)throw Error(o(91));return q({},a,{value:void 0,defaultValue:void 0,children:""+r._wrapperState.initialValue})}function qe(r,a){var s=a.value;if(s==null){if(s=a.children,a=a.defaultValue,s!=null){if(a!=null)throw Error(o(92));if(mr(s)){if(1<s.length)throw Error(o(93));s=s[0]}a=s}a==null&&(a=""),s=a}r._wrapperState={initialValue:ve(s)}}function Ve(r,a){var s=ve(a.value),f=ve(a.defaultValue);s!=null&&(s=""+s,s!==r.value&&(r.value=s),a.defaultValue==null&&r.defaultValue!==s&&(r.defaultValue=s)),f!=null&&(r.defaultValue=""+f)}function Wo(r){var a=r.textContent;a===r._wrapperState.initialValue&&a!==""&&a!==null&&(r.value=a)}function Cs(r){switch(r){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function gr(r,a){return r==null||r==="http://www.w3.org/1999/xhtml"?Cs(a):r==="http://www.w3.org/2000/svg"&&a==="foreignObject"?"http://www.w3.org/1999/xhtml":r}var bm,R$=function(r){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(a,s,f,v){MSApp.execUnsafeLocalFunction(function(){return r(a,s,f,v)})}:r}(function(r,a){if(r.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in r)r.innerHTML=a;else{for(bm=bm||document.createElement("div"),bm.innerHTML="<svg>"+a.valueOf().toString()+"</svg>",a=bm.firstChild;r.firstChild;)r.removeChild(r.firstChild);for(;a.firstChild;)r.appendChild(a.firstChild)}});function $c(r,a){if(a){var s=r.firstChild;if(s&&s===r.lastChild&&s.nodeType===3){s.nodeValue=a;return}}r.textContent=a}var Wc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},pce=["Webkit","ms","Moz","O"];Object.keys(Wc).forEach(function(r){pce.forEach(function(a){a=a+r.charAt(0).toUpperCase()+r.substring(1),Wc[a]=Wc[r]})});function F$(r,a,s){return a==null||typeof a=="boolean"||a===""?"":s||typeof a!="number"||a===0||Wc.hasOwnProperty(r)&&Wc[r]?(""+a).trim():a+"px"}function L$(r,a){r=r.style;for(var s in a)if(a.hasOwnProperty(s)){var f=s.indexOf("--")===0,v=F$(s,a[s],f);s==="float"&&(s="cssFloat"),f?r.setProperty(s,v):r[s]=v}}var hce=q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Bk(r,a){if(a){if(hce[r]&&(a.children!=null||a.dangerouslySetInnerHTML!=null))throw Error(o(137,r));if(a.dangerouslySetInnerHTML!=null){if(a.children!=null)throw Error(o(60));if(typeof a.dangerouslySetInnerHTML!="object"||!("__html"in a.dangerouslySetInnerHTML))throw Error(o(61))}if(a.style!=null&&typeof a.style!="object")throw Error(o(62))}}function zk(r,a){if(r.indexOf("-")===-1)return typeof a.is=="string";switch(r){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qk=null;function Mk(r){return r=r.target||r.srcElement||window,r.correspondingUseElement&&(r=r.correspondingUseElement),r.nodeType===3?r.parentNode:r}var Rk=null,Os=null,_s=null;function N$(r){if(r=hd(r)){if(typeof Rk!="function")throw Error(o(280));var a=r.stateNode;a&&(a=Um(a),Rk(r.stateNode,r.type,a))}}function V$(r){Os?_s?_s.push(r):_s=[r]:Os=r}function K$(){if(Os){var r=Os,a=_s;if(_s=Os=null,N$(r),a)for(r=0;r<a.length;r++)N$(a[r])}}function U$(r,a){return r(a)}function H$(){}var Fk=!1;function $$(r,a,s){if(Fk)return r(a,s);Fk=!0;try{return U$(r,a,s)}finally{Fk=!1,(Os!==null||_s!==null)&&(H$(),K$())}}function Gc(r,a){var s=r.stateNode;if(s===null)return null;var f=Um(s);if(f===null)return null;s=f[a];e:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(f=!f.disabled)||(r=r.type,f=!(r==="button"||r==="input"||r==="select"||r==="textarea")),r=!f;break e;default:r=!1}if(r)return null;if(s&&typeof s!="function")throw Error(o(231,a,typeof s));return s}var Lk=!1;if(d)try{Ds={},Object.defineProperty(Ds,"passive",{get:function(){Lk=!0}}),window.addEventListener("test",Ds,Ds),window.removeEventListener("test",Ds,Ds)}catch{Lk=!1}var Ds;function mce(r,a,s,f,v,k,I,R,$){var le=Array.prototype.slice.call(arguments,3);try{a.apply(s,le)}catch(he){this.onError(he)}}var Yc=!1,ym=null,xm=!1,Nk=null,gce={onError:function(r){Yc=!0,ym=r}};function vce(r,a,s,f,v,k,I,R,$){Yc=!1,ym=null,mce.apply(gce,arguments)}function bce(r,a,s,f,v,k,I,R,$){if(vce.apply(this,arguments),Yc){if(Yc){var le=ym;Yc=!1,ym=null}else throw Error(o(198));xm||(xm=!0,Nk=le)}}function Wi(r){var a=r,s=r;if(r.alternate)for(;a.return;)a=a.return;else{r=a;do a=r,a.flags&4098&&(s=a.return),r=a.return;while(r)}return a.tag===3?s:null}function W$(r){if(r.tag===13){var a=r.memoizedState;if(a===null&&(r=r.alternate,r!==null&&(a=r.memoizedState)),a!==null)return a.dehydrated}return null}function G$(r){if(Wi(r)!==r)throw Error(o(188))}function yce(r){var a=r.alternate;if(!a){if(a=Wi(r),a===null)throw Error(o(188));return a!==r?null:r}for(var s=r,f=a;;){var v=s.return;if(v===null)break;var k=v.alternate;if(k===null){if(f=v.return,f!==null){s=f;continue}break}if(v.child===k.child){for(k=v.child;k;){if(k===s)return G$(v),r;if(k===f)return G$(v),a;k=k.sibling}throw Error(o(188))}if(s.return!==f.return)s=v,f=k;else{for(var I=!1,R=v.child;R;){if(R===s){I=!0,s=v,f=k;break}if(R===f){I=!0,f=v,s=k;break}R=R.sibling}if(!I){for(R=k.child;R;){if(R===s){I=!0,s=k,f=v;break}if(R===f){I=!0,f=k,s=v;break}R=R.sibling}if(!I)throw Error(o(189))}}if(s.alternate!==f)throw Error(o(190))}if(s.tag!==3)throw Error(o(188));return s.stateNode.current===s?r:a}function Y$(r){return r=yce(r),r!==null?Q$(r):null}function Q$(r){if(r.tag===5||r.tag===6)return r;for(r=r.child;r!==null;){var a=Q$(r);if(a!==null)return a;r=r.sibling}return null}var X$=n.unstable_scheduleCallback,J$=n.unstable_cancelCallback,xce=n.unstable_shouldYield,kce=n.unstable_requestPaint,At=n.unstable_now,wce=n.unstable_getCurrentPriorityLevel,Vk=n.unstable_ImmediatePriority,Z$=n.unstable_UserBlockingPriority,km=n.unstable_NormalPriority,Sce=n.unstable_LowPriority,eW=n.unstable_IdlePriority,wm=null,xo=null;function Ece(r){if(xo&&typeof xo.onCommitFiberRoot=="function")try{xo.onCommitFiberRoot(wm,r,void 0,(r.current.flags&128)===128)}catch{}}var $r=Math.clz32?Math.clz32:jce,Pce=Math.log,Ice=Math.LN2;function jce(r){return r>>>=0,r===0?32:31-(Pce(r)/Ice|0)|0}var Sm=64,Em=4194304;function Qc(r){switch(r&-r){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return r&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return r}}function Pm(r,a){var s=r.pendingLanes;if(s===0)return 0;var f=0,v=r.suspendedLanes,k=r.pingedLanes,I=s&268435455;if(I!==0){var R=I&~v;R!==0?f=Qc(R):(k&=I,k!==0&&(f=Qc(k)))}else I=s&~v,I!==0?f=Qc(I):k!==0&&(f=Qc(k));if(f===0)return 0;if(a!==0&&a!==f&&!(a&v)&&(v=f&-f,k=a&-a,v>=k||v===16&&(k&4194240)!==0))return a;if(f&4&&(f|=s&16),a=r.entangledLanes,a!==0)for(r=r.entanglements,a&=f;0<a;)s=31-$r(a),v=1<<s,f|=r[s],a&=~v;return f}function Cce(r,a){switch(r){case 1:case 2:case 4:return a+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Oce(r,a){for(var s=r.suspendedLanes,f=r.pingedLanes,v=r.expirationTimes,k=r.pendingLanes;0<k;){var I=31-$r(k),R=1<<I,$=v[I];$===-1?(!(R&s)||R&f)&&(v[I]=Cce(R,a)):$<=a&&(r.expiredLanes|=R),k&=~R}}function Kk(r){return r=r.pendingLanes&-1073741825,r!==0?r:r&1073741824?1073741824:0}function tW(){var r=Sm;return Sm<<=1,!(Sm&4194240)&&(Sm=64),r}function Uk(r){for(var a=[],s=0;31>s;s++)a.push(r);return a}function Xc(r,a,s){r.pendingLanes|=a,a!==536870912&&(r.suspendedLanes=0,r.pingedLanes=0),r=r.eventTimes,a=31-$r(a),r[a]=s}function _ce(r,a){var s=r.pendingLanes&~a;r.pendingLanes=a,r.suspendedLanes=0,r.pingedLanes=0,r.expiredLanes&=a,r.mutableReadLanes&=a,r.entangledLanes&=a,a=r.entanglements;var f=r.eventTimes;for(r=r.expirationTimes;0<s;){var v=31-$r(s),k=1<<v;a[v]=0,f[v]=-1,r[v]=-1,s&=~k}}function Hk(r,a){var s=r.entangledLanes|=a;for(r=r.entanglements;s;){var f=31-$r(s),v=1<<f;v&a|r[f]&a&&(r[f]|=a),s&=~v}}var ot=0;function nW(r){return r&=-r,1<r?4<r?r&268435455?16:536870912:4:1}var rW,$k,oW,aW,iW,Wk=!1,Im=[],Aa=null,Ba=null,za=null,Jc=new Map,Zc=new Map,qa=[],Dce="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function lW(r,a){switch(r){case"focusin":case"focusout":Aa=null;break;case"dragenter":case"dragleave":Ba=null;break;case"mouseover":case"mouseout":za=null;break;case"pointerover":case"pointerout":Jc.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zc.delete(a.pointerId)}}function ed(r,a,s,f,v,k){return r===null||r.nativeEvent!==k?(r={blockedOn:a,domEventName:s,eventSystemFlags:f,nativeEvent:k,targetContainers:[v]},a!==null&&(a=hd(a),a!==null&&$k(a)),r):(r.eventSystemFlags|=f,a=r.targetContainers,v!==null&&a.indexOf(v)===-1&&a.push(v),r)}function Tce(r,a,s,f,v){switch(a){case"focusin":return Aa=ed(Aa,r,a,s,f,v),!0;case"dragenter":return Ba=ed(Ba,r,a,s,f,v),!0;case"mouseover":return za=ed(za,r,a,s,f,v),!0;case"pointerover":var k=v.pointerId;return Jc.set(k,ed(Jc.get(k)||null,r,a,s,f,v)),!0;case"gotpointercapture":return k=v.pointerId,Zc.set(k,ed(Zc.get(k)||null,r,a,s,f,v)),!0}return!1}function sW(r){var a=Gi(r.target);if(a!==null){var s=Wi(a);if(s!==null){if(a=s.tag,a===13){if(a=W$(s),a!==null){r.blockedOn=a,iW(r.priority,function(){oW(s)});return}}else if(a===3&&s.stateNode.current.memoizedState.isDehydrated){r.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}r.blockedOn=null}function jm(r){if(r.blockedOn!==null)return!1;for(var a=r.targetContainers;0<a.length;){var s=Yk(r.domEventName,r.eventSystemFlags,a[0],r.nativeEvent);if(s===null){s=r.nativeEvent;var f=new s.constructor(s.type,s);qk=f,s.target.dispatchEvent(f),qk=null}else return a=hd(s),a!==null&&$k(a),r.blockedOn=s,!1;a.shift()}return!0}function uW(r,a,s){jm(r)&&s.delete(a)}function Ace(){Wk=!1,Aa!==null&&jm(Aa)&&(Aa=null),Ba!==null&&jm(Ba)&&(Ba=null),za!==null&&jm(za)&&(za=null),Jc.forEach(uW),Zc.forEach(uW)}function td(r,a){r.blockedOn===a&&(r.blockedOn=null,Wk||(Wk=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Ace)))}function nd(r){function a(v){return td(v,r)}if(0<Im.length){td(Im[0],r);for(var s=1;s<Im.length;s++){var f=Im[s];f.blockedOn===r&&(f.blockedOn=null)}}for(Aa!==null&&td(Aa,r),Ba!==null&&td(Ba,r),za!==null&&td(za,r),Jc.forEach(a),Zc.forEach(a),s=0;s<qa.length;s++)f=qa[s],f.blockedOn===r&&(f.blockedOn=null);for(;0<qa.length&&(s=qa[0],s.blockedOn===null);)sW(s),s.blockedOn===null&&qa.shift()}var Ts=B.ReactCurrentBatchConfig,Cm=!0;function Bce(r,a,s,f){var v=ot,k=Ts.transition;Ts.transition=null;try{ot=1,Gk(r,a,s,f)}finally{ot=v,Ts.transition=k}}function zce(r,a,s,f){var v=ot,k=Ts.transition;Ts.transition=null;try{ot=4,Gk(r,a,s,f)}finally{ot=v,Ts.transition=k}}function Gk(r,a,s,f){if(Cm){var v=Yk(r,a,s,f);if(v===null)cw(r,a,f,Om,s),lW(r,f);else if(Tce(v,r,a,s,f))f.stopPropagation();else if(lW(r,f),a&4&&-1<Dce.indexOf(r)){for(;v!==null;){var k=hd(v);if(k!==null&&rW(k),k=Yk(r,a,s,f),k===null&&cw(r,a,f,Om,s),k===v)break;v=k}v!==null&&f.stopPropagation()}else cw(r,a,f,null,s)}}var Om=null;function Yk(r,a,s,f){if(Om=null,r=Mk(f),r=Gi(r),r!==null)if(a=Wi(r),a===null)r=null;else if(s=a.tag,s===13){if(r=W$(a),r!==null)return r;r=null}else if(s===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;r=null}else a!==r&&(r=null);return Om=r,null}function cW(r){switch(r){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wce()){case Vk:return 1;case Z$:return 4;case km:case Sce:return 16;case eW:return 536870912;default:return 16}default:return 16}}var Ma=null,Qk=null,_m=null;function dW(){if(_m)return _m;var r,a=Qk,s=a.length,f,v="value"in Ma?Ma.value:Ma.textContent,k=v.length;for(r=0;r<s&&a[r]===v[r];r++);var I=s-r;for(f=1;f<=I&&a[s-f]===v[k-f];f++);return _m=v.slice(r,1<f?1-f:void 0)}function Dm(r){var a=r.keyCode;return"charCode"in r?(r=r.charCode,r===0&&a===13&&(r=13)):r=a,r===10&&(r=13),32<=r||r===13?r:0}function Tm(){return!0}function fW(){return!1}function er(r){function a(s,f,v,k,I){this._reactName=s,this._targetInst=v,this.type=f,this.nativeEvent=k,this.target=I,this.currentTarget=null;for(var R in r)r.hasOwnProperty(R)&&(s=r[R],this[R]=s?s(k):k[R]);return this.isDefaultPrevented=(k.defaultPrevented!=null?k.defaultPrevented:k.returnValue===!1)?Tm:fW,this.isPropagationStopped=fW,this}return q(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Tm)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Tm)},persist:function(){},isPersistent:Tm}),a}var As={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(r){return r.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xk=er(As),rd=q({},As,{view:0,detail:0}),qce=er(rd),Jk,Zk,od,Am=q({},rd,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tw,button:0,buttons:0,relatedTarget:function(r){return r.relatedTarget===void 0?r.fromElement===r.srcElement?r.toElement:r.fromElement:r.relatedTarget},movementX:function(r){return"movementX"in r?r.movementX:(r!==od&&(od&&r.type==="mousemove"?(Jk=r.screenX-od.screenX,Zk=r.screenY-od.screenY):Zk=Jk=0,od=r),Jk)},movementY:function(r){return"movementY"in r?r.movementY:Zk}}),pW=er(Am),Mce=q({},Am,{dataTransfer:0}),Rce=er(Mce),Fce=q({},rd,{relatedTarget:0}),ew=er(Fce),Lce=q({},As,{animationName:0,elapsedTime:0,pseudoElement:0}),Nce=er(Lce),Vce=q({},As,{clipboardData:function(r){return"clipboardData"in r?r.clipboardData:window.clipboardData}}),Kce=er(Vce),Uce=q({},As,{data:0}),hW=er(Uce),Hce={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$ce={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wce={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gce(r){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(r):(r=Wce[r])?!!a[r]:!1}function tw(){return Gce}var Yce=q({},rd,{key:function(r){if(r.key){var a=Hce[r.key]||r.key;if(a!=="Unidentified")return a}return r.type==="keypress"?(r=Dm(r),r===13?"Enter":String.fromCharCode(r)):r.type==="keydown"||r.type==="keyup"?$ce[r.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tw,charCode:function(r){return r.type==="keypress"?Dm(r):0},keyCode:function(r){return r.type==="keydown"||r.type==="keyup"?r.keyCode:0},which:function(r){return r.type==="keypress"?Dm(r):r.type==="keydown"||r.type==="keyup"?r.keyCode:0}}),Qce=er(Yce),Xce=q({},Am,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),mW=er(Xce),Jce=q({},rd,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tw}),Zce=er(Jce),ede=q({},As,{propertyName:0,elapsedTime:0,pseudoElement:0}),tde=er(ede),nde=q({},Am,{deltaX:function(r){return"deltaX"in r?r.deltaX:"wheelDeltaX"in r?-r.wheelDeltaX:0},deltaY:function(r){return"deltaY"in r?r.deltaY:"wheelDeltaY"in r?-r.wheelDeltaY:"wheelDelta"in r?-r.wheelDelta:0},deltaZ:0,deltaMode:0}),rde=er(nde),ode=[9,13,27,32],nw=d&&"CompositionEvent"in window,ad=null;d&&"documentMode"in document&&(ad=document.documentMode);var ade=d&&"TextEvent"in window&&!ad,gW=d&&(!nw||ad&&8<ad&&11>=ad),vW=" ",bW=!1;function yW(r,a){switch(r){case"keyup":return ode.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xW(r){return r=r.detail,typeof r=="object"&&"data"in r?r.data:null}var Bs=!1;function ide(r,a){switch(r){case"compositionend":return xW(a);case"keypress":return a.which!==32?null:(bW=!0,vW);case"textInput":return r=a.data,r===vW&&bW?null:r;default:return null}}function lde(r,a){if(Bs)return r==="compositionend"||!nw&&yW(r,a)?(r=dW(),_m=Qk=Ma=null,Bs=!1,r):null;switch(r){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return gW&&a.locale!=="ko"?null:a.data;default:return null}}var sde={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function kW(r){var a=r&&r.nodeName&&r.nodeName.toLowerCase();return a==="input"?!!sde[r.type]:a==="textarea"}function wW(r,a,s,f){V$(f),a=Nm(a,"onChange"),0<a.length&&(s=new Xk("onChange","change",null,s,f),r.push({event:s,listeners:a}))}var id=null,ld=null;function ude(r){NW(r,0)}function Bm(r){var a=Fs(r);if(He(a))return r}function cde(r,a){if(r==="change")return a}var SW=!1;d&&(d?(zm="oninput"in document,zm||(ow=document.createElement("div"),ow.setAttribute("oninput","return;"),zm=typeof ow.oninput=="function"),rw=zm):rw=!1,SW=rw&&(!document.documentMode||9<document.documentMode));var rw,zm,ow;function EW(){id&&(id.detachEvent("onpropertychange",PW),ld=id=null)}function PW(r){if(r.propertyName==="value"&&Bm(ld)){var a=[];wW(a,ld,r,Mk(r)),$$(ude,a)}}function dde(r,a,s){r==="focusin"?(EW(),id=a,ld=s,id.attachEvent("onpropertychange",PW)):r==="focusout"&&EW()}function fde(r){if(r==="selectionchange"||r==="keyup"||r==="keydown")return Bm(ld)}function pde(r,a){if(r==="click")return Bm(a)}function hde(r,a){if(r==="input"||r==="change")return Bm(a)}function mde(r,a){return r===a&&(r!==0||1/r===1/a)||r!==r&&a!==a}var Wr=typeof Object.is=="function"?Object.is:mde;function sd(r,a){if(Wr(r,a))return!0;if(typeof r!="object"||r===null||typeof a!="object"||a===null)return!1;var s=Object.keys(r),f=Object.keys(a);if(s.length!==f.length)return!1;for(f=0;f<s.length;f++){var v=s[f];if(!p.call(a,v)||!Wr(r[v],a[v]))return!1}return!0}function IW(r){for(;r&&r.firstChild;)r=r.firstChild;return r}function jW(r,a){var s=IW(r);r=0;for(var f;s;){if(s.nodeType===3){if(f=r+s.textContent.length,r<=a&&f>=a)return{node:s,offset:a-r};r=f}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=IW(s)}}function CW(r,a){return r&&a?r===a?!0:r&&r.nodeType===3?!1:a&&a.nodeType===3?CW(r,a.parentNode):"contains"in r?r.contains(a):r.compareDocumentPosition?!!(r.compareDocumentPosition(a)&16):!1:!1}function OW(){for(var r=window,a=rt();a instanceof r.HTMLIFrameElement;){try{var s=typeof a.contentWindow.location.href=="string"}catch{s=!1}if(s)r=a.contentWindow;else break;a=rt(r.document)}return a}function aw(r){var a=r&&r.nodeName&&r.nodeName.toLowerCase();return a&&(a==="input"&&(r.type==="text"||r.type==="search"||r.type==="tel"||r.type==="url"||r.type==="password")||a==="textarea"||r.contentEditable==="true")}function gde(r){var a=OW(),s=r.focusedElem,f=r.selectionRange;if(a!==s&&s&&s.ownerDocument&&CW(s.ownerDocument.documentElement,s)){if(f!==null&&aw(s)){if(a=f.start,r=f.end,r===void 0&&(r=a),"selectionStart"in s)s.selectionStart=a,s.selectionEnd=Math.min(r,s.value.length);else if(r=(a=s.ownerDocument||document)&&a.defaultView||window,r.getSelection){r=r.getSelection();var v=s.textContent.length,k=Math.min(f.start,v);f=f.end===void 0?k:Math.min(f.end,v),!r.extend&&k>f&&(v=f,f=k,k=v),v=jW(s,k);var I=jW(s,f);v&&I&&(r.rangeCount!==1||r.anchorNode!==v.node||r.anchorOffset!==v.offset||r.focusNode!==I.node||r.focusOffset!==I.offset)&&(a=a.createRange(),a.setStart(v.node,v.offset),r.removeAllRanges(),k>f?(r.addRange(a),r.extend(I.node,I.offset)):(a.setEnd(I.node,I.offset),r.addRange(a)))}}for(a=[],r=s;r=r.parentNode;)r.nodeType===1&&a.push({element:r,left:r.scrollLeft,top:r.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<a.length;s++)r=a[s],r.element.scrollLeft=r.left,r.element.scrollTop=r.top}}var vde=d&&"documentMode"in document&&11>=document.documentMode,zs=null,iw=null,ud=null,lw=!1;function _W(r,a,s){var f=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;lw||zs==null||zs!==rt(f)||(f=zs,"selectionStart"in f&&aw(f)?f={start:f.selectionStart,end:f.selectionEnd}:(f=(f.ownerDocument&&f.ownerDocument.defaultView||window).getSelection(),f={anchorNode:f.anchorNode,anchorOffset:f.anchorOffset,focusNode:f.focusNode,focusOffset:f.focusOffset}),ud&&sd(ud,f)||(ud=f,f=Nm(iw,"onSelect"),0<f.length&&(a=new Xk("onSelect","select",null,a,s),r.push({event:a,listeners:f}),a.target=zs)))}function qm(r,a){var s={};return s[r.toLowerCase()]=a.toLowerCase(),s["Webkit"+r]="webkit"+a,s["Moz"+r]="moz"+a,s}var qs={animationend:qm("Animation","AnimationEnd"),animationiteration:qm("Animation","AnimationIteration"),animationstart:qm("Animation","AnimationStart"),transitionend:qm("Transition","TransitionEnd")},sw={},DW={};d&&(DW=document.createElement("div").style,"AnimationEvent"in window||(delete qs.animationend.animation,delete qs.animationiteration.animation,delete qs.animationstart.animation),"TransitionEvent"in window||delete qs.transitionend.transition);function Mm(r){if(sw[r])return sw[r];if(!qs[r])return r;var a=qs[r],s;for(s in a)if(a.hasOwnProperty(s)&&s in DW)return sw[r]=a[s];return r}var TW=Mm("animationend"),AW=Mm("animationiteration"),BW=Mm("animationstart"),zW=Mm("transitionend"),qW=new Map,MW="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ra(r,a){qW.set(r,a),u(a,[r])}for(Fm=0;Fm<MW.length;Fm++)Rm=MW[Fm],RW=Rm.toLowerCase(),FW=Rm[0].toUpperCase()+Rm.slice(1),Ra(RW,"on"+FW);var Rm,RW,FW,Fm;Ra(TW,"onAnimationEnd"),Ra(AW,"onAnimationIteration"),Ra(BW,"onAnimationStart"),Ra("dblclick","onDoubleClick"),Ra("focusin","onFocus"),Ra("focusout","onBlur"),Ra(zW,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cd="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bde=new Set("cancel close invalid load scroll toggle".split(" ").concat(cd));function LW(r,a,s){var f=r.type||"unknown-event";r.currentTarget=s,bce(f,a,void 0,r),r.currentTarget=null}function NW(r,a){a=(a&4)!==0;for(var s=0;s<r.length;s++){var f=r[s],v=f.event;f=f.listeners;e:{var k=void 0;if(a)for(var I=f.length-1;0<=I;I--){var R=f[I],$=R.instance,le=R.currentTarget;if(R=R.listener,$!==k&&v.isPropagationStopped())break e;LW(v,R,le),k=$}else for(I=0;I<f.length;I++){if(R=f[I],$=R.instance,le=R.currentTarget,R=R.listener,$!==k&&v.isPropagationStopped())break e;LW(v,R,le),k=$}}}if(xm)throw r=Nk,xm=!1,Nk=null,r}function vt(r,a){var s=a[gw];s===void 0&&(s=a[gw]=new Set);var f=r+"__bubble";s.has(f)||(VW(a,r,2,!1),s.add(f))}function uw(r,a,s){var f=0;a&&(f|=4),VW(s,r,f,a)}var Lm="_reactListening"+Math.random().toString(36).slice(2);function dd(r){if(!r[Lm]){r[Lm]=!0,i.forEach(function(s){s!=="selectionchange"&&(bde.has(s)||uw(s,!1,r),uw(s,!0,r))});var a=r.nodeType===9?r:r.ownerDocument;a===null||a[Lm]||(a[Lm]=!0,uw("selectionchange",!1,a))}}function VW(r,a,s,f){switch(cW(a)){case 1:var v=Bce;break;case 4:v=zce;break;default:v=Gk}s=v.bind(null,a,s,r),v=void 0,!Lk||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(v=!0),f?v!==void 0?r.addEventListener(a,s,{capture:!0,passive:v}):r.addEventListener(a,s,!0):v!==void 0?r.addEventListener(a,s,{passive:v}):r.addEventListener(a,s,!1)}function cw(r,a,s,f,v){var k=f;if(!(a&1)&&!(a&2)&&f!==null)e:for(;;){if(f===null)return;var I=f.tag;if(I===3||I===4){var R=f.stateNode.containerInfo;if(R===v||R.nodeType===8&&R.parentNode===v)break;if(I===4)for(I=f.return;I!==null;){var $=I.tag;if(($===3||$===4)&&($=I.stateNode.containerInfo,$===v||$.nodeType===8&&$.parentNode===v))return;I=I.return}for(;R!==null;){if(I=Gi(R),I===null)return;if($=I.tag,$===5||$===6){f=k=I;continue e}R=R.parentNode}}f=f.return}$$(function(){var le=k,he=Mk(s),me=[];e:{var pe=qW.get(r);if(pe!==void 0){var xe=Xk,Ee=r;switch(r){case"keypress":if(Dm(s)===0)break e;case"keydown":case"keyup":xe=Qce;break;case"focusin":Ee="focus",xe=ew;break;case"focusout":Ee="blur",xe=ew;break;case"beforeblur":case"afterblur":xe=ew;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":xe=pW;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":xe=Rce;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":xe=Zce;break;case TW:case AW:case BW:xe=Nce;break;case zW:xe=tde;break;case"scroll":xe=qce;break;case"wheel":xe=rde;break;case"copy":case"cut":case"paste":xe=Kce;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":xe=mW}var Ie=(a&4)!==0,Bt=!Ie&&r==="scroll",te=Ie?pe!==null?pe+"Capture":null:pe;Ie=[];for(var Q=le,ae;Q!==null;){ae=Q;var be=ae.stateNode;if(ae.tag===5&&be!==null&&(ae=be,te!==null&&(be=Gc(Q,te),be!=null&&Ie.push(fd(Q,be,ae)))),Bt)break;Q=Q.return}0<Ie.length&&(pe=new xe(pe,Ee,null,s,he),me.push({event:pe,listeners:Ie}))}}if(!(a&7)){e:{if(pe=r==="mouseover"||r==="pointerover",xe=r==="mouseout"||r==="pointerout",pe&&s!==qk&&(Ee=s.relatedTarget||s.fromElement)&&(Gi(Ee)||Ee[Go]))break e;if((xe||pe)&&(pe=he.window===he?he:(pe=he.ownerDocument)?pe.defaultView||pe.parentWindow:window,xe?(Ee=s.relatedTarget||s.toElement,xe=le,Ee=Ee?Gi(Ee):null,Ee!==null&&(Bt=Wi(Ee),Ee!==Bt||Ee.tag!==5&&Ee.tag!==6)&&(Ee=null)):(xe=null,Ee=le),xe!==Ee)){if(Ie=pW,be="onMouseLeave",te="onMouseEnter",Q="mouse",(r==="pointerout"||r==="pointerover")&&(Ie=mW,be="onPointerLeave",te="onPointerEnter",Q="pointer"),Bt=xe==null?pe:Fs(xe),ae=Ee==null?pe:Fs(Ee),pe=new Ie(be,Q+"leave",xe,s,he),pe.target=Bt,pe.relatedTarget=ae,be=null,Gi(he)===le&&(Ie=new Ie(te,Q+"enter",Ee,s,he),Ie.target=ae,Ie.relatedTarget=Bt,be=Ie),Bt=be,xe&&Ee)t:{for(Ie=xe,te=Ee,Q=0,ae=Ie;ae;ae=Ms(ae))Q++;for(ae=0,be=te;be;be=Ms(be))ae++;for(;0<Q-ae;)Ie=Ms(Ie),Q--;for(;0<ae-Q;)te=Ms(te),ae--;for(;Q--;){if(Ie===te||te!==null&&Ie===te.alternate)break t;Ie=Ms(Ie),te=Ms(te)}Ie=null}else Ie=null;xe!==null&&KW(me,pe,xe,Ie,!1),Ee!==null&&Bt!==null&&KW(me,Bt,Ee,Ie,!0)}}e:{if(pe=le?Fs(le):window,xe=pe.nodeName&&pe.nodeName.toLowerCase(),xe==="select"||xe==="input"&&pe.type==="file")var Oe=cde;else if(kW(pe))if(SW)Oe=hde;else{Oe=fde;var Be=dde}else(xe=pe.nodeName)&&xe.toLowerCase()==="input"&&(pe.type==="checkbox"||pe.type==="radio")&&(Oe=pde);if(Oe&&(Oe=Oe(r,le))){wW(me,Oe,s,he);break e}Be&&Be(r,pe,le),r==="focusout"&&(Be=pe._wrapperState)&&Be.controlled&&pe.type==="number"&&Et(pe,"number",pe.value)}switch(Be=le?Fs(le):window,r){case"focusin":(kW(Be)||Be.contentEditable==="true")&&(zs=Be,iw=le,ud=null);break;case"focusout":ud=iw=zs=null;break;case"mousedown":lw=!0;break;case"contextmenu":case"mouseup":case"dragend":lw=!1,_W(me,s,he);break;case"selectionchange":if(vde)break;case"keydown":case"keyup":_W(me,s,he)}var ze;if(nw)e:{switch(r){case"compositionstart":var Fe="onCompositionStart";break e;case"compositionend":Fe="onCompositionEnd";break e;case"compositionupdate":Fe="onCompositionUpdate";break e}Fe=void 0}else Bs?yW(r,s)&&(Fe="onCompositionEnd"):r==="keydown"&&s.keyCode===229&&(Fe="onCompositionStart");Fe&&(gW&&s.locale!=="ko"&&(Bs||Fe!=="onCompositionStart"?Fe==="onCompositionEnd"&&Bs&&(ze=dW()):(Ma=he,Qk="value"in Ma?Ma.value:Ma.textContent,Bs=!0)),Be=Nm(le,Fe),0<Be.length&&(Fe=new hW(Fe,r,null,s,he),me.push({event:Fe,listeners:Be}),ze?Fe.data=ze:(ze=xW(s),ze!==null&&(Fe.data=ze)))),(ze=ade?ide(r,s):lde(r,s))&&(le=Nm(le,"onBeforeInput"),0<le.length&&(he=new hW("onBeforeInput","beforeinput",null,s,he),me.push({event:he,listeners:le}),he.data=ze))}NW(me,a)})}function fd(r,a,s){return{instance:r,listener:a,currentTarget:s}}function Nm(r,a){for(var s=a+"Capture",f=[];r!==null;){var v=r,k=v.stateNode;v.tag===5&&k!==null&&(v=k,k=Gc(r,s),k!=null&&f.unshift(fd(r,k,v)),k=Gc(r,a),k!=null&&f.push(fd(r,k,v))),r=r.return}return f}function Ms(r){if(r===null)return null;do r=r.return;while(r&&r.tag!==5);return r||null}function KW(r,a,s,f,v){for(var k=a._reactName,I=[];s!==null&&s!==f;){var R=s,$=R.alternate,le=R.stateNode;if($!==null&&$===f)break;R.tag===5&&le!==null&&(R=le,v?($=Gc(s,k),$!=null&&I.unshift(fd(s,$,R))):v||($=Gc(s,k),$!=null&&I.push(fd(s,$,R)))),s=s.return}I.length!==0&&r.push({event:a,listeners:I})}var yde=/\r\n?/g,xde=/\u0000|\uFFFD/g;function UW(r){return(typeof r=="string"?r:""+r).replace(yde,`
`).replace(xde,"")}function Vm(r,a,s){if(a=UW(a),UW(r)!==a&&s)throw Error(o(425))}function Km(){}var dw=null,fw=null;function pw(r,a){return r==="textarea"||r==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var hw=typeof setTimeout=="function"?setTimeout:void 0,kde=typeof clearTimeout=="function"?clearTimeout:void 0,HW=typeof Promise=="function"?Promise:void 0,wde=typeof queueMicrotask=="function"?queueMicrotask:typeof HW<"u"?function(r){return HW.resolve(null).then(r).catch(Sde)}:hw;function Sde(r){setTimeout(function(){throw r})}function mw(r,a){var s=a,f=0;do{var v=s.nextSibling;if(r.removeChild(s),v&&v.nodeType===8)if(s=v.data,s==="/$"){if(f===0){r.removeChild(v),nd(a);return}f--}else s!=="$"&&s!=="$?"&&s!=="$!"||f++;s=v}while(s);nd(a)}function Fa(r){for(;r!=null;r=r.nextSibling){var a=r.nodeType;if(a===1||a===3)break;if(a===8){if(a=r.data,a==="$"||a==="$!"||a==="$?")break;if(a==="/$")return null}}return r}function $W(r){r=r.previousSibling;for(var a=0;r;){if(r.nodeType===8){var s=r.data;if(s==="$"||s==="$!"||s==="$?"){if(a===0)return r;a--}else s==="/$"&&a++}r=r.previousSibling}return null}var Rs=Math.random().toString(36).slice(2),ko="__reactFiber$"+Rs,pd="__reactProps$"+Rs,Go="__reactContainer$"+Rs,gw="__reactEvents$"+Rs,Ede="__reactListeners$"+Rs,Pde="__reactHandles$"+Rs;function Gi(r){var a=r[ko];if(a)return a;for(var s=r.parentNode;s;){if(a=s[Go]||s[ko]){if(s=a.alternate,a.child!==null||s!==null&&s.child!==null)for(r=$W(r);r!==null;){if(s=r[ko])return s;r=$W(r)}return a}r=s,s=r.parentNode}return null}function hd(r){return r=r[ko]||r[Go],!r||r.tag!==5&&r.tag!==6&&r.tag!==13&&r.tag!==3?null:r}function Fs(r){if(r.tag===5||r.tag===6)return r.stateNode;throw Error(o(33))}function Um(r){return r[pd]||null}var vw=[],Ls=-1;function La(r){return{current:r}}function bt(r){0>Ls||(r.current=vw[Ls],vw[Ls]=null,Ls--)}function ft(r,a){Ls++,vw[Ls]=r.current,r.current=a}var Na={},bn=La(Na),Ln=La(!1),Yi=Na;function Ns(r,a){var s=r.type.contextTypes;if(!s)return Na;var f=r.stateNode;if(f&&f.__reactInternalMemoizedUnmaskedChildContext===a)return f.__reactInternalMemoizedMaskedChildContext;var v={},k;for(k in s)v[k]=a[k];return f&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=a,r.__reactInternalMemoizedMaskedChildContext=v),v}function Nn(r){return r=r.childContextTypes,r!=null}function Hm(){bt(Ln),bt(bn)}function WW(r,a,s){if(bn.current!==Na)throw Error(o(168));ft(bn,a),ft(Ln,s)}function GW(r,a,s){var f=r.stateNode;if(a=a.childContextTypes,typeof f.getChildContext!="function")return s;f=f.getChildContext();for(var v in f)if(!(v in a))throw Error(o(108,oe(r)||"Unknown",v));return q({},s,f)}function $m(r){return r=(r=r.stateNode)&&r.__reactInternalMemoizedMergedChildContext||Na,Yi=bn.current,ft(bn,r),ft(Ln,Ln.current),!0}function YW(r,a,s){var f=r.stateNode;if(!f)throw Error(o(169));s?(r=GW(r,a,Yi),f.__reactInternalMemoizedMergedChildContext=r,bt(Ln),bt(bn),ft(bn,r)):bt(Ln),ft(Ln,s)}var Yo=null,Wm=!1,bw=!1;function QW(r){Yo===null?Yo=[r]:Yo.push(r)}function Ide(r){Wm=!0,QW(r)}function Va(){if(!bw&&Yo!==null){bw=!0;var r=0,a=ot;try{var s=Yo;for(ot=1;r<s.length;r++){var f=s[r];do f=f(!0);while(f!==null)}Yo=null,Wm=!1}catch(v){throw Yo!==null&&(Yo=Yo.slice(r+1)),X$(Vk,Va),v}finally{ot=a,bw=!1}}return null}var Vs=[],Ks=0,Gm=null,Ym=0,vr=[],br=0,Qi=null,Qo=1,Xo="";function Xi(r,a){Vs[Ks++]=Ym,Vs[Ks++]=Gm,Gm=r,Ym=a}function XW(r,a,s){vr[br++]=Qo,vr[br++]=Xo,vr[br++]=Qi,Qi=r;var f=Qo;r=Xo;var v=32-$r(f)-1;f&=~(1<<v),s+=1;var k=32-$r(a)+v;if(30<k){var I=v-v%5;k=(f&(1<<I)-1).toString(32),f>>=I,v-=I,Qo=1<<32-$r(a)+v|s<<v|f,Xo=k+r}else Qo=1<<k|s<<v|f,Xo=r}function yw(r){r.return!==null&&(Xi(r,1),XW(r,1,0))}function xw(r){for(;r===Gm;)Gm=Vs[--Ks],Vs[Ks]=null,Ym=Vs[--Ks],Vs[Ks]=null;for(;r===Qi;)Qi=vr[--br],vr[br]=null,Xo=vr[--br],vr[br]=null,Qo=vr[--br],vr[br]=null}var tr=null,nr=null,kt=!1,Gr=null;function JW(r,a){var s=wr(5,null,null,0);s.elementType="DELETED",s.stateNode=a,s.return=r,a=r.deletions,a===null?(r.deletions=[s],r.flags|=16):a.push(s)}function ZW(r,a){switch(r.tag){case 5:var s=r.type;return a=a.nodeType!==1||s.toLowerCase()!==a.nodeName.toLowerCase()?null:a,a!==null?(r.stateNode=a,tr=r,nr=Fa(a.firstChild),!0):!1;case 6:return a=r.pendingProps===""||a.nodeType!==3?null:a,a!==null?(r.stateNode=a,tr=r,nr=null,!0):!1;case 13:return a=a.nodeType!==8?null:a,a!==null?(s=Qi!==null?{id:Qo,overflow:Xo}:null,r.memoizedState={dehydrated:a,treeContext:s,retryLane:1073741824},s=wr(18,null,null,0),s.stateNode=a,s.return=r,r.child=s,tr=r,nr=null,!0):!1;default:return!1}}function kw(r){return(r.mode&1)!==0&&(r.flags&128)===0}function ww(r){if(kt){var a=nr;if(a){var s=a;if(!ZW(r,a)){if(kw(r))throw Error(o(418));a=Fa(s.nextSibling);var f=tr;a&&ZW(r,a)?JW(f,s):(r.flags=r.flags&-4097|2,kt=!1,tr=r)}}else{if(kw(r))throw Error(o(418));r.flags=r.flags&-4097|2,kt=!1,tr=r}}}function eG(r){for(r=r.return;r!==null&&r.tag!==5&&r.tag!==3&&r.tag!==13;)r=r.return;tr=r}function Qm(r){if(r!==tr)return!1;if(!kt)return eG(r),kt=!0,!1;var a;if((a=r.tag!==3)&&!(a=r.tag!==5)&&(a=r.type,a=a!=="head"&&a!=="body"&&!pw(r.type,r.memoizedProps)),a&&(a=nr)){if(kw(r))throw tG(),Error(o(418));for(;a;)JW(r,a),a=Fa(a.nextSibling)}if(eG(r),r.tag===13){if(r=r.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(o(317));e:{for(r=r.nextSibling,a=0;r;){if(r.nodeType===8){var s=r.data;if(s==="/$"){if(a===0){nr=Fa(r.nextSibling);break e}a--}else s!=="$"&&s!=="$!"&&s!=="$?"||a++}r=r.nextSibling}nr=null}}else nr=tr?Fa(r.stateNode.nextSibling):null;return!0}function tG(){for(var r=nr;r;)r=Fa(r.nextSibling)}function Us(){nr=tr=null,kt=!1}function Sw(r){Gr===null?Gr=[r]:Gr.push(r)}var jde=B.ReactCurrentBatchConfig;function Yr(r,a){if(r&&r.defaultProps){a=q({},a),r=r.defaultProps;for(var s in r)a[s]===void 0&&(a[s]=r[s]);return a}return a}var Xm=La(null),Jm=null,Hs=null,Ew=null;function Pw(){Ew=Hs=Jm=null}function Iw(r){var a=Xm.current;bt(Xm),r._currentValue=a}function jw(r,a,s){for(;r!==null;){var f=r.alternate;if((r.childLanes&a)!==a?(r.childLanes|=a,f!==null&&(f.childLanes|=a)):f!==null&&(f.childLanes&a)!==a&&(f.childLanes|=a),r===s)break;r=r.return}}function $s(r,a){Jm=r,Ew=Hs=null,r=r.dependencies,r!==null&&r.firstContext!==null&&(r.lanes&a&&(Vn=!0),r.firstContext=null)}function yr(r){var a=r._currentValue;if(Ew!==r)if(r={context:r,memoizedValue:a,next:null},Hs===null){if(Jm===null)throw Error(o(308));Hs=r,Jm.dependencies={lanes:0,firstContext:r}}else Hs=Hs.next=r;return a}var Ji=null;function Cw(r){Ji===null?Ji=[r]:Ji.push(r)}function nG(r,a,s,f){var v=a.interleaved;return v===null?(s.next=s,Cw(a)):(s.next=v.next,v.next=s),a.interleaved=s,Jo(r,f)}function Jo(r,a){r.lanes|=a;var s=r.alternate;for(s!==null&&(s.lanes|=a),s=r,r=r.return;r!==null;)r.childLanes|=a,s=r.alternate,s!==null&&(s.childLanes|=a),s=r,r=r.return;return s.tag===3?s.stateNode:null}var Ka=!1;function Ow(r){r.updateQueue={baseState:r.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function rG(r,a){r=r.updateQueue,a.updateQueue===r&&(a.updateQueue={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects})}function Zo(r,a){return{eventTime:r,lane:a,tag:0,payload:null,callback:null,next:null}}function Ua(r,a,s){var f=r.updateQueue;if(f===null)return null;if(f=f.shared,et&2){var v=f.pending;return v===null?a.next=a:(a.next=v.next,v.next=a),f.pending=a,Jo(r,s)}return v=f.interleaved,v===null?(a.next=a,Cw(f)):(a.next=v.next,v.next=a),f.interleaved=a,Jo(r,s)}function Zm(r,a,s){if(a=a.updateQueue,a!==null&&(a=a.shared,(s&4194240)!==0)){var f=a.lanes;f&=r.pendingLanes,s|=f,a.lanes=s,Hk(r,s)}}function oG(r,a){var s=r.updateQueue,f=r.alternate;if(f!==null&&(f=f.updateQueue,s===f)){var v=null,k=null;if(s=s.firstBaseUpdate,s!==null){do{var I={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};k===null?v=k=I:k=k.next=I,s=s.next}while(s!==null);k===null?v=k=a:k=k.next=a}else v=k=a;s={baseState:f.baseState,firstBaseUpdate:v,lastBaseUpdate:k,shared:f.shared,effects:f.effects},r.updateQueue=s;return}r=s.lastBaseUpdate,r===null?s.firstBaseUpdate=a:r.next=a,s.lastBaseUpdate=a}function eg(r,a,s,f){var v=r.updateQueue;Ka=!1;var k=v.firstBaseUpdate,I=v.lastBaseUpdate,R=v.shared.pending;if(R!==null){v.shared.pending=null;var $=R,le=$.next;$.next=null,I===null?k=le:I.next=le,I=$;var he=r.alternate;he!==null&&(he=he.updateQueue,R=he.lastBaseUpdate,R!==I&&(R===null?he.firstBaseUpdate=le:R.next=le,he.lastBaseUpdate=$))}if(k!==null){var me=v.baseState;I=0,he=le=$=null,R=k;do{var pe=R.lane,xe=R.eventTime;if((f&pe)===pe){he!==null&&(he=he.next={eventTime:xe,lane:0,tag:R.tag,payload:R.payload,callback:R.callback,next:null});e:{var Ee=r,Ie=R;switch(pe=a,xe=s,Ie.tag){case 1:if(Ee=Ie.payload,typeof Ee=="function"){me=Ee.call(xe,me,pe);break e}me=Ee;break e;case 3:Ee.flags=Ee.flags&-65537|128;case 0:if(Ee=Ie.payload,pe=typeof Ee=="function"?Ee.call(xe,me,pe):Ee,pe==null)break e;me=q({},me,pe);break e;case 2:Ka=!0}}R.callback!==null&&R.lane!==0&&(r.flags|=64,pe=v.effects,pe===null?v.effects=[R]:pe.push(R))}else xe={eventTime:xe,lane:pe,tag:R.tag,payload:R.payload,callback:R.callback,next:null},he===null?(le=he=xe,$=me):he=he.next=xe,I|=pe;if(R=R.next,R===null){if(R=v.shared.pending,R===null)break;pe=R,R=pe.next,pe.next=null,v.lastBaseUpdate=pe,v.shared.pending=null}}while(!0);if(he===null&&($=me),v.baseState=$,v.firstBaseUpdate=le,v.lastBaseUpdate=he,a=v.shared.interleaved,a!==null){v=a;do I|=v.lane,v=v.next;while(v!==a)}else k===null&&(v.shared.lanes=0);tl|=I,r.lanes=I,r.memoizedState=me}}function aG(r,a,s){if(r=a.effects,a.effects=null,r!==null)for(a=0;a<r.length;a++){var f=r[a],v=f.callback;if(v!==null){if(f.callback=null,f=s,typeof v!="function")throw Error(o(191,v));v.call(f)}}}var iG=new t.Component().refs;function _w(r,a,s,f){a=r.memoizedState,s=s(f,a),s=s==null?a:q({},a,s),r.memoizedState=s,r.lanes===0&&(r.updateQueue.baseState=s)}var tg={isMounted:function(r){return(r=r._reactInternals)?Wi(r)===r:!1},enqueueSetState:function(r,a,s){r=r._reactInternals;var f=On(),v=Ga(r),k=Zo(f,v);k.payload=a,s!=null&&(k.callback=s),a=Ua(r,k,v),a!==null&&(Jr(a,r,v,f),Zm(a,r,v))},enqueueReplaceState:function(r,a,s){r=r._reactInternals;var f=On(),v=Ga(r),k=Zo(f,v);k.tag=1,k.payload=a,s!=null&&(k.callback=s),a=Ua(r,k,v),a!==null&&(Jr(a,r,v,f),Zm(a,r,v))},enqueueForceUpdate:function(r,a){r=r._reactInternals;var s=On(),f=Ga(r),v=Zo(s,f);v.tag=2,a!=null&&(v.callback=a),a=Ua(r,v,f),a!==null&&(Jr(a,r,f,s),Zm(a,r,f))}};function lG(r,a,s,f,v,k,I){return r=r.stateNode,typeof r.shouldComponentUpdate=="function"?r.shouldComponentUpdate(f,k,I):a.prototype&&a.prototype.isPureReactComponent?!sd(s,f)||!sd(v,k):!0}function sG(r,a,s){var f=!1,v=Na,k=a.contextType;return typeof k=="object"&&k!==null?k=yr(k):(v=Nn(a)?Yi:bn.current,f=a.contextTypes,k=(f=f!=null)?Ns(r,v):Na),a=new a(s,k),r.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=tg,r.stateNode=a,a._reactInternals=r,f&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=v,r.__reactInternalMemoizedMaskedChildContext=k),a}function uG(r,a,s,f){r=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(s,f),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(s,f),a.state!==r&&tg.enqueueReplaceState(a,a.state,null)}function Dw(r,a,s,f){var v=r.stateNode;v.props=s,v.state=r.memoizedState,v.refs=iG,Ow(r);var k=a.contextType;typeof k=="object"&&k!==null?v.context=yr(k):(k=Nn(a)?Yi:bn.current,v.context=Ns(r,k)),v.state=r.memoizedState,k=a.getDerivedStateFromProps,typeof k=="function"&&(_w(r,a,k,s),v.state=r.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof v.getSnapshotBeforeUpdate=="function"||typeof v.UNSAFE_componentWillMount!="function"&&typeof v.componentWillMount!="function"||(a=v.state,typeof v.componentWillMount=="function"&&v.componentWillMount(),typeof v.UNSAFE_componentWillMount=="function"&&v.UNSAFE_componentWillMount(),a!==v.state&&tg.enqueueReplaceState(v,v.state,null),eg(r,s,v,f),v.state=r.memoizedState),typeof v.componentDidMount=="function"&&(r.flags|=4194308)}function md(r,a,s){if(r=s.ref,r!==null&&typeof r!="function"&&typeof r!="object"){if(s._owner){if(s=s._owner,s){if(s.tag!==1)throw Error(o(309));var f=s.stateNode}if(!f)throw Error(o(147,r));var v=f,k=""+r;return a!==null&&a.ref!==null&&typeof a.ref=="function"&&a.ref._stringRef===k?a.ref:(a=function(I){var R=v.refs;R===iG&&(R=v.refs={}),I===null?delete R[k]:R[k]=I},a._stringRef=k,a)}if(typeof r!="string")throw Error(o(284));if(!s._owner)throw Error(o(290,r))}return r}function ng(r,a){throw r=Object.prototype.toString.call(a),Error(o(31,r==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":r))}function cG(r){var a=r._init;return a(r._payload)}function dG(r){function a(te,Q){if(r){var ae=te.deletions;ae===null?(te.deletions=[Q],te.flags|=16):ae.push(Q)}}function s(te,Q){if(!r)return null;for(;Q!==null;)a(te,Q),Q=Q.sibling;return null}function f(te,Q){for(te=new Map;Q!==null;)Q.key!==null?te.set(Q.key,Q):te.set(Q.index,Q),Q=Q.sibling;return te}function v(te,Q){return te=Qa(te,Q),te.index=0,te.sibling=null,te}function k(te,Q,ae){return te.index=ae,r?(ae=te.alternate,ae!==null?(ae=ae.index,ae<Q?(te.flags|=2,Q):ae):(te.flags|=2,Q)):(te.flags|=1048576,Q)}function I(te){return r&&te.alternate===null&&(te.flags|=2),te}function R(te,Q,ae,be){return Q===null||Q.tag!==6?(Q=pS(ae,te.mode,be),Q.return=te,Q):(Q=v(Q,ae),Q.return=te,Q)}function $(te,Q,ae,be){var Oe=ae.type;return Oe===M?he(te,Q,ae.props.children,be,ae.key):Q!==null&&(Q.elementType===Oe||typeof Oe=="object"&&Oe!==null&&Oe.$$typeof===W&&cG(Oe)===Q.type)?(be=v(Q,ae.props),be.ref=md(te,Q,ae),be.return=te,be):(be=kg(ae.type,ae.key,ae.props,null,te.mode,be),be.ref=md(te,Q,ae),be.return=te,be)}function le(te,Q,ae,be){return Q===null||Q.tag!==4||Q.stateNode.containerInfo!==ae.containerInfo||Q.stateNode.implementation!==ae.implementation?(Q=hS(ae,te.mode,be),Q.return=te,Q):(Q=v(Q,ae.children||[]),Q.return=te,Q)}function he(te,Q,ae,be,Oe){return Q===null||Q.tag!==7?(Q=al(ae,te.mode,be,Oe),Q.return=te,Q):(Q=v(Q,ae),Q.return=te,Q)}function me(te,Q,ae){if(typeof Q=="string"&&Q!==""||typeof Q=="number")return Q=pS(""+Q,te.mode,ae),Q.return=te,Q;if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case D:return ae=kg(Q.type,Q.key,Q.props,null,te.mode,ae),ae.ref=md(te,null,Q),ae.return=te,ae;case X:return Q=hS(Q,te.mode,ae),Q.return=te,Q;case W:var be=Q._init;return me(te,be(Q._payload),ae)}if(mr(Q)||ie(Q))return Q=al(Q,te.mode,ae,null),Q.return=te,Q;ng(te,Q)}return null}function pe(te,Q,ae,be){var Oe=Q!==null?Q.key:null;if(typeof ae=="string"&&ae!==""||typeof ae=="number")return Oe!==null?null:R(te,Q,""+ae,be);if(typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case D:return ae.key===Oe?$(te,Q,ae,be):null;case X:return ae.key===Oe?le(te,Q,ae,be):null;case W:return Oe=ae._init,pe(te,Q,Oe(ae._payload),be)}if(mr(ae)||ie(ae))return Oe!==null?null:he(te,Q,ae,be,null);ng(te,ae)}return null}function xe(te,Q,ae,be,Oe){if(typeof be=="string"&&be!==""||typeof be=="number")return te=te.get(ae)||null,R(Q,te,""+be,Oe);if(typeof be=="object"&&be!==null){switch(be.$$typeof){case D:return te=te.get(be.key===null?ae:be.key)||null,$(Q,te,be,Oe);case X:return te=te.get(be.key===null?ae:be.key)||null,le(Q,te,be,Oe);case W:var Be=be._init;return xe(te,Q,ae,Be(be._payload),Oe)}if(mr(be)||ie(be))return te=te.get(ae)||null,he(Q,te,be,Oe,null);ng(Q,be)}return null}function Ee(te,Q,ae,be){for(var Oe=null,Be=null,ze=Q,Fe=Q=0,Yt=null;ze!==null&&Fe<ae.length;Fe++){ze.index>Fe?(Yt=ze,ze=null):Yt=ze.sibling;var nt=pe(te,ze,ae[Fe],be);if(nt===null){ze===null&&(ze=Yt);break}r&&ze&&nt.alternate===null&&a(te,ze),Q=k(nt,Q,Fe),Be===null?Oe=nt:Be.sibling=nt,Be=nt,ze=Yt}if(Fe===ae.length)return s(te,ze),kt&&Xi(te,Fe),Oe;if(ze===null){for(;Fe<ae.length;Fe++)ze=me(te,ae[Fe],be),ze!==null&&(Q=k(ze,Q,Fe),Be===null?Oe=ze:Be.sibling=ze,Be=ze);return kt&&Xi(te,Fe),Oe}for(ze=f(te,ze);Fe<ae.length;Fe++)Yt=xe(ze,te,Fe,ae[Fe],be),Yt!==null&&(r&&Yt.alternate!==null&&ze.delete(Yt.key===null?Fe:Yt.key),Q=k(Yt,Q,Fe),Be===null?Oe=Yt:Be.sibling=Yt,Be=Yt);return r&&ze.forEach(function(Xa){return a(te,Xa)}),kt&&Xi(te,Fe),Oe}function Ie(te,Q,ae,be){var Oe=ie(ae);if(typeof Oe!="function")throw Error(o(150));if(ae=Oe.call(ae),ae==null)throw Error(o(151));for(var Be=Oe=null,ze=Q,Fe=Q=0,Yt=null,nt=ae.next();ze!==null&&!nt.done;Fe++,nt=ae.next()){ze.index>Fe?(Yt=ze,ze=null):Yt=ze.sibling;var Xa=pe(te,ze,nt.value,be);if(Xa===null){ze===null&&(ze=Yt);break}r&&ze&&Xa.alternate===null&&a(te,ze),Q=k(Xa,Q,Fe),Be===null?Oe=Xa:Be.sibling=Xa,Be=Xa,ze=Yt}if(nt.done)return s(te,ze),kt&&Xi(te,Fe),Oe;if(ze===null){for(;!nt.done;Fe++,nt=ae.next())nt=me(te,nt.value,be),nt!==null&&(Q=k(nt,Q,Fe),Be===null?Oe=nt:Be.sibling=nt,Be=nt);return kt&&Xi(te,Fe),Oe}for(ze=f(te,ze);!nt.done;Fe++,nt=ae.next())nt=xe(ze,te,Fe,nt.value,be),nt!==null&&(r&&nt.alternate!==null&&ze.delete(nt.key===null?Fe:nt.key),Q=k(nt,Q,Fe),Be===null?Oe=nt:Be.sibling=nt,Be=nt);return r&&ze.forEach(function(ife){return a(te,ife)}),kt&&Xi(te,Fe),Oe}function Bt(te,Q,ae,be){if(typeof ae=="object"&&ae!==null&&ae.type===M&&ae.key===null&&(ae=ae.props.children),typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case D:e:{for(var Oe=ae.key,Be=Q;Be!==null;){if(Be.key===Oe){if(Oe=ae.type,Oe===M){if(Be.tag===7){s(te,Be.sibling),Q=v(Be,ae.props.children),Q.return=te,te=Q;break e}}else if(Be.elementType===Oe||typeof Oe=="object"&&Oe!==null&&Oe.$$typeof===W&&cG(Oe)===Be.type){s(te,Be.sibling),Q=v(Be,ae.props),Q.ref=md(te,Be,ae),Q.return=te,te=Q;break e}s(te,Be);break}else a(te,Be);Be=Be.sibling}ae.type===M?(Q=al(ae.props.children,te.mode,be,ae.key),Q.return=te,te=Q):(be=kg(ae.type,ae.key,ae.props,null,te.mode,be),be.ref=md(te,Q,ae),be.return=te,te=be)}return I(te);case X:e:{for(Be=ae.key;Q!==null;){if(Q.key===Be)if(Q.tag===4&&Q.stateNode.containerInfo===ae.containerInfo&&Q.stateNode.implementation===ae.implementation){s(te,Q.sibling),Q=v(Q,ae.children||[]),Q.return=te,te=Q;break e}else{s(te,Q);break}else a(te,Q);Q=Q.sibling}Q=hS(ae,te.mode,be),Q.return=te,te=Q}return I(te);case W:return Be=ae._init,Bt(te,Q,Be(ae._payload),be)}if(mr(ae))return Ee(te,Q,ae,be);if(ie(ae))return Ie(te,Q,ae,be);ng(te,ae)}return typeof ae=="string"&&ae!==""||typeof ae=="number"?(ae=""+ae,Q!==null&&Q.tag===6?(s(te,Q.sibling),Q=v(Q,ae),Q.return=te,te=Q):(s(te,Q),Q=pS(ae,te.mode,be),Q.return=te,te=Q),I(te)):s(te,Q)}return Bt}var Ws=dG(!0),fG=dG(!1),gd={},wo=La(gd),vd=La(gd),bd=La(gd);function Zi(r){if(r===gd)throw Error(o(174));return r}function Tw(r,a){switch(ft(bd,a),ft(vd,r),ft(wo,gd),r=a.nodeType,r){case 9:case 11:a=(a=a.documentElement)?a.namespaceURI:gr(null,"");break;default:r=r===8?a.parentNode:a,a=r.namespaceURI||null,r=r.tagName,a=gr(a,r)}bt(wo),ft(wo,a)}function Gs(){bt(wo),bt(vd),bt(bd)}function pG(r){Zi(bd.current);var a=Zi(wo.current),s=gr(a,r.type);a!==s&&(ft(vd,r),ft(wo,s))}function Aw(r){vd.current===r&&(bt(wo),bt(vd))}var Pt=La(0);function rg(r){for(var a=r;a!==null;){if(a.tag===13){var s=a.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||s.data==="$?"||s.data==="$!"))return a}else if(a.tag===19&&a.memoizedProps.revealOrder!==void 0){if(a.flags&128)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===r)break;for(;a.sibling===null;){if(a.return===null||a.return===r)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}var Bw=[];function zw(){for(var r=0;r<Bw.length;r++)Bw[r]._workInProgressVersionPrimary=null;Bw.length=0}var og=B.ReactCurrentDispatcher,qw=B.ReactCurrentBatchConfig,el=0,It=null,Ft=null,Wt=null,ag=!1,yd=!1,xd=0,Cde=0;function yn(){throw Error(o(321))}function Mw(r,a){if(a===null)return!1;for(var s=0;s<a.length&&s<r.length;s++)if(!Wr(r[s],a[s]))return!1;return!0}function Rw(r,a,s,f,v,k){if(el=k,It=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,og.current=r===null||r.memoizedState===null?Tde:Ade,r=s(f,v),yd){k=0;do{if(yd=!1,xd=0,25<=k)throw Error(o(301));k+=1,Wt=Ft=null,a.updateQueue=null,og.current=Bde,r=s(f,v)}while(yd)}if(og.current=sg,a=Ft!==null&&Ft.next!==null,el=0,Wt=Ft=It=null,ag=!1,a)throw Error(o(300));return r}function Fw(){var r=xd!==0;return xd=0,r}function So(){var r={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Wt===null?It.memoizedState=Wt=r:Wt=Wt.next=r,Wt}function xr(){if(Ft===null){var r=It.alternate;r=r!==null?r.memoizedState:null}else r=Ft.next;var a=Wt===null?It.memoizedState:Wt.next;if(a!==null)Wt=a,Ft=r;else{if(r===null)throw Error(o(310));Ft=r,r={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Wt===null?It.memoizedState=Wt=r:Wt=Wt.next=r}return Wt}function kd(r,a){return typeof a=="function"?a(r):a}function Lw(r){var a=xr(),s=a.queue;if(s===null)throw Error(o(311));s.lastRenderedReducer=r;var f=Ft,v=f.baseQueue,k=s.pending;if(k!==null){if(v!==null){var I=v.next;v.next=k.next,k.next=I}f.baseQueue=v=k,s.pending=null}if(v!==null){k=v.next,f=f.baseState;var R=I=null,$=null,le=k;do{var he=le.lane;if((el&he)===he)$!==null&&($=$.next={lane:0,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),f=le.hasEagerState?le.eagerState:r(f,le.action);else{var me={lane:he,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null};$===null?(R=$=me,I=f):$=$.next=me,It.lanes|=he,tl|=he}le=le.next}while(le!==null&&le!==k);$===null?I=f:$.next=R,Wr(f,a.memoizedState)||(Vn=!0),a.memoizedState=f,a.baseState=I,a.baseQueue=$,s.lastRenderedState=f}if(r=s.interleaved,r!==null){v=r;do k=v.lane,It.lanes|=k,tl|=k,v=v.next;while(v!==r)}else v===null&&(s.lanes=0);return[a.memoizedState,s.dispatch]}function Nw(r){var a=xr(),s=a.queue;if(s===null)throw Error(o(311));s.lastRenderedReducer=r;var f=s.dispatch,v=s.pending,k=a.memoizedState;if(v!==null){s.pending=null;var I=v=v.next;do k=r(k,I.action),I=I.next;while(I!==v);Wr(k,a.memoizedState)||(Vn=!0),a.memoizedState=k,a.baseQueue===null&&(a.baseState=k),s.lastRenderedState=k}return[k,f]}function hG(){}function mG(r,a){var s=It,f=xr(),v=a(),k=!Wr(f.memoizedState,v);if(k&&(f.memoizedState=v,Vn=!0),f=f.queue,Vw(bG.bind(null,s,f,r),[r]),f.getSnapshot!==a||k||Wt!==null&&Wt.memoizedState.tag&1){if(s.flags|=2048,wd(9,vG.bind(null,s,f,v,a),void 0,null),Gt===null)throw Error(o(349));el&30||gG(s,a,v)}return v}function gG(r,a,s){r.flags|=16384,r={getSnapshot:a,value:s},a=It.updateQueue,a===null?(a={lastEffect:null,stores:null},It.updateQueue=a,a.stores=[r]):(s=a.stores,s===null?a.stores=[r]:s.push(r))}function vG(r,a,s,f){a.value=s,a.getSnapshot=f,yG(a)&&xG(r)}function bG(r,a,s){return s(function(){yG(a)&&xG(r)})}function yG(r){var a=r.getSnapshot;r=r.value;try{var s=a();return!Wr(r,s)}catch{return!0}}function xG(r){var a=Jo(r,1);a!==null&&Jr(a,r,1,-1)}function kG(r){var a=So();return typeof r=="function"&&(r=r()),a.memoizedState=a.baseState=r,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:kd,lastRenderedState:r},a.queue=r,r=r.dispatch=Dde.bind(null,It,r),[a.memoizedState,r]}function wd(r,a,s,f){return r={tag:r,create:a,destroy:s,deps:f,next:null},a=It.updateQueue,a===null?(a={lastEffect:null,stores:null},It.updateQueue=a,a.lastEffect=r.next=r):(s=a.lastEffect,s===null?a.lastEffect=r.next=r:(f=s.next,s.next=r,r.next=f,a.lastEffect=r)),r}function wG(){return xr().memoizedState}function ig(r,a,s,f){var v=So();It.flags|=r,v.memoizedState=wd(1|a,s,void 0,f===void 0?null:f)}function lg(r,a,s,f){var v=xr();f=f===void 0?null:f;var k=void 0;if(Ft!==null){var I=Ft.memoizedState;if(k=I.destroy,f!==null&&Mw(f,I.deps)){v.memoizedState=wd(a,s,k,f);return}}It.flags|=r,v.memoizedState=wd(1|a,s,k,f)}function SG(r,a){return ig(8390656,8,r,a)}function Vw(r,a){return lg(2048,8,r,a)}function EG(r,a){return lg(4,2,r,a)}function PG(r,a){return lg(4,4,r,a)}function IG(r,a){if(typeof a=="function")return r=r(),a(r),function(){a(null)};if(a!=null)return r=r(),a.current=r,function(){a.current=null}}function jG(r,a,s){return s=s!=null?s.concat([r]):null,lg(4,4,IG.bind(null,a,r),s)}function Kw(){}function CG(r,a){var s=xr();a=a===void 0?null:a;var f=s.memoizedState;return f!==null&&a!==null&&Mw(a,f[1])?f[0]:(s.memoizedState=[r,a],r)}function OG(r,a){var s=xr();a=a===void 0?null:a;var f=s.memoizedState;return f!==null&&a!==null&&Mw(a,f[1])?f[0]:(r=r(),s.memoizedState=[r,a],r)}function _G(r,a,s){return el&21?(Wr(s,a)||(s=tW(),It.lanes|=s,tl|=s,r.baseState=!0),a):(r.baseState&&(r.baseState=!1,Vn=!0),r.memoizedState=s)}function Ode(r,a){var s=ot;ot=s!==0&&4>s?s:4,r(!0);var f=qw.transition;qw.transition={};try{r(!1),a()}finally{ot=s,qw.transition=f}}function DG(){return xr().memoizedState}function _de(r,a,s){var f=Ga(r);if(s={lane:f,action:s,hasEagerState:!1,eagerState:null,next:null},TG(r))AG(a,s);else if(s=nG(r,a,s,f),s!==null){var v=On();Jr(s,r,f,v),BG(s,a,f)}}function Dde(r,a,s){var f=Ga(r),v={lane:f,action:s,hasEagerState:!1,eagerState:null,next:null};if(TG(r))AG(a,v);else{var k=r.alternate;if(r.lanes===0&&(k===null||k.lanes===0)&&(k=a.lastRenderedReducer,k!==null))try{var I=a.lastRenderedState,R=k(I,s);if(v.hasEagerState=!0,v.eagerState=R,Wr(R,I)){var $=a.interleaved;$===null?(v.next=v,Cw(a)):(v.next=$.next,$.next=v),a.interleaved=v;return}}catch{}finally{}s=nG(r,a,v,f),s!==null&&(v=On(),Jr(s,r,f,v),BG(s,a,f))}}function TG(r){var a=r.alternate;return r===It||a!==null&&a===It}function AG(r,a){yd=ag=!0;var s=r.pending;s===null?a.next=a:(a.next=s.next,s.next=a),r.pending=a}function BG(r,a,s){if(s&4194240){var f=a.lanes;f&=r.pendingLanes,s|=f,a.lanes=s,Hk(r,s)}}var sg={readContext:yr,useCallback:yn,useContext:yn,useEffect:yn,useImperativeHandle:yn,useInsertionEffect:yn,useLayoutEffect:yn,useMemo:yn,useReducer:yn,useRef:yn,useState:yn,useDebugValue:yn,useDeferredValue:yn,useTransition:yn,useMutableSource:yn,useSyncExternalStore:yn,useId:yn,unstable_isNewReconciler:!1},Tde={readContext:yr,useCallback:function(r,a){return So().memoizedState=[r,a===void 0?null:a],r},useContext:yr,useEffect:SG,useImperativeHandle:function(r,a,s){return s=s!=null?s.concat([r]):null,ig(4194308,4,IG.bind(null,a,r),s)},useLayoutEffect:function(r,a){return ig(4194308,4,r,a)},useInsertionEffect:function(r,a){return ig(4,2,r,a)},useMemo:function(r,a){var s=So();return a=a===void 0?null:a,r=r(),s.memoizedState=[r,a],r},useReducer:function(r,a,s){var f=So();return a=s!==void 0?s(a):a,f.memoizedState=f.baseState=a,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:r,lastRenderedState:a},f.queue=r,r=r.dispatch=_de.bind(null,It,r),[f.memoizedState,r]},useRef:function(r){var a=So();return r={current:r},a.memoizedState=r},useState:kG,useDebugValue:Kw,useDeferredValue:function(r){return So().memoizedState=r},useTransition:function(){var r=kG(!1),a=r[0];return r=Ode.bind(null,r[1]),So().memoizedState=r,[a,r]},useMutableSource:function(){},useSyncExternalStore:function(r,a,s){var f=It,v=So();if(kt){if(s===void 0)throw Error(o(407));s=s()}else{if(s=a(),Gt===null)throw Error(o(349));el&30||gG(f,a,s)}v.memoizedState=s;var k={value:s,getSnapshot:a};return v.queue=k,SG(bG.bind(null,f,k,r),[r]),f.flags|=2048,wd(9,vG.bind(null,f,k,s,a),void 0,null),s},useId:function(){var r=So(),a=Gt.identifierPrefix;if(kt){var s=Xo,f=Qo;s=(f&~(1<<32-$r(f)-1)).toString(32)+s,a=":"+a+"R"+s,s=xd++,0<s&&(a+="H"+s.toString(32)),a+=":"}else s=Cde++,a=":"+a+"r"+s.toString(32)+":";return r.memoizedState=a},unstable_isNewReconciler:!1},Ade={readContext:yr,useCallback:CG,useContext:yr,useEffect:Vw,useImperativeHandle:jG,useInsertionEffect:EG,useLayoutEffect:PG,useMemo:OG,useReducer:Lw,useRef:wG,useState:function(){return Lw(kd)},useDebugValue:Kw,useDeferredValue:function(r){var a=xr();return _G(a,Ft.memoizedState,r)},useTransition:function(){var r=Lw(kd)[0],a=xr().memoizedState;return[r,a]},useMutableSource:hG,useSyncExternalStore:mG,useId:DG,unstable_isNewReconciler:!1},Bde={readContext:yr,useCallback:CG,useContext:yr,useEffect:Vw,useImperativeHandle:jG,useInsertionEffect:EG,useLayoutEffect:PG,useMemo:OG,useReducer:Nw,useRef:wG,useState:function(){return Nw(kd)},useDebugValue:Kw,useDeferredValue:function(r){var a=xr();return Ft===null?a.memoizedState=r:_G(a,Ft.memoizedState,r)},useTransition:function(){var r=Nw(kd)[0],a=xr().memoizedState;return[r,a]},useMutableSource:hG,useSyncExternalStore:mG,useId:DG,unstable_isNewReconciler:!1};function Ys(r,a){try{var s="",f=a;do s+=T(f),f=f.return;while(f);var v=s}catch(k){v=`
Error generating stack: `+k.message+`
`+k.stack}return{value:r,source:a,stack:v,digest:null}}function Uw(r,a,s){return{value:r,source:null,stack:s??null,digest:a??null}}function Hw(r,a){try{console.error(a.value)}catch(s){setTimeout(function(){throw s})}}var zde=typeof WeakMap=="function"?WeakMap:Map;function zG(r,a,s){s=Zo(-1,s),s.tag=3,s.payload={element:null};var f=a.value;return s.callback=function(){mg||(mg=!0,aS=f),Hw(r,a)},s}function qG(r,a,s){s=Zo(-1,s),s.tag=3;var f=r.type.getDerivedStateFromError;if(typeof f=="function"){var v=a.value;s.payload=function(){return f(v)},s.callback=function(){Hw(r,a)}}var k=r.stateNode;return k!==null&&typeof k.componentDidCatch=="function"&&(s.callback=function(){Hw(r,a),typeof f!="function"&&($a===null?$a=new Set([this]):$a.add(this));var I=a.stack;this.componentDidCatch(a.value,{componentStack:I!==null?I:""})}),s}function MG(r,a,s){var f=r.pingCache;if(f===null){f=r.pingCache=new zde;var v=new Set;f.set(a,v)}else v=f.get(a),v===void 0&&(v=new Set,f.set(a,v));v.has(s)||(v.add(s),r=Yde.bind(null,r,a,s),a.then(r,r))}function RG(r){do{var a;if((a=r.tag===13)&&(a=r.memoizedState,a=a!==null?a.dehydrated!==null:!0),a)return r;r=r.return}while(r!==null);return null}function FG(r,a,s,f,v){return r.mode&1?(r.flags|=65536,r.lanes=v,r):(r===a?r.flags|=65536:(r.flags|=128,s.flags|=131072,s.flags&=-52805,s.tag===1&&(s.alternate===null?s.tag=17:(a=Zo(-1,1),a.tag=2,Ua(s,a,1))),s.lanes|=1),r)}var qde=B.ReactCurrentOwner,Vn=!1;function Cn(r,a,s,f){a.child=r===null?fG(a,null,s,f):Ws(a,r.child,s,f)}function LG(r,a,s,f,v){s=s.render;var k=a.ref;return $s(a,v),f=Rw(r,a,s,f,k,v),s=Fw(),r!==null&&!Vn?(a.updateQueue=r.updateQueue,a.flags&=-2053,r.lanes&=~v,ea(r,a,v)):(kt&&s&&yw(a),a.flags|=1,Cn(r,a,f,v),a.child)}function NG(r,a,s,f,v){if(r===null){var k=s.type;return typeof k=="function"&&!fS(k)&&k.defaultProps===void 0&&s.compare===null&&s.defaultProps===void 0?(a.tag=15,a.type=k,VG(r,a,k,f,v)):(r=kg(s.type,null,f,a,a.mode,v),r.ref=a.ref,r.return=a,a.child=r)}if(k=r.child,!(r.lanes&v)){var I=k.memoizedProps;if(s=s.compare,s=s!==null?s:sd,s(I,f)&&r.ref===a.ref)return ea(r,a,v)}return a.flags|=1,r=Qa(k,f),r.ref=a.ref,r.return=a,a.child=r}function VG(r,a,s,f,v){if(r!==null){var k=r.memoizedProps;if(sd(k,f)&&r.ref===a.ref)if(Vn=!1,a.pendingProps=f=k,(r.lanes&v)!==0)r.flags&131072&&(Vn=!0);else return a.lanes=r.lanes,ea(r,a,v)}return $w(r,a,s,f,v)}function KG(r,a,s){var f=a.pendingProps,v=f.children,k=r!==null?r.memoizedState:null;if(f.mode==="hidden")if(!(a.mode&1))a.memoizedState={baseLanes:0,cachePool:null,transitions:null},ft(Xs,rr),rr|=s;else{if(!(s&1073741824))return r=k!==null?k.baseLanes|s:s,a.lanes=a.childLanes=1073741824,a.memoizedState={baseLanes:r,cachePool:null,transitions:null},a.updateQueue=null,ft(Xs,rr),rr|=r,null;a.memoizedState={baseLanes:0,cachePool:null,transitions:null},f=k!==null?k.baseLanes:s,ft(Xs,rr),rr|=f}else k!==null?(f=k.baseLanes|s,a.memoizedState=null):f=s,ft(Xs,rr),rr|=f;return Cn(r,a,v,s),a.child}function UG(r,a){var s=a.ref;(r===null&&s!==null||r!==null&&r.ref!==s)&&(a.flags|=512,a.flags|=2097152)}function $w(r,a,s,f,v){var k=Nn(s)?Yi:bn.current;return k=Ns(a,k),$s(a,v),s=Rw(r,a,s,f,k,v),f=Fw(),r!==null&&!Vn?(a.updateQueue=r.updateQueue,a.flags&=-2053,r.lanes&=~v,ea(r,a,v)):(kt&&f&&yw(a),a.flags|=1,Cn(r,a,s,v),a.child)}function HG(r,a,s,f,v){if(Nn(s)){var k=!0;$m(a)}else k=!1;if($s(a,v),a.stateNode===null)cg(r,a),sG(a,s,f),Dw(a,s,f,v),f=!0;else if(r===null){var I=a.stateNode,R=a.memoizedProps;I.props=R;var $=I.context,le=s.contextType;typeof le=="object"&&le!==null?le=yr(le):(le=Nn(s)?Yi:bn.current,le=Ns(a,le));var he=s.getDerivedStateFromProps,me=typeof he=="function"||typeof I.getSnapshotBeforeUpdate=="function";me||typeof I.UNSAFE_componentWillReceiveProps!="function"&&typeof I.componentWillReceiveProps!="function"||(R!==f||$!==le)&&uG(a,I,f,le),Ka=!1;var pe=a.memoizedState;I.state=pe,eg(a,f,I,v),$=a.memoizedState,R!==f||pe!==$||Ln.current||Ka?(typeof he=="function"&&(_w(a,s,he,f),$=a.memoizedState),(R=Ka||lG(a,s,R,f,pe,$,le))?(me||typeof I.UNSAFE_componentWillMount!="function"&&typeof I.componentWillMount!="function"||(typeof I.componentWillMount=="function"&&I.componentWillMount(),typeof I.UNSAFE_componentWillMount=="function"&&I.UNSAFE_componentWillMount()),typeof I.componentDidMount=="function"&&(a.flags|=4194308)):(typeof I.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=f,a.memoizedState=$),I.props=f,I.state=$,I.context=le,f=R):(typeof I.componentDidMount=="function"&&(a.flags|=4194308),f=!1)}else{I=a.stateNode,rG(r,a),R=a.memoizedProps,le=a.type===a.elementType?R:Yr(a.type,R),I.props=le,me=a.pendingProps,pe=I.context,$=s.contextType,typeof $=="object"&&$!==null?$=yr($):($=Nn(s)?Yi:bn.current,$=Ns(a,$));var xe=s.getDerivedStateFromProps;(he=typeof xe=="function"||typeof I.getSnapshotBeforeUpdate=="function")||typeof I.UNSAFE_componentWillReceiveProps!="function"&&typeof I.componentWillReceiveProps!="function"||(R!==me||pe!==$)&&uG(a,I,f,$),Ka=!1,pe=a.memoizedState,I.state=pe,eg(a,f,I,v);var Ee=a.memoizedState;R!==me||pe!==Ee||Ln.current||Ka?(typeof xe=="function"&&(_w(a,s,xe,f),Ee=a.memoizedState),(le=Ka||lG(a,s,le,f,pe,Ee,$)||!1)?(he||typeof I.UNSAFE_componentWillUpdate!="function"&&typeof I.componentWillUpdate!="function"||(typeof I.componentWillUpdate=="function"&&I.componentWillUpdate(f,Ee,$),typeof I.UNSAFE_componentWillUpdate=="function"&&I.UNSAFE_componentWillUpdate(f,Ee,$)),typeof I.componentDidUpdate=="function"&&(a.flags|=4),typeof I.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof I.componentDidUpdate!="function"||R===r.memoizedProps&&pe===r.memoizedState||(a.flags|=4),typeof I.getSnapshotBeforeUpdate!="function"||R===r.memoizedProps&&pe===r.memoizedState||(a.flags|=1024),a.memoizedProps=f,a.memoizedState=Ee),I.props=f,I.state=Ee,I.context=$,f=le):(typeof I.componentDidUpdate!="function"||R===r.memoizedProps&&pe===r.memoizedState||(a.flags|=4),typeof I.getSnapshotBeforeUpdate!="function"||R===r.memoizedProps&&pe===r.memoizedState||(a.flags|=1024),f=!1)}return Ww(r,a,s,f,k,v)}function Ww(r,a,s,f,v,k){UG(r,a);var I=(a.flags&128)!==0;if(!f&&!I)return v&&YW(a,s,!1),ea(r,a,k);f=a.stateNode,qde.current=a;var R=I&&typeof s.getDerivedStateFromError!="function"?null:f.render();return a.flags|=1,r!==null&&I?(a.child=Ws(a,r.child,null,k),a.child=Ws(a,null,R,k)):Cn(r,a,R,k),a.memoizedState=f.state,v&&YW(a,s,!0),a.child}function $G(r){var a=r.stateNode;a.pendingContext?WW(r,a.pendingContext,a.pendingContext!==a.context):a.context&&WW(r,a.context,!1),Tw(r,a.containerInfo)}function WG(r,a,s,f,v){return Us(),Sw(v),a.flags|=256,Cn(r,a,s,f),a.child}var Gw={dehydrated:null,treeContext:null,retryLane:0};function Yw(r){return{baseLanes:r,cachePool:null,transitions:null}}function GG(r,a,s){var f=a.pendingProps,v=Pt.current,k=!1,I=(a.flags&128)!==0,R;if((R=I)||(R=r!==null&&r.memoizedState===null?!1:(v&2)!==0),R?(k=!0,a.flags&=-129):(r===null||r.memoizedState!==null)&&(v|=1),ft(Pt,v&1),r===null)return ww(a),r=a.memoizedState,r!==null&&(r=r.dehydrated,r!==null)?(a.mode&1?r.data==="$!"?a.lanes=8:a.lanes=1073741824:a.lanes=1,null):(I=f.children,r=f.fallback,k?(f=a.mode,k=a.child,I={mode:"hidden",children:I},!(f&1)&&k!==null?(k.childLanes=0,k.pendingProps=I):k=wg(I,f,0,null),r=al(r,f,s,null),k.return=a,r.return=a,k.sibling=r,a.child=k,a.child.memoizedState=Yw(s),a.memoizedState=Gw,r):Qw(a,I));if(v=r.memoizedState,v!==null&&(R=v.dehydrated,R!==null))return Mde(r,a,I,f,R,v,s);if(k){k=f.fallback,I=a.mode,v=r.child,R=v.sibling;var $={mode:"hidden",children:f.children};return!(I&1)&&a.child!==v?(f=a.child,f.childLanes=0,f.pendingProps=$,a.deletions=null):(f=Qa(v,$),f.subtreeFlags=v.subtreeFlags&14680064),R!==null?k=Qa(R,k):(k=al(k,I,s,null),k.flags|=2),k.return=a,f.return=a,f.sibling=k,a.child=f,f=k,k=a.child,I=r.child.memoizedState,I=I===null?Yw(s):{baseLanes:I.baseLanes|s,cachePool:null,transitions:I.transitions},k.memoizedState=I,k.childLanes=r.childLanes&~s,a.memoizedState=Gw,f}return k=r.child,r=k.sibling,f=Qa(k,{mode:"visible",children:f.children}),!(a.mode&1)&&(f.lanes=s),f.return=a,f.sibling=null,r!==null&&(s=a.deletions,s===null?(a.deletions=[r],a.flags|=16):s.push(r)),a.child=f,a.memoizedState=null,f}function Qw(r,a){return a=wg({mode:"visible",children:a},r.mode,0,null),a.return=r,r.child=a}function ug(r,a,s,f){return f!==null&&Sw(f),Ws(a,r.child,null,s),r=Qw(a,a.pendingProps.children),r.flags|=2,a.memoizedState=null,r}function Mde(r,a,s,f,v,k,I){if(s)return a.flags&256?(a.flags&=-257,f=Uw(Error(o(422))),ug(r,a,I,f)):a.memoizedState!==null?(a.child=r.child,a.flags|=128,null):(k=f.fallback,v=a.mode,f=wg({mode:"visible",children:f.children},v,0,null),k=al(k,v,I,null),k.flags|=2,f.return=a,k.return=a,f.sibling=k,a.child=f,a.mode&1&&Ws(a,r.child,null,I),a.child.memoizedState=Yw(I),a.memoizedState=Gw,k);if(!(a.mode&1))return ug(r,a,I,null);if(v.data==="$!"){if(f=v.nextSibling&&v.nextSibling.dataset,f)var R=f.dgst;return f=R,k=Error(o(419)),f=Uw(k,f,void 0),ug(r,a,I,f)}if(R=(I&r.childLanes)!==0,Vn||R){if(f=Gt,f!==null){switch(I&-I){case 4:v=2;break;case 16:v=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:v=32;break;case 536870912:v=268435456;break;default:v=0}v=v&(f.suspendedLanes|I)?0:v,v!==0&&v!==k.retryLane&&(k.retryLane=v,Jo(r,v),Jr(f,r,v,-1))}return dS(),f=Uw(Error(o(421))),ug(r,a,I,f)}return v.data==="$?"?(a.flags|=128,a.child=r.child,a=Qde.bind(null,r),v._reactRetry=a,null):(r=k.treeContext,nr=Fa(v.nextSibling),tr=a,kt=!0,Gr=null,r!==null&&(vr[br++]=Qo,vr[br++]=Xo,vr[br++]=Qi,Qo=r.id,Xo=r.overflow,Qi=a),a=Qw(a,f.children),a.flags|=4096,a)}function YG(r,a,s){r.lanes|=a;var f=r.alternate;f!==null&&(f.lanes|=a),jw(r.return,a,s)}function Xw(r,a,s,f,v){var k=r.memoizedState;k===null?r.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:f,tail:s,tailMode:v}:(k.isBackwards=a,k.rendering=null,k.renderingStartTime=0,k.last=f,k.tail=s,k.tailMode=v)}function QG(r,a,s){var f=a.pendingProps,v=f.revealOrder,k=f.tail;if(Cn(r,a,f.children,s),f=Pt.current,f&2)f=f&1|2,a.flags|=128;else{if(r!==null&&r.flags&128)e:for(r=a.child;r!==null;){if(r.tag===13)r.memoizedState!==null&&YG(r,s,a);else if(r.tag===19)YG(r,s,a);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===a)break e;for(;r.sibling===null;){if(r.return===null||r.return===a)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}f&=1}if(ft(Pt,f),!(a.mode&1))a.memoizedState=null;else switch(v){case"forwards":for(s=a.child,v=null;s!==null;)r=s.alternate,r!==null&&rg(r)===null&&(v=s),s=s.sibling;s=v,s===null?(v=a.child,a.child=null):(v=s.sibling,s.sibling=null),Xw(a,!1,v,s,k);break;case"backwards":for(s=null,v=a.child,a.child=null;v!==null;){if(r=v.alternate,r!==null&&rg(r)===null){a.child=v;break}r=v.sibling,v.sibling=s,s=v,v=r}Xw(a,!0,s,null,k);break;case"together":Xw(a,!1,null,null,void 0);break;default:a.memoizedState=null}return a.child}function cg(r,a){!(a.mode&1)&&r!==null&&(r.alternate=null,a.alternate=null,a.flags|=2)}function ea(r,a,s){if(r!==null&&(a.dependencies=r.dependencies),tl|=a.lanes,!(s&a.childLanes))return null;if(r!==null&&a.child!==r.child)throw Error(o(153));if(a.child!==null){for(r=a.child,s=Qa(r,r.pendingProps),a.child=s,s.return=a;r.sibling!==null;)r=r.sibling,s=s.sibling=Qa(r,r.pendingProps),s.return=a;s.sibling=null}return a.child}function Rde(r,a,s){switch(a.tag){case 3:$G(a),Us();break;case 5:pG(a);break;case 1:Nn(a.type)&&$m(a);break;case 4:Tw(a,a.stateNode.containerInfo);break;case 10:var f=a.type._context,v=a.memoizedProps.value;ft(Xm,f._currentValue),f._currentValue=v;break;case 13:if(f=a.memoizedState,f!==null)return f.dehydrated!==null?(ft(Pt,Pt.current&1),a.flags|=128,null):s&a.child.childLanes?GG(r,a,s):(ft(Pt,Pt.current&1),r=ea(r,a,s),r!==null?r.sibling:null);ft(Pt,Pt.current&1);break;case 19:if(f=(s&a.childLanes)!==0,r.flags&128){if(f)return QG(r,a,s);a.flags|=128}if(v=a.memoizedState,v!==null&&(v.rendering=null,v.tail=null,v.lastEffect=null),ft(Pt,Pt.current),f)break;return null;case 22:case 23:return a.lanes=0,KG(r,a,s)}return ea(r,a,s)}var XG,Jw,JG,ZG;XG=function(r,a){for(var s=a.child;s!==null;){if(s.tag===5||s.tag===6)r.appendChild(s.stateNode);else if(s.tag!==4&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===a)break;for(;s.sibling===null;){if(s.return===null||s.return===a)return;s=s.return}s.sibling.return=s.return,s=s.sibling}},Jw=function(){},JG=function(r,a,s,f){var v=r.memoizedProps;if(v!==f){r=a.stateNode,Zi(wo.current);var k=null;switch(s){case"input":v=Le(r,v),f=Le(r,f),k=[];break;case"select":v=q({},v,{value:void 0}),f=q({},f,{value:void 0}),k=[];break;case"textarea":v=$t(r,v),f=$t(r,f),k=[];break;default:typeof v.onClick!="function"&&typeof f.onClick=="function"&&(r.onclick=Km)}Bk(s,f);var I;s=null;for(le in v)if(!f.hasOwnProperty(le)&&v.hasOwnProperty(le)&&v[le]!=null)if(le==="style"){var R=v[le];for(I in R)R.hasOwnProperty(I)&&(s||(s={}),s[I]="")}else le!=="dangerouslySetInnerHTML"&&le!=="children"&&le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&le!=="autoFocus"&&(l.hasOwnProperty(le)?k||(k=[]):(k=k||[]).push(le,null));for(le in f){var $=f[le];if(R=v?.[le],f.hasOwnProperty(le)&&$!==R&&($!=null||R!=null))if(le==="style")if(R){for(I in R)!R.hasOwnProperty(I)||$&&$.hasOwnProperty(I)||(s||(s={}),s[I]="");for(I in $)$.hasOwnProperty(I)&&R[I]!==$[I]&&(s||(s={}),s[I]=$[I])}else s||(k||(k=[]),k.push(le,s)),s=$;else le==="dangerouslySetInnerHTML"?($=$?$.__html:void 0,R=R?R.__html:void 0,$!=null&&R!==$&&(k=k||[]).push(le,$)):le==="children"?typeof $!="string"&&typeof $!="number"||(k=k||[]).push(le,""+$):le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&(l.hasOwnProperty(le)?($!=null&&le==="onScroll"&&vt("scroll",r),k||R===$||(k=[])):(k=k||[]).push(le,$))}s&&(k=k||[]).push("style",s);var le=k;(a.updateQueue=le)&&(a.flags|=4)}},ZG=function(r,a,s,f){s!==f&&(a.flags|=4)};function Sd(r,a){if(!kt)switch(r.tailMode){case"hidden":a=r.tail;for(var s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?r.tail=null:s.sibling=null;break;case"collapsed":s=r.tail;for(var f=null;s!==null;)s.alternate!==null&&(f=s),s=s.sibling;f===null?a||r.tail===null?r.tail=null:r.tail.sibling=null:f.sibling=null}}function xn(r){var a=r.alternate!==null&&r.alternate.child===r.child,s=0,f=0;if(a)for(var v=r.child;v!==null;)s|=v.lanes|v.childLanes,f|=v.subtreeFlags&14680064,f|=v.flags&14680064,v.return=r,v=v.sibling;else for(v=r.child;v!==null;)s|=v.lanes|v.childLanes,f|=v.subtreeFlags,f|=v.flags,v.return=r,v=v.sibling;return r.subtreeFlags|=f,r.childLanes=s,a}function Fde(r,a,s){var f=a.pendingProps;switch(xw(a),a.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xn(a),null;case 1:return Nn(a.type)&&Hm(),xn(a),null;case 3:return f=a.stateNode,Gs(),bt(Ln),bt(bn),zw(),f.pendingContext&&(f.context=f.pendingContext,f.pendingContext=null),(r===null||r.child===null)&&(Qm(a)?a.flags|=4:r===null||r.memoizedState.isDehydrated&&!(a.flags&256)||(a.flags|=1024,Gr!==null&&(sS(Gr),Gr=null))),Jw(r,a),xn(a),null;case 5:Aw(a);var v=Zi(bd.current);if(s=a.type,r!==null&&a.stateNode!=null)JG(r,a,s,f,v),r.ref!==a.ref&&(a.flags|=512,a.flags|=2097152);else{if(!f){if(a.stateNode===null)throw Error(o(166));return xn(a),null}if(r=Zi(wo.current),Qm(a)){f=a.stateNode,s=a.type;var k=a.memoizedProps;switch(f[ko]=a,f[pd]=k,r=(a.mode&1)!==0,s){case"dialog":vt("cancel",f),vt("close",f);break;case"iframe":case"object":case"embed":vt("load",f);break;case"video":case"audio":for(v=0;v<cd.length;v++)vt(cd[v],f);break;case"source":vt("error",f);break;case"img":case"image":case"link":vt("error",f),vt("load",f);break;case"details":vt("toggle",f);break;case"input":gt(f,k),vt("invalid",f);break;case"select":f._wrapperState={wasMultiple:!!k.multiple},vt("invalid",f);break;case"textarea":qe(f,k),vt("invalid",f)}Bk(s,k),v=null;for(var I in k)if(k.hasOwnProperty(I)){var R=k[I];I==="children"?typeof R=="string"?f.textContent!==R&&(k.suppressHydrationWarning!==!0&&Vm(f.textContent,R,r),v=["children",R]):typeof R=="number"&&f.textContent!==""+R&&(k.suppressHydrationWarning!==!0&&Vm(f.textContent,R,r),v=["children",""+R]):l.hasOwnProperty(I)&&R!=null&&I==="onScroll"&&vt("scroll",f)}switch(s){case"input":De(f),Ht(f,k,!0);break;case"textarea":De(f),Wo(f);break;case"select":case"option":break;default:typeof k.onClick=="function"&&(f.onclick=Km)}f=v,a.updateQueue=f,f!==null&&(a.flags|=4)}else{I=v.nodeType===9?v:v.ownerDocument,r==="http://www.w3.org/1999/xhtml"&&(r=Cs(s)),r==="http://www.w3.org/1999/xhtml"?s==="script"?(r=I.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild)):typeof f.is=="string"?r=I.createElement(s,{is:f.is}):(r=I.createElement(s),s==="select"&&(I=r,f.multiple?I.multiple=!0:f.size&&(I.size=f.size))):r=I.createElementNS(r,s),r[ko]=a,r[pd]=f,XG(r,a,!1,!1),a.stateNode=r;e:{switch(I=zk(s,f),s){case"dialog":vt("cancel",r),vt("close",r),v=f;break;case"iframe":case"object":case"embed":vt("load",r),v=f;break;case"video":case"audio":for(v=0;v<cd.length;v++)vt(cd[v],r);v=f;break;case"source":vt("error",r),v=f;break;case"img":case"image":case"link":vt("error",r),vt("load",r),v=f;break;case"details":vt("toggle",r),v=f;break;case"input":gt(r,f),v=Le(r,f),vt("invalid",r);break;case"option":v=f;break;case"select":r._wrapperState={wasMultiple:!!f.multiple},v=q({},f,{value:void 0}),vt("invalid",r);break;case"textarea":qe(r,f),v=$t(r,f),vt("invalid",r);break;default:v=f}Bk(s,v),R=v;for(k in R)if(R.hasOwnProperty(k)){var $=R[k];k==="style"?L$(r,$):k==="dangerouslySetInnerHTML"?($=$?$.__html:void 0,$!=null&&R$(r,$)):k==="children"?typeof $=="string"?(s!=="textarea"||$!=="")&&$c(r,$):typeof $=="number"&&$c(r,""+$):k!=="suppressContentEditableWarning"&&k!=="suppressHydrationWarning"&&k!=="autoFocus"&&(l.hasOwnProperty(k)?$!=null&&k==="onScroll"&&vt("scroll",r):$!=null&&z(r,k,$,I))}switch(s){case"input":De(r),Ht(r,f,!1);break;case"textarea":De(r),Wo(r);break;case"option":f.value!=null&&r.setAttribute("value",""+ve(f.value));break;case"select":r.multiple=!!f.multiple,k=f.value,k!=null?Fn(r,!!f.multiple,k,!1):f.defaultValue!=null&&Fn(r,!!f.multiple,f.defaultValue,!0);break;default:typeof v.onClick=="function"&&(r.onclick=Km)}switch(s){case"button":case"input":case"select":case"textarea":f=!!f.autoFocus;break e;case"img":f=!0;break e;default:f=!1}}f&&(a.flags|=4)}a.ref!==null&&(a.flags|=512,a.flags|=2097152)}return xn(a),null;case 6:if(r&&a.stateNode!=null)ZG(r,a,r.memoizedProps,f);else{if(typeof f!="string"&&a.stateNode===null)throw Error(o(166));if(s=Zi(bd.current),Zi(wo.current),Qm(a)){if(f=a.stateNode,s=a.memoizedProps,f[ko]=a,(k=f.nodeValue!==s)&&(r=tr,r!==null))switch(r.tag){case 3:Vm(f.nodeValue,s,(r.mode&1)!==0);break;case 5:r.memoizedProps.suppressHydrationWarning!==!0&&Vm(f.nodeValue,s,(r.mode&1)!==0)}k&&(a.flags|=4)}else f=(s.nodeType===9?s:s.ownerDocument).createTextNode(f),f[ko]=a,a.stateNode=f}return xn(a),null;case 13:if(bt(Pt),f=a.memoizedState,r===null||r.memoizedState!==null&&r.memoizedState.dehydrated!==null){if(kt&&nr!==null&&a.mode&1&&!(a.flags&128))tG(),Us(),a.flags|=98560,k=!1;else if(k=Qm(a),f!==null&&f.dehydrated!==null){if(r===null){if(!k)throw Error(o(318));if(k=a.memoizedState,k=k!==null?k.dehydrated:null,!k)throw Error(o(317));k[ko]=a}else Us(),!(a.flags&128)&&(a.memoizedState=null),a.flags|=4;xn(a),k=!1}else Gr!==null&&(sS(Gr),Gr=null),k=!0;if(!k)return a.flags&65536?a:null}return a.flags&128?(a.lanes=s,a):(f=f!==null,f!==(r!==null&&r.memoizedState!==null)&&f&&(a.child.flags|=8192,a.mode&1&&(r===null||Pt.current&1?Lt===0&&(Lt=3):dS())),a.updateQueue!==null&&(a.flags|=4),xn(a),null);case 4:return Gs(),Jw(r,a),r===null&&dd(a.stateNode.containerInfo),xn(a),null;case 10:return Iw(a.type._context),xn(a),null;case 17:return Nn(a.type)&&Hm(),xn(a),null;case 19:if(bt(Pt),k=a.memoizedState,k===null)return xn(a),null;if(f=(a.flags&128)!==0,I=k.rendering,I===null)if(f)Sd(k,!1);else{if(Lt!==0||r!==null&&r.flags&128)for(r=a.child;r!==null;){if(I=rg(r),I!==null){for(a.flags|=128,Sd(k,!1),f=I.updateQueue,f!==null&&(a.updateQueue=f,a.flags|=4),a.subtreeFlags=0,f=s,s=a.child;s!==null;)k=s,r=f,k.flags&=14680066,I=k.alternate,I===null?(k.childLanes=0,k.lanes=r,k.child=null,k.subtreeFlags=0,k.memoizedProps=null,k.memoizedState=null,k.updateQueue=null,k.dependencies=null,k.stateNode=null):(k.childLanes=I.childLanes,k.lanes=I.lanes,k.child=I.child,k.subtreeFlags=0,k.deletions=null,k.memoizedProps=I.memoizedProps,k.memoizedState=I.memoizedState,k.updateQueue=I.updateQueue,k.type=I.type,r=I.dependencies,k.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext}),s=s.sibling;return ft(Pt,Pt.current&1|2),a.child}r=r.sibling}k.tail!==null&&At()>Js&&(a.flags|=128,f=!0,Sd(k,!1),a.lanes=4194304)}else{if(!f)if(r=rg(I),r!==null){if(a.flags|=128,f=!0,s=r.updateQueue,s!==null&&(a.updateQueue=s,a.flags|=4),Sd(k,!0),k.tail===null&&k.tailMode==="hidden"&&!I.alternate&&!kt)return xn(a),null}else 2*At()-k.renderingStartTime>Js&&s!==1073741824&&(a.flags|=128,f=!0,Sd(k,!1),a.lanes=4194304);k.isBackwards?(I.sibling=a.child,a.child=I):(s=k.last,s!==null?s.sibling=I:a.child=I,k.last=I)}return k.tail!==null?(a=k.tail,k.rendering=a,k.tail=a.sibling,k.renderingStartTime=At(),a.sibling=null,s=Pt.current,ft(Pt,f?s&1|2:s&1),a):(xn(a),null);case 22:case 23:return cS(),f=a.memoizedState!==null,r!==null&&r.memoizedState!==null!==f&&(a.flags|=8192),f&&a.mode&1?rr&1073741824&&(xn(a),a.subtreeFlags&6&&(a.flags|=8192)):xn(a),null;case 24:return null;case 25:return null}throw Error(o(156,a.tag))}function Lde(r,a){switch(xw(a),a.tag){case 1:return Nn(a.type)&&Hm(),r=a.flags,r&65536?(a.flags=r&-65537|128,a):null;case 3:return Gs(),bt(Ln),bt(bn),zw(),r=a.flags,r&65536&&!(r&128)?(a.flags=r&-65537|128,a):null;case 5:return Aw(a),null;case 13:if(bt(Pt),r=a.memoizedState,r!==null&&r.dehydrated!==null){if(a.alternate===null)throw Error(o(340));Us()}return r=a.flags,r&65536?(a.flags=r&-65537|128,a):null;case 19:return bt(Pt),null;case 4:return Gs(),null;case 10:return Iw(a.type._context),null;case 22:case 23:return cS(),null;case 24:return null;default:return null}}var dg=!1,kn=!1,Nde=typeof WeakSet=="function"?WeakSet:Set,Se=null;function Qs(r,a){var s=r.ref;if(s!==null)if(typeof s=="function")try{s(null)}catch(f){Ot(r,a,f)}else s.current=null}function eY(r,a,s){try{s()}catch(f){Ot(r,a,f)}}var tY=!1;function Vde(r,a){if(dw=Cm,r=OW(),aw(r)){if("selectionStart"in r)var s={start:r.selectionStart,end:r.selectionEnd};else e:{s=(s=r.ownerDocument)&&s.defaultView||window;var f=s.getSelection&&s.getSelection();if(f&&f.rangeCount!==0){s=f.anchorNode;var v=f.anchorOffset,k=f.focusNode;f=f.focusOffset;try{s.nodeType,k.nodeType}catch{s=null;break e}var I=0,R=-1,$=-1,le=0,he=0,me=r,pe=null;t:for(;;){for(var xe;me!==s||v!==0&&me.nodeType!==3||(R=I+v),me!==k||f!==0&&me.nodeType!==3||($=I+f),me.nodeType===3&&(I+=me.nodeValue.length),(xe=me.firstChild)!==null;)pe=me,me=xe;for(;;){if(me===r)break t;if(pe===s&&++le===v&&(R=I),pe===k&&++he===f&&($=I),(xe=me.nextSibling)!==null)break;me=pe,pe=me.parentNode}me=xe}s=R===-1||$===-1?null:{start:R,end:$}}else s=null}s=s||{start:0,end:0}}else s=null;for(fw={focusedElem:r,selectionRange:s},Cm=!1,Se=a;Se!==null;)if(a=Se,r=a.child,(a.subtreeFlags&1028)!==0&&r!==null)r.return=a,Se=r;else for(;Se!==null;){a=Se;try{var Ee=a.alternate;if(a.flags&1024)switch(a.tag){case 0:case 11:case 15:break;case 1:if(Ee!==null){var Ie=Ee.memoizedProps,Bt=Ee.memoizedState,te=a.stateNode,Q=te.getSnapshotBeforeUpdate(a.elementType===a.type?Ie:Yr(a.type,Ie),Bt);te.__reactInternalSnapshotBeforeUpdate=Q}break;case 3:var ae=a.stateNode.containerInfo;ae.nodeType===1?ae.textContent="":ae.nodeType===9&&ae.documentElement&&ae.removeChild(ae.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(o(163))}}catch(be){Ot(a,a.return,be)}if(r=a.sibling,r!==null){r.return=a.return,Se=r;break}Se=a.return}return Ee=tY,tY=!1,Ee}function Ed(r,a,s){var f=a.updateQueue;if(f=f!==null?f.lastEffect:null,f!==null){var v=f=f.next;do{if((v.tag&r)===r){var k=v.destroy;v.destroy=void 0,k!==void 0&&eY(a,s,k)}v=v.next}while(v!==f)}}function fg(r,a){if(a=a.updateQueue,a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&r)===r){var f=s.create;s.destroy=f()}s=s.next}while(s!==a)}}function Zw(r){var a=r.ref;if(a!==null){var s=r.stateNode;switch(r.tag){case 5:r=s;break;default:r=s}typeof a=="function"?a(r):a.current=r}}function nY(r){var a=r.alternate;a!==null&&(r.alternate=null,nY(a)),r.child=null,r.deletions=null,r.sibling=null,r.tag===5&&(a=r.stateNode,a!==null&&(delete a[ko],delete a[pd],delete a[gw],delete a[Ede],delete a[Pde])),r.stateNode=null,r.return=null,r.dependencies=null,r.memoizedProps=null,r.memoizedState=null,r.pendingProps=null,r.stateNode=null,r.updateQueue=null}function rY(r){return r.tag===5||r.tag===3||r.tag===4}function oY(r){e:for(;;){for(;r.sibling===null;){if(r.return===null||rY(r.return))return null;r=r.return}for(r.sibling.return=r.return,r=r.sibling;r.tag!==5&&r.tag!==6&&r.tag!==18;){if(r.flags&2||r.child===null||r.tag===4)continue e;r.child.return=r,r=r.child}if(!(r.flags&2))return r.stateNode}}function eS(r,a,s){var f=r.tag;if(f===5||f===6)r=r.stateNode,a?s.nodeType===8?s.parentNode.insertBefore(r,a):s.insertBefore(r,a):(s.nodeType===8?(a=s.parentNode,a.insertBefore(r,s)):(a=s,a.appendChild(r)),s=s._reactRootContainer,s!=null||a.onclick!==null||(a.onclick=Km));else if(f!==4&&(r=r.child,r!==null))for(eS(r,a,s),r=r.sibling;r!==null;)eS(r,a,s),r=r.sibling}function tS(r,a,s){var f=r.tag;if(f===5||f===6)r=r.stateNode,a?s.insertBefore(r,a):s.appendChild(r);else if(f!==4&&(r=r.child,r!==null))for(tS(r,a,s),r=r.sibling;r!==null;)tS(r,a,s),r=r.sibling}var an=null,Qr=!1;function Ha(r,a,s){for(s=s.child;s!==null;)aY(r,a,s),s=s.sibling}function aY(r,a,s){if(xo&&typeof xo.onCommitFiberUnmount=="function")try{xo.onCommitFiberUnmount(wm,s)}catch{}switch(s.tag){case 5:kn||Qs(s,a);case 6:var f=an,v=Qr;an=null,Ha(r,a,s),an=f,Qr=v,an!==null&&(Qr?(r=an,s=s.stateNode,r.nodeType===8?r.parentNode.removeChild(s):r.removeChild(s)):an.removeChild(s.stateNode));break;case 18:an!==null&&(Qr?(r=an,s=s.stateNode,r.nodeType===8?mw(r.parentNode,s):r.nodeType===1&&mw(r,s),nd(r)):mw(an,s.stateNode));break;case 4:f=an,v=Qr,an=s.stateNode.containerInfo,Qr=!0,Ha(r,a,s),an=f,Qr=v;break;case 0:case 11:case 14:case 15:if(!kn&&(f=s.updateQueue,f!==null&&(f=f.lastEffect,f!==null))){v=f=f.next;do{var k=v,I=k.destroy;k=k.tag,I!==void 0&&(k&2||k&4)&&eY(s,a,I),v=v.next}while(v!==f)}Ha(r,a,s);break;case 1:if(!kn&&(Qs(s,a),f=s.stateNode,typeof f.componentWillUnmount=="function"))try{f.props=s.memoizedProps,f.state=s.memoizedState,f.componentWillUnmount()}catch(R){Ot(s,a,R)}Ha(r,a,s);break;case 21:Ha(r,a,s);break;case 22:s.mode&1?(kn=(f=kn)||s.memoizedState!==null,Ha(r,a,s),kn=f):Ha(r,a,s);break;default:Ha(r,a,s)}}function iY(r){var a=r.updateQueue;if(a!==null){r.updateQueue=null;var s=r.stateNode;s===null&&(s=r.stateNode=new Nde),a.forEach(function(f){var v=Xde.bind(null,r,f);s.has(f)||(s.add(f),f.then(v,v))})}}function Xr(r,a){var s=a.deletions;if(s!==null)for(var f=0;f<s.length;f++){var v=s[f];try{var k=r,I=a,R=I;e:for(;R!==null;){switch(R.tag){case 5:an=R.stateNode,Qr=!1;break e;case 3:an=R.stateNode.containerInfo,Qr=!0;break e;case 4:an=R.stateNode.containerInfo,Qr=!0;break e}R=R.return}if(an===null)throw Error(o(160));aY(k,I,v),an=null,Qr=!1;var $=v.alternate;$!==null&&($.return=null),v.return=null}catch(le){Ot(v,a,le)}}if(a.subtreeFlags&12854)for(a=a.child;a!==null;)lY(a,r),a=a.sibling}function lY(r,a){var s=r.alternate,f=r.flags;switch(r.tag){case 0:case 11:case 14:case 15:if(Xr(a,r),Eo(r),f&4){try{Ed(3,r,r.return),fg(3,r)}catch(Ie){Ot(r,r.return,Ie)}try{Ed(5,r,r.return)}catch(Ie){Ot(r,r.return,Ie)}}break;case 1:Xr(a,r),Eo(r),f&512&&s!==null&&Qs(s,s.return);break;case 5:if(Xr(a,r),Eo(r),f&512&&s!==null&&Qs(s,s.return),r.flags&32){var v=r.stateNode;try{$c(v,"")}catch(Ie){Ot(r,r.return,Ie)}}if(f&4&&(v=r.stateNode,v!=null)){var k=r.memoizedProps,I=s!==null?s.memoizedProps:k,R=r.type,$=r.updateQueue;if(r.updateQueue=null,$!==null)try{R==="input"&&k.type==="radio"&&k.name!=null&&Ue(v,k),zk(R,I);var le=zk(R,k);for(I=0;I<$.length;I+=2){var he=$[I],me=$[I+1];he==="style"?L$(v,me):he==="dangerouslySetInnerHTML"?R$(v,me):he==="children"?$c(v,me):z(v,he,me,le)}switch(R){case"input":Ge(v,k);break;case"textarea":Ve(v,k);break;case"select":var pe=v._wrapperState.wasMultiple;v._wrapperState.wasMultiple=!!k.multiple;var xe=k.value;xe!=null?Fn(v,!!k.multiple,xe,!1):pe!==!!k.multiple&&(k.defaultValue!=null?Fn(v,!!k.multiple,k.defaultValue,!0):Fn(v,!!k.multiple,k.multiple?[]:"",!1))}v[pd]=k}catch(Ie){Ot(r,r.return,Ie)}}break;case 6:if(Xr(a,r),Eo(r),f&4){if(r.stateNode===null)throw Error(o(162));v=r.stateNode,k=r.memoizedProps;try{v.nodeValue=k}catch(Ie){Ot(r,r.return,Ie)}}break;case 3:if(Xr(a,r),Eo(r),f&4&&s!==null&&s.memoizedState.isDehydrated)try{nd(a.containerInfo)}catch(Ie){Ot(r,r.return,Ie)}break;case 4:Xr(a,r),Eo(r);break;case 13:Xr(a,r),Eo(r),v=r.child,v.flags&8192&&(k=v.memoizedState!==null,v.stateNode.isHidden=k,!k||v.alternate!==null&&v.alternate.memoizedState!==null||(oS=At())),f&4&&iY(r);break;case 22:if(he=s!==null&&s.memoizedState!==null,r.mode&1?(kn=(le=kn)||he,Xr(a,r),kn=le):Xr(a,r),Eo(r),f&8192){if(le=r.memoizedState!==null,(r.stateNode.isHidden=le)&&!he&&r.mode&1)for(Se=r,he=r.child;he!==null;){for(me=Se=he;Se!==null;){switch(pe=Se,xe=pe.child,pe.tag){case 0:case 11:case 14:case 15:Ed(4,pe,pe.return);break;case 1:Qs(pe,pe.return);var Ee=pe.stateNode;if(typeof Ee.componentWillUnmount=="function"){f=pe,s=pe.return;try{a=f,Ee.props=a.memoizedProps,Ee.state=a.memoizedState,Ee.componentWillUnmount()}catch(Ie){Ot(f,s,Ie)}}break;case 5:Qs(pe,pe.return);break;case 22:if(pe.memoizedState!==null){cY(me);continue}}xe!==null?(xe.return=pe,Se=xe):cY(me)}he=he.sibling}e:for(he=null,me=r;;){if(me.tag===5){if(he===null){he=me;try{v=me.stateNode,le?(k=v.style,typeof k.setProperty=="function"?k.setProperty("display","none","important"):k.display="none"):(R=me.stateNode,$=me.memoizedProps.style,I=$!=null&&$.hasOwnProperty("display")?$.display:null,R.style.display=F$("display",I))}catch(Ie){Ot(r,r.return,Ie)}}}else if(me.tag===6){if(he===null)try{me.stateNode.nodeValue=le?"":me.memoizedProps}catch(Ie){Ot(r,r.return,Ie)}}else if((me.tag!==22&&me.tag!==23||me.memoizedState===null||me===r)&&me.child!==null){me.child.return=me,me=me.child;continue}if(me===r)break e;for(;me.sibling===null;){if(me.return===null||me.return===r)break e;he===me&&(he=null),me=me.return}he===me&&(he=null),me.sibling.return=me.return,me=me.sibling}}break;case 19:Xr(a,r),Eo(r),f&4&&iY(r);break;case 21:break;default:Xr(a,r),Eo(r)}}function Eo(r){var a=r.flags;if(a&2){try{e:{for(var s=r.return;s!==null;){if(rY(s)){var f=s;break e}s=s.return}throw Error(o(160))}switch(f.tag){case 5:var v=f.stateNode;f.flags&32&&($c(v,""),f.flags&=-33);var k=oY(r);tS(r,k,v);break;case 3:case 4:var I=f.stateNode.containerInfo,R=oY(r);eS(r,R,I);break;default:throw Error(o(161))}}catch($){Ot(r,r.return,$)}r.flags&=-3}a&4096&&(r.flags&=-4097)}function Kde(r,a,s){Se=r,sY(r)}function sY(r,a,s){for(var f=(r.mode&1)!==0;Se!==null;){var v=Se,k=v.child;if(v.tag===22&&f){var I=v.memoizedState!==null||dg;if(!I){var R=v.alternate,$=R!==null&&R.memoizedState!==null||kn;R=dg;var le=kn;if(dg=I,(kn=$)&&!le)for(Se=v;Se!==null;)I=Se,$=I.child,I.tag===22&&I.memoizedState!==null?dY(v):$!==null?($.return=I,Se=$):dY(v);for(;k!==null;)Se=k,sY(k),k=k.sibling;Se=v,dg=R,kn=le}uY(r)}else v.subtreeFlags&8772&&k!==null?(k.return=v,Se=k):uY(r)}}function uY(r){for(;Se!==null;){var a=Se;if(a.flags&8772){var s=a.alternate;try{if(a.flags&8772)switch(a.tag){case 0:case 11:case 15:kn||fg(5,a);break;case 1:var f=a.stateNode;if(a.flags&4&&!kn)if(s===null)f.componentDidMount();else{var v=a.elementType===a.type?s.memoizedProps:Yr(a.type,s.memoizedProps);f.componentDidUpdate(v,s.memoizedState,f.__reactInternalSnapshotBeforeUpdate)}var k=a.updateQueue;k!==null&&aG(a,k,f);break;case 3:var I=a.updateQueue;if(I!==null){if(s=null,a.child!==null)switch(a.child.tag){case 5:s=a.child.stateNode;break;case 1:s=a.child.stateNode}aG(a,I,s)}break;case 5:var R=a.stateNode;if(s===null&&a.flags&4){s=R;var $=a.memoizedProps;switch(a.type){case"button":case"input":case"select":case"textarea":$.autoFocus&&s.focus();break;case"img":$.src&&(s.src=$.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(a.memoizedState===null){var le=a.alternate;if(le!==null){var he=le.memoizedState;if(he!==null){var me=he.dehydrated;me!==null&&nd(me)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(o(163))}kn||a.flags&512&&Zw(a)}catch(pe){Ot(a,a.return,pe)}}if(a===r){Se=null;break}if(s=a.sibling,s!==null){s.return=a.return,Se=s;break}Se=a.return}}function cY(r){for(;Se!==null;){var a=Se;if(a===r){Se=null;break}var s=a.sibling;if(s!==null){s.return=a.return,Se=s;break}Se=a.return}}function dY(r){for(;Se!==null;){var a=Se;try{switch(a.tag){case 0:case 11:case 15:var s=a.return;try{fg(4,a)}catch($){Ot(a,s,$)}break;case 1:var f=a.stateNode;if(typeof f.componentDidMount=="function"){var v=a.return;try{f.componentDidMount()}catch($){Ot(a,v,$)}}var k=a.return;try{Zw(a)}catch($){Ot(a,k,$)}break;case 5:var I=a.return;try{Zw(a)}catch($){Ot(a,I,$)}}}catch($){Ot(a,a.return,$)}if(a===r){Se=null;break}var R=a.sibling;if(R!==null){R.return=a.return,Se=R;break}Se=a.return}}var Ude=Math.ceil,pg=B.ReactCurrentDispatcher,nS=B.ReactCurrentOwner,kr=B.ReactCurrentBatchConfig,et=0,Gt=null,Mt=null,ln=0,rr=0,Xs=La(0),Lt=0,Pd=null,tl=0,hg=0,rS=0,Id=null,Kn=null,oS=0,Js=1/0,ta=null,mg=!1,aS=null,$a=null,gg=!1,Wa=null,vg=0,jd=0,iS=null,bg=-1,yg=0;function On(){return et&6?At():bg!==-1?bg:bg=At()}function Ga(r){return r.mode&1?et&2&&ln!==0?ln&-ln:jde.transition!==null?(yg===0&&(yg=tW()),yg):(r=ot,r!==0||(r=window.event,r=r===void 0?16:cW(r.type)),r):1}function Jr(r,a,s,f){if(50<jd)throw jd=0,iS=null,Error(o(185));Xc(r,s,f),(!(et&2)||r!==Gt)&&(r===Gt&&(!(et&2)&&(hg|=s),Lt===4&&Ya(r,ln)),Un(r,f),s===1&&et===0&&!(a.mode&1)&&(Js=At()+500,Wm&&Va()))}function Un(r,a){var s=r.callbackNode;Oce(r,a);var f=Pm(r,r===Gt?ln:0);if(f===0)s!==null&&J$(s),r.callbackNode=null,r.callbackPriority=0;else if(a=f&-f,r.callbackPriority!==a){if(s!=null&&J$(s),a===1)r.tag===0?Ide(pY.bind(null,r)):QW(pY.bind(null,r)),wde(function(){!(et&6)&&Va()}),s=null;else{switch(nW(f)){case 1:s=Vk;break;case 4:s=Z$;break;case 16:s=km;break;case 536870912:s=eW;break;default:s=km}s=kY(s,fY.bind(null,r))}r.callbackPriority=a,r.callbackNode=s}}function fY(r,a){if(bg=-1,yg=0,et&6)throw Error(o(327));var s=r.callbackNode;if(Zs()&&r.callbackNode!==s)return null;var f=Pm(r,r===Gt?ln:0);if(f===0)return null;if(f&30||f&r.expiredLanes||a)a=xg(r,f);else{a=f;var v=et;et|=2;var k=mY();(Gt!==r||ln!==a)&&(ta=null,Js=At()+500,rl(r,a));do try{Wde();break}catch(R){hY(r,R)}while(!0);Pw(),pg.current=k,et=v,Mt!==null?a=0:(Gt=null,ln=0,a=Lt)}if(a!==0){if(a===2&&(v=Kk(r),v!==0&&(f=v,a=lS(r,v))),a===1)throw s=Pd,rl(r,0),Ya(r,f),Un(r,At()),s;if(a===6)Ya(r,f);else{if(v=r.current.alternate,!(f&30)&&!Hde(v)&&(a=xg(r,f),a===2&&(k=Kk(r),k!==0&&(f=k,a=lS(r,k))),a===1))throw s=Pd,rl(r,0),Ya(r,f),Un(r,At()),s;switch(r.finishedWork=v,r.finishedLanes=f,a){case 0:case 1:throw Error(o(345));case 2:ol(r,Kn,ta);break;case 3:if(Ya(r,f),(f&130023424)===f&&(a=oS+500-At(),10<a)){if(Pm(r,0)!==0)break;if(v=r.suspendedLanes,(v&f)!==f){On(),r.pingedLanes|=r.suspendedLanes&v;break}r.timeoutHandle=hw(ol.bind(null,r,Kn,ta),a);break}ol(r,Kn,ta);break;case 4:if(Ya(r,f),(f&4194240)===f)break;for(a=r.eventTimes,v=-1;0<f;){var I=31-$r(f);k=1<<I,I=a[I],I>v&&(v=I),f&=~k}if(f=v,f=At()-f,f=(120>f?120:480>f?480:1080>f?1080:1920>f?1920:3e3>f?3e3:4320>f?4320:1960*Ude(f/1960))-f,10<f){r.timeoutHandle=hw(ol.bind(null,r,Kn,ta),f);break}ol(r,Kn,ta);break;case 5:ol(r,Kn,ta);break;default:throw Error(o(329))}}}return Un(r,At()),r.callbackNode===s?fY.bind(null,r):null}function lS(r,a){var s=Id;return r.current.memoizedState.isDehydrated&&(rl(r,a).flags|=256),r=xg(r,a),r!==2&&(a=Kn,Kn=s,a!==null&&sS(a)),r}function sS(r){Kn===null?Kn=r:Kn.push.apply(Kn,r)}function Hde(r){for(var a=r;;){if(a.flags&16384){var s=a.updateQueue;if(s!==null&&(s=s.stores,s!==null))for(var f=0;f<s.length;f++){var v=s[f],k=v.getSnapshot;v=v.value;try{if(!Wr(k(),v))return!1}catch{return!1}}}if(s=a.child,a.subtreeFlags&16384&&s!==null)s.return=a,a=s;else{if(a===r)break;for(;a.sibling===null;){if(a.return===null||a.return===r)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function Ya(r,a){for(a&=~rS,a&=~hg,r.suspendedLanes|=a,r.pingedLanes&=~a,r=r.expirationTimes;0<a;){var s=31-$r(a),f=1<<s;r[s]=-1,a&=~f}}function pY(r){if(et&6)throw Error(o(327));Zs();var a=Pm(r,0);if(!(a&1))return Un(r,At()),null;var s=xg(r,a);if(r.tag!==0&&s===2){var f=Kk(r);f!==0&&(a=f,s=lS(r,f))}if(s===1)throw s=Pd,rl(r,0),Ya(r,a),Un(r,At()),s;if(s===6)throw Error(o(345));return r.finishedWork=r.current.alternate,r.finishedLanes=a,ol(r,Kn,ta),Un(r,At()),null}function uS(r,a){var s=et;et|=1;try{return r(a)}finally{et=s,et===0&&(Js=At()+500,Wm&&Va())}}function nl(r){Wa!==null&&Wa.tag===0&&!(et&6)&&Zs();var a=et;et|=1;var s=kr.transition,f=ot;try{if(kr.transition=null,ot=1,r)return r()}finally{ot=f,kr.transition=s,et=a,!(et&6)&&Va()}}function cS(){rr=Xs.current,bt(Xs)}function rl(r,a){r.finishedWork=null,r.finishedLanes=0;var s=r.timeoutHandle;if(s!==-1&&(r.timeoutHandle=-1,kde(s)),Mt!==null)for(s=Mt.return;s!==null;){var f=s;switch(xw(f),f.tag){case 1:f=f.type.childContextTypes,f!=null&&Hm();break;case 3:Gs(),bt(Ln),bt(bn),zw();break;case 5:Aw(f);break;case 4:Gs();break;case 13:bt(Pt);break;case 19:bt(Pt);break;case 10:Iw(f.type._context);break;case 22:case 23:cS()}s=s.return}if(Gt=r,Mt=r=Qa(r.current,null),ln=rr=a,Lt=0,Pd=null,rS=hg=tl=0,Kn=Id=null,Ji!==null){for(a=0;a<Ji.length;a++)if(s=Ji[a],f=s.interleaved,f!==null){s.interleaved=null;var v=f.next,k=s.pending;if(k!==null){var I=k.next;k.next=v,f.next=I}s.pending=f}Ji=null}return r}function hY(r,a){do{var s=Mt;try{if(Pw(),og.current=sg,ag){for(var f=It.memoizedState;f!==null;){var v=f.queue;v!==null&&(v.pending=null),f=f.next}ag=!1}if(el=0,Wt=Ft=It=null,yd=!1,xd=0,nS.current=null,s===null||s.return===null){Lt=1,Pd=a,Mt=null;break}e:{var k=r,I=s.return,R=s,$=a;if(a=ln,R.flags|=32768,$!==null&&typeof $=="object"&&typeof $.then=="function"){var le=$,he=R,me=he.tag;if(!(he.mode&1)&&(me===0||me===11||me===15)){var pe=he.alternate;pe?(he.updateQueue=pe.updateQueue,he.memoizedState=pe.memoizedState,he.lanes=pe.lanes):(he.updateQueue=null,he.memoizedState=null)}var xe=RG(I);if(xe!==null){xe.flags&=-257,FG(xe,I,R,k,a),xe.mode&1&&MG(k,le,a),a=xe,$=le;var Ee=a.updateQueue;if(Ee===null){var Ie=new Set;Ie.add($),a.updateQueue=Ie}else Ee.add($);break e}else{if(!(a&1)){MG(k,le,a),dS();break e}$=Error(o(426))}}else if(kt&&R.mode&1){var Bt=RG(I);if(Bt!==null){!(Bt.flags&65536)&&(Bt.flags|=256),FG(Bt,I,R,k,a),Sw(Ys($,R));break e}}k=$=Ys($,R),Lt!==4&&(Lt=2),Id===null?Id=[k]:Id.push(k),k=I;do{switch(k.tag){case 3:k.flags|=65536,a&=-a,k.lanes|=a;var te=zG(k,$,a);oG(k,te);break e;case 1:R=$;var Q=k.type,ae=k.stateNode;if(!(k.flags&128)&&(typeof Q.getDerivedStateFromError=="function"||ae!==null&&typeof ae.componentDidCatch=="function"&&($a===null||!$a.has(ae)))){k.flags|=65536,a&=-a,k.lanes|=a;var be=qG(k,R,a);oG(k,be);break e}}k=k.return}while(k!==null)}vY(s)}catch(Oe){a=Oe,Mt===s&&s!==null&&(Mt=s=s.return);continue}break}while(!0)}function mY(){var r=pg.current;return pg.current=sg,r===null?sg:r}function dS(){(Lt===0||Lt===3||Lt===2)&&(Lt=4),Gt===null||!(tl&268435455)&&!(hg&268435455)||Ya(Gt,ln)}function xg(r,a){var s=et;et|=2;var f=mY();(Gt!==r||ln!==a)&&(ta=null,rl(r,a));do try{$de();break}catch(v){hY(r,v)}while(!0);if(Pw(),et=s,pg.current=f,Mt!==null)throw Error(o(261));return Gt=null,ln=0,Lt}function $de(){for(;Mt!==null;)gY(Mt)}function Wde(){for(;Mt!==null&&!xce();)gY(Mt)}function gY(r){var a=xY(r.alternate,r,rr);r.memoizedProps=r.pendingProps,a===null?vY(r):Mt=a,nS.current=null}function vY(r){var a=r;do{var s=a.alternate;if(r=a.return,a.flags&32768){if(s=Lde(s,a),s!==null){s.flags&=32767,Mt=s;return}if(r!==null)r.flags|=32768,r.subtreeFlags=0,r.deletions=null;else{Lt=6,Mt=null;return}}else if(s=Fde(s,a,rr),s!==null){Mt=s;return}if(a=a.sibling,a!==null){Mt=a;return}Mt=a=r}while(a!==null);Lt===0&&(Lt=5)}function ol(r,a,s){var f=ot,v=kr.transition;try{kr.transition=null,ot=1,Gde(r,a,s,f)}finally{kr.transition=v,ot=f}return null}function Gde(r,a,s,f){do Zs();while(Wa!==null);if(et&6)throw Error(o(327));s=r.finishedWork;var v=r.finishedLanes;if(s===null)return null;if(r.finishedWork=null,r.finishedLanes=0,s===r.current)throw Error(o(177));r.callbackNode=null,r.callbackPriority=0;var k=s.lanes|s.childLanes;if(_ce(r,k),r===Gt&&(Mt=Gt=null,ln=0),!(s.subtreeFlags&2064)&&!(s.flags&2064)||gg||(gg=!0,kY(km,function(){return Zs(),null})),k=(s.flags&15990)!==0,s.subtreeFlags&15990||k){k=kr.transition,kr.transition=null;var I=ot;ot=1;var R=et;et|=4,nS.current=null,Vde(r,s),lY(s,r),gde(fw),Cm=!!dw,fw=dw=null,r.current=s,Kde(s),kce(),et=R,ot=I,kr.transition=k}else r.current=s;if(gg&&(gg=!1,Wa=r,vg=v),k=r.pendingLanes,k===0&&($a=null),Ece(s.stateNode),Un(r,At()),a!==null)for(f=r.onRecoverableError,s=0;s<a.length;s++)v=a[s],f(v.value,{componentStack:v.stack,digest:v.digest});if(mg)throw mg=!1,r=aS,aS=null,r;return vg&1&&r.tag!==0&&Zs(),k=r.pendingLanes,k&1?r===iS?jd++:(jd=0,iS=r):jd=0,Va(),null}function Zs(){if(Wa!==null){var r=nW(vg),a=kr.transition,s=ot;try{if(kr.transition=null,ot=16>r?16:r,Wa===null)var f=!1;else{if(r=Wa,Wa=null,vg=0,et&6)throw Error(o(331));var v=et;for(et|=4,Se=r.current;Se!==null;){var k=Se,I=k.child;if(Se.flags&16){var R=k.deletions;if(R!==null){for(var $=0;$<R.length;$++){var le=R[$];for(Se=le;Se!==null;){var he=Se;switch(he.tag){case 0:case 11:case 15:Ed(8,he,k)}var me=he.child;if(me!==null)me.return=he,Se=me;else for(;Se!==null;){he=Se;var pe=he.sibling,xe=he.return;if(nY(he),he===le){Se=null;break}if(pe!==null){pe.return=xe,Se=pe;break}Se=xe}}}var Ee=k.alternate;if(Ee!==null){var Ie=Ee.child;if(Ie!==null){Ee.child=null;do{var Bt=Ie.sibling;Ie.sibling=null,Ie=Bt}while(Ie!==null)}}Se=k}}if(k.subtreeFlags&2064&&I!==null)I.return=k,Se=I;else e:for(;Se!==null;){if(k=Se,k.flags&2048)switch(k.tag){case 0:case 11:case 15:Ed(9,k,k.return)}var te=k.sibling;if(te!==null){te.return=k.return,Se=te;break e}Se=k.return}}var Q=r.current;for(Se=Q;Se!==null;){I=Se;var ae=I.child;if(I.subtreeFlags&2064&&ae!==null)ae.return=I,Se=ae;else e:for(I=Q;Se!==null;){if(R=Se,R.flags&2048)try{switch(R.tag){case 0:case 11:case 15:fg(9,R)}}catch(Oe){Ot(R,R.return,Oe)}if(R===I){Se=null;break e}var be=R.sibling;if(be!==null){be.return=R.return,Se=be;break e}Se=R.return}}if(et=v,Va(),xo&&typeof xo.onPostCommitFiberRoot=="function")try{xo.onPostCommitFiberRoot(wm,r)}catch{}f=!0}return f}finally{ot=s,kr.transition=a}}return!1}function bY(r,a,s){a=Ys(s,a),a=zG(r,a,1),r=Ua(r,a,1),a=On(),r!==null&&(Xc(r,1,a),Un(r,a))}function Ot(r,a,s){if(r.tag===3)bY(r,r,s);else for(;a!==null;){if(a.tag===3){bY(a,r,s);break}else if(a.tag===1){var f=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof f.componentDidCatch=="function"&&($a===null||!$a.has(f))){r=Ys(s,r),r=qG(a,r,1),a=Ua(a,r,1),r=On(),a!==null&&(Xc(a,1,r),Un(a,r));break}}a=a.return}}function Yde(r,a,s){var f=r.pingCache;f!==null&&f.delete(a),a=On(),r.pingedLanes|=r.suspendedLanes&s,Gt===r&&(ln&s)===s&&(Lt===4||Lt===3&&(ln&130023424)===ln&&500>At()-oS?rl(r,0):rS|=s),Un(r,a)}function yY(r,a){a===0&&(r.mode&1?(a=Em,Em<<=1,!(Em&130023424)&&(Em=4194304)):a=1);var s=On();r=Jo(r,a),r!==null&&(Xc(r,a,s),Un(r,s))}function Qde(r){var a=r.memoizedState,s=0;a!==null&&(s=a.retryLane),yY(r,s)}function Xde(r,a){var s=0;switch(r.tag){case 13:var f=r.stateNode,v=r.memoizedState;v!==null&&(s=v.retryLane);break;case 19:f=r.stateNode;break;default:throw Error(o(314))}f!==null&&f.delete(a),yY(r,s)}var xY;xY=function(r,a,s){if(r!==null)if(r.memoizedProps!==a.pendingProps||Ln.current)Vn=!0;else{if(!(r.lanes&s)&&!(a.flags&128))return Vn=!1,Rde(r,a,s);Vn=!!(r.flags&131072)}else Vn=!1,kt&&a.flags&1048576&&XW(a,Ym,a.index);switch(a.lanes=0,a.tag){case 2:var f=a.type;cg(r,a),r=a.pendingProps;var v=Ns(a,bn.current);$s(a,s),v=Rw(null,a,f,r,v,s);var k=Fw();return a.flags|=1,typeof v=="object"&&v!==null&&typeof v.render=="function"&&v.$$typeof===void 0?(a.tag=1,a.memoizedState=null,a.updateQueue=null,Nn(f)?(k=!0,$m(a)):k=!1,a.memoizedState=v.state!==null&&v.state!==void 0?v.state:null,Ow(a),v.updater=tg,a.stateNode=v,v._reactInternals=a,Dw(a,f,r,s),a=Ww(null,a,f,!0,k,s)):(a.tag=0,kt&&k&&yw(a),Cn(null,a,v,s),a=a.child),a;case 16:f=a.elementType;e:{switch(cg(r,a),r=a.pendingProps,v=f._init,f=v(f._payload),a.type=f,v=a.tag=Zde(f),r=Yr(f,r),v){case 0:a=$w(null,a,f,r,s);break e;case 1:a=HG(null,a,f,r,s);break e;case 11:a=LG(null,a,f,r,s);break e;case 14:a=NG(null,a,f,Yr(f.type,r),s);break e}throw Error(o(306,f,""))}return a;case 0:return f=a.type,v=a.pendingProps,v=a.elementType===f?v:Yr(f,v),$w(r,a,f,v,s);case 1:return f=a.type,v=a.pendingProps,v=a.elementType===f?v:Yr(f,v),HG(r,a,f,v,s);case 3:e:{if($G(a),r===null)throw Error(o(387));f=a.pendingProps,k=a.memoizedState,v=k.element,rG(r,a),eg(a,f,null,s);var I=a.memoizedState;if(f=I.element,k.isDehydrated)if(k={element:f,isDehydrated:!1,cache:I.cache,pendingSuspenseBoundaries:I.pendingSuspenseBoundaries,transitions:I.transitions},a.updateQueue.baseState=k,a.memoizedState=k,a.flags&256){v=Ys(Error(o(423)),a),a=WG(r,a,f,s,v);break e}else if(f!==v){v=Ys(Error(o(424)),a),a=WG(r,a,f,s,v);break e}else for(nr=Fa(a.stateNode.containerInfo.firstChild),tr=a,kt=!0,Gr=null,s=fG(a,null,f,s),a.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(Us(),f===v){a=ea(r,a,s);break e}Cn(r,a,f,s)}a=a.child}return a;case 5:return pG(a),r===null&&ww(a),f=a.type,v=a.pendingProps,k=r!==null?r.memoizedProps:null,I=v.children,pw(f,v)?I=null:k!==null&&pw(f,k)&&(a.flags|=32),UG(r,a),Cn(r,a,I,s),a.child;case 6:return r===null&&ww(a),null;case 13:return GG(r,a,s);case 4:return Tw(a,a.stateNode.containerInfo),f=a.pendingProps,r===null?a.child=Ws(a,null,f,s):Cn(r,a,f,s),a.child;case 11:return f=a.type,v=a.pendingProps,v=a.elementType===f?v:Yr(f,v),LG(r,a,f,v,s);case 7:return Cn(r,a,a.pendingProps,s),a.child;case 8:return Cn(r,a,a.pendingProps.children,s),a.child;case 12:return Cn(r,a,a.pendingProps.children,s),a.child;case 10:e:{if(f=a.type._context,v=a.pendingProps,k=a.memoizedProps,I=v.value,ft(Xm,f._currentValue),f._currentValue=I,k!==null)if(Wr(k.value,I)){if(k.children===v.children&&!Ln.current){a=ea(r,a,s);break e}}else for(k=a.child,k!==null&&(k.return=a);k!==null;){var R=k.dependencies;if(R!==null){I=k.child;for(var $=R.firstContext;$!==null;){if($.context===f){if(k.tag===1){$=Zo(-1,s&-s),$.tag=2;var le=k.updateQueue;if(le!==null){le=le.shared;var he=le.pending;he===null?$.next=$:($.next=he.next,he.next=$),le.pending=$}}k.lanes|=s,$=k.alternate,$!==null&&($.lanes|=s),jw(k.return,s,a),R.lanes|=s;break}$=$.next}}else if(k.tag===10)I=k.type===a.type?null:k.child;else if(k.tag===18){if(I=k.return,I===null)throw Error(o(341));I.lanes|=s,R=I.alternate,R!==null&&(R.lanes|=s),jw(I,s,a),I=k.sibling}else I=k.child;if(I!==null)I.return=k;else for(I=k;I!==null;){if(I===a){I=null;break}if(k=I.sibling,k!==null){k.return=I.return,I=k;break}I=I.return}k=I}Cn(r,a,v.children,s),a=a.child}return a;case 9:return v=a.type,f=a.pendingProps.children,$s(a,s),v=yr(v),f=f(v),a.flags|=1,Cn(r,a,f,s),a.child;case 14:return f=a.type,v=Yr(f,a.pendingProps),v=Yr(f.type,v),NG(r,a,f,v,s);case 15:return VG(r,a,a.type,a.pendingProps,s);case 17:return f=a.type,v=a.pendingProps,v=a.elementType===f?v:Yr(f,v),cg(r,a),a.tag=1,Nn(f)?(r=!0,$m(a)):r=!1,$s(a,s),sG(a,f,v),Dw(a,f,v,s),Ww(null,a,f,!0,r,s);case 19:return QG(r,a,s);case 22:return KG(r,a,s)}throw Error(o(156,a.tag))};function kY(r,a){return X$(r,a)}function Jde(r,a,s,f){this.tag=r,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=f,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function wr(r,a,s,f){return new Jde(r,a,s,f)}function fS(r){return r=r.prototype,!(!r||!r.isReactComponent)}function Zde(r){if(typeof r=="function")return fS(r)?1:0;if(r!=null){if(r=r.$$typeof,r===se)return 11;if(r===J)return 14}return 2}function Qa(r,a){var s=r.alternate;return s===null?(s=wr(r.tag,a,r.key,r.mode),s.elementType=r.elementType,s.type=r.type,s.stateNode=r.stateNode,s.alternate=r,r.alternate=s):(s.pendingProps=a,s.type=r.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=r.flags&14680064,s.childLanes=r.childLanes,s.lanes=r.lanes,s.child=r.child,s.memoizedProps=r.memoizedProps,s.memoizedState=r.memoizedState,s.updateQueue=r.updateQueue,a=r.dependencies,s.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},s.sibling=r.sibling,s.index=r.index,s.ref=r.ref,s}function kg(r,a,s,f,v,k){var I=2;if(f=r,typeof r=="function")fS(r)&&(I=1);else if(typeof r=="string")I=5;else e:switch(r){case M:return al(s.children,v,k,a);case _:I=8,v|=8;break;case L:return r=wr(12,s,a,v|2),r.elementType=L,r.lanes=k,r;case K:return r=wr(13,s,a,v),r.elementType=K,r.lanes=k,r;case ce:return r=wr(19,s,a,v),r.elementType=ce,r.lanes=k,r;case A:return wg(s,v,k,a);default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case U:I=10;break e;case N:I=9;break e;case se:I=11;break e;case J:I=14;break e;case W:I=16,f=null;break e}throw Error(o(130,r==null?r:typeof r,""))}return a=wr(I,s,a,v),a.elementType=r,a.type=f,a.lanes=k,a}function al(r,a,s,f){return r=wr(7,r,f,a),r.lanes=s,r}function wg(r,a,s,f){return r=wr(22,r,f,a),r.elementType=A,r.lanes=s,r.stateNode={isHidden:!1},r}function pS(r,a,s){return r=wr(6,r,null,a),r.lanes=s,r}function hS(r,a,s){return a=wr(4,r.children!==null?r.children:[],r.key,a),a.lanes=s,a.stateNode={containerInfo:r.containerInfo,pendingChildren:null,implementation:r.implementation},a}function efe(r,a,s,f,v){this.tag=a,this.containerInfo=r,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Uk(0),this.expirationTimes=Uk(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uk(0),this.identifierPrefix=f,this.onRecoverableError=v,this.mutableSourceEagerHydrationData=null}function mS(r,a,s,f,v,k,I,R,$){return r=new efe(r,a,s,R,$),a===1?(a=1,k===!0&&(a|=8)):a=0,k=wr(3,null,null,a),r.current=k,k.stateNode=r,k.memoizedState={element:f,isDehydrated:s,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ow(k),r}function tfe(r,a,s){var f=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:X,key:f==null?null:""+f,children:r,containerInfo:a,implementation:s}}function wY(r){if(!r)return Na;r=r._reactInternals;e:{if(Wi(r)!==r||r.tag!==1)throw Error(o(170));var a=r;do{switch(a.tag){case 3:a=a.stateNode.context;break e;case 1:if(Nn(a.type)){a=a.stateNode.__reactInternalMemoizedMergedChildContext;break e}}a=a.return}while(a!==null);throw Error(o(171))}if(r.tag===1){var s=r.type;if(Nn(s))return GW(r,s,a)}return a}function SY(r,a,s,f,v,k,I,R,$){return r=mS(s,f,!0,r,v,k,I,R,$),r.context=wY(null),s=r.current,f=On(),v=Ga(s),k=Zo(f,v),k.callback=a??null,Ua(s,k,v),r.current.lanes=v,Xc(r,v,f),Un(r,f),r}function Sg(r,a,s,f){var v=a.current,k=On(),I=Ga(v);return s=wY(s),a.context===null?a.context=s:a.pendingContext=s,a=Zo(k,I),a.payload={element:r},f=f===void 0?null:f,f!==null&&(a.callback=f),r=Ua(v,a,I),r!==null&&(Jr(r,v,I,k),Zm(r,v,I)),I}function Eg(r){if(r=r.current,!r.child)return null;switch(r.child.tag){case 5:return r.child.stateNode;default:return r.child.stateNode}}function EY(r,a){if(r=r.memoizedState,r!==null&&r.dehydrated!==null){var s=r.retryLane;r.retryLane=s!==0&&s<a?s:a}}function gS(r,a){EY(r,a),(r=r.alternate)&&EY(r,a)}function nfe(){return null}var PY=typeof reportError=="function"?reportError:function(r){console.error(r)};function vS(r){this._internalRoot=r}Pg.prototype.render=vS.prototype.render=function(r){var a=this._internalRoot;if(a===null)throw Error(o(409));Sg(r,a,null,null)},Pg.prototype.unmount=vS.prototype.unmount=function(){var r=this._internalRoot;if(r!==null){this._internalRoot=null;var a=r.containerInfo;nl(function(){Sg(null,r,null,null)}),a[Go]=null}};function Pg(r){this._internalRoot=r}Pg.prototype.unstable_scheduleHydration=function(r){if(r){var a=aW();r={blockedOn:null,target:r,priority:a};for(var s=0;s<qa.length&&a!==0&&a<qa[s].priority;s++);qa.splice(s,0,r),s===0&&sW(r)}};function bS(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11)}function Ig(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11&&(r.nodeType!==8||r.nodeValue!==" react-mount-point-unstable "))}function IY(){}function rfe(r,a,s,f,v){if(v){if(typeof f=="function"){var k=f;f=function(){var le=Eg(I);k.call(le)}}var I=SY(a,f,r,0,null,!1,!1,"",IY);return r._reactRootContainer=I,r[Go]=I.current,dd(r.nodeType===8?r.parentNode:r),nl(),I}for(;v=r.lastChild;)r.removeChild(v);if(typeof f=="function"){var R=f;f=function(){var le=Eg($);R.call(le)}}var $=mS(r,0,!1,null,null,!1,!1,"",IY);return r._reactRootContainer=$,r[Go]=$.current,dd(r.nodeType===8?r.parentNode:r),nl(function(){Sg(a,$,s,f)}),$}function jg(r,a,s,f,v){var k=s._reactRootContainer;if(k){var I=k;if(typeof v=="function"){var R=v;v=function(){var $=Eg(I);R.call($)}}Sg(a,I,r,v)}else I=rfe(s,a,r,v,f);return Eg(I)}rW=function(r){switch(r.tag){case 3:var a=r.stateNode;if(a.current.memoizedState.isDehydrated){var s=Qc(a.pendingLanes);s!==0&&(Hk(a,s|1),Un(a,At()),!(et&6)&&(Js=At()+500,Va()))}break;case 13:nl(function(){var f=Jo(r,1);if(f!==null){var v=On();Jr(f,r,1,v)}}),gS(r,1)}},$k=function(r){if(r.tag===13){var a=Jo(r,134217728);if(a!==null){var s=On();Jr(a,r,134217728,s)}gS(r,134217728)}},oW=function(r){if(r.tag===13){var a=Ga(r),s=Jo(r,a);if(s!==null){var f=On();Jr(s,r,a,f)}gS(r,a)}},aW=function(){return ot},iW=function(r,a){var s=ot;try{return ot=r,a()}finally{ot=s}},Rk=function(r,a,s){switch(a){case"input":if(Ge(r,s),a=s.name,s.type==="radio"&&a!=null){for(s=r;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll("input[name="+JSON.stringify(""+a)+'][type="radio"]'),a=0;a<s.length;a++){var f=s[a];if(f!==r&&f.form===r.form){var v=Um(f);if(!v)throw Error(o(90));He(f),Ge(f,v)}}}break;case"textarea":Ve(r,s);break;case"select":a=s.value,a!=null&&Fn(r,!!s.multiple,a,!1)}},U$=uS,H$=nl;var ofe={usingClientEntryPoint:!1,Events:[hd,Fs,Um,V$,K$,uS]},Cd={findFiberByHostInstance:Gi,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},afe={bundleType:Cd.bundleType,version:Cd.version,rendererPackageName:Cd.rendererPackageName,rendererConfig:Cd.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:B.ReactCurrentDispatcher,findHostInstanceByFiber:function(r){return r=Y$(r),r===null?null:r.stateNode},findFiberByHostInstance:Cd.findFiberByHostInstance||nfe,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Od=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Od.isDisabled&&Od.supportsFiber))try{wm=Od.inject(afe),xo=Od}catch{}var Od;e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ofe,e.createPortal=function(r,a){var s=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bS(a))throw Error(o(200));return tfe(r,a,null,s)},e.createRoot=function(r,a){if(!bS(r))throw Error(o(299));var s=!1,f="",v=PY;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(f=a.identifierPrefix),a.onRecoverableError!==void 0&&(v=a.onRecoverableError)),a=mS(r,1,!1,null,null,s,!1,f,v),r[Go]=a.current,dd(r.nodeType===8?r.parentNode:r),new vS(a)},e.findDOMNode=function(r){if(r==null)return null;if(r.nodeType===1)return r;var a=r._reactInternals;if(a===void 0)throw typeof r.render=="function"?Error(o(188)):(r=Object.keys(r).join(","),Error(o(268,r)));return r=Y$(a),r=r===null?null:r.stateNode,r},e.flushSync=function(r){return nl(r)},e.hydrate=function(r,a,s){if(!Ig(a))throw Error(o(200));return jg(null,r,a,!0,s)},e.hydrateRoot=function(r,a,s){if(!bS(r))throw Error(o(405));var f=s!=null&&s.hydratedSources||null,v=!1,k="",I=PY;if(s!=null&&(s.unstable_strictMode===!0&&(v=!0),s.identifierPrefix!==void 0&&(k=s.identifierPrefix),s.onRecoverableError!==void 0&&(I=s.onRecoverableError)),a=SY(a,null,r,1,s??null,v,!1,k,I),r[Go]=a.current,dd(r),f)for(r=0;r<f.length;r++)s=f[r],v=s._getVersion,v=v(s._source),a.mutableSourceEagerHydrationData==null?a.mutableSourceEagerHydrationData=[s,v]:a.mutableSourceEagerHydrationData.push(s,v);return new Pg(a)},e.render=function(r,a,s){if(!Ig(a))throw Error(o(200));return jg(null,r,a,!1,s)},e.unmountComponentAtNode=function(r){if(!Ig(r))throw Error(o(40));return r._reactRootContainer?(nl(function(){jg(null,null,r,!1,function(){r._reactRootContainer=null,r[Go]=null})}),!0):!1},e.unstable_batchedUpdates=uS,e.unstable_renderSubtreeIntoContainer=function(r,a,s,f){if(!Ig(s))throw Error(o(200));if(r==null||r._reactInternals===void 0)throw Error(o(38));return jg(r,a,s,!1,f)},e.version="18.2.0-next-9e3b772b8-20220608"}),Io=Te((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(o){console.error(o)}}n(),t.exports=rte()});function ote(e){let[,t]=(0,ca.useState)(0);return(0,ca.useCallback)(()=>{t(n=>n+1)},[])}function Ne(e,t,n){let o=(0,ca.useCallback)(e,t),i=(0,ca.useRef)(null);i.current?i.current.set(o):i.current=new vf.Atom(o);let l=(0,ca.useRef)(null);return l.current||(l.current=(0,vf.prism)(()=>i.current.prism.getValue()())),_5(l.current,n)}function ate(){bf||(bf=!0,(0,D5.default)(()=>{(0,T5.unstable_batchedUpdates)(function(){for(var e,t;Sr.length>0;){let n=Sr.shift();Pl.delete(n);let o;ai&&((e=n.debug)==null||e.history.push("queue reached"));try{o=n.der.getValue()}catch(i){ai&&((t=n.debug)==null||t.history.push("queue: der.getValue() errored")),console.error("A `der.getValue()` in `usePrismInstance(der)` threw an error. This may be a zombie child issue, so we're gonna try to get its value again in a normal react render phase.If you see the same error again, then you either have an error in your prism code, or the deps array in `usePrism(fn, deps)` is missing a dependency and causing the prism to read stale values."),console.error(i),n.runUpdate();continue}o!==n.lastValue&&(n.lastValue=o,n.runUpdate())}bf=!1},1)}))}function _5(e,t){var n;let o=ote(),i=(0,ca.useRef)(void 0);i.current||(hv++,i.current={order:hv,runUpdate:()=>{i.current.unmounted||o()},der:e,lastValue:void 0,unmounted:!1,queueUpdate:()=>{var u;ai&&((u=i.current.debug)==null||u.history.push("queueUpdate()")),A5(i.current)},untap:e.onStale(()=>{ai&&i.current.debug.history.push("onStale(cb)"),i.current.queueUpdate()})},ai&&(i.current.debug={label:t,traceOfFirstTimeRender:new Error,history:[]})),(0,ca.useLayoutEffect)(()=>function(){i.current.unmounted=!0,i.current.untap(),mv(i.current)},[]),mv(i.current);let l=i.current.der.getValue();return i.current.lastValue=l,ai&&((n=i.current.debug)==null||n.history.push("rendered")),l}var vf,D5,ca,T5,ai,Me,hv,Sr,Pl,bf,A5,B5,mv,_e=w(()=>{vf=ge.requireDist(),Qt(),D5=V(Zee()),ca=V(H()),T5=V(Io()),ai=!1,Me=(e,t)=>Ne(()=>(0,vf.val)(e),[e],t),hv=0,Sr=[],Pl=new Set,bf=!1,A5=e=>{B5(e),ate()},B5=e=>{if(!Pl.has(e))if(Pl.add(e),Sr.length===0)Sr.push(e);else{let t=uv(Sr,n=>n.order>=e.order);t===-1?Sr.push(e):Sr[t].order>e.order&&Sr.splice(t,0,e)}},mv=e=>{if(!Pl.has(e))return;Pl.delete(e);let t=uv(Sr,n=>n===e);Sr.splice(t,1)}}),ite=Te(e=>{var t=60103,n=60106,o=60107,i=60108,l=60114,u=60109,c=60110,d=60112,p=60113,h=60120,b=60115,g=60116,m=60121,y=60122,x=60117,S=60129,E=60131;typeof Symbol=="function"&&Symbol.for&&(P=Symbol.for,t=P("react.element"),n=P("react.portal"),o=P("react.fragment"),i=P("react.strict_mode"),l=P("react.profiler"),u=P("react.provider"),c=P("react.context"),d=P("react.forward_ref"),p=P("react.suspense"),h=P("react.suspense_list"),b=P("react.memo"),g=P("react.lazy"),m=P("react.block"),y=P("react.server.block"),x=P("react.fundamental"),S=P("react.debug_trace_mode"),E=P("react.legacy_hidden"));var P;function O(K){if(typeof K=="object"&&K!==null){var ce=K.$$typeof;switch(ce){case t:switch(K=K.type,K){case o:case l:case i:case p:case h:return K;default:switch(K=K&&K.$$typeof,K){case c:case d:case g:case b:case u:return K;default:return ce}}case n:return ce}}}var z=u,B=t,D=d,X=o,M=g,_=b,L=n,U=l,N=i,se=p;e.ContextConsumer=c,e.ContextProvider=z,e.Element=B,e.ForwardRef=D,e.Fragment=X,e.Lazy=M,e.Memo=_,e.Portal=L,e.Profiler=U,e.StrictMode=N,e.Suspense=se,e.isAsyncMode=function(){return!1},e.isConcurrentMode=function(){return!1},e.isContextConsumer=function(K){return O(K)===c},e.isContextProvider=function(K){return O(K)===u},e.isElement=function(K){return typeof K=="object"&&K!==null&&K.$$typeof===t},e.isForwardRef=function(K){return O(K)===d},e.isFragment=function(K){return O(K)===o},e.isLazy=function(K){return O(K)===g},e.isMemo=function(K){return O(K)===b},e.isPortal=function(K){return O(K)===n},e.isProfiler=function(K){return O(K)===l},e.isStrictMode=function(K){return O(K)===i},e.isSuspense=function(K){return O(K)===p},e.isValidElementType=function(K){return typeof K=="string"||typeof K=="function"||K===o||K===l||K===S||K===i||K===p||K===h||K===E||typeof K=="object"&&K!==null&&(K.$$typeof===g||K.$$typeof===b||K.$$typeof===u||K.$$typeof===c||K.$$typeof===d||K.$$typeof===x||K.$$typeof===m||K[0]===y)},e.typeOf=O}),lte=Te((e,t)=>{t.exports=ite()}),z5=Te((e,t)=>{t.exports=function(n,o,i,l){var u=i?i.call(l,n,o):void 0;if(u!==void 0)return!!u;if(n===o)return!0;if(typeof n!="object"||!n||typeof o!="object"||!o)return!1;var c=Object.keys(n),d=Object.keys(o);if(c.length!==d.length)return!1;for(var p=Object.prototype.hasOwnProperty.bind(o),h=0;h<c.length;h++){var b=c[h];if(!p(b))return!1;var g=n[b],m=o[b];if(u=i?i.call(l,g,m,b):void 0,u===!1||u===void 0&&g!==m)return!1}return!0}});function ste(e){function t(G,ue,de,re,T){for(var ee=0,oe=0,ve=0,we=0,je,De,He=0,rt=0,Le,gt=Le=je=0,Ue=0,Ge=0,Ht=0,Et=0,mr=de.length,Fn=mr-1,$t,qe="",Ve="",Wo="",Cs="",gr;Ue<mr;){if(De=de.charCodeAt(Ue),Ue===Fn&&oe+we+ve+ee!==0&&(oe!==0&&(De=oe===47?10:47),we=ve=ee=0,mr++,Fn++),oe+we+ve+ee===0){if(Ue===Fn&&(0<Ge&&(qe=qe.replace(g,"")),0<qe.trim().length)){switch(De){case 32:case 9:case 59:case 13:case 10:break;default:qe+=de.charAt(Ue)}De=59}switch(De){case 123:for(qe=qe.trim(),je=qe.charCodeAt(0),Le=1,Et=++Ue;Ue<mr;){switch(De=de.charCodeAt(Ue)){case 123:Le++;break;case 125:Le--;break;case 47:switch(De=de.charCodeAt(Ue+1)){case 42:case 47:e:{for(gt=Ue+1;gt<Fn;++gt)switch(de.charCodeAt(gt)){case 47:if(De===42&&de.charCodeAt(gt-1)===42&&Ue+2!==gt){Ue=gt+1;break e}break;case 10:if(De===47){Ue=gt+1;break e}}Ue=gt}}break;case 91:De++;case 40:De++;case 34:case 39:for(;Ue++<Fn&&de.charCodeAt(Ue)!==De;);}if(Le===0)break;Ue++}switch(Le=de.substring(Et,Ue),je===0&&(je=(qe=qe.replace(b,"").trim()).charCodeAt(0)),je){case 64:switch(0<Ge&&(qe=qe.replace(g,"")),De=qe.charCodeAt(1),De){case 100:case 109:case 115:case 45:Ge=ue;break;default:Ge=J}if(Le=t(ue,Ge,Le,De,T+1),Et=Le.length,0<A&&(Ge=n(J,qe,Ht),gr=c(3,Le,Ge,ue,se,N,Et,De,T,re),qe=Ge.join(""),gr!==void 0&&(Et=(Le=gr.trim()).length)===0&&(De=0,Le="")),0<Et)switch(De){case 115:qe=qe.replace(D,u);case 100:case 109:case 45:Le=qe+"{"+Le+"}";break;case 107:qe=qe.replace(P,"$1 $2"),Le=qe+"{"+Le+"}",Le=ce===1||ce===2&&l("@"+Le,3)?"@-webkit-"+Le+"@"+Le:"@"+Le;break;default:Le=qe+Le,re===112&&(Le=(Ve+=Le,""))}else Le="";break;default:Le=t(ue,n(ue,qe,Ht),Le,re,T+1)}Wo+=Le,Le=Ht=Ge=gt=je=0,qe="",De=de.charCodeAt(++Ue);break;case 125:case 59:if(qe=(0<Ge?qe.replace(g,""):qe).trim(),1<(Et=qe.length))switch(gt===0&&(je=qe.charCodeAt(0),je===45||96<je&&123>je)&&(Et=(qe=qe.replace(" ",":")).length),0<A&&(gr=c(1,qe,ue,G,se,N,Ve.length,re,T,re))!==void 0&&(Et=(qe=gr.trim()).length)===0&&(qe="\0\0"),je=qe.charCodeAt(0),De=qe.charCodeAt(1),je){case 0:break;case 64:if(De===105||De===99){Cs+=qe+de.charAt(Ue);break}default:qe.charCodeAt(Et-1)!==58&&(Ve+=i(qe,je,De,qe.charCodeAt(2)))}Ht=Ge=gt=je=0,qe="",De=de.charCodeAt(++Ue)}}switch(De){case 13:case 10:oe===47?oe=0:1+je===0&&re!==107&&0<qe.length&&(Ge=1,qe+="\0"),0<A*ie&&c(0,qe,ue,G,se,N,Ve.length,re,T,re),N=1,se++;break;case 59:case 125:if(oe+we+ve+ee===0){N++;break}default:switch(N++,$t=de.charAt(Ue),De){case 9:case 32:if(we+ee+oe===0)switch(He){case 44:case 58:case 9:case 32:$t="";break;default:De!==32&&($t=" ")}break;case 0:$t="\\0";break;case 12:$t="\\f";break;case 11:$t="\\v";break;case 38:we+oe+ee===0&&(Ge=Ht=1,$t="\f"+$t);break;case 108:if(we+oe+ee+K===0&&0<gt)switch(Ue-gt){case 2:He===112&&de.charCodeAt(Ue-3)===58&&(K=He);case 8:rt===111&&(K=rt)}break;case 58:we+oe+ee===0&&(gt=Ue);break;case 44:oe+ve+we+ee===0&&(Ge=1,$t+="\r");break;case 34:case 39:oe===0&&(we=we===De?0:we===0?De:we);break;case 91:we+oe+ve===0&&ee++;break;case 93:we+oe+ve===0&&ee--;break;case 41:we+oe+ee===0&&ve--;break;case 40:if(we+oe+ee===0){if(je===0)switch(2*He+3*rt){case 533:break;default:je=1}ve++}break;case 64:oe+ve+we+ee+gt+Le===0&&(Le=1);break;case 42:case 47:if(!(0<we+ee+ve))switch(oe){case 0:switch(2*De+3*de.charCodeAt(Ue+1)){case 235:oe=47;break;case 220:Et=Ue,oe=42}break;case 42:De===47&&He===42&&Et+2!==Ue&&(de.charCodeAt(Et+2)===33&&(Ve+=de.substring(Et,Ue+1)),$t="",oe=0)}}oe===0&&(qe+=$t)}rt=He,He=De,Ue++}if(Et=Ve.length,0<Et){if(Ge=ue,0<A&&(gr=c(2,Ve,Ge,G,se,N,Et,re,T,re),gr!==void 0&&(Ve=gr).length===0))return Cs+Ve+Wo;if(Ve=Ge.join(",")+"{"+Ve+"}",ce*K!==0){switch(ce!==2||l(Ve,2)||(K=0),K){case 111:Ve=Ve.replace(z,":-moz-$1")+Ve;break;case 112:Ve=Ve.replace(O,"::-webkit-input-$1")+Ve.replace(O,"::-moz-$1")+Ve.replace(O,":-ms-input-$1")+Ve}K=0}}return Cs+Ve+Wo}function n(G,ue,de){var re=ue.trim().split(S);ue=re;var T=re.length,ee=G.length;switch(ee){case 0:case 1:var oe=0;for(G=ee===0?"":G[0]+" ";oe<T;++oe)ue[oe]=o(G,ue[oe],de).trim();break;default:var ve=oe=0;for(ue=[];oe<T;++oe)for(var we=0;we<ee;++we)ue[ve++]=o(G[we]+" ",re[oe],de).trim()}return ue}function o(G,ue,de){var re=ue.charCodeAt(0);switch(33>re&&(re=(ue=ue.trim()).charCodeAt(0)),re){case 38:return ue.replace(E,"$1"+G.trim());case 58:return G.trim()+ue.replace(E,"$1"+G.trim());default:if(0<1*de&&0<ue.indexOf("\f"))return ue.replace(E,(G.charCodeAt(0)===58?"":"$1")+G.trim())}return G+ue}function i(G,ue,de,re){var T=G+";",ee=2*ue+3*de+4*re;if(ee===944){G=T.indexOf(":",9)+1;var oe=T.substring(G,T.length-1).trim();return oe=T.substring(0,G).trim()+oe+";",ce===1||ce===2&&l(oe,1)?"-webkit-"+oe+oe:oe}if(ce===0||ce===2&&!l(T,1))return T;switch(ee){case 1015:return T.charCodeAt(10)===97?"-webkit-"+T+T:T;case 951:return T.charCodeAt(3)===116?"-webkit-"+T+T:T;case 963:return T.charCodeAt(5)===110?"-webkit-"+T+T:T;case 1009:if(T.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+T+T;case 978:return"-webkit-"+T+"-moz-"+T+T;case 1019:case 983:return"-webkit-"+T+"-moz-"+T+"-ms-"+T+T;case 883:if(T.charCodeAt(8)===45)return"-webkit-"+T+T;if(0<T.indexOf("image-set(",11))return T.replace(U,"$1-webkit-$2")+T;break;case 932:if(T.charCodeAt(4)===45)switch(T.charCodeAt(5)){case 103:return"-webkit-box-"+T.replace("-grow","")+"-webkit-"+T+"-ms-"+T.replace("grow","positive")+T;case 115:return"-webkit-"+T+"-ms-"+T.replace("shrink","negative")+T;case 98:return"-webkit-"+T+"-ms-"+T.replace("basis","preferred-size")+T}return"-webkit-"+T+"-ms-"+T+T;case 964:return"-webkit-"+T+"-ms-flex-"+T+T;case 1023:if(T.charCodeAt(8)!==99)break;return oe=T.substring(T.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+oe+"-webkit-"+T+"-ms-flex-pack"+oe+T;case 1005:return y.test(T)?T.replace(m,":-webkit-")+T.replace(m,":-moz-")+T:T;case 1e3:switch(oe=T.substring(13).trim(),ue=oe.indexOf("-")+1,oe.charCodeAt(0)+oe.charCodeAt(ue)){case 226:oe=T.replace(B,"tb");break;case 232:oe=T.replace(B,"tb-rl");break;case 220:oe=T.replace(B,"lr");break;default:return T}return"-webkit-"+T+"-ms-"+oe+T;case 1017:if(T.indexOf("sticky",9)===-1)break;case 975:switch(ue=(T=G).length-10,oe=(T.charCodeAt(ue)===33?T.substring(0,ue):T).substring(G.indexOf(":",7)+1).trim(),ee=oe.charCodeAt(0)+(oe.charCodeAt(7)|0)){case 203:if(111>oe.charCodeAt(8))break;case 115:T=T.replace(oe,"-webkit-"+oe)+";"+T;break;case 207:case 102:T=T.replace(oe,"-webkit-"+(102<ee?"inline-":"")+"box")+";"+T.replace(oe,"-webkit-"+oe)+";"+T.replace(oe,"-ms-"+oe+"box")+";"+T}return T+";";case 938:if(T.charCodeAt(5)===45)switch(T.charCodeAt(6)){case 105:return oe=T.replace("-items",""),"-webkit-"+T+"-webkit-box-"+oe+"-ms-flex-"+oe+T;case 115:return"-webkit-"+T+"-ms-flex-item-"+T.replace(M,"")+T;default:return"-webkit-"+T+"-ms-flex-line-pack"+T.replace("align-content","").replace(M,"")+T}break;case 973:case 989:if(T.charCodeAt(3)!==45||T.charCodeAt(4)===122)break;case 931:case 953:if(L.test(G)===!0)return(oe=G.substring(G.indexOf(":")+1)).charCodeAt(0)===115?i(G.replace("stretch","fill-available"),ue,de,re).replace(":fill-available",":stretch"):T.replace(oe,"-webkit-"+oe)+T.replace(oe,"-moz-"+oe.replace("fill-",""))+T;break;case 962:if(T="-webkit-"+T+(T.charCodeAt(5)===102?"-ms-"+T:"")+T,de+re===211&&T.charCodeAt(13)===105&&0<T.indexOf("transform",10))return T.substring(0,T.indexOf(";",27)+1).replace(x,"$1-webkit-$2")+T}return T}function l(G,ue){var de=G.indexOf(ue===1?":":"{"),re=G.substring(0,ue!==3?de:10);return de=G.substring(de+1,G.length-1),Y(ue!==2?re:re.replace(_,"$1"),de,ue)}function u(G,ue){var de=i(ue,ue.charCodeAt(0),ue.charCodeAt(1),ue.charCodeAt(2));return de!==ue+";"?de.replace(X," or ($1)").substring(4):"("+ue+")"}function c(G,ue,de,re,T,ee,oe,ve,we,je){for(var De=0,He=ue,rt;De<A;++De)switch(rt=W[De].call(h,G,He,de,re,T,ee,oe,ve,we,je)){case void 0:case!1:case!0:case null:break;default:He=rt}if(He!==ue)return He}function d(G){switch(G){case void 0:case null:A=W.length=0;break;default:if(typeof G=="function")W[A++]=G;else if(typeof G=="object")for(var ue=0,de=G.length;ue<de;++ue)d(G[ue]);else ie=!!G|0}return d}function p(G){return G=G.prefix,G!==void 0&&(Y=null,G?typeof G!="function"?ce=1:(ce=2,Y=G):ce=0),p}function h(G,ue){var de=G;if(33>de.charCodeAt(0)&&(de=de.trim()),q=de,de=[q],0<A){var re=c(-1,ue,de,de,se,N,0,0,0,0);re!==void 0&&typeof re=="string"&&(ue=re)}var T=t(J,de,ue,0,0);return 0<A&&(re=c(-2,T,de,de,se,N,T.length,0,0,0),re!==void 0&&(T=re)),q="",K=0,N=se=1,T}var b=/^\0+/g,g=/[\0\r\f]/g,m=/: */g,y=/zoo|gra/,x=/([,: ])(transform)/g,S=/,\r+?/g,E=/([\t\r\n ])*\f?&/g,P=/@(k\w+)\s*(\S*)\s*/,O=/::(place)/g,z=/:(read-only)/g,B=/[svh]\w+-[tblr]{2}/,D=/\(\s*(.*)\s*\)/g,X=/([\s\S]*?);/g,M=/-self|flex-/g,_=/[^]*?(:[rp][el]a[\w-]+)[^]*/,L=/stretch|:\s*\w+\-(?:conte|avail)/,U=/([^-])(image-set\()/,N=1,se=1,K=0,ce=1,J=[],W=[],A=0,Y=null,ie=0,q="";return h.use=d,h.set=p,e!==void 0&&p(e),h}var q5,ute=w(()=>{q5=ste}),M5,R5,cte=w(()=>{M5={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},R5=M5});function dte(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var F5,fte=w(()=>{F5=dte}),L5,N5,gv,pte=w(()=>{fte(),L5=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,N5=F5(function(e){return L5.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91}),gv=N5}),hte=Te(e=>{var t=typeof Symbol=="function"&&Symbol.for,n=t?Symbol.for("react.element"):60103,o=t?Symbol.for("react.portal"):60106,i=t?Symbol.for("react.fragment"):60107,l=t?Symbol.for("react.strict_mode"):60108,u=t?Symbol.for("react.profiler"):60114,c=t?Symbol.for("react.provider"):60109,d=t?Symbol.for("react.context"):60110,p=t?Symbol.for("react.async_mode"):60111,h=t?Symbol.for("react.concurrent_mode"):60111,b=t?Symbol.for("react.forward_ref"):60112,g=t?Symbol.for("react.suspense"):60113,m=t?Symbol.for("react.suspense_list"):60120,y=t?Symbol.for("react.memo"):60115,x=t?Symbol.for("react.lazy"):60116,S=t?Symbol.for("react.block"):60121,E=t?Symbol.for("react.fundamental"):60117,P=t?Symbol.for("react.responder"):60118,O=t?Symbol.for("react.scope"):60119;function z(D){if(typeof D=="object"&&D!==null){var X=D.$$typeof;switch(X){case n:switch(D=D.type,D){case p:case h:case i:case u:case l:case g:return D;default:switch(D=D&&D.$$typeof,D){case d:case b:case x:case y:case c:return D;default:return X}}case o:return X}}}function B(D){return z(D)===h}e.AsyncMode=p,e.ConcurrentMode=h,e.ContextConsumer=d,e.ContextProvider=c,e.Element=n,e.ForwardRef=b,e.Fragment=i,e.Lazy=x,e.Memo=y,e.Portal=o,e.Profiler=u,e.StrictMode=l,e.Suspense=g,e.isAsyncMode=function(D){return B(D)||z(D)===p},e.isConcurrentMode=B,e.isContextConsumer=function(D){return z(D)===d},e.isContextProvider=function(D){return z(D)===c},e.isElement=function(D){return typeof D=="object"&&D!==null&&D.$$typeof===n},e.isForwardRef=function(D){return z(D)===b},e.isFragment=function(D){return z(D)===i},e.isLazy=function(D){return z(D)===x},e.isMemo=function(D){return z(D)===y},e.isPortal=function(D){return z(D)===o},e.isProfiler=function(D){return z(D)===u},e.isStrictMode=function(D){return z(D)===l},e.isSuspense=function(D){return z(D)===g},e.isValidElementType=function(D){return typeof D=="string"||typeof D=="function"||D===i||D===h||D===u||D===l||D===g||D===m||typeof D=="object"&&D!==null&&(D.$$typeof===x||D.$$typeof===y||D.$$typeof===c||D.$$typeof===d||D.$$typeof===b||D.$$typeof===E||D.$$typeof===P||D.$$typeof===O||D.$$typeof===S)},e.typeOf=z}),mte=Te((e,t)=>{t.exports=hte()}),gte=Te((e,t)=>{var n=mte(),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},u={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};c[n.ForwardRef]=l,c[n.Memo]=u;function d(S){return n.isMemo(S)?u:c[S.$$typeof]||o}var p=Object.defineProperty,h=Object.getOwnPropertyNames,b=Object.getOwnPropertySymbols,g=Object.getOwnPropertyDescriptor,m=Object.getPrototypeOf,y=Object.prototype;function x(S,E,P){if(typeof E!="string"){if(y){var O=m(E);O&&O!==y&&x(S,O,P)}var z=h(E);b&&(z=z.concat(b(E)));for(var B=d(S),D=d(E),X=0;X<z.length;++X){var M=z[X];if(!i[M]&&!(P&&P[M])&&!(D&&D[M])&&!(B&&B[M])){var _=g(E,M);try{p(S,M,_)}catch{}}}}return S}t.exports=x});function Er(){return(Er=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function ju(e){return typeof e=="function"}function V5(e){return e.displayName||e.name||"Component"}function vv(e){return e&&typeof e.styledComponentId=="string"}function jo(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}function bv(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Pv(t%52)+n;return(Pv(t%52)+n).replace(fO,"$1-$2")}function K5(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(ju(n)&&!vv(n))return!1}return!0}function U5(e){var t,n,o,i,l=e===void 0?Co:e,u=l.options,c=u===void 0?Co:u,d=l.plugins,p=d===void 0?Cu:d,h=new q5(c),b=[],g=function(x){function S(E){if(E)try{x(E+"}")}catch{}}return function(E,P,O,z,B,D,X,M,_,L){switch(E){case 1:if(_===0&&P.charCodeAt(0)===64)return x(P+";"),"";break;case 2:if(M===0)return P+"/*|*/";break;case 3:switch(M){case 102:case 112:return x(O[0]+P),"";default:return P+(L===0?"/*|*/":"")}case-2:P.split("/*|*/}").forEach(S)}}}(function(x){b.push(x)}),m=function(x,S,E){return S===0&&gO.indexOf(E[n.length])!==-1||E.match(i)?x:"."+t};function y(x,S,E,P){P===void 0&&(P="&");var O=x.replace(mO,""),z=S&&E?E+" "+S+" { "+O+" }":O;return t=P,n=S,o=new RegExp("\\"+n+"\\b","g"),i=new RegExp("(\\"+n+"\\b){2,}"),h(E||!S?"":S,z)}return h.use([].concat(p,[function(x,S,E){x===2&&E.length&&E[0].lastIndexOf(n)>0&&(E[0]=E[0].replace(o,m))},g,function(x){if(x===-2){var S=b;return b=[],S}}])),y.hash=p.length?p.reduce(function(x,S){return S.name||jo(15),li(x,S.name)},5381).toString():"",y}function yv(){return(0,Dt.useContext)(Sf)||vO}function H5(){return(0,Dt.useContext)(Ef)||Pf}function $5(e){var t=(0,Dt.useState)(e.stylisPlugins),n=t[0],o=t[1],i=yv(),l=(0,Dt.useMemo)(function(){var c=i;return e.sheet?c=e.sheet:e.target&&(c=c.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(c=c.reconstructWithOptions({useCSSOMInjection:!1})),c},[e.disableCSSOMInjection,e.sheet,e.target]),u=(0,Dt.useMemo)(function(){return U5({options:{prefix:!e.disableVendorPrefixes},plugins:n})},[e.disableVendorPrefixes,n]);return(0,Dt.useEffect)(function(){(0,X5.default)(n,e.stylisPlugins)||o(e.stylisPlugins)},[e.stylisPlugins]),Dt.default.createElement(Sf.Provider,{value:l},Dt.default.createElement(Ef.Provider,{value:u},e.children))}function W5(e){return yO.test(e)?e.replace(xO,wO).replace(kO,"-ms-"):e}function ii(e,t,n,o){if(Array.isArray(e)){for(var i,l=[],u=0,c=e.length;u<c;u+=1)(i=ii(e[u],t,n,o))!==""&&(Array.isArray(i)?l.push.apply(l,i):l.push(i));return l}if(jv(e))return"";if(vv(e))return"."+e.styledComponentId;if(ju(e)){if(typeof(p=e)!="function"||p.prototype&&p.prototype.isReactComponent||!t)return e;var d=e(t);return ii(d,t,n,o)}var p;return e instanceof bO?n?(e.inject(n,o),e.getName(o)):e:xf(e)?function h(b,g){var m,y,x=[];for(var S in b)b.hasOwnProperty(S)&&!jv(b[S])&&(Array.isArray(b[S])&&b[S].isCss||ju(b[S])?x.push(W5(S)+":",b[S],";"):xf(b[S])?x.push.apply(x,h(b[S],S)):x.push(W5(S)+": "+(m=S,(y=b[S])==null||typeof y=="boolean"||y===""?"":typeof y!="number"||y===0||m in R5||m.startsWith("--")?String(y).trim():y+"px")+";"));return g?[g+" {"].concat(x,["}"]):x}(e):e.toString()}function Gn(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return ju(e)||xf(e)?Cv(ii(wv(Cu,[e].concat(n)))):n.length===0&&e.length===1&&typeof e[0]=="string"?e:Cv(ii(wv(e,n)))}function xv(e){return e.replace(SO,"-").replace(EO,"")}function yf(e){return typeof e=="string"&&!0}function vte(e,t,n){var o=e[n];If(t)&&If(o)?G5(o,t):e[n]=t}function G5(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];for(var i=0,l=n;i<l.length;i++){var u=l[i];if(If(u))for(var c in u)PO(c)&&vte(e,u[c],c)}return e}function Y5(e,t,n){var o=vv(e),i=!yf(e),l=t.attrs,u=l===void 0?Cu:l,c=t.componentId,d=c===void 0?function(P,O){var z=typeof P!="string"?"sc":xv(P);Cf[z]=(Cf[z]||0)+1;var B=z+"-"+_v("5.3.11"+z+Cf[z]);return O?O+"-"+B:B}(t.displayName,t.parentComponentId):c,p=t.displayName,h=p===void 0?function(P){return yf(P)?"styled."+P:"Styled("+V5(P)+")"}(e):p,b=t.displayName&&t.componentId?xv(t.displayName)+"-"+t.componentId:t.componentId||d,g=o&&e.attrs?Array.prototype.concat(e.attrs,u).filter(Boolean):u,m=t.shouldForwardProp;o&&e.shouldForwardProp&&(m=t.shouldForwardProp?function(P,O,z){return e.shouldForwardProp(P,O,z)&&t.shouldForwardProp(P,O,z)}:e.shouldForwardProp);var y,x=new hO(n,b,o?e.componentStyle:void 0),S=x.isStatic&&u.length===0,E=function(P,O){return function(z,B,D,X){var M=z.attrs,_=z.componentStyle,L=z.defaultProps,U=z.foldedComponentIds,N=z.shouldForwardProp,se=z.styledComponentId,K=z.target,ce=function(re,T,ee){re===void 0&&(re=Co);var oe=Er({},T,{theme:re}),ve={};return ee.forEach(function(we){var je,De,He,rt=we;for(je in ju(rt)&&(rt=rt(oe)),rt)oe[je]=ve[je]=je==="className"?(De=ve[je],He=rt[je],De&&He?De+" "+He:De||He):rt[je]}),[oe,ve]}(Ov(B,(0,Dt.useContext)(jf),L)||Co,B,M),J=ce[0],W=ce[1],A=function(re,T,ee,oe){var ve=yv(),we=H5(),je=T?re.generateAndInjectStyles(Co,ve,we):re.generateAndInjectStyles(ee,ve,we);return je}(_,X,J),Y=D,ie=W.$as||B.$as||W.as||B.as||K,q=yf(ie),G=W!==B?Er({},B,{},W):B,ue={};for(var de in G)de[0]!=="$"&&de!=="as"&&(de==="forwardedAs"?ue.as=G[de]:(N?N(de,gv,ie):!q||gv(de))&&(ue[de]=G[de]));return B.style&&W.style!==B.style&&(ue.style=Er({},B.style,{},W.style)),ue.className=Array.prototype.concat(U,se,A!==se?A:null,B.className,W.className).filter(Boolean).join(" "),ue.ref=Y,(0,Dt.createElement)(ie,ue)}(y,P,O,S)};return E.displayName=h,(y=Dt.default.forwardRef(E)).attrs=g,y.componentStyle=x,y.displayName=h,y.shouldForwardProp=m,y.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):Cu,y.styledComponentId=b,y.target=o?e.target:e,y.withComponent=function(P){var O=t.componentId,z=function(D,X){if(D==null)return{};var M,_,L={},U=Object.keys(D);for(_=0;_<U.length;_++)M=U[_],X.indexOf(M)>=0||(L[M]=D[M]);return L}(t,["componentId"]),B=O&&O+"-"+(yf(P)?P:xv(V5(P)));return Y5(P,Er({},z,{attrs:g,componentId:B}),n)},Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(P){this._foldedDefaultProps=o?G5({},e.defaultProps,P):P}}),Object.defineProperty(y,"toString",{value:function(){return"."+y.styledComponentId}}),i&&(0,J5.default)(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),y}function Q5(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=Gn.apply(void 0,[e].concat(n)),l="sc-global-"+_v(JSON.stringify(i)),u=new IO(i,l);function c(p){var h=yv(),b=H5(),g=(0,Dt.useContext)(jf),m=(0,Dt.useRef)(h.allocateGSInstance(l)).current;return h.server&&d(m,p,h,g,b),(0,Dt.useLayoutEffect)(function(){if(!h.server)return d(m,p,h,g,b),function(){return u.removeStyles(m,h)}},[m,p,h,g,b]),null}function d(p,h,b,g,m){if(u.isStatic)u.renderStyles(p,eO,b,m);else{var y=Er({},h,{theme:Ov(h,g,c.defaultProps)});u.renderStyles(p,y,b,m)}}return Dt.default.memo(c)}var kv,Dt,X5,J5,wv,xf,Cu,Co,Oo,kf,Z5,eO,tO,Ou,_u,Il,Du,nO,rO,oO,aO,iO,lO,wf,Sv,sO,uO,cO,Ev,dO,jl,fO,Pv,li,Iv,pO,hO,mO,gO,Sf,Ef,vO,Pf,bO,yO,xO,kO,wO,jv,Cv,Ov,SO,EO,_v,If,PO,jf,Cf,Of,IO,C,fe=w(()=>{kv=V(lte()),Dt=V(H()),X5=V(z5()),ute(),cte(),pte(),J5=V(gte()),wv=function(e,t){for(var n=[e[0]],o=0,i=t.length;o<i;o+=1)n.push(t[o],e[o+1]);return n},xf=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!(0,kv.typeOf)(e)},Cu=Object.freeze([]),Co=Object.freeze({}),Oo=typeof process<"u"&&process.env!==void 0&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",kf=typeof window<"u"&&"HTMLElement"in window,Z5=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&process.env!==void 0&&(process.env.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&process.env.REACT_APP_SC_DISABLE_SPEEDY!==""?process.env.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&process.env.REACT_APP_SC_DISABLE_SPEEDY:process.env.SC_DISABLE_SPEEDY!==void 0&&process.env.SC_DISABLE_SPEEDY!==""&&process.env.SC_DISABLE_SPEEDY!=="false"&&process.env.SC_DISABLE_SPEEDY)),eO={},tO=function(){function e(n){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=n}var t=e.prototype;return t.indexOfGroup=function(n){for(var o=0,i=0;i<n;i++)o+=this.groupSizes[i];return o},t.insertRules=function(n,o){if(n>=this.groupSizes.length){for(var i=this.groupSizes,l=i.length,u=l;n>=u;)(u<<=1)<0&&jo(16,""+n);this.groupSizes=new Uint32Array(u),this.groupSizes.set(i),this.length=u;for(var c=l;c<u;c++)this.groupSizes[c]=0}for(var d=this.indexOfGroup(n+1),p=0,h=o.length;p<h;p++)this.tag.insertRule(d,o[p])&&(this.groupSizes[n]++,d++)},t.clearGroup=function(n){if(n<this.length){var o=this.groupSizes[n],i=this.indexOfGroup(n),l=i+o;this.groupSizes[n]=0;for(var u=i;u<l;u++)this.tag.deleteRule(i)}},t.getGroup=function(n){var o="";if(n>=this.length||this.groupSizes[n]===0)return o;for(var i=this.groupSizes[n],l=this.indexOfGroup(n),u=l+i,c=l;c<u;c++)o+=this.tag.getRule(c)+`/*!sc*/
`;return o},e}(),Ou=new Map,_u=new Map,Il=1,Du=function(e){if(Ou.has(e))return Ou.get(e);for(;_u.has(Il);)Il++;var t=Il++;return Ou.set(e,t),_u.set(t,e),t},nO=function(e){return _u.get(e)},rO=function(e,t){t>=Il&&(Il=t+1),Ou.set(e,t),_u.set(t,e)},oO="style["+Oo+'][data-styled-version="5.3.11"]',aO=new RegExp("^"+Oo+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),iO=function(e,t,n){for(var o,i=n.split(","),l=0,u=i.length;l<u;l++)(o=i[l])&&e.registerName(t,o)},lO=function(e,t){for(var n=(t.textContent||"").split(`/*!sc*/
`),o=[],i=0,l=n.length;i<l;i++){var u=n[i].trim();if(u){var c=u.match(aO);if(c){var d=0|parseInt(c[1],10),p=c[2];d!==0&&(rO(p,d),iO(e,p,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(u)}}},wf=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},Sv=function(e){var t=document.head,n=e||t,o=document.createElement("style"),i=function(c){for(var d=c.childNodes,p=d.length;p>=0;p--){var h=d[p];if(h&&h.nodeType===1&&h.hasAttribute(Oo))return h}}(n),l=i!==void 0?i.nextSibling:null;o.setAttribute(Oo,"active"),o.setAttribute("data-styled-version","5.3.11");var u=wf();return u&&o.setAttribute("nonce",u),n.insertBefore(o,l),o},sO=function(){function e(n){var o=this.element=Sv(n);o.appendChild(document.createTextNode("")),this.sheet=function(i){if(i.sheet)return i.sheet;for(var l=document.styleSheets,u=0,c=l.length;u<c;u++){var d=l[u];if(d.ownerNode===i)return d}jo(17)}(o),this.length=0}var t=e.prototype;return t.insertRule=function(n,o){try{return this.sheet.insertRule(o,n),this.length++,!0}catch{return!1}},t.deleteRule=function(n){this.sheet.deleteRule(n),this.length--},t.getRule=function(n){var o=this.sheet.cssRules[n];return o!==void 0&&typeof o.cssText=="string"?o.cssText:""},e}(),uO=function(){function e(n){var o=this.element=Sv(n);this.nodes=o.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(n,o){if(n<=this.length&&n>=0){var i=document.createTextNode(o),l=this.nodes[n];return this.element.insertBefore(i,l||null),this.length++,!0}return!1},t.deleteRule=function(n){this.element.removeChild(this.nodes[n]),this.length--},t.getRule=function(n){return n<this.length?this.nodes[n].textContent:""},e}(),cO=function(){function e(n){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(n,o){return n<=this.length&&(this.rules.splice(n,0,o),this.length++,!0)},t.deleteRule=function(n){this.rules.splice(n,1),this.length--},t.getRule=function(n){return n<this.length?this.rules[n]:""},e}(),Ev=kf,dO={isServer:!kf,useCSSOMInjection:!Z5},jl=function(){function e(n,o,i){n===void 0&&(n=Co),o===void 0&&(o={}),this.options=Er({},dO,{},n),this.gs=o,this.names=new Map(i),this.server=!!n.isServer,!this.server&&kf&&Ev&&(Ev=!1,function(l){for(var u=document.querySelectorAll(oO),c=0,d=u.length;c<d;c++){var p=u[c];p&&p.getAttribute(Oo)!=="active"&&(lO(l,p),p.parentNode&&p.parentNode.removeChild(p))}}(this))}e.registerId=function(n){return Du(n)};var t=e.prototype;return t.reconstructWithOptions=function(n,o){return o===void 0&&(o=!0),new e(Er({},this.options,{},n),this.gs,o&&this.names||void 0)},t.allocateGSInstance=function(n){return this.gs[n]=(this.gs[n]||0)+1},t.getTag=function(){return this.tag||(this.tag=(i=(o=this.options).isServer,l=o.useCSSOMInjection,u=o.target,n=i?new cO(u):l?new sO(u):new uO(u),new tO(n)));var n,o,i,l,u},t.hasNameForId=function(n,o){return this.names.has(n)&&this.names.get(n).has(o)},t.registerName=function(n,o){if(Du(n),this.names.has(n))this.names.get(n).add(o);else{var i=new Set;i.add(o),this.names.set(n,i)}},t.insertRules=function(n,o,i){this.registerName(n,o),this.getTag().insertRules(Du(n),i)},t.clearNames=function(n){this.names.has(n)&&this.names.get(n).clear()},t.clearRules=function(n){this.getTag().clearGroup(Du(n)),this.clearNames(n)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(n){for(var o=n.getTag(),i=o.length,l="",u=0;u<i;u++){var c=nO(u);if(c!==void 0){var d=n.names.get(c),p=o.getGroup(u);if(d&&p&&d.size){var h=Oo+".g"+u+'[id="'+c+'"]',b="";d!==void 0&&d.forEach(function(g){g.length>0&&(b+=g+",")}),l+=""+p+h+'{content:"'+b+`"}/*!sc*/
`}}}return l}(this)},e}(),fO=/(a)(d)/gi,Pv=function(e){return String.fromCharCode(e+(e>25?39:97))},li=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Iv=function(e){return li(5381,e)},pO=Iv("5.3.11"),hO=function(){function e(t,n,o){this.rules=t,this.staticRulesId="",this.isStatic=(o===void 0||o.isStatic)&&K5(t),this.componentId=n,this.baseHash=li(pO,n),this.baseStyle=o,jl.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,o){var i=this.componentId,l=[];if(this.baseStyle&&l.push(this.baseStyle.generateAndInjectStyles(t,n,o)),this.isStatic&&!o.hash)if(this.staticRulesId&&n.hasNameForId(i,this.staticRulesId))l.push(this.staticRulesId);else{var u=ii(this.rules,t,n,o).join(""),c=bv(li(this.baseHash,u)>>>0);if(!n.hasNameForId(i,c)){var d=o(u,"."+c,void 0,i);n.insertRules(i,c,d)}l.push(c),this.staticRulesId=c}else{for(var p=this.rules.length,h=li(this.baseHash,o.hash),b="",g=0;g<p;g++){var m=this.rules[g];if(typeof m=="string")b+=m;else if(m){var y=ii(m,t,n,o),x=Array.isArray(y)?y.join(""):y;h=li(h,x+g),b+=x}}if(b){var S=bv(h>>>0);if(!n.hasNameForId(i,S)){var E=o(b,"."+S,void 0,i);n.insertRules(i,S,E)}l.push(S)}}return l.join(" ")},e}(),mO=/^\s*\/\/.*$/gm,gO=[":","[",".","#"],Sf=Dt.default.createContext(),Sf.Consumer,Ef=Dt.default.createContext(),vO=(Ef.Consumer,new jl),Pf=U5(),bO=function(){function e(t,n){var o=this;this.inject=function(i,l){l===void 0&&(l=Pf);var u=o.name+l.hash;i.hasNameForId(o.id,u)||i.insertRules(o.id,u,l(o.rules,u,"@keyframes"))},this.toString=function(){return jo(12,String(o.name))},this.name=t,this.id="sc-keyframes-"+t,this.rules=n}return e.prototype.getName=function(t){return t===void 0&&(t=Pf),this.name+t.hash},e}(),yO=/([A-Z])/,xO=/([A-Z])/g,kO=/^ms-/,wO=function(e){return"-"+e.toLowerCase()},jv=function(e){return e==null||e===!1||e===""},Cv=function(e){return Array.isArray(e)&&(e.isCss=!0),e},Ov=function(e,t,n){return n===void 0&&(n=Co),e.theme!==n.theme&&e.theme||t||n.theme},SO=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,EO=/(^-|-$)/g,_v=function(e){return bv(Iv(e)>>>0)},If=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},PO=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"},jf=Dt.default.createContext(),jf.Consumer,Cf={},Of=function(e){return function t(n,o,i){if(i===void 0&&(i=Co),!(0,kv.isValidElementType)(o))return jo(1,String(o));var l=function(){return n(o,i,Gn.apply(void 0,arguments))};return l.withConfig=function(u){return t(n,o,Er({},i,{},u))},l.attrs=function(u){return t(n,o,Er({},i,{attrs:Array.prototype.concat(i.attrs,u).filter(Boolean)}))},l}(Y5,e)},["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach(function(e){Of[e]=Of(e)}),IO=function(){function e(n,o){this.rules=n,this.componentId=o,this.isStatic=K5(n),jl.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(n,o,i,l){var u=l(ii(this.rules,o,i,l).join(""),""),c=this.componentId+n;i.insertRules(c,c,u)},t.removeStyles=function(n,o){o.clearRules(this.componentId+n)},t.renderStyles=function(n,o,i,l){n>2&&jl.registerId(this.componentId+n),this.removeStyles(n,i),this.createStyles(n,o,i,l)},e}(),function(){function e(){var n=this;this._emitSheetCSS=function(){var o=n.instance.toString();if(!o)return"";var i=wf();return"<style "+[i&&'nonce="'+i+'"',Oo+'="true"','data-styled-version="5.3.11"'].filter(Boolean).join(" ")+">"+o+"</style>"},this.getStyleTags=function(){return n.sealed?jo(2):n._emitSheetCSS()},this.getStyleElement=function(){var o;if(n.sealed)return jo(2);var i=((o={})[Oo]="",o["data-styled-version"]="5.3.11",o.dangerouslySetInnerHTML={__html:n.instance.toString()},o),l=wf();return l&&(i.nonce=l),[Dt.default.createElement("style",Er({},i,{key:"sc-0-0"}))]},this.seal=function(){n.sealed=!0},this.instance=new jl({isServer:!0}),this.sealed=!1}var t=e.prototype;return t.collectStyles=function(n){return this.sealed?jo(2):Dt.default.createElement($5,{sheet:this.instance},n)},t.interleaveWithNodeStream=function(n){return jo(3)},e}(),C=Of});function si(){return si=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},si.apply(this,arguments)}var bte=w(()=>{});function yte(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var xte=w(()=>{});function Tu(e,t){return Tu=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Tu(e,t)}var Dv=w(()=>{});function kte(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Tu(e,t)}var wte=w(()=>{Dv()});function Tv(e){return Tv=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Tv(e)}var Ste=w(()=>{});function Ete(e){return Function.toString.call(e).indexOf("[native code]")!==-1}var Pte=w(()=>{});function Ite(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}var jte=w(()=>{});function _f(e,t,n){return Ite()?_f=Reflect.construct:_f=function(o,i,l){var u=[null];u.push.apply(u,i);var c=Function.bind.apply(o,u),d=new c;return l&&Tu(d,l.prototype),d},_f.apply(null,arguments)}var Cte=w(()=>{Dv(),jte()});function Av(e){var t=typeof Map=="function"?new Map:void 0;return Av=function(n){if(n===null||!Ete(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t<"u"){if(t.has(n))return t.get(n);t.set(n,o)}function o(){return _f(n,arguments,Tv(this).constructor)}return o.prototype=Object.create(n.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),Tu(o,n)},Av(e)}var Ote=w(()=>{Ste(),Dv(),Pte(),Cte()}),_te=w(()=>{});function Dte(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Tte(e,t){if(!e)return t.toLowerCase();var n=e.split("-");if(n.length>1)return n.splice(1,0,t),n.reduce(function(i,l){return""+i+Dte(l)});var o=e.replace(/([a-z])([A-Z])/g,"$1"+t+"$2");return e===o?""+e+t:o}function Ate(e,t){for(var n={},o=0;o<t.length;o+=1)(t[o]||t[o]===0)&&(n[Tte(e,AO[o])]=t[o]);return n}function jO(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=n[0],l=n[1],u=l===void 0?i:l,c=n[2],d=c===void 0?i:c,p=n[3],h=p===void 0?u:p,b=[i,u,d,h];return Ate(e,b)}function Bv(e){return Math.round(e*255)}function Bte(e,t,n){return Bv(e)+","+Bv(t)+","+Bv(n)}function Df(e,t,n,o){if(o===void 0&&(o=Bte),t===0)return o(n,n,n);var i=(e%360+360)%360/60,l=(1-Math.abs(2*n-1))*t,u=l*(1-Math.abs(i%2-1)),c=0,d=0,p=0;i>=0&&i<1?(c=l,d=u):i>=1&&i<2?(c=u,d=l):i>=2&&i<3?(d=l,p=u):i>=3&&i<4?(d=u,p=l):i>=4&&i<5?(c=u,p=l):i>=5&&i<6&&(c=l,p=u);var h=n-l/2,b=c+h,g=d+h,m=p+h;return o(b,g,m)}function zte(e){if(typeof e!="string")return e;var t=e.toLowerCase();return Fv[t]?"#"+Fv[t]:e}function CO(e){if(typeof e!="string")throw new Pr(3);var t=zte(e);if(t.match(BO))return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16)};if(t.match(zO)){var n=parseFloat((parseInt(""+t[7]+t[8],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16),alpha:n}}if(t.match(qO))return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16)};if(t.match(MO)){var o=parseFloat((parseInt(""+t[4]+t[4],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16),alpha:o}}var i=Bf.exec(t);if(i)return{red:parseInt(""+i[1],10),green:parseInt(""+i[2],10),blue:parseInt(""+i[3],10)};var l=RO.exec(t.substring(0,50));if(l)return{red:parseInt(""+l[1],10),green:parseInt(""+l[2],10),blue:parseInt(""+l[3],10),alpha:parseFloat(""+l[4])};var u=FO.exec(t);if(u){var c=parseInt(""+u[1],10),d=parseInt(""+u[2],10)/100,p=parseInt(""+u[3],10)/100,h="rgb("+Df(c,d,p)+")",b=Bf.exec(h);if(!b)throw new Pr(4,t,h);return{red:parseInt(""+b[1],10),green:parseInt(""+b[2],10),blue:parseInt(""+b[3],10)}}var g=LO.exec(t.substring(0,50));if(g){var m=parseInt(""+g[1],10),y=parseInt(""+g[2],10)/100,x=parseInt(""+g[3],10)/100,S="rgb("+Df(m,y,x)+")",E=Bf.exec(S);if(!E)throw new Pr(4,t,S);return{red:parseInt(""+E[1],10),green:parseInt(""+E[2],10),blue:parseInt(""+E[3],10),alpha:parseFloat(""+g[4])}}throw new Pr(5)}function qte(e){var t=e.red/255,n=e.green/255,o=e.blue/255,i=Math.max(t,n,o),l=Math.min(t,n,o),u=(i+l)/2;if(i===l)return e.alpha!==void 0?{hue:0,saturation:0,lightness:u,alpha:e.alpha}:{hue:0,saturation:0,lightness:u};var c,d=i-l,p=u>.5?d/(2-i-l):d/(i+l);switch(i){case t:c=(n-o)/d+(n<o?6:0);break;case n:c=(o-t)/d+2;break;default:c=(t-n)/d+4;break}return c*=60,e.alpha!==void 0?{hue:c,saturation:p,lightness:u,alpha:e.alpha}:{hue:c,saturation:p,lightness:u}}function zv(e){return qte(CO(e))}function ui(e){var t=e.toString(16);return t.length===1?"0"+t:t}function qv(e){return ui(Math.round(e*255))}function Mte(e,t,n){return zf("#"+qv(e)+qv(t)+qv(n))}function OO(e,t,n){return Df(e,t,n,Mte)}function Rte(e,t,n){if(typeof e=="object"&&t===void 0&&n===void 0)return OO(e.hue,e.saturation,e.lightness);throw new Pr(1)}function Fte(e,t,n,o){if(typeof e=="object"&&t===void 0&&n===void 0&&o===void 0)return e.alpha>=1?OO(e.hue,e.saturation,e.lightness):"rgba("+Df(e.hue,e.saturation,e.lightness)+","+e.alpha+")";throw new Pr(2)}function _O(e,t,n){if(typeof e=="number"&&typeof t=="number"&&typeof n=="number")return zf("#"+ui(e)+ui(t)+ui(n));if(typeof e=="object"&&t===void 0&&n===void 0)return zf("#"+ui(e.red)+ui(e.green)+ui(e.blue));throw new Pr(6)}function DO(e,t,n,o){if(typeof e=="object"&&t===void 0&&n===void 0&&o===void 0)return e.alpha>=1?_O(e.red,e.green,e.blue):"rgba("+e.red+","+e.green+","+e.blue+","+e.alpha+")";throw new Pr(7)}function Mv(e){if(typeof e!="object")throw new Pr(8);if(VO(e))return DO(e);if(NO(e))return _O(e);if(UO(e))return Fte(e);if(KO(e))return Rte(e);throw new Pr(8)}function TO(e,t,n){return function(){var o=n.concat(Array.prototype.slice.call(arguments));return o.length>=t?e.apply(this,o):TO(e,t,o)}}function Tf(e){return TO(e,e.length,[])}function Af(e,t,n){return Math.max(e,Math.min(t,n))}function Lte(e,t){if(t==="transparent")return t;var n=zv(t);return Mv(si({},n,{lightness:Af(0,1,n.lightness-parseFloat(e))}))}function Nte(e,t){if(t==="transparent")return t;var n=zv(t);return Mv(si({},n,{lightness:Af(0,1,n.lightness+parseFloat(e))}))}function Vte(e,t){if(t==="transparent")return t;var n=zv(t);return Mv(si({},n,{saturation:Af(0,1,n.saturation+parseFloat(e))}))}function Kte(e,t){if(t==="transparent")return t;var n=CO(t),o=typeof n.alpha=="number"?n.alpha:1,i=si({},n,{alpha:Af(0,1,+(o*100-parseFloat(e)*100).toFixed(2)/100)});return DO(i)}function Rv(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return HO.indexOf(e)>=0&&e?si({},jO.apply(void 0,[""].concat(n)),{position:e}):jO.apply(void 0,["",e].concat(n))}var Pr,AO,Fv,BO,zO,qO,MO,Bf,RO,FO,LO,zf,NO,VO,KO,UO,Lv,Cl,qf,no,HO,Ir=w(()=>{bte(),xte(),wte(),Ote(),_te(),Pr=function(e){kte(t,e);function t(n){var o;return o=e.call(this,"An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#"+n+" for more information.")||this,yte(o)}return t}(Av(Error)),AO=["Top","Right","Bottom","Left"],Fv={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},BO=/^#[a-fA-F0-9]{6}$/,zO=/^#[a-fA-F0-9]{8}$/,qO=/^#[a-fA-F0-9]{3}$/,MO=/^#[a-fA-F0-9]{4}$/,Bf=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,RO=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i,FO=/^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,LO=/^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i,zf=function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},NO=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},VO=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},KO=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},UO=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"},Lv=Tf(Lte),Cl=Tf(Nte),qf=Tf(Vte),no=Tf(Kte),HO=["absolute","fixed","relative","static","sticky"]});function Ute(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,o)}return n}function ci(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?$O(Object(n),!0).forEach(function(o){Ute(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$O(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function Ol(e,t){if(e==null)return{};var n={},o=Object.keys(e),i,l;for(l=0;l<o.length;l++)i=o[l],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}var Au=w(()=>{}),WO,Nv,GO=w(()=>{WO=V(H()),Nv=(0,WO.createContext)({})});function Hte(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function YO(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,o)}return n}function _l(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?YO(Object(n),!0).forEach(function(o){Hte(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):YO(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function Vv(e,t){if(e==null)return{};var n={},o=Object.keys(e),i,l;for(l=0;l<o.length;l++)i=o[l],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function $te(e,t){if(e){if(typeof e=="string")return QO(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return QO(e,t)}}function QO(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function XO(e,t){var n;if(typeof Symbol>"u"||e[Symbol.iterator]==null){if(Array.isArray(e)||(n=$te(e))||t){n&&(e=n);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}return n=e[Symbol.iterator](),n.next.bind(n)}var Mf=w(()=>{});function Wte(e){return typeof e=="function"}var Kv,JO,Gte=w(()=>{Kv=V(H()),GO(),Mf(),JO=function(e,t,n){n===void 0&&(n=t.children);var o=(0,Kv.useContext)(Nv);if(o.useCreateElement)return o.useCreateElement(e,t,n);if(typeof e=="string"&&Wte(n)){t.children;var i=Vv(t,["children"]);return n(i)}return(0,Kv.createElement)(e,t,n)}});function Yte(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ZO(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,o)}return n}function Dl(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ZO(Object(n),!0).forEach(function(o){Yte(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ZO(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function Qte(e,t){if(e==null)return{};var n={},o=Object.keys(e),i,l;for(l=0;l<o.length;l++)i=o[l],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}var e_=w(()=>{});function Xte(e){return typeof e=="object"&&e!=null}var Jte=w(()=>{});function Uv(e){var t;if(!Xte(e))return!1;var n=Object.getPrototypeOf(e);return n==null?!0:((t=n.constructor)===null||t===void 0?void 0:t.toString())===Object.toString()}var t_=w(()=>{Jte()});function n_(e,t){for(var n=Object.keys(e),o={},i={},l=0,u=n;l<u.length;l++){var c=u[l];t.indexOf(c)>=0?o[c]=e[c]:i[c]=e[c]}return[o,i]}function r_(e,t){if(t===void 0&&(t=[]),!Uv(e.state))return n_(e,t);var n=n_(e,[].concat(t,["state"])),o=n[0],i=n[1],l=o.state,u=Qte(o,["state"]);return[Dl(Dl({},l),u),i]}var Zte=w(()=>{e_(),t_()});function Rf(e,t){if(e===t)return!0;if(!e||!t||typeof e!="object"||typeof t!="object")return!1;var n=Object.keys(e),o=Object.keys(t),i=n.length;if(o.length!==i)return!1;for(var l=0,u=n;l<u.length;l++){var c=u[l];if(e[c]!==t[c])return!1}return!0}var Hv=w(()=>{});function o_(e){return e.name==="normalizePropsAreEqualInner"?e:function(t,n){return!Uv(t.state)||!Uv(n.state)?e(t,n):e(Dl(Dl({},t.state),t),Dl(Dl({},n.state),n))}}var ene=w(()=>{e_(),t_()});function tne(e){return(0,$v.forwardRef)(e)}function nne(e,t){return(0,$v.memo)(e,t)}function Bu(e){var t=e.as,n=e.useHook,o=e.memo,i=e.propsAreEqual,l=i===void 0?n?.unstable_propsAreEqual:i,u=e.keys,c=u===void 0?n?.__keys||[]:u,d=e.useCreateElement,p=d===void 0?JO:d,h=function(b,g){var m=b.as,y=m===void 0?t:m,x=Vv(b,["as"]);if(n){var S,E=r_(x,c),P=E[0],O=E[1],z=n(P,_l({ref:g},O)),B=z.wrapElement,D=Vv(z,["wrapElement"]),X=((S=y.render)===null||S===void 0?void 0:S.__keys)||y.__keys,M=X&&r_(x,X)[0],_=M?_l(_l({},D),M):D,L=p(y,_);return B?B(L):L}return p(y,_l({ref:g},x))};return h=tne(h),o&&(h=nne(h,l&&o_(l))),h.__keys=c,h.unstable_propsAreEqual=o_(l||Rf),h}var $v,zu=w(()=>{$v=V(H()),Mf(),Gte(),Zte(),Hv(),ene()});function a_(e,t){(0,Wv.useDebugValue)(e);var n=(0,Wv.useContext)(Nv);return n[e]!=null?n[e]:t}var Wv,i_=w(()=>{Wv=V(H()),GO()});function rne(e,t,n){t===void 0&&(t={}),n===void 0&&(n={});var o="use"+e+"Props";(0,l_.useDebugValue)(o);var i=a_(o);return i?i(t,n):n}var l_,one=w(()=>{l_=V(H()),i_()});function ane(e,t,n){t===void 0&&(t={}),n===void 0&&(n={});var o="use"+e+"Options";(0,s_.useDebugValue)(o);var i=a_(o);return i?_l(_l({},t),i(t,n)):t}var s_,ine=w(()=>{s_=V(H()),i_(),Mf()});function lne(e){return Array.isArray(e)?e:typeof e<"u"?[e]:[]}var sne=w(()=>{});function qu(e){var t,n,o=lne(e.compose),i=function(c,d){if(e.useOptions&&(c=e.useOptions(c,d)),e.name&&(c=ane(e.name,c,d)),e.compose)for(var p=XO(o),h;!(h=p()).done;){var b=h.value;c=b.__useOptions(c,d)}return c},l=function(c,d,p){if(c===void 0&&(c={}),d===void 0&&(d={}),p===void 0&&(p=!1),p||(c=i(c,d)),e.useProps&&(d=e.useProps(c,d)),e.name&&(d=rne(e.name,c,d)),e.compose)if(e.useComposeOptions&&(c=e.useComposeOptions(c,d)),e.useComposeProps)d=e.useComposeProps(c,d);else for(var h=XO(o),b;!(b=h()).done;){var g=b.value;d=g(c,d,!0)}var m={},y=d||{};for(var x in y)y[x]!==void 0&&(m[x]=y[x]);return m};l.__useOptions=i;var u=o.reduce(function(c,d){return c.push.apply(c,d.__keys||[]),c},[]);return l.__keys=[].concat(u,((t=e.useState)===null||t===void 0?void 0:t.__keys)||[],e.keys||[]),l.unstable_propsAreEqual=e.propsAreEqual||((n=o[0])===null||n===void 0?void 0:n.unstable_propsAreEqual)||Rf,l}var Mu=w(()=>{V(H()),one(),Mf(),ine(),Hv(),sne()});function u_(e,t){t===void 0&&(t=null),e&&(typeof e=="function"?e(t):e.current=t)}function c_(e,t){return(0,d_.useMemo)(function(){return e==null&&t==null?null:function(n){u_(e,n),u_(t,n)}},[e,t])}var d_,f_=w(()=>{d_=V(H())});function Gv(e){if(e.tagName==="BUTTON")return!0;if(e.tagName==="INPUT"){var t=e;return p_.indexOf(t.type)!==-1}return!1}var p_,Yv=w(()=>{p_=["button","color","file","image","reset","submit"]}),Qv=w(()=>{}),une=w(()=>{Qv(),V(H())}),Ff=w(()=>{Qv(),V(H()),une()});function cne(e){return e?e.ownerDocument||e:document}var h_=w(()=>{});function dne(e){return m_}var m_,fne=w(()=>{h_();try{m_=window}catch{}});function pne(){var e=dne();return!!(typeof e<"u"&&e.document&&e.document.createElement)}var Lf,Xv=w(()=>{fne(),Lf=pne()}),Jv,Zv,eb=w(()=>{Jv=V(H()),Xv(),Zv=Lf?Jv.useLayoutEffect:Jv.useEffect});function Tl(e){var t=(0,g_.useRef)(e);return Zv(function(){t.current=e}),t}var g_,v_=w(()=>{g_=V(H()),eb()});function hne(e){return e.target===e.currentTarget}var mne=w(()=>{});function gne(e){var t=cne(e),n=t.activeElement;return n!=null&&n.nodeName?n:null}var vne=w(()=>{h_()});function b_(e,t){return e===t||e.contains(t)}var y_=w(()=>{});function bne(e){var t=gne(e);if(!t)return!1;if(b_(e,t))return!0;var n=t.getAttribute("aria-activedescendant");return n?n===e.id?!0:!!e.querySelector("#"+n):!1}var yne=w(()=>{vne(),y_()});function xne(e){return!b_(e.currentTarget,e.target)}var kne=w(()=>{y_()});function Nf(e){return Lf?window.navigator.userAgent.indexOf(e)!==-1:!1}var wne=w(()=>{Xv()});function Sne(e,t){return"matches"in e?e.matches(t):"msMatchesSelector"in e?e.msMatchesSelector(t):e.webkitMatchesSelector(t)}var Ene=w(()=>{});function Pne(e){var t=e;return t.offsetWidth>0||t.offsetHeight>0||e.getClientRects().length>0}function Ine(e){return Sne(e,x_)&&Pne(e)}var x_,jne=w(()=>{Ene(),x_="input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])"}),k_,Vf,w_=w(()=>{Au(),zu(),Mu(),Hv(),k_=["unstable_system"],Vf=qu({name:"Role",keys:k_,propsAreEqual:function(e,t){var n=e.unstable_system,o=Ol(e,["unstable_system"]),i=t.unstable_system,l=Ol(t,["unstable_system"]);return n!==i&&!Rf(n,i)?!1:Rf(o,l)}}),Bu({as:"div",useHook:Vf})});function S_(e){!bne(e)&&Ine(e)&&e.focus()}function Cne(e){return e.tagName==="BUTTON"||e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA"||e.tagName==="A"}function One(e){return e.tagName==="BUTTON"||e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA"}function _ne(e,t,n,o){return e?t&&!n?-1:void 0:t?o:o||0}function tb(e,t){return(0,Al.useCallback)(function(n){var o;(o=e.current)===null||o===void 0||o.call(e,n),!n.defaultPrevented&&t&&(n.stopPropagation(),n.preventDefault())},[e,t])}var Al,E_,P_,nb,Dne=w(()=>{Au(),zu(),Mu(),Al=V(H()),f_(),Yv(),Ff(),v_(),eb(),yne(),kne(),wne(),jne(),w_(),E_=["disabled","focusable"],P_=Nf("Mac")&&!Nf("Chrome")&&(Nf("Safari")||Nf("Firefox")),nb=qu({name:"Tabbable",compose:Vf,keys:E_,useOptions:function(e,t){var n=t.disabled;return ci({disabled:n},e)},useProps:function(e,t){var n=t.ref,o=t.tabIndex,i=t.onClickCapture,l=t.onMouseDownCapture,u=t.onMouseDown,c=t.onKeyPressCapture,d=t.style,p=Ol(t,["ref","tabIndex","onClickCapture","onMouseDownCapture","onMouseDown","onKeyPressCapture","style"]),h=(0,Al.useRef)(null),b=Tl(i),g=Tl(l),m=Tl(u),y=Tl(c),x=!!e.disabled&&!e.focusable,S=(0,Al.useState)(!0),E=S[0],P=S[1],O=(0,Al.useState)(!0),z=O[0],B=O[1],D=e.disabled?ci({pointerEvents:"none"},d):d;Zv(function(){var U=h.current;U&&(Cne(U)||P(!1),One(U)||B(!1))},[]);var X=tb(b,e.disabled),M=tb(g,e.disabled),_=tb(y,e.disabled),L=(0,Al.useCallback)(function(U){var N;(N=m.current)===null||N===void 0||N.call(m,U);var se=U.currentTarget;if(!U.defaultPrevented&&P_&&!xne(U)&&Gv(se)){var K=requestAnimationFrame(function(){se.removeEventListener("mouseup",ce,!0),S_(se)}),ce=function(){cancelAnimationFrame(K),S_(se)};se.addEventListener("mouseup",ce,{once:!0,capture:!0})}},[]);return ci({ref:c_(h,n),style:D,tabIndex:_ne(x,E,z,o),disabled:x&&z?!0:void 0,"aria-disabled":e.disabled?!0:void 0,onClickCapture:X,onMouseDownCapture:M,onMouseDown:L,onKeyPressCapture:_},p)}}),Bu({as:"div",useHook:nb})});function Tne(e){var t=e.currentTarget;return e.isTrusted?Gv(t)||t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="A"||t.tagName==="SELECT":!1}var Kf,I_,rb,Ane=w(()=>{Au(),zu(),Mu(),Kf=V(H()),Yv(),Ff(),v_(),mne(),Dne(),I_=["unstable_clickOnEnter","unstable_clickOnSpace"],rb=qu({name:"Clickable",compose:nb,keys:I_,useOptions:function(e){var t=e.unstable_clickOnEnter,n=t===void 0?!0:t,o=e.unstable_clickOnSpace,i=o===void 0?!0:o,l=Ol(e,["unstable_clickOnEnter","unstable_clickOnSpace"]);return ci({unstable_clickOnEnter:n,unstable_clickOnSpace:i},l)},useProps:function(e,t){var n=t.onKeyDown,o=t.onKeyUp,i=Ol(t,["onKeyDown","onKeyUp"]),l=(0,Kf.useState)(!1),u=l[0],c=l[1],d=Tl(n),p=Tl(o),h=(0,Kf.useCallback)(function(g){var m;if((m=d.current)===null||m===void 0||m.call(d,g),!g.defaultPrevented&&!e.disabled&&!g.metaKey&&hne(g)){var y=e.unstable_clickOnEnter&&g.key==="Enter",x=e.unstable_clickOnSpace&&g.key===" ";if(y||x){if(Tne(g))return;g.preventDefault(),y?g.currentTarget.click():x&&c(!0)}}},[e.disabled,e.unstable_clickOnEnter,e.unstable_clickOnSpace]),b=(0,Kf.useCallback)(function(g){var m;if((m=p.current)===null||m===void 0||m.call(p,g),!g.defaultPrevented&&!e.disabled&&!g.metaKey){var y=e.unstable_clickOnSpace&&g.key===" ";u&&y&&(c(!1),g.currentTarget.click())}},[e.disabled,e.unstable_clickOnSpace,u]);return ci({"data-active":u||void 0,onKeyDown:h,onKeyUp:b},i)}}),Bu({as:"button",memo:!0,useHook:rb})}),Ru,j_,C_,O_,Bne=w(()=>{Au(),zu(),Mu(),Ru=V(H()),f_(),Yv(),Ff(),Ane(),j_=[],C_=qu({name:"Button",compose:rb,keys:j_,useProps:function(e,t){var n=t.ref,o=Ol(t,["ref"]),i=(0,Ru.useRef)(null),l=(0,Ru.useState)(void 0),u=l[0],c=l[1],d=(0,Ru.useState)("button"),p=d[0],h=d[1];return(0,Ru.useEffect)(function(){var b=i.current;b&&(Gv(b)||(b.tagName!=="A"&&c("button"),h(void 0)))},[]),ci({ref:c_(i,n),role:u,type:p},o)}}),O_=Bu({as:"button",memo:!0,useHook:C_})}),__,D_,T_,zne=w(()=>{Au(),zu(),Mu(),w_(),__=[],D_=qu({name:"Group",compose:Vf,keys:__,useProps:function(e,t){return ci({role:"group"},t)}}),T_=Bu({as:"div",useHook:D_})});function qne(){return Lf?document.body:null}var A_,Bl,Mne=w(()=>{A_=V(H()),eb(),Xv(),V(Io()),Bl=(0,A_.createContext)(qne())}),ob,Rne=w(()=>{typeof window<"u"&&(ob={get passive(){}},window.addEventListener("testPassive",null,ob),window.removeEventListener("testPassive",null,ob))}),di=w(()=>{V(H()),Ff(),Bne(),zne(),V(Io()),Mne(),Rne(),Qv()});function $e(e){let t=(0,ab.useMemo)(()=>{let i=e;return{get current(){return i},set current(l){i=l,o(l)}}},[]),[n,o]=(0,ab.useState)(()=>e);return[t,n]}var ab,Ze=w(()=>{ab=V(H())});function Fne(e){return t=>sn.default.createElement(F_,null,sn.default.createElement(e,F({},t)))}var sn,B_,z_,Qe,zl,q_,M_,R_,ib,lb,F_,tt=w(()=>{Ir(),fe(),fe(),sn=V(H()),B_=V(Io()),di(),Ze(),Qe=Gn(z_||(z_=j([`
  #pointer-root & {
    pointer-events: none;
  }
  #pointer-root.normal & {
    pointer-events: auto;
  }
`]))),zl={panel:{bg:"#282b2f",head:{title:{color:"#bbb"},punctuation:{color:"#808080"}},body:{compoudThing:{label:{get color(){return Cl(.6,zl.panel.bg)}}}}}},M_=typeof window<"u"?Q5(q_||(q_=j([`
  :host {
    all: initial;
    color: white;
    font: 11px -apple-system, BlinkMacSystemFont, Segoe WPC, Segoe Editor,
      HelveticaNeue-Light, Ubuntu, Droid Sans, sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    list-style: none;
  }
`]))):{},ib=C.div(R_||(R_=j([`
  z-index: 51;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
`]))),lb=e=>sn.default.createElement($5,{disableVendorPrefixes:!0,target:e.target},sn.default.createElement(sn.default.Fragment,null,sn.default.createElement(M_,null),e.children)),F_=e=>{let[t,n]=(0,sn.useState)(null),[o,i]=(0,sn.useState)(null);(0,sn.useLayoutEffect)(()=>{if(!t)return;let{parentNode:c}=t;if(!c)return;let d=c.shadowRoot?parent.shadowRoot:c.attachShadow({mode:"open"});i(d)},[t]);let[l,u]=$e(void 0);return o?B_.default.createPortal(sn.default.createElement(lb,{target:o},sn.default.createElement(sn.default.Fragment,null,sn.default.createElement(ib,{ref:l}),sn.default.createElement(Bl.Provider,{value:u},e.children))),o):sn.default.createElement("template",{ref:n,"shadow-root":"open"},e.children)}}),fi,L_,N_,sb,V_,Uf,K_,U_,H_,$_,Hf,ro,da=w(()=>{tt(),fe(),fi={get outlinePanel(){return 1},get propsPanel(){return fi.outlinePanel},get sequenceEditorPanel(){return this.outlinePanel-1},get toolbar(){return this.outlinePanel+1},get pluginPanes(){return this.sequenceEditorPanel-1}},L_=zl.panel.bg,sb=C.span(N_||(N_=j([`
  white-space: nowrap;
`]))),Uf=C.span(V_||(V_=j([`
  white-space: nowrap;
  color: `,`;
`])),zl.panel.head.punctuation.color),U_=C.div(K_||(K_=j([`
  background: `,`;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0;
`])),L_),H_=18,Hf=C.div($_||($_=j([`
  height: `,`px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  color: #adadadb3;
  border-bottom: 1px solid rgb(0 0 0 / 13%);
  background-color: #25272b;
  font-size: 10px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`])),H_),ro=100}),W_,jr,ql=w(()=>{W_=()=>{},jr=W_});function Lne(e){return ub.createElement("svg",F({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),ub.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M1.775 2.781a.5.5 0 01.5.5v1.7H4.67c.108-.957.92-1.7 1.905-1.7h6.608a1.917 1.917 0 110 3.834H6.574c-.78 0-1.452-.466-1.751-1.135H2.275v5.03h2.39a2.032 2.032 0 012.023-1.854h6.38a2.031 2.031 0 110 4.063h-6.38c-.83 0-1.543-.497-1.858-1.21H1.775a.5.5 0 01-.5-.5V3.281a.5.5 0 01.5-.5zm4.799 1.5h6.608a.917.917 0 110 1.834H6.574a.917.917 0 110-1.834zm.114 5.875h6.38a1.031 1.031 0 110 2.063h-6.38a1.032 1.032 0 110-2.063z",fill:"currentColor"}))}var ub,G_,Nne=w(()=>{ub=V(H()),G_=Lne});function Vne(e){return cb.createElement("svg",F({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),cb.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8 10.5L4 6.654 5.2 5.5 8 8.385 10.8 5.5 12 6.654 8 10.5z",fill:"currentColor"}))}var cb,Y_,Kne=w(()=>{cb=V(H()),Y_=Vne});function Une(e){return db.createElement("svg",F({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),db.createElement("path",{d:"M8.339 4.5l-2.055.644 4.451 1.393v2.748l-2.966.928-2.504-.783V6.738l2.42.758 2.055-.644-4.458-1.395L4 5.858v4.463L7.768 11.5 12 10.175V5.646L8.339 4.5z",fill:"currentColor"}))}var db,fb,Hne=w(()=>{db=V(H()),fb=Une});function $ne(e){return pb.createElement("svg",F({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),pb.createElement("path",{d:"M6.8 11.6a.6.6 0 00.6-.6V7.4a.6.6 0 00-1.2 0V11a.6.6 0 00.6.6zm6-7.2h-2.4v-.6A1.8 1.8 0 008.6 2H7.4a1.8 1.8 0 00-1.8 1.8v.6H3.2a.6.6 0 100 1.2h.6v6.6A1.8 1.8 0 005.6 14h4.8a1.8 1.8 0 001.8-1.8V5.6h.6a.6.6 0 100-1.2zm-6-.6a.6.6 0 01.6-.6h1.2a.6.6 0 01.6.6v.6H6.8v-.6zm4.2 8.4a.6.6 0 01-.6.6H5.6a.6.6 0 01-.6-.6V5.6h6v6.6zm-1.8-.6a.6.6 0 00.6-.6V7.4a.6.6 0 00-1.2 0V11a.6.6 0 00.6.6z",fill:"currentColor"}))}var pb,hb,Wne=w(()=>{pb=V(H()),hb=$ne}),$f=w(()=>{Nne(),Kne(),Hne(),Wne()}),oo,Q_,Wf,X_,J_,Z_,e3,t3,n3,r3,o3,a3,i3,l3,s3,u3,c3,d3,mb,f3=w(()=>{oo=V(H()),fe(),ql(),tt(),$f(),Wf=C.li(Q_||(Q_=j([`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
`]))),J_=C.div(X_||(X_=j([""]))),e3=C(J_)(Z_||(Z_=j([`
  position: relative;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: calc(4px + var(--depth) * 16px);
  padding-left: 4px;
  padding-right: 8px;
  gap: 4px;
  height: 21px;
  line-height: 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  pointer-events: none;
  white-space: nowrap;

  border-radius: 2px;
  box-shadow: 0 3px 4px -1px rgba(0, 0, 0, 0.48);

  color: rgba(255, 255, 255, 0.9);
  background: rgba(40, 43, 47, 0.65);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &.descendant-is-selected {
    background: rgba(29, 53, 59, 0.7);
  }

  `,`;
  &:not(.not-selectable):not(.selected):hover {
    background: rgba(59, 63, 69, 0.9);

    border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  }

  &:not(.not-selectable):not(.selected):active {
    background: rgba(82, 88, 96, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  }

  &.selected {
    background: rgba(30, 88, 102, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  @supports not (backdrop-filter: blur()) {
    background: rgba(40, 43, 47, 0.95);
  }
`])),Qe),n3=Gn(t3||(t3=j([`
  font-weight: 500;
  font-size: 11px;
  & {
  }
`]))),o3=C.span(r3||(r3=j([`
  `,`;

  `,`;
  position: relative;
  // Compensate for border bottom
  top: 0.5px;
  display: flex;
  height: 20px;
  align-items: center;
  box-sizing: border-box;
`])),n3,Qe),i3=C.div(a3||(a3=j([`
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: 0.99;
`]))),s3=C.span(l3||(l3=j([`
  font-size: 9px;
  position: relative;
  display: block;
  transition: transform 0.1s ease-out;

  &:hover {
    transform: rotate(-20deg);
  }

  `,`.collapsed & {
    transform: rotate(-90deg);

    &:hover {
      transform: rotate(-70deg);
    }
  }
`])),Wf),c3=C.ul(u3||(u3=j([`
  margin: 0;
  padding: 0;
  list-style: none;

  `,`.collapsed & {
    display: none;
  }
`])),Wf),d3=({label:e,children:t,depth:n,select:o,selectionStatus:i,labelDecoration:l,collapsed:u=!1,setIsCollapsed:c,draggable:d,onDragStart:p,onDragEnd:h})=>{let b=t!==void 0;return oo.default.createElement(Wf,{style:{"--depth":n},className:u?"collapsed":""},oo.default.createElement(e3,{className:i,onClick:o??jr,"data-header":!0,draggable:d,onDragStart:p,onDragEnd:h},oo.default.createElement(i3,null,b?oo.default.createElement(s3,{onClick:g=>{g.stopPropagation(),g.preventDefault(),c?.(!u)}},oo.default.createElement(Y_,null)):oo.default.createElement(fb,null)),oo.default.createElement(o3,null,oo.default.createElement("span",null,e)),l),b&&oo.default.createElement(c3,null,t))},mb=d3});function Gne(e){return Object.keys(e)}function Yne(e){return Object.keys((0,ao.val)(e.sheetTemplatesP))}function Qne(){let e=sr(ur().filter(t=>Zr(t)||jt(t)).map(t=>jt(t)?t.sheet:t))[0];if(e)return e.getSequence()}var ao,ur,p3,Ml=w(()=>{ao=ge.requireDist(),Ja(),Qt(),Pe(),ur=()=>{var e;let t=(0,ao.val)(Z().projectsP),n=((e=(0,ao.val)(Z().atomP.historic.panels.outlinePanel.selection))!=null?e:[]).map(o=>{let i=t[o.projectId];if(!i)return;if(o.type==="Project")return i;if(!(0,ao.val)(i.sheetTemplatesP[o.sheetId]))return;let l=p3(i,o.sheetId);if(!l)return;if(o.type==="Sheet")return l;let u=(0,ao.val)(l.objectsP[o.objectKey]);if(u)return u});return sr(n.filter(o=>typeof o<"u"))},p3=(e,t)=>{let n=Z().atomP.historic.projects.stateByProjectId[e.address.projectId],o=(0,ao.val)(n.stateBySheetId[t].selectedInstanceId),i=(0,ao.val)(e.sheetTemplatesP[t]);if(i){if(o)return(0,ao.val)(i.instancesP[o]);{let l=(0,ao.val)(i.instancesP);return l[Gne(l)[0]]}}}}),Fu,h3,Xne=w(()=>{Pe(),Ml(),_e(),Fu=V(H()),f3(),h3=({sheet:e,depth:t})=>{let n=(0,Fu.useCallback)(()=>{Z().transaction(({stateEditors:l})=>{l.studio.historic.panels.outline.selection.set([e])})},[e]),o=(0,Fu.useCallback)(l=>{let u={type:"theatre-sheet",projectId:e.address.projectId,sheetId:e.address.sheetId,sheetInstanceId:e.address.sheetInstanceId};l.dataTransfer.setData("application/json",JSON.stringify(u)),l.dataTransfer.effectAllowed="copy",document.body.classList.add("dragging-sheet")},[e]),i=(0,Fu.useCallback)(()=>{document.body.classList.remove("dragging-sheet")},[]);return Ne(()=>{let l=ur();return Fu.default.createElement(mb,{depth:t,select:n,selectionStatus:l.some(u=>u===e)?"selected":l.some(u=>u.type==="Theatre_SheetObject"&&u.sheet===e)?"descendant-is-selected":"not-selected",label:"".concat(e.address.sheetId,": ").concat(e.address.sheetInstanceId),draggable:!0,onDragStart:o,onDragEnd:i})},[t,o,i])}}),gb,Rl,m3,g3,v3,b3,Jne=w(()=>{_e(),gb=ge.requireDist(),Rl=V(H()),fe(),Xne(),C.div(m3||(m3=j([`
  display: flex;
`]))),C.li(g3||(g3=j([`
  color: `,`;
`])),e=>e.isSelected?"white":"hsl(1, 1%, 80%)"),C.div(v3||(v3=j([""]))),b3=({sheetId:e,depth:t,project:n})=>Ne(()=>{let o=(0,gb.val)(n.sheetTemplatesP[e]);if(!o)return Rl.default.createElement(Rl.default.Fragment,null);let i=(0,gb.val)(o.instancesP);return Rl.default.createElement(Rl.default.Fragment,null,Object.entries(i).map(([l,u])=>Rl.default.createElement(h3,{key:u.address.sheetInstanceId,sheet:u,depth:t})))},[t,e,n])}),Gf,y3,x3,Zne=w(()=>{Ml(),_e(),Gf=V(H()),Jne(),y3=({project:e,depth:t})=>Ne(()=>{if(!e)return null;let n=Yne(e);return Gf.default.createElement(Gf.default.Fragment,null,n.map(o=>Gf.default.createElement(b3,{depth:t,sheetId:o,key:"sheet-".concat(o),project:e})))},[e,t]),x3=y3});function ere(e){var t;let n=e.type==="namespace"?"namespace:".concat(e.sheet.address.sheetId,":").concat(e.path.join("/")):e.type==="Theatre_Project"?"project":e.type==="Theatre_Sheet"?"sheetInstance:".concat(e.address.sheetId,":").concat(e.address.sheetInstanceId):"unknown",o=e.type==="namespace"?e.sheet.address.projectId:e.address.projectId,i=(t=Me(Z().atomP.ahistoric.projects.stateByProjectId[o].collapsedItemsInOutline[n]))!=null?t:!1,l=(0,k3.useCallback)(u=>{Z().transaction(({stateEditors:c})=>{c.studio.ahistoric.projects.stateByProjectId.collapsedItemsInOutline.set({projectId:o,isCollapsed:u,itemKey:n})})},[n]);return{collapsed:i,setCollapsed:l}}var k3,tre=w(()=>{k3=V(H()),Pe(),_e()}),Lu,w3,S3,E3,P3,I3,nre=w(()=>{Lu=V(H()),f3(),Zne(),Pe(),_e(),Ml(),w3=ge.requireDist(),fe(),tre(),E3=C.div(S3||(S3=j([`
  color: #ff6363;
  margin-left: 11px;
  background: #4c282d;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 10px;
  box-shadow: 0 2px 8px -4px black;
`]))),P3=({depth:e,project:t})=>{let n=Ne(()=>ur(),[]),o=Ne(()=>{let c=t.address.projectId,d=(0,w3.val)(Z().atomP.ephemeral.coreByProject[c].loadingState);return d?.type==="browserStateIsNotBasedOnDiskState"},[t]),i=(0,Lu.useCallback)(()=>{Z().transaction(({stateEditors:c})=>{c.studio.historic.panels.outline.selection.set([t])})},[t]),{collapsed:l,setCollapsed:u}=ere(t);return Lu.default.createElement(mb,{depth:e,label:t.address.projectId,setIsCollapsed:u,collapsed:l,labelDecoration:o?Lu.default.createElement(E3,null,"Has Conflicts"):null,children:Lu.default.createElement(x3,{project:t,depth:e+1}),selectionStatus:n.includes(t)?"selected":n.some(c=>c.address.projectId===t.address.projectId)?"descendant-is-selected":"not-selected",select:i})},I3=P3}),j3,vb,C3,O3,_3,D3,rre=w(()=>{j3=ge.requireDist(),_e(),Pe(),vb=V(H()),fe(),nre(),O3=C.ul(C3||(C3=j([`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-right: 4px;
`]))),_3=e=>Ne(()=>{let t=(0,j3.val)(Z().projectsP);return vb.default.createElement(O3,null,Object.keys(t).map(n=>{let o=t[n];return vb.default.createElement(I3,{depth:0,project:o,key:"projectListItem-".concat(n)})}))},[]),D3=_3});function ore(e){let[t,n]=(0,bb.useState)(!1);return(0,bb.useEffect)(()=>{let o=l=>{let u=t?200:50,c=56,d=l.x<u;d&&(d=l.y>c),n(!!d)};document.addEventListener("mousemove",o);let i=()=>{n(!1)};return document.addEventListener("mouseleave",i),()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseleave",i)}},[t]),t}var bb,are=w(()=>{bb=V(H())}),Nu,Fl,yb,T3,A3,B3,z3,Yf,Vu,q3,ire=w(()=>{Nu=V(H()),fe(),da(),rre(),_e(),Pe(),are(),Fl=ge.requireDist(),tt(),yb="44px",A3=C.div(T3||(T3=j([`
  `,`;
  background-color: transparent;
  position: absolute;
  left: 8px;
  z-index: `,`;

  top: calc(`,` + 8px);
  height: fit-content;
  max-height: calc(100% - `,`);
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  display: `,`;

  &:hover {
    display: block;
  }

  // Create a small buffer on the bottom to aid selecting the bottom item in a long, scrolling list
  &::after {
    content: '';
    display: block;
    height: 20px;
  }
`])),Qe,fi.outlinePanel,yb,yb,({pin:e})=>e?"block":"none"),B3=()=>{var e;let t=(e=Me(Z().atomP.ahistoric.pinOutline))!=null?e:!0,n=Me(q3),o=ore();return(0,Nu.useLayoutEffect)(()=>{Yf.set(o)},[o]),(0,Nu.useEffect)(()=>()=>{Vu.set(!1),Yf.set(!1)},[]),Nu.default.createElement(A3,{pin:t||n,onMouseEnter:()=>{Vu.set(!0)},onMouseLeave:()=>{Vu.set(!1)}},Nu.default.createElement(D3,null))},z3=B3,Yf=new Fl.Atom(!1),Vu=new Fl.Atom(!1),q3=(0,Fl.prism)(()=>{let e=(0,Fl.val)(Vu.prism),t=(0,Fl.val)(Yf.prism);return e||t})});function lre(){let[e,t]=(0,xb.useState)(!1),n=(0,xb.useMemo)(()=>{let o=new Set;return()=>{let i=()=>{o.delete(i),t(o.size>0)};return o.add(i),t(!0),i}},[]);return[e,n]}var xb,sre=w(()=>{xb=V(H())}),M3,R3,F3,ure=w(()=>{M3=V(H()),R3=function(e){(0,M3.useEffect)(e,[])},F3=R3}),L3,N3,V3,cre=w(()=>{L3=V(H()),ure(),N3=function(e){var t=(0,L3.useRef)(e);t.current=e,F3(function(){return function(){return t.current()}})},V3=N3}),Qf,K3,U3,dre=w(()=>{Qf=V(H()),cre(),K3=function(e){var t=(0,Qf.useRef)(0),n=(0,Qf.useState)(e),o=n[0],i=n[1],l=(0,Qf.useCallback)(function(u){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){i(u)})},[]);return V3(function(){cancelAnimationFrame(t.current)}),[o,l]},U3=K3});function fre(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function pre(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var Xf,hre=w(()=>{Xf=typeof window<"u"}),H3,$3,Jf,kb=w(()=>{H3=V(H()),dre(),hre(),$3=function(e,t){e===void 0&&(e=1/0),t===void 0&&(t=1/0);var n=U3({width:Xf?window.innerWidth:e,height:Xf?window.innerHeight:t}),o=n[0],i=n[1];return(0,H3.useEffect)(function(){if(Xf){var l=function(){i({width:window.innerWidth,height:window.innerHeight})};return fre(window,"resize",l),function(){pre(window,"resize",l)}}},[]),o},Jf=$3}),wb,Zf,ep,Sb,Ll,W3,Eb,Nl=w(()=>{wb=ge.requireDist(),_e(),Pe(),sre(),Zf=V(H()),kb(),ep=(e,t)=>{let n=e.left/t.width,o=(e.left+e.width)/t.width,i=e.top/t.height,l=(e.height+e.top)/t.height;return{edges:{left:n<=.5?{from:"screenLeft",distance:n}:{from:"screenRight",distance:1-n},right:o<=.5?{from:"screenLeft",distance:o}:{from:"screenRight",distance:1-o},top:i<=.5?{from:"screenTop",distance:i}:{from:"screenBottom",distance:1-i},bottom:l<=.5?{from:"screenTop",distance:l}:{from:"screenBottom",distance:1-l}}}},Sb=Zf.default.createContext(null),Ll=()=>(0,Zf.useContext)(Sb),W3=({panelId:e,children:t,defaultPosition:n,minDims:o})=>{let i=Jf(800,200),[l,u]=lre(),{stuff:c}=Ne(()=>{var d;let{edges:p}=(d=(0,wb.val)(Z().atomP.historic.panelPositions[e]))!=null?d:n,h=Math.floor(i.width*(p.left.from==="screenLeft"?p.left.distance:1-p.left.distance)),b=Math.floor(i.width*(p.right.from==="screenLeft"?p.right.distance:1-p.right.distance)),g=Math.floor(i.height*(p.top.from==="screenTop"?p.top.distance:1-p.top.distance)),m=Math.floor(i.height*(p.bottom.from==="screenTop"?p.bottom.distance:1-p.bottom.distance)),y=Math.max(b-h,o.width),x=Math.max(m-g,o.height);return{stuff:{dims:wb.prism.memo("dims",()=>({width:y,left:h,top:g,height:x}),[y,h,g,x]),panelId:e,minDims:o,boundsHighlighted:l,addBoundsHighlightLock:u}}},[e,i,l,u]);return Zf.default.createElement(Sb.Provider,{value:c},t)},Eb=W3}),_o,G3,Cr,Y3,Q3,X3,J3,Pb,Z3,Dn,e4,un=w(()=>{_o=V(H()),fe(),G3="pointer-root",Cr="--lockedCursor",Q3=C.div(Y3||(Y3=j([`
  pointer-events: auto;
  &.normal {
    pointer-events: none;
  }
`]))),J3=C.div(X3||(X3=j([`
  position: absolute;
  inset: 0;
  pointer-events: none;

  #pointer-root:not(.normal) > & {
    pointer-events: auto;
  }
`]))),Pb=(0,_o.createContext)({}),Z3=e=>{var t,n,o,i;let[l,u]=(0,_o.useState)([]),c=(0,_o.useMemo)(()=>({getLock:(p,h)=>{let b={className:p,cursor:h};return u(g=>[...g,b]),()=>{u(g=>g.filter(m=>m!==b))}}}),[]),d=(n=(t=l[0])==null?void 0:t.cursor)!=null?n:"";return _o.default.createElement(Pb.Provider,{value:c},_o.default.createElement(Q3,{id:G3,className:((i=(o=l[0])==null?void 0:o.className)!=null?i:"normal")+" "+e.className},_o.default.createElement(J3,{style:{cursor:d,[Cr]:d}},e.children)))},Dn=(e,t,n)=>{let o=(0,_o.useContext)(Pb);(0,_o.useLayoutEffect)(()=>{if(e)return o.getLock(t,n)},[e,t,n])},e4=Z3});function t4(e){return Ku.default.createElement(Ib.Provider,{value:e.logger},e.children)}function Vl(e,t){let n=(0,Ku.useContext)(Ib);return(0,Ku.useMemo)(()=>e?n.named(e,t):n,[n,e,t])}var Ku,Ib,pi=w(()=>{Ku=V(H()),Ib=Ku.default.createContext(null)});function mre(){let e=Vl("PointerCapturing"),t=Or.default.useRef(null),n=()=>t.current!=null;return o=>{let i,l=u=>(i=u,t.current=u,u);return{capturing:{capturePointer(u){if(e._debug("Capturing pointer",{forDebugName:o,reason:u}),t.current!=null)throw new Error('"'.concat(o,'" attempted capturing pointer for "').concat(u,'" while already captured by "').concat(t.current.debugOwnerName,'" for "').concat(t.current.debugReason,'"'));let c=l({debugOwnerName:o,debugReason:u});return{isCapturing(){return c===t.current},release(){return c===t.current?(e._debug("Releasing pointer",{forDebugName:o,reason:u}),l(null),!0):!1}}},isPointerBeingCaptured:n},forceRelease(){i&&t.current===i&&(e._debug("Force releasing pointer",{localCapture:i}),l(null))}}}}function gre(e){let t=mre();return Or.default.createElement(jb.Provider,{value:t},Or.default.createElement(r4,{children:e.children}))}function n4(e){let t=(0,Or.useContext)(jb),n=(0,Or.useMemo)(()=>t(e),[e,t]);return(0,Or.useEffect)(()=>()=>{n.forceRelease()},[n]),n.capturing}var Or,jb,r4,Cb=w(()=>{Or=V(H()),pi(),jb=Or.default.createContext(null),r4=Or.default.memo(({children:e})=>Or.default.createElement(Or.default.Fragment,null,e))}),Ob,vre=w(()=>{Ob=typeof window<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent)});function pt(e,t){let n=(0,Kl.useRef)(t);n.current=t;let o=t.shouldPointerLock&&!Ob,i=(0,Kl.useRef)({domDragStarted:!1}),{capturePointer:l}=n4("useDrag for ".concat(t.debugName)),u=(0,Kl.useRef)({onDrag:jr,onDragEnd:jr,onClick:jr}),c=(0,Kl.useRef)(),[d,p]=$e(!1);return(0,Kl.useLayoutEffect)(()=>{if(!e)return;let h=()=>{let P=i.current.domDragStarted&&i.current.detection.detected;d.current!==P&&(d.current=P)},b=P=>{if(!i.current.domDragStarted)return;let O=i.current;if(!bre(P,O)&&(O.detection.detected||(O.detection.totalDistanceMoved+=Math.abs(P.movementY)+Math.abs(P.movementX),O.detection.totalDistanceMoved>o4&&(o&&e.requestPointerLock(),O.detection={detected:!0,dragMovement:{x:0,y:0},dragEventCount:0},h())),O.detection.detected)){O.detection.dragEventCount+=1;let{dragMovement:z}=O.detection;if(o)z.x+=P.movementX,z.y+=P.movementY;else{let{startPos:B}=O;z.x=P.screenX-B.x,z.y=P.screenY-B.y}u.current.onDrag(z.x,z.y,P,P.movementX,P.movementY)}},g=P=>{if(y(),!i.current.domDragStarted)return;let O=i.current.detection.detected;i.current={domDragStarted:!1},t.shouldPointerLock&&!Ob&&document.exitPointerLock(),u.current.onDragEnd(O),window.focus(),O||u.current.onClick(P),h()},m=()=>{document.addEventListener("mousemove",b),document.addEventListener("mouseup",g)},y=()=>{var P;(P=c.current)==null||P.release(),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",g)},x=P=>{n.current.disabled||i.current.domDragStarted&&i.current.detection.detected&&(n.current.dontBlockMouseDown||(P.stopPropagation(),P.preventDefault()),i.current.detection={detected:!1,totalDistanceMoved:0},h())},S=P=>{var O,z,B,D;(O=c.current)==null||O.release();let X=n.current;if(X.disabled===!0||!((z=X.buttons)!=null?z:[0]).includes(P.button))return;let M=X.onDragStart(P);M!==!1&&(u.current.onDrag=M.onDrag,u.current.onDragEnd=(B=M.onDragEnd)!=null?B:jr,u.current.onClick=(D=M.onClick)!=null?D:jr,c.current=l("Drag start"),X.dontBlockMouseDown||(P.stopPropagation(),P.preventDefault()),i.current={domDragStarted:!0,startPos:{x:P.screenX,y:P.screenY},detection:{detected:!1,totalDistanceMoved:0}},h(),m())},E=P=>{S(P)};return e.addEventListener("mousedown",E),e.addEventListener("click",x),()=>{var P,O;y(),e.removeEventListener("mousedown",E),e.removeEventListener("click",x),i.current.domDragStarted&&((O=(P=u.current).onDragEnd)==null||O.call(P,i.current.detection.detected)),i.current={domDragStarted:!1},h()}},[e]),Dn(p&&!!t.lockCSSCursorTo,"dragging",t.lockCSSCursorTo),[p]}function bre(e,t){return(!t.detection.detected||t.detection.detected&&t.detection.dragEventCount<3)&&(Math.abs(e.movementX)>_b||Math.abs(e.movementY)>_b)}var Kl,o4,_b,Ct=w(()=>{Kl=V(H()),un(),Cb(),ql(),vre(),Ze(),o4=3,_b=100}),Uu,a4,i4,l4,Db,s4=w(()=>{Ze(),Pe(),Ct(),Uu=V(H()),fe(),Nl(),un(),Qt(),da(),i4=C.div(a4||(a4=j([`
  cursor: move;
`]))),l4=e=>{let t=Ll(),n=(0,Uu.useRef)(t);n.current=t;let[o,i]=$e(null),l=(0,Uu.useMemo)(()=>({debugName:"PanelDragZone",lockCursorTo:"move",onDragStart(){let p=n.current,h,b=t.addBoundsHighlightLock(),g=p.panelId;if(g.startsWith("pane-")){let m=g.slice(5);Z().paneManager.bringPaneToFront(m)}return{onDrag(m,y){let x=ne(F({},p.dims),{top:at(p.dims.top+y,0,window.innerHeight-ro),left:at(p.dims.left+m,-p.dims.width+ro,window.innerWidth-ro)}),S=ep(x,{width:window.innerWidth,height:window.innerHeight});h?.discard(),h=Z().tempTransaction(({stateEditors:E})=>{E.studio.historic.panelPositions.setPanelPosition({position:S,panelId:p.panelId})})},onDragEnd(m){b(),m?h?.commit():h?.discard()}}}}),[]),[u]=pt(i,l);Dn(u,"dragging","move");let[c,d]=(0,Uu.useMemo)(()=>{let p;return[function(){if(p){let h=p;p=void 0,h()}p=t.addBoundsHighlightLock()},function(){if(p){let h=p;p=void 0,h()}}]},[]);return Uu.default.createElement(i4,ne(F({},e),{ref:o,onMouseEnter:c,onMouseLeave:d}))},Db=l4}),Hu,Tb,u4,Ab,c4,Bb,d4,zb,f4,p4,h4,m4,g4,qb,v4,b4,y4,x4,k4,$u,w4,S4,E4,P4,I4,j4,C4,O4,_4,Mb,D4,Do,yre=w(()=>{Ze(),Pe(),Ct(),Ir(),Hu=V(H()),fe(),Nl(),tt(),Qt(),da(),Tb=ge.requireDist(),Ab=C.div(u4||(u4=j([`
  position: absolute;
  `,`;
  &:after {
    position: absolute;
    inset: -5px;
    display: block;
    content: ' ';
  }

  opacity: 0;
  background-color: #478698;

  &.isHighlighted {
    opacity: 0.7;
  }

  &.isDragging {
    opacity: 1;
    /* background-color: `,`; */
  }

  &:hover {
    opacity: 1;
  }
`])),Qe,Cl(.2,"#478698")),Bb=C(Ab)(c4||(c4=j([`
  /**
  The horizintal/vertical resize handles have z-index:-1 and are offset 1px outside of the panel
  to make sure they don't occlude any element that pops out of the panel (like the Playhead in SequenceEditorPanel).

  This means that panels will always need an extra 1px margin for their resize handles to be visible, but that's not a problem
  that we have to deal with right now (if it is at all a problem).
  
   */
  z-index: -1;
`]))),zb=C(Bb)(d4||(d4=j([`
  left: 0px;
  right: 0px;
  height: 1px;
`]))),p4=C(zb)(f4||(f4=j([`
  top: -1px;
`]))),m4=C(zb)(h4||(h4=j([`
  bottom: -1px;
`]))),qb=C(Bb)(g4||(g4=j([`
  z-index: -1;
  top: -1px;
  bottom: -1px;
  width: 1px;
`]))),b4=C(qb)(v4||(v4=j([`
  left: -1px;
`]))),x4=C(qb)(y4||(y4=j([`
  right: -1px;
`]))),$u=C(Ab)(k4||(k4=j([`
  // The angles have z-index: 10 to make sure they _do_ occlude other elements in the panel.
  z-index: 10;
  width: 8px;
  height: 8px;
`]))),S4=C($u)(w4||(w4=j([`
  top: 0;
  left: 0;
`]))),P4=C($u)(E4||(E4=j([`
  top: 0;
  right: 0;
`]))),j4=C($u)(I4||(I4=j([`
  bottom: 0;
  left: 0;
`]))),O4=C($u)(C4||(C4=j([`
  bottom: 0;
  right: 0;
`]))),_4={Top:p4,TopLeft:S4,TopRight:P4,Bottom:m4,BottomLeft:j4,BottomRight:O4,Left:b4,Right:x4},Mb={Top:"ns-resize",Bottom:"ns-resize",Left:"ew-resize",Right:"ew-resize",TopLeft:"nw-resize",TopRight:"ne-resize",BottomLeft:"sw-resize",BottomRight:"se-resize"},D4=({which:e})=>{let t=Ll(),n=(0,Hu.useRef)(t);n.current=t;let o=(0,Hu.useRef)(0),[i,l]=$e(null),u=(0,Hu.useMemo)(()=>({debugName:"PanelResizeHandle",lockCursorTo:Mb[e],onDragStart(){var h;let b,g=n.current,m=t.addBoundsHighlightLock();return o.current=(h=(0,Tb.val)(Z().atomP.historic.panels.sequenceEditor.dopesheetLeftWidth))!=null?h:225,{onDrag(y,x){var S;let E=(S=(0,Tb.val)(Z().atomP.historic.panels.sequenceEditor.rightPanelOpen))!=null?S:!0,P=F({},g.dims);if(e.startsWith("Bottom"))P.height=Math.max(P.height+x,g.minDims.height);else if(e.startsWith("Top")){let z=P.top+P.height,B=at(P.top+x,0,Math.min(z-g.minDims.height,window.innerHeight-ro)),D=z-B;P.height=D,P.top=B}if(e.endsWith("Left")){let z=P.left+P.width,B=Math.min(P.left+y,Math.min(z-g.minDims.width,window.innerWidth-ro)),D=z-B;P.width=D,P.left=B}else e.endsWith("Right")&&(P.width=Math.max(P.width+y,Math.max(g.minDims.width,ro-g.dims.left)));let O=ep(P,{width:window.innerWidth,height:window.innerHeight});b?.discard(),b=Z().tempTransaction(({stateEditors:z})=>{if(!E&&(e==="BottomRight"||e==="TopRight")&&g.panelId==="sequenceEditor"){let B=Math.max(225,o.current+y);z.studio.historic.panels.sequenceEditor.setDopesheetLeftWidth(B)}z.studio.historic.panelPositions.setPanelPosition({position:O,panelId:g.panelId})})},onDragEnd(y){m(),y?b?.commit():b?.discard()}}}}),[e]),[c]=pt(l,u),d=_4[e],p=e.length<=6;return Hu.default.createElement(d,{ref:i,className:[c?"isDragging":"",t.boundsHighlighted&&p?"isHighlighted":""].join(" "),style:{cursor:Mb[e]}})},Do=D4}),_r,T4,A4,xre=w(()=>{_r=V(H()),yre(),T4=e=>_r.default.createElement(_r.default.Fragment,null,_r.default.createElement(Do,{which:"Bottom"}),_r.default.createElement(Do,{which:"Top"}),_r.default.createElement(Do,{which:"Left"}),_r.default.createElement(Do,{which:"Right"}),_r.default.createElement(Do,{which:"TopLeft"}),_r.default.createElement(Do,{which:"TopRight"}),_r.default.createElement(Do,{which:"BottomLeft"}),_r.default.createElement(Do,{which:"BottomRight"})),A4=T4}),tp,B4,z4,q4,Rb,M4=w(()=>{tt(),tp=V(H()),fe(),Nl(),xre(),z4=C.div(B4||(B4=j([`
  position: absolute;
  user-select: none;
  box-sizing: border-box;
  `,`;
  /* box-shadow: 1px 2px 10px -5px black; */

  z-index: 1000;
`])),Qe),q4=tp.default.forwardRef((e,t)=>{let n=Ll(),o=e,{style:i,children:l}=o,u=nu(o,["style","children"]);return tp.default.createElement(z4,ne(F({ref:t},u),{style:F({width:n.dims.width+"px",height:n.dims.height+"px",top:n.dims.top+"px",left:n.dims.left+"px"},i??{})}),tp.default.createElement(A4,null),l)}),Rb=q4}),kre=Te((e,t)=>{(function(n,o){typeof e=="object"&&typeof t<"u"?o(e,H()):(n=typeof globalThis<"u"?globalThis:n||self,o(n.ReactErrorBoundary={},n.React))})(e,function(n,o){function i(m){if(m&&m.__esModule)return m;var y=Object.create(null);return m&&Object.keys(m).forEach(function(x){if(x!=="default"){var S=Object.getOwnPropertyDescriptor(m,x);Object.defineProperty(y,x,S.get?S:{enumerable:!0,get:function(){return m[x]}})}}),y.default=m,Object.freeze(y)}var l=i(o);function u(m,y){return u=Object.setPrototypeOf||function(x,S){return x.__proto__=S,x},u(m,y)}function c(m,y){m.prototype=Object.create(y.prototype),m.prototype.constructor=m,u(m,y)}var d=function(m,y){return m===void 0&&(m=[]),y===void 0&&(y=[]),m.length!==y.length||m.some(function(x,S){return!Object.is(x,y[S])})},p={error:null},h=function(m){c(y,m);function y(){for(var S,E=arguments.length,P=new Array(E),O=0;O<E;O++)P[O]=arguments[O];return S=m.call.apply(m,[this].concat(P))||this,S.state=p,S.updatedWithError=!1,S.resetErrorBoundary=function(){for(var z,B=arguments.length,D=new Array(B),X=0;X<B;X++)D[X]=arguments[X];S.props.onReset==null||(z=S.props).onReset.apply(z,D),S.reset()},S}y.getDerivedStateFromError=function(S){return{error:S}};var x=y.prototype;return x.reset=function(){this.updatedWithError=!1,this.setState(p)},x.componentDidCatch=function(S,E){var P,O;(P=(O=this.props).onError)==null||P.call(O,S,E)},x.componentDidMount=function(){var S=this.state.error;S!==null&&(this.updatedWithError=!0)},x.componentDidUpdate=function(S){var E=this.state.error,P=this.props.resetKeys;if(E!==null&&!this.updatedWithError){this.updatedWithError=!0;return}if(E!==null&&d(S.resetKeys,P)){var O,z;(O=(z=this.props).onResetKeysChange)==null||O.call(z,S.resetKeys,P),this.reset()}},x.render=function(){var S=this.state.error,E=this.props,P=E.fallbackRender,O=E.FallbackComponent,z=E.fallback;if(S!==null){var B={error:S,resetErrorBoundary:this.resetErrorBoundary};if(l.isValidElement(z))return z;if(typeof P=="function")return P(B);if(O)return l.createElement(O,B);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},y}(l.Component);function b(m,y){var x=function(E){return l.createElement(h,y,l.createElement(m,E))},S=m.displayName||m.name||"Unknown";return x.displayName="withErrorBoundary("+S+")",x}function g(m){var y=l.useState(null),x=y[0],S=y[1];if(m!=null)throw m;if(x!=null)throw x;return S}n.ErrorBoundary=h,n.useErrorHandler=g,n.withErrorBoundary=b,Object.defineProperty(n,"__esModule",{value:!0})})}),wre=w(()=>{}),Fb,Lb,Nb,R4=w(()=>{Fb=V(H()),Lb={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Nb=Fb.default.createContext&&Fb.default.createContext(Lb)});function F4(e){return e&&e.map(function(t,n){return Hl.default.createElement(t.tag,To({key:n},t.attr),F4(t.child))})}function Ul(e){return function(t){return Hl.default.createElement(Sre,To({attr:To({},e.attr)},t),F4(e.child))}}function Sre(e){var t=function(n){var o=e.attr,i=e.size,l=e.title,u=L4(e,["attr","size","title"]),c=i||n.size||"1em",d;return n.className&&(d=n.className),e.className&&(d=(d?d+" ":"")+e.className),Hl.default.createElement("svg",To({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,o,u,{className:d,style:To(To({color:e.color||n.color},n.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),l&&Hl.default.createElement("title",null,l),e.children)};return Nb!==void 0?Hl.default.createElement(Nb.Consumer,null,function(n){return t(n)}):t(Lb)}var Hl,To,L4,Ere=w(()=>{Hl=V(H()),R4(),To=function(){return To=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},To.apply(this,arguments)},L4=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n}}),Tt=w(()=>{wre(),Ere(),R4()}),Pre=w(()=>{Tt()}),Ire=w(()=>{Tt()});function jre(e){return Ul({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"}}]})(e)}var Cre=w(()=>{Tt()}),Ore=w(()=>{Tt()}),_re=w(()=>{Tt()});function Dre(e){return Ul({attr:{viewBox:"0 0 8 16"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"}}]})(e)}function Tre(e){return Ul({attr:{viewBox:"0 0 8 16"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"}}]})(e)}var Are=w(()=>{Tt()}),Bre=w(()=>{Tt()}),zre=w(()=>{Tt()}),qre=w(()=>{Tt()}),Mre=w(()=>{Tt()}),Rre=w(()=>{Tt()}),Fre=w(()=>{Tt()}),Lre=w(()=>{Tt()}),Nre=w(()=>{Tt()}),Vre=w(()=>{Tt()});function Kre(e){return Ul({attr:{fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 5l7 7-7 7"}}]})(e)}var Ure=w(()=>{Tt()}),Hre=w(()=>{Tt()}),$re=w(()=>{Tt()}),Wre=w(()=>{Tt()});function Gre(e){return Ul({attr:{viewBox:"0 0 24 24",fill:"none"},child:[{tag:"path",attr:{d:"M6 9.65685L7.41421 11.0711L11.6569 6.82843L15.8995 11.0711L17.3137 9.65685L11.6569 4L6 9.65685Z",fill:"currentColor"}},{tag:"path",attr:{d:"M6 14.4433L7.41421 13.0291L11.6569 17.2717L15.8995 13.0291L17.3137 14.4433L11.6569 20.1001L6 14.4433Z",fill:"currentColor"}}]})(e)}var Yre=w(()=>{Tt()});function Qre(e){return Ul({attr:{viewBox:"0 0 16 16",fill:"currentColor"},child:[{tag:"path",attr:{d:"M14 10.44l-.413.56H2.393L2 10.46 7.627 5h.827L14 10.44z"}}]})(e)}var Xre=w(()=>{Tt()}),Wu=w(()=>{Pre(),Ire(),Cre(),Ore(),_re(),Are(),Bre(),zre(),qre(),Mre(),Rre(),Fre(),Lre(),Nre(),Vre(),Ure(),Hre(),$re(),Wre(),Yre(),Xre()}),Nt,N4,V4,K4,U4,H4,$4,W4,G4,Y4,Q4,X4,J4,Z4,eD,tD,nD,rD,oD,aD,Jre=w(()=>{Nt=V(H()),fe(),da(),Nl(),s4(),M4(),N4=V(kre()),Wu(),Pe(),da(),_e(),V4={edges:{left:{from:"screenLeft",distance:.3},right:{from:"screenRight",distance:.3},top:{from:"screenTop",distance:.3},bottom:{from:"screenBottom",distance:.3}}},K4={width:300,height:300},U4=({paneInstance:e})=>Nt.default.createElement(Eb,{panelId:"pane-".concat(e.instanceId),defaultPosition:V4,minDims:K4},Nt.default.createElement(oD,{paneInstance:e})),$4=C(Rb)(H4||(H4=j([`
  display: flex;
  flex-direction: column;

  box-shadow: 0px 5px 12px -4px rgb(0 0 0 / 22%);
  z-index: `,`;
`])),e=>e.$zIndex),G4=C.div(W4||(W4=j([`
  width: 100%;
`]))),Q4=C.div(Y4||(Y4=j([`
  display: flex;
  align-items: center;
  opacity: 1;
  position: absolute;
  right: 4px;
  top: 0;
  bottom: 0;
`]))),J4=C.button(X4||(X4=j([`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  font-size: 11px;
  height: 10px;
  width: 18px;
  color: #adadadb3;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: white;
  }
`]))),eD=C(U_)(Z4||(Z4=j([`
  position: relative;
  overflow: hidden;

  &:after {
    z-index: 10;
    position: absolute;
    inset: 0;
    display: block;
    content: ' ';
    pointer-events: none;

    #pointer-root:not(.normal) & {
      pointer-events: auto;
    }
  }
`]))),nD=C.div(tD||(tD=j([`
  padding: 12px;

  & > pre {
    border: 1px solid #ff62624f;
    background-color: rgb(255 0 0 / 5%);
    margin: 8px 0;
    padding: 8px;
    font-family: monospace;
    overflow: scroll;
    color: #ff9896;
  }
`]))),rD=e=>Nt.default.createElement(nD,null,"An Error occurred rendering this pane. Open the console for more info.",Nt.default.createElement("pre",null,JSON.stringify({message:e.error.message,stack:e.error.stack},null,2))),oD=({paneInstance:e})=>{var t;let[n,o]=(0,Nt.useState)(null),i=e.definition.mount;(0,Nt.useLayoutEffect)(()=>{if(!n)return;let p=i({paneId:e.instanceId,node:n});if(typeof p=="function")return p},[n,i,e.instanceId]);let l=(0,Nt.useCallback)(()=>{Z().paneManager.destroyPane(e.instanceId)},[e]),u=(0,Nt.useCallback)(()=>{Z().paneManager.bringPaneToFront(e.instanceId)},[e]),c=((t=Me(Z().atomP.historic.paneFocusOrder))!=null?t:[]).indexOf(e.instanceId),d=c>=0?fi.pluginPanes+c:fi.pluginPanes;return Nt.default.createElement($4,{"data-testid":"theatre-pane-wrapper-".concat(e.instanceId),$zIndex:d,onMouseDown:u},Nt.default.createElement(Db,null,Nt.default.createElement(Hf,null,Nt.default.createElement(Q4,null,Nt.default.createElement(J4,{onClick:l,title:"Close Pane"},Nt.default.createElement(jre,null))),Nt.default.createElement(G4,null,e.instanceId))),Nt.default.createElement(N4.ErrorBoundary,{FallbackComponent:rD},Nt.default.createElement(eD,{"data-testid":"theatre-pane-content-".concat(e.instanceId),ref:o})))},aD=U4});function $l(e){return JSON.stringify(Vb(e))}function Vb(e){return of(e)?Object.keys(e).sort().reduce((t,n)=>(t[n]=Vb(e[n]),t),{}):Array.isArray(e)?e.map(Vb):e}var Zre=w(()=>{Qt()}),iD,Wl,lD=w(()=>{iD="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",Wl=(e=21)=>{let t="",n=e;for(;n--;)t+=iD[Math.random()*64|0];return t}});function sD(){return Wl(10)}function eoe(){return Wl(10)}function uD(){return Wl(10)}function cD(){return Wl(10)}var Vt,Dr=w(()=>{Zre(),lD(),Vt={forSheet(){return"sheet"},forSheetObject(e){return $l({o:e.address.objectKey})},forSubSequence(e){return $l({ss:e})},forSheetObjectProp(e,t){return $l({o:e.address.objectKey,p:t})},forTrackKeyframe(e,t,n){return $l({o:e.address.objectKey,t,k:n})},forSheetObjectAggregateKeyframe(e,t){return Vt.forCompoundPropAggregateKeyframe(e,[],t)},forSheetAggregateKeyframe(e,t){return $l({o:e.address.sheetId,pos:t})},forCompoundPropAggregateKeyframe(e,t,n){return $l({o:e.address.objectKey,p:t,pos:n})}}}),Kb,Ub,dD=w(()=>{Kb=ge.requireDist(),Ub=(e,t)=>{let n=Kb.prism.memo(e,()=>new Kb.Atom(t),[]);return n.set(t),n}}),fD,Tr,Ao=w(()=>{fe(),Tr=Gn(fD||(fD=j([`
  font-weight: 300;
  font-size: 11px;
  color: `,`;
  text-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.3);
`])),e=>e.isHighlighted==="self"?"#CCC":"#919191")});function Gl(e,t){let n=e;for(let o of t)n=n[o];return n}var Gu=w(()=>{});function toe(){let e=0,t=new mD.Atom({hasLock:!1});return{replaceLock(n,o){let i=e++,l=t.get();return l.hasLock&&l.cleanup(),t.set({hasLock:!0,lockId:i,cleanup:o,deepPath:noe(pD(n))}),function(){let u=t.get();u.hasLock&&u.lockId===i&&(u.cleanup(),t.set({hasLock:!1}))}},getIsPropHighlightedD(n){let o=Gl(t.pointer.deepPath,pD(n));return(0,gD.prism)(()=>{let i=(0,hD.val)(o);return i===!0?"self":i?"descendent":null})}}}function pD(e){return[e.projectId,e.sheetId,e.objectKey,...e.pathToProp]}function noe(e){let t={};return El(t,e,!0),t}var hD,mD,gD,vD,roe=w(()=>{hD=ge.requireDist(),mD=ge.requireDist(),gD=ge.requireDist(),Gu(),pv(),vD=toe()});function Hb(e,t){(0,bD.useLayoutEffect)(()=>{if(!e||t.type!=="propWithChildren"&&t.type!=="primitiveProp"&&t.type!=="sheetObject")return;let n=null,o=ne(F({},t.sheetObject.address),{pathToProp:t.type==="sheetObject"?[]:t.pathToProp});function i(){n=vD.replaceLock(o,()=>{})}function l(){n?.()}return e.addEventListener("mouseenter",i),e.addEventListener("mouseleave",l),()=>{n?.(),e.removeEventListener("mouseenter",i),e.removeEventListener("mouseleave",l)}},[e])}var bD,$b=w(()=>{bD=V(H()),roe()});function Wb(e){let[t,n]=(0,Gb.useState)(null);return(0,Gb.useLayoutEffect)(()=>(e&&n(e.getBoundingClientRect()),()=>{n(null)}),[e]),t}var Gb,yD=w(()=>{Gb=V(H())}),Yu,np,xD,kD,wD,SD,ED,PD,ID=w(()=>{ql(),Yu=V(H()),fe(),np=26,kD=C.li(xD||(xD=j([`
  height: `,`px;
  padding: 0 12px;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  position: relative;
  color: `,`;
  cursor: `,`;

  &:after {
    position: absolute;
    inset: 2px 1px;
    display: block;
    content: ' ';
    pointer-events: none;
    z-index: -1;
    border-radius: 3px;
  }

  &:hover:after {
    background-color: `,`;
  }
`])),np,e=>e.enabled?"white":"#8f8f8f",e=>e.enabled?"normal":"not-allowed",e=>e.enabled?"rgba(63, 174, 191, 0.75)":"initial"),SD=C.span(wD||(wD=j([""]))),ED=e=>Yu.default.createElement(kD,{onClick:e.enabled?e.onClick:jr,enabled:e.enabled,title:e.enabled?void 0:"Disabled"},Yu.default.createElement(SD,null,Yu.default.createElement(Yu.default.Fragment,null,e.label))),PD=ED});function ooe(e){let t=(0,Yb.useRef)(e);t.current=e,(0,Yb.useEffect)(()=>{let n=o=>t.current(o);return window.addEventListener("keydown",n),()=>{window.removeEventListener("keydown",n)}},[])}var Yb,aoe=w(()=>{Yb=V(H())}),Qu,jD,CD,OD,_D,DD,TD,AD,Qb,BD=w(()=>{Qu=V(H()),ID(),fe(),Ir(),tt(),jD=190,CD=!0,_D=C.ul(OD||(OD=j([`
  position: absolute;
  min-width: `,`px;
  z-index: 10000;
  background: `,`;
  backdrop-filter: blur(2px);
  color: white;
  list-style-type: none;
  padding: 2px 0;
  margin: 0;
  border-radius: 1px;
  cursor: default;
  `,`;
  border-radius: 3px;
`])),jD,no(.2,"#111"),Qe),TD=C.div(DD||(DD=j([`
  padding: 4px 10px;
  border-bottom: 1px solid #6262626d;
  color: #adadadb3;
  font-size: 11px;
  font-weight: 500;
`]))),AD=Qu.default.forwardRef((e,t)=>Qu.default.createElement(_D,{ref:t},CD&&e.displayName?Qu.default.createElement(TD,null,e.displayName):null,e.items.map((n,o)=>Qu.default.createElement(PD,{key:"item-".concat(o),label:n.label,enabled:n.enabled!==!1,onClick:i=>{n.callback&&n.callback(i),e.onRequestClose()}})))),Qb=AD}),zD,qD,rp,MD,Xu,RD,FD,ioe=w(()=>{yD(),zD=V(H()),qD=V(H()),rp=V(H()),MD=V(Io()),kb(),ID(),di(),aoe(),BD(),Xu=20,RD=e=>{let[t,n]=(0,rp.useState)(null),o=Wb(t),i=Jf();(0,rp.useLayoutEffect)(()=>{if(!o||!t)return;let c={left:o.width/2,top:np/2+(e.displayName?np:0)},d={left:e.clickPoint.clientX-c.left,top:e.clickPoint.clientY-c.top};d.left<0?d.left=0:d.left+o.width>i.width&&(d.left=i.width-o.width),d.top<0?d.top=0:d.top+o.height>i.height&&(d.top=i.height-o.height),t.style.left=d.left+"px",t.style.top=d.top+"px";let p=h=>{(h.clientX<d.left-Xu||h.clientX>d.left+o.width+Xu||h.clientY<d.top-Xu||h.clientY>d.top+o.height+Xu)&&e.onRequestClose()};return window.addEventListener("mousemove",p),()=>{window.removeEventListener("mousemove",p)}},[o,t,e.clickPoint,i,e.onRequestClose]);let l=(0,qD.useContext)(Bl);ooe(c=>{c.key==="Escape"&&e.onRequestClose()});let u=(0,zD.useMemo)(()=>{let c=Array.isArray(e.items)?e.items:e.items();return c.length>0?c:[{label:e.displayName?"No actions for ".concat(e.displayName):"No actions found",enabled:!1}]},[e.items]);return(0,MD.createPortal)(rp.default.createElement(Qb,{items:u,onRequestClose:e.onRequestClose,displayName:e.displayName,ref:n}),l)},FD=RD}),op,LD,ND,loe=w(()=>{op=V(H()),LD=(e,t)=>{let[n,o]=(0,op.useState)({isOpen:!1}),i=(0,op.useCallback)(()=>o({isOpen:!1}),[]);return(0,op.useEffect)(()=>{if(!e||t.disabled===!0){o({isOpen:!1});return}let l=u=>{o({isOpen:!0,event:u}),u.preventDefault(),u.stopPropagation()};return e.addEventListener("contextmenu",l),()=>{e.removeEventListener("contextmenu",l)}},[e,t.disabled]),[n,i]},ND=LD}),VD,KD,UD,soe=w(()=>{fe(),KD=C.input.attrs({type:"checkbox"})(VD||(VD=j([`
  outline: none;
`]))),UD=KD});function uoe({propConfig:e,editingTools:t,value:n,autoFocus:o}){let i=(0,Xb.useCallback)(l=>{t.permanentlySetValue(!!l.target.checked)},[e,t]);return Xb.default.createElement($D,{checked:n,onChange:i,autoFocus:o})}var Xb,HD,$D,WD,coe=w(()=>{Xb=V(H()),fe(),soe(),$D=C(UD)(HD||(HD=j([`
  margin-left: 6px;

  :focus {
    outline: 1px solid #555;
  }
`]))),WD=uoe});function ap(e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var ip=w(()=>{});function Jb(e,t,n){(0,GD.useEffect)(()=>{if(!e||n===!1)return;let o=Array.isArray(e)?e.filter(l=>l):[e],i=l=>{o.every(u=>!l.composedPath().includes(u))&&t(l)};return window.addEventListener("mousedown",i,{capture:!0,passive:!1}),()=>{window.removeEventListener("mousedown",i,{capture:!0,passive:!1})}},[e,n])}var GD,Zb=w(()=>{GD=V(H())});function doe(e){return isNaN(e)?"NaN":dv(e)?e.toFixed(0):w5(e,3).toString()}var YD,QD,Bo,XD,lp,JD,ZD,e6,t6,n6,r6,o6,a6,Yl,Ju=w(()=>{Qt(),YD=V(H()),QD=V(H()),Bo=V(H()),fe(),ip(),Ze(),Zb(),Ct(),lp=C.div(XD||(XD=j([`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:after {
    position: absolute;
    inset: 1px 0 2px;
    display: block;
    content: ' ';
    background-color: transparent;
    border: 1px solid transparent;
    z-index: -2;
    box-sizing: border-box;
    border-radius: 1px;
  }

  &:hover,
  &.dragging,
  &.editingViaKeyboard {
    &:after {
      background-color: #10101042;
      border-color: #00000059;
    }
  }
`]))),ZD=C.input(JD||(JD=j([`
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.9);
  padding: 1px 6px;
  font: inherit;
  outline: none;
  cursor: ew-resize;
  text-align: left;
  width: 100%;
  height: calc(100% - 4px);
  border-radius: 2px;

  &:focus {
    cursor: text;
  }
`]))),t6=C.div(e6||(e6=j([`
  position: absolute;
  inset: 3px 2px 4px;
  transform: scale(var(--percentage), 1);
  transform-origin: top left;
  background-color: #2d5561;
  z-index: -1;
  border-radius: 2px;
  pointer-events: none;

  `,".dragging &, ",`.noFocus:hover & {
    background-color: #338198;
  }
`])),lp,lp),r6=C.div(n6||(n6=j([`
  display: contents;
`]))),o6=e=>!0,a6=e=>{var t;let[n]=$e({mode:"noFocus"}),o=(t=e.isValid)!=null?t:o6,i=(0,Bo.useRef)(e);i.current=e;let l=(0,Bo.useRef)(null);Jb(l.current,()=>{l.current.blur()},n.current.mode==="editingViaKeyboard");let u=(0,Bo.useRef)(null),c=(0,Bo.useMemo)(()=>{let S=M=>{let _=M.target,{value:L}=_,U=n.current;n.current=ne(F({},U),{currentEditedValueInString:L});let N=parseFloat(L);!isFinite(N)||!o(N)||i.current.temporarilySetValue(N)},E=()=>{n.current.mode==="editingViaKeyboard"&&(P(),n.current={mode:"noFocus"}),e.onBlur&&e.onBlur()},P=()=>{let M=n.current,_=parseFloat(M.currentEditedValueInString);!isFinite(_)||!o(_)||M.valueBeforeEditing===_?i.current.discardTemporaryValue():i.current.permanentlySetValue(_)},O=M=>{M.key==="Escape"?(i.current.discardTemporaryValue(),n.current={mode:"noFocus"},l.current.blur()):(M.key==="Enter"||M.key==="Tab")&&(P(),l.current.blur())},z=M=>{n.current.mode==="noFocus"&&(l.current.focus(),M.preventDefault()),M.stopPropagation()},B=()=>{n.current.mode==="noFocus"?D():n.current.mode},D=()=>{let M=i.current.value;n.current={mode:"editingViaKeyboard",currentEditedValueInString:String(M),valueBeforeEditing:M},setTimeout(()=>{l.current.focus(),l.current.setSelectionRange(0,100)})},X;return{inputChange:S,onBlur:E,transitionToDraggingMode:()=>{var M;let _=i.current.value;X=(M=l.current)==null?void 0:M.getBoundingClientRect().width,n.current={mode:"dragging"};let L=_,U=_;return u.current=document.body.style.cursor,{onDrag(N,se,K,ce){let J=K.altKey?ce/10:ce,W=U+e.nudge({deltaX:J,deltaFraction:J/X,magnitude:1});U=e.range?at(W,e.range[0],e.range[1]):W,i.current.temporarilySetValue(U)},onDragEnd(N){N?(L===U?i.current.discardTemporaryValue():i.current.permanentlySetValue(U),n.current={mode:"noFocus"}):(i.current.discardTemporaryValue(),n.current={mode:"noFocus"})},onClick(){l.current.focus(),l.current.setSelectionRange(0,100)}}},onInputKeyDown:O,onClick:z,onFocus:B}},[]);(0,YD.useEffect)(()=>()=>{c.onBlur()},[]);let d=n.current.mode!=="editingViaKeyboard"?doe(e.value):n.current.currentEditedValueInString;typeof d=="number"&&isNaN(d)&&(d="NaN");let p=[l];e.inputRef&&p.push(e.inputRef);let h=Bo.default.createElement(ZD,{key:"input",type:"text",onChange:c.inputChange,value:d,onBlur:c.onBlur,onKeyDown:c.onInputKeyDown,onClick:c.onClick,onFocus:c.onFocus,ref:ap(p),onMouseDown:S=>{S.stopPropagation()},onDoubleClick:S=>{S.preventDefault(),S.stopPropagation()},autoFocus:e.autoFocus}),{range:b}=e,g=parseFloat(d),m=b?Bo.default.createElement(t6,{style:{"--percentage":at((g-b[0])/(b[1]-b[0]),0,1)}}):null,[y,x]=(0,QD.useState)(null);return pt(y,{debugName:"form/BasicNumberInput",onDragStart:c.transitionToDraggingMode,lockCSSCursorTo:"ew-resize",shouldPointerLock:!0,disabled:n.current.mode==="editingViaKeyboard"}),Bo.default.createElement(lp,{className:e.className+" "+n.current.mode},Bo.default.createElement(r6,{ref:x},h),m)},Yl=a6});function foe({propConfig:e,editingTools:t,value:n,autoFocus:o}){let i=(0,ey.useCallback)(l=>e.nudgeFn(ne(F({},l),{config:e})),[e]);return ey.default.createElement(Yl,{value:n,temporarilySetValue:t.temporarilySetValue,discardTemporaryValue:t.discardTemporaryValue,permanentlySetValue:t.permanentlySetValue,range:e.range,nudge:i,autoFocus:o})}var ey,i6,poe=w(()=>{Ju(),ey=V(H()),i6=foe});function hoe({value:e,onChange:t,options:n,autoFocus:o}){let i=(0,Zu.useCallback)(l=>{t(String(l.target.value))},[t]);return Zu.default.createElement(ty,{role:"radiogroup"},Object.keys(n).map((l,u)=>Zu.default.createElement(u6,{key:"label-"+u,"data-checked":e===l},n[l],Zu.default.createElement(d6,{type:"radio",checked:e===l,value:l,onChange:i,name:"switchbox",autoFocus:o}))))}var Zu,l6,ty,s6,u6,c6,d6,f6,moe=w(()=>{Ir(),Zu=V(H()),fe(),ty=C.form(l6||(l6=j([`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  vertical-align: middle;
  justify-content: stretch;
  height: 24px;
  width: 100%;
`]))),u6=C.label(s6||(s6=j([`
  padding: 0 0.5em;
  background: transparent;
  /* background: #373748; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: #a7a7a7;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-right-width: 0px;

  & + &:last-child {
    border-right-width: 1px;
  }

  `,`:hover > & {
    border-color: #1c2123;
    /* background-color: #373748; */
    /* color: `,`; */
  }

  &&:hover {
    background-color: #464654;
  }

  &&[data-checked='true'] {
    color: white;
    background: #3f3f4c;
  }
`])),ty,Lv(.1,"white")),d6=C.input(c6||(c6=j([`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
`]))),f6=hoe});function goe({value:e,onChange:t,options:n,className:o,autoFocus:i}){let l=(0,hi.useCallback)(u=>{t(String(u.target.value))},[t]);return hi.default.createElement(h6,null,hi.default.createElement(b6,{className:o,value:e,onChange:l,autoFocus:i},Object.keys(n).map((u,c)=>hi.default.createElement("option",{key:"option-"+c,value:u},n[u]))),hi.default.createElement(g6,null,hi.default.createElement(Gre,null)))}var hi,p6,h6,m6,g6,v6,b6,y6,voe=w(()=>{hi=V(H()),fe(),Wu(),h6=C.div(p6||(p6=j([`
  width: 100%;
  position: relative;
`]))),g6=C.div(m6||(m6=j([`
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  width: 1.5em;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #6b7280;
  pointer-events: none;
`]))),b6=C.select(v6||(v6=j([`
  appearance: none;
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.85);
  padding: 1px 6px;
  font: inherit;
  outline: none;
  text-align: left;
  width: 100%;
  border-radius: 2px;
  /*
  looks like putting percentages in the height of a select box doesn't work in Firefox. Not sure why.
  So we're hard-coding the height to 26px, unlike all other inputs that use a relative height.
  */
  height: 26px /* calc(100% - 4px); */;

  @supports (-moz-appearance: none) {
    /* Ugly hack to remove the extra left padding that shows up only in Firefox */
    text-indent: -2px;
  }

  &:hover,
  &:focus {
    background-color: #10101042;
    border-color: #00000059;
  }
`]))),y6=goe});function boe({propConfig:e,editingTools:t,value:n,autoFocus:o}){let i=(0,sp.useCallback)(l=>{t.permanentlySetValue(l)},[e,t]);return e.as==="menu"?sp.default.createElement(y6,{value:n,onChange:i,options:e.valuesAndLabels,autoFocus:o}):sp.default.createElement(f6,{value:n,onChange:i,options:e.valuesAndLabels,autoFocus:o})}var sp,x6,yoe=w(()=>{sp=V(H()),moe(),voe(),x6=boe}),k6,ec,w6,S6,E6,P6,fa,Ql=w(()=>{fe(),k6=V(H()),ec=V(H()),ip(),Ze(),Zb(),S6=C.input.attrs({type:"text"})(w6||(w6=j([`
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.9);
  padding: 1px 6px;
  font: inherit;
  outline: none;
  cursor: text;
  text-align: left;
  width: 100%;
  height: calc(100% - 4px);
  border-radius: 2px;
  border: 1px solid transparent;
  box-sizing: border-box;

  &:hover {
    background-color: #10101042;
    border-color: #00000059;
  }

  &:hover,
  &:focus {
    cursor: text;
    background-color: #10101042;
    border-color: #00000059;
  }

  &.invalid {
    border-color: red;
  }
`]))),E6=e=>!0,P6=e=>{var t,n;let[o]=$e({mode:"noFocus"}),i=(t=e.isValid)!=null?t:E6,l=(0,ec.useRef)(e);l.current=e;let u=(0,ec.useRef)(null);Jb(u.current,()=>{u.current.blur()},o.current.mode==="editingViaKeyboard");let c=(0,ec.useMemo)(()=>{let h=E=>{let P=E.target,{value:O}=P,z=o.current;o.current=ne(F({},z),{currentEditedValueInString:O}),i(O)&&l.current.temporarilySetValue(O)},b=()=>{var E,P;o.current.mode==="editingViaKeyboard"&&(g(),o.current={mode:"noFocus"}),(P=(E=l.current).onBlur)==null||P.call(E)},g=()=>{let E=o.current,P=E.currentEditedValueInString;i(P)?E.valueBeforeEditing===P?l.current.discardTemporaryValue():l.current.permanentlySetValue(P):l.current.discardTemporaryValue()},m=E=>{E.key==="Escape"?(l.current.discardTemporaryValue(),o.current={mode:"noFocus"},u.current.blur()):(E.key==="Enter"||E.key==="Tab")&&(g(),u.current.blur())},y=E=>{o.current.mode==="noFocus"&&(u.current.focus(),E.preventDefault()),E.stopPropagation()},x=()=>{o.current.mode==="noFocus"?S():o.current.mode},S=()=>{let E=l.current.value;o.current={mode:"editingViaKeyboard",currentEditedValueInString:String(E),valueBeforeEditing:E},setTimeout(()=>{u.current.focus()})};return{inputChange:h,onBlur:b,onInputKeyDown:m,onClick:y,onFocus:x}},[]);(0,k6.useEffect)(()=>()=>{c.onBlur()},[]);let d=o.current.mode!=="editingViaKeyboard"?e.value:o.current.currentEditedValueInString,p=[u];return e.inputRef&&p.push(e.inputRef),ec.default.createElement(S6,{key:"input",type:"text",className:"".concat((n=e.className)!=null?n:""," ").concat(i(d)?"":"invalid"),onChange:c.inputChange,value:d,onBlur:c.onBlur,onKeyDown:c.onInputKeyDown,onClick:c.onClick,onFocus:c.onFocus,ref:ap(p),onMouseDown:h=>{h.stopPropagation()},onDoubleClick:h=>{h.preventDefault(),h.stopPropagation()},autoFocus:e.autoFocus})},fa=P6});function xoe({editingTools:e,value:t,autoFocus:n}){return I6.default.createElement(fa,{value:t,temporarilySetValue:e.temporarilySetValue,discardTemporaryValue:e.discardTemporaryValue,permanentlySetValue:e.permanentlySetValue,autoFocus:n})}var I6,j6,koe=w(()=>{I6=V(H()),Ql(),j6=xoe});function woe(e){e=e.trim().toLowerCase();let t=e.match(oy);if(!t)return{r:0,g:0,b:0,a:1};let n=Soe(t[1]);return{r:parseInt(n.substr(0,2),16)/255,g:parseInt(n.substr(2,2),16)/255,b:parseInt(n.substr(4,2),16)/255,a:parseInt(n.substr(6,2),16)/255}}function ny(e,{removeAlphaIfOpaque:t=!1}={}){let n=(e.a*255|256).toString(16).slice(1),o=(e.r*255|256).toString(16).slice(1)+(e.g*255|256).toString(16).slice(1)+(e.b*255|256).toString(16).slice(1)+(t&&n==="ff"?"":n);return"#".concat(o)}function ry(e){return ne(F({},e),{toString(){return ny(this,{removeAlphaIfOpaque:!0})}})}function Soe(e){switch(e.length){case 3:return"".concat(e.repeat(2),"ff");case 4:let t=e.substr(0,3),n=e[3];return"".concat(t.repeat(2)).concat(n.repeat(2));case 6:return"".concat(e,"ff")}return e}var oy,C6=w(()=>{oy=/^#*([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i});function up(e){let t=(0,ay.useRef)(e),n=(0,ay.useRef)(o=>{t.current&&t.current(o)});return t.current=e,n.current}var ay,O6=w(()=>{ay=V(H())}),mi,cp=w(()=>{mi=(e,t=0,n=1)=>e>n?n:e<t?t:e}),tc,iy,_6,ly,sy=w(()=>{tc=V(H()),iy=(0,tc.createContext)(void 0),_6=({children:e})=>{let[t,n]=(0,tc.useState)(!1);return tc.default.createElement(iy.Provider,{value:{editing:t,setEditing:n}},e)},ly=()=>(0,tc.useContext)(iy)}),pa,Xl,D6,dp,uy,cy,T6,A6,B6,z6,nc,fp=w(()=>{pa=V(H()),O6(),cp(),fe(),sy(),Xl=e=>"touches"in e,D6=(e,t)=>{for(let n=0;n<e.length;n++)if(e[n].identifier===t)return e[n];return e[0]},dp=e=>e&&e.ownerDocument.defaultView||self,uy=(e,t,n)=>{let o=e.getBoundingClientRect(),i=Xl(t)?D6(t.touches,n):t;return{left:mi((i.pageX-(o.left+dp(e).pageXOffset))/o.width),top:mi((i.pageY-(o.top+dp(e).pageYOffset))/o.height)}},cy=e=>{!Xl(e)&&e.preventDefault()},T6=(e,t)=>t&&!Xl(e),B6=C.div(A6||(A6=j([`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  outline: none;
  /* Don't trigger the default scrolling behavior when the event is originating from this element */
  touch-action: none;
`]))),z6=e=>{var t=e,{onMove:n,onKey:o}=t,i=nu(t,["onMove","onKey"]);let l=(0,pa.useRef)(null),u=up(n),c=up(o),d=(0,pa.useRef)(null),p=(0,pa.useRef)(!1),{setEditing:h}=ly(),[b,g,m]=(0,pa.useMemo)(()=>{let y=({nativeEvent:O})=>{let z=l.current;if(z&&(cy(O),!(T6(O,p.current)||!z))){if(Xl(O)){p.current=!0;let B=O.changedTouches||[];B.length&&(d.current=B[0].identifier)}z.focus(),h(!0),u(uy(z,O,d.current)),P(!0)}},x=O=>{cy(O),(Xl(O)?O.touches.length>0:O.buttons>0)&&l.current?u(uy(l.current,O,d.current)):(h(!1),P(!1))},S=O=>{h(!1),P(!1)},E=O=>{let z=O.which||O.keyCode;z<37||z>40||(O.preventDefault(),c({left:z===39?.05:z===37?-.05:0,top:z===40?.05:z===38?-.05:0}))};function P(O){let z=p.current,B=l.current,D=dp(B),X=O?D.addEventListener:D.removeEventListener;X(z?"touchmove":"mousemove",x),X(z?"touchend":"mouseup",S)}return[y,E,P]},[c,u]);return(0,pa.useEffect)(()=>m,[m]),pa.default.createElement(B6,ne(F({},i),{onTouchStart:b,onMouseDown:b,ref:l,onKeyDown:g,tabIndex:0,role:"slider"}))},nc=pa.default.memo(z6)}),dy,q6,M6,R6,F6,L6,N6,pp,fy=w(()=>{dy=V(H()),fe(),fp(),M6=C(nc)(q6||(q6=j([""]))),F6=C.div(R6||(R6=j([`
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ffffff00;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  `,`:focus & {
    transform: translate(-50%, -50%) scale(1.1);
  }
`])),M6),N6=C.div(L6||(L6=j([`
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
`]))),pp=({className:e,color:t,left:n,top:o=.5})=>{let i={top:"".concat(o*100,"%"),left:"".concat(n*100,"%")};return dy.default.createElement(F6,{style:i,className:e},dy.default.createElement(N6,{style:{backgroundColor:t}}))}}),cn,hp=w(()=>{cn=(e,t=0,n=Math.pow(10,t))=>Math.round(n*e)/n}),py,mp,gp,V6,K6,vp=w(()=>{hp(),py=({h:e,s:t,v:n,a:o})=>{let i=(200-t)*n/100;return{h:cn(e),s:cn(i>0&&i<200?t*n/100/(i<=100?i:200-i)*100:0),l:cn(i/2),a:cn(o,2)}},mp=e=>{let{h:t,s:n,l:o}=py(e);return"hsl(".concat(t,", ").concat(n,"%, ").concat(o,"%)")},gp=e=>{let{h:t,s:n,l:o,a:i}=py(e);return"hsla(".concat(t,", ").concat(n,"%, ").concat(o,"%, ").concat(i,")")},V6=({h:e,s:t,v:n,a:o})=>{e=e/360*6,t=t/100,n=n/100;let i=Math.floor(e),l=n*(1-t),u=n*(1-(e-i)*t),c=n*(1-(1-e+i)*t),d=i%6;return{r:cn([n,u,l,l,c,n][d]*255),g:cn([c,n,n,u,l,l][d]*255),b:cn([l,l,c,n,n,u][d]*255),a:cn(o,2)}},K6=({r:e,g:t,b:n,a:o})=>{let i=Math.max(e,t,n),l=i-Math.min(e,t,n),u=l?i===e?(t-n)/l:i===t?2+(n-e)/l:4+(e-t)/l:0;return{h:cn(60*(u<0?u+6:u)),s:cn(i?l/i*100:0),v:cn(i/255*100),a:o}}}),rc,U6,H6,$6,W6,G6,Y6,Eoe=w(()=>{rc=V(H()),fp(),fy(),vp(),cp(),hp(),fe(),H6=C.div(U6||(U6=j([`
  position: relative;
  height: 16px;
  border-radius: 2px;

  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
`]))),W6=C(pp)($6||($6=j([`
  z-index: 2;
`]))),G6=({className:e,hue:t,onChange:n})=>rc.default.createElement(H6,{className:e},rc.default.createElement(nc,{onMove:o=>{n({h:360*o.left})},onKey:o=>{n({h:mi(t+o.left*360,0,360)})},"aria-label":"Hue","aria-valuetext":cn(t)},rc.default.createElement(W6,{left:t/360,color:mp({h:t,s:100,v:100,a:1})}))),Y6=rc.default.memo(G6)}),oc,Q6,X6,J6,Z6,eT,tT,Poe=w(()=>{oc=V(H()),fp(),fy(),vp(),cp(),hp(),fe(),X6=C.div(Q6||(Q6=j([`
  position: relative;
  flex-grow: 1;
  border-color: transparent; /* Fixes https://github.com/omgovich/react-colorful/issues/139 */
  border-bottom: 12px solid #000;
  border-radius: 2px;
  background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0));

  // Improve elements rendering on light backgrounds
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
`]))),Z6=C(pp)(J6||(J6=j([`
  z-index: 3;
`]))),eT=({hsva:e,onChange:t})=>{let n=l=>{t({s:l.left*100,v:100-l.top*100})},o=l=>{t({s:mi(e.s+l.left*100,0,100),v:mi(e.v-l.top*100,0,100)})},i={backgroundColor:mp({h:e.h,s:100,v:100,a:1})};return oc.default.createElement(X6,{style:i},oc.default.createElement(nc,{onMove:n,onKey:o,"aria-label":"Color","aria-valuetext":"Saturation ".concat(cn(e.s),"%, Brightness ").concat(cn(e.v),"%")},oc.default.createElement(Z6,{top:1-e.v/100,left:e.s/100,color:mp(e)})))},tT=oc.default.memo(eT)}),ac,nT,rT,oT,aT,iT,lT,sT,Ioe=w(()=>{ac=V(H()),fp(),fy(),vp(),cp(),hp(),fe(),rT=C.div(nT||(nT=j([`
  position: relative;
  height: 16px;
  border-radius: 2px;
  // Checkerboard
  background-color: #fff;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>');
`]))),aT=C.div.attrs(({colorFrom:e,colorTo:t})=>({style:{backgroundImage:"linear-gradient(90deg, ".concat(e,", ").concat(t,")")}}))(oT||(oT=j([`
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;

  // Improve rendering on light backgrounds
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
`]))),lT=C(pp)(iT||(iT=j([`
  // Checkerboard
  background-color: #fff;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>');
`]))),sT=({className:e,hsva:t,onChange:n})=>{let o=c=>{n({a:c.left})},i=c=>{n({a:mi(t.a+c.left)})},l=gp(Object.assign({},t,{a:0})),u=gp(Object.assign({},t,{a:1}));return ac.default.createElement(rT,{className:e},ac.default.createElement(aT,{colorFrom:l,colorTo:u}),ac.default.createElement(nc,{onMove:o,onKey:i,"aria-label":"Alpha","aria-valuetext":"".concat(cn(t.a*100),"%")},ac.default.createElement(lT,{left:t.a,color:gp(t)})))}}),bp,uT=w(()=>{bp=(e,t)=>{if(e===t)return!0;for(let n in e)if(e[n]!==t[n])return!1;return!0}});function joe(e,t,n,o){let{editing:i}=ly(),[l,u]=(0,zo.useState)(t),c=up(n),d=up(o),p=i?l:t,[h,b]=(0,zo.useState)(()=>e.toHsva(p)),g=(0,zo.useRef)({color:p,hsva:h}),m=(0,zo.useRef)({color:p,hsva:h});(0,zo.useEffect)(()=>{i&&u(g.current.color)},[i]),(0,zo.useEffect)(()=>{let x=e.fromHsva(h);i?!bp(h,g.current.hsva)&&!e.equal(x,g.current.color)&&(g.current={hsva:h,color:x},u(x),c(x)):!bp(h,m.current.hsva)&&!e.equal(x,m.current.color)&&(m.current={hsva:h,color:x},g.current={hsva:h,color:x},d(x))},[i,h,e,c,d]),(0,zo.useEffect)(()=>{if(!i&&!e.equal(p,m.current.color)){let x=e.toHsva(p);m.current={hsva:x,color:p},b(x)}},[i,p,e]);let y=(0,zo.useCallback)(x=>{b(S=>Object.assign({},S,x))},[]);return[h,y]}var zo,Coe=w(()=>{zo=V(H()),uT(),O6(),sy()}),Jl,cT,dT,fT,Ooe=w(()=>{Jl=V(H()),Eoe(),Poe(),Ioe(),Coe(),fe(),dT=C.div(cT||(cT=j([`
  position: relative;
  display: flex;
  gap: 4px;
  flex-direction: column;
  width: 200px;
  height: 200px;
  user-select: none;
  cursor: default;
`]))),fT=e=>{var t=e,{className:n,colorModel:o,color:i=o.defaultColor,temporarilySetValue:l,permanentlySetValue:u,discardTemporaryValue:c}=t,d=nu(t,["className","colorModel","color","temporarilySetValue","permanentlySetValue","discardTemporaryValue"]);let[p,h]=joe(o,i,l,u);return(0,Jl.useEffect)(()=>()=>{c()},[]),Jl.default.createElement(dT,F({},d),Jl.default.createElement(tT,{hsva:p,onChange:h}),Jl.default.createElement(Y6,{hue:p.h,onChange:h}),Jl.default.createElement(sT,{hsva:p,onChange:h}))}}),hy,pT,hT,mT,gT,_oe=w(()=>{hy=V(H()),Ooe(),uT(),vp(),sy(),pT=e=>({r:e.r/255,g:e.g/255,b:e.b/255,a:e.a}),hT=e=>({r:e.r*255,g:e.g*255,b:e.b*255,a:e.a}),mT={defaultColor:{r:0,g:0,b:0,a:1},toHsva:e=>K6(hT(e)),fromHsva:e=>pT(V6(e)),equal:bp},gT=e=>hy.default.createElement(_6,null,hy.default.createElement(fT,ne(F({},e),{permanentlySetValue:t=>{e.permanentlySetValue(t)},colorModel:mT})))}),Doe=w(()=>{_oe()}),vT,bT,my,yT=w(()=>{vT=V(H()),bT=(0,vT.createContext)({}),my=bT});function Toe(e,t,n){let o=i=>{let l=e.getBoundingClientRect();(i.clientX<l.left-t||i.clientX>l.left+l.width+t||i.clientY<l.top-t||i.clientY>l.top+l.height+t)&&n(i)};return window.addEventListener("mousemove",o),()=>{window.removeEventListener("mousemove",o)}}var Aoe=w(()=>{}),xT,yp,gy,kT,vy,wT=w(()=>{xT=V(H()),yp=V(H()),kb(),yD(),yT(),Ze(),Zb(),Aoe(),ql(),Qt(),gy=8,kT=e=>{var t,n;let o=e.children(),[i,l]=$e(null),u=o.props.style?F({},o.props.style):{};u.position="absolute";let c=Wb(l),d=Wb(e.target),p=Jf(),[h,b]=(0,yp.useState)({});return(0,yp.useLayoutEffect)(()=>{var g,m,y;if(!c||!l||!d)return;let x=(g=e.verticalGap)!=null?g:8,S={},E=(m=e.verticalPlacement)!=null?m:"bottom",P=0,O=0;E==="bottom"?d.bottom+c.height+x<p.height?(E="bottom",P=d.bottom+x,S.top="0px"):d.top>c.height+x?(E="top",P=d.top-(c.height+x),S.bottom="0px",S.transform="rotateZ(180deg)"):E="overlay":E==="top"&&(d.top>c.height+x?(E="top",P=d.top-(c.height+x),S.bottom="0px",S.transform="rotateZ(180deg)"):d.bottom+c.height+x<p.height?(E="bottom",P=d.bottom+x,S.top="0px"):E="overlay");let z=0;if(E!=="overlay"){let L=d.left+d.width/2;L<c.width/2?(O=x,z=Math.max(L-x,gy)):L+c.width/2>p.width?(O=p.width-(x+c.width),z=Math.min(L-O,c.width-gy)):(O=L-c.width/2,z=c.width/2),S.left=z+"px"}let{minX:B=-1/0,maxX:D=1/0,minY:X=-1/0,maxY:M=1/0}=(y=e.constraints)!=null?y:{},_={left:at(O,B,D-c.width),top:at(P,X,M+c.height)};if(l.style.left=_.left+"px",l.style.top=_.top+"px",b(S),e.onPointerOutside)return Toe(l,e.onPointerOutside.threshold,e.onPointerOutside.callback)},[c,l,e.target,d,p,e.onPointerOutside]),Jb([l,(t=e.target)!=null?t:null],(n=e.onClickOutside)!=null?n:jr),xT.default.createElement(my.Provider,{value:h},(0,yp.cloneElement)(o,{ref:i,style:u}))},vy=kT});function Tn(e,t){let{isPointerBeingCaptured:n}=n4("usePopover"),[o,i]=$e({isOpen:!1}),l=(0,dn.useRef)(e),u=(0,dn.useCallback)(g=>{o.current={isOpen:!1}},[]),c=(0,dn.useCallback)((g,m)=>{var y;let x=typeof l.current=="function"?l.current():l.current;function S(){p.childHasFocusRef.current||x.closeOnClickOutside!==!1&&u("clicked outside popover")}o.current={isOpen:!0,clickPoint:{clientX:g.clientX,clientY:g.clientY},target:m,opts:x,onClickOutside:S,onPointerOutside:x.closeWhenPointerIsDistant===!1?void 0:{threshold:(y=x.pointerDistanceThreshold)!=null?y:100,callback:()=>{p.childHasFocusRef.current||n()||u("pointer outside")}}}},[]),d=(0,dn.useCallback)((...g)=>{o.current.isOpen?u("toggled"):c(...g)},[]),p=Boe({state:i}),[,h]=(0,dn.useContext)(Ty);(0,dn.useEffect)(()=>{let g;return i.isOpen&&(g=h()),()=>g?.()},[i.isOpen]);let b=(0,dn.useContext)(Bl);return{node:i.isOpen?(0,ST.createPortal)(dn.default.createElement(by.Provider,{value:p.childPopoverLock},dn.default.createElement(vy,{children:t,target:i.target,onClickOutside:i.onClickOutside,onPointerOutside:i.onPointerOutside,constraints:i.opts.constraints,verticalGap:i.opts.verticalGap})),b):dn.default.createElement(dn.default.Fragment,null),open:c,close:u,toggle:d,isOpen:i.isOpen}}function Boe(e){let t=(0,dn.useContext)(by);(0,dn.useEffect)(()=>{if(e.state.isOpen){let o=t.takeFocus();return()=>{o.releaseFocus()}}},[e.state.isOpen]);let n=(0,dn.useRef)(!1);return{childHasFocusRef:n,childPopoverLock:{takeFocus(){return n.current=!0,{releaseFocus(){n.current=!1}}}}}}var dn,ST,by,Ar=w(()=>{Cb(),Ze(),dn=V(H()),ST=V(Io()),di(),wT(),iB(),by=dn.default.createContext({takeFocus(){return{releaseFocus(){}}}})}),qo,ET,PT,IT,jT,CT,OT,_T,DT,TT,AT,BT,zT,zoe=w(()=>{qo=V(H()),fe(),yT(),PT=C.div(ET||(ET=j([`
  position: absolute;
  width: 0;
  height: 0;
  color: var(--popover-arrow-color);
  pointer-events: none;
`]))),jT=C.div(IT||(IT=j([`
  width: 12px;
  height: 8px;
  position: absolute;
  left: -7px;
  top: -8px;
  text-align: center;
  line-height: 0;
`]))),OT=C.path(CT||(CT=j([`
  fill: var(--popover-bg);
`]))),DT=C.path(_T||(_T=j([`
  fill: var(--popover-inner-stroke);
`]))),AT=C.path(TT||(TT=j([`
  fill: var(--popover-outer-stroke);
`]))),BT=(0,qo.forwardRef)(({className:e},t)=>{let n=(0,qo.useContext)(my);return qo.default.createElement(PT,{className:e,ref:t,style:F({},n)},qo.default.createElement(jT,null,qo.default.createElement("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},qo.default.createElement(AT,{d:"M6 0L0 6H12L6 0Z"}),qo.default.createElement(DT,{d:"M6 1.5L0 7.5H12L6 1.5Z"}),qo.default.createElement(OT,{d:"M6 3L0 9H12L6 3Z"}))))}),zT=BT}),xp,yy,qT,MT,RT,An,Br=w(()=>{tt(),Ir(),xp=V(H()),fe(),zoe(),yy=no(.05,"#2a2a31"),MT=C.div(qT||(qT=j([`
  position: absolute;
  --popover-bg: `,`;
  --popover-inner-stroke: #505159;
  --popover-outer-stroke: #111;

  background: var(--popover-bg);

  color: white;
  padding: 0;
  margin: 0;
  cursor: default;
  `,`;
  border-radius: 3px;
  z-index: 10000;
  border: 1px solid var(--popover-inner-stroke);
  box-shadow: 0 0 0 1px var(--popover-outer-stroke), 0 6px 8px -4px black;
  backdrop-filter: blur(8px);

  & a {
    color: inherit;
  }
`])),yy,Qe),RT=xp.default.forwardRef(({children:e,className:t,showPopoverEdgeTriangle:n=!0},o)=>xp.default.createElement(MT,{className:t,ref:o},n?xp.default.createElement(zT,null):void 0,e)),An=RT});function qoe({editingTools:e,value:t,autoFocus:n}){let o=(0,io.useRef)(null),i=(0,io.useCallback)(u=>{let c=ry(woe(u));e.permanentlySetValue(c)},[e]),l=Tn({debugName:"RgbaPropEditor"},()=>io.default.createElement($T,null,io.default.createElement(gT,{color:{r:t.r,g:t.g,b:t.b,a:t.a},temporarilySetValue:u=>{let c=ry(u);e.temporarilySetValue(c)},permanentlySetValue:u=>{let c=ry(u);e.permanentlySetValue(c)},discardTemporaryValue:e.discardTemporaryValue})));return io.default.createElement(io.default.Fragment,null,io.default.createElement(LT,null,io.default.createElement(VT,{rgbaColor:t,ref:o,onClick:u=>{l.toggle(u,o.current)}}),io.default.createElement(UT,{value:ny(t,{removeAlphaIfOpaque:!0}),temporarilySetValue:xy,discardTemporaryValue:xy,permanentlySetValue:i,isValid:u=>!!u.match(oy),autoFocus:n})),l.node)}var io,FT,LT,NT,VT,KT,UT,xy,HT,$T,WT,Moe=w(()=>{C6(),C6(),io=V(H()),Doe(),fe(),Ar(),Ql(),Br(),LT=C.div(FT||(FT=j([`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 4px;
`]))),VT=C.div.attrs(e=>({style:{background:ny(e.rgbaColor)}}))(NT||(NT=j([`
  height: 18px;
  aspect-ratio: 1;
  border-radius: 99999px;
`]))),UT=C(fa)(KT||(KT=j([`
  flex: 1;
`]))),xy=()=>{},$T=C.div(HT||(HT=j([`
  position: absolute;
  background-color: `,`;
  color: white;
  margin: 0;
  cursor: default;
  border-radius: 3px;
  z-index: 10000;
  backdrop-filter: blur(8px);

  padding: 4px;
  pointer-events: all;

  border: none;
  box-shadow: none;
`])),yy),WT=qoe});function Roe({propConfig:e,editingTools:t,value:n,autoFocus:o}){let[i,l]=zr.default.useState();(0,zr.useEffect)(()=>{l(n?t.getAssetUrl(n):void 0)},[n]);let u=(0,zr.useCallback)(d=>_t(this,null,function*(){let p=d.target.files[0];t.permanentlySetValue({type:"image",id:void 0});let h=yield t.createAsset(p);h?t.permanentlySetValue({type:"image",id:h}):t.permanentlySetValue(n),d.target.value=null}),[t,n]),c=!(n!=null&&n.id);return zr.default.createElement(ky,{empty:c},zr.default.createElement(eA,{empty:c,title:c?"Upload image":'"'.concat(n.id,'" (Click to upload new image)')},zr.default.createElement(nA,{type:"file",onChange:u,accept:"image/*,.hdr",autoFocus:o}),i?zr.default.createElement(oA,{src:i}):zr.default.createElement(QT,null)),!c&&zr.default.createElement(iA,{title:"Delete image",onClick:()=>{t.permanentlySetValue({type:"image",id:void 0})}},zr.default.createElement(hb,null)))}var zr,GT,ky,YT,QT,XT,JT,ZT,eA,tA,nA,rA,oA,aA,iA,lA,Foe=w(()=>{$f(),zr=V(H()),fe(),ky=C.div(GT||(GT=j([`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 4px;
`]))),QT=C.div(YT||(YT=j([`
  position: absolute;
  inset: -5px;
  // rotate 45deg
  transform: rotate(45deg);
  --checker-color: #ededed36;
  &:hover {
    --checker-color: #ededed77;
  }
  // checkerboard background with 4px squares
  background-image: linear-gradient(
      45deg,
      var(--checker-color) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, var(--checker-color) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--checker-color) 75%),
    linear-gradient(-45deg, transparent 75%, var(--checker-color) 75%);
  background-size: 5px 5px;
`]))),eA=C.label(ZT||(ZT=j([`
  position: relative;
  cursor: default;
  box-sizing: border-box;

  height: 18px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  overflow: hidden;
  color: #ccc;
  &:hover {
    color: white;
  }

  border-radius: 99999px;
  border: 1px solid hwb(220deg 40% 52%);
  &:hover {
    border-color: hwb(220deg 45% 52%);
  }

  `,`
`])),e=>e.empty?Gn(XT||(XT=j([""]))):Gn(JT||(JT=j([""])))),nA=C.input.attrs({type:"file"})(tA||(tA=j([`
  display: none;
`]))),oA=C.img(rA||(rA=j([`
  position: absolute;
  inset: 0;
  height: 100%;
  aspect-ratio: 1;

  object-fit: cover;
`]))),iA=C.button(aA||(aA=j([`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: transparent;
  color: #a8a8a9;

  border: none;
  height: 100%;
  aspect-ratio: 1/1;

  opacity: 0;

  `,`:hover & {
    opacity: 0.8;
  }

  &:hover {
    opacity: 1;
    color: white;
  }
`])),ky),lA=Roe});function Loe({propConfig:e,editingTools:t,value:n,autoFocus:o}){let[i,l]=qr.default.useState();(0,qr.useEffect)(()=>{l(n?t.getAssetUrl(n):void 0)},[n]);let u=(0,qr.useCallback)(d=>_t(this,null,function*(){let p=d.target.files[0];t.permanentlySetValue({type:"file",id:void 0});let h=yield t.createAsset(p);h?t.permanentlySetValue({type:"file",id:h}):t.permanentlySetValue(n),d.target.value=null}),[t,n]),c=!(n!=null&&n.id);return qr.default.createElement(wy,{empty:c},qr.default.createElement(hA,{empty:c,title:c?"Upload file":'"'.concat(n.id,'" (Click to upload new file)')},qr.default.createElement(gA,{type:"file",onChange:u,autoFocus:o}),i?qr.default.createElement(fb,null):qr.default.createElement(cA,null)),!c&&qr.default.createElement(bA,{title:"Delete file",onClick:()=>{t.permanentlySetValue({type:"file",id:void 0})}},qr.default.createElement(hb,null)))}var qr,sA,wy,uA,cA,dA,fA,pA,hA,mA,gA,vA,bA,yA,Noe=w(()=>{$f(),qr=V(H()),fe(),wy=C.div(sA||(sA=j([`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 4px;
`]))),cA=C.div(uA||(uA=j([`
  position: absolute;
  inset: -5px;
  // rotate 45deg
  transform: rotate(45deg);
  --checker-color: #ededed36;
  &:hover {
    --checker-color: #ededed77;
  }
  // checkerboard background with 4px squares
  background-image: linear-gradient(
      45deg,
      var(--checker-color) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, var(--checker-color) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--checker-color) 75%),
    linear-gradient(-45deg, transparent 75%, var(--checker-color) 75%);
  background-size: 5px 5px;
`]))),hA=C.label(pA||(pA=j([`
  position: relative;
  cursor: default;
  box-sizing: border-box;

  height: 18px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  overflow: hidden;
  color: #ccc;
  &:hover {
    color: white;
  }

  border-radius: 99999px;
  border: 1px solid hwb(220deg 40% 52%);
  &:hover {
    border-color: hwb(220deg 45% 52%);
  }

  `,`
`])),e=>e.empty?Gn(dA||(dA=j([""]))):Gn(fA||(fA=j([""])))),gA=C.input.attrs({type:"file"})(mA||(mA=j([`
  display: none;
`]))),bA=C.button(vA||(vA=j([`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: transparent;
  color: #a8a8a9;

  border: none;
  height: 100%;
  aspect-ratio: 1/1;

  opacity: 0;

  `,`:hover & {
    opacity: 0.8;
  }

  &:hover {
    opacity: 1;
    color: white;
  }
`])),wy),yA=Loe}),Sy,xA=w(()=>{coe(),poe(),yoe(),koe(),Moe(),Foe(),Noe(),Sy={number:i6,string:j6,boolean:WD,stringLiteral:x6,rgba:WT,image:lA,file:yA}});function kp(e){let t=new WeakMap;return n=>(t.has(n)||t.set(n,e(n)),t.get(n))}var Ey=w(()=>{});function lo(e){return e.type==="compound"||e.type==="enum"}function Zl(e,t){if(!e)return;let[n,...o]=t;if(n===void 0)return e;if(!lo(e))return;let i=e.type==="enum"?e.cases[n]:e.props[n];return Zl(i,o)}function wp(e,t){let n=t.deserializeAndSanitize(e);return n===void 0?t.default:n}function Voe(e){return!lo(e)}function*es(e,t){if(e.type==="compound")for(let n in e.props)yield*zY(es(e.props[n],[...t,n]));else{if(e.type==="enum")throw new Error("Not implemented yet");return yield{path:t,conf:e}}}var Py,ha=w(()=>{Ey(),Py=kp(e=>{if(e.type==="enum")throw new Error("Not implemented yet for enums");for(let t in e.props){let n=e.props[t];if(lo(n)){if(Py(n))return!0}else return!0}return!1})});function ma(e,t){return t.length===0?e:ni(e,t)}var Sp=w(()=>{ku()});function kA(e,t){return e==null?null:e instanceof Element&&e.matches(t)?e:kA(e.parentElement,t)}var Koe=w(()=>{});function Uoe(e){let t=new Pp.Atom(void 0),n=new Pp.Atom({}),o=new Pp.Atom({}),i=0;return{addRelatedFlags(l,u){let c=String(++i),d=u.map(p=>{let h={flag:p.flag},b=[p.affects,l,c];return o.setByPointer(g=>Gl(g,b),h),b});return()=>{for(let p of d)o.setByPointer(h=>Gl(h,p),void 0)}},usePresenceFlag(l){},setUserHover(l){let u=t.get();u!==l&&(u&&n.setByPointer(c=>c[u],!1),t.set(l),l&&n.setByPointer(c=>c[l],!0))}}}function ts(e){let t=Ep.default.useContext(jy),n=t.usePresenceFlag(e);return{attrs:{[Ip]:e},flag:n,useRelations(o,i){(0,Iy.useEffect)(()=>e&&t.addRelatedFlags(e,o()),[e,...i])}}}function Hoe(e){let t=Ep.default.useContext(jy),n=Vl("PresenceListeners");(0,Iy.useEffect)(()=>{let o;if(!e)return;let i=l=>{if(l.target instanceof Node){let u=kA(l.target,"[".concat(Ip,"]"));if(u){let c=u.getAttribute(Ip);o!==c&&(o=c,t.setUserHover(c||void 0),n._debug("Updated current hover",{itemKey:c}));return}o!=null&&(o=null,t.setUserHover(void 0),n._debug("Cleared current hover"))}};return e.addEventListener("mouseover",i),()=>{e.removeEventListener("mouseover",i),o!=null&&(o=null,n._debug("Cleared current hover as part of cleanup"))}},[e,t])}var Ep,Iy,wA,Pp,SA,jy,Ip,ic=w(()=>{Ep=V(H()),Iy=V(H()),pi(),wA=ge.requireDist(),Pp=ge.requireDist(),_e(),Koe(),Gu(),SA=(0,wA.prism)(()=>{}),SA.keepHot(),jy=Ep.default.createContext(Uoe()),Ip="data-pi-key"}),Xt,EA,lc,PA,Cy,ga,IA,Oy,jA,CA,OA,jp,_A,DA,TA,AA,BA,zA,sc,qA,_y,Cp=w(()=>{tt(),Ir(),Xt=V(H()),fe(),ic(),lc=C.div(EA||(EA=j([`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  margin: 0 0px 0 2px;
  position: relative;
  z-index: 0;
  opacity: 0.7;

  &:after {
    position: absolute;
    left: -14px;
    right: -14px;
    top: -2px;
    bottom: -2px;
    content: ' ';
    display: none;
    z-index: -1;
    background: `,`;
  }

  &:hover {
    opacity: 1;
    &:after {
      display: block;
    }
  }
`])),no(.2,"black")),Cy=C.div(PA||(PA=j([`
  background: none;
  position: relative;
  border: 0;
  transition: transform 0.1s ease-out;
  z-index: 0;
  outline: none;
  cursor: pointer;

  &:after {
    display: none;
    `,`:hover & {
      display: block;
    }
    position: absolute;
    left: -4px;
    right: -4px;
    top: -4px;
    bottom: -4px;
    content: ' ';
    z-index: -1;
  }
`])),lc),ga={offColor:"#555",onColor:"#e0c917"},Oy=C(Cy)(IA||(IA=j([`
  &:hover {
    color: #e0c917;
  }

  color: `,`;
`])),e=>e.presence===2?"white":e.isOn?ga.onColor:ga.offColor),CA=Gn(jA||(jA=j([`
  pointer-events: none !important;
`]))),jp=C(Cy)(OA||(OA=j([`
  color: `,`;

  `,`;
`])),e=>e.flag===2?"white":e.available?ga.onColor:ga.offColor,e=>e.available?Qe:CA),DA=C(jp)(_A||(_A=j([`
  transform: translateX(2px);
  `,`:hover & {
    transform: translateX(-7px);
  }
`])),lc),AA=C(jp)(TA||(TA=j([`
  transform: translateX(-2px);
  `,`:hover & {
    transform: translateX(7px);
  }
`])),lc),(e=>{let t=C.g(BA||(BA=j([`
    stroke-width: 1;
    `,`:hover & path {
      stroke-width: 3;
    }
  `])),jp);e.Prev=()=>Xt.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Xt.default.createElement(t,{transform:"translate(6 3)"},Xt.default.createElement("path",{d:"M4 1L1 4L4 7",stroke:"currentColor"}))),e.Next=()=>Xt.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Xt.default.createElement(t,{transform:"translate(1 3)"},Xt.default.createElement("path",{d:"M1 1L4 4L1 7",stroke:"currentColor"})));let n=C.g(zA||(zA=j([`
    stroke-width: 0;
    `,`:hover & path {
      stroke: currentColor;
      stroke-width: 2;
    }
  `])),Oy);e.Cur=()=>Xt.default.createElement("svg",{width:"8",height:"12",viewBox:"0 0 8 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Xt.default.createElement(n,{transform:"translate(1 4)"},Xt.default.createElement("path",{d:"M3 0L6 3L3 6L0 3L3 0Z",fill:"currentColor"})))})(sc||(sc={})),qA=e=>{var t,n,o,i,l;let u=ts((t=e.prev)==null?void 0:t.itemKey),c=ts(((n=e.cur)==null?void 0:n.type)==="on"?e.cur.itemKey:void 0),d=ts((o=e.next)==null?void 0:o.itemKey);return Xt.default.createElement(lc,null,Xt.default.createElement(DA,F({available:!!e.prev,onClick:(i=e.prev)==null?void 0:i.jump,flag:u.flag},u.attrs),Xt.default.createElement(sc.Prev,null)),Xt.default.createElement(Oy,F({isOn:e.cur.type==="on",onClick:e.cur.toggle,presence:c.flag},c.attrs),Xt.default.createElement(sc.Cur,null)),Xt.default.createElement(AA,F({available:!!e.next,onClick:(l=e.next)==null?void 0:l.jump,flag:d.flag},d.attrs),Xt.default.createElement(sc.Next,null)))},_y=qA}),Op,uc,MA,RA,FA,LA,NA,VA,KA,cc,UA=w(()=>{Ir(),Op=V(H()),fe(),Pe(),Cp(),ha(),uc={defaultState:{color:no(.95,"#C4C4C4"),hoverColor:no(.15,ga.onColor)},withStaticOverride:{color:no(.85,"#C4C4C4"),hoverColor:no(.15,ga.onColor)}},RA=C.div(MA||(MA=j([`
  width: 16px;
  margin: 0 0px 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: `,`;

  &:hover {
    color: `,`;
  }
`])),e=>e.hasStaticOverride?uc.withStaticOverride.color:uc.defaultState.color,e=>e.hasStaticOverride?uc.withStaticOverride.hoverColor:uc.defaultState.hoverColor),LA=C.div(FA||(FA=j([`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  transform: rotate(45deg);
  /* border: 1px solid currentColor; */
  background-color: currentColor;
`]))),VA=C.div(NA||(NA=j([`
  width: 5px;
  height: 5px;
  background-color: currentColor;
  border-radius: 1px;
  transform: rotate(45deg);
`]))),KA=e=>{let{hasStaticOverride:t,obj:n,propConfig:o,pathToProp:i}=e;return Op.default.createElement(RA,{hasStaticOverride:t,onClick:()=>{Z().transaction(({stateEditors:l})=>{for(let{path:u,conf:c}of es(o,i)){if(lo(c))continue;let d=ne(F({},n.address),{pathToProp:u});l.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsSequenced(d,o)}})},title:"Sequence this prop"},t?Op.default.createElement(VA,{title:"The default value is overridden"}):Op.default.createElement(LA,{title:"This is the default value for this prop"}))},cc=KA});function HA(e,t,n){if(!t||t.data.keyframes.length===0)return $A;let o=Dy.get(t.data);if(o&&o[0]===n)return o[1];function i(u){if(!t)return;let c=t.data.keyframes[u];return c&&{kf:c,track:t,itemKey:Vt.forTrackKeyframe(e,t.id,c.id)}}let l=(()=>{let u=t.data.keyframes.findIndex(d=>d.position>=n);if(u===-1)return{prev:i(t.data.keyframes.length-1)};let c=i(u);return c.kf.position===n?{prev:i(u-1),cur:c,next:i(u+1)}:{next:c,prev:i(u-1)}})();return Dy.set(t.data,[n,l]),l}var Dy,$A,WA=w(()=>{Dr(),Dy=new WeakMap,$A={}}),GA,$oe=w(()=>{GA={}});function YA(e,t,n){let o=(0,cr.getPointerParts)(e).path;return Ne(()=>{if(!Py(n))return{type:"AllStatic",beingScrubbed:!1,contextMenuItems:[],controlIndicators:gi.default.createElement(cc,{hasStaticOverride:!1,obj:t,pathToProp:o,propConfig:n})};let i=!!(0,cr.val)(ni(Z().atomP.ephemeral.projects.stateByProjectId[t.address.projectId].stateBySheetId[t.address.sheetId].stateByObjectKey[t.address.objectKey].valuesBeingScrubbed,(0,cr.getPointerParts)(e).path)),l=[],u={beingScrubbed:i,contextMenuItems:l,controlIndicators:gi.default.createElement(gi.default.Fragment,null)},c=(0,cr.val)(t.template.getMapOfValidSequenceTracks_forStudio()),d=ma(c,o),p=d!==void 0&&Object.keys(d).length!==0,h=[],b=(0,cr.val)(t.template.getStaticButNotSequencedOverrides()),g=ma(b??GA,o)!==void 0;if(p)for(let m of es(n,[])){if(lo(m.conf))continue;let y=ma(d,m.path);typeof y!="string"?g=!0:h.push(y)}if((g||p)&&l.push({label:"Reset all to default",callback:()=>{Z().transaction(({unset:m})=>{m(e)})}}),p&&l.push({label:"Make all static",callback:()=>{Z().transaction(({stateEditors:m})=>{for(let{path:y,conf:x}of es(n,[])){if(lo(x))continue;let S=ne(F({},t.address),{pathToProp:[...o,...y]}),E=Gl(e,y);m.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsStatic(ne(F({},S),{value:t.getValueByPointer(E)}))}})}}),(!p||p&&g)&&l.push({label:"Sequence all",callback:()=>{Z().transaction(({stateEditors:m})=>{for(let{path:y,conf:x}of es(n,o)){if(lo(x))continue;let S=ne(F({},t.address),{pathToProp:y});m.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsSequenced(S,n)}})}}),p){let m=cr.prism.memo("controlIndicators",()=>gi.default.createElement(Woe,{pointerToProp:e,obj:t,possibleSequenceTrackIds:d,listOfDescendantTrackIds:h}),[d,h]);return ne(F({},u),{type:"HasSequences",controlIndicators:m})}else return ne(F({},u),{type:"AllStatic",controlIndicators:gi.default.createElement(cc,{hasStaticOverride:g,obj:t,pathToProp:o,propConfig:n})})},[])}function Woe({pointerToProp:e,obj:t,possibleSequenceTrackIds:n,listOfDescendantTrackIds:o}){return Ne(()=>{let i=(0,cr.getPointerParts)(e).path,l=(0,cr.val)(t.sheet.getSequence().positionPrism),u=o.map(m=>({trackId:m,track:(0,cr.val)(t.template.project.pointers.historic.sheetsById[t.address.sheetId].sequence.tracksByObject[t.address.objectKey].trackData[m])})).filter(({track:m})=>!!m).map(m=>ne(F({},m),{nearbies:HA(t,{id:m.trackId,data:m.track,sheetObject:t},l)})),c=u.find(({nearbies:m})=>!!m.cur),d=u.every(({nearbies:m})=>!!m.cur),p=u.reduce((m,y)=>y.nearbies.prev&&(m===void 0||y.nearbies.prev.kf.position>m.kf.position)?y.nearbies.prev:m,void 0),h=u.reduce((m,y)=>y.nearbies.next&&(m===void 0||y.nearbies.next.kf.position<m.kf.position)?y.nearbies.next:m,void 0),b=()=>{d?Z().transaction(m=>{m.unset(e)}):c?Z().transaction(m=>{m.set(e,(0,cr.val)(e))}):Z().transaction(m=>{m.set(e,(0,cr.val)(e))})},g={cur:c?{type:"on",itemKey:Vt.forCompoundPropAggregateKeyframe(t,i,l),toggle:b}:{toggle:b,type:"off"},prev:p!==void 0?{position:p.kf.position,itemKey:Vt.forCompoundPropAggregateKeyframe(t,i,p.kf.position),jump:()=>{t.sheet.getSequence().position=p.kf.position}}:void 0,next:h!==void 0?{position:h.kf.position,itemKey:Vt.forCompoundPropAggregateKeyframe(t,i,h.kf.position),jump:()=>{t.sheet.getSequence().position=h.kf.position}}:void 0};return gi.default.createElement(_y,F({},g))},[e,t,n,o])}var cr,gi,QA=w(()=>{Pe(),Sp(),_e(),cr=ge.requireDist(),ku(),gi=V(H()),UA(),ha(),Dr(),Gu(),Cp(),WA(),$oe()});function Goe(e,t,n){return(0,Mr.prism)(()=>{var o;let i=(0,Mr.getPointerParts)(e).path,l=t.getValueByPointer(e),u=Mr.prism.memo("editPropValue",()=>{let y=null;return{temporarilySetValue(x){y||(y=Z().scrub()),y.capture(S=>{S.set(e,x)})},discardTemporaryValue(){y&&(y.discard(),y=null)},permanentlySetValue(x){y?(y.capture(S=>{S.set(e,x)}),y.commit(),y=null):Z().transaction(S=>{S.set(e,x)})}}},[]),c={createAsset:y=>t.sheet.project.assetStorage.createAsset(y),getAssetUrl:y=>y.id?t.sheet.project.assetStorage.getAssetUrl(y.id):void 0},d=(0,Mr.val)(ni(Z().atomP.ephemeral.projects.stateByProjectId[t.address.projectId].stateBySheetId[t.address.sheetId].stateByObjectKey[t.address.objectKey].valuesBeingScrubbed,(0,Mr.getPointerParts)(e).path))===!0,p=[],h=ne(F(F({},u),c),{value:l,beingScrubbed:d,contextMenuItems:p,controlIndicators:ns.default.createElement(ns.default.Fragment,null)}),b=Voe(n);if(b){let y=(0,Mr.val)(t.template.getMapOfValidSequenceTracks_forStudio()),x=ma(y,i);if(typeof x=="string"){p.push({label:"Make static",callback:()=>{Z().transaction(({stateEditors:D})=>{let X=ne(F({},t.address),{pathToProp:i});D.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsStatic(ne(F({},X),{value:t.getValueByPointer(e)}))})}});let S=x,E=Mr.prism.sub("lcr",()=>{let D=(0,Mr.val)(t.template.project.pointers.historic.sheetsById[t.address.sheetId].sequence.tracksByObject[t.address.objectKey].trackData[S]),X=(0,Mr.val)(t.sheet.getSequence().positionPrism);return HA(t,D&&{data:D,id:S,sheetObject:t},X)},[S]),P;h.beingScrubbed?P="Sequenced_OnKeyframe_BeingScrubbed":E.cur?P="Sequenced_OnKeyframe":((o=E.prev)==null?void 0:o.kf.connectedRight)===!0?P="Sequenced_BeingInterpolated":P="Sequened_NotBeingInterpolated";let O=()=>{E.cur?Z().transaction(D=>{D.unset(e)}):Z().transaction(D=>{D.set(e,h.value)})},z={cur:E.cur?{type:"on",itemKey:E.cur.itemKey,toggle:O}:{type:"off",toggle:O},prev:E.prev!==void 0?{itemKey:E.prev.itemKey,position:E.prev.kf.position,jump:()=>{t.sheet.getSequence().position=E.prev.kf.position}}:void 0,next:E.next!==void 0?{itemKey:E.next.itemKey,position:E.next.kf.position,jump:()=>{t.sheet.getSequence().position=E.next.kf.position}}:void 0},B=ns.default.createElement(_y,F({},z));return ne(F({},h),{type:"Sequenced",shade:P,nearbyKeyframes:E,controlIndicators:B})}}let g=(0,Mr.val)(t.template.getStaticValues()),m=ma(g,i);return typeof m<"u"&&p.push({label:"Reset to default",callback:()=>{Z().transaction(({unset:y})=>{y(e)})}}),b&&p.push({label:"Sequence",callback:()=>{Z().transaction(({stateEditors:y})=>{let x=ne(F({},t.address),{pathToProp:i});y.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsSequenced(x,n)})}}),typeof m<"u"?ne(F({},h),{type:"Static",shade:h.beingScrubbed?"Static_BeingScrubbed":"Static",controlIndicators:ns.default.createElement(cc,{hasStaticOverride:!0,obj:t,pathToProp:i,propConfig:n})}):ne(F({},h),{type:"Default",shade:"Default",controlIndicators:ns.default.createElement(cc,{hasStaticOverride:!0,obj:t,pathToProp:i,propConfig:n})})})}function Yoe(e,t,n){if(_p.has(e))return _p.get(e);{let o=Goe(e,t,n);return _p.set(e,o),o}}function Qoe(e,t,n){let o=Yoe(e,t,n);return _5(o)}var ns,Mr,_p,Xoe=w(()=>{ku(),ns=V(H()),Mr=ge.requireDist(),Pe(),Sp(),_e(),ha(),UA(),WA(),Cp(),_p=new WeakMap});function Joe(e){return Dp.has(e)||Dp.set(e,(XA++).toString()),Dp.get(e)}var Dp,XA,Zoe=w(()=>{Dp=new WeakMap,XA=0}),JA,rs,ZA,eB,tB,nB,rB,Ty,oB,aB,iB=w(()=>{_e(),JA=V(H()),fe(),Ja(),da(),tt(),rs=ge.requireDist(),ZA="32px",C.div(eB||(eB=j([`
  `,`;
  background-color: rgba(40, 43, 47, 0.8);
  position: fixed;
  right: 8px;
  top: 50px;
  // Temporary, see comment about CSS grid in SingleRowPropEditor.
  width: 280px;
  height: fit-content;
  z-index: `,`;

  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(14px);
  border-radius: 2px;

  display: `,`;

  &:hover {
    display: block;
  }

  @supports not (backdrop-filter: blur()) {
    background: rgba(40, 43, 47, 0.95);
  }
`])),Qe,fi.propsPanel,({pin:e})=>e?"block":"none"),C.div(tB||(tB=j([`
  margin: 0 10px;
  color: #919191;
  font-weight: 500;
  font-size: 10px;
  user-select: none;
  `,`;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`])),Qe),C.div(nB||(nB=j([`
  height: `,`;
  display: flex;
  align-items: center;
`])),ZA),C.div(rB||(rB=j([`
  `,`;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  padding: 0;
  user-select: none;

  /* Set the font-size for input values in the detail panel */
  font-size: 12px;
`])),Qe),Ty=(0,JA.createContext)([!1,()=>()=>{}]),oB=new rs.Atom(!1),aB=new rs.Atom(!1),(0,rs.prism)(()=>{let e=(0,rs.val)(aB.prism),t=(0,rs.val)(oB.prism);return e||t})});function fn(e,t){let[n,o]=ND(e,t),[,i]=(0,os.useContext)(Ty);return(0,os.useEffect)(()=>{var l;let u;return n.isOpen&&((l=t.onOpen)==null||l.call(t),u=i()),()=>u?.()},[n.isOpen,t.onOpen]),[n.isOpen?os.default.createElement(FD,{items:t.menuItems,displayName:t.displayName,clickPoint:n.event,onRequestClose:o}):lB,o,n.isOpen]}var os,lB,pn=w(()=>{os=V(H()),ioe(),loe(),iB(),lB=os.default.createElement(os.default.Fragment,null)}),Mo,sB,Ay,uB,Tp,cB,By,dB,fB,pB,hB,mB,gB,vB,bB,yB,zy,Ap=w(()=>{tt(),Mo=V(H()),Wu(),fe(),Ao(),$b(),pn(),Ay=C.li(sB||(sB=j([`
  --depth: `,`;
  margin: 0;
  padding: 0;
  list-style: none;
`])),e=>e.depth-1),Tp=C.div(uB||(uB=j([`
  border-bottom: 1px solid #7695b705;
`]))),By=C(Tp)(cB||(cB=j([`
  padding-left: calc(var(--depth) * 10px);

  display: flex;
  align-items: stretch;
  color: `,`;

  box-sizing: border-box;

  `,`;
`])),zl.panel.body.compoudThing.label.color,e=>e.isSelected&&"background: blue"),fB=C.span(dB||(dB=j([`
  `,`;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 4px;
  line-height: 26px;
  flex-wrap: nowrap;
  width: 100%;

  `,`:hover & {
    color: #ccc;
  }
`])),Tr,By),hB=C.span(pB||(pB=j([`
  color: #6a9955;
  font-size: 12px;
  margin-right: auto;
  margin-left: 8px;
  opacity: 0.8;
  font-weight: normal;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`]))),gB=C.span(mB||(mB=j([`
  width: 12px;
  padding: 8px;
  font-size: 9px;
  display: flex;
  align-items: center;

  transition: transform 0.05s ease-out, color 0.1s ease-out;
  transform: rotateZ(`,`deg);
  color: #66686a;

  &:hover {
    transform: rotateZ(`,`deg);
    color: #c0c4c9;
  }
`])),e=>e.isCollapsed?0:90,e=>e.isCollapsed?15:75),bB=C.ul(vB||(vB=j([`
  margin: 0;
  padding: 0;
  list-style: none;
`]))),yB=({leaf:e,label:t,children:n,isSelectable:o,isSelected:i,toggleSelect:l,toggleCollapsed:u,isCollapsed:c,valueDisplay:d,contextMenuItems:p})=>{let h=Array.isArray(n)&&n.length>0,b=(0,Mo.useRef)(null);Hb(b.current,e);let[g]=fn(b.current,{menuItems:p??[]});return e.shouldRender?Mo.default.createElement(Ay,{depth:e.depth},g,Mo.default.createElement(By,{ref:b,style:{height:e.nodeHeight+"px"},isSelectable:o===!0,isSelected:i===!0,onClick:l,isEven:e.n%2===0},Mo.default.createElement(gB,{isCollapsed:c,onClick:u},Mo.default.createElement(Kre,null)),Mo.default.createElement(fB,{onClick:u},t),d&&Mo.default.createElement(hB,null,d)),h&&Mo.default.createElement(bB,null,n)):null},zy=yB});function eae(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function qy(e){var t;let n=[];for(;;){let o=n.length,i=(t=e[0])==null?void 0:t[o];if(i===void 0)return n;for(let l of e)if(i!==l[o])return n;n.push(i)}}var Rr,My,va=w(()=>{Ey(),Rr=kp(e=>JSON.stringify(e)),My=e=>JSON.parse(e)});function tae(e,t){let n=(0,Ry.useRef)({combo:e,listener:t});n.current={combo:e,listener:t},(0,Ry.useEffect)(()=>{function o(u){u.key===n.current.combo&&n.current.listener({down:!0,event:u})}function i(u){u.key===n.current.combo&&n.current.listener({down:!1,event:u})}function l(u){n.current.listener({down:!1,event:void 0})}return document.addEventListener("keydown",o),document.addEventListener("keyup",i),window.addEventListener("blur",l),()=>{document.removeEventListener("keydown",o),document.removeEventListener("keyup",i),window.removeEventListener("blur",l)}},[])}var Ry,nae=w(()=>{Ry=V(H())});function xB(e){let[t,n]=(0,kB.useState)(!1);return tae(e,({down:o})=>{n(o)}),t}var kB,wB=w(()=>{kB=V(H()),nae()});function rae(e){let t=(0,Fy.useMemo)(()=>new SB.Atom(e),[]);return(0,Fy.useLayoutEffect)(()=>{t.set(e)},[e]),t}var SB,Fy,oae=w(()=>{SB=ge.requireDist(),Fy=V(H())});function EB(e,t,n){let o=(0,Ly.pointer)({root:{},path:[]}),i=t(o);El(e,(0,Ly.getPointerParts)(i).path,n)}var Ly,aae=w(()=>{Ly=ge.requireDist(),pv()}),Bp,PB,hn,Fr=w(()=>{Bp="data-pos",PB={checkIfMouseEventSnapToPos(e,t){let n=e.composedPath().find(o=>o instanceof Element&&o!==t?.ignore&&o.hasAttribute(Bp));if(n){let o=parseFloat(n.getAttribute(Bp));if(isFinite(o))return o}return null},includePositionSnapAttrs(e){return{[Bp]:e}}},hn=PB});function zp(e){let t=e.type==="sheet"?lae(e):Ny(e);return{byPosition:iae(t),tracks:t}}function iae(e){let t=new Map;for(let n of e)for(let o of n.data.keyframes){let i=t.get(o.position);i||(i=[],t.set(o.position,i)),i.push({kf:o,track:n,itemKey:Vt.forTrackKeyframe(n.sheetObject,n.id,o.id)})}return t}function lae(e){return e.children.filter(t=>t.type==="sheetObject").flatMap(Ny)}function Ny(e){return e.children.flatMap(t=>t.type==="propWithChildren"?Ny(t):sae(t))}function sae(e){let t=e.sheetObject,n=t.address.projectId,o=Z().atomP.historic.coreByProject[n].sheetsById[t.address.sheetId].sequence.tracksByObject[t.address.objectKey],i=(0,Vy.val)(o.trackIdByPropPath[Rr(e.pathToProp)]);if(!i)return[];let l=(0,Vy.val)(o.trackData[i]);return l?[{id:i,data:l,sheetObject:t}]:[]}var Vy,qp=w(()=>{Pe(),Vy=ge.requireDist(),Dr(),va()});function uae(e,t){let[n,o]=$e(null),i=Vl("useCaptureSelection");return pt(t,(0,as.useMemo)(()=>({debugName:"DopeSheetSelectionView/useCaptureSelection",dontBlockMouseDown:!0,lockCSSCursorTo:"cell",onDragStart(l){if(!l.shiftKey||l.target instanceof HTMLInputElement)return!1;let u=t.getBoundingClientRect(),c=l.clientX-u.left-(0,dr.val)(e.scaledSpace.leftPadding),d=(0,dr.val)(e.scaledSpace.toUnitSpace)(c);return n.current={h:[d,d],v:[l.clientY-u.top,l.clientY-u.top]},(0,dr.val)(e.selectionAtom).set({current:void 0}),{onDrag(p,h,b){let g=t.getBoundingClientRect(),m=b.clientX-g.left-(0,dr.val)(e.scaledSpace.leftPadding),y=(0,dr.val)(e.scaledSpace.toUnitSpace)(m);n.current={h:[n.current.h[0],y],v:[n.current.v[0],b.clientY-g.top]};let x=Ky.boundsToSelection(i,(0,dr.val)(e),n.current);(0,dr.val)(e.selectionAtom).set({current:x})},onDragEnd(p){n.current=null}}}}),[e,t,n])),o}var dr,as,vi,IB,jB,CB,Ky,OB,_B,Uy,DB,TB,cae=w(()=>{Pe(),Ct(),wB(),oae(),aae(),Ze(),_e(),dr=ge.requireDist(),as=V(H()),fe(),Fr(),qp(),pi(),vi=5,jB=C.div(IB||(IB=j([`
  cursor: `,`;
`])),e=>e.isShiftDown?"cell":"default"),CB=({layoutP:e,children:t,height:n})=>{let[o,i]=$e(null),l=xB("Shift"),u=uae(e,i),c=(0,as.useRef)(u);return c.current=u,as.default.createElement(jB,{style:{height:n+"px"},ref:o,isShiftDown:l,className:"selectionview"},u&&as.default.createElement(DB,{state:u,layoutP:e}),t)},(e=>{let t=(u,c,d,p,h)=>{let b=zp(d);if(d.top+d.nodeHeight/2+vi>p.v[0]&&d.top+d.nodeHeight/2-vi<p.v[1])for(let[g,m]of b.byPosition){let y=c.scaledSpace.toUnitSpace(vi);if(!(g+y<=p.h[0]||g-y>=p.h[1]))for(let x of m)EB(h,S=>S[x.track.sheetObject.address.objectKey].byTrackId[x.track.id].byKeyframeId[x.kf.id],!0)}o(u,c,d,p,h)},n={sheet(u,c,d,p,h){t(u,c,d,p,h)},propWithChildren(u,c,d,p,h){t(u,c,d,p,h)},sheetObject(u,c,d,p,h){t(u,c,d,p,h)},primitiveProp(u,c,d,p,h){let{sheetObject:b,trackId:g}=d;if(!g)return;let m=(0,dr.val)(Z().atomP.historic.coreByProject[b.address.projectId].sheetsById[b.address.sheetId].sequence.tracksByObject[b.address.objectKey].trackData[g]);if(!(p.v[0]>d.top+d.nodeHeight/2+vi||d.top+d.nodeHeight/2-vi>p.v[1]))for(let y of m.keyframes){let x=c.scaledSpace.toUnitSpace(vi);if(!(y.position+x<=p.h[0])){if(y.position-x>=p.h[1])break;EB(h,S=>S[b.address.objectKey].byTrackId[g].byKeyframeId[y.id],!0)}}}},o=(u,c,d,p,h)=>{if("children"in d)for(let b of d.children)i(u,c,b,p,h)};function i(u,c,d,p,h){if(!d.shouldRender){o(u,c,d,p,h);return}if(p.v[0]>d.top+d.heightIncludingChildren||d.top>p.v[1])return;let b=n[d.type];b?b(u,c,d,p,h):o(u,c,d,p,h)}function l(u,c,d){let p={};d=Uy(d);let h=c.tree;i(u.utilFor.internal(),c,h,d,p);let b=c.tree.sheet;return{type:"DopeSheetSelection",byObjectKey:p,getDragHandlers(g){return{debugName:"DopeSheetSelectionView/boundsToSelection",onDragStart(){let m,y=c.scaledSpace.toUnitSpace;return{onDrag(x,S,E){m&&(m.discard(),m=void 0);let P=hn.checkIfMouseEventSnapToPos(E,{ignore:g.domNode}),O=P!=null?P-g.positionAtStartOfDrag:y(x);m=Z().tempTransaction(({stateEditors:z})=>{let B=z.coreByProject.historic.sheetsById.sequence.transformKeyframes;for(let D of Object.keys(p)){let{byTrackId:X}=p[D];for(let M of Object.keys(X)){let{byKeyframeId:_}=X[M];B({trackId:M,keyframeIds:Object.keys(_),translate:O,scale:1,origin:0,snappingFunction:b.getSequence().closestGridPosition,objectKey:D,projectId:g.projectId,sheetId:g.sheetId})}}})},onDragEnd(x){x?m?.commit():m?.discard()}}}}},delete(){Z().transaction(({stateEditors:g})=>{let m=g.coreByProject.historic.sheetsById.sequence.deleteKeyframes;for(let y of Object.keys(p)){let{byTrackId:x}=p[y];for(let S of Object.keys(x)){let{byKeyframeId:E}=x[S];m(ne(F({},b.address),{objectKey:y,trackId:S,keyframeIds:Object.keys(E)}))}}})}}}e.boundsToSelection=l})(Ky||(Ky={})),_B=C.div(OB||(OB=j([`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 1px dashed rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
`]))),Uy=e=>({h:[...e.h].sort((t,n)=>t-n),v:[...e.v].sort((t,n)=>t-n)}),DB=({state:e,layoutP:t})=>{let n=rae(e);return Ne(()=>{let o=(0,dr.val)(n.pointer),i=Uy(o),l=(0,dr.val)(t.scaledSpace.fromUnitSpace),u=(0,dr.val)(t.scaledSpace.leftPadding),c=i.h.map(l).map(g=>g+u),d=i.v[0],p=i.v[1]-i.v[0],h=c[0],b=c[1]-c[0];return as.default.createElement(_B,{style:{top:d+"px",height:p+"px",left:h+"px",width:b+"px"}})},[t,n])},TB=CB}),Yn,AB,BB,zB,Hy,$y,Wy,qB,MB,RB,Mp=w(()=>{ql(),Yn=V(H()),fe(),vo(),AB=ge.requireDist(),zB=C.div(BB||(BB=j([`
  position: absolute;
  top: 30px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: `,`;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`])),()=>Kr.scrollableArea),Hy=(0,Yn.createContext)(jr),$y=(0,Yn.createContext)(null),Wy=()=>(0,Yn.useContext)($y),qB=()=>(0,Yn.useContext)(Hy),MB=e=>{let t=(0,Yn.useRef)(null),n=(0,Yn.useCallback)(l=>{t.current.scrollBy(0,l.deltaY)},[]),o=(0,Yn.useMemo)(()=>new AB.Atom({scrollTop:0,clientHeight:0}),[]),i=(0,Yn.useCallback)(()=>{t.current&&o.set({scrollTop:t.current.scrollTop,clientHeight:t.current.clientHeight})},[o]);return(0,Yn.useLayoutEffect)(()=>{t.current&&o.set({scrollTop:t.current.scrollTop,clientHeight:t.current.clientHeight});let l=t.current;if(!l)return;let u=new ResizeObserver(()=>{o.set({scrollTop:l.scrollTop,clientHeight:l.clientHeight})});return u.observe(l),()=>u.disconnect()},[o]),Yn.default.createElement($y.Provider,{value:o.pointer},Yn.default.createElement(Hy.Provider,{value:n},Yn.default.createElement(zB,{ref:t,onScroll:i,id:"VerticalScrollContainer"},e.children)))},RB=MB}),Gy,FB=w(()=>{Gy='data:image/svg+xml,<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">%0D%0A  <path d="M1 7V1H7" stroke="%2374FFDE" stroke-width="0.25" />%0D%0A  <path d="M7 33H1L1 27" stroke="%2374FFDE" stroke-width="0.25" />%0D%0A  <path d="M33 27V33H27" stroke="%2374FFDE" stroke-width="0.25" />%0D%0A  <path d="M27 1L33 1V7" stroke="%2374FFDE" stroke-width="0.25" />%0D%0A</svg>'}),Lr,Rp=w(()=>{Lr=(e,t=e)=>`
  left: `.concat(e*-.5,`px;
  top: `).concat(t*-.5,`px;
  width: `).concat(e,`px;
  height: `).concat(t,`px;
`)}),Fp,LB,NB,dae=w(()=>{Fp=ge.requireDist(),LB=(0,Fp.prism)(()=>{let[e,t]=Fp.prism.state("pos",null);return Fp.prism.effect("setupListeners",()=>{let n=o=>{t(o)};return document.addEventListener("mousemove",n),()=>{document.removeEventListener("mousemove",n)}},[]),e}),NB=LB}),Ro,Sn,dc,VB,KB,UB,Yy,so,uo,Lp,HB,$B,Rt=w(()=>{Ro=ge.requireDist(),dae(),Qt(),Sn=V(H()),dc=(0,Sn.createContext)(null),VB=0,KB=({children:e,layoutP:t})=>{let n=(0,Sn.useMemo)(()=>new Ro.Atom([]),[]),o=(0,Sn.useMemo)(()=>(0,Ro.prism)(()=>{let u=Ro.prism.memo("p",()=>HB(t),[t]).getValue(),c=(0,Ro.val)(n.pointer);return c.length>0?Iu(c).position:u}),[t]),i=(0,Sn.useCallback)(()=>{let u=VB++;return n.reduce(c=>[...c,{id:u,position:[-1,0]}]),{set:c=>{n.reduce(d=>{let p=d.findIndex(b=>b.id===u);if(p===-1)return console.warn("Lock is already freed. This is a bug."),d;let h=[...d];return h.splice(p,1,{id:u,position:[c,c===-1?0:1]}),h})},unlock:()=>{n.reduce(c=>c.filter(d=>d.id!==u))}}},[]),l={currentD:o,getLock:i};return Sn.default.createElement(dc.Provider,{value:l},e)},UB=()=>(0,Sn.useContext)(dc).currentD,Yy=()=>{let{getLock:e}=(0,Sn.useContext)(dc),t=(0,Sn.useRef)();return(0,Sn.useLayoutEffect)(()=>()=>{var n;(n=t.current)==null||n.unlock()},[]),(0,Sn.useMemo)(()=>{let n;return(o,i)=>{var l,u;n?.shouldLock!==o&&(o?t.current=e():(l=t.current)==null||l.unlock()),n?.pos!==i&&o&&((u=t.current)==null||u.set(i)),n={shouldLock:o,pos:i}}},[e])},so=(e,t)=>{let{getLock:n}=(0,Sn.useContext)(dc),o=(0,Sn.useRef)();(0,Sn.useLayoutEffect)(()=>{if(e)return o.current=n(),()=>{o.current.unlock()}},[e,n]),(0,Sn.useLayoutEffect)(()=>{e&&o.current.set(t)},[t,e])},uo=e=>({[Lp]:e==="hide"?e:e.toFixed(3)}),Lp="data-theatre-lock-framestamp-to",HB=e=>(0,Ro.prism)(()=>{let t=(0,Ro.val)(e.rightDims),n=(0,Ro.val)(e.clippedSpace.toUnitSpace),o=(0,Ro.val)(NB);if(!o)return[-1,0];for(let h of o.composedPath()){if(!(h instanceof HTMLElement||h instanceof SVGElement))break;if(h.hasAttribute(Lp)){let b=h.getAttribute(Lp);if(typeof b!="string")continue;if(b==="hide")return[-1,0];let g=parseFloat(b);if(isFinite(g)&&g>=0)return[g,2]}}let{clientX:i,clientY:l}=o,{screenX:u,screenY:c,width:d,height:p}=t;if(cv(i,u,u+d)&&cv(l,c+16,c+p)){let h=i-u;return[n(h),3]}else return[-1,0]}),$B=KB}),WB,fc,Qy,GB,YB,En,Xy=w(()=>{tt(),un(),fe(),FB(),Rp(),Fr(),Rt(),WB=12,fc=34,Qy="beingDragged",En={BEING_DRAGGED_CLASS:Qy,CSS:Gn(GB||(GB=j([`
    position: absolute;
    `,`;
    `,`;

    &.`,` {
      pointer-events: none !important;
    }
  `])),Lr(WB),Qe,Qy),CSS_WHEN_SOMETHING_DRAGGING:Gn(YB||(YB=j([`
    pointer-events: auto;
    cursor: var(`,`);

    // ⸢⸤⸣⸥ thing
    // This box extends the hitzone so the user does not
    // accidentally leave the hitzone
    &:hover:after {
      position: absolute;
      top: calc(50% - `,`px);
      left: calc(50% - `,`px);
      width: `,`px;
      height: `,`px;
      display: block;
      content: ' ';
      background: url(`,`) no-repeat 100% 100%;
      // This icon might also fit: GiConvergenceTarget
    }
  `])),Cr,fc/2,fc/2,fc,fc,Gy),reactProps(e){return ne(F(F({},uo(e.position)),hn.includePositionSnapAttrs(e.position)),{className:e.isDragging?En.BEING_DRAGGED_CLASS:""})}}});function Np(){pc.set({mode:"snapToAll"})}function is(){pc.set({mode:"snapToNone"})}function fae(e){pc.set({mode:"snapToSome",positions:e})}function pae(e,t){return Object.fromEntries(Object.entries(e).map(([n,o])=>[n,Object.fromEntries(Object.entries(o.trackData).map(([i,l])=>[i,l.keyframes.filter(u=>t(u,{trackId:i,trackData:l,objectKey:n})).map(u=>u.position)]))]))}var QB,XB,Jy,JB,ZB,e8,t8,n8,Zy,pc,r8,ls=w(()=>{QB=ge.requireDist(),XB=ge.requireDist(),Jy=V(H()),fe(),Xy(),ZB=C.div(JB||(JB=j([`
  z-index: 1;
  cursor: ew-resize;

  `,`

  #pointer-root.draggingPositionInSequenceEditor & {
    `,`
  }
`])),En.CSS,En.CSS_WHEN_SOMETHING_DRAGGING),t8=C.div(e8||(e8=j([`
  position: absolute;
`]))),n8=e=>Jy.default.createElement(t8,{style:{top:"".concat(e.leaf.nodeHeight/2,"px"),left:"calc(".concat((0,XB.val)(e.layoutP.scaledSpace.leftPadding),"px + calc(var(--unitSpaceToScaledSpaceMultiplier) * ").concat(e.position,"px))")}},Jy.default.createElement(ZB,F({},En.reactProps({isDragging:!1,position:e.position})))),Zy=n8,pc=new QB.Atom({mode:"snapToNone"}),r8=pc.prism});function hae(e,t){let n=(0,bi.useMemo)(()=>({debugName:"HorizontallyScrollableArea",onDragStart(i){if(i.target instanceof HTMLInputElement||i.shiftKey||i.altKey||i.ctrlKey||i.metaKey||i.composedPath().some(b=>b instanceof HTMLElement&&b.draggable===!0))return!1;let l=i.clientX-t.getBoundingClientRect().left,u=at((0,wt.val)(e.clippedSpace.toUnitSpace)(l),0,1/0),c=(0,wt.val)(e.seeker.setIsSeeking),d=(0,wt.val)(e.sheet).getSequence();d.position=u;let p=u,h=(0,wt.val)(e.scaledSpace.toUnitSpace);return c(!0),Np(),{onDrag(b,g,m){let y=h(b),x=at(p+y,0,d.length),S=hn.checkIfMouseEventSnapToPos(m,{});S!=null&&(x=S),d.position=x},onDragEnd(){c(!1),is()}}}}),[e,t]),[o]=pt(t,n);Dn(o,"draggingPositionInSequenceEditor","ew-resize")}function mae(e,t){let n=qB();(0,bi.useLayoutEffect)(()=>{if(!t)return;let o=l=>{if(l.ctrlKey){l.preventDefault(),l.stopPropagation();let u=l.clientX-t.getBoundingClientRect().left,c=(0,wt.val)(e.clippedSpace.toUnitSpace)(u),d=(0,wt.val)(e.clippedSpace.range),p=1+e1(l.deltaY,[-50,50])*.03,h=oi(d,m=>(m-c)*p+c),b=(0,wt.val)(e.sheet).getSequence().length,g=b+b*.25;(0,wt.val)(e.clippedSpace.setRange)(gae(h,[0,g]));return}else if(l.shiftKey){l.preventDefault(),l.stopPropagation();let u=(0,wt.val)(e.sheet).getSequence().length,c=(0,wt.val)(e.clippedSpace.range),d=(c.end-c.start)/u,p=e1(l.deltaY||l.deltaX,[-50,50])*.05*d,h=oi(c,b=>b+p);(0,wt.val)(e.clippedSpace.setRange)(h);return}else{n(l),l.preventDefault(),l.stopPropagation();let u=(0,wt.val)(e.scaledSpace.toUnitSpace)(l.deltaX*1),c=(0,wt.val)(e.clippedSpace.range),d=oi(c,p=>p+u);(0,wt.val)(e.clippedSpace.setRange)(d);return}},i={capture:!0,passive:!1};return t.addEventListener("wheel",o,i),()=>{t.removeEventListener("wheel",o,i)}},[t,e]),pt(t,(0,bi.useMemo)(()=>({onDragStart(o){let i=(0,wt.val)(e.clippedSpace.range),l=(0,wt.val)(e.clippedSpace.setRange),u=(0,wt.val)(e.scaledSpace.toUnitSpace);return o.preventDefault(),o.stopPropagation(),{onDrag(c,d,p,h,b){n({deltaY:-b});let g=-u(c),m=oi(i,y=>y+g);l(m)}}},debugName:"HorizontallyScrollableArea Middle Button Drag",buttons:[1],lockCSSCursorTo:"grabbing"}),[e]))}function e1(e,[t,n]){return Math.max(Math.min(e,n),t)}function gae(e,t){return oi(e,n=>e1(n,t))}function vae(e,t){(0,bi.useLayoutEffect)(()=>{if(!t)return;let n=(0,wt.prism)(()=>{let u=(0,wt.val)(e.clippedSpace.range);return(0,wt.val)(e.scaledSpace.fromUnitSpace)(u.start)}),o=()=>{let u=n.getValue();t.scrollLeft=u},i=n.onStale(o);o();let l=setTimeout(o,100);return()=>{clearTimeout(l),i()}},[e,t])}var wt,bi,o8,a8,i8,Vp,t1=w(()=>{Ct(),Ze(),_e(),wt=ge.requireDist(),Qt(),bi=V(H()),fe(),Mp(),tt(),un(),Fr(),ls(),a8=C.div(o8||(o8=j([`
  position: absolute;
  right: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  `,`;

  // hide the scrollbar on Gecko
  scrollbar-width: none;

  // hide the scrollbar on Webkit/Blink
  &::-webkit-scrollbar {
    display: none;
  }
`])),Qe),i8=bi.default.memo(({layoutP:e,children:t,height:n})=>{let{width:o,unitSpaceToScaledSpaceMultiplier:i}=Ne(()=>({width:(0,wt.val)(e.rightDims.width),unitSpaceToScaledSpaceMultiplier:(0,wt.val)(e.scaledSpace.fromUnitSpace)(1)}),[e]),[l,u]=$e(null);return mae(e,u),hae(e,u),vae(e,u),bi.default.createElement(a8,{ref:l,style:{width:o+"px",height:n+"px","--unitSpaceToScaledSpaceMultiplier":i}},t)}),Vp=i8}),Kp,l8,s8,u8,c8,d8,f8,p8,yi,Up=w(()=>{Kp=V(H()),fe(),s8=C.li(l8||(l8=j([`
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  position: relative;
`]))),c8=C.div(u8||(u8=j([`
  box-sizing: border-box;
  width: 100%;
  position: relative;

  &:before {
    position: absolute;
    display: block;
    content: ' ';
    left: -40px;
    top: 0;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    border-bottom: 1px solid #252b3869;
    background: `,`;
  }
`])),e=>e.isEven?"transparent":"#6b8fb505"),f8=C.ul(d8||(d8=j([`
  margin: 0;
  padding: 0;
  list-style: none;
`]))),p8=({leaf:e,children:t,node:n,isCollapsed:o})=>{let i=Array.isArray(t)&&t.length>0;return e.shouldRender?Kp.default.createElement(s8,null,Kp.default.createElement(c8,{style:{height:e.nodeHeight+"px"},isEven:e.n%2===0},n),i&&Kp.default.createElement(f8,null,t)):null},yi=p8}),bae=Te((e,t)=>{(function(){var n=this,o={};typeof e<"u"?t.exports=o:n.fuzzy=o,o.simpleFilter=function(i,l){return l.filter(function(u){return o.test(i,u)})},o.test=function(i,l){return o.match(i,l)!==null},o.match=function(i,l,u){u=u||{};var c=0,d=[],p=l.length,h=0,b=0,g=u.pre||"",m=u.post||"",y=u.caseSensitive&&l||l.toLowerCase(),x;i=u.caseSensitive&&i||i.toLowerCase();for(var S=0;S<p;S++)x=l[S],y[S]===i[c]?(x=g+x+m,c+=1,b+=1+b):b=0,h+=b,d[d.length]=x;return c===i.length?(h=y===i?1/0:h,{rendered:d.join(""),score:h}):null},o.filter=function(i,l,u){return!l||l.length===0?[]:typeof i!="string"?l:(u=u||{},l.reduce(function(c,d,p,h){var b=d;u.extract&&(b=u.extract(d));var g=o.match(i,b,u);return g!=null&&(c[c.length]={string:g.rendered,score:g.score,index:p,original:d}),c},[]).sort(function(c,d){var p=d.score-c.score;return p||c.index-d.index}))}})()});function yae(e,t){let[n,o]=(0,Hp.useState)(!1),i=(0,Hp.useRef)(t);return n||(i.current=t),(0,Hp.useMemo)(()=>e(o),i.current)}var Hp,xae=w(()=>{Hp=V(H())}),n1,ba,$p=w(()=>{n1="rgba(26, 28, 30, 0.97);",ba="#272B2F"});function h8(e,t,n,o){let i=yae(l=>({debugName:"CurveSegmentEditor/useKeyframeDrag",lockCSSCursorTo:"move",onDragStart(){return l(!0),{onDrag(u,c){e&&n.onCurveChange(o(u,c))},onDragEnd(u){l(!1),n.onCancelCurveChange()}}}}),[e,n.onCurveChange,n.onCancelCurveChange]);pt(t,i)}var Xe,Wp,hc,ss,m8,mc,g8,Gp,v8,b8,y8,us,x8,xi,k8,w8,r1,S8,Yp,E8,o1,P8,I8,kae=w(()=>{Xe=V(H()),Ct(),Ze(),wu(),fe(),tt(),xae(),$p(),Wp=.12,hc=1+Wp*2,ss=.01,m8=8,mc=(1-ss)/(m8-1),g8="#3EAAA4",Gp="#3EAAA4",v8="#3EAAA4",b8="#3EAAA4",y8="#3EAAA4",us="#3EAAA4",x8="#3EAAA4",xi="#B3B3B3",k8="#3eaaa4",w8="#67dfd8",r1=["goldenrod","cornflowerblue","dodgerblue","lawngreen"],Yp=C.circle(S8||(S8=j([`
  stroke-width: 0.1px;
  vector-effect: non-scaling-stroke;
  r: 0.04px;
  pointer-events: none;
  transition: r 0.15s;
  fill: `,`;
`])),k8),o1=C.circle(E8||(E8=j([`
  stroke-width: 0.1px;
  vector-effect: non-scaling-stroke;
  r: 0.09px;
  cursor: move;
  `,`;
  &:hover {
    opacity: 0.4;
  }
  &:hover + `,` {
    fill: `,`;
  }
`])),Qe,Yp,w8),P8=e=>{let{curveConnection:{left:t,right:n},backgroundConnections:o}=e,i=Math.min(0,1-n.handles[1],1-t.handles[3]),l=Math.max(1,1-n.handles[1],1-t.handles[3]),u=Math.max(1,l-i),c=E=>(E-i)/u,[d,p]=$e(null),h=hc/(p?.clientWidth||1),b=hc/(p?.clientHeight||1),[g,m]=$e(null);h8(p,m,e,(E,P)=>{let O=at(t.handles[2]+E*h,0,1),z=t.handles[3]-P*b;return[O,z,n.handles[0],n.handles[1]]});let[y,x]=$e(null);h8(p,x,e,(E,P)=>{let O=at(n.handles[0]+E*h,0,1),z=n.handles[1]-P*b;return[t.handles[2],t.handles[3],O,z]});let S=E=>"M0 ".concat(c(1)," C").concat(E.left.handles[2]," ").concat(c(1-E.left.handles[3])," ").concat(E.right.handles[0]," ").concat(c(1-E.right.handles[1])," 1 ").concat(c(0));return Xe.default.createElement("svg",{height:"100%",width:"100%",ref:d,viewBox:"".concat(-Wp," ").concat(-Wp," ").concat(hc," ").concat(hc),xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",fill:"none"},Xe.default.createElement("linearGradient",{id:"myGradient",gradientTransform:"rotate(90)"},Xe.default.createElement("stop",{offset:c(-1),stopColor:x8}),Xe.default.createElement("stop",{offset:c(0),stopColor:us}),Xe.default.createElement("stop",{offset:c(.3),stopColor:y8}),Xe.default.createElement("stop",{offset:c(.5),stopColor:b8}),Xe.default.createElement("stop",{offset:c(.7),stopColor:v8}),Xe.default.createElement("stop",{offset:c(1),stopColor:Gp}),Xe.default.createElement("stop",{offset:c(2),stopColor:g8})),Xe.default.createElement("pattern",{id:"dot-background-pattern-1",width:mc,height:mc/u,y:-i/u},Xe.default.createElement("rect",{width:ss,height:ss,fill:xi,opacity:.3})),Xe.default.createElement("rect",{x:0,y:0,width:"1",height:1,fill:"url(#dot-background-pattern-1)"}),Xe.default.createElement("pattern",{id:"dot-background-pattern-2",width:mc,height:mc},Xe.default.createElement("rect",{width:ss,height:ss,fill:xi})),Xe.default.createElement("rect",{x:0,y:c(0),width:"1",height:c(1)-c(0),fill:"url(#dot-background-pattern-2)"}),!t.type||t.type==="bezier"?Xe.default.createElement(Xe.default.Fragment,null,Xe.default.createElement("line",{x1:0,y1:c(1),x2:t.handles[2],y2:c(1-t.handles[3]),stroke:xi,strokeWidth:"0.01"}),Xe.default.createElement("line",{x1:1,y1:c(0),x2:n.handles[0],y2:c(1-n.handles[1]),stroke:xi,strokeWidth:"0.01"}),Xe.default.createElement("path",{d:S(e.curveConnection),stroke:"none",fill:"url('#myGradient')",opacity:"0.1"}),o.map((E,P)=>Xe.default.createElement("path",{key:E.objectKey+"/"+E.left.id,d:S(E),stroke:r1[P%r1.length],opacity:.6,strokeWidth:"0.01"})),Xe.default.createElement("path",{d:S(e.curveConnection),stroke:"url('#myGradient')",strokeWidth:"0.02"}),Xe.default.createElement("circle",{cx:0,cy:c(1),r:"0.025",stroke:Gp,strokeWidth:"0.02",fill:ba}),Xe.default.createElement("circle",{cx:1,cy:c(0),r:"0.025",stroke:us,strokeWidth:"0.02",fill:ba}),Xe.default.createElement(o1,{ref:g,cx:t.handles[2],cy:c(1-t.handles[3]),fill:Gp,opacity:.2}),Xe.default.createElement(Yp,{cx:t.handles[2],cy:c(1-t.handles[3])}),Xe.default.createElement(o1,{ref:y,cx:n.handles[0],cy:c(1-n.handles[1]),fill:us,opacity:.2}),Xe.default.createElement(Yp,{cx:n.handles[0],cy:c(1-n.handles[1])})):Xe.default.createElement(Xe.default.Fragment,null,Xe.default.createElement("line",{x1:0,y1:c(1),x2:1,y2:c(1),stroke:xi,strokeWidth:"0.01"}),Xe.default.createElement("line",{x1:1,y1:c(1),x2:1,y2:0,stroke:xi,strokeWidth:"0.01"}),Xe.default.createElement("circle",{cx:0,cy:1,r:"0.025",stroke:us,strokeWidth:"0.02",fill:ba}),Xe.default.createElement("circle",{cx:1,cy:0,r:"0.025",stroke:us,strokeWidth:"0.02",fill:ba})))},I8=P8}),j8,Fo,a1,C8,O8,_8,D8,T8=w(()=>{j8=ge.requireDist(),Ze(),Fo=V(H()),a1=(0,Fo.createContext)(null),C8=0,O8=()=>{let e=(0,Fo.useMemo)(()=>C8++,[]),{cur:t,set:n}=(0,Fo.useContext)(a1),[o,i]=$e(!1),l=(0,Fo.useCallback)((u,c)=>{n(u?e:-1,c)},[]);return(0,Fo.useEffect)(()=>t.onStale(()=>{let u=t.getValue()===e;o.current!==u&&(o.current=u)}),[t,e]),[i,l]},_8=({children:e})=>{let t=(0,Fo.useMemo)(()=>new j8.Atom(-1),[]),n=t.prism,o=(0,Fo.useMemo)(()=>{let i;return(l,u)=>{let c=i!==void 0;i!==void 0&&(clearTimeout(i),i=void 0),u===0||c?t.set(l):i=setTimeout(()=>{t.set(l),i=void 0},u)}},[]);return Fo.default.createElement(a1.Provider,{value:{cur:n,set:o}},e)},D8=_8});function Qp(e,t){let n=e.enabled!==!1,[o,i]=O8(),[l,u]=$e(null);(0,B8.useEffect)(()=>{if(!n)return;let d=l.current;if(!d)return;let p=()=>{var b;return i(!0,(b=e.enterDelay)!=null?b:400)},h=()=>{var b;return i(!1,(b=e.exitDelay)!=null?b:200)};return d.addEventListener("mouseenter",p),d.addEventListener("mouseleave",h),()=>{d.removeEventListener("mouseenter",p),d.removeEventListener("mouseleave",h)}},[l,n,e.enterDelay,e.exitDelay]);let c=(0,A8.useContext)(Bl);return[n&&o&&u?(0,z8.createPortal)(Xp.default.createElement(vy,{children:t,target:u,onClickOutside:jr,verticalPlacement:e.verticalPlacement,verticalGap:e.verticalGap}),c):Xp.default.createElement(Xp.default.Fragment,null),l,o]}var A8,B8,Xp,z8,Jp=w(()=>{Ze(),A8=V(H()),B8=V(H()),Xp=V(H()),wT(),z8=V(Io()),T8(),di(),ql()});function Zp(e){return e.map(t=>t.toFixed(3)).join(", ")}function eh(e){if(!e||e?.length>q8)return null;let t=e.split(",");if(t.length!==4)return null;let n=t.map(o=>Number(o.trim()));return!n.every(o=>isFinite(o))||n[0]<0||n[0]>1||n[2]<0||n[2]>1?null:n}function wae(e,t,n={threshold:.02}){if(!e||!t)return!1;let o=0;for(let i=0;i<4;i++)o+=Math.abs(e[i]-t[i]);return o<n.threshold}var q8,th,M8=w(()=>{q8=128,th=[{label:"Quad Out",value:"0.250, 0.460, 0.450, 0.940"},{label:"Quad In Out",value:"0.455, 0.030, 0.515, 0.955"},{label:"Quad In",value:"0.550, 0.085, 0.680, 0.530"},{label:"Cubic Out",value:"0.215, 0.610, 0.355, 1.000"},{label:"Cubic In Out",value:"0.645, 0.045, 0.355, 1.000"},{label:"Cubic In",value:"0.550, 0.055, 0.675, 0.190"},{label:"Quart Out",value:"0.165, 0.840, 0.440, 1.000"},{label:"Quart In Out",value:"0.770, 0.000, 0.175, 1.000"},{label:"Quart In",value:"0.895, 0.030, 0.685, 0.220"},{label:"Quint Out",value:"0.230, 1.000, 0.320, 1.000"},{label:"Quint In Out",value:"0.860, 0.000, 0.070, 1.000"},{label:"Quint In",value:"0.755, 0.050, 0.855, 0.060"},{label:"Sine Out",value:"0.390, 0.575, 0.565, 1.000"},{label:"Sine In Out",value:"0.445, 0.050, 0.550, 0.950"},{label:"Sine In",value:"0.470, 0.000, 0.745, 0.715"},{label:"Expo Out",value:"0.190, 1.000, 0.220, 1.000"},{label:"Expo In Out",value:"1.000, 0.000, 0.000, 1.000"},{label:"Expo In",value:"0.780, 0.000, 0.810, 0.00"},{label:"Circ Out",value:"0.075, 0.820, 0.165, 1.000"},{label:"Circ In Out",value:"0.785, 0.135, 0.150, 0.860"},{label:"Circ In",value:"0.600, 0.040, 0.980, 0.335"},{label:"Back Out",value:"0.175, 0.885, 0.320, 1.275"},{label:"Back In Out",value:"0.680, -0.550, 0.265, 1.550"},{label:"Back In",value:"0.600, -0.280, 0.735, 0.045"},{label:"linear",value:"0.5, 0.5, 0.5, 0.5"},{label:"In Out",value:"0.42,0,0.58,1"},{label:"Hold",value:"0, 0, Infinity, Infinity"}]}),mn,nh,ki,i1,R8,F8,gc,l1,s1,L8,N8,Sae=w(()=>{mn=V(H()),nh=.75,ki=.1,i1=1+nh*2,R8="#F5F5F5",F8="#888888",gc="#4f4f4f",l1="rgba(255, 255, 255, 0.1)",s1=e=>1-e,L8=e=>{let{easing:t,isSelected:n}=e,o=n?R8:F8,i="".concat(-nh," ").concat(-nh," ").concat(i1," ").concat(i1);if(t){let l=[t[0],s1(t[1])],u=[t[2],s1(t[3])];return mn.default.createElement("svg",{height:"100%",width:"100%",viewBox:i,fill:"none",xmlns:"http://www.w3.org/2000/svg"},mn.default.createElement("line",{x1:"0",y1:"1",x2:l[0],y2:l[1],stroke:gc,strokeWidth:"0.1"}),mn.default.createElement("line",{x1:"1",y1:"0",x2:u[0],y2:u[1],stroke:gc,strokeWidth:"0.1"}),mn.default.createElement("circle",{cx:l[0],cy:l[1],r:.1,fill:l1}),mn.default.createElement("circle",{cx:u[0],cy:u[1],r:.1,fill:l1}),mn.default.createElement("circle",{cx:l[0],cy:l[1],r:ki,fill:gc}),mn.default.createElement("circle",{cx:u[0],cy:u[1],r:ki,fill:gc}),mn.default.createElement("path",{d:"M0 1 C".concat(l[0]," ").concat(l[1]," ").concat(u[0],` 
        `).concat(u[1]," 1 0"),stroke:o,strokeWidth:"0.08"}),mn.default.createElement("circle",{cx:0,cy:1,r:ki,fill:o}),mn.default.createElement("circle",{cx:1,cy:0,r:ki,fill:o}))}return mn.default.createElement("svg",{height:"100%",width:"100%",viewBox:i,fill:"none",xmlns:"http://www.w3.org/2000/svg"},mn.default.createElement("line",{x1:"0",y1:"1",x2:1,y2:1,stroke:o,strokeWidth:"0.08"}),mn.default.createElement("line",{x1:"1",y1:"0",x2:1,y2:1,stroke:o,strokeWidth:"0.08"}),mn.default.createElement("circle",{cx:0,cy:1,r:ki,fill:o}),mn.default.createElement("circle",{cx:1,cy:0,r:ki,fill:o}))},N8=L8}),vc,V8,K8,U8,H8,$8,W8,G8,Eae=w(()=>{Jp(),vc=V(H()),fe(),M8(),Sae(),ip(),$p(),Br(),U8=C.div(K8||(K8=j([`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 1;

  transition: background-color 0.15s;
  background-color: `,`;
  border-radius: 2px;
  cursor: pointer;
  outline: none;

  `,`

  &:hover {
    background-color: #31353a;
  }

  &:focus {
    background-color: #383d42;
  }
`])),ba,({isSelected:e})=>e&&Gn(V8||(V8=j([`
      background-color: #383d42;
    `])))),$8=C(An)(H8||(H8=j([`
  padding: 0.5em;
  color: white;
  max-width: 240px;
  pointer-events: none !important;
  --popover-bg: black;
  --popover-outer-stroke: transparent;
  --popover-inner-stroke: transparent;
  box-shadow: none;
`]))),W8=vc.default.forwardRef((e,t)=>{let[n,o]=Qp({enabled:!0,verticalPlacement:e.tooltipPlacement,verticalGap:0},()=>vc.default.createElement($8,{showPopoverEdgeTriangle:!1},e.easing.label));return vc.default.createElement(U8,F({ref:ap([o,t])},e),n,vc.default.createElement(N8,{easing:eh(e.easing.value),isSelected:e.isSelected}))}),G8=W8});function Pae(e){var t;let[n,o]=(0,Y8.useState)(null),i=u=>{if(n===null){e.items.length>0&&o(0);return}let c=n+u*e.uiColumns,d=c<0,p=c>e.items.length-1;if(d||p){if(e.canVerticleExit&&e.canVerticleExit(d?"top":"bottom")){o(null);return}return}o(c)},l=u=>{n===null?o(Oae(u,e.items.length)):n+u<0?o(null):o(Math.min(n+u,e.items.length-1))};return{focusFirstItem(){o(0)},onParentEltKeyDown:u=>{if(u.key==="ArrowRight")l(1);else if(u.key==="ArrowLeft")l(-1);else if(u.key==="ArrowUp")i(-1);else if(u.key==="ArrowDown")i(1);else return 0;return 1},gridItems:e.items.map((u,c)=>e.renderItem({isSelected:c===n,item:u,select(d){o(c),e.onSelectItem(u)===1&&(d?.preventDefault(),d?.stopPropagation())}})),currentSelection:(t=e.items[n??-1])!=null?t:null}}var Y8,Iae=w(()=>{Y8=V(H()),hz()});function Q8(e,t,n){var o;(o=e.current)==null||o.discard(),e.current=null;let i=eh(n);i===null?e.current=Cae(t):e.current=jae(t,i)}function X8(e){var t;(t=e.current)==null||t.discard(),e.current=null}function jae(e,t){return Z().tempTransaction(({stateEditors:n})=>{let{setHandlesForKeyframe:o,setKeyframeType:i}=n.coreByProject.historic.sheetsById.sequence;for(let{projectId:l,sheetId:u,objectKey:c,trackId:d,left:p,right:h}of e)o({projectId:l,sheetId:u,objectKey:c,trackId:d,keyframeId:p.id,start:[t[0],t[1]]}),o({projectId:l,sheetId:u,objectKey:c,trackId:d,keyframeId:h.id,end:[t[2],t[3]]}),i({projectId:l,sheetId:u,objectKey:c,trackId:d,keyframeId:p.id,keyframeType:"bezier"})})}function Cae(e){return Z().tempTransaction(({stateEditors:t})=>{let{setKeyframeType:n}=t.coreByProject.historic.sheetsById.sequence;for(let{projectId:o,sheetId:i,objectKey:l,trackId:u,left:c}of e)n({projectId:o,sheetId:i,objectKey:l,trackId:u,keyframeId:c.id,keyframeType:"hold"})})}function Oae(e,t){return(e%t+t)%t}function _ae(e,t){return()=>setTimeout(e,t)}function Dae({left:e,right:t}){return({left:n,right:o})=>e.handles[2]!==n.handles[2]||e.handles[3]!==n.handles[3]||t.handles[0]!==o.handles[0]||t.handles[1]!==o.handles[1]}var rh,ht,J8,u1,c1,Z8,ez,tz,nz,rz,oz,az,iz,lz,sz,uz,cz,dz,Tae,fz,pz,hz=w(()=>{rh=ge.requireDist(),ht=V(H()),fe(),J8=V(bae()),Pe(),kae(),Eae(),M8(),$p(),Ze(),Iae(),u1=3,c1=53,Z8=25,tz=C.div(ez||(ez=j([`
  background: `,`;
  display: grid;
  grid-template-areas:
    'search  tween'
    'presets tween';
  grid-template-rows: 32px 1fr;
  grid-template-columns: `,`px 120px;
  gap: 1px;
  height: 120px;
`])),n1,u1*c1),rz=C.div(nz||(nz=j([`
  overflow: auto;
  grid-area: presets;

  display: grid;
  grid-template-columns: repeat(`,`, 1fr);
  grid-auto-rows: min-content;
  gap: 1px;

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`])),u1),az=C.input.attrs({type:"text"})(oz||(oz=j([`
  background-color: `,`;
  border: none;
  border-radius: 2px;
  color: rgba(255, 255, 255, 0.8);
  padding: 6px;
  font-size: 12px;
  outline: none;
  cursor: text;
  text-align: left;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  grid-area: search;

  &:hover {
    background-color: #212121;
  }

  &:focus {
    background-color: rgba(16, 16, 16, 0.26);
    outline: 1px solid rgba(0, 0, 0, 0.35);
  }
`])),ba),lz=C.div(iz||(iz=j([`
  grid-area: tween;
  background: `,`;
`])),ba),uz=C.div(sz||(sz=j([`
  grid-column: 1 / 4;
  padding: 6px;
  color: #888888;
`]))),cz=e=>{let t=(0,ht.useMemo)(()=>[e.curveConnection,...e.additionalConnections],[e.curveConnection,...e.additionalConnections]),n=(0,ht.useRef)(null);(0,ht.useEffect)(()=>{let N=pz(t);return()=>{var se;N(),(se=n.current)==null||se.commit()}},[n]);let o=[e.curveConnection.left.handles[2],e.curveConnection.left.handles[3],e.curveConnection.right.handles[0],e.curveConnection.right.handles[1]],i=(0,ht.useRef)(null);(0,ht.useLayoutEffect)(()=>{var N,se;(N=i.current)==null||N.select(),(se=i.current)==null||se.focus()},[i.current]);let[l,u]=(0,ht.useState)(Zp(o)),c=N=>{N!==void 0&&(h(1),u(N.target.value),eh(N.target.value)&&g(N.target.value))},d=N=>{var se,K;h(1),(N.key==="ArrowDown"||N.key==="ArrowUp")&&N.preventDefault(),N.key==="ArrowDown"?(U.focusFirstItem(),(K=(se=D.current[E[0].label])==null?void 0:se.current)==null||K.focus()):N.key==="Escape"?(X8(n),e.onRequestClose("key Escape")):N.key==="Enter"&&e.onRequestClose("key Enter")},[p,h]=(0,ht.useState)(0);(0,ht.useEffect)(()=>{p===2?u(Zp(o)):p===3&&l!==""&&u("")},t);let[b,g]=(0,ht.useState)(Zp(o)),[m,y]=(0,ht.useState)(null);(0,ht.useEffect)(()=>{var N;p!==0&&p!==3&&Q8(n,t,(N=m??b)!=null?N:"")},[m,b,p]),t.some(Dae(e.curveConnection))&&p===0&&h(3);let x=N=>{var se,K;h(2);let ce=Zp(N);u(ce),g(ce),(se=i.current)==null||se.select(),(K=i.current)==null||K.focus()},S=()=>{},E=(0,ht.useMemo)(()=>/^[A-Za-z]/.test(l)?J8.default.filter(l,th,{extract:N=>N.label}).map(N=>N.original):th,[l]);(0,ht.useEffect)(()=>{p===1&&E[0]&&g(E[0].value)},[E]);let P=N=>{N.key==="Escape"?(X8(n),e.onRequestClose("key Escape"),N.stopPropagation()):N.key==="Enter"&&(e.onRequestClose("key Enter"),N.stopPropagation())},O=N=>{p===0&&h(2),y(N.value)},z=()=>y(null),B=N=>(Q8(n,t,N.value),e.onRequestClose("selected easing option"),1),D=(0,ht.useRef)(th.reduce((N,se)=>(N[se.label]={current:null},N),{})),[X,M]=$e(null),[_,L]=(0,ht.useState)(0);(0,ht.useEffect)(()=>{let N=()=>{var se;L((se=M?.scrollTop)!=null?se:0)};return M?.addEventListener("scroll",N),()=>M?.removeEventListener("scroll",N)},[M]);let U=Pae({items:E,uiColumns:3,onSelectItem:B,canVerticleExit(N){var se,K;return N==="top"?((se=i.current)==null||se.select(),(K=i.current)==null||K.focus(),1):0},renderItem:({item:N,select:se})=>{var K,ce;return ht.default.createElement(G8,{key:N.label,easing:N,tabIndex:0,onKeyDown:P,ref:D.current[N.label],onMouseOver:()=>O(N),onMouseOut:z,onClick:se,tooltipPlacement:((ce=(K=D.current[N.label].current)==null?void 0:K.offsetTop)!=null?ce:0)-(_??0)<c1+Z8?"bottom":"top",isSelected:wae(o,eh(N.value))})}});return(0,ht.useLayoutEffect)(()=>{var N,se;if(U.currentSelection!==null&&document.activeElement!==i.current){let K=(se=(N=D.current)==null?void 0:N[U.currentSelection.label])==null?void 0:se.current;K?.focus(),g(U.currentSelection.value),/^[A-Za-z]/.test(l)||u(U.currentSelection.value)}},[U.currentSelection]),ht.default.createElement(tz,null,ht.default.createElement(az,{value:l,placeholder:p===3?"Multiple easings selected":"Search presets...",onPaste:_ae(c),onChange:c,ref:i,onKeyDown:d}),ht.default.createElement(rz,{ref:X,onKeyDown:N=>U.onParentEltKeyDown(N)},U.gridItems,U.gridItems.length===0?ht.default.createElement(uz,null,"No results found"):void 0),ht.default.createElement(lz,{onClick:()=>{var N;return(N=i.current)==null?void 0:N.focus()}},ht.default.createElement(I8,{curveConnection:e.curveConnection,backgroundConnections:e.additionalConnections,onCurveChange:x,onCancelCurveChange:S})))},dz=cz,{isCurveEditorOpenD:Tae,isConnectionEditingInCurvePopover:fz,getLock:pz}=(()=>{let e=new rh.Atom([]);return{getLock(t){return e.set(t),function(){e.set([])}},isCurveEditorOpenD:(0,rh.prism)(()=>e.prism.getValue().length>0),isConnectionEditingInCurvePopover(t){return rh.prism.ensurePrism(),e.prism.getValue().some(({left:n,right:o})=>t.left.id===n.id&&t.right.id===o.id)}}})()});function Aae(e,t){for(let{keyframeId:n}of Mae(t))if(e.left.id===n)return!0;return!1}function Bae(e,t,n){return(0,oh.prism)(()=>{if(n===void 0)return[];let o=[];for(let{objectKey:i,trackId:l}of vz(n)){let u=(0,oh.val)(Z().atomP.historic.coreByProject[e].sheetsById[t].sequence.tracksByObject[i].trackData[l]);u&&(o=o.concat(qae(u.keyframes).filter(c=>Aae(c,n)).map(({left:c,right:d})=>({left:c,right:d,trackId:l,objectKey:i,sheetId:t,projectId:e}))))}return o})}function mz(e,t,n){var o;if(n===void 0)return[];let i=[];for(let{objectKey:u,trackId:c,keyframeIds:d}of vz(n))i=i.concat((o=gz({projectId:e,sheetId:t,objectKey:u,trackId:c,keyframeIds:d}))!=null?o:[]);let l=qy(i.map(u=>u.pathToProp));return i.map(({keyframe:u,pathToProp:c})=>({keyframe:u,pathToProp:c.slice(l.length)}))}function gz({projectId:e,sheetId:t,objectKey:n,trackId:o,keyframeIds:i}){let l=(0,oh.val)(Z().atomP.historic.coreByProject[e].sheetsById[t].sequence.tracksByObject[n]),u=l?.trackData[o];if(!u)return null;let c=zae(l?.trackIdByPropPath||{})[o];if(!c)return null;let d=[n,...My(c)];return i.map(p=>({keyframe:u.keyframes.find(h=>h.id===p),pathToProp:d})).filter(({keyframe:p})=>p!==void 0)}function zae(e){let t={};for(let[n,o]of Object.entries(e))t[o]=n;return t}function qae(e){return e.map((t,n)=>({left:t,right:e[n+1]})).slice(0,-1)}function Mae(e){var t,n,o;let i=[];for(let[l,u]of Object.entries((t=e?.byObjectKey)!=null?t:{}))for(let[c,d]of Object.entries((n=u?.byTrackId)!=null?n:{}))for(let p of Object.keys((o=d?.byKeyframeId)!=null?o:{}))i.push({objectKey:l,trackId:c,keyframeId:p});return i}function vz(e){var t,n,o;let i=[];for(let[l,u]of Object.entries((t=e?.byObjectKey)!=null?t:{}))for(let[c,d]of Object.entries((n=u?.byTrackId)!=null?n:{}))i.push({objectKey:l,trackId:c,keyframeIds:Object.keys((o=d?.byKeyframeId)!=null?o:{})});return i}var oh,ah=w(()=>{oh=ge.requireDist(),Pe(),va()});function Rae(e,t){return(0,bz.useMemo)(()=>Fae(e,t),[])}function Fae(e,t){let n=null,o=u=>Z().tempTransaction(c=>e(c,u));function i(){n?.discard(),n=null}let l={createAsset:t.sheet.project.assetStorage.createAsset,getAssetUrl:u=>u.id?t.sheet.project.assetStorage.getAssetUrl(u.id):void 0};return F({temporarilySetValue(u){i(),n=o(u)},discardTemporaryValue:i,permanentlySetValue(u){i(),o(u).commit()}},l)}var bz,Lae=w(()=>{Pe(),bz=V(H())});function d1(e){var t;if(e.type==="sheetObject")return Jt.default.createElement(Jt.default.Fragment,null,Jt.default.createElement(ih,{style:{paddingLeft:"".concat(e.indent*lh,"px")}},e.sheetObject.address.objectKey),e.children.map((n,o)=>Jt.default.createElement(d1,ne(F({key:o},n),{autoFocusInput:e.autoFocusInput&&o===0,indent:e.indent+1}))));if(e.type==="propWithChildren"){let n=(t=e.propConfig.label)!=null?t:Iu(e.pathToProp);return Jt.default.createElement(Jt.default.Fragment,null,Jt.default.createElement(ih,{style:{paddingLeft:"".concat(e.indent*lh,"px")}},n),e.children.map((o,i)=>Jt.default.createElement(d1,ne(F({key:i},o),{autoFocusInput:e.autoFocusInput&&i===0,indent:e.indent+1}))))}else return Jt.default.createElement(Nae,ne(F({},e),{autoFocusInput:e.autoFocusInput,indent:e.indent}))}function Nae(e){var t;let n=(t=e.propConfig.label)!=null?t:Iu(e.pathToProp),o=Vae(e);if(e.propConfig.type==="enum")return Jt.default.createElement(Jt.default.Fragment,null);{let i=Sy[e.propConfig.type];return Jt.default.createElement(xz,null,Jt.default.createElement(ih,null,Jt.default.createElement("span",{style:{paddingLeft:"".concat(e.indent*lh,"px")}},n)),Jt.default.createElement(Sz,null,Jt.default.createElement(i,{editingTools:o,propConfig:e.propConfig,value:wp(e.keyframe.value,e.propConfig),autoFocus:e.autoFocusInput})))}}function Vae(e){let t=e.sheetObject;return Rae(({stateEditors:n},o)=>{let i=ne(F({},e.keyframe),{value:o});n.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},t.address),{trackId:e.trackId,keyframes:[i],snappingFunction:t.sheet.getSequence().closestGridPosition}))},t)}var Jt,yz,xz,kz,ih,lh,wz,Sz,Kae=w(()=>{Jt=V(H()),fe(),xA(),sv(),Lae(),ha(),xz=C.div(yz||(yz=j([`
  display: flex;
  align-items: stretch;
  min-width: 200px;

  select {
    min-width: 100px;
  }
`]))),ih=C.div(kz||(kz=j([`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.01em;
  padding: 6px 6px 6px 0;

  width: 40%;

  color: #919191;

  overflow: hidden;
`]))),lh=10,Sz=C.div(wz||(wz=j([`
  display: flex;
  align-items: center;
  width: 60%;
`])))});function f1(e){return Tn({debugName:"useKeyframeInlineEditorPopover"},()=>sh.default.createElement(An,{showPopoverEdgeTriangle:!0},sh.default.createElement("div",{style:{margin:"1px 2px 1px 10px"}},Array.isArray(e)?e.map((t,n)=>sh.default.createElement(d1,ne(F({key:n},t),{autoFocusInput:n===0,indent:0}))):void 0)))}var sh,p1=w(()=>{sh=V(H()),Ar(),Br(),Kae()});function Uae(e,t,n){return fn(e,{displayName:"Keyframe",menuItems:()=>{let o=mz(n.leaf.sheetObject.address.projectId,n.leaf.sheetObject.address.sheetId,n.selection);return[{label:o.length>0?"Copy (selection)":"Copy",callback:()=>{o.length>0?Z().transaction(i=>{i.stateEditors.studio.ahistoric.setClipboardKeyframes(o)}):Z().transaction(i=>{i.stateEditors.studio.ahistoric.setClipboardKeyframes([{keyframe:n.keyframe,pathToProp:n.leaf.pathToProp}])})}},{label:n.selection!==void 0?"Delete (selection)":"Delete",callback:()=>{n.selection?n.selection.delete():Z().transaction(({stateEditors:i})=>{i.coreByProject.historic.sheetsById.sequence.deleteKeyframes(ne(F({},n.leaf.sheetObject.address),{keyframeIds:[n.keyframe.id],trackId:n.leaf.trackId}))})}}]},onOpen(){t._debug("Show keyframe",n)}})}function Hae(e,t,n){let o=(0,ya.useRef)(t);o.current=t;let{onClickFromDrag:i}=n,l=(0,ya.useMemo)(()=>({debugName:"KeyframeDot/useDragKeyframe",onDragStart(c){let d=o.current,p=(0,uh.val)(Z().atomP.historic.coreByProject[d.leaf.sheetObject.address.projectId].sheetsById[d.leaf.sheetObject.address.sheetId].sequence.tracksByObject),h=pae(p,function(y,{trackId:x,objectKey:S}){var E,P;return y.id!==d.keyframe.id&&!(d.selection&&(P=(E=d.selection.byObjectKey[S])==null?void 0:E.byTrackId[x])!=null&&P.byKeyframeId[y.id])});if(fae(h),d.selection){let{selection:y,leaf:x}=d,{sheetObject:S}=x,E=y.getDragHandlers(ne(F({},S.address),{domNode:e,positionAtStartOfDrag:d.track.data.keyframes[d.index].position})).onDragStart(c);return E&&ne(F({},E),{onClick:i,onDragEnd:(...P)=>{var O;(O=E.onDragEnd)==null||O.call(E,...P),is()}})}let b=d,g=(0,uh.val)(b.layoutP.scaledSpace.toUnitSpace),m;return{onDrag(y,x,S){var E;let P=b.track.data.keyframes[b.index],O=Math.max((E=hn.checkIfMouseEventSnapToPos(S,{ignore:e}))!=null?E:P.position+g(y),0);m?.discard(),m=void 0,m=Z().tempTransaction(({stateEditors:z})=>{z.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},b.leaf.sheetObject.address),{trackId:b.leaf.trackId,keyframes:[ne(F({},P),{position:O})],snappingFunction:(0,uh.val)(b.layoutP.sheet).getSequence().closestGridPosition}))})},onDragEnd(y){y?m?.commit():m?.discard(),is()},onClick(y){i(y)}}}}),[i]),[u]=pt(e,l);return so(u,t.keyframe.position),Dn(u,"draggingPositionInSequenceEditor","ew-resize"),[u]}var ya,uh,bc,h1,yc,m1,Ez,ch,Pz,Iz,jz,Cz,Oz,_z,Dz=w(()=>{ya=V(H()),fe(),Pe(),pn(),Ct(),Ze(),uh=ge.requireDist(),Rt(),un(),Fr(),Rp(),pi(),ah(),tt(),ls(),p1(),ic(),bc=6,h1=bc+2,yc={normalColor:"#40AAA4",selectedColor:"#F2C95C",inlineEditorOpenColor:"#FCF3DC",selectedAndInlineEditorOpenColor:"#CBEBEA"},m1=({isSelected:e,isInlineEditorPopoverOpen:t})=>e&&t?yc.inlineEditorOpenColor:e?yc.selectedColor:t?yc.selectedAndInlineEditorOpenColor:yc.normalColor,ch=C.div(Ez||(Ez=j([`
  position: absolute;
  `,`

  background: `,`;
  transform: rotateZ(45deg);

  `,`;

  z-index: 1;
  pointer-events: none;
`])),Lr(bc),e=>m1(e),e=>e.flag===2?"outline: 2px solid white;":""),Iz=C.div(Pz||(Pz=j([`
  position: absolute;
  `,`

  background: `,`;

  `,`;

  z-index: 1;
  pointer-events: none;
`])),Lr(bc*1.5),e=>m1(e),e=>e.flag===2?"outline: 2px solid white;":""),Cz=C.div(jz||(jz=j([`
  z-index: 1;
  cursor: ew-resize;

  position: absolute;
  `,`;
  `,`;

  & + `,` {
    `,`
  }

  &:hover + `,` {
    `,`
  }
`])),Lr(12),Qe,ch,e=>e.isInlineEditorPopoverOpen?Lr(h1):"",ch,Lr(h1)),Oz=e=>{let t=Vl("SingleKeyframeDot",e.keyframe.id),n=ts(e.itemKey),[o,i]=$e(null),[l]=Uae(i,t,e),{node:u,toggle:c,isOpen:d}=f1([{type:"primitiveProp",keyframe:e.keyframe,pathToProp:e.leaf.pathToProp,propConfig:e.leaf.propConf,sheetObject:e.leaf.sheetObject,trackId:e.leaf.trackId}]);Hae(i,e,{onClickFromDrag(h){c(h,o.current)}});let p=!e.keyframe.type||e.keyframe.type==="bezier";return ya.default.createElement(ya.default.Fragment,null,ya.default.createElement(Cz,F({ref:o,isInlineEditorPopoverOpen:d},n.attrs)),p?ya.default.createElement(ch,{isSelected:!!e.selection,isInlineEditorPopoverOpen:d,flag:n.flag}):ya.default.createElement(Iz,{isSelected:!!e.selection,isInlineEditorPopoverOpen:d,flag:n.flag}),u,l)},_z=Oz}),g1,v1,b1,wi,Tz,Az,Bz,$ae=w(()=>{Ir(),g1=V(H()),fe(),Dz(),v1=bc/2+1,b1=1e3,wi={normalColor:"#365b59",selectedColor:"#8A7842",barColor:e=>{let t=e.isSelected?wi.selectedColor:wi.normalColor;return e.isPopoverOpen?qf(.2,Cl(.2,t)):t},hoverColor:e=>{let t=e.isSelected?wi.selectedColor:wi.normalColor;return e.isPopoverOpen?qf(.2,Cl(.2,t)):qf(.1,Cl(.1,t))}},Az=C.div(Tz||(Tz=j([`
  position: absolute;
  background: `,`;
  height: `,`px;
  width: `,`px;

  left: 0;
  top: -`,`px;
  transform-origin: top left;
  z-index: 0;
  cursor: ew-resize;

  &:after {
    display: block;
    position: absolute;
    content: ' ';
    top: -4px;
    bottom: -4px;
    left: 0;
    right: 0;
  }

  &:hover {
    background: `,`;
  }
`])),wi.barColor,v1,b1,v1/2,wi.hoverColor),Bz=g1.default.forwardRef((e,t)=>{let n={isPopoverOpen:e.isPopoverOpen,isSelected:e.isSelected};return g1.default.createElement(Az,ne(F({},n),{ref:t,style:{transform:"scaleX(calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(e.connectorLengthInUnitSpace/b1,"))")},onClick:o=>{var i;(i=e.openPopover)==null||i.call(e,o)}}),e.children)})});function Wae(e,t){let n=(0,y1.useRef)(t);n.current=t;let o=(0,y1.useMemo)(()=>({debugName:"useDragKeyframe",lockCSSCursorTo:"ew-resize",onDragStart(i){let l=n.current,u;if(l.selection){let{selection:h,leaf:b}=l,{sheetObject:g}=b;return h.getDragHandlers(ne(F({},g.address),{domNode:e,positionAtStartOfDrag:l.track.data.keyframes[l.index].position})).onDragStart(i)}let c=l,d=(0,dh.val)(c.layoutP.sheet).getSequence(),p=(0,dh.val)(c.layoutP.scaledSpace.toUnitSpace);return{onDrag(h,b,g){let m=p(h);u&&(u.discard(),u=void 0),u=Z().tempTransaction(({stateEditors:y})=>{y.coreByProject.historic.sheetsById.sequence.transformKeyframes(ne(F({},c.leaf.sheetObject.address),{trackId:c.leaf.trackId,keyframeIds:[c.keyframe.id,c.track.data.keyframes[c.index+1].id],translate:m,scale:1,origin:0,snappingFunction:d.closestGridPosition}))})},onDragEnd(h){h?u&&u.commit():u&&u.discard()}}}}),[]);pt(e,o)}function Gae(e,t,n,o){return fn(t,{displayName:"Tween",menuItems:()=>{let i=mz(e.leaf.sheetObject.address.projectId,e.leaf.sheetObject.address.sheetId,e.selection);return[{label:i.length>0?"Copy (selection)":"Copy",callback:()=>{i.length>0?Z().transaction(l=>{l.stateEditors.studio.ahistoric.setClipboardKeyframes(i)}):Z().transaction(l=>{l.stateEditors.studio.ahistoric.setClipboardKeyframes([{keyframe:n,pathToProp:e.leaf.pathToProp},{keyframe:o,pathToProp:e.leaf.pathToProp}])})}},{label:e.selection?"Delete (selection)":"Delete",callback:()=>{e.selection?e.selection.delete():Z().transaction(({stateEditors:l})=>{l.coreByProject.historic.sheetsById.sequence.deleteKeyframes(ne(F({},e.leaf.sheetObject.address),{keyframeIds:[n.id,o.id],trackId:e.leaf.trackId}))})}}]}})}var dh,xa,y1,x1,zz,qz,Mz,Rz,Fz,Yae=w(()=>{Pe(),pn(),Ct(),Ze(),dh=ge.requireDist(),xa=V(H()),y1=V(H()),Ar(),Br(),hz(),$ae(),$p(),_e(),ah(),ah(),fe(),x1=5,qz=C(An)(zz||(zz=j([`
  --popover-outer-stroke: transparent;
  --popover-inner-stroke: `,`;
`])),n1),Mz=e=>{let{index:t,track:n}=e,o=n.data.keyframes[t],i=n.data.keyframes[t+1],[l,u]=$e(null),{node:c,toggle:d,close:p}=Tn(()=>{let m=(0,dh.val)(e.layoutP.rightDims);return{debugName:"Connector",constraints:{minX:m.screenX+x1,maxX:m.screenX+m.width-x1}}},()=>xa.default.createElement(Fz,ne(F({},e),{closePopover:p}))),[h]=Gae(e,u,o,i);Wae(u,e);let b=i.position-o.position,g={isPopoverOpen:Ne(()=>fz(ne(F({},e.leaf.sheetObject.address),{trackId:e.leaf.trackId,left:o,right:i})),[e.leaf.sheetObject.address,e.leaf.trackId,o,i]),isSelected:e.selection!==void 0};return xa.default.createElement(xa.default.Fragment,null,xa.default.createElement(Bz,ne(F({ref:l,connectorLengthInUnitSpace:b},g),{openPopover:m=>{u&&d(m,u)}}),c),h)},Rz=Mz,Fz=xa.default.forwardRef((e,t)=>{let{index:n,track:{data:o},selection:i}=e,l=o.keyframes[n],u=o.keyframes[n+1],c=e.leaf.trackId,d=e.leaf.sheetObject.address;if(!c)return null;let p=Ne(()=>Bae(d.projectId,d.sheetId,i).getValue(),[d,i]),h=F({left:l,right:u,trackId:c},d);return xa.default.createElement(qz,{showPopoverEdgeTriangle:!1,ref:t},xa.default.createElement(dz,{curveConnection:h,additionalConnections:p,onRequestClose:e.closePopover}))})}),Lz,Si,Nz,Vz,Kz,Uz,Hz,Qae=w(()=>{Lz=ge.requireDist(),Si=V(H()),fe(),Yae(),Dz(),Vz=C.div(Nz||(Nz=j([`
  position: absolute;
`]))),Kz=Si.default.createElement(Si.default.Fragment,null),Uz=Si.default.memo(e=>{let{index:t,track:{data:n}}=e,o=n.keyframes[t],i=n.keyframes[t+1],l=o.connectedRight&&!!i;return Si.default.createElement(Vz,{style:{top:"".concat(e.leaf.nodeHeight/2,"px"),left:"calc(".concat((0,Lz.val)(e.layoutP.scaledSpace.leftPadding),"px + calc(var(--unitSpaceToScaledSpaceMultiplier) * ").concat(o.position,"px))")}},Si.default.createElement(_z,ne(F({},e),{itemKey:e.itemKey})),l?Si.default.createElement(Rz,F({},e)):Kz)}),Hz=Uz});function Xae(e,t){return fn(e,{displayName:"Keyframe Track",menuItems:()=>{var n;let o=(n=(0,cs.val)(Z().atomP.ahistoric.clipboard.keyframesWithRelativePaths))!=null?n:[];return[Jae(t,o)]}})}function Jae(e,t){return{label:"Paste Keyframes",enabled:t.length>0,callback:()=>{var n;let o=(0,cs.val)(e.layoutP.sheet).getSequence(),i=(n=t[0])==null?void 0:n.pathToProp,l=t.filter(({keyframe:u,pathToProp:c})=>eae(i,c)).map(({keyframe:u,pathToProp:c})=>u);Z().transaction(({stateEditors:u})=>{var c;o.position=o.closestGridPosition(o.position);let d=(c=Zae(l))==null?void 0:c.position;for(let p of l)e.leaf.trackId&&u.coreByProject.historic.sheetsById.sequence.setKeyframeAtPosition(ne(F({},e.leaf.sheetObject.address),{trackId:e.leaf.trackId,position:o.position+p.position-d,handles:p.handles,value:p.value,snappingFunction:o.closestGridPosition,type:p.type}))})}}}function Zae(e){let t=null;for(let n of e)(t===null||n.position<t.position)&&(t=n);return t}var cs,Lo,$z,Wz,k1,Gz,eie=w(()=>{_e(),cs=ge.requireDist(),Lo=V(H()),fe(),Qae(),pn(),Ze(),Pe(),va(),ls(),Dr(),Wz=C.div($z||($z=j([`
  position: relative;
  height: 100%;
  width: 100%;
`]))),k1=Lo.default.memo(e=>{var t;let{layoutP:n,trackData:o,leaf:i}=e,[l,u]=$e(null),{selectedKeyframeIds:c,selection:d}=Ne(()=>{if(!i.trackId)return{selectedKeyframeIds:void 0,selection:void 0};let O=(0,cs.val)(n.selectionAtom),z=(0,cs.val)(O.pointer.current);if(!z)return{selectedKeyframeIds:void 0,selection:void 0};let B=(0,cs.val)(O.pointer.current.byObjectKey[i.sheetObject.address.objectKey].byTrackId[i.trackId].byKeyframeId);return B?{selectedKeyframeIds:B,selection:z}:{selectedKeyframeIds:void 0,selection:void 0}},[n,i.trackId]),[p,h,b]=Xae(u,e),g=Me(r8),m=g.mode==="snapToSome"&&i.trackId?(t=g.positions[i.sheetObject.address.objectKey])==null?void 0:t[i.trackId]:[],y=g.mode==="snapToAll";if(!i.trackId)return null;let x=(0,Lo.useMemo)(()=>({data:o,id:i.trackId,sheetObject:e.leaf.sheetObject}),[o,i.trackId]),S=o.keyframes.map((O,z)=>Lo.default.createElement(Hz,{key:"keyframe-"+O.id,itemKey:Vt.forTrackKeyframe(i.sheetObject,i.trackId,O.id),keyframe:O,index:z,track:x,layoutP:n,leaf:i,selection:c?.[O.id]===!0?d:void 0})),E=m.map(O=>Lo.default.createElement(Zy,{key:"snap-target-"+O,layoutP:n,leaf:i,position:O})),P=y?o.keyframes.map(O=>Lo.default.createElement(Zy,{key:"additionalSnapTarget-".concat(O.id),layoutP:n,leaf:i,position:O.position})):null;return Lo.default.createElement(Wz,{ref:l,style:{background:b?"#444850 ":"unset"}},S,E,Lo.default.createElement(Lo.default.Fragment,null,P),p)}),k1.displayName="BasicKeyframedTrack",Gz=k1}),Yz,Ei,Qz,Xz,tie=w(()=>{Pe(),_e(),Yz=ge.requireDist(),Ei=V(H()),Up(),eie(),pi(),Qz=({leaf:e,layoutP:t})=>{let n=Vl("PrimitivePropRow",e.pathToProp.join());return Ne(()=>{let{sheetObject:o}=e,{trackId:i}=e;if(!i)return Ei.default.createElement(yi,{leaf:e,isCollapsed:!1,node:Ei.default.createElement("div",null)});let l=(0,Yz.val)(Z().atomP.historic.coreByProject[o.address.projectId].sheetsById[o.address.sheetId].sequence.tracksByObject[o.address.objectKey].trackData[i]);return l?.type!=="BasicKeyframedTrack"?(n.errorDev("trackData type ".concat(l?.type," is not yet supported on the sequence editor")),Ei.default.createElement(yi,{leaf:e,isCollapsed:!1,node:Ei.default.createElement("div",null)})):Ei.default.createElement(yi,{leaf:e,isCollapsed:!1,node:Ei.default.createElement(Gz,{layoutP:t,trackData:l,leaf:e})})},[e,t])},Xz=Qz});function Jz(){let e=Math.random()*360,t=.7+Math.random()*.3,n=.55+Math.random()*.2,o=t*Math.min(n,1-n),i=l=>{let u=(l+e/30)%12,c=n-o*Math.max(Math.min(u-3,9-u,1),-1);return Math.round(255*c).toString(16).padStart(2,"0")};return"#".concat(i(0)).concat(i(8)).concat(i(4))}var Zz=w(()=>{});function eq(e,t,n){let o=(0,xc.val)(t.sheet).getSequence();e.type==="sheet"?nie(e,n,o):rie(e,n,o)}function nie(e,t,n){var o,i;let{projectId:l,sheetId:u}=e.sheet.address,c=t.every(({pathToProp:h})=>h.length===0),d=[],p=new Map;for(let h of e.children)h.type==="sheetObject"&&p.set(h.sheetObject.address.objectKey,h.sheetObject);if(c)for(let h of e.children.filter(b=>b.type==="sheetObject").map(b=>b.sheetObject)){let b=(0,xc.pointerToPrism)(Z().atomP.historic.coreByProject[l].sheetsById[u].sequence.tracksByObject[h.address.objectKey]).getValue(),g=Object.keys((o=b?.trackData)!=null?o:{});for(let m of g)for(let{keyframe:y}of t)d.push({keyframe:y,trackId:m,address:ne(F({},h.address),{pathToProp:[]}),sheetObject:h})}else{let h=(0,xc.pointerToPrism)(Z().atomP.historic.coreByProject[l].sheetsById[u].sequence.tracksByObject).getValue();for(let{keyframe:b,pathToProp:g}of t){if(g.length===0)continue;let m=g[0],y=g.slice(1),x=p.get(m);if(!x)continue;let S=h?.[m],E=Rr(y),P=(i=S?.trackIdByPropPath)==null?void 0:i[E];d.push({keyframe:b,trackId:P,address:ne(F({},x.address),{pathToProp:y}),sheetObject:x})}}tq(d,n)}function rie(e,t,n){var o,i;let{projectId:l,sheetId:u,objectKey:c}=e.sheetObject.address,d=e.sheetObject,p=(0,xc.pointerToPrism)(Z().atomP.historic.coreByProject[l].sheetsById[u].sequence.tracksByObject[c]).getValue(),h=t.every(({pathToProp:g})=>g.length===0),b=[];if(h)if(e.type==="sheetObject"){let g=Object.keys((o=p?.trackData)!=null?o:{});for(let m of g)for(let{keyframe:y}of t)b.push({keyframe:y,trackId:m,address:ne(F({},d.address),{pathToProp:[]}),sheetObject:d})}else{let g=e.pathToProp,m=Zl(d.template.staticConfig,g);if(m)for(let{path:y,conf:x}of es(m,g)){if(lo(x))continue;let S=y,E=Rr(S),P=(i=p?.trackIdByPropPath)==null?void 0:i[E];for(let{keyframe:O}of t)b.push({keyframe:O,trackId:P,address:ne(F({},d.address),{pathToProp:S}),sheetObject:d})}}else{let g=p?.trackIdByPropPath||{},m=e.type==="propWithChildren"?e.pathToProp:[];for(let{keyframe:y,pathToProp:x}of t){let S=[...m,...x],E=Rr(S),P=g[E];b.push({keyframe:y,trackId:P,address:ne(F({},d.address),{pathToProp:S}),sheetObject:d})}}tq(b,n)}function tq(e,t){var n;if(e.length===0)return;t.position=t.closestGridPosition(t.position);let o=(n=oie(e.map(({keyframe:i})=>i)))==null?void 0:n.position;Z().transaction(({stateEditors:i,drafts:l})=>{var u,c,d;for(let p of e){let{keyframe:h,address:b,sheetObject:g}=p,m=p.trackId;if(!m){let y=Zl(g.template.staticConfig,b.pathToProp);if(y&&!lo(y)){i.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsSequenced(b,y);let x=(d=(c=(u=l.historic.coreByProject[b.projectId])==null?void 0:u.sheetsById[b.sheetId])==null?void 0:c.sequence)==null?void 0:d.tracksByObject[b.objectKey];if(x){let S=Rr(b.pathToProp);m=x.trackIdByPropPath[S]}}}m&&i.coreByProject.historic.sheetsById.sequence.setKeyframeAtPosition(ne(F({},b),{trackId:m,position:t.position+h.position-o,handles:h.handles,value:h.value,snappingFunction:t.closestGridPosition,type:h.type}))}})}function oie(e){let t=null;for(let n of e)(t===null||n.position<t.position)&&(t=n);return t}function nq(e,t){let n=Array.from(t.byPosition.keys());if(n.length===0)return;let o={first:Math.min(...n),last:Math.max(...n)},i=t.tracks.flatMap(d=>{var p;return(p=gz(ne(F({},d.sheetObject.address),{trackId:d.id,keyframeIds:d.data.keyframes.filter(h=>h.position>=o.first&&h.position<=o.last).map(h=>h.id)})))!=null?p:[]}),l=e.type==="sheet"?[]:e.type==="sheetObject"?[e.sheetObject.address.objectKey]:e.type==="propWithChildren"?[e.sheetObject.address.objectKey,...e.pathToProp]:[],u=qy([l,...i.map(d=>d.pathToProp)]),c=i.map(({keyframe:d,pathToProp:p})=>({keyframe:d,pathToProp:p.slice(u.length)}));Z().transaction(d=>{d.stateEditors.studio.ahistoric.setClipboardKeyframes(c)})}var xc,rq=w(()=>{xc=ge.requireDist(),Pe(),ah(),va(),ha()});function aie(e){if(!e)return null;let t=e.closest("[data-handle]");return t&&t.getAttribute("data-handle")||null}function oq(e){if(e.type==="sheet")return"theatre-agg-keyframe-color-sheet-".concat(e.sheet.address.sheetId);if(e.type==="sheetObject")return"theatre-agg-keyframe-color-object-".concat(e.sheetObject.address.objectKey);{let t=e.pathToProp.join(".");return"theatre-agg-keyframe-color-prop-".concat(e.sheetObject.address.objectKey,"-").concat(t)}}function iie(e){let t=oq(e),n=localStorage.getItem(t);if(n)return n;let o=Jz();return localStorage.setItem(t,o),o}function aq(e,t){let n=oq(e);localStorage.setItem(n,t)}function lie(e){let{layoutP:t,aggregatedKeyframes:n,viewModel:o}=e,[i,l]=$e(null),u=Zt.default.useRef(null),[c,d]=Zt.default.useState(()=>iie(o)),[p,h]=Zt.default.useState(!1),[b,g]=Zt.default.useState({top:0,left:0}),m=(0,Zt.useMemo)(()=>{let B=Array.from(n.byPosition.keys());return B.length===0?null:{first:Math.min(...B),last:Math.max(...B)}},[n]),[y]=fn(l,{displayName:"Aggregate Keyframe",menuItems:()=>{var B;let D=(B=(0,ds.pointerToPrism)(Z().atomP.ahistoric.clipboard.keyframesWithRelativePaths).getValue())!=null?B:[];return[{label:"Copy Keyframes",callback:()=>{nq(o,n)}},{label:"Paste Keyframes",enabled:D.length>0,callback:()=>{eq(o,t,D)}},{label:"Custom Color",callback:()=>{if(h(!0),l){let X=l.getBoundingClientRect();g({top:Math.max(10,X.top),left:Math.max(10,X.left)})}}},{label:"Delete",callback:()=>{Z().transaction(({stateEditors:X})=>{for(let M of n.tracks){let _=M.data.keyframes.filter(L=>L.position>=m.first&&L.position<=m.last).map(L=>L.id);_.length>0&&X.coreByProject.historic.sheetsById.sequence.deleteKeyframes(ne(F({},M.sheetObject.address),{keyframeIds:_,trackId:M.id}))}})}}]}}),x=Yy(),S=(0,Zt.useMemo)(()=>({debugName:"AggregateKeyframeBar/useDrag",onDragStart:B=>{if(!m)return!1;let D=B.target,X=aie(D),M=X!==null;x(!0,m.first),o.type==="sheet"?o.sheet.address:o.sheetObject.address;let _=(0,ds.val)(t.scaledSpace.toUnitSpace),L;return{onDrag(U,N,se){let K=_(U),ce=Math.max(0,m.first+K);if(M){let J=X==="left",W=m.first,A=m.last,Y=J?m.first:m.last,ie=Math.max(0,Y+K);if(J&&ie>=A||!J&&ie<=W)return;let q=A-W,G=Math.abs(ie-(J?A:W));if(q===0||G===0)return;L?.discard(),L=Z().tempTransaction(({stateEditors:ue})=>{for(let de of n.tracks){let re=[];for(let T of de.data.keyframes)if(T.position>=Math.min(W,A)&&T.position<=Math.max(W,A)){let ee=(T.position-W)/q,oe=J?ie+ee*G:W+ee*G;re.push(ne(F({},T),{position:oe}))}re.length>0&&ue.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},de.sheetObject.address),{trackId:de.id,keyframes:re,snappingFunction:(0,ds.val)(t.sheet).getSequence().closestGridPosition}))}})}else L?.discard(),L=Z().tempTransaction(({stateEditors:J})=>{for(let W of n.tracks){let A=[];for(let Y of W.data.keyframes)Y.position>=m.first&&Y.position<=m.last&&A.push(ne(F({},Y),{position:Math.max(0,Y.position+K)}));A.length>0&&J.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},W.sheetObject.address),{trackId:W.id,keyframes:A,snappingFunction:(0,ds.val)(t.sheet).getSequence().closestGridPosition}))}});x(!0,ce)},onDragEnd(U){x(!1,-1),U?L?.commit():L?.discard()}}}}),[m,n,t,o,x]),[E]=pt(l,S);if(Dn(E,"draggingPositionInSequenceEditor","ew-resize"),!m)return Zt.default.createElement(w1,{ref:i});let P=(0,ds.val)(t.scaledSpace.leftPadding),O="calc(".concat(P,"px + calc(var(--unitSpaceToScaledSpaceMultiplier) * ").concat(m.first,"px))"),z="calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(m.last-m.first,"px)");return Zt.default.createElement(w1,{ref:i},Zt.default.createElement(sq,{$color:c,style:{left:O,width:z}},Zt.default.createElement(dq,{$position:"left","data-handle":"left"}),Zt.default.createElement(pq,{$position:"right",style:{left:"calc(100% - 7px)"},"data-handle":"right"})),p&&Zt.default.createElement(mq,{style:{position:"fixed",top:"".concat(b.top,"px"),left:"".concat(b.left,"px")}},Zt.default.createElement(vq,{ref:u,type:"color",value:c,onChange:B=>{let D=B.currentTarget.value;d(D),aq(o,D)},autoFocus:!0}),Zt.default.createElement(yq,{type:"text",placeholder:"#000000",value:c,onChange:B=>{let D=B.currentTarget.value;D.startsWith("#")||(D="#"+D),/^#[0-9A-F]{6}$/i.test(D)&&(d(D),aq(o,D))}}),Zt.default.createElement("button",{onClick:()=>h(!1),style:{padding:"4px 8px",fontSize:"12px",cursor:"pointer",border:"1px solid #666",borderRadius:"2px",background:"#222",color:"#FFF",height:"28px"}},"Done")),y)}var ds,Zt,iq,w1,lq,sq,uq,S1,cq,dq,fq,pq,hq,mq,gq,vq,bq,yq,xq,kq,sie=w(()=>{ds=ge.requireDist(),Zt=V(H()),fe(),Ze(),Ct(),un(),Pe(),Rt(),pn(),tt(),Zz(),rq(),w1=C.div(iq||(iq=j([`
  position: absolute;
  height: 100%;
  width: 100%;
`]))),sq=C.div(lq||(lq=j([`
  position: absolute;
  height: 20px;
  background: `,`;
  cursor: ew-resize;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2px;
  z-index: 2;
  `,`

  &:hover {
    opacity: 0.8;
  }
`])),e=>e.$color,Qe),S1=C.div(uq||(uq=j([`
  position: absolute;
  height: 20px;
  width: 7px;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  z-index: 3;
  `,`

  &:before {
    position: absolute;
    display: block;
    content: ' ';
    background: inherit;
    border-radius: `,`;
    width: 7px;
    height: 20px;
  }

  &:after {
    position: absolute;
    display: block;
    content: ' ';
    width: 15px;
    height: 28px;
    top: 50%;
    transform: translateY(-50%);
    `,`
  }

  &:hover:before {
    opacity: 0.8;
  }
`])),Qe,e=>e.$position==="left"?"2px 0 0 2px":"0 2px 2px 0",e=>e.$position==="left"?"left: -8px; cursor: w-resize;":"right: -8px; cursor: e-resize;"),dq=C(S1)(cq||(cq=j([`
  left: calc(-1 * 7px);
`]))),pq=C(S1)(fq||(fq=j([`
  right: 0px;
`]))),mq=C.div(hq||(hq=j([`
  position: absolute;
  background: #333;
  border-radius: 4px;
  padding: 4px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`]))),vq=C.input(gq||(gq=j([`
  background: #222;
  width: 50px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  &::-webkit-color-swatch {
    border: 1px solid #999;
    border-radius: 2px;
  }
`]))),yq=C.input(bq||(bq=j([`
  background: #222;
  border: 1px solid #666;
  color: #fff;
  width: 70px;
  height: 28px;
  padding: 4px;
  border-radius: 2px;
  font-family: monospace;
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #40aaa4;
  }
`]))),xq=Zt.default.memo(lie),kq=xq});function uie(e){let{layoutP:t,aggregatedKeyframes:n,viewModel:o}=e,[i,l]=$e(null);return fh.default.createElement(Sq,{ref:i},fh.default.createElement(kq,{viewModel:o,aggregatedKeyframes:n,layoutP:t}))}var fh,wq,Sq,Eq,E1,Pq=w(()=>{fh=V(H()),fe(),Ze(),sie(),Sq=C.div(wq||(wq=j([`
  position: relative;
  height: 100%;
  width: 100%;
`]))),Eq=fh.default.memo(uie),E1=Eq}),fs,ph,Iq,jq=w(()=>{_e(),fs=V(H()),tie(),Up(),Pq(),qp(),pi(),ph=(e,t,n=!0)=>e.type==="propWithChildren"?fs.default.createElement(Iq,{layoutP:t,viewModel:e,key:"prop"+e.pathToProp[e.pathToProp.length-1],renderChildren:n}):fs.default.createElement(Xz,{layoutP:t,leaf:e,key:"prop"+e.pathToProp[e.pathToProp.length-1]}),Iq=({viewModel:e,layoutP:t,renderChildren:n=!0})=>{let o=Vl("RightPropWithChildrenRow",e.pathToProp.join());return Ne(()=>{let i=zp(e);return fs.default.createElement(t4,{logger:o},fs.default.createElement(yi,{leaf:e,node:fs.default.createElement(E1,{layoutP:t,aggregatedKeyframes:i,viewModel:e}),isCollapsed:e.isCollapsed},n&&e.children.map(l=>ph(l,t))))},[e,t])}}),P1,Cq,Oq,cie=w(()=>{_e(),P1=V(H()),jq(),Up(),qp(),Pq(),Cq=({leaf:e,layoutP:t,renderChildren:n=!0})=>Ne(()=>{let o=zp(e);return P1.default.createElement(yi,{leaf:e,node:P1.default.createElement(E1,{layoutP:t,aggregatedKeyframes:o,viewModel:e}),isCollapsed:e.isCollapsed},n&&e.children.map(i=>ph(i,t)))},[e,t]),Oq=Cq});function _q(e){return"theatre-subsequence-color-".concat(e.sheet.address.projectId,"-").concat(e.sheet.address.sheetId,"-").concat(e.subSequence.id)}function die(e){let t=_q(e),n=localStorage.getItem(t);if(n)return n;let o=Jz();return localStorage.setItem(t,o),o}function Dq(e,t){let n=_q(e);localStorage.setItem(n,t)}var Qn,We,Tq,Aq,Bq,zq,qq,I1,Mq,Rq,Fq,Lq,Nq,Vq,Kq,Uq,Hq,$q,Wq,Gq,Yq,fie=w(()=>{Qn=ge.requireDist(),We=V(H()),fe(),Rt(),un(),Pe(),pn(),Ar(),Br(),Ct(),Ze(),tt(),Fr(),un(),FB(),Zz(),Aq=C.div(Tq||(Tq=j([`
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: 20px;
`]))),zq=C.div.attrs(e=>({style:{background:e.$color}}))(Bq||(Bq=j([`
  position: absolute;
  height: 20px;
  line-height: 20px;
  cursor: ew-resize;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2px;
  text-align: center;
  width: 100%;
  z-index: 2;
  `,`

  &:hover {
    opacity: 0.8;
  }

  span {
    color: white;
    font-weight: bold;
    text-shadow: 0 1px rgba(0, 0, 0, 0.67);
  }
`])),Qe),I1=C.div(qq||(qq=j([`
  background: #555;
  position: absolute;
  height: 20px;
  width: 7px;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  z-index: 3;
  `,`

  &:before {
    position: absolute;
    display: block;
    content: ' ';
    background: inherit;
    border-radius: `,`;
    width: 7px;
    height: 20px;
  }

  &:after {
    position: absolute;
    display: block;
    content: ' ';
    width: 15px;
    height: 28px;
    top: 50%;
    transform: translateY(-50%);
    `,`
  }

  &:hover:before {
    background: rgba(170, 64, 64, 0.6);
  }

  // Snap cursor when dragging playhead
  #pointer-root.draggingPositionInSequenceEditor & {
    pointer-events: auto;
    cursor: var(`,`);

    // Show snap cursor (⸢⸤⸣⸥) on hover
    &:hover:after {
      background: url(`,`) no-repeat center center;
      background-size: 34px 34px;
    }
  }
`])),Qe,e=>e.$position==="left"?"2px 0 0 2px":"0 2px 2px 0",e=>e.$position==="left"?"left: -8px; cursor: w-resize;":"right: -8px; cursor: e-resize;",Cr,Gy),Rq=C(I1).attrs(e=>({style:{background:e.$color}}))(Mq||(Mq=j([`
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  left: -7px;
`]))),Lq=C(I1).attrs(e=>({style:{background:e.$color}}))(Fq||(Fq=j([`
  border-left: 1px solid rgba(0, 0, 0, 0.25);
  right: -7px;
`]))),C.div(Nq||(Nq=j([`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  user-select: none;
`]))),Kq=C.div(Vq||(Vq=j([`
  position: absolute;
  background: #333;
  border-radius: 4px;
  padding: 4px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`]))),Hq=C.input(Uq||(Uq=j([`
  background: #222;
  width: 50px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  &::-webkit-color-swatch {
    border: 1px solid #999;
    border-radius: 2px;
  }
`]))),Wq=C.input($q||($q=j([`
  background: #222;
  border: 1px solid #666;
  color: #fff;
  width: 70px;
  height: 28px;
  padding: 4px;
  border-radius: 2px;
  font-family: monospace;
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #40aaa4;
  }
`]))),Gq=({leaf:e,layoutP:t})=>{var n;let[o,i]=$e(null),[l,u]=$e(null),[c,d]=$e(null),[p,h]=$e(null),b=We.default.useRef(null),[g,m]=(0,We.useState)(()=>die(e)),[y,x]=(0,We.useState)(!1),[S,E]=(0,We.useState)({top:0,left:0}),P=Tn({debugName:"SubSequenceBar/editLabel"},()=>{let Y=e.subSequence.label,ie=Y;return We.default.createElement(An,null,We.default.createElement("div",{style:{padding:"8px"}},We.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold"}},"Edit Sub-sequence Label"),We.default.createElement("input",{type:"text",defaultValue:Y,onChange:q=>{ie=q.target.value},style:{width:"200px",padding:"4px",marginBottom:"8px"},autoFocus:!0}),We.default.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:"4px"}},We.default.createElement("button",{onClick:()=>{Z().transaction(({stateEditors:q})=>{q.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),q.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{label:ie}})}),P.close("user action")},style:{padding:"4px 12px",background:"#40AAA4",color:"white",border:"none",borderRadius:"2px",cursor:"pointer"}},"Done"))))}),O=Tn({debugName:"SubSequenceBar/editDuration"},()=>{let Y=e.subSequence.duration,ie=Y;return We.default.createElement(An,null,We.default.createElement("div",{style:{padding:"8px"}},We.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold"}},"Edit Sub-sequence Duration"),We.default.createElement("input",{type:"number",defaultValue:Y,step:.1,min:.1,onChange:q=>{ie=parseFloat(q.target.value)},style:{width:"200px",padding:"4px",marginBottom:"8px"},autoFocus:!0}),We.default.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:"4px"}},We.default.createElement("button",{onClick:()=>{ie>0&&Z().transaction(({stateEditors:q})=>{q.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),q.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{duration:ie}})}),O.close("user action")},style:{padding:"4px 12px",background:"#40AAA4",color:"white",border:"none",borderRadius:"2px",cursor:"pointer"}},"Done"))))}),z=Tn({debugName:"SubSequenceBar/editTimeScale"},()=>{let Y=e.subSequence.timeScale,ie=Y;return We.default.createElement(An,null,We.default.createElement("div",{style:{padding:"8px"}},We.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold"}},"Edit Sub-sequence Time Scale"),We.default.createElement("input",{type:"number",defaultValue:Y,step:.1,min:.1,onChange:q=>{ie=parseFloat(q.target.value)},style:{width:"200px",padding:"4px",marginBottom:"8px"},autoFocus:!0}),We.default.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:"4px"}},We.default.createElement("button",{onClick:()=>{ie>0&&Z().transaction(({stateEditors:q})=>{q.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),q.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{timeScale:ie}})}),z.close("user action")},style:{padding:"4px 12px",background:"#40AAA4",color:"white",border:"none",borderRadius:"2px",cursor:"pointer"}},"Done"))))}),B=Tn({debugName:"SubSequenceBar/editStart"},()=>{let Y=e.subSequence.position,ie=Y;return We.default.createElement(An,null,We.default.createElement("div",{style:{padding:"8px"}},We.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold"}},"Edit Sub-sequence Start Position"),We.default.createElement("input",{type:"number",defaultValue:Y,step:.1,min:0,onChange:q=>{ie=parseFloat(q.target.value)},style:{width:"200px",padding:"4px",marginBottom:"8px"},autoFocus:!0}),We.default.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:"4px"}},We.default.createElement("button",{onClick:()=>{ie>=0&&Z().transaction(({stateEditors:q})=>{q.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),q.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{position:ie}})}),B.close("user action")},style:{padding:"4px 12px",background:"#40AAA4",color:"white",border:"none",borderRadius:"2px",cursor:"pointer"}},"Ok"))))}),[D]=fn(i,{menuItems:()=>[{label:"Edit Label",callback:()=>{if(i){let Y=i.getBoundingClientRect();P.open({clientX:Y.left,clientY:Y.top},i)}}},{label:"Edit Start",callback:()=>{if(i){let Y=i.getBoundingClientRect();B.open({clientX:Y.left,clientY:Y.top},i)}}},{label:"Edit Duration",callback:()=>{if(i){let Y=i.getBoundingClientRect();O.open({clientX:Y.left,clientY:Y.top},i)}}},{label:"Edit Time Scale",callback:()=>{if(i){let Y=i.getBoundingClientRect();z.open({clientX:Y.left,clientY:Y.top},i)}}},{label:"Delete Sub-sequence",callback:()=>{Z().transaction(({stateEditors:Y})=>{Y.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),Y.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removeSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id})})}},{label:"Custom Color",callback:()=>{if(x(!0),i){let Y=i.getBoundingClientRect();E({top:Math.max(10,Y.top),left:Math.max(10,Y.left)})}}}]}),X=Yy(),M=Y=>{let ie=Y.composedPath();for(let q of ie){if(q===d)return"left";if(q===h)return"right";if(q===u)return"bar";if(q===i)break}return null},_=(0,We.useMemo)(()=>{let Y=null,ie=null,q=0,G=0,ue=1,de=()=>{var re;let T=e.subSequence.duration;if(!T||T===0)try{let ee=Z(),oe=(0,Qn.val)(ee.projectsP)[e.sheet.address.projectId];T=(re=(0,Qn.val)(oe.pointers.historic.sheetsById[e.subSequence.sheetId].sequence.length))!=null?re:(0,Qn.val)(t.sheet).getSequence().length}catch{T=(0,Qn.val)(t.sheet).getSequence().length}return T??1};return{debugName:"SubSequenceBar/drag",lockCSSCursorTo:"ew-resize",onDragStart(re){return ie=M(re),ie?(q=e.subSequence.position,G=de(),ue=e.subSequence.timeScale,X(!0,e.subSequence.position),{onDrag(T){Y&&Y.discard(),Y=Z().tempTransaction(({stateEditors:ee})=>{let oe=(0,Qn.val)(t.clippedSpace.range),ve=(0,Qn.val)(t.clippedSpace.width),we=(oe.end-oe.start)/ve,je=T*we,De=(0,Qn.val)(t.sheet).getSequence().closestGridPosition;if(ie==="bar"){let He=q+je,rt=Math.max(0,De(He));ee.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),ee.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{position:rt}})}else if(ie==="left"){let He=q+G/ue,rt=q+je,Le=Math.max(0,De(rt)),gt=He-Le,Ue=Math.max(.01,G/gt);ee.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),ee.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{position:Le,timeScale:Ue}})}else if(ie==="right"){let He=q+G/ue+je,rt=Math.max(q+.01,De(He))-q,Le=Math.max(.01,G/rt);ee.studio.historic.projects.stateByProjectId.stateBySheetId._ensure({projectId:e.sheet.address.projectId,sheetId:e.sheet.address.sheetId}),ee.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{timeScale:Le}})}})},onDragEnd(T){X(!1,0),T&&Y?Y.commit():Y&&Y.discard(),Y=null}}):!1}}},[e,t,X,d,h,u,i]),[L]=pt(i,_);Dn(L,"draggingPositionInSequenceEditor","ew-resize");let U=(0,Qn.val)(t.scaledSpace.leftPadding),N=e.subSequence.position,se=e.subSequence.timeScale,K=e.subSequence.duration;if(!K||K===0)try{let Y=Z(),ie=(0,Qn.val)(Y.projectsP)[e.sheet.address.projectId];K=(n=(0,Qn.val)(ie.pointers.historic.sheetsById[e.subSequence.sheetId].sequence.length))!=null?n:(0,Qn.val)(t.sheet).getSequence().length}catch{K=(0,Qn.val)(t.sheet).getSequence().length}K||(K=1);let ce="calc(".concat(U,"px + calc(var(--unitSpaceToScaledSpaceMultiplier) * ").concat(N,"px))"),J="calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(K/se,"px)"),W=N,A=N+K/se;return We.default.createElement(Aq,{ref:o,style:{left:ce,width:J}},P.node,B.node,O.node,z.node,y&&We.default.createElement(Kq,{style:{position:"fixed",top:"".concat(S.top,"px"),left:"".concat(S.left,"px")}},We.default.createElement(Hq,{ref:b,type:"color",value:g,onChange:Y=>{let ie=Y.currentTarget.value;m(ie),Dq(e,ie)},autoFocus:!0}),We.default.createElement(Wq,{type:"text",placeholder:"#000000",value:g,onChange:Y=>{let ie=Y.currentTarget.value;ie.startsWith("#")||(ie="#"+ie),/^#[0-9A-F]{6}$/i.test(ie)&&(m(ie),Dq(e,ie))}}),We.default.createElement("button",{onClick:()=>x(!1),style:{padding:"4px 8px",fontSize:"12px",cursor:"pointer",border:"1px solid #666",borderRadius:"2px",background:"#222",color:"#FFF",height:"28px"}},"Done")),D,We.default.createElement(zq,{ref:l,$color:g},We.default.createElement("span",null,e.subSequence.timeScale.toFixed(2),"x")),We.default.createElement(Rq,ne(F({ref:c,$position:"left","data-handle":"left",title:isFinite(W)?"Sub-sequence start: ".concat(W.toFixed(2)):"Sub-sequence start"},isFinite(W)?hn.includePositionSnapAttrs(W):{}),{$color:g})),We.default.createElement(Lq,ne(F({ref:p,$position:"right","data-handle":"right",title:isFinite(A)?"Sub-sequence end: ".concat(A.toFixed(2)):"Sub-sequence end"},isFinite(A)?hn.includePositionSnapAttrs(A):{}),{$color:g})))},Yq=Gq}),j1,Qq,Xq,Jq,Zq,pie=w(()=>{j1=V(H()),fe(),fie(),Xq=C.div(Qq||(Qq=j([`
  position: relative;
  height: 100%;
  width: 100%;
`]))),Jq=({layoutP:e,leaf:t})=>j1.default.createElement(Xq,null,j1.default.createElement(Yq,{layoutP:e,leaf:t})),Zq=Jq}),C1,eM,tM,hie=w(()=>{C1=V(H()),Up(),pie(),eM=({leaf:e,layoutP:t})=>C1.default.createElement(yi,{leaf:e,node:C1.default.createElement(Zq,{layoutP:t,leaf:e})},null),tM=eM}),hh,O1,nM,_1,D1=w(()=>{hh=V(H()),O1=(0,hh.createContext)({searchTerm:"",searchTrigger:0}),nM=({searchTerm:e,searchTrigger:t,children:n})=>hh.default.createElement(O1.Provider,{value:{searchTerm:e,searchTrigger:t}},n),_1=()=>(0,hh.useContext)(O1)});function ps(e,t){Z().transaction(({stateEditors:n})=>{n.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.sequenceEditorCollapsableItems.set(ne(F({},t.sheetAddress),{studioSheetItemKey:t.sheetItemKey,isCollapsed:e}))})}var T1=w(()=>{Pe()});function mie(e,t){if(!t.trim())return;let n=t.toLowerCase().trim();e.children.filter(o=>o.type==="sheetObject").forEach(o=>{bie(o,n)&&(ps(!1,{sheetAddress:o.sheetObject.address,sheetItemKey:o.sheetItemKey}),aM(o.children,n,o.sheetObject.address))})}function gie(e){e.children.filter(t=>t.type==="sheetObject").forEach(t=>{let n="".concat(t.sheetObject.address.projectId,":").concat(t.sheetObject.address.sheetId,":").concat(t.sheetItemKey);Pi.set(n,t.isCollapsed),rM(t.children,t.sheetObject.address)})}function rM(e,t){e.forEach(n=>{if(n.type==="propWithChildren"){let o="".concat(t.projectId,":").concat(t.sheetId,":").concat(n.sheetItemKey);Pi.set(o,n.isCollapsed),rM(n.children,t)}})}function vie(e){e.children.filter(t=>t.type==="sheetObject").forEach(t=>{let n="".concat(t.sheetObject.address.projectId,":").concat(t.sheetObject.address.sheetId,":").concat(t.sheetItemKey),o=Pi.get(n);o!==void 0&&o!==t.isCollapsed&&ps(o,{sheetAddress:t.sheetObject.address,sheetItemKey:t.sheetItemKey}),oM(t.children,t.sheetObject.address)}),Pi.clear()}function oM(e,t){e.forEach(n=>{if(n.type==="propWithChildren"){let o="".concat(t.projectId,":").concat(t.sheetId,":").concat(n.sheetItemKey),i=Pi.get(o);i!==void 0&&i!==n.isCollapsed&&ps(i,{sheetAddress:t,sheetItemKey:n.sheetItemKey}),oM(n.children,t)}})}function bie(e,t){return e.sheetObject.address.objectKey.toLowerCase().includes(t)?!0:e.children.some(n=>A1(n,t))}function aM(e,t,n){e.forEach(o=>{var i;if(o.type==="propWithChildren"){let l=(((i=o.pathToProp[o.pathToProp.length-1])==null?void 0:i.toString().toLowerCase())||"").includes(t),u=o.children.some(c=>A1(c,t));(l||u)&&(ps(!1,{sheetAddress:n,sheetItemKey:o.sheetItemKey}),aM(o.children,t,n))}})}function A1(e,t){var n;return(((n=e.pathToProp[e.pathToProp.length-1])==null?void 0:n.toString().toLowerCase())||"").includes(t)?!0:e.type==="propWithChildren"?e.children.some(o=>A1(o,t)):!1}function iM(e,t){if(!t.trim())return vie(e),e;Pi.size===0&&gie(e),mie(e,t);let n=t.toLowerCase().trim(),o=e.children.map(c=>c.type==="sheetObject"?yie(c,n):null).filter(c=>c!==null),i=e.top,l=e.n,u=o.map(c=>{let d=xie(c,i,l);return i=d.top+d.heightIncludingChildren,l=d.n+1,d});return ne(F({},e),{children:u,heightIncludingChildren:i-e.top,isCollapsed:!1})}function yie(e,t){if(e.sheetObject.address.objectKey.toLowerCase().includes(t))return ne(F({},e),{children:e.children,isCollapsed:!1});{let n=e.children.map(o=>lM(o,t)).filter(o=>o!==null);if(n.length>0)return ne(F({},e),{children:n,isCollapsed:!1})}return null}function lM(e,t){var n;let o=(((n=e.pathToProp[e.pathToProp.length-1])==null?void 0:n.toString().toLowerCase())||"").includes(t);if(e.type==="primitiveProp")return o?e:null;if(o)return ne(F({},e),{children:e.children,isCollapsed:!1});{let i=e.children.map(l=>lM(l,t)).filter(l=>l!==null);if(i.length>0)return ne(F({},e),{children:i,isCollapsed:!1})}return null}function xie(e,t,n){let o=t,i=n,l=ne(F({},e),{top:o,n:i});o+=e.nodeHeight,i+=1;let u=e.children.map(c=>{let d=sM(c,o,i);return o=d.top+d.nodeHeight,d.type==="propWithChildren"&&(o+=d.heightIncludingChildren-d.nodeHeight),i=d.n+1,d});return ne(F({},l),{children:u,heightIncludingChildren:o-l.top})}function sM(e,t,n){let o=ne(F({},e),{top:t,n});if(e.type==="propWithChildren"){let i=t+e.nodeHeight,l=n+1,u=e.children.map(c=>{let d=sM(c,i,l);return i=d.top+d.nodeHeight,d.type==="propWithChildren"&&(i+=d.heightIncludingChildren-d.nodeHeight),l=d.n+1,d});return ne(F({},o),{children:u,heightIncludingChildren:i-o.top})}return o}var Pi,uM=w(()=>{T1(),Pi=new Map});function B1(e,t=[]){e.shouldRender&&t.push(e);let n="isCollapsed"in e?e.isCollapsed:!1;if((e.type==="sheet"||!n)&&"children"in e)for(let o of e.children)B1(o,t);return t}var cM=w(()=>{}),mh,ka,hs,dM,fM,pM,hM,mM,gM,z1=w(()=>{_e(),mh=ge.requireDist(),ka=V(H()),fe(),cae(),t1(),cie(),hie(),D1(),uM(),Dr(),cM(),Mp(),jq(),hs=1e6,fM=C.div(dM||(dM=j([`
  position: relative;
`]))),hM=C.div(pM||(pM=j([`
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  width: `,`px;
  z-index: 10;
`])),hs),mM=({layoutP:e})=>{let{searchTerm:t,searchTrigger:n}=_1(),o=Wy(),{scrollTop:i,clientHeight:l}=Me(o);return Ne(()=>{let u=(0,mh.val)(e.tree),c=t.trim()?iM(u,t):u,d=(0,mh.val)(e.tree.top)+Math.max(c.heightIncludingChildren,(0,mh.val)(e.dopeSheetDims.height)),p=B1(c),h=[],b=500,g=i-b,m=i+l+b,y=-1;for(let x=0;x<p.length;x++){let S=p[x];if(S.top+S.nodeHeight>=g){y=x;break}}if(y!==-1)for(let x=y;x<p.length;x++){let S=p[x];if(S.top>m)break;h.push(S)}return ka.default.createElement(fM,null,ka.default.createElement(Vp,{layoutP:e,height:d},ka.default.createElement(TB,{layoutP:e,height:d},ka.default.createElement(hM,{style:{top:"0px"}},h.map(x=>{let S=null;return x.type==="subSequence"?S=ka.default.createElement(tM,{layoutP:e,key:Vt.forSubSequence(x.subSequence.id),leaf:x}):x.type==="sheetObject"?S=ka.default.createElement(Oq,{layoutP:e,key:"sheetObject-"+x.sheetObject.address.objectKey,leaf:x,renderChildren:!1}):(x.type==="propWithChildren"||x.type==="primitiveProp")&&(S=ph(x,e,!1)),S?ka.default.createElement("div",{key:x.type+"-"+(x.sheetItemKey||x.top),style:{position:"absolute",top:x.top+"px",width:"100%",height:x.nodeHeight+"px"}},S):null})))))},[e,t,n,i,l])},gM=mM});function q1(e,t,n,o){let i="calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(e,"px)"),l="calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(t,") * 1px)");n===0&&(n=1e-4);let u="calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(n,")");o===0&&(o=.001);let c="calc(var(--graphEditorVerticalSpace) * ".concat(o*-1,")");return"translate(".concat(i,", ").concat(l,") scale(").concat(u,", ").concat(c,")")}function kie(e,t){let{index:n,trackData:o}=t,i=o.keyframes[n],l=o.keyframes[n+1];return fn(e,{menuItems:()=>[{label:"Delete",callback:()=>{Z().transaction(({stateEditors:u})=>{let{deleteKeyframes:c}=u.coreByProject.historic.sheetsById.sequence;c(ne(F({},t.sheetObject.address),{trackId:t.trackId,keyframeIds:[i.id,l.id]}))})}}]})}var gh,vM,bM,yM,xM,kM,M1=w(()=>{ha(),Pe(),pn(),Ze(),gh=V(H()),fe(),bM=C.path(vM||(vM=j([`
  stroke-width: 2;
  stroke: var(--main-color);
  fill: none;
  vector-effect: non-scaling-stroke;
`]))),yM="M 0 0 L 1 0 L 1 1",xM=e=>{let{index:t,trackData:n}=e,o=n.keyframes[t],i=n.keyframes[t+1],l=i.position-o.position,[u,c]=$e(null),[d]=kie(c,e),p=e.isScalar?wp(o.value,e.propConfig):0,h=e.isScalar?wp(i.value,e.propConfig):1,b=e.extremumSpace.fromValueSpace(p),g=e.extremumSpace.fromValueSpace(h)-b,m=q1(o.position,b,l,g),y=o.handles[2],x=o.handles[3],S=i.handles[0],E=i.handles[1],P="M 0 0 C ".concat(y," ").concat(x," ").concat(S," ").concat(E," 1 1");return gh.default.createElement(gh.default.Fragment,null,gh.default.createElement(bM,{ref:u,d:!o.type||o.type==="bezier"?P:yM,style:{transform:m}}),d)},kM=xM});function wie(e,t){let n=(0,Ii.useRef)(t);n.current=t;let o=(0,Ii.useMemo)(()=>({debugName:"CurveHandler/useOurDrags",lockCSSCursorTo:"move",onDragStart(){let i,l=n.current,u=(0,kc.val)(l.layoutP.scaledSpace.toUnitSpace),c=(0,kc.val)(l.layoutP.graphEditorVerticalSpace.toExtremumSpace),d=l.extremumSpace.lock();return{onDrag(p,h){i&&(i.discard(),i=void 0);let{index:b,trackData:g}=l,m=g.keyframes[b],y=g.keyframes[b+1],x=u(p)/(y.position-m.position),S=-h,E=c(S),P=l.extremumSpace.deltaToValueSpace(E),O=t.isScalar?m.value:0,z=t.isScalar?y.value:1,B=P/(z-O);if(l.which==="left"){let D=at(m.handles[2]+x,0,1),X=m.handles[3]+B;i=Z().tempTransaction(({stateEditors:M})=>{M.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},l.sheetObject.address),{snappingFunction:(0,kc.val)(l.layoutP.sheet).getSequence().closestGridPosition,trackId:l.trackId,keyframes:[ne(F({},m),{handles:[m.handles[0],m.handles[1],D,X]})]}))})}else{let D=at(y.handles[0]+x,0,1),X=y.handles[1]+B;i=Z().tempTransaction(({stateEditors:M})=>{M.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},l.sheetObject.address),{trackId:l.trackId,snappingFunction:(0,kc.val)(l.layoutP.sheet).getSequence().closestGridPosition,keyframes:[ne(F({},y),{handles:[D,X,y.handles[2],y.handles[3]]})]}))})}},onDragEnd(p){d(),p?i&&i.commit():i&&i.discard()}}}}),[]);pt(e,o)}function Sie(e,t){return fn(e,{menuItems:()=>[{label:"Delete",callback:()=>{Z().transaction(({stateEditors:n})=>{n.coreByProject.historic.sheetsById.sequence.deleteKeyframes(ne(F({},t.sheetObject.address),{keyframeIds:[t.keyframe.id],trackId:t.trackId}))})}}]})}var kc,Ii,wM,R1,SM,EM,PM,IM,jM,F1,Eie=w(()=>{Pe(),pn(),Ct(),Ze(),kc=ge.requireDist(),Qt(),Ii=V(H()),fe(),M1(),tt(),R1=C.circle(wM||(wM=j([`
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
  fill: var(--main-color);
  r: 2px;
  pointer-events: none;
`]))),EM=C.circle(SM||(SM=j([`
  stroke-width: 6px;
  vector-effect: non-scaling-stroke;
  r: 6px;
  fill: transparent;
  cursor: move;
  `,`;
  &:hover {
  }
  &:hover + `,` {
    r: 6px;
  }
`])),Qe,R1),IM=C.path(PM||(PM=j([`
  stroke-width: 1;
  stroke: var(--main-color);
  /* stroke: gray; */
  fill: none;
  vector-effect: non-scaling-stroke;
`]))),jM=e=>{let[t,n]=$e(null),{index:o,trackData:i}=e,l=i.keyframes[o],u=i.keyframes[o+1],[c]=Sie(n,e);wie(n,e);let d=e.which==="left"?l.handles[2]:u.handles[0],p=l.position+(u.position-l.position)*d,h=e.which==="left"?l.handles[3]:u.handles[1],b=e.isScalar?l.value:0,g=e.isScalar?u.value:1,m=b+(g-b)*h,y=e.extremumSpace.fromValueSpace(m),x=y-e.extremumSpace.fromValueSpace(e.which==="left"?b:g),S=q1(e.which==="left"?l.position:u.position,e.extremumSpace.fromValueSpace(e.which==="left"?b:g),p-(e.which==="left"?l.position:u.position),x);return Ii.default.createElement("g",null,Ii.default.createElement(EM,{ref:t,style:{cx:"calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(p," * 1px)"),cy:"calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(y,") * 1px)")}}),Ii.default.createElement(R1,{style:{cx:"calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(p," * 1px)"),cy:"calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(y,") * 1px)")}}),Ii.default.createElement(IM,{d:"M 0 0 L 1 1",style:{transform:S}}),c)},F1=jM});function Pie(e){let[t,n]=(0,wa.useState)(!1);so(t,e.props.keyframe.position);let o=(0,wa.useRef)(e.props);o.current=e.props;let i=(0,wa.useMemo)(()=>({debugName:"GraphEditorDotScalar/useDragKeyframe",lockCSSCursorTo:"move",onDragStart(l){n(!0);let u=!!l.altKey,c=o.current,d=(0,vh.val)(c.layoutP.scaledSpace.toUnitSpace),p=(0,vh.val)(c.layoutP.graphEditorVerticalSpace.toExtremumSpace),h=c.extremumSpace.lock(),b;return{onDrag(g,m){let y=c.trackData.keyframes[c.index],x=d(g),S=-m,E=p(S),P=c.extremumSpace.deltaToValueSpace(E),O=[],z=ne(F({},y),{position:y.position+x,value:y.value+P,handles:[...y.handles]});if(O.push(z),u){let B=c.trackData.keyframes[c.index-1];if(B&&Math.abs(y.value-B.value)>0){let X=ne(F({},B),{handles:[...B.handles]});O.push(X),X.handles[3]=jie(B.handles[3],B.value,B.value,y.value,z.value)}let D=c.trackData.keyframes[c.index+1];if(D&&Math.abs(y.value-D.value)>0){let X=ne(F({},D),{handles:[...D.handles]});O.push(X),X.handles[1]=Cie(X.handles[1],X.value,X.value,y.value,z.value)}}b?.discard(),b=Z().tempTransaction(({stateEditors:B})=>{B.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},c.sheetObject.address),{trackId:c.trackId,keyframes:O,snappingFunction:(0,vh.val)(c.layoutP.sheet).getSequence().closestGridPosition}))})},onDragEnd(g){n(!1),h(),g?b?.commit():(b?.discard(),e.onDetectedClick(l))}}}}),[]);return pt(e.node,i),Dn(t,"draggingPositionInSequenceEditor","move"),t}function Iie(e,t){return fn(e,{menuItems:()=>[{label:"Delete",callback:()=>{Z().transaction(({stateEditors:n})=>{n.coreByProject.historic.sheetsById.sequence.deleteKeyframes(ne(F({},t.sheetObject.address),{keyframeIds:[t.keyframe.id],trackId:t.trackId}))})}}]})}function jie(e,t,n,o,i){return(o-t)*e/(i-n)}function Cie(e,t,n,o,i){return((t-o)*e+o-t+n-i)/(n-i)}var vh,wa,CM,L1,OM,_M,DM,TM,Oie=w(()=>{Pe(),pn(),Ct(),Ze(),vh=ge.requireDist(),wa=V(H()),fe(),Rt(),Rt(),tt(),un(),Fr(),p1(),ic(),L1=C.circle(CM||(CM=j([`
  fill: var(--main-color);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;

  r: 2px;
`]))),_M=C.circle(OM||(OM=j([`
  stroke-width: 6px;
  vector-effect: non-scaling-stroke;
  r: 6px;
  fill: transparent;
  `,`;

  &:hover + `,` {
    r: 6px;
  }

  #pointer-root.normal & {
    cursor: move;
  }

  #pointer-root.draggingPositionInSequenceEditor & {
    pointer-events: auto;
    cursor: var(`,`);
  }

  &.beingDragged {
    pointer-events: none !important;
  }
`])),Qe,L1,Cr),DM=e=>{let[t,n]=$e(null),{index:o,trackData:i}=e,l=i.keyframes[o],[u]=Iie(n,e),c=ts(e.itemKey),d=l.value,p=e.extremumSpace.fromValueSpace(d),h=f1([{type:"primitiveProp",keyframe:e.keyframe,pathToProp:e.pathToProp,propConfig:e.propConfig,sheetObject:e.sheetObject,trackId:e.trackId}]),b=Pie({node:n,props:e,onDetectedClick:g=>h.toggle(g,g.target instanceof Element?g.target:n)});return wa.default.createElement(wa.default.Fragment,null,wa.default.createElement(_M,ne(F(F(F({ref:t,style:{cx:"calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(l.position," * 1px)"),cy:"calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(p,") * 1px)")}},uo(l.position)),hn.includePositionSnapAttrs(l.position)),c.attrs),{className:b?"beingDragged":""})),wa.default.createElement(L1,{style:{cx:"calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(l.position," * 1px)"),cy:"calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(p,") * 1px)"),fill:c.flag===2?"white":void 0}}),h.node,u)},TM=DM});function _ie(e){let[t,n]=(0,Sa.useState)(!1);so(t,e.props.keyframe.position);let o=(0,Sa.useRef)(e.props);o.current=e.props;let i=(0,Sa.useMemo)(()=>({debugName:"GraphEditorDotNonScalar/useDragKeyframe",lockCSSCursorTo:"ew-resize",onDragStart(l){n(!0);let u=o.current,c=(0,N1.val)(u.layoutP.scaledSpace.toUnitSpace),d=u.extremumSpace.lock(),p;return{onDrag(h,b){let g=u.trackData.keyframes[u.index],m=c(h),y=[],x=ne(F({},g),{position:g.position+m,value:g.value,handles:[...g.handles]});y.push(x),p?.discard(),p=Z().tempTransaction(({stateEditors:S})=>{S.coreByProject.historic.sheetsById.sequence.replaceKeyframes(ne(F({},u.sheetObject.address),{trackId:u.trackId,keyframes:y,snappingFunction:(0,N1.val)(u.layoutP.sheet).getSequence().closestGridPosition}))})},onDragEnd(h){n(!1),d(),h?p?.commit():(p?.discard(),e.onDetectedClick(l))}}}}),[]);return pt(e.node,i),Dn(t,"draggingPositionInSequenceEditor","ew-resize"),t}function Die(e,t){return fn(e,{menuItems:()=>[{label:"Delete",callback:()=>{Z().transaction(({stateEditors:n})=>{n.coreByProject.historic.sheetsById.sequence.deleteKeyframes(ne(F({},t.sheetObject.address),{keyframeIds:[t.keyframe.id],trackId:t.trackId}))})}}]})}var N1,Sa,AM,V1,BM,zM,qM,K1,Tie=w(()=>{Pe(),pn(),Ct(),Ze(),N1=ge.requireDist(),Sa=V(H()),fe(),Rt(),Rt(),tt(),un(),Fr(),p1(),ic(),V1=C.circle(AM||(AM=j([`
  fill: var(--main-color);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;

  r: 2px;
`]))),zM=C.circle(BM||(BM=j([`
  stroke-width: 6px;
  vector-effect: non-scaling-stroke;
  r: 6px;
  fill: transparent;
  `,`;

  &:hover + `,` {
    r: 6px;
  }

  #pointer-root.normal & {
    cursor: ew-resize;
  }

  #pointer-root.draggingPositionInSequenceEditor & {
    pointer-events: auto;
    cursor: var(`,`);
  }

  &.beingDragged {
    pointer-events: none !important;
  }
`])),Qe,V1,Cr),qM=e=>{let[t,n]=$e(null),{index:o,trackData:i,itemKey:l}=e,u=i.keyframes[o],[c]=Die(n,e),d=ts(l),p=e.which==="left"?0:1,h=f1([{type:"primitiveProp",keyframe:e.keyframe,pathToProp:e.pathToProp,propConfig:e.propConfig,sheetObject:e.sheetObject,trackId:e.trackId}]),b=_ie({node:n,props:e,onDetectedClick:m=>h.toggle(m,m.target instanceof Element?m.target:n)}),g=e.extremumSpace.fromValueSpace(p);return Sa.default.createElement(Sa.default.Fragment,null,Sa.default.createElement(zM,ne(F(F(F({ref:t,style:{cx:"calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(u.position," * 1px)"),cy:"calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(g,") * 1px)")}},d.attrs),uo(u.position)),hn.includePositionSnapAttrs(u.position)),{className:b?"beingDragged":""})),Sa.default.createElement(V1,{style:{cx:"calc(var(--unitSpaceToScaledSpaceMultiplier) * ".concat(u.position," * 1px)"),cy:"calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ".concat(g,") * 1px)"),fill:d.flag===2?"white":void 0}}),h.node,c)},K1=qM}),bh,MM,RM,FM,LM,Aie=w(()=>{bh=V(H()),fe(),M1(),RM=C.path(MM||(MM=j([`
  stroke-width: 2;
  stroke: var(--main-color);
  stroke-dasharray: 3 2;
  fill: none;
  vector-effect: non-scaling-stroke;
  opacity: 0.3;
`]))),FM=e=>{let{index:t,trackData:n}=e,o="M 0 0 L 1 1",i=q1(n.keyframes[t].position,e.extremumSpace.fromValueSpace(0),0,e.extremumSpace.fromValueSpace(1)-e.extremumSpace.fromValueSpace(0));return bh.default.createElement(bh.default.Fragment,null,bh.default.createElement(RM,{d:o,style:{transform:i}}))},LM=FM}),en,NM,VM,KM,UM,HM,Bie=w(()=>{en=V(H()),fe(),M1(),Eie(),Oie(),Tie(),Aie(),VM=C.g(NM||(NM=j([`
  /* position: absolute; */
`]))),KM=en.default.createElement(en.default.Fragment,null),UM=e=>{let{index:t,trackData:n,isScalar:o}=e,i=n.keyframes[t],l=n.keyframes[t+1],u=i.connectedRight&&!!l&&l.value!==i.value;return en.default.createElement(VM,null,u?en.default.createElement(en.default.Fragment,null,en.default.createElement(kM,F({},e)),!i.type||i.type==="bezier"&&en.default.createElement(en.default.Fragment,null,en.default.createElement(F1,ne(F({},e),{which:"left"})),en.default.createElement(F1,ne(F({},e),{which:"right"})))):KM,o?en.default.createElement(TM,F({},e)):en.default.createElement(en.default.Fragment,null,en.default.createElement(K1,ne(F({},e),{which:"left"})),en.default.createElement(K1,ne(F({},e),{which:"right"})),en.default.createElement(LM,F({},e))))},HM=UM});function zie(e,t){let n=1/0,o=-1/0;function i(l){n=Math.min(l,n),o=Math.max(l,o)}return e.forEach((l,u)=>{let c=wp(l.value,t);if(i(c),!l.connectedRight)return;let d=e[u+1];if(!d)return;let p=(typeof d.value=="number"?d.value:1)-c;i(c+l.handles[3]*p),i(c+d.handles[1]*p)}),[n,o]}function qie(e){let t=0,n=1;function o(i){t=Math.min(i,t),n=Math.max(i,n)}return e.forEach((i,l)=>{if(!i.connectedRight)return;let u=e[l+1];u&&(o(i.handles[3]),o(u.handles[1]))}),[t,n]}var co,$M,WM,Mie=w(()=>{Dr(),co=V(H()),xh(),Bie(),ha(),_e(),$M=co.default.memo(({layoutP:e,trackData:t,sheetObject:n,trackId:o,color:i,pathToProp:l})=>{let u=Zl(Me(n.template.configPointer),l);if(lo(u))return console.error("Composite prop types cannot be keyframed"),co.default.createElement(co.default.Fragment,null);let[c,d]=(0,co.useState)(!1),p=(0,co.useMemo)(()=>{let m=new Set;return function(){let y=m.size===0;m.add(x),y&&d(!0);function x(){let S=m.size>0;m.delete(x),S&&m.size===0&&d(!1)}return x}},[]),h=(0,co.useMemo)(()=>{let m=u.type==="number"?zie(t.keyframes,u):qie(t.keyframes),y=E=>(E-m[0])/(m[1]-m[0]),x=E=>m[0]+S(E),S=E=>E*(m[1]-m[0]);return{fromValueSpace:y,toValueSpace:x,deltaToValueSpace:S,lock:p}},[t.keyframes]),b=(0,co.useRef)(void 0);c||(b.current=h);let g=t.keyframes.map((m,y)=>co.default.createElement(HM,{pathToProp:l,propConfig:u,itemKey:Vt.forTrackKeyframe(n,o,m.id),keyframe:m,index:y,trackData:t,layoutP:e,sheetObject:n,trackId:o,isScalar:u.type==="number",key:m.id,extremumSpace:b.current,color:i}));return co.default.createElement("g",{style:{"--main-color":wc[i].iconColor}},g)}),WM=$M}),GM,yh,YM,QM,Rie=w(()=>{Pe(),_e(),GM=ge.requireDist(),yh=V(H()),Mie(),YM=e=>Ne(()=>{let{sheetObject:t,trackId:n}=e,o=(0,GM.val)(Z().atomP.historic.coreByProject[t.address.projectId].sheetsById[t.address.sheetId].sequence.tracksByObject[t.address.objectKey].trackData[n]);return o?.type!=="BasicKeyframedTrack"?(console.error("trackData type ".concat(o?.type," is not yet supported on the graph editor")),yh.default.createElement(yh.default.Fragment,null)):yh.default.createElement(WM,ne(F({},e),{trackData:o}))},[e.trackId,e.layoutP]),QM=YM});function XM({clippedSpaceRange:e,clippedSpaceWidth:t,fps:n,gapWidth:o=120},i){let l=1/n,u=e.end-e.start,c=t/(n*u),d=Math.floor(o/c),p=(d<n?JM(n).find(g=>g>=d):n*Math.floor(d/n))*l,h=Math.floor(e.start/p),b=Math.ceil(e.end/p);for(let g=h;g<=b;g++){let m=g*p,y=m%1===0;i(m,y)}}var JM,ZM=w(()=>{Qt(),JM=b0(e=>{let t=[];for(let n=1;n<=e;n++)e%n===0&&t.push(n);return t})});function Fie(e){let{clippedSpaceWidth:t,height:n,ctx:o,unitSpaceToClippedSpace:i,snapToGrid:l}=e;o.clearRect(0,0,t,n),XM(e,(u,c)=>{let d=l(u),p=Math.floor(i(d));o.strokeStyle=c?"rgba(225, 225, 225, 0.04)":"rgba(255, 255, 255, 0.01)",o.beginPath(),o.moveTo(p,0),o.lineTo(p,n),o.stroke(),o.closePath()})}var ji,Ci,eR,tR,nR,rR,oR,aR,iR,lR,U1,sR=w(()=>{ji=ge.requireDist(),Ci=V(H()),fe(),ZM(),Pe(),tR=C.div(eR||(eR=j([`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
`]))),rR=C.canvas(nR||(nR=j([`
  position: relative;
  left: 0;
`]))),oR=e=>{let t=e;return t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1},aR=()=>window.devicePixelRatio||1,iR=e=>aR()/oR(e),lR=({layoutP:e,width:t,height:n})=>{let o=(0,Ci.useRef)(null),[i,l]=(0,Ci.useState)(null),{ctx:u,ratio:c}=(0,Ci.useMemo)(()=>{if(!i)return{};let d=i.getContext("2d"),p=iR(d);return{ctx:d,ratio:p}},[i]);return(0,Ci.useLayoutEffect)(()=>{if(!u)return;i.width=t*c,i.height=n*c;let d=(0,ji.prism)(()=>{let p=(0,ji.val)(e.sheet).getSequence();return{ctx:u,clippedSpaceRange:(0,ji.val)(e.clippedSpace.range),clippedSpaceWidth:(0,ji.val)(e.clippedSpace.width),unitSpaceToClippedSpace:(0,ji.val)(e.clippedSpace.fromUnitSpace),height:n,leftPadding:(0,ji.val)(e.scaledSpace.leftPadding),fps:p.subUnitsPerUnit,snapToGrid:h=>p.closestGridPosition(h)}}).onChange(Z().ticker,p=>{u.save(),u.scale(c,c),Fie(p),u.restore()},!0);return()=>{d()}},[u,t,n,e]),Ci.default.createElement(tR,{ref:o,style:{width:t+"px"}},Ci.default.createElement(rR,{ref:l,style:{width:t+"px",height:n+"px"}}))},U1=lR}),fo,Oi,wc,uR,cR,dR,fR,pR,hR,xh=w(()=>{Pe(),va(),Sp(),_e(),fo=ge.requireDist(),Oi=V(H()),fe(),z1(),t1(),Rie(),sR(),Ir(),wc={1:{iconColor:"#b98b08"},2:{iconColor:"#70a904"},3:{iconColor:"#2e928a"},4:{iconColor:"#a943bb"},5:{iconColor:"#b90808"},6:{iconColor:"#b4bf0e"}},cR=C.div(uR||(uR=j([`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-bottom: 25px;
  background: `,`;
`])),no(.03,"#1a1c1e")),fR=C.svg(dR||(dR=j([`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  pointer-events: none;
`]))),pR=({layoutP:e})=>Ne(()=>{let t=(0,fo.val)(e.sheet),n=(0,fo.val)(Z().atomP.historic.projects.stateByProjectId[t.address.projectId].stateBySheetId[t.address.sheetId].sequenceEditor.selectedPropsByObject),o=(0,fo.val)(e.graphEditorDims.height),i=(0,fo.val)(e.scaledSpace.fromUnitSpace)(1),l=[];if(n)for(let[c,d]of Object.entries(n)){let p=t.getObject(c);if(!p)continue;let h=(0,fo.val)(p.template.getMapOfValidSequenceTracks_forStudio());for(let[b,g]of Object.entries(d)){let m=My(b),y=ma(h,m);y&&l.push(Oi.default.createElement(QM,{key:"graph-".concat(c,"-").concat(b),sheetObject:p,pathToProp:m,layoutP:e,trackId:y,color:g}))}}let u=(0,fo.val)(e.rightDims.width);return Oi.default.createElement(cR,{style:{width:u+"px",height:o+"px","--unitSpaceToScaledSpaceMultiplier":i,"--graphEditorVerticalSpace":"".concat((0,fo.val)(e.graphEditorVerticalSpace.space))}},Oi.default.createElement(U1,{layoutP:e,width:u,height:o}),Oi.default.createElement(Vp,{layoutP:e,height:o},Oi.default.createElement(fR,{width:hs,height:o,viewBox:"0 0 ".concat(hs," ").concat(o)},Oi.default.createElement("g",{style:{transform:"translate(".concat((0,fo.val)(e.scaledSpace.leftPadding),"px, ").concat((0,fo.val)(e.graphEditorDims.padding.top),"px)")}},l))))},[e]),hR=pR}),mR,Bn,gR,vR,bR,yR,H1,xR,kR,wR,SR,ER,PR,IR,jR,CR,Lie=w(()=>{Pe(),va(),Gu(),_e(),mR=ge.requireDist(),Bn=V(H()),fe(),Xoe(),Cp(),xh(),Ap(),Ao(),$b(),pn(),xA(),gR={label:{color:"#9a9a9a"}},bR=C(Ay)(vR||(vR=j([""]))),H1=C(Tp)(yR||(yR=j([`
  display: flex;
  color: `,`;
  padding-left: calc(10px + var(--depth) * 10px);
  padding-right: 12px;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
`])),gR.label.color),kR=C.button(xR||(xR=j([`
  background: none;
  border: none;
  outline: none;
  display: flex;
  box-sizing: border-box;
  font-size: 14px;
  align-items: center;
  height: 100%;
  margin-left: 12px;
  color: `,`;

  &:not([disabled]):hover {
    color: white;
  }
`])),e=>e.isSelected?wc[e.graphEditorColor].iconColor:ga.offColor),wR=()=>Bn.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"12",viewBox:"0 0 640 512"},Bn.default.createElement("g",{transform:"translate(0 100)"},Bn.default.createElement("path",{fill:"currentColor",d:"M368 32h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM208 88h-84.75C113.75 64.56 90.84 48 64 48 28.66 48 0 76.65 0 112s28.66 64 64 64c26.84 0 49.75-16.56 59.25-40h79.73c-55.37 32.52-95.86 87.32-109.54 152h49.4c11.3-41.61 36.77-77.21 71.04-101.56-3.7-8.08-5.88-16.99-5.88-26.44V88zm-48 232H64c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zM576 48c-26.84 0-49.75 16.56-59.25 40H432v72c0 9.45-2.19 18.36-5.88 26.44 34.27 24.35 59.74 59.95 71.04 101.56h49.4c-13.68-64.68-54.17-119.48-109.54-152h79.73c9.5 23.44 32.41 40 59.25 40 35.34 0 64-28.65 64-64s-28.66-64-64-64zm0 272h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z"}))),ER=C.span(SR||(SR=j([`
  margin-right: 4px;
  `,`;

  `,`:hover & {
    color: #ccc;
  }
`])),Tr,H1),IR=C.div(PR||(PR=j([`
  margin-right: auto;
  margin-left: 8px;
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;

  /* Override some default input styles to fit in the row */
  input {
    font-size: 11px;
    height: 24px;
    padding: 2px 4px;
  }
`]))),jR=({leaf:e})=>{var t;let n=Gl(e.sheetObject.propsP,e.pathToProp),o=e.sheetObject,i=Qoe(n,o,e.propConf),l=Ne(()=>{let y=e.sheetObject.address,x=Rr(e.pathToProp);return(0,mR.val)(Z().atomP.historic.projects.stateByProjectId[y.projectId].stateBySheetId[y.sheetId].sequenceEditor.selectedPropsByObject[y.objectKey][x])},[e]),u=(0,Bn.useRef)(!1),c=typeof l=="string";u.current=c;let d=(0,Bn.useCallback)(()=>{let y=e.sheetObject.address;Z().transaction(({stateEditors:x})=>{u.current?x.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removePropFromGraphEditor(ne(F({},y),{pathToProp:e.pathToProp})):e.trackId&&(x.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.addPropToGraphEditor(ne(F({},y),{pathToProp:e.pathToProp})),x.studio.historic.panels.sequenceEditor.graphEditor.setIsOpen({isOpen:!0}))})},[e]),p=(t=e.propConf.label)!=null?t:e.pathToProp[e.pathToProp.length-1],h=!!e.trackId,b=(0,Bn.useRef)(null);Hb(b.current,e);let[g]=fn(b.current,{menuItems:i.contextMenuItems}),m=Sy[e.propConf.type];return Bn.default.createElement(bR,{depth:e.depth},g,Bn.default.createElement(H1,{ref:b,isEven:e.n%2===0,style:{height:e.nodeHeight+"px"},isSelected:c===!0},Bn.default.createElement(ER,null,p),Bn.default.createElement(IR,null,Bn.default.createElement(m,{editingTools:i,propConfig:e.propConf,value:i.value})),i.controlIndicators,Bn.default.createElement(kR,{onClick:d,isSelected:c===!0,graphEditorColor:l??"1",style:{opacity:h?1:.25},disabled:!h},Bn.default.createElement(wR,null))))},CR=jR}),ms,kh,OR,_R=w(()=>{ms=V(H()),Ap(),Lie(),T1(),QA(),Gu(),kh=(e,t=!0)=>{let n="prop"+e.pathToProp[e.pathToProp.length-1];return e.shouldRender?e.type==="propWithChildren"?ms.default.createElement(OR,{leaf:e,key:n,renderChildren:t}):ms.default.createElement(CR,{leaf:e,key:n}):ms.default.createElement(ms.default.Fragment,{key:n})},OR=({leaf:e,renderChildren:t=!0})=>{var n;let o=Gl(e.sheetObject.propsP,e.pathToProp),i=YA(o,e.sheetObject,e.propConf);return ms.default.createElement(zy,{leaf:e,label:(n=e.propConf.label)!=null?n:e.pathToProp[e.pathToProp.length-1],isCollapsed:e.isCollapsed,contextMenuItems:i.contextMenuItems,toggleCollapsed:()=>ps(!e.isCollapsed,{sheetAddress:e.sheetObject.address,sheetItemKey:e.sheetItemKey})},t&&e.children.map(l=>kh(l)))}}),DR,TR,AR,BR,Nie=w(()=>{DR=V(H()),Ap(),_R(),T1(),Pe(),QA(),_e(),TR=ge.requireDist(),qp(),rq(),AR=({leaf:e,renderChildren:t=!0,layoutP:n})=>{let o=e.sheetObject,i=YA(o.propsP,o,o.template.staticConfig),l=Ne(()=>{var u;let c=zp(e),d=c.byPosition.size>0,p=(u=(0,TR.pointerToPrism)(Z().atomP.ahistoric.clipboard.keyframesWithRelativePaths).getValue())!=null?u:[];return[{label:"Copy Keyframes",enabled:d,callback:()=>nq(e,c)},{label:"Paste Keyframes",enabled:p.length>0,callback:()=>eq(e,n,p)}]},[e,n]);return DR.default.createElement(zy,{leaf:e,label:e.sheetObject.address.objectKey,isCollapsed:e.isCollapsed,contextMenuItems:[...i.contextMenuItems,...l],toggleSelect:()=>{Z().transaction(({stateEditors:u})=>{u.studio.historic.panels.outline.selection.set([e.sheetObject])})},toggleCollapsed:()=>ps(!e.isCollapsed,{sheetAddress:e.sheetObject.address,sheetItemKey:e.sheetItemKey})},t&&e.children.map(u=>kh(u)))},BR=AR}),Sc,$1,zR,qR,MR,W1,RR,FR,LR,NR,Vie=w(()=>{Sc=V(H()),fe(),Ap(),Ao(),$b(),Pe(),pn(),$1=ge.requireDist(),qR=C.li(zR||(zR=j([`
  --depth: `,`;
  margin: 0;
  padding: 0;
  list-style: none;
`])),e=>e.depth-1),W1=C(Tp)(MR||(MR=j([`
  padding-left: calc(var(--depth) * 10px);
  display: flex;
  align-items: stretch;
  color: #999;
  box-sizing: border-box;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`]))),FR=C.span(RR||(RR=j([`
  `,`;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 4px;
  padding-left: 20px;
  line-height: 26px;
  flex-wrap: nowrap;
  color: #ccc;

  `,`:hover & {
    color: #fff;
  }
`])),Tr,W1),LR=({leaf:e})=>{let t=(0,Sc.useRef)(null);Hb(t.current,e);let n=e.subSequence.label===void 0?"":e.subSequence.label,o="".concat(n," (").concat(e.subSequence.sheetId,")"),[i]=fn(t.current,{menuItems:()=>[{label:"Edit Label",callback:()=>{let l=prompt("Enter new label:",e.subSequence.label);l!==null&&l.trim()!==""&&Z().transaction(({stateEditors:u})=>{u.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{label:l.trim()}})})}},{label:"Edit Duration",callback:()=>{var l,u;let c=(l=e.subSequence.duration)!=null?l:0;if(c===0){let p=Z(),h=(0,$1.val)(p.projectsP)[e.sheet.address.projectId];c=(u=(0,$1.val)(h.pointers.historic.sheetsById[e.subSequence.sheetId].sequence.length))!=null?u:0}let d=prompt("Enter new duration (seconds):",String(c));if(d!==null){let p=parseFloat(d);!isNaN(p)&&p>0&&Z().transaction(({stateEditors:h})=>{h.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{duration:p}})})}}},{label:"Edit Time Scale",callback:()=>{var l;let u=(l=e.subSequence.timeScale)!=null?l:1,c=prompt("Enter new time scale:",String(u));if(c!==null){let d=parseFloat(c);!isNaN(d)&&d>0&&Z().transaction(({stateEditors:p})=>{p.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id,updates:{timeScale:d}})})}}},{label:"Delete Sub-sequence",callback:()=>{confirm('Are you sure you want to delete sub-sequence "'.concat(e.subSequence.label,'"?'))&&Z().transaction(({stateEditors:l})=>{l.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removeSubSequence({sheetAddress:e.sheet.address,subSequenceId:e.subSequence.id})})}}]});return e.shouldRender?Sc.default.createElement(qR,{depth:e.depth},i,Sc.default.createElement(W1,{ref:t,style:{height:e.nodeHeight+"px"},isEven:e.n%2===0},Sc.default.createElement(FR,null,o))):null},NR=LR}),Ec,yt,VR,KR,UR,HR,$R,WR,Kie=w(()=>{_e(),Ec=ge.requireDist(),yt=V(H()),fe(),Nie(),Vie(),Zoe(),Dr(),D1(),uM(),Ar(),Br(),cM(),Mp(),_R(),KR=C.div(VR||(VR=j([`
  position: absolute;
  left: 0;
  overflow-x: visible;

  &.drop-target {
    background: rgba(64, 170, 164, 0.1);
    outline: 2px dashed rgba(64, 170, 164, 0.5);
    outline-offset: -2px;
  }
`]))),HR=C.div(UR||(UR=j([`
  margin: 0 0 50px 0;
  padding: 0;
  position: relative;
`]))),$R=({layoutP:e})=>{let{searchTerm:t,searchTrigger:n}=_1(),[o,i]=(0,yt.useState)(!1),[l,u]=(0,yt.useState)(null),c=(0,yt.useRef)(null),d=Wy();(0,yt.useLayoutEffect)(()=>{let y=c.current;if(!y)return;let x=S=>{S.stopPropagation()};return y.addEventListener("wheel",x,{passive:!0}),()=>y.removeEventListener("wheel",x)},[]);let p=Tn({debugName:"Left/addSubSequence"},()=>{if(!l)return yt.default.createElement(yt.default.Fragment,null);let y=l.sheetId;return yt.default.createElement(An,null,yt.default.createElement("div",{style:{padding:"8px",minWidth:"300px"}},yt.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold",color:"#CCC"}},"Add Sub-sequence"),yt.default.createElement("div",{style:{marginBottom:"4px",fontSize:"11px",color:"#999"}},"Label:"),yt.default.createElement("input",{type:"text",defaultValue:l.sheetId,onChange:x=>{y=x.target.value},style:{width:"100%",padding:"6px 8px",marginBottom:"12px",background:"rgba(0, 0, 0, 0.3)",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"2px",color:"#FFF",fontSize:"11px"},autoFocus:!0,onKeyDown:x=>{x.key==="Enter"?((0,Ec.val)(e.sheet).getSequence().addSubSequence(l.sheetId,0,{label:y.trim()||l.sheetId}),p.close("user action"),u(null)):x.key==="Escape"&&(p.close("user action"),u(null))}}),yt.default.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"}},yt.default.createElement("button",{onClick:()=>{p.close("user action"),u(null)},style:{padding:"6px 12px",background:"rgba(255, 255, 255, 0.1)",color:"#CCC",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"2px",cursor:"pointer",fontSize:"11px"}},"Cancel"),yt.default.createElement("button",{onClick:()=>{(0,Ec.val)(e.sheet).getSequence().addSubSequence(l.sheetId,0,{label:y.trim()||l.sheetId}),p.close("user action"),u(null)},style:{padding:"6px 12px",background:"#40AAA4",color:"white",border:"none",borderRadius:"2px",cursor:"pointer",fontSize:"11px"}},"Ok"))))}),h=(0,yt.useCallback)(y=>{y.preventDefault(),y.stopPropagation(),i(!0)},[]),b=(0,yt.useCallback)(y=>{y.preventDefault(),y.stopPropagation(),i(!1);try{let x=y.dataTransfer.getData("application/json");if(!x)return;let S=JSON.parse(x);if(S.type!=="theatre-sheet")return;u({sheetId:S.sheetId,projectId:S.projectId,sheetInstanceId:S.sheetInstanceId}),c.current&&p.open({clientX:y.clientX,clientY:y.clientY},c.current)}catch(x){console.error("Error handling drop:",x)}},[p]),{scrollTop:g,clientHeight:m}=Me(d);return Ne(()=>{let y=(0,Ec.val)(e.tree),x=(0,Ec.val)(e.leftDims.width),S=t.trim()?iM(y,t):y,E=B1(S),P=[],O=500,z=g-O,B=g+m+O,D=-1;for(let _=0;_<E.length;_++){let L=E[_];if(L.top+L.nodeHeight>=z){D=_;break}}if(D!==-1)for(let _=D;_<E.length;_++){let L=E[_];if(L.top>B)break;P.push(L)}let X=E[E.length-1],M=X?X.top+X.nodeHeight:0;return yt.default.createElement(yt.default.Fragment,null,p.node,yt.default.createElement(KR,{id:"leftContainer",ref:c,style:{width:x+"px",top:0,pointerEvents:l!==null?"none":"auto"},className:o?"drop-target":"",onDragOver:h,onDrop:b},yt.default.createElement(HR,{style:{height:M+"px"}},P.map(_=>{let L=null;return _.type==="subSequence"?L=yt.default.createElement(NR,{key:Vt.forSubSequence(_.subSequence.id),leaf:_}):_.type==="sheetObject"?L=yt.default.createElement(BR,{key:"sheetObject-"+Joe(_.sheetObject),leaf:_,renderChildren:!1,layoutP:e}):(_.type==="propWithChildren"||_.type==="primitiveProp")&&(L=kh(_,!1)),L?yt.default.createElement("div",{key:_.type+"-"+(_.sheetItemKey||_.top),style:{position:"absolute",top:_.top+"px",width:"100%"}},L):null}))))},[e,t,n,o,l,h,b,p.node,g,m])},WR=$R}),wh,Sh,GR,YR,QR,XR,Uie=w(()=>{Ze(),Pe(),Ct(),wh=ge.requireDist(),Sh=V(H()),fe(),_e(),YR=C.div(GR||(GR=j([`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 11px;
  margin-left: -5px;
  cursor: ew-resize;
  z-index: 1;
  pointer-events: auto;

  &:hover,
  &.isDragging {
    background: linear-gradient(
      to right,
      transparent 5px,
      #478698 5px,
      #478698 6px,
      transparent 6px
    );
  }
`]))),QR=({layoutP:e})=>{let t=Me(e.leftDims.width),[n,o]=$e(null),i=(0,Sh.useRef)(0),l=(0,Sh.useMemo)(()=>({debugName:"DopesheetSplitter",lockCursorTo:"ew-resize",onDragStart(){var c;let d;return i.current=(c=(0,wh.val)(Z().atomP.historic.panels.sequenceEditor.dopesheetLeftWidth))!=null?c:(0,wh.val)(e.leftDims.width),{onDrag(p){let h=(0,wh.val)(e.dopeSheetDims.width)-100,b=Math.min(h,Math.max(225,i.current+p));d?.discard(),d=Z().tempTransaction(({stateEditors:g})=>{g.studio.historic.panels.sequenceEditor.setDopesheetLeftWidth(b)})},onDragEnd(p){p?d?.commit():d?.discard()}}}}),[]),[u]=pt(o,l);return Sh.default.createElement(YR,{ref:n,className:u?"isDragging":"",style:{left:"".concat(t,"px")}})},XR=QR}),G1,JR,ZR,eF,tF,Hie=w(()=>{tt(),vo(),_e(),Ir(),G1=V(H()),fe(),sR(),ZR=C.div(JR||(JR=j([`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: `,`;
  overflow: hidden;
  background: `,`;
  pointer-events: none;
`])),()=>Kr.rightBackground,no(.01,Lv(1*.03,zl.panel.bg))),eF=({layoutP:e})=>{let t=Me(e.rightDims.width),n=Me(e.panelDims.height);return G1.default.createElement(ZR,{style:{width:t+"px"}},G1.default.createElement(U1,{width:t,height:n,layoutP:e}))},tF=eF}),_i,nF,rF,oF,aF,$ie=w(()=>{_e(),_i=V(H()),fe(),Kie(),Uie(),Hie(),z1(),Mp(),rF=C.div(nF||(nF=j([`
  position: absolute;
  left: 0;
  right: 0;
`]))),oF=({layoutP:e})=>{let t=Me(e.dopeSheetDims.height);return _i.default.createElement(rF,{style:{height:t+"px"}},_i.default.createElement(tF,{layoutP:e}),_i.default.createElement(RB,null,_i.default.createElement(WR,{layoutP:e}),_i.default.createElement(gM,{layoutP:e})),_i.default.createElement(XR,{layoutP:e}))},aF=oF});function Wie(e,t,n){return Y1.prism.memo(e,()=>(0,Y1.prism)(t),n).getValue()}var Y1,Gie=w(()=>{Y1=ge.requireDist()});function ct(e){return function(t,n){return e(t,n())}}function Xn(e){return Object.freeze({audience:Di(e,8)?"internal":Di(e,16)?"dev":"public",category:Di(e,4)?"troubleshooting":Di(e,2)?"todo":"general",level:Di(e,512)?512:Di(e,256)?256:Di(e,128)?128:64})}function Di(e,t){return(e&t)===t}function dt(e,t){return((t&32)===32?!0:(t&16)===16?e.dev:(t&8)===8?e.internal:!1)&&e.min<=t}function iF(e=console,t={}){let n=ne(F({},po),{includes:F({},po.includes)}),o={styled:Xie.bind(n,e),noStyle:Zie.bind(n,e)},i=Qie.bind(n);function l(){return n.loggingConsoleStyle&&n.loggerConsoleStyle?o.styled:o.noStyle}return n.create=l(),{configureLogger(u){var c;u==="console"?(n.loggerConsoleStyle=po.loggerConsoleStyle,n.create=l()):u.type==="console"?(n.loggerConsoleStyle=(c=u.style)!=null?c:po.loggerConsoleStyle,n.create=l()):u.type==="keyed"?(n.creatExt=d=>u.keyed(d.names),n.create=i):u.type==="named"&&(n.creatExt=Yie.bind(null,u.named),n.create=i)},configureLogging(u){var c,d,p,h,b;n.includes.dev=(c=u.dev)!=null?c:po.includes.dev,n.includes.internal=(d=u.internal)!=null?d:po.includes.internal,n.includes.min=(p=u.min)!=null?p:po.includes.min,n.include=(h=u.include)!=null?h:po.include,n.loggingConsoleStyle=(b=u.consoleStyle)!=null?b:po.loggingConsoleStyle,n.create=l()},getLogger(){return n.create({names:[]})}}}function Yie(e,t){let n=[];for(let{name:o,key:i}of t.names)n.push(i==null?o:"".concat(o," (").concat(i,")"));return e(n)}function Qie(e){let t=F(F({},this.includes),this.include(e)),n=this.filtered,o=this.named.bind(this,e),i=this.creatExt(e),l=dt(t,524),u=dt(t,522),c=dt(t,521),d=dt(t,529),p=dt(t,545),h=dt(t,265),b=dt(t,268),g=dt(t,273),m=dt(t,289),y=dt(t,137),x=dt(t,145),S=dt(t,73),E=dt(t,81),P=l?i.error.bind(i,zn._hmm):n.bind(e,524),O=u?i.error.bind(i,zn._todo):n.bind(e,522),z=c?i.error.bind(i,zn._error):n.bind(e,521),B=d?i.error.bind(i,zn.errorDev):n.bind(e,529),D=p?i.error.bind(i,zn.errorPublic):n.bind(e,545),X=b?i.warn.bind(i,zn._kapow):n.bind(e,268),M=h?i.warn.bind(i,zn._warn):n.bind(e,265),_=g?i.warn.bind(i,zn.warnDev):n.bind(e,273),L=m?i.warn.bind(i,zn.warnPublic):n.bind(e,273),U=y?i.debug.bind(i,zn._debug):n.bind(e,137),N=x?i.debug.bind(i,zn.debugDev):n.bind(e,145),se=S?i.trace.bind(i,zn._trace):n.bind(e,73),K=E?i.trace.bind(i,zn.traceDev):n.bind(e,81),ce={_hmm:P,_todo:O,_error:z,errorDev:B,errorPublic:D,_kapow:X,_warn:M,warnDev:_,warnPublic:L,_debug:U,debugDev:N,_trace:se,traceDev:K,lazy:{_hmm:l?ct(P):P,_todo:u?ct(O):O,_error:c?ct(z):z,errorDev:d?ct(B):B,errorPublic:p?ct(D):D,_kapow:b?ct(X):X,_warn:h?ct(M):M,warnDev:g?ct(_):_,warnPublic:m?ct(L):L,_debug:y?ct(U):U,debugDev:x?ct(N):N,_trace:S?ct(se):se,traceDev:E?ct(K):K},named:o,utilFor:{internal(){return{debug:ce._debug,error:ce._error,warn:ce._warn,trace:ce._trace,named(J,W){return ce.named(J,W).utilFor.internal()}}},dev(){return{debug:ce.debugDev,error:ce.errorDev,warn:ce.warnDev,trace:ce.traceDev,named(J,W){return ce.named(J,W).utilFor.dev()}}},public(){return{error:ce.errorPublic,warn:ce.warnPublic,debug(J,W){ce._warn('(public "debug" filtered out) '.concat(J),W)},trace(J,W){ce._warn('(public "trace" filtered out) '.concat(J),W)},named(J,W){return ce.named(J,W).utilFor.public()}}}}};return ce}function Xie(e,t){let n=F(F({},this.includes),this.include(t)),o=[],i="";for(let d=0;d<t.names.length;d++){let{name:p,key:h}=t.names[d];if(i+=" %c".concat(p),o.push(this.style.css(p)),h!=null){let b="%c#".concat(h);i+=b,o.push(this.style.css(b))}}let l=this.filtered,u=this.named.bind(this,t),c=[i,...o];return lF(l,t,n,e,c,Jie(c),u)}function Jie(e){let t=e.slice(0);for(let n=1;n<t.length;n++)t[n]+=";background-color:#e0005a;padding:2px;color:white";return t}function Zie(e,t){let n=F(F({},this.includes),this.include(t)),o="";for(let c=0;c<t.names.length;c++){let{name:d,key:p}=t.names[c];o+=" ".concat(d),p!=null&&(o+="#".concat(p))}let i=this.filtered,l=this.named.bind(this,t),u=[o];return lF(i,t,n,e,u,u,l)}function lF(e,t,n,o,i,l,u){let c=dt(n,524),d=dt(n,522),p=dt(n,521),h=dt(n,529),b=dt(n,545),g=dt(n,265),m=dt(n,268),y=dt(n,273),x=dt(n,289),S=dt(n,137),E=dt(n,145),P=dt(n,73),O=dt(n,81),z=c?o.error.bind(o,...i):e.bind(t,524),B=d?o.error.bind(o,...i):e.bind(t,522),D=p?o.error.bind(o,...i):e.bind(t,521),X=h?o.error.bind(o,...i):e.bind(t,529),M=b?o.error.bind(o,...i):e.bind(t,545),_=m?o.warn.bind(o,...l):e.bind(t,268),L=g?o.warn.bind(o,...i):e.bind(t,265),U=y?o.warn.bind(o,...i):e.bind(t,273),N=x?o.warn.bind(o,...i):e.bind(t,273),se=S?o.info.bind(o,...i):e.bind(t,137),K=E?o.info.bind(o,...i):e.bind(t,145),ce=P?o.debug.bind(o,...i):e.bind(t,73),J=O?o.debug.bind(o,...i):e.bind(t,81),W={_hmm:z,_todo:B,_error:D,errorDev:X,errorPublic:M,_kapow:_,_warn:L,warnDev:U,warnPublic:N,_debug:se,debugDev:K,_trace:ce,traceDev:J,lazy:{_hmm:c?ct(z):z,_todo:d?ct(B):B,_error:p?ct(D):D,errorDev:h?ct(X):X,errorPublic:b?ct(M):M,_kapow:m?ct(_):_,_warn:g?ct(L):L,warnDev:y?ct(U):U,warnPublic:x?ct(N):N,_debug:S?ct(se):se,debugDev:E?ct(K):K,_trace:P?ct(ce):ce,traceDev:O?ct(J):J},named:u,utilFor:{internal(){return{debug:W._debug,error:W._error,warn:W._warn,trace:W._trace,named(A,Y){return W.named(A,Y).utilFor.internal()}}},dev(){return{debug:W.debugDev,error:W.errorDev,warn:W.warnDev,trace:W.traceDev,named(A,Y){return W.named(A,Y).utilFor.dev()}}},public(){return{error:W.errorPublic,warn:W.warnPublic,debug(A,Y){W._warn('(public "debug" filtered out) '.concat(A),Y)},trace(A,Y){W._warn('(public "trace" filtered out) '.concat(A),Y)},named(A,Y){return W.named(A,Y).utilFor.public()}}}}};return W}var zn,po,sF=w(()=>{zn={_hmm:Xn(524),_todo:Xn(522),_error:Xn(521),errorDev:Xn(529),errorPublic:Xn(545),_kapow:Xn(268),_warn:Xn(265),warnDev:Xn(273),warnPublic:Xn(289),_debug:Xn(137),debugDev:Xn(145),_trace:Xn(73),traceDev:Xn(81)},po={loggingConsoleStyle:!0,loggerConsoleStyle:!0,includes:Object.freeze({internal:!1,dev:!1,min:256}),filtered:function(){},include:function(){return{}},create:null,creatExt:null,named(e,t,n){return this.create({names:[...e.names,{name:t,key:n}]})},style:{bold:void 0,italic:void 0,cssMemo:new Map([["",""]]),collapseOnRE:/[a-z- ]+/g,color:void 0,collapsed(e){if(e.length<5)return e;let t=e.replace(this.collapseOnRE,"");return this.cssMemo.has(t)||this.cssMemo.set(t,this.css(e)),t},css(e){var t,n,o,i;let l=this.cssMemo.get(e);if(l)return l;let u="color:".concat((n=(t=this.color)==null?void 0:t.call(this,e))!=null?n:"hsl(".concat((e.charCodeAt(0)+e.charCodeAt(e.length-1))%360,", 100%, 60%)"));return(o=this.bold)!=null&&o.test(e)&&(u+=";font-weight:600"),(i=this.italic)!=null&&i.test(e)&&(u+=";font-style:italic"),this.cssMemo.set(e,u),u}}}}),Q1,Eh,Ph=w(()=>{sF(),sF(),Q1=iF(console,{}),Q1.configureLogging({dev:!0,min:64}),Eh=Q1.getLogger().named("Theatre.js (default logger)").utilFor.dev()}),No,Ea,uF,ele=w(()=>{Dr(),No=ge.requireDist(),Ph(),Ea=28,uF=(e,t)=>{No.prism.ensurePrism();let n=!1,o=30,i=0,l=t.atomP.ahistoric.projects.stateByProjectId[e.address.projectId].stateBySheetId[e.address.sheetId].sequence.collapsableItems,u={type:"sheet",isCollapsed:!1,sheet:e,children:[],sheetItemKey:Vt.forSheet(),shouldRender:n,top:60,depth:0,n:i,nodeHeight:0,heightIncludingChildren:-1};for(let y of Object.values((0,No.val)(e.objectsP)))y&&p(y,u.children,u.depth+1,!0);let c=(0,No.val)(t.atomP.historic.projects.stateByProjectId[e.address.projectId].stateBySheetId[e.address.sheetId]),d=(0,No.val)(c.sequenceEditor);if(d){let y=d.subSequenceSet;if(y){let x=Object.values(y.byId||{}).filter(S=>S!==void 0).map(S=>S).sort((S,E)=>S.position-E.position);for(let S of x){let E={type:"subSequence",subSequence:S,sheet:e,sheetItemKey:Vt.forSubSequence(S.id),shouldRender:!0,top:o,depth:u.depth+1,n:i,nodeHeight:Ea,heightIncludingChildren:Ea};u.children.push(E),o+=Ea,i+=1}}}u.heightIncludingChildren=o-u.top;function p(y,x,S,E){var P;let O=(0,No.val)(y.template.getMapOfValidSequenceTracks_forStudio()),z=(0,No.val)(y.template.configPointer);if(Object.keys(z.props).length===0)return;let B=(P=(0,No.val)(l.byId[Vt.forSheetObject(y)].isCollapsed))!=null?P:!0,D={type:"sheetObject",isCollapsed:B,sheetItemKey:Vt.forSheetObject(y),shouldRender:E,top:o,children:[],depth:S,n:i,sheetObject:y,nodeHeight:Ea,heightIncludingChildren:-1};x.push(D),i+=1,o+=D.nodeHeight,h(y,z.props,O,[],z,D.children,S+1,!B),D.heightIncludingChildren=o-D.top}function h(y,x,S,E,P,O,z,B){for(let[D,X]of Object.entries(x)){let M=S[D];b(y,M,[...E,D],X,O,z,B)}}function b(y,x,S,E,P,O,z){E.type==="compound"?g(y,x||{},E,S,E,P,O,z):E.type==="enum"?Eh.warn("Prop type enum is not yet supported in the sequence editor"):m(y,x,S,E,P,O,z)}function g(y,x,S,E,P,O,z,B){var D;let X=(D=(0,No.val)(l.byId[Vt.forSheetObjectProp(y,E)].isCollapsed))!=null?D:!1,M={type:"propWithChildren",isCollapsed:X,propConf:S,pathToProp:E,sheetItemKey:Vt.forSheetObjectProp(y,E),sheetObject:y,shouldRender:B,top:o,children:[],nodeHeight:B?Ea:0,heightIncludingChildren:-1,depth:z,trackMapping:x,n:i};O.push(M),B&&(o+=M.nodeHeight,i+=1),h(y,P.props,x,E,P,M.children,z+1,B&&!X),M.heightIncludingChildren=o-M.top}function m(y,x,S,E,P,O,z){let B={type:"primitiveProp",propConf:E,depth:O,sheetItemKey:Vt.forSheetObjectProp(y,S),sheetObject:y,pathToProp:S,shouldRender:z,top:o,nodeHeight:z?Ea:0,heightIncludingChildren:z?Ea:0,trackId:x,n:i};P.push(B),i+=1,o+=B.nodeHeight}return u}});function tle(e,t){let n=Z(),o=n.atomP.ahistoric.projects.stateByProjectId[e.address.projectId].stateBySheetId[e.address.sheetId],i=n.atomP.historic.projects.stateByProjectId[e.address.projectId].stateBySheetId[e.address.sheetId];return(0,Kt.prism)(()=>{var l,u,c;let d=Wie("tree",()=>uF(e,n),[]),p=(0,Kt.val)(t),h=(0,Kt.val)(n.atomP.historic.panels.sequenceEditor.graphEditor),b=n.atomP.historic.panels.sequenceEditor.rightPanelOpen,g=(l=(0,Kt.val)(b))!=null?l:!0,m=(0,Kt.val)(i.sequenceEditor.selectedPropsByObject),y=!!m&&Object.keys(m).length>0,x=(u=(0,Kt.val)(n.atomP.historic.panels.sequenceEditor.dopesheetLeftWidth))!=null?u:Math.floor(p.width*cF),{leftDims:S,rightDims:E,graphEditorDims:P,dopeSheetDims:O,horizontalScrollbarDims:z}=Kt.prism.memo("leftDims",()=>{var J,W;let A=(J=(0,Kt.val)(b))!=null?J:!0,Y={width:x,height:p.height,screenX:p.screenX,screenY:p.screenY},ie={width:A?p.width-Y.width:0,height:p.height,screenX:p.screenX+Y.width,screenY:p.screenY},q=y&&h?.isOpen===!0,G=Math.floor((q?at((W=h?.height)!=null?W:.5,.1,.7):0)*p.heightWithoutBorder),ue=p.height,de={width:p.width,height:ue,screenX:p.screenX,screenY:p.screenY},re={isAvailable:y,isOpen:q,width:ie.width,height:G,screenX:p.screenX,screenY:p.screenY+ue,padding:{top:20,bottom:20}};return{leftDims:Y,rightDims:ie,graphEditorDims:re,dopeSheetDims:de,horizontalScrollbarDims:{bottom:0}}},[p,h,y,b,x]),B=Kt.prism.memo("graphEditorVerticalSpace",()=>{let J=P.height-P.padding.top-P.padding.bottom;return{space:J,fromExtremumSpace(W){return W*J},toExtremumSpace(W){return W/J}}},[P]),[D,X]=Kt.prism.state("isSeeking",!1),M={isSeeking:D,setIsSeeking:X},_={},L=(c=(0,Kt.val)(o.sequence.clippedSpaceRange))!=null?c:dF,U=Kt.prism.memo("scaledSpace",()=>{let J=L.end-L.start,W=E.width,A=J/W,Y=W/J;return{fromUnitSpace(ie){return ie*Y},toUnitSpace(ie){return ie*A},leftPadding:10}},[L,E.width]),N=Kt.prism.memo("setClippedSpaceRange",()=>function(J){n.transaction(({stateEditors:W})=>{let A=F({},J);if(A.end<=A.start&&(A.end=A.start+1),A.start<0){let Y=A.end-A.start;A.start=0,A.end=Y}W.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.clippedSpaceRange.set(ne(F({},e.address),{range:A}))})},[]),se=Kt.prism.memo("clippedSpace",()=>({range:L,width:E.width,fromUnitSpace(J){return U.fromUnitSpace(J-L.start)+U.leftPadding},toUnitSpace(J){return U.toUnitSpace(J-U.leftPadding)+L.start},setRange:N}),[L,E.width,U,N]),K=Kt.prism.memo("selection.current",()=>new Kt.Atom({current:void 0}),[]),ce=Kt.prism.memo("setRightPanelOpen",()=>function(J){n.transaction(({stateEditors:W})=>{W.studio.historic.panels.sequenceEditor.setRightPanelOpen(J)})},[]);return Ub("finalAtom",{sheet:e,tree:d,panelDims:p,leftDims:S,rightDims:E,dopeSheetDims:O,horizontalScrollbarDims:z,seeker:M,unitSpace:_,scaledSpace:U,clippedSpace:se,graphEditorDims:P,graphEditorVerticalSpace:B,selectionAtom:K,rightPanelOpen:g,setRightPanelOpen:ce}).pointer})}var Kt,cF,dF,X1,nle=w(()=>{Pe(),Gie(),dD(),Kt=ge.requireDist(),ele(),Qt(),cF=.3,dF={start:0,end:10},X1=250});function rle(e){let{fullSecondStampsContainer:t,sequencePositionFormatter:n,snapToGrid:o,unitSpaceToClippedSpace:i}=e,l="";XM(e,(u,c)=>{let d=o(u),p=i(d);c?l+=fF(n.formatFullUnitForGrid(d),p,"full-unit"):l+=fF(n.formatSubUnitForGrid(d),p,"sub-unit")}),t.innerHTML=l}function fF(e,t,n){return'<span class="'.concat(n,'" style="transform: translate3d(').concat(t.toFixed(1),'px, -50%, 0);">').concat(e,"</span>")}var Ti,Ai,pF,hF,Bi,mF,gF,vF,bF,yF,xF,kF=w(()=>{Ti=ge.requireDist(),Ai=V(H()),fe(),ZM(),Pe(),hF=C.div(pF||(pF=j([`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
`]))),Bi={fullUnitStampColor:"#999999",stampFontSize:"10px",subUnitStampColor:"#666666"},gF=C.div(mF||(mF=j([`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  overflow: hidden;
  z-index: 2;
  will-change: transform;
  pointer-events: none;
`]))),bF=C.div(vF||(vF=j([`
  position: absolute;
  top: 0;
  left: 0;

  & > span {
    position: absolute;
    display: block;
    top: 9px;
    left: -10px;
    color: `,`;
    text-align: center;
    font-size: `,`;
    width: 20px;

    &.full-unit {
      color: `,`;
    }

    &.sub-unit {
      color: `,`;
    }
  }

  pointer-events: none;
`])),Bi.fullUnitStampColor,Bi.stampFontSize,Bi.fullUnitStampColor,Bi.subUnitStampColor),yF=({layoutP:e,width:t})=>{let n=(0,Ai.useRef)(null),[o,i]=(0,Ai.useState)(null);return(0,Ai.useLayoutEffect)(()=>{if(o)return(0,Ti.prism)(()=>{let l=(0,Ti.val)(e.sheet).getSequence();return{fullSecondStampsContainer:o,clippedSpaceRange:(0,Ti.val)(e.clippedSpace.range),clippedSpaceWidth:(0,Ti.val)(e.clippedSpace.width),unitSpaceToClippedSpace:(0,Ti.val)(e.clippedSpace.fromUnitSpace),leftPadding:(0,Ti.val)(e.scaledSpace.leftPadding),fps:l.subUnitsPerUnit,sequencePositionFormatter:l.positionFormatter,snapToGrid:u=>l.closestGridPosition(u)}}).onChange(Z().ticker,rle,!0)},[o,t,e]),Ai.default.createElement(hF,{ref:n,style:{width:t+"px"}},Ai.default.createElement(gF,{style:{width:t+"px"}},Ai.default.createElement(bF,{ref:i})))},xF=yF});function ole(e){let[t,n]=(0,J1.useState)(!1);return(0,J1.useEffect)(()=>{if(n(!1),!e)return;let o=l=>{l.target===e?n(!0):n(!1)},i=()=>{n(!1)};return e.addEventListener("mouseenter",o),e.addEventListener("mousemove",o),e.addEventListener("mouseleave",i),()=>{n(!1),e.removeEventListener("mouseenter",o),e.removeEventListener("mousemove",o),e.removeEventListener("mouseleave",i)}},[e]),t}var J1,ale=w(()=>{J1=V(H())});function ile(e,t){let n=0,[o,i]=e,[l,u]=t;return i-o>u-l?[l,u]:(o<l&&(n=0-o),i>u&&(n=u-i),[o+n,i+n])}var ho,Pa,zt,Z1,wF,Ih,SF,EF,PF=w(()=>{ho=ge.requireDist(),_e(),tt(),Pe(),qi(),pn(),Ct(),Ze(),Pa=V(H()),fe(),Rt(),zt={enabled:{backgroundColor:"#2C2F34",stroke:"#646568"},disabled:{backgroundColor:"#282a2cc5",stroke:"#595a5d"},hover:{backgroundColor:"#34373D",stroke:"#C8CAC0"},dragging:{backgroundColor:"#3F444A",stroke:"#C8CAC0"},thumbWidth:9,hitZoneWidth:26,rangeStripMinWidth:30},Z1=1e3,Ih=C.div(wF||(wF=j([`
  position: absolute;
  height: `,`px;
  background-color: `,`;
  cursor: grab;
  top: 0;
  left: 0;
  width: `,`px;
  transform-origin: left top;
  &:hover {
    background-color: `,`;
  }
  &.dragging {
    background-color: `,`;
    cursor: grabbing !important;
  }
  `,`;

  /* covers the one pixel space between the focus range strip and the top strip
  of the sequence editor panel, which would have caused that one pixel to act
  like a panel drag zone */
  &:after {
    display: block;
    content: ' ';
    position: absolute;
    bottom: -1px;
    height: 1px;
    left: 0;
    right: 0;
    background: transparent;
    pointer-events: normal;
    z-index: -1;
  }
`])),()=>go-1,e=>e.enabled?zt.enabled.backgroundColor:zt.disabled.backgroundColor,Z1,zt.hover.backgroundColor,zt.dragging.backgroundColor,Qe),SF=({layoutP:e})=>{let t=(0,Pa.useMemo)(()=>(0,ho.prism)(()=>{let{projectId:p,sheetId:h}=(0,ho.val)(e.sheet).address;return(0,ho.val)(Z().atomP.ahistoric.projects.stateByProjectId[p].stateBySheetId[h].sequence.focusRange)}),[e]),[n,o]=$e(null),[i]=fn(o,{menuItems:()=>{let p=(0,ho.val)(e.sheet),h=t.getValue();return[{label:"Delete focus range",callback:()=>{Z().tempTransaction(({stateEditors:b})=>{b.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.focusRange.unset(F({},p.address))}).commit()}},{label:h!=null&&h.enabled?"Disable focus range":"Enable focus range",callback:()=>{h!==void 0&&Z().tempTransaction(({stateEditors:b})=>{b.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.focusRange.set(ne(F({},p.address),{range:h.range,enabled:!h.enabled}))}).commit()}}]}}),l=Me(e.scaledSpace.toUnitSpace),u=Me(e.sheet),c=(0,Pa.useMemo)(()=>{let p,h;return{debugName:"FocusRangeStrip",onDragStart(b){let g,m=t.getValue();if(!m)return!1;let y=m.range.start,x=m.range.end,S=!1,E=(0,ho.val)(e.sheet).getSequence();return{onDrag(P){if(m=t.getValue(),m){S=!0;let O=l(P),z=y+O,B=x+O;B<z&&(B=z),[p,h]=ile([z,B],[0,E.length]).map(D=>E.closestGridPosition(D)),g&&g.discard(),g=Z().tempTransaction(({stateEditors:D})=>{var X;D.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.focusRange.set(ne(F({},u.address),{range:{start:p,end:h},enabled:(X=m?.enabled)!=null?X:!0}))})}},onDragEnd(){m&&(S&&g!==void 0?g.commit():g&&g.discard())}}},lockCSSCursorTo:"grabbing"}},[u,l]),[d]=pt(o,c);return so(d,-1),Ne(()=>{let p=t.getValue(),h=p?.range||{start:0,end:0},b=(0,ho.val)(e.clippedSpace.fromUnitSpace)(h.start),g=(0,ho.val)(e.clippedSpace.fromUnitSpace)(h.end),m,y;return b<0&&(b=0),g>(0,ho.val)(e.clippedSpace.width)&&(g=(0,ho.val)(e.clippedSpace.width)),b>g?(y=0,m=0):(y=b,m=(g-b)/Z1),p?Pa.default.createElement(Pa.default.Fragment,null,i,Pa.default.createElement(Ih,{id:"range-strip",enabled:p.enabled,className:"".concat(d?"dragging":""," ").concat(p.enabled?"enabled":""),ref:n,style:{transform:"translateX(".concat(y,"px) scale(").concat(m,", 1)")}})):Pa.default.createElement(Pa.default.Fragment,null)},[e,n,t,i,d])},EF=SF}),Ia,Vo,IF,jF,CF,OF,_F,DF,TF,ex,lle=w(()=>{Ia=ge.requireDist(),_e(),Pe(),qi(),un(),Ct(),Ze(),Vo=V(H()),fe(),Rt(),PF(),Fr(),jF=C.div(IF||(IF=j([`
  position: absolute;
  top: 0;
  // the right handle has to be pulled back by its width since its right side indicates its position, not its left side
  left: `,`px;
  transform-origin: left top;
  width: `,`px;
  height: `,`px;
  z-index: 3;

  --bg: `,`;

  stroke: `,`;
  user-select: none;

  cursor: `,`;

  // no pointer events unless pointer-root is in normal mode _and_ the
  // focus range is enabled
  #pointer-root & {
    pointer-events: none;
  }

  #pointer-root.normal & {
    pointer-events: auto;
  }

  #pointer-root.draggingPositionInSequenceEditor & {
    pointer-events: auto;
    cursor: var(`,`);
  }

  &.dragging {
    pointer-events: none !important;
  }

  // highlight the handle if it's hovered, or the whole strip is hovverd
  `,`:hover ~ &, &:hover {
    --bg: `,`;
    stroke: `,`;
  }

  // highlight the handle when it's being dragged or the whole strip is being dragged.
  // using dragging.dragging to give this selector priority, as it seems to be overridden
  // by the hover selector above
  &.dragging,
  `,`.dragging.dragging ~ & {
    --bg: `,`;
    stroke: `,`;
  }

  #pointer-root.draggingPositionInSequenceEditor &:hover {
    --bg: `,`;
    stroke: #40aaa4;
  }

  background-color: var(--bg);

  // a larger hit zone
  &:before {
    display: block;
    content: ' ';
    position: absolute;
    inset: -8px;
  }
`])),e=>e.type==="start"?0:-zt.thumbWidth,zt.thumbWidth,()=>go-1,({enabled:e})=>e?zt.enabled.backgroundColor:zt.disabled.backgroundColor,zt.enabled.stroke,e=>e.type==="start"?"w-resize":"e-resize",Cr,()=>Ih,zt.hover.backgroundColor,zt.hover.stroke,()=>Ih,zt.dragging.backgroundColor,zt.dragging.stroke,zt.dragging.backgroundColor),OF=C.div(CF||(CF=j([`
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;

  background: linear-gradient(
    `,`deg,
    var(--bg) 0%,
    #ffffff00 100%
  );

  width: 12px;
  left: `,`px;
`])),e=>e.type==="start"?90:-90,e=>e.type==="start"?zt.thumbWidth:-zt.thumbWidth+1),DF=C.div(_F||(_F=j([`
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;

  background: linear-gradient(
    `,`deg,
    `,` 0%,
    #ffffff00 100%
  );

  width: 12px;
  left: `,`px;
`])),e=>e.type==="start"?-90:90,()=>Pc.backgroundColor,e=>e.type==="start"?-12:zt.thumbWidth),TF=({layoutP:e,thumbType:t})=>{var n;let[o,i]=$e(null),l=(0,Vo.useMemo)(()=>(0,Ia.prism)(()=>{let{projectId:p,sheetId:h}=(0,Ia.val)(e.sheet).address;return(0,Ia.val)(Z().atomP.ahistoric.projects.stateByProjectId[p].stateBySheetId[h].sequence.focusRange)}),[e]),u=(0,Vo.useMemo)(()=>({debugName:"FocusRangeThumb",onDragStart(){let p,h,b=(0,Ia.val)(e.sheet),g={start:0,end:b.getSequence().length},m=l.getValue()||{range:g,enabled:!1},y=m.enabled,x=m.range[t],S=(0,Ia.val)(e.scaledSpace.toUnitSpace),E=S(zt.rangeStripMinWidth);return{onDrag(P,O,z){var B;let D,X=hn.checkIfMouseEventSnapToPos(z,{ignore:i});if(X==null){let _=S(P);D=x+_}else D=X;h=((B=l.getValue())==null?void 0:B.range)||g,t==="start"?D=Math.max(Math.min(D,h.end-E),0):D=Math.min(Math.max(D,h.start+E),b.getSequence().length);let M=b.getSequence().closestGridPosition(D);p!==void 0&&p.discard(),p=Z().tempTransaction(({stateEditors:_})=>{_.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.focusRange.set(ne(F({},b.address),{range:ne(F({},h),{[t]:M}),enabled:y}))})},onDragEnd(P){P?p?.commit():p?.discard()}}}}),[e]),[c]=pt(i,u);Dn(c,"draggingPositionInSequenceEditor",t==="start"?"w-resize":"e-resize");let d=Me(l);return so(c,(n=d?.range[t])!=null?n:0),Ne(()=>{let p=l.getValue();if(!p)return null;let{enabled:h}=p,b=p.range[t],g=(0,Ia.val)(e.clippedSpace.fromUnitSpace)(b);return(g<0||(0,Ia.val)(e.clippedSpace.width)<g)&&(g=-1e4),Vo.default.createElement(jF,ne(F(F({ref:o},hn.includePositionSnapAttrs(b)),uo(b)),{className:"".concat(c&&"dragging"," ").concat(h&&"enabled"),enabled:h,type:t,style:{transform:"translate3d(".concat(g,"px, 0, 0)")}}),Vo.default.createElement(OF,{type:t,enabled:h}),Vo.default.createElement(DF,{type:t}),Vo.default.createElement("svg",{viewBox:"0 0 9 18",xmlns:"http://www.w3.org/2000/svg"},Vo.default.createElement("line",{x1:"4",y1:"6",x2:"4",y2:"12"}),Vo.default.createElement("line",{x1:"6",y1:"6",x2:"6",y2:"12"})))},[e,o,l,c])},ex=TF});function sle(e,t){let[n,o]=(0,mo.useState)("none");return Dn(n!=="none","dragging",n==="creating"?"ew-resize":"move"),(0,mo.useMemo)(()=>{let i=()=>({debugName:"FocusRangeZone/focusRangeCreationGestureHandlers",onDragStart(u){let c,d=(0,zi.val)(e.clippedSpace.toUnitSpace),p=(0,zi.val)(e.scaledSpace.toUnitSpace),h=(0,zi.val)(e.sheet),b=h.getSequence(),g=u.target.getBoundingClientRect(),m=d(u.clientX-g.left),y=p(zt.rangeStripMinWidth);return{onDrag(x){let S=p(x),E=m,P=m+S;[E,P]=[at(E,0,b.length),at(P,0,b.length)].map(O=>b.closestGridPosition(O)),P<E?[E,P]=[Math.max(Math.min(P,E-y),0),E]:x>0&&(P=Math.min(Math.max(P,E+y),b.length)),c&&c.discard(),c=Z().tempTransaction(({stateEditors:O})=>{O.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.focusRange.set(ne(F({},h.address),{range:{start:E,end:P},enabled:!0}))})},onDragEnd(x){x&&c!==void 0?c.commit():c&&c.discard()}}},lockCSSCursorTo:"ew-resize"}),l=()=>({debugName:"FocusRangeZone/panelMoveGestureHandlers",onDragStart(){let u,c=t.current,d=t.current.addBoundsHighlightLock();return{onDrag(p,h){let b=ne(F({},c.dims),{top:at(c.dims.top+h,0,window.innerHeight-ro),left:at(c.dims.left+p,-c.dims.width+ro,window.innerWidth-ro)}),g=ep(b,{width:window.innerWidth,height:window.innerHeight});u?.discard(),u=Z().tempTransaction(({stateEditors:m})=>{m.studio.historic.panelPositions.setPanelPosition({position:g,panelId:c.panelId})})},onDragEnd(p){d(),p?u?.commit():u?.discard()}}},lockCSSCursorTo:"move"});return{debugName:"FocusRangeZone",onDragStart(u){let[c,d]=u.shiftKey?["creating",i().onDragStart(u)]:["moving-panel",l().onDragStart(u)];return o(c),d===!1?!1:{onDrag(p,h,b,g,m){d.onDrag(p,h,b,g,m)},onDragEnd(p){var h;o("none"),(h=d.onDragEnd)==null||h.call(d,p)}}}}},[e,t])}var zi,mo,AF,BF,zF,qF,ule=w(()=>{zi=ge.requireDist(),_e(),Pe(),Nl(),qi(),un(),Ct(),ale(),wB(),Ze(),Qt(),mo=V(H()),fe(),PF(),lle(),da(),BF=C.div(AF||(AF=j([`
  position: absolute;
  height: `,`px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  /* Use the "grab" cursor if the shift key is up, which is the one used on the top strip of the sequence editor */
  cursor: `,`;
`])),()=>go,e=>e.isShiftDown?"ew-resize":"move"),zF=({layoutP:e})=>{let[t,n]=$e(null),o=Ll(),i=(0,mo.useRef)(o);i.current=o;let l=(0,mo.useMemo)(()=>(0,zi.prism)(()=>{let{projectId:d,sheetId:p}=(0,zi.val)(e.sheet).address;return(0,zi.val)(Z().atomP.ahistoric.projects.stateByProjectId[d].stateBySheetId[p].sequence.focusRange)}),[e]);pt(n,sle(e,i));let u=xB("Shift"),c=ole(n);return(0,mo.useEffect)(()=>{if(!u&&c)return i.current.addBoundsHighlightLock()},[!u&&c]),Ne(()=>mo.default.createElement(BF,{ref:t,isShiftDown:u},mo.default.createElement(EF,{layoutP:e}),mo.default.createElement(ex,{thumbType:"start",layoutP:e}),mo.default.createElement(ex,{thumbType:"end",layoutP:e})),[e,l,u])},qF=zF}),gs,go,Pc,MF,RF,FF,LF,qi=w(()=>{_e(),gs=V(H()),fe(),kF(),Rt(),tt(),ule(),go=30,Pc={backgroundColor:"#1f2120eb",borderColor:"#1c1e21"},RF=C.div(MF||(MF=j([`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: `,`px;
  box-sizing: border-box;
  background: `,`;
  border-bottom: 1px solid `,`;
  z-index: -10;
  `,`;
`])),go,Pc.backgroundColor,Pc.borderColor,Qe),FF=({layoutP:e})=>{let t=Me(e.rightDims.width);return gs.default.createElement(gs.default.Fragment,null,gs.default.createElement(RF,F({},uo("hide")),gs.default.createElement(xF,{layoutP:e,width:t,height:go}),gs.default.createElement(qF,{layoutP:e})))},LF=FF}),Mi,NF,VF,KF,UF,HF,$F,WF,GF,cle=w(()=>{Mi=V(H()),fe(),_e(),Pe(),Ju(),Ao(),NF=e=>isFinite(e)&&e>0,KF=C.div(VF||(VF=j([`
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  height: 28px;
  align-items: center;
`]))),HF=C.div(UF||(UF=j([`
  `,`;
  white-space: nowrap;
`])),Tr),$F=({deltaX:e})=>e*.25,WF=({layoutP:e})=>{let t=Me(e.sheet),n=(0,Mi.useMemo)(()=>{let i;return{temporarilySetValue(l){i&&(i.discard(),i=void 0),i=Z().tempTransaction(({stateEditors:u})=>{u.coreByProject.historic.sheetsById.sequence.setLength(ne(F({},t.address),{length:l}))})},discardTemporaryValue(){i&&(i.discard(),i=void 0)},permanentlySetValue(l){i&&(i.discard(),i=void 0),Z().transaction(({stateEditors:u})=>{u.coreByProject.historic.sheetsById.sequence.setLength(ne(F({},t.address),{length:l}))})}}},[e,t]),o=(0,Mi.useRef)(null);return(0,Mi.useLayoutEffect)(()=>{o.current.focus()},[]),Ne(()=>{let i=t.getSequence().length;return Mi.default.createElement(KF,null,Mi.default.createElement(HF,null,"Sequence length"),Mi.default.createElement(Yl,ne(F({value:i},n),{isValid:NF,inputRef:o,nudge:$F})))},[t,n,o])},GF=WF});function dle(e,t){let n=(0,qn.useRef)(t);n.current=t;let o=(0,qn.useMemo)(()=>({debugName:"LengthIndicator/useDragBulge",lockCSSCursorTo:"ew-resize",onDragStart(l){let u,c=n.current,d=(0,Ri.val)(n.current.layoutP.sheet),p=d.getSequence().length,h=(0,Ri.val)(c.layoutP.scaledSpace.toUnitSpace);return{onDrag(b,g,m){let y=h(b);u&&(u.discard(),u=void 0),u=Z().tempTransaction(({stateEditors:x})=>{x.coreByProject.historic.sheetsById.sequence.setLength(ne(F({},d.address),{length:p+y}))})},onDragEnd(b){b?u&&u.commit():u&&u.discard()}}}}),[]),[i]=pt(e,o);return so(i,-1),[i]}var Ri,qn,tx,Ic,YF,ja,QF,XF,JF,ZF,e9,t9,n9,r9,o9,a9,i9,fle=w(()=>{_e(),Ri=ge.requireDist(),qn=V(H()),fe(),vo(),qi(),Ze(),Ct(),Pe(),Ar(),Rt(),Wu(),cle(),tt(),Br(),tx=1e3,Ic={stripNormal:"#0000006c",stripActive:"#000000"},ja=C.div(YF||(YF=j([`
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  z-index: `,`;
  pointer-events: none;

  &:after {
    display: block;
    content: ' ';
    position: absolute;
    /* top: `,`px; */
    top: 0;
    bottom: 0;
    left: -1px;
    width: 1px;
    background-color: `,`;
  }

  &:hover:after,
  &.dragging:after {
    background-color: `,`;
  }
`])),()=>Kr.lengthIndicatorStrip,go,Ic.stripNormal,Ic.stripActive),XF=C.div(QF||(QF=j([`
  position: absolute;
  top: `,`px;
  width: 100px;
  left: -50px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`])),go-15),ZF=C.div(JF||(JF=j([`
  margin-top: 8px;
  font-size: 10px;
  white-space: nowrap;
  padding: 2px 8px;
  border-radius: 2px;
  `,`;
  cursor: ew-resize;
  color: #464646;
  background-color: #0000004d;
  display: none;

  `,":hover &, ",`.dragging & {
    display: block;
    color: white;
    background-color: `,`;
  }
`])),Qe,ja,ja,Ic.stripActive),t9=C.div(e9||(e9=j([`
  font-size: 10px;
  white-space: nowrap;
  padding: 1px 2px;
  border-radius: 2px;
  `,`;
  justify-content: center;
  align-items: center;
  cursor: ew-resize;
  color: #5d5d5d;
  background-color: #191919;

  `,":hover &, ",`.dragging & {
    color: white;
    background-color: `,`;

    & > svg:first-child {
      margin-right: -1px;
    }
  }

  & > svg:first-child {
    margin-right: -4px;
  }
`])),Qe,ja,ja,Ic.stripActive),r9=C.div(n9||(n9=j([`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(23 23 23 / 43%);
  width: `,`px;
  z-index: `,`;
  transform-origin: left top;

  `,".dragging ~ &, ",`:hover ~ & {
    background-color: rgb(23 23 23 / 60%);
  }
`])),tx,()=>Kr.lengthIndicatorCover,ja,ja),o9=-1e4,a9=({layoutP:e})=>{let[t,n]=$e(null),[o]=dle(n,{layoutP:e}),{node:i,toggle:l,close:u}=Tn({debugName:"LengthIndicator"},()=>qn.default.createElement(An,null,qn.default.createElement(GF,{layoutP:e,onRequestClose:u})));return Ne(()=>{let c=(0,Ri.val)(e.sheet),d=(0,Ri.val)(e.rightDims.height),p=c.getSequence(),h=p.length,b=h,g=(0,Ri.val)(e.clippedSpace.fromUnitSpace)(b),m=(0,Ri.val)(e.clippedSpace.width),y,x;return g>m?(x=0,y=0):(g<0&&(g=0),x=g,y=(m-g)/tx),qn.default.createElement(qn.default.Fragment,null,i,qn.default.createElement(ja,{style:{height:d+"px",transform:"translateX(".concat(x===0?o9:x,"px)")},className:o?"dragging":""},qn.default.createElement(XF,null,qn.default.createElement(t9,F({ref:t,onClick:S=>{l(S,n)}},uo("hide")),qn.default.createElement(Dre,null),qn.default.createElement(Tre,null)),qn.default.createElement(ZF,null,"Sequence length:"," ",p.positionFormatter.formatBasic(h)))),qn.default.createElement(r9,{title:"Length",style:{height:d+"px",transform:"translateX(".concat(x,"px) scale(").concat(y,", 1)")}}))},[e,t,o,i])},i9=a9}),nx,Ko,l9,s9,u9,c9,d9,f9,p9,h9,ple=w(()=>{_e(),nx=ge.requireDist(),Ko=V(H()),fe(),kF(),vo(),qi(),Rt(),s9=C.div(l9||(l9=j([`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0px;
`]))),c9=C.div(u9||(u9=j([`
  position: absolute;
  top: 16px;
  font-size: `,`;
  color: `,`;
  text-align: center;
  transform: translateX(-50%);
  background: `,`;
  padding: 1px 8px;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  z-index: `,`;
`])),Bi.stampFontSize,Bi.fullUnitStampColor,Pc.backgroundColor,()=>Kr.currentFrameStamp),f9=C.div(d9||(d9=j([`
  position: absolute;
  top: 5px;
  left: -0px;
  bottom: 0;
  width: 0.5px;
  background: rgba(100, 100, 100, 0.2);
  pointer-events: none;
`]))),p9=Ko.default.memo(({layoutP:e})=>{let[t,n]=Me(UB()),o=Me(e.clippedSpace.fromUnitSpace),{sequence:i,formatter:l,clippedSpaceWidth:u}=Ne(()=>{let h=(0,nx.val)(e.sheet).getSequence(),b=(0,nx.val)(e.clippedSpace.width);return{sequence:h,formatter:h.positionFormatter,clippedSpaceWidth:b}},[e]);if(t==-1)return Ko.default.createElement(Ko.default.Fragment,null);let c=n===3?i.closestGridPosition(t):t,d=o(c),p=d>=0&&d<=u;return Ko.default.createElement(Ko.default.Fragment,null,Ko.default.createElement(s9,null,Ko.default.createElement(c9,{style:{opacity:p?1:0,transform:"translate3d(calc(".concat(d,"px - 50%), 0, 0)")}},l.formatForPlayhead(c)),Ko.default.createElement(f9,{posType:n,style:{opacity:p?1:0,transform:"translate3d(".concat(d,"px, 0, 0)")}}))," ")}),h9=p9}),fr,xt,m9,g9,v9,b9,y9,jh,x9,rx,k9,Ch,w9,Oh,S9,ox,E9,ax,P9,I9,hle=w(()=>{_e(),fr=ge.requireDist(),u5(),Ir(),xt=V(H()),fe(),vo(),Rt(),tt(),Ct(),g9=C.div(m9||(m9=j([`
  --threadHeight: 20px;
  --bg-inactive: #32353b;
  --bg-active: #5b5c5d;
  position: absolute;
  height: 0;
  width: 100%;
  left: 12px;
  /* bottom: 8px; */
  z-index: `,`;
  `,`
`])),()=>Kr.horizontalScrollbar,Qe),b9=C.div(v9||(v9=j([`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--threadHeight);
`]))),jh=C.div(y9||(y9=j([`
  position: absolute;
  height: 20px;
  background: var(--bg-inactive);
  cursor: ew-resize;
  z-index: 2;

  &:hover,
  &:active {
    background: var(--bg-active);
  }

  &:after {
    `,`;
    display: block;
    content: ' ';
  }
`])),Rv("absolute","-4px")),rx=C.div(x9||(x9=j([`
  position: absolute;
  height: 20px;
  width: 7px;
  left: 0;
  z-index: 2;
  top: 0;
  bottom: 0;
  display: block;

  &:hover:before {
    background: var(--bg-active);
  }

  &:before {
    `,`;
    display: block;
    content: ' ';
    background: var(--bg-inactive);
    border-radius: 0 2px 2px 0;
  }

  &:after {
    `,`;
    display: block;
    content: ' ';
  }
`])),Rv("absolute","0"),Rv("absolute","-4px")),Ch=C(rx)(k9||(k9=j([`
  left: calc(-1 * 7px);
  cursor: w-resize;
  &:before {
    transform: scaleX(-1);
  }
`]))),Oh=C(rx)(w9||(w9=j([`
  cursor: e-resize;
  left: 0px;
`]))),ox=C.div(S9||(S9=j([`
  display: `,`;
  position: absolute;
  top: -20px;
  left: 4px;
  padding: 0 4px;
  transform: translateX(-50%);
  background: #131d1f;
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;

  `,`:hover &,
  `,`:hover &,
  `,":hover ~ ",` &,
  `,":hover ~ ",` & {
    display: block;
  }
`])),e=>e.active?"block":"none",Ch,Oh,jh,Ch,jh,Oh),ax=C.input(E9||(E9=j([`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  width: 40px;
  outline: none;

  &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
`]))),P9=({layoutP:e})=>{let t=(0,xt.useCallback)(_=>_.toFixed(2),[]),n=(0,xt.useMemo)(()=>(0,fr.prism)(()=>{let _=(0,fr.val)(e.rightDims.width)-25,L=(0,fr.val)(e.clippedSpace.range),U=(0,fr.val)(e.sheet).getSequence().length,N=Math.max(L.end,U),se=L.start/N*_,K=L.end/N*_;return{rightWidth:_,clippedSpaceRange:L,sequenceLength:U,assumedLengthOfSequence:N,rangeStartX:se,rangeEndX:K,bottom:(0,fr.val)(e.horizontalScrollbarDims.bottom)}}),[e]),{rangeStartX:o,rangeEndX:i,clippedSpaceRange:l,bottom:u}=Me(n),[c,d]=(0,xt.useState)("nothing"),[p,h]=(0,xt.useState)(!1),[b,g]=(0,xt.useState)(!1),[m,y]=(0,xt.useState)(""),[x,S]=(0,xt.useState)(""),E=(0,xt.useMemo)(()=>{let _=(L,U)=>{let N=Math.max(0,Math.min(L,U-.01)),se=Math.max(L+.01,U);(0,fr.val)(e.clippedSpace.setRange)({start:N,end:se})};return{onStartInputClick:L=>{L.stopPropagation(),h(!0),y(t(l.start))},onEndInputClick:L=>{L.stopPropagation(),g(!0),S(t(l.end))},onStartInputChange:L=>{y(L.target.value)},onEndInputChange:L=>{S(L.target.value)},onStartInputKeyDown:L=>{if(L.key==="Enter"){let U=parseFloat(m);isNaN(U)||_(U,l.end),h(!1)}else L.key==="Escape"&&h(!1)},onEndInputKeyDown:L=>{if(L.key==="Enter"){let U=parseFloat(x);isNaN(U)||_(l.start,U),g(!1)}else L.key==="Escape"&&g(!1)},onStartInputBlur:()=>{let L=parseFloat(m);isNaN(L)||_(L,l.end),h(!1)},onEndInputBlur:()=>{let L=parseFloat(x);isNaN(L)||_(l.start,L),g(!1)}}},[e,n,l,m,x,t]),P=(0,xt.useMemo)(()=>{let _=(0,fr.val)(n),L=()=>{_=(0,fr.val)(n)},U=N=>N/_.rightWidth*_.assumedLengthOfSequence;return{onRangeDragStart(){return L(),{onDrag(N){d("both");let se=U(N),K=oi(_.clippedSpaceRange,ce=>ce+se);(0,fr.val)(e.clippedSpace.setRange)(K)},onDragEnd(){d("nothing")}}},onRangeStartDragStart(){return L(),{onDrag(N){d("start");let se=U(N),K={start:_.clippedSpaceRange.start+se,end:_.clippedSpaceRange.end};K.start>K.end-1&&(K.start=K.end-1),K.start<=0&&(K.start=0),(0,fr.val)(e.clippedSpace.setRange)(K)},onDragEnd(){d("nothing")}}},onRangeEndDragStart(){return L(),{onDrag(N){d("end");let se=U(N),K={start:_.clippedSpaceRange.start,end:_.clippedSpaceRange.end+se};K.end<K.start+1&&(K.end=K.start+1),K.end>=_.assumedLengthOfSequence&&(K.end=_.assumedLengthOfSequence),(0,fr.val)(e.clippedSpace.setRange)(K)},onDragEnd(){d("nothing")}}}}},[e,n]),[O,z]=(0,xt.useState)(null);pt(O,{debugName:"HorizontalScrollbar/onRangeDrag",onDragStart:P.onRangeDragStart,lockCSSCursorTo:"ew-resize"});let[B,D]=(0,xt.useState)(null);pt(B,{debugName:"HorizontalScrollbar/onRangeStartDrag",onDragStart:P.onRangeStartDragStart,lockCSSCursorTo:"w-resize"});let[X,M]=(0,xt.useState)(null);return pt(X,{debugName:"HorizontalScrollbar/onRangeEndDrag",onDragStart:P.onRangeEndDragStart,lockCSSCursorTo:"e-resize"}),xt.default.createElement(g9,F({style:{bottom:u+23+"px"}},uo("hide")),xt.default.createElement(b9,null,xt.default.createElement(jh,{ref:z,style:{width:"".concat(i-o,"px"),transform:"translate3d(".concat(o,"px, 0, 0)")}}),xt.default.createElement(Ch,{ref:D,style:{transform:"translate3d(".concat(o,"px, 0, 0)")}},xt.default.createElement(ox,{active:c==="both"||c==="start"||p},p?xt.default.createElement(ax,{value:m,onChange:E.onStartInputChange,onKeyDown:E.onStartInputKeyDown,onBlur:E.onStartInputBlur,autoFocus:!0}):xt.default.createElement("span",{onClick:E.onStartInputClick},t(l.start)))),xt.default.createElement(Oh,{ref:M,style:{transform:"translate3d(".concat(i,"px, 0, 0)")}},xt.default.createElement(ox,{active:c==="both"||c==="end"||b},b?xt.default.createElement(ax,{value:x,onChange:E.onEndInputChange,onKeyDown:E.onEndInputKeyDown,onBlur:E.onEndInputBlur,autoFocus:!0}):xt.default.createElement("span",{onClick:E.onEndInputClick},t(l.end))))))},I9=P9}),j9,C9,O9,_9,D9,mle=w(()=>{j9=V(H()),fe(),O9=C.div(C9||(C9=j([`
  position: absolute;
  inset: `,`px;
`])),e=>e.room*-1),_9=e=>j9.default.createElement(O9,{room:e.room}),D9=_9}),_h,Dh,ix,T9,A9,B9,z9,q9,M9,R9,F9,gle=w(()=>{fe(),_e(),Ju(),Ao(),_h=V(H()),Dh=V(H()),ix=ge.requireDist(),wu(),T9=e=>isFinite(e)&&e>=0,B9=C.div(A9||(A9=j([`
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  height: 28px;
  align-items: center;
`]))),q9=C.div(z9||(z9=j([`
  `,`;
  white-space: nowrap;
`])),Tr),M9=({deltaX:e})=>e*.25,R9=({layoutP:e,onRequestClose:t})=>{let n=(0,ix.val)(e.sheet),o=n.getSequence(),i=(0,_h.useMemo)(()=>{let u,c=o.position;return{temporarilySetValue(d){u&&(u=void 0),u=at(d,0,o.length),o.position=u},discardTemporaryValue(){u&&(u=void 0,o.position=c,t("discardTemporaryValue"))},permanentlySetValue(d){u&&(u=void 0),o.position=at(d,0,o.length),t("permanentlySetValue")}}},[e,o]),l=(0,_h.useRef)(null);return(0,_h.useLayoutEffect)(()=>{l.current.focus()},[]),Ne(()=>{let u=n.getSequence(),c=Number((0,ix.val)(u.pointer.position).toFixed(3));return Dh.default.createElement(B9,null,Dh.default.createElement(q9,null,"Sequence position"),Dh.default.createElement(Yl,ne(F({value:c},i),{isValid:T9,inputRef:l,nudge:M9})))},[n,i,l])},F9=R9}),L9,vle=w(()=>{L9=typeof navigator<"u"&&navigator.platform.toUpperCase().indexOf("MAC")>=0}),N9,ble=w(()=>{vle(),N9=e=>L9?e.metaKey===!0:e.ctrlKey===!0});function yle(){Th=!1}function xle(){Th=!0}function kle(){let e=Z();(0,V9.useEffect)(()=>{let t=n=>{let o=n.composedPath()[0];if(!(o&&(o.tagName==="INPUT"||o.tagName==="TEXTAREA"))){if(n.key==="z"||n.key==="Z"||n.code==="KeyZ")if(N9(n))n.shiftKey===!0?e.redo():e.undo();else return;else if(n.code==="Space"&&!n.shiftKey&&!n.metaKey&&!n.altKey&&!n.ctrlKey){if(!Th)return;let i=Qne();if(i)if(i.playing)i.pause();else{let{projectId:l,sheetId:u}=i.address,c=(0,Nr.prism)(()=>{let h=(0,Nr.val)(Z().atomP.ahistoric.projects.stateByProjectId[l].stateBySheetId[u].sequence.focusRange);return Nr.prism.memo("shouldFollowFocusRange",()=>{let b=i.position;if(h){let g=b>=h.range.start&&b<=h.range.end;return h.enabled?!!g:!0}else return!0},[])&&h&&h.enabled?{range:[h.range.start,h.range.end],isFollowingARange:!0}:{range:[0,(0,Nr.val)(i.pointer.length)],isFollowingARange:!1}}),d=i.playDynamicRange((0,Nr.prism)(()=>(0,Nr.val)(c).range),Z().ticker),p=lx(i);d.finally(()=>{p.set(void 0)}),p.set(c)}else return}else if(n.altKey&&(n.key==="\\"||n.code==="Backslash"||n.code==="IntlBackslash"))e.transaction(({stateEditors:i,drafts:l})=>{i.studio.ahistoric.setVisibilityState(l.ahistoric.visibilityState==="everythingIsHidden"?"everythingIsVisible":"everythingIsHidden")});else return;n.preventDefault(),n.stopPropagation()}};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[])}var V9,Nr,Th,lx,K9,sx=w(()=>{V9=V(H()),Pe(),ble(),Ml(),Nr=ge.requireDist(),Ey(),Th=!0,lx=kp(e=>new Nr.Atom(void 0)),K9=kp(e=>(0,Nr.prism)(()=>{let t=lx(e).prism.getValue();if(t)return t.getValue().isFollowingARange;{let{projectId:n,sheetId:o}=e.address,i=(0,Nr.val)(Z().atomP.ahistoric.projects.stateByProjectId[n].stateBySheetId[o].sequence.focusRange);if(!i||!i.enabled)return!1;let l=(0,Nr.val)(e.pointer.position);return l>=i.range.start&&l<=i.range.end}}))});function wle(e,t){return fn(e,{menuItems(){return[{label:"Place marker",callback:()=>{Z().transaction(({stateEditors:n})=>{let o=(0,pr.val)(t.layoutP.sheet),i=o.getSequence();n.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceMarkers({sheetAddress:o.address,markers:[{id:uD(),position:i.position}],snappingFunction:i.closestGridPosition})})}},{label:"Place event",callback:()=>{Z().transaction(({stateEditors:n})=>{let o=(0,pr.val)(t.layoutP.sheet),i=o.getSequence();n.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceEvents({sheetAddress:o.address,events:[{id:cD(),name:"event",position:i.position}]})})}},{label:"Attach audio",callback:()=>{let n=new CustomEvent("theatre:attachAudio",{detail:{sheet:(0,pr.val)(t.layoutP.sheet)}});document.dispatchEvent(n)}}]}})}var pr,hr,U9,Fi,H9,$9,W9,ux,G9,Y9,Q9,X9,J9,Z9,Sle=w(()=>{mle(),Ct(),Ze(),_e(),pr=ge.requireDist(),wu(),hr=V(H()),fe(),vo(),Rt(),tt(),Ar(),Br(),gle(),sx(),un(),pn(),Pe(),Dr(),Fr(),ls(),Fi=C.div(U9||(U9=j([`
  --thumbColor: #00e0ff;
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  z-index: `,`;
  pointer-events: none;

  display: `,`;
`])),()=>Kr.playhead,e=>e.isVisible?"block":"none"),$9=C.div(H9||(H9=j([`
  position: absolute;
  top: 30px;
  width: 0;
  height: calc(100% - 30px);
  border-left: 1px solid #27e0fd;
  z-index: 10;
  pointer-events: none;

  #pointer-root.draggingPositionInSequenceEditor &:not(.seeking) {
    /* pointer-events: auto; */
    /* cursor: var(`,`); */

    &:after {
      position: absolute;
      inset: -8px;
      display: block;
      content: ' ';
    }
  }
`])),Cr),ux=C.div(W9||(W9=j([`
  background-color: var(--thumbColor);
  position: absolute;
  width: 5px;
  height: 34px;
  top: -4px;
  left: -2px;
  z-index: 11;
  cursor: ew-resize;
  --sunblock-color: #1f2b2b;

  `,`;

  `,`.seeking > & {
    pointer-events: none !important;
  }

  #pointer-root.draggingPositionInSequenceEditor
    `,`:not(.seeking)
    > & {
    pointer-events: auto;
    cursor: var(`,`);
  }

  `,`.playheadattachedtofocusrange > & {
    top: -8px;
    --sunblock-color: #005662;
    &:before,
    &:after {
      border-bottom-width: 8px;
    }
  }

  &:before {
    position: absolute;
    display: block;
    content: ' ';
    left: -2px;
    width: 0;
    height: 0;
    border-bottom: 4px solid var(--sunblock-color);
    border-left: 2px solid transparent;
  }

  &:after {
    position: absolute;
    display: block;
    content: ' ';
    right: -2px;
    width: 0;
    height: 0;
    border-bottom: 4px solid var(--sunblock-color);
    border-right: 2px solid transparent;
  }
`])),Qe,Fi,Fi,Cr,Fi),Y9=C.div(G9||(G9=j([`
  position: absolute;
  left: 1px;
  right: 1px;
  top: 35px;
  border-top: 3px solid var(--thumbColor);
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  pointer-events: none;

  /* `,`.playheadattachedtofocusrange & {
    top: 10px;
    &:before,
    &:after {
      height: 15px;
    }
  } */

  &:before {
    position: absolute;
    display: block;
    content: ' ';
    top: -4px;
    left: -2px;
    height: 8px;
    width: 2px;
    background: none;
    border-radius: 0 100% 0 0;
    border-top: 1px solid var(--thumbColor);
    border-right: 1px solid var(--thumbColor);
  }

  &:after {
    position: absolute;
    display: block;
    content: ' ';
    top: -4px;
    right: -2px;
    height: 8px;
    width: 2px;
    background: none;
    border-radius: 100% 0 0 0;
    border-top: 1px solid var(--thumbColor);
    border-left: 1px solid var(--thumbColor);
  }
`])),Fi),X9=C.div(Q9||(Q9=j([`
  display: none;
  position: absolute;
  top: -20px;
  left: 4px;
  padding: 0 2px;
  transform: translateX(-50%);
  background: #1a1a1a;
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  `,":hover &, ",`.seeking & {
    display: block;
  }
`])),ux,Fi),J9=({layoutP:e})=>{let[t,n]=$e(null),{node:o,toggle:i,close:l}=Tn({debugName:"Playhead"},()=>hr.default.createElement(An,null,hr.default.createElement(F9,{layoutP:e,onRequestClose:l}))),u=(0,hr.useMemo)(()=>({debugName:"RightOverlay/Playhead",onDragStart(){let p=(0,pr.val)(e.sheet).getSequence(),h=p.position,b=(0,pr.val)(e.scaledSpace.toUnitSpace),g=(0,pr.val)(e.seeker.setIsSeeking);return g(!0),Np(),{onDrag(m,y,x){var S;let E=b(m);p.position=(S=hn.checkIfMouseEventSnapToPos(x,{ignore:n}))!=null?S:at(h+E,0,p.length)},onDragEnd(m){g(!1),is()},onClick(m){i(m,t.current)}}}}),[e,n]),[c]=pt(n,u);Dn(c,"draggingPositionInSequenceEditor","ew-resize"),so(Me(e.seeker.isSeeking)||c,-1);let[d]=wle(n,{layoutP:e});return Ne(()=>{let p=(0,pr.val)(e.seeker.isSeeking),h=(0,pr.val)(e.sheet).getSequence(),b=(0,pr.val)(K9(h)),g=h.positionPrism.getValue(),m=(0,pr.val)(e.clippedSpace.fromUnitSpace)(g),y=m>=0&&m<=(0,pr.val)(e.clippedSpace.width);return hr.default.createElement(hr.default.Fragment,null,d,o,hr.default.createElement(Fi,F({isVisible:y,style:{transform:"translate3d(".concat(m,"px, 0, 0)")},className:"".concat(p&&"seeking"," ").concat(b&&"playheadattachedtofocusrange")},uo("hide")),hr.default.createElement(ux,F({ref:t},hn.includePositionSnapAttrs(g)),hr.default.createElement(D9,{room:8}),hr.default.createElement(Y9,null),hr.default.createElement(X9,null,h.positionFormatter.formatForPlayhead(h.closestGridPosition(g)))),hr.default.createElement($9,ne(F({},hn.includePositionSnapAttrs(g)),{className:p?"seeking":""}))))},[e,t,o])},Z9=J9}),Li,jc,Ah,eL,tL,nL,rL,Ele=w(()=>{Li=ge.requireDist(),_e(),Pe(),qi(),jc=V(H()),fe(),Ah=1e3,tL=C.div(eL||(eL=j([`
  position: absolute;
  top: `,`px;
  left: 0;
  opacity: 0.15;
  width: `,`px;
  transform-origin: top left;
  pointer-events: none;
  background-color: `,`;
`])),go,Ah,e=>e.enabled?"#000000":"transparent"),nL=({layoutP:e})=>{let t=(0,jc.useMemo)(()=>(0,Li.prism)(()=>{let{projectId:n,sheetId:o}=(0,Li.val)(e.sheet).address;return(0,Li.val)(Z().atomP.ahistoric.projects.stateByProjectId[n].stateBySheetId[o].sequence.focusRange)}),[e]);return Ne(()=>{let n=t.getValue();if(!n||!n.enabled)return null;let{range:o}=n,i=(0,Li.val)(e.rightDims.height)-go,l=(0,Li.val)(e.clippedSpace.fromUnitSpace),u=(0,Li.val)(e.clippedSpace.width),c=[];{let d=0,p=l(n.range.start),h,b;d>p?(b=0,h=0):(p>u&&(p=u),b=d,h=(p-d)/Ah),c.push({translateX:b,scaleX:h})}{let d=l(n.range.end),p=u,h,b;d>p?(b=0,h=0):(d<0&&(d=0),b=d,h=(p-d)/Ah),c.push({translateX:b,scaleX:h})}return jc.default.createElement(jc.default.Fragment,null,c.map(({translateX:d,scaleX:p},h)=>jc.default.createElement(tL,{key:"curtain-".concat(h),enabled:!0,style:{height:"".concat(i,"px"),transform:"translateX(".concat(d,"px) scaleX(").concat(p,")")}})))},[e,t])},rL=nL}),vs,oL,aL,iL,lL,sL,Ple=w(()=>{vs=V(H()),fe(),_e(),Pe(),Ao(),Ql(),aL=C.div(oL||(oL=j([`
  display: flex;
  gap: 8px;
  /* padding: 4px 8px; */
  height: 28px;
  align-items: center;
`]))),C.div(iL||(iL=j([`
  `,`;
  white-space: nowrap;
`])),Tr),lL=({layoutP:e,marker:t})=>{var n;let o=Me(e.sheet),i=(0,vs.useMemo)(()=>{let u;return{temporarilySetValue(c){u&&(u.discard(),u=void 0),u=Z().tempTransaction(({stateEditors:d})=>{d.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateMarker({sheetAddress:o.address,markerId:t.id,label:c})})},discardTemporaryValue(){u&&(u.discard(),u=void 0)},permanentlySetValue(c){u&&(u.discard(),u=void 0),Z().transaction(({stateEditors:d})=>{d.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateMarker({sheetAddress:o.address,markerId:t.id,label:c})})}}},[e,o]),l=(0,vs.useRef)(null);return(0,vs.useLayoutEffect)(()=>{l.current.focus()},[]),vs.default.createElement(aL,null,vs.default.createElement(fa,ne(F({value:(n=t.label)!=null?n:""},i),{isValid:()=>!0,inputRef:l})))},sL=lL});function Ile(e,t){return fn(e,{menuItems(){return[{label:"Remove marker",callback:()=>{Z().transaction(({stateEditors:n})=>{n.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removeMarker({sheetAddress:t.sheetAddress,markerId:t.markerId})})}}]}})}function jle(e,t){let n=(0,Pn.useRef)(t);n.current=t;let o=(0,Pn.useMemo)(()=>({debugName:"MarkerDot/useDragMarker (".concat(t.marker.id,")"),onDragStart(l){let u=n.current.marker,c=(0,Bh.val)(t.layoutP.scaledSpace.toUnitSpace),d;return Np(),{onDrag(p,h,b){var g;let m=u,y=Math.max((g=hn.checkIfMouseEventSnapToPos(b,{ignore:e}))!=null?g:m.position+c(p),0);d?.discard(),d=Z().tempTransaction(({stateEditors:x})=>{x.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceMarkers({sheetAddress:(0,Bh.val)(t.layoutP.sheet.address),markers:[ne(F({},m),{position:y})],snappingFunction:(0,Bh.val)(t.layoutP.sheet).getSequence().closestGridPosition})})},onDragEnd(p){p?d?.commit():d?.discard(),is()}}}}),[]),[i]=pt(e,o);return so(i,t.marker.position),Dn(i,"draggingPositionInSequenceEditor draggingMarker","ew-resize"),[i]}var Bh,Pn,cx,dx,uL,cL,dL,fL,pL,zh,hL,mL,gL,vL,bL,yL,Cle=w(()=>{Bh=ge.requireDist(),_e(),Pe(),un(),pn(),Ze(),Pn=V(H()),fe(),Rt(),Ct(),vo(),Fr(),Rp(),Xy(),ls(),Ar(),Br(),Ple(),cx=12,dx=12,uL=cx*2,cL=dx*2,fL=C.div(dL||(dL=j([`
  position: absolute;
  // below the sequence ruler "top bar"
  top: 30px;
  z-index: `,`;
`])),()=>Kr.marker),zh=C.div(pL||(pL=j([`
  position: absolute;
  `,`
  pointer-events: none;
`])),Lr(cx,dx)),hL=Pn.default.memo(()=>Pn.default.createElement(zh,{children:Pn.default.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Pn.default.createElement("path",{d:"M12 5H0V7H2.71973L5.96237 10.2426L9.20501 7H12V5Z",fill:"#40AAA4"}))})),gL=C.div(mL||(mL=j([`
  z-index: 1;
  cursor: ew-resize;

  `,`

  // :not dragging marker to ensure that markers don't snap to other markers
  // this works because only one marker track (so this technique is not used by keyframes...)
  #pointer-root.draggingPositionInSequenceEditor:not(.draggingMarker) & {
    `,`
  }

  // "All instances of this component <Mark/> inside #pointer-root when it has the .draggingPositionInSequenceEditor class"
  // ref: https://styled-components.com/docs/basics#pseudoelements-pseudoselectors-and-nesting
  #pointer-root.draggingPositionInSequenceEditor:not(.draggingMarker) &,
  #pointer-root.draggingPositionInSequenceEditor
    &.`,` {
    pointer-events: auto;
    cursor: var(`,`);
  }

  &:hover
    + `,`,
    // notice , "or" in CSS
    &.`,`
    + `,` {
    `,`
  }
`])),En.CSS,En.CSS_WHEN_SOMETHING_DRAGGING,En.BEING_DRAGGED_CLASS,Cr,zh,En.BEING_DRAGGED_CLASS,zh,Lr(uL,cL)),vL=({layoutP:e,markerId:t})=>{let n=Me(e.sheet.address),o=Me(Z().atomP.historic.projects.stateByProjectId[n.projectId].stateBySheetId[n.sheetId].sequenceEditor.markerSet.byId[t]);if(!o)return null;let i=Me(e.clippedSpace.width),l=Me(e.clippedSpace.fromUnitSpace)(o.position),u=l<=0||l>i,c=u?-1e4:l,d=u?0:1;return Pn.default.createElement(fL,{style:{transform:"translateX(".concat(c,"px) scale(").concat(d,")")}},Pn.default.createElement(yL,{marker:o,layoutP:e}))},bL=vL,yL=({layoutP:e,marker:t})=>{let n=Me(e.sheet.address),[o,i]=$e(null),[l]=Ile(i,{sheetAddress:n,markerId:t.id}),[u]=jle(i,{layoutP:e,marker:t}),{node:c,toggle:d,close:p}=Tn({debugName:"MarkerPopover"},()=>Pn.default.createElement(An,null,Pn.default.createElement(sL,{marker:t,layoutP:e,onRequestClose:p})));return Pn.default.createElement(Pn.default.Fragment,null,l,c,Pn.default.createElement(gL,F({title:t.label?"Marker: ".concat(t.label):"Marker",ref:o,onClick:h=>{d(h,o.current)}},En.reactProps({isDragging:u,position:t.position}))),Pn.default.createElement(hL,null))}}),qh,xL,kL,Ole=w(()=>{_e(),Pe(),qh=V(H()),Cle(),xL=({layoutP:e})=>{let t=Me(e.sheet.address),n=Z().atomP.historic.projects.stateByProjectId[t.projectId].stateBySheetId[t.sheetId].sequenceEditor.markerSet,o=Me(n.allIds);return qh.default.createElement(qh.default.Fragment,null,o&&Object.keys(o).map(i=>qh.default.createElement(bL,{key:i,layoutP:e,markerId:i})))},kL=xL}),tn,wL,SL,EL,Mh,PL,Rh,IL,jL,_le=w(()=>{tn=V(H()),fe(),_e(),Pe(),Ao(),Ql(),Ju(),SL=C.div(wL||(wL=j([`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  min-width: 200px;
`]))),Mh=C.div(EL||(EL=j([`
  display: flex;
  gap: 8px;
  height: 28px;
  align-items: center;
`]))),Rh=C.div(PL||(PL=j([`
  `,`;
  white-space: nowrap;
  min-width: 60px;
`])),Tr),IL=({layoutP:e,event:t})=>{var n;let o=Me(e.sheet),i=(0,tn.useMemo)(()=>{let p;return{temporarilySetValue(h){p&&(p.discard(),p=void 0),p=Z().tempTransaction(({stateEditors:b})=>{b.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateEvent({sheetAddress:o.address,eventId:t.id,name:h,value:t.value})})},discardTemporaryValue(){p&&(p.discard(),p=void 0)},permanentlySetValue(h){p&&(p.discard(),p=void 0),Z().transaction(({stateEditors:b})=>{b.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateEvent({sheetAddress:o.address,eventId:t.id,name:h,value:t.value})})}}},[e,o,t]),l=(0,tn.useMemo)(()=>{let p;return{temporarilySetValue(h){p&&(p.discard(),p=void 0),p=Z().tempTransaction(({stateEditors:b})=>{b.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceEvents({sheetAddress:o.address,events:[ne(F({},t),{position:h})]})})},discardTemporaryValue(){p&&(p.discard(),p=void 0)},permanentlySetValue(h){p&&(p.discard(),p=void 0),Z().transaction(({stateEditors:b})=>{b.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceEvents({sheetAddress:o.address,events:[ne(F({},t),{position:h})]})})}}},[e,o,t]),u=(0,tn.useMemo)(()=>{let p;return{temporarilySetValue(h){p&&(p.discard(),p=void 0);let b=h;try{h.trim()!==""&&(b=JSON.parse(h))}catch{}p=Z().tempTransaction(({stateEditors:g})=>{g.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateEvent({sheetAddress:o.address,eventId:t.id,name:t.name,value:b})})},discardTemporaryValue(){p&&(p.discard(),p=void 0)},permanentlySetValue(h){p&&(p.discard(),p=void 0);let b=h;try{h.trim()!==""&&(b=JSON.parse(h))}catch{}Z().transaction(({stateEditors:g})=>{g.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateEvent({sheetAddress:o.address,eventId:t.id,name:t.name,value:b})})}}},[e,o,t]),c=(0,tn.useRef)(null);(0,tn.useLayoutEffect)(()=>{c.current.focus()},[]);let d=(0,tn.useMemo)(()=>t.value===void 0||t.value===null?"":typeof t.value=="string"?t.value:JSON.stringify(t.value),[t.value]);return tn.default.createElement(SL,null,tn.default.createElement(Mh,null,tn.default.createElement(Rh,null,"Name"),tn.default.createElement(fa,ne(F({value:(n=t.name)!=null?n:""},i),{isValid:()=>!0,inputRef:c}))),tn.default.createElement(Mh,null,tn.default.createElement(Rh,null,"Time"),tn.default.createElement(Yl,ne(F({value:t.position},l),{isValid:()=>!0,nudge:({deltaX:p})=>p*.25}))),tn.default.createElement(Mh,null,tn.default.createElement(Rh,null,"Value"),tn.default.createElement(fa,ne(F({value:d},u),{isValid:()=>!0}))))},jL=IL});function Dle(e,t){return fn(e,{menuItems(){return[{label:"Remove event",callback:()=>{Z().transaction(({stateEditors:n})=>{n.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removeEvent({sheetAddress:t.sheetAddress,eventId:t.eventId})})}}]}})}function Tle(e,t){let n=(0,In.useRef)(t);n.current=t;let o=(0,In.useMemo)(()=>({debugName:"EventDot/useDragEvent (".concat(t.event.id,")"),onDragStart(l){let u=n.current.event,c=(0,fx.val)(t.layoutP.scaledSpace.toUnitSpace),d;return Np(),{onDrag(p,h,b){var g;let m=u,y=Math.max((g=hn.checkIfMouseEventSnapToPos(b,{ignore:e}))!=null?g:m.position+c(p),0);d?.discard(),d=Z().tempTransaction(({stateEditors:x})=>{x.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceEvents({sheetAddress:(0,fx.val)(t.layoutP.sheet.address),events:[ne(F({},m),{position:y})]})})},onDragEnd(p){p?d?.commit():d?.discard(),is()}}}}),[]),[i]=pt(e,o);return so(i,t.event.position),Dn(i,"draggingPositionInSequenceEditor draggingEvent","ew-resize"),[i]}var fx,In,px,hx,CL,OL,_L,DL,TL,Fh,AL,BL,zL,qL,ML,RL,Ale=w(()=>{fx=ge.requireDist(),_e(),Pe(),un(),pn(),Ze(),In=V(H()),fe(),Rt(),Ct(),vo(),Fr(),Rp(),Xy(),ls(),Ar(),Br(),_le(),px=12,hx=12,CL=px*2,OL=hx*2,DL=C.div(_L||(_L=j([`
  position: absolute;
  // below the sequence ruler "top bar"
  top: 15px;
  z-index: `,`;
`])),()=>Kr.marker),Fh=C.div(TL||(TL=j([`
  position: absolute;
  `,`
  pointer-events: none;
`])),Lr(px,hx)),AL=In.default.memo(()=>In.default.createElement(Fh,{children:In.default.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"},In.default.createElement("circle",{cx:"6",cy:"6",r:"5",fill:"#2b86ee",stroke:"#FFFFFF",strokeWidth:"1"}))})),zL=C.div(BL||(BL=j([`
  z-index: 1;
  cursor: ew-resize;

  `,`

  // :not dragging event to ensure that events don't snap to other events
  // this works because only one event track (so this technique is not used by keyframes...)
  #pointer-root.draggingPositionInSequenceEditor:not(.draggingEvent) & {
    `,`
  }

  // "All instances of this component <Event/> inside #pointer-root when it has the .draggingPositionInSequenceEditor class"
  // ref: https://styled-components.com/docs/basics#pseudoelements-pseudoselectors-and-nesting
  #pointer-root.draggingPositionInSequenceEditor:not(.draggingEvent) &,
  #pointer-root.draggingPositionInSequenceEditor
    &.`,` {
    pointer-events: auto;
    cursor: var(`,`);
  }

  &:hover
    + `,`,
    // notice , "or" in CSS
    &.`,`
    + `,` {
    `,`
  }
`])),En.CSS,En.CSS_WHEN_SOMETHING_DRAGGING,En.BEING_DRAGGED_CLASS,Cr,Fh,En.BEING_DRAGGED_CLASS,Fh,Lr(CL,OL)),qL=({layoutP:e,eventId:t})=>{let n=Me(e.sheet.address),o=Me(Z().atomP.historic.projects.stateByProjectId[n.projectId].stateBySheetId[n.sheetId].sequenceEditor.eventSet.byId[t]);if(!o)return null;let i=Me(e.clippedSpace.width),l=Me(e.clippedSpace.fromUnitSpace)(o.position),u=l<=0||l>i,c=u?-1e4:l,d=u?0:1;return In.default.createElement(DL,{style:{transform:"translateX(".concat(c,"px) scale(").concat(d,")")}},In.default.createElement(RL,{event:o,layoutP:e}))},ML=qL,RL=({layoutP:e,event:t})=>{let n=Me(e.sheet.address),[o,i]=$e(null),[l]=Dle(i,{sheetAddress:n,eventId:t.id}),[u]=Tle(i,{layoutP:e,event:t}),{node:c,toggle:d,close:p}=Tn({debugName:"EventPopover"},()=>In.default.createElement(An,null,In.default.createElement(jL,{event:t,layoutP:e,onRequestClose:p})));return In.default.createElement(In.default.Fragment,null,l,c,In.default.createElement(zL,F({title:t.name?"Event: ".concat(t.name):"Event",ref:o,onClick:h=>{d(h,o.current)}},En.reactProps({isDragging:u,position:t.position}))),In.default.createElement(AL,null))}}),Lh,FL,LL,Ble=w(()=>{_e(),Pe(),Lh=V(H()),Ale(),FL=({layoutP:e})=>{let t=Me(e.sheet.address),n=Z().atomP.historic.projects.stateByProjectId[t.projectId].stateBySheetId[t.sheetId].sequenceEditor.eventSet,o=Me(n.allIds);return Lh.default.createElement(Lh.default.Fragment,null,o&&Object.keys(o).map(i=>Lh.default.createElement(ML,{key:i,layoutP:e,eventId:i})))},LL=FL}),NL,Vr,VL,KL,UL,HL,$L,WL,zle=w(()=>{vo(),_e(),NL=ge.requireDist(),Vr=V(H()),fe(),fle(),ple(),hle(),Sle(),qi(),Ele(),Ole(),Ble(),KL=C.div(VL||(VL=j([`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: `,`;
  overflow: visible;
  pointer-events: none;
`])),()=>Kr.rightOverlay),HL=C.div(UL||(UL=j([`
  background: #222;
  position: absolute;
  top: 30px;
  width: 100%;
  height: 30px;
`]))),$L=({layoutP:e})=>Ne(()=>{let t=(0,NL.val)(e.rightDims.width);return Vr.default.createElement(KL,{style:{width:t+"px"}},Vr.default.createElement(Z9,{layoutP:e}),Vr.default.createElement(I9,{layoutP:e}),Vr.default.createElement(h9,{layoutP:e}),Vr.default.createElement(LF,{layoutP:e}),Vr.default.createElement(HL,null,Vr.default.createElement(kL,{layoutP:e}),Vr.default.createElement(LL,{layoutP:e})),Vr.default.createElement(i9,{layoutP:e}),Vr.default.createElement(rL,{layoutP:e}))},[e]),WL=$L}),GL,Nh,YL,QL,XL,JL,qle=w(()=>{GL=ge.requireDist(),_e(),Pe(),Nh=V(H()),fe(),Wu(),Rt(),QL=C.button(YL||(YL=j([`
  outline: none;
  background-color: #1c1d21;
  border: 1px solid #191919;
  border-radius: 2px;
  display: flex;
  bottom: 25px;
  right: 15px;
  z-index: 1;
  position: absolute;

  padding: 4px 8px;
  display: flex;
  color: #656d77;
  line-height: 20px;
  font-size: 10px;

  &:hover {
    color: white;
  }

  & > svg {
    transition: transform 0.3s;
    transform: rotateZ(0deg);
  }

  &:hover > svg {
    transform: rotateZ(-20deg);
  }

  &.open > svg {
    transform: rotateZ(-180deg);
  }

  &.open:hover > svg {
    transform: rotateZ(-160deg);
  }
`]))),XL=({layoutP:e})=>{let t=Me(e.graphEditorDims.isOpen),n=(0,Nh.useCallback)(()=>{let o=(0,GL.val)(e.graphEditorDims.isOpen);Z().transaction(({stateEditors:i})=>{i.studio.historic.panels.sequenceEditor.graphEditor.setIsOpen({isOpen:!o})})},[e]);return Nh.default.createElement(QL,F({onClick:n,title:"Toggle graph editor",className:t?"open":""},uo("hide")),Nh.default.createElement(Qre,null))},JL=XL}),Mn,Cc,ZL,eN,tN,nN,mx,rN,Mle=w(()=>{Mn=V(H()),fe(),_e(),Cc=ge.requireDist(),z1(),t1(),eN=C.div(ZL||(ZL=j([`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-bottom: 10px;
  pointer-events: none;
  z-index: 1;
  display: `,`;
`])),e=>e.isVisible?"block":"none"),nN=C.svg(tN||(tN=j([`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  pointer-events: none;
`]))),mx=(0,Mn.forwardRef)(({layoutP:e,sheetAddress:t,renderMode:n="both",color:o="#4a9eff",strokeWidth:i=2,circleRadius:l=3,height:u},c)=>{let d=S=>S?"svgViewer_".concat(S.projectId,"_").concat(S.sheetId):"svgViewer_default",p=S=>{try{let E=d(S),P=localStorage.getItem(E);if(P){let O=JSON.parse(P);if(Array.isArray(O))return O.length>0&&typeof O[0]=="object"&&"time"in O[0]?[{id:"legacy",data:O,color:"#4a9eff",name:"Legacy Data"}]:O.filter(z=>z&&typeof z=="object"&&Array.isArray(z.data)&&typeof z.color=="string")}}catch(E){console.warn("⚠️ SVGViewer: Failed to load data from localStorage:",E)}return[]},h=(S,E)=>{try{let P=d(E);localStorage.setItem(P,JSON.stringify(S))}catch(P){console.warn("⚠️ SVGViewer: Failed to save data to localStorage:",P)}},[b,g]=(0,Mn.useState)(()=>p(t)),[m,y]=(0,Mn.useState)(!0);(0,Mn.useEffect)(()=>{let S=p(t);g(S)},[t?.projectId,t?.sheetId]);let x=S=>{try{let E=JSON.parse(S);if(Array.isArray(E))return E.filter(P=>typeof P=="object"&&typeof P.time=="number"&&typeof P.value=="number")}catch{let P=S.trim().split(`
`),O=[];for(let z of P){if(!z.trim()||z.toLowerCase().includes("time")||z.toLowerCase().includes("value"))continue;let B=z.split(",").map(D=>D.trim());if(B.length>=2){let D=parseFloat(B[0]),X=parseFloat(B[1]);!isNaN(D)&&!isNaN(X)&&O.push({time:D,value:X})}else{let D=z.split(/\s+/).filter(X=>X.length>0);if(D.length>=2){let X=parseFloat(D[0]),M=parseFloat(D[1]);!isNaN(X)&&!isNaN(M)&&O.push({time:X,value:M})}}}return O}return[]};return(0,Mn.useImperativeHandle)(c,()=>({clearData:()=>{let S=[];g(S),h(S,t)},addData:(S,E)=>{console.log("📊 SVGViewer: Adding dataset with",S.length,"points",E?"and color ".concat(E):"");let P={id:"dataset-".concat(Date.now(),"-").concat(Math.random().toString(36).substring(2,11)),data:S,color:E||o,name:"Dataset ".concat(b.length+1)},O=[...b,P];g(O),h(O,t)},loadData:(S,E)=>{console.log("📊 SVGViewer: loadData called, redirecting to addData");let P={id:"dataset-".concat(Date.now(),"-").concat(Math.random().toString(36).substring(2,11)),data:S,color:E||o,name:"Dataset ".concat(b.length+1)},O=[...b,P];g(O),h(O,t)},loadFromClipboard:()=>_t(void 0,null,function*(){try{let S=yield navigator.clipboard.readText(),E=x(S);if(E.length>0){console.log("✅ SVGViewer: Successfully parsed",E.length,"data points from clipboard");let P={id:"clipboard-".concat(Date.now(),"-").concat(Math.random().toString(36).substring(2,11)),data:E,color:o,name:"Clipboard Data ".concat(b.length+1)},O=[...b,P];g(O),h(O,t)}else console.warn("⚠️ SVGViewer: No valid data found in clipboard")}catch(S){throw console.error("❌ SVGViewer: Failed to read from clipboard:",S),S}}),show:()=>{console.log("👁️ SVGViewer: Showing component"),y(!0)},hide:()=>{console.log("🙈 SVGViewer: Hiding component"),y(!1)}}),[t,b,o]),Ne(()=>{let S=(0,Cc.val)(e.rightDims.width),E=u||(0,Cc.val)(e.dopeSheetDims.height)-30,P=(0,Cc.val)(e.scaledSpace.fromUnitSpace)(1),O=(0,Cc.val)(e.scaledSpace.leftPadding),z=0,B=1;return Mn.default.createElement(eN,{isVisible:m,style:{width:S+"px",height:E+"px","--unitSpaceToScaledSpaceMultiplier":P}},Mn.default.createElement(Vp,{layoutP:e,height:E},Mn.default.createElement(nN,{width:hs,height:E,viewBox:"0 0 ".concat(hs," ").concat(E)},Mn.default.createElement("g",{style:{transform:"translate(".concat(O,"px, 0px)")}},b.map(D=>{let X=D.data.map((_,L)=>{let U=_.time*P,N=(_.value-z)/B,se=E-N*(E-40)-20;return{x:U,y:se,originalValue:_.value,time:_.time,index:L}}),M=X.length>0?"M ".concat(X[0].x," ").concat(X[0].y," ")+X.slice(1).map(_=>"L ".concat(_.x," ").concat(_.y)).join(" "):"";return Mn.default.createElement("g",{key:D.id},(n==="lines"||n==="both")&&X.length>1&&Mn.default.createElement("path",{d:M,fill:"none",stroke:D.color,strokeWidth:i,opacity:.8}),(n==="circles"||n==="both")&&X.map(_=>Mn.default.createElement("circle",{key:"".concat(D.id,"-point-").concat(_.index,"-").concat(_.time,"-").concat(_.originalValue),cx:_.x,cy:_.y,r:l,fill:D.color,opacity:.9},Mn.default.createElement("title",null,"".concat(D.name||"Dataset"," - Time: ").concat(_.time.toFixed(2),", Value: ").concat(_.originalValue.toFixed(3))))))})))))},[e,b,n,i,l,u,m])}),mx.displayName="SVGViewer",rN=mx});function Rle(e){return _t(this,arguments,function*(t,n={}){let{sampleRate:o=100,normalize:i=!0}=n;try{let l=new(window.AudioContext||window.webkitAudioContext),u=yield t.arrayBuffer(),c=yield l.decodeAudioData(u),d=c.getChannelData(0),p=c.duration,h=c.sampleRate,b=Math.floor(h/o),g=Math.floor(d.length/b),m=[],y=0;for(let x=0;x<g;x++){let S=x*b,E=Math.min(S+b,d.length),P=0;for(let B=S;B<E;B++)P+=d[B]*d[B];let O=Math.sqrt(P/(E-S)),z=x*b/h;m.push({time:z,amplitude:O}),O>y&&(y=O)}if(i&&y>0)for(let x of m)x.amplitude=x.amplitude/y;return yield l.close(),console.log("🎵 Audio analysis complete: ".concat(m.length," data points over ").concat(p.toFixed(2),"s")),m}catch(l){throw console.error("❌ Audio analysis failed:",l),new Error("Failed to analyze audio file: ".concat(l instanceof Error?l.message:"Unknown error"))}})}function oN(e){return["audio/mpeg","audio/wav","audio/ogg","audio/mp4","audio/aac"].includes(e.type)||e.name.toLowerCase().match(/\.(mp3|wav|ogg|m4a|aac)$/)!==null}function aN(e){if(e===0)return"0 Bytes";let t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}var iN=w(()=>{}),Ke,lN,sN,uN,cN,dN,fN,pN,gx,hN,Vh,mN,gN,vN,bN,yN,xN,kN,wN,SN,EN,PN,IN,jN,vx,CN,ON,_N,DN,TN,AN,BN,bx,zN,qN,MN,RN,FN,LN,NN,VN,KN,UN,HN,$N,WN,GN,YN,Fle=w(()=>{Ke=V(H()),fe(),Ql(),Ao(),iN(),sN=C.div(lN||(lN=j([`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`]))),cN=C.div(uN||(uN=j([`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-width: 400px;
  max-width: 500px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`]))),fN=C.h3(dN||(dN=j([`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #ccc;
`]))),gx=C.div(pN||(pN=j([`
  display: flex;
  flex-direction: column;
  gap: 8px;
`]))),Vh=C.div(hN||(hN=j([`
  `,`;
  font-size: 12px;
  color: #999;
`])),Tr),gN=C.div(mN||(mN=j([`
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin-top: 4px;
`]))),bN=C.div(vN||(vN=j([`
  display: flex;
  gap: 8px;
  align-items: center;
`]))),xN=C.input(yN||(yN=j([`
  width: 40px;
  height: 28px;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
  }
`]))),wN=C(fa)(kN||(kN=j([`
  flex: 1;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
`]))),EN=C.textarea(SN||(SN=j([`
  width: 100%;
  min-height: 120px;
  padding: 8px;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  background: #2a2a2a;
  color: #ccc;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  resize: vertical;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: #4a9eff;
  }
`]))),IN=C.div(PN||(PN=j([`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`]))),vx=C.button(jN||(jN=j([`
  padding: 8px 16px;
  border: 1px solid
    `,`;
  border-radius: 4px;
  background: `,`;
  color: `,`;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: `,`;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`])),e=>e.variant==="primary"?"#4a9eff":"#3a3a3a",e=>e.variant==="primary"?"#4a9eff":"transparent",e=>e.variant==="primary"?"#fff":"#ccc",e=>e.variant==="primary"?"#3a8eef":"#3a3a3a"),ON=C.div(CN||(CN=j([`
  border-top: 1px solid #3a3a3a;
  padding-top: 16px;
  margin-top: 8px;
`]))),DN=C.div(_N||(_N=j([`
  display: flex;
  flex-direction: column;
  gap: 8px;
`]))),AN=C.div(TN||(TN=j([`
  border: 2px dashed `,`;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  background: `,`;
  cursor: pointer;
  transition: all 0.2s;

  `,`

  &:hover {
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.05);
  }
`])),e=>e.isDragOver?"#4a9eff":"#3a3a3a",e=>e.isDragOver?"rgba(74, 158, 255, 0.1)":"transparent",e=>e.hasFile&&`
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.05);
  `),bx=C.div(BN||(BN=j([`
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
`]))),qN=C.div(zN||(zN=j([`
  color: #ccc;
  font-size: 11px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
`]))),RN=C.div(MN||(MN=j([`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
`]))),LN=C.div(FN||(FN=j([`
  display: flex;
  flex-direction: column;
  gap: 4px;
`]))),VN=C.label(NN||(NN=j([`
  `,`;
  font-size: 11px;
  color: #999;
`])),Tr),UN=C.input(KN||(KN=j([`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  background: #2a2a2a;
  color: #ccc;
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #4a9eff;
  }
`]))),$N=C.div(HN||(HN=j([`
  font-size: 11px;
  margin-top: 8px;
  color: `,`;
`])),e=>{switch(e.status){case"analyzing":return"#4a9eff";case"complete":return"#4a9eff";case"error":return"#ff6b6b";default:return"#666"}}),WN=`[
  {"time": 0, "value": 0},
  {"time": 1, "value": 0.5},
  {"time": 2, "value": 0.2},
  {"time": 3, "value": 1}
]

Or CSV format:
time,value
0,0
1,0.5
2,0.2
3,1

Or space-separated:
0 0
1 0.5
2 0.2
3 1`,GN=({onLoad:e,onCancel:t})=>{let[n,o]=(0,Ke.useState)("#4a9eff"),[i,l]=(0,Ke.useState)("#4a9eff"),[u,c]=(0,Ke.useState)(""),[d,p]=(0,Ke.useState)(null),[h,b]=(0,Ke.useState)(!1),[g,m]=(0,Ke.useState)(100),[y,x]=(0,Ke.useState)("idle"),[S,E]=(0,Ke.useState)(""),P=(0,Ke.useRef)(null),O=(0,Ke.useRef)(null);(0,Ke.useEffect)(()=>{P.current&&P.current.focus()},[]);let z=A=>{try{let Y=JSON.parse(A);if(Array.isArray(Y))return Y.filter(ie=>typeof ie=="object"&&typeof ie.time=="number"&&typeof ie.value=="number")}catch{let ie=A.trim().split(`
`),q=[];for(let G of ie){if(!G.trim()||G.toLowerCase().includes("time")||G.toLowerCase().includes("value"))continue;let ue=G.split(",").map(de=>de.trim());if(ue.length>=2){let de=parseFloat(ue[0]),re=parseFloat(ue[1]);!isNaN(de)&&!isNaN(re)&&q.push({time:de,value:re})}else{let de=G.split(/\s+/).filter(re=>re.length>0);if(de.length>=2){let re=parseFloat(de[0]),T=parseFloat(de[1]);!isNaN(re)&&!isNaN(T)&&q.push({time:re,value:T})}}}return q}return[]},B=z(u).length,D=B>0||d!==null,X=A=>_t(void 0,null,function*(){x("analyzing"),E("");try{let Y=(yield Rle(A,{sampleRate:g,normalize:!0})).map(ie=>({time:ie.time,value:ie.amplitude}));c(JSON.stringify(Y,null,2)),x("complete")}catch(Y){console.error("Audio analysis failed:",Y),E(Y instanceof Error?Y.message:"Analysis failed"),x("error")}}),M=A=>{if(!oN(A)){E("Please select a supported audio file (MP3, WAV, OGG, M4A, AAC)"),x("error");return}p(A),x("idle"),E(""),X(A)},_=A=>{A.preventDefault(),b(!0)},L=A=>{A.preventDefault(),b(!1)},U=A=>{A.preventDefault(),b(!1);let Y=Array.from(A.dataTransfer.files);Y.length>0&&M(Y[0])},N=A=>{let Y=A.target.files;Y&&Y.length>0&&M(Y[0])},se=()=>{var A;(A=O.current)==null||A.click()},K=()=>{let A=z(u);A.length>0?e(A,n):console.warn("No valid data found in input")};(0,Ke.useEffect)(()=>{let A=Y=>{Y.key==="Escape"?W():Y.key==="Enter"&&(Y.ctrlKey||Y.metaKey)&&D&&K()};return document.addEventListener("keydown",A),()=>document.removeEventListener("keydown",A)},[D]);let ce=A=>{o(A),l(A)},J=A=>{l(A),/^#[0-9A-F]{6}$/i.test(A)&&o(A)},W=()=>{c(""),o("#4a9eff"),l("#4a9eff"),p(null),x("idle"),E(""),t()};return Ke.default.createElement(sN,{onClick:W},Ke.default.createElement(cN,{onClick:A=>A.stopPropagation()},Ke.default.createElement(fN,null,"Load SVG Data"),Ke.default.createElement(gx,null,Ke.default.createElement(Vh,null,"Color"),Ke.default.createElement(bN,null,Ke.default.createElement(xN,{type:"color",value:n,onChange:A=>ce(A.target.value)}),Ke.default.createElement(wN,{value:i,temporarilySetValue:J,discardTemporaryValue:()=>l(n),permanentlySetValue:J,isValid:A=>/^#[0-9A-F]{6}$/i.test(A)}))),Ke.default.createElement(gx,null,Ke.default.createElement(Vh,null,"SVG Data"),Ke.default.createElement(EN,{ref:P,value:u,onChange:A=>c(A.target.value),placeholder:WN}),u&&Ke.default.createElement(gN,null,B>0?"".concat(B," data points will be loaded"):"No valid data points found")),Ke.default.createElement(ON,null,Ke.default.createElement(Vh,null,"Or Analyze Audio File"),Ke.default.createElement(DN,null,Ke.default.createElement(AN,{isDragOver:h,hasFile:d!==null,onClick:se,onDragOver:_,onDragLeave:L,onDrop:U},Ke.default.createElement(bx,null,d?"Click to select a different audio file":"Click to select or drag & drop an audio file"),Ke.default.createElement(bx,{style:{fontSize:"11px",color:"#666"}},"Supported formats: MP3, WAV, OGG, M4A, AAC"),d&&Ke.default.createElement(qN,null,"📁 ",d.name," (",aN(d.size),")")),Ke.default.createElement("input",{ref:O,type:"file",accept:"audio/*,.mp3,.wav,.ogg,.m4a,.aac",onChange:N,style:{display:"none"}}),Ke.default.createElement(RN,null,Ke.default.createElement(LN,null,Ke.default.createElement(VN,null,"Sample Rate (Hz)"),Ke.default.createElement(UN,{type:"number",min:"10",max:"1000",value:g,onChange:A=>m(parseInt(A.target.value)||100)}))),y!=="idle"&&Ke.default.createElement($N,{status:y},y==="analyzing"&&"🎵 Analyzing audio...",y==="complete"&&"✅ Audio analysis complete! Data loaded above.",y==="error"&&"❌ ".concat(S)))),Ke.default.createElement(IN,null,Ke.default.createElement(vx,{onClick:W},"Cancel"),Ke.default.createElement(vx,{variant:"primary",onClick:K,disabled:!D},"Create"))))},YN=GN}),Ye,QN,XN,JN,ZN,e7,t7,n7,yx,r7,xx,o7,Kh,a7,i7,l7,kx,s7,u7,c7,d7,f7,wx,p7,h7,m7,g7,v7,b7,y7,x7,k7,w7,S7,Sx,E7,P7,Lle=w(()=>{Ye=V(H()),fe(),Ql(),Ao(),iN(),XN=C.div(QN||(QN=j([`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`]))),ZN=C.div(JN||(JN=j([`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-width: 400px;
  max-width: 500px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`]))),t7=C.h3(e7||(e7=j([`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #ccc;
`]))),yx=C.div(n7||(n7=j([`
  display: flex;
  flex-direction: column;
  gap: 8px;
`]))),xx=C.div(r7||(r7=j([`
  `,`;
  font-size: 12px;
  color: #999;
`])),Tr),Kh=C.div(o7||(o7=j([`
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin-bottom: 8px;
`]))),i7=C.div(a7||(a7=j([`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`]))),kx=C.button(l7||(l7=j([`
  padding: 8px 16px;
  border: 1px solid
    `,`;
  border-radius: 4px;
  background: `,`;
  color: `,`;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: `,`;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`])),e=>e.variant==="primary"?"#4a9eff":"#3a3a3a",e=>e.variant==="primary"?"#4a9eff":"transparent",e=>e.variant==="primary"?"#fff":"#ccc",e=>e.variant==="primary"?"#3a8eef":"#3a3a3a"),u7=C.div(s7||(s7=j([`
  display: flex;
  flex-direction: column;
  gap: 8px;
`]))),d7=C.div(c7||(c7=j([`
  border: 2px dashed `,`;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  background: `,`;
  cursor: pointer;
  transition: all 0.2s;

  `,`

  &:hover {
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.05);
  }
`])),e=>e.isDragOver?"#4a9eff":"#3a3a3a",e=>e.isDragOver?"rgba(74, 158, 255, 0.1)":"transparent",e=>e.hasFile&&`
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.05);
  `),wx=C.div(f7||(f7=j([`
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
`]))),h7=C.div(p7||(p7=j([`
  color: #ccc;
  font-size: 11px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
`]))),g7=C(fa)(m7||(m7=j([`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;

  &::placeholder {
    color: #666;
  }
`]))),b7=C.div(v7||(v7=j([`
  color: #ff6b6b;
  font-size: 11px;
  margin-top: 4px;
`]))),x7=C.div(y7||(y7=j([`
  color: #4a9eff;
  font-size: 11px;
  margin-top: 4px;
`]))),w7=C.div(k7||(k7=j([`
  display: flex;
  border-bottom: 1px solid #3a3a3a;
  margin-bottom: 16px;
`]))),Sx=C.button(S7||(S7=j([`
  padding: 8px 16px;
  border: none;
  background: `,`;
  color: `,`;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 2px solid
    `,`;
  transition: all 0.2s;

  &:hover {
    background: #3a3a3a;
    color: #ccc;
  }
`])),e=>e.active?"#3a3a3a":"transparent",e=>e.active?"#ccc":"#999",e=>e.active?"#4a9eff":"transparent"),E7=({onAttach:e,onCancel:t})=>{let[n,o]=(0,Ye.useState)("file"),[i,l]=(0,Ye.useState)(null),[u,c]=(0,Ye.useState)(""),[d,p]=(0,Ye.useState)(!1),[h,b]=(0,Ye.useState)(!1),[g,m]=(0,Ye.useState)(""),[y,x]=(0,Ye.useState)(""),S=(0,Ye.useRef)(null);(0,Ye.useEffect)(()=>{m(""),x("")},[n]);let E=U=>{if(!oN(U)){m("Please select a supported audio file (MP3, WAV, OGG, M4A, AAC)");return}l(U),m(""),x("")},P=U=>{U.preventDefault(),p(!0)},O=U=>{U.preventDefault(),p(!1)},z=U=>{U.preventDefault(),p(!1);let N=Array.from(U.dataTransfer.files);N.length>0&&E(N[0])},B=U=>{let N=U.target.files;N&&N.length>0&&E(N[0])},D=()=>{var U;(U=S.current)==null||U.click()},X=U=>{try{return new URL(U),!0}catch{return!1}},M=()=>n==="file"?i!==null:u.trim()!==""&&X(u.trim()),_=()=>_t(void 0,null,function*(){if(M()){b(!0),m(""),x("");try{let U=n==="file"?i:u.trim();yield e(U),x("Audio attached successfully!"),setTimeout(()=>{t()},1e3)}catch(U){console.error("Failed to attach audio:",U),m(U instanceof Error?U.message:"Failed to attach audio")}finally{b(!1)}}});(0,Ye.useEffect)(()=>{let U=N=>{N.key==="Escape"?L():N.key==="Enter"&&(N.ctrlKey||N.metaKey)&&M()&&_()};return document.addEventListener("keydown",U),()=>document.removeEventListener("keydown",U)},[n,i,u]);let L=()=>{l(null),c(""),m(""),x(""),t()};return Ye.default.createElement(XN,{onClick:L},Ye.default.createElement(ZN,{onClick:U=>U.stopPropagation()},Ye.default.createElement(t7,null,"Attach Audio to Sequence"),Ye.default.createElement(Kh,null,"Attach an audio file to sync with your sequence playback. The audio will play automatically when the sequence plays."),Ye.default.createElement(w7,null,Ye.default.createElement(Sx,{active:n==="file",onClick:()=>o("file")},"Upload File"),Ye.default.createElement(Sx,{active:n==="url",onClick:()=>o("url")},"From URL")),n==="file"?Ye.default.createElement(yx,null,Ye.default.createElement(xx,null,"Audio File"),Ye.default.createElement(u7,null,Ye.default.createElement(d7,{isDragOver:d,hasFile:i!==null,onClick:D,onDragOver:P,onDragLeave:O,onDrop:z},Ye.default.createElement(wx,null,i?"Click to select a different audio file":"Click to select or drag & drop an audio file"),Ye.default.createElement(wx,{style:{fontSize:"11px",color:"#666"}},"Supported formats: MP3, WAV, OGG, M4A, AAC"),i&&Ye.default.createElement(h7,null,"🎵 ",i.name," (",aN(i.size),")")),Ye.default.createElement("input",{ref:S,type:"file",accept:"audio/*,.mp3,.wav,.ogg,.m4a,.aac",onChange:B,style:{display:"none"}}))):Ye.default.createElement(yx,null,Ye.default.createElement(xx,null,"Audio URL"),Ye.default.createElement(g7,{value:u,temporarilySetValue:c,discardTemporaryValue:()=>c(""),permanentlySetValue:c,isValid:U=>U.trim()===""||X(U.trim())}),u.trim()===""&&Ye.default.createElement(Kh,{style:{marginTop:"4px",fontSize:"11px",color:"#666"}},"Example: https://example.com/audio.mp3"),Ye.default.createElement(Kh,null,"Enter a URL to an audio file. Make sure the server supports CORS if loading from a different domain.")),g&&Ye.default.createElement(b7,null,"❌ ",g),y&&Ye.default.createElement(x7,null,"✅ ",y),Ye.default.createElement(i7,null,Ye.default.createElement(kx,{onClick:L,disabled:h},"Cancel"),Ye.default.createElement(kx,{variant:"primary",onClick:_,disabled:!M()||h},h?"Attaching...":"Attach Audio"))))},P7=E7});function Nle(){return mt.default.createElement("svg",{fill:"#FFFFFF",width:"800px",height:"800px",viewBox:"0 0 1920 1920",xmlns:"http://www.w3.org/2000/svg",style:{width:"15px",height:"15px"}},mt.default.createElement("path",{d:"M1637.718 0c93.4 0 169.406 76.007 169.406 169.407v1581.13c0 93.512-76.007 169.407-169.406 169.407H451.87V0h1185.848zM1158.7 581l-79.861 79.861 242.422 242.423H667v112.94h654.262l-242.422 242.423 79.861 79.862 378.755-378.755L1158.7 581zM225.938 1920h112.938V.056H225.938z"}))}var mt,I7,j7,C7,O7,_7,D7,T7,A7,B7,z7,q7,M7,R7,F7,L7,N7,Ex,V7,K7,U7,H7,Vle=w(()=>{mt=V(H()),fe(),I7=ge.requireDist(),_e(),C7=C.div(j7||(j7=j([`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  width: `,`px; /* Subtract left/right margins */
  box-sizing: border-box;
`])),e=>e.width-20),_7=C.input(O7||(O7=j([`
  background: `,`;
  color: #cccccc;
  border: 1px solid `,`;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-family: inherit;
  flex: 1; /* Expand to fill available space */
  min-width: 80px; /* Minimum width to ensure usability */
  transition: all 0.15s ease-out;

  &:focus {
    outline: none;
    border-color: #0078d4;
    background: #1e1e1e;
  }

  &::placeholder {
    color: #6a6a6a;
  }
`])),e=>e.hasValue?"#1e1e1e":"#2d2d30",e=>e.hasValue?"#0078d4":"#3e3e42"),T7=C.button(D7||(D7=j([`
  background: #2d2d30;
  color: white;
  border: 1px solid #3e3e42;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #3e3e42;
  }

  &:active {
    background: #1e1e1e;
  }
`]))),B7=C.button(A7||(A7=j([`
  background: `,`;
  color: white;
  border: 1px solid #3e3e42;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: `,`;
  }

  &:active {
    background: #005a9e;
  }
`])),e=>e.isOpen?"#0078d4":"#2d2d30",e=>e.isOpen?"#106ebe":"#3e3e42"),q7=C.div(z7||(z7=j([`
  position: absolute;
  bottom: 100%;
  left: 0;
  background: #2d2d30;
  border: 1px solid #3e3e42;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  opacity: `,`;
  visibility: `,`;
  transform: `,`;
  transition: all 0.15s ease-out;
  z-index: 1000;
`])),e=>e.isOpen?1:0,e=>e.isOpen?"visible":"hidden",e=>e.isOpen?"translateY(0)":"translateY(10px)"),R7=C.div(M7||(M7=j([`
  padding: 4px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #3e3e42;
  }
`]))),L7=C.div(F7||(F7=j([`
  position: relative;

  &:hover > div:last-child {
    opacity: `,`;
    visibility: `,`;
  }
`])),e=>e.hasSubmenu?1:0,e=>e.hasSubmenu?"visible":"hidden"),Ex=C.button(N7||(N7=j([`
  width: 100%;
  background: transparent;
  color: #cccccc;
  border: none;
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: #3e3e42;
    color: white;
  }

  &:active {
    background: #0078d4;
  }
`]))),K7=C.div(V7||(V7=j([`
  position: absolute;
  left: 100%;
  top: 0;
  background: #2d2d30;
  border: 1px solid #3e3e42;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-out;
  z-index: 1001;
`]))),U7=({layoutP:e,onSVGViewerClear:t,onSVGViewerLoad:n,onSVGViewerShow:o,onSVGViewerHide:i,onFileSave:l,onMarkersAdd:u,onMarkersClear:c,onMarkersLog:d,onEventsAdd:p,onEventsClear:h,onEventsLog:b,onSheetCreate:g,onSheetDuplicate:m,onSheetObjectCreate:y,onSearchChange:x,onSearchTrigger:S})=>{let[E,P]=(0,mt.useState)(!1),[O,z]=(0,mt.useState)(""),[B,D]=(0,mt.useState)(0),X=(0,mt.useCallback)(()=>{P(K=>!K)},[]),M=(0,mt.useCallback)(()=>{P(!1)},[]),_=(0,mt.useCallback)(K=>{let ce=K.target.value;z(ce),x&&x(ce)},[x]),L=(0,mt.useCallback)(K=>{if(K.key==="Enter"){let ce=B+1;D(ce),S&&S(ce),x&&x(O)}},[x,S,O,B]),U=(0,mt.useCallback)(K=>{K&&K(),M()},[M]),N=[{label:"File",submenu:[{label:"Save",action:l}]},{label:"Sheets",submenu:[{label:"Create Sheet",action:g},{label:"Duplicate Sheet",action:m},{label:"Create Sheet Object",action:y}]},{label:"Markers",submenu:[{label:"Add",action:u},{label:"Log",action:d},{label:"Clear",action:c}]},{label:"Events",submenu:[{label:"Add",action:p},{label:"Log",action:b},{label:"Clear",action:h}]},{label:"Data Viewer",submenu:[{label:"Show",action:o},{label:"Hide",action:i},{label:"Load",action:n},{label:"Clear",action:t}]}],se=(K,ce)=>mt.default.createElement(L7,{key:ce,hasSubmenu:!!K.submenu},mt.default.createElement(Ex,{hasSubmenu:!!K.submenu,onClick:()=>!K.submenu&&U(K.action)},K.label,K.submenu&&mt.default.createElement("span",null,"▶")),K.submenu&&mt.default.createElement(K7,null,K.submenu.map((J,W)=>mt.default.createElement(Ex,{key:W,onClick:()=>U(J.action)},J.label))));return Ne(()=>{let K=(0,I7.val)(e),ce=K.rightPanelOpen,J=K.leftDims.width;return mt.default.createElement(C7,{width:J},mt.default.createElement(B7,{isOpen:E,onClick:X},mt.default.createElement("span",null,"☰")),mt.default.createElement(q7,{isOpen:E},mt.default.createElement(R7,null,N.map(se))),mt.default.createElement(_7,{type:"text",placeholder:"Search...",value:O,onChange:_,onKeyDown:L,hasValue:O.length>0}),mt.default.createElement(T7,{isActive:ce,onClick:()=>{K.setRightPanelOpen(!ce)},title:ce?"Hide timeline editor":"Show timeline editor",style:{transform:"scale(".concat(ce?-1:1,", 1)")}},mt.default.createElement(Nle,null)),E&&mt.default.createElement("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:99},onClick:M}))},[e,E,N])},H7=U7}),nn,$7,W7,G7,Y7,Q7,X7,J7,Z7,eV,tV,nV,Px,rV,oV,Kle=w(()=>{nn=V(H()),fe(),W7=C.div($7||($7=j([`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: `,`;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`])),e=>e.isOpen?"flex":"none"),Y7=C.div(G7||(G7=j([`
  background: #2d2d30;
  border: 1px solid #3e3e42;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  padding: 24px;
  min-width: 400px;
  max-width: 500px;
`]))),X7=C.h3(Q7||(Q7=j([`
  color: #ffffff;
  font-size: 16px;
  font-family: inherit;
  margin: 0 0 16px 0;
  font-weight: 500;
`]))),Z7=C.input(J7||(J7=j([`
  width: 100%;
  background: #1e1e1e;
  border: 1px solid #3e3e42;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  margin-bottom: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0078d4;
    box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.3);
  }

  &::placeholder {
    color: #888888;
  }
`]))),tV=C.div(eV||(eV=j([`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`]))),Px=C.button(nV||(nV=j([`
  background: `,`;
  color: `,`;
  border: 1px solid
    `,`;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  min-width: 80px;

  &:hover {
    background: `,`;
  }

  &:active {
    background: `,`;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`])),e=>e.variant==="primary"?"#0078d4":"transparent",e=>e.variant==="primary"?"#ffffff":"#cccccc",e=>e.variant==="primary"?"#0078d4":"#3e3e42",e=>e.variant==="primary"?"#106ebe":"#3e3e42",e=>e.variant==="primary"?"#005a9e":"#4a4a4a"),rV=(0,nn.forwardRef)(({onConfirm:e,onCancel:t},n)=>{let[o,i]=(0,nn.useState)(!1),[l,u]=(0,nn.useState)("create"),[c,d]=(0,nn.useState)(""),p=l==="create"?"Create New Sheet":"Duplicate Sheet",h="Enter sheet name";(0,nn.useImperativeHandle)(n,()=>({open:(x,S)=>{u(x),i(!0),d(x==="duplicate"&&S?"".concat(S," Copy"):"")},close:()=>{i(!1),d("")}}));let b=(0,nn.useCallback)(()=>{let x=c.trim();x&&(e(x,l),i(!1),d(""))},[c,l,e]),g=(0,nn.useCallback)(()=>{t(),i(!1),d("")},[t]),m=(0,nn.useCallback)(x=>{x.key==="Enter"?b():x.key==="Escape"&&g()},[b,g]),y=(0,nn.useCallback)(x=>{x.target===x.currentTarget&&g()},[g]);return nn.default.createElement(W7,{isOpen:o,onClick:y},nn.default.createElement(Y7,null,nn.default.createElement(X7,null,p),nn.default.createElement(Z7,{type:"text",value:c,onChange:x=>d(x.target.value),onKeyDown:m,placeholder:h,autoFocus:!0}),nn.default.createElement(tV,null,nn.default.createElement(Px,{variant:"secondary",onClick:g},"Cancel"),nn.default.createElement(Px,{variant:"primary",onClick:b,disabled:!c.trim()},"Create"))))}),oV=rV}),Ce,aV,iV,lV,sV,uV,cV,dV,bs,fV,Uo,pV,Ca,hV,mV,gV,vV,bV,yV,xV,kV,wV,SV,EV,PV,IV,jV,CV,OV,_V,DV,TV,AV,BV,zV,qV,Ix,jx,MV,Ule=w(()=>{Ce=V(H()),fe(),iV=C.div(aV||(aV=j([`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: `,`;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`])),e=>e.isOpen?"flex":"none"),sV=C.div(lV||(lV=j([`
  background: #2d2d30;
  border: 1px solid #3e3e42;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  padding: 24px;
  min-width: 500px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`]))),cV=C.h3(uV||(uV=j([`
  color: #ffffff;
  font-size: 16px;
  font-family: inherit;
  margin: 0 0 20px 0;
  font-weight: 500;
`]))),bs=C.div(dV||(dV=j([`
  margin-bottom: 16px;
`]))),Uo=C.label(fV||(fV=j([`
  display: block;
  color: #cccccc;
  font-size: 12px;
  font-family: inherit;
  margin-bottom: 6px;
  font-weight: 500;
`]))),Ca=C.input(pV||(pV=j([`
  width: 100%;
  background: #1e1e1e;
  border: 1px solid #3e3e42;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0078d4;
    box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.3);
  }

  &::placeholder {
    color: #888888;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`]))),mV=C.select(hV||(hV=j([`
  width: 100%;
  background: #1e1e1e;
  border: 1px solid #3e3e42;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0078d4;
    box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.3);
  }

  option {
    background: #1e1e1e;
    color: #ffffff;
  }
`]))),vV=C.div(gV||(gV=j([`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
`]))),yV=C.div(bV||(bV=j([`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`]))),kV=C.div(xV||(xV=j([`
  width: 40px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #3e3e42;
  background: `,`;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #0078d4;
  }
`])),e=>e.color),SV=C.input(wV||(wV=j([`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`]))),PV=C(Ca)(EV||(EV=j([`
  flex: 1;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
`]))),jV=C.div(IV||(IV=j([`
  display: flex;
  align-items: center;
  gap: 12px;
`]))),OV=C.div(CV||(CV=j([`
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background: `,`;
  border: 1px solid `,`;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: `,`;
  }
`])),e=>e.isOn?"#0078d4":"#3e3e42",e=>e.isOn?"#0078d4":"#5a5a5a",e=>e.isOn?"#106ebe":"#4a4a4a"),DV=C.div(_V||(_V=j([`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  top: 2px;
  left: `,`;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`])),e=>e.isOn?"26px":"2px"),AV=C.span(TV||(TV=j([`
  color: `,`;
  font-size: 14px;
  font-family: inherit;
  font-weight: `,`;
`])),e=>e.isOn?"#ffffff":"#cccccc",e=>e.isOn?"500":"normal"),zV=C.div(BV||(BV=j([`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`]))),Ix=C.button(qV||(qV=j([`
  background: `,`;
  color: `,`;
  border: 1px solid
    `,`;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  min-width: 80px;

  &:hover {
    background: `,`;
  }

  &:active {
    background: `,`;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`])),e=>e.variant==="primary"?"#0078d4":"transparent",e=>e.variant==="primary"?"#ffffff":"#cccccc",e=>e.variant==="primary"?"#0078d4":"#3e3e42",e=>e.variant==="primary"?"#106ebe":"#3e3e42",e=>e.variant==="primary"?"#005a9e":"#4a4a4a"),jx=(0,Ce.forwardRef)(({onConfirm:e,onCancel:t},n)=>{let[o,i]=(0,Ce.useState)(!1),[l,u]=(0,Ce.useState)(""),[c,d]=(0,Ce.useState)(""),[p,h]=(0,Ce.useState)("number"),[b,g]=(0,Ce.useState)(""),[m,y]=(0,Ce.useState)(""),[x,S]=(0,Ce.useState)(""),[E,P]=(0,Ce.useState)(""),[O,z]=(0,Ce.useState)("#FFFFFF"),[B,D]=(0,Ce.useState)(!1),X=re=>{let T=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(re);return T?{r:parseInt(T[1],16)/255,g:parseInt(T[2],16)/255,b:parseInt(T[3],16)/255,a:1}:{r:1,g:1,b:1,a:1}},M=re=>{let T=ee=>{let oe=Math.round(ee*255).toString(16);return oe.length===1?"0"+oe:oe};return"#".concat(T(re.r)).concat(T(re.g)).concat(T(re.b)).toUpperCase()},_=re=>{try{let T=JSON.parse(re);if(T&&typeof T=="object"&&"r"in T&&"g"in T&&"b"in T)return{r:T.r,g:T.g,b:T.b,a:1}}catch{}return{r:1,g:1,b:1,a:1}};(0,Ce.useImperativeHandle)(n,()=>({open:re=>{i(!0),u(re||""),d(""),h("number"),g(""),y(""),S(""),P(""),z("#FFFFFF"),D(!1)},close:()=>{i(!1)}}));let L=re=>{switch(re){case"number":return"0";case"string":return"Hello World";case"boolean":return"false";case"rgba":return'{"r": 1, "g": 1, "b": 1, "a": 1}';case"compound":return'{"x": 0, "y": 0, "z": 0}';default:return""}},U=re=>{switch(re){case"number":return"e.g. 0, 3.14, -10";case"string":return'e.g. "Hello World"';case"boolean":return"Use toggle below";case"rgba":return"Use color picker or enter hex";case"compound":return'{"x": 0, "y": 0, "z": 0}';default:return""}},N=re=>{h(re);let T=L(re);if(g(T),re==="rgba"){let ee=_(T);z(M(ee))}else re==="boolean"&&(D(!1),g("false"));re!=="number"&&(y(""),S(""),P(""))},se=()=>{let re=!B;D(re),g(re.toString())},K=re=>{z(re);let T=X(re);g(JSON.stringify(T))},ce=re=>{/^#[0-9A-Fa-f]{6}$/.test(re)?K(re):z(re)},J=(re,T)=>{switch(T){case"number":let ee=parseFloat(re);return isNaN(ee)?0:ee;case"string":return re;case"boolean":return re.toLowerCase()==="true";case"rgba":try{return JSON.parse(re)}catch{return{r:1,g:1,b:1,a:1}}case"compound":try{return JSON.parse(re)}catch{return{}}default:return re}},W=(0,Ce.useCallback)(()=>{let re=l.trim(),T=c.trim();if(!re||!T)return;let ee=J(b,p),oe={name:re,key:T,type:p,value:ee};p==="number"&&(m!==""&&(oe.min=parseFloat(m)),x!==""&&(oe.max=parseFloat(x)),E!==""&&(oe.step=parseFloat(E))),e(oe),i(!1)},[l,c,p,b,m,x,E,e]),A=(0,Ce.useCallback)(()=>{t(),i(!1)},[t]),Y=(0,Ce.useCallback)(re=>{re.key==="Enter"&&re.ctrlKey?W():re.key==="Escape"&&A()},[W,A]),ie=(0,Ce.useCallback)(re=>{re.target===re.currentTarget&&A()},[A]),q=p==="number",G=p==="rgba",ue=p==="boolean",de=l.trim()!==""&&c.trim()!=="";return Ce.default.createElement(iV,{isOpen:o,onClick:ie},Ce.default.createElement(sV,null,Ce.default.createElement(cV,null,"Create Sheet Object"),Ce.default.createElement(bs,null,Ce.default.createElement(Uo,null,"Object Name"),Ce.default.createElement(Ca,{type:"text",value:l,onChange:re=>u(re.target.value),onKeyDown:Y,placeholder:"Enter object name (e.g. 'myBox', 'character')",autoFocus:!0})),Ce.default.createElement(bs,null,Ce.default.createElement(Uo,null,"Property Key"),Ce.default.createElement(Ca,{type:"text",value:c,onChange:re=>d(re.target.value),onKeyDown:Y,placeholder:"Enter property key (e.g. 'position', 'color', 'scale')"})),Ce.default.createElement(bs,null,Ce.default.createElement(Uo,null,"Type"),Ce.default.createElement(mV,{value:p,onChange:re=>N(re.target.value)},Ce.default.createElement("option",{value:"number"},"Number"),Ce.default.createElement("option",{value:"string"},"String"),Ce.default.createElement("option",{value:"boolean"},"Boolean"),Ce.default.createElement("option",{value:"rgba"},"Color"),Ce.default.createElement("option",{value:"compound"},"Object"))),Ce.default.createElement(bs,null,Ce.default.createElement(Uo,null,"Default Value"),G?Ce.default.createElement(yV,null,Ce.default.createElement(kV,{color:O},Ce.default.createElement(SV,{type:"color",value:O,onChange:re=>K(re.target.value)})),Ce.default.createElement(PV,{type:"text",value:O,onChange:re=>ce(re.target.value),onKeyDown:Y,placeholder:"#FFFFFF"})):ue?Ce.default.createElement(jV,null,Ce.default.createElement(OV,{isOn:B,onClick:se},Ce.default.createElement(DV,{isOn:B})),Ce.default.createElement(AV,{isOn:B},B?"True":"False")):Ce.default.createElement(Ca,{type:"text",value:b,onChange:re=>g(re.target.value),onKeyDown:Y,placeholder:U(p)})),q&&Ce.default.createElement(bs,null,Ce.default.createElement(Uo,null,"Range (Optional)"),Ce.default.createElement(vV,null,Ce.default.createElement("div",null,Ce.default.createElement(Uo,{style:{fontSize:"11px",marginBottom:"4px"}},"Min"),Ce.default.createElement(Ca,{type:"number",value:m,onChange:re=>y(re.target.value),onKeyDown:Y,placeholder:"Min"})),Ce.default.createElement("div",null,Ce.default.createElement(Uo,{style:{fontSize:"11px",marginBottom:"4px"}},"Max"),Ce.default.createElement(Ca,{type:"number",value:x,onChange:re=>S(re.target.value),onKeyDown:Y,placeholder:"Max"})),Ce.default.createElement("div",null,Ce.default.createElement(Uo,{style:{fontSize:"11px",marginBottom:"4px"}},"Step"),Ce.default.createElement(Ca,{type:"number",value:E,onChange:re=>P(re.target.value),onKeyDown:Y,placeholder:"Step"})))),Ce.default.createElement(zV,null,Ce.default.createElement(Ix,{variant:"secondary",onClick:A},"Cancel"),Ce.default.createElement(Ix,{variant:"primary",onClick:W,disabled:!de},"Create"))))}),jx.displayName="SheetObjectModal",MV=jx});function Hle(e,t){let n=new File([e],t),o=URL.createObjectURL(n),i=Object.assign(document.createElement("a"),{href:o,target:"_blank",rel:"noopener"});i.setAttribute("download",t),i.click(),setTimeout(()=>{URL.revokeObjectURL(o)},4e4)}var it,ye,ys,RV,FV,LV,NV,Kr,VV,KV,UV,HV,$V,WV,GV,YV,QV,XV,JV,ZV,eK,Oc,tK,nK,rK,oK,aK,iK,lK,sK,uK,cK,vo=w(()=>{Pe(),Ml(),Dr(),_e(),dD(),it=ge.requireDist(),ye=V(H()),fe(),ys=ge.requireDist$1(),$ie(),xh(),nle(),zle(),Nl(),Ju(),wu(),s4(),M4(),Rt(),Ja(),Qt(),qle(),da(),ic(),Mle(),Fle(),Lle(),Vle(),Kle(),Ule(),D1(),FV=C(Rb)(RV||(RV=j([`
  z-index: `,`;
  box-shadow: 2px 2px 0 rgb(0 0 0 / 11%);
  `,`
`])),fi.sequenceEditorPanel,e=>e.collapsedWidth?"width: ".concat(e.collapsedWidth,"px !important; max-width: ").concat(e.collapsedWidth,"px !important;"):""),NV=C.div(LV||(LV=j([`
  background-color: rgba(40, 43, 47, 0.99);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
`]))),Kr=(()=>{let e={svgViewer:0,rightBackground:0,scrollableArea:0,rightOverlay:0,lengthIndicatorCover:0,lengthIndicatorStrip:0,playhead:0,currentFrameStamp:0,marker:0,horizontalScrollbar:0},t=-1;for(let n of Object.keys(e))e[n]=t,t++;return e})(),KV=C(Db)(VV||(VV=j([`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  `,` {
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: normal;
    padding: 0;
  }
`])),Hf),UV={edges:{left:{from:"screenLeft",distance:.1},right:{from:"screenRight",distance:.2},top:{from:"screenBottom",distance:.4},bottom:{from:"screenBottom",distance:.01}}},HV=()=>Ne(()=>{var e;let t=Z(),n={width:(e=(0,it.val)(t.atomP.historic.panels.sequenceEditor.rightPanelOpen))==null||e?X1*2:X1,height:200};return ye.default.createElement(Eb,{panelId:"sequenceEditor",defaultPosition:UV,minDims:n},ye.default.createElement($V,null))},[]),$V=()=>{let{dims:e}=Ll(),[t,n]=(0,ye.useState)(null),[o,i]=(0,ye.useState)(""),[l,u]=(0,ye.useState)(0),c=(0,ye.useRef)(null),[d,p]=(0,ye.useState)(!1),[h,b]=(0,ye.useState)(!1),[g,m]=(0,ye.useState)(null),y=(0,ye.useRef)(null),x=(0,ye.useRef)(null),S=(0,ye.useRef)(new Map),E=(0,ye.useRef)(null),P=(0,ye.useCallback)(()=>{var T;(T=c.current)==null||T.clearData()},[]),O=(0,ye.useCallback)(()=>{p(!0)},[]),z=(0,ye.useCallback)(()=>{var T;(T=c.current)==null||T.show()},[]),B=(0,ye.useCallback)(()=>{var T;(T=c.current)==null||T.hide()},[]),D=(0,ye.useCallback)((T,ee)=>{var oe;(oe=c.current)==null||oe.addData(T,ee),p(!1)},[]),X=(0,ye.useCallback)(()=>{p(!1)},[]),M=(0,ye.useCallback)(T=>_t(void 0,null,function*(){if(!g)throw new Error("No sheet selected");try{let ee=g.project.publicApi.sheet(g.address.sheetId).sequence,oe;T instanceof File?oe=URL.createObjectURL(T):oe=T,yield ee.attachAudio({source:oe}),console.log("✅ Audio attached successfully"),T instanceof File&&setTimeout(()=>{URL.revokeObjectURL(oe)},5e3)}catch(ee){throw console.error("❌ Failed to attach audio:",ee),ee}}),[g]),_=(0,ye.useCallback)(()=>{b(!1),m(null)},[]),L=(0,ye.useCallback)(()=>{var T;(T=y.current)==null||T.open("create")},[]),U=(0,ye.useCallback)(()=>{var T,ee;let oe=E.current,ve=((T=oe?.address)==null?void 0:T.sheetId)||"Sheet";(ee=y.current)==null||ee.open("duplicate",ve)},[]),N=(0,ye.useCallback)((T,ee)=>{var oe;try{let ve=E.current;if((oe=ve?.project)!=null&&oe.publicApi){let we=ve.project.publicApi.sheet(T);console.log("✅ Successfully ".concat(ee==="create"?"created":"duplicated"," sheet: ").concat(T))}else console.error("❌ No current sheet or project available")}catch(ve){console.error("❌ Failed to ".concat(ee," sheet:"),ve)}},[]),se=(0,ye.useCallback)(()=>{console.log("❌ Sheet modal cancelled")},[]),K=(0,ye.useCallback)(()=>{var T;(T=x.current)==null||T.open()},[]),ce=(0,ye.useCallback)(T=>{i(T)},[]),J=(0,ye.useCallback)(T=>{u(T)},[]);ye.default.useEffect(()=>{let T=ee=>{let{sheet:oe}=ee.detail;m(oe),b(!0)};return document.addEventListener("theatre:attachAudio",T),()=>{document.removeEventListener("theatre:attachAudio",T)}},[]);let W=(0,ye.useCallback)(T=>{try{let ee=E.current;if(ee){let oe;switch(T.type){case"number":if(T.min!==void 0||T.max!==void 0||T.step!==void 0){let He={};T.min!==void 0&&T.max!==void 0&&(He.range=[T.min,T.max]),T.step!==void 0&&(He.nudgeMultiplier=T.step),oe=ys.types.number(T.value,He)}else oe=ys.types.number(T.value);break;case"string":oe=ys.types.string(T.value);break;case"boolean":oe=ys.types.boolean(T.value);break;case"rgba":oe=ys.types.rgba(T.value);break;case"compound":oe=T.value;break;default:oe=T.value}let ve=ee.project.publicApi.sheet(ee.address.sheetId),we="".concat(ee.address.sheetId,":").concat(T.name),je=S.current.get(we)||{};je[T.key]=oe,S.current.set(we,je);let De;try{let He,rt={};try{He=ve.object(T.name,{}),rt=He.value||{}}catch{}let Le=F({},je);De=ve.object(T.name,Le,{reconfigure:!0});let gt=Object.keys(je),Ue=Object.keys(De.value||{}),Ge=gt.filter(Ht=>!Ue.includes(Ht));Ge.length!==0&&(console.log("⚠️ Still missing props:",Ge),console.log("This indicates a fundamental Theatre.js limitation with reconfigure"))}catch(He){throw console.error("❌ Object creation failed:",He),He}}else console.error("❌ No current sheet available")}catch(ee){console.error("❌ Failed to create sheet object:",ee)}},[]),A=(0,ye.useCallback)(()=>{console.log("❌ Sheet object modal cancelled")},[]),Y=(0,ye.useCallback)(()=>{console.log("💾 Start Menu: Saving project files");try{let T=(0,it.val)(Z().projectsP);Object.values(T).forEach(ee=>{if(ee){let oe=ee.address.projectId,ve=oe.replace(/[^\w\d'_\-]+/g," ").trim(),we="".concat(ve,".json"),je=JSON.stringify(Z().createContentOfSaveFile(oe),null,2);Hle(je,we),console.log("✅ Saved project: ".concat(we))}})}catch(T){console.error("❌ Failed to save project files:",T)}},[]),ie=(0,ye.useCallback)(()=>{try{let T=sr(ur().filter(ee=>Zr(ee)||jt(ee)).map(ee=>jt(ee)?ee.sheet:ee));if(T.length>0){let ee=T[0],oe=ee.getSequence();Z().transaction(({stateEditors:ve})=>{ve.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceMarkers({sheetAddress:ee.address,markers:[{id:uD(),position:oe.position,label:"Marker ".concat(Math.floor(oe.position*100)/100,"s")}],snappingFunction:oe.closestGridPosition})})}else console.warn("⚠️ No sheet selected for adding marker")}catch(T){console.error("❌ Failed to add marker:",T)}},[]),q=(0,ye.useCallback)(()=>{try{let T=sr(ur().filter(ee=>Zr(ee)||jt(ee)).map(ee=>jt(ee)?ee.sheet:ee));if(T.length>0){let ee=T[0],oe=ee.getSequence();Z().transaction(({stateEditors:ve})=>{ve.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.replaceEvents({sheetAddress:ee.address,events:[{id:cD(),name:"event",position:oe.position}]})})}else console.warn("⚠️ No sheet selected for adding event")}catch(T){console.error("❌ Failed to add event:",T)}},[]),G=(0,ye.useCallback)(()=>{try{let T=sr(ur().filter(ee=>Zr(ee)||jt(ee)).map(ee=>jt(ee)?ee.sheet:ee));if(T.length>0){let ee=T[0],oe=Z().atomP.historic.projects.stateByProjectId[ee.address.projectId].stateBySheetId[ee.address.sheetId].sequenceEditor.markerSet,ve=(0,it.val)(oe.allIds);ve&&Object.keys(ve).length>0?Object.keys(ve).forEach(we=>{Z().transaction(({stateEditors:je})=>{je.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removeMarker({sheetAddress:ee.address,markerId:we})})}):console.log("ℹ️ No markers to clear")}else console.warn("⚠️ No sheet selected for clearing markers")}catch(T){console.error("❌ Failed to clear markers:",T)}},[]),ue=(0,ye.useCallback)(()=>{try{let T=sr(ur().filter(ee=>Zr(ee)||jt(ee)).map(ee=>jt(ee)?ee.sheet:ee));if(T.length>0){let ee=T[0],oe=(0,it.val)(Z().atomP.historic.projects.stateByProjectId[ee.address.projectId].stateBySheetId[ee.address.sheetId]),ve=(0,it.val)(Z().atomP.historic.coreByProject[ee.address.projectId].sheetsById[ee.address.sheetId].sequence.markers)||[];console.group("📍 Markers for sheet:",ee.address.sheetId),console.log("Total markers:",ve.length),ve.forEach((we,je)=>{console.log("".concat(je+1,'. "').concat(we.label||"Unnamed",'" at ').concat(we.position,"s (ID: ").concat(we.id,")"))}),console.groupEnd()}else console.warn("⚠️ No sheet selected for logging markers")}catch(T){console.error("❌ Failed to log markers:",T)}},[]),de=(0,ye.useCallback)(()=>{try{let T=sr(ur().filter(ee=>Zr(ee)||jt(ee)).map(ee=>jt(ee)?ee.sheet:ee));if(T.length>0){let ee=T[0],oe=Z().atomP.historic.projects.stateByProjectId[ee.address.projectId].stateBySheetId[ee.address.sheetId].sequenceEditor.eventSet,ve=(0,it.val)(oe?.allIds);ve&&Object.keys(ve).length>0?Object.keys(ve).forEach(we=>{Z().transaction(({stateEditors:je})=>{je.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.removeEvent({sheetAddress:ee.address,eventId:we})})}):console.log("ℹ️ No events to clear")}else console.warn("⚠️ No sheet selected for clearing events")}catch(T){console.error("❌ Failed to clear events:",T)}},[]),re=(0,ye.useCallback)(()=>{try{let T=sr(ur().filter(ee=>Zr(ee)||jt(ee)).map(ee=>jt(ee)?ee.sheet:ee));if(T.length>0){let ee=T[0],oe=(0,it.val)(Z().atomP.historic.coreByProject[ee.address.projectId].sheetsById[ee.address.sheetId].sequence.events)||[];console.group("🎯 Events for sheet:",ee.address.sheetId),console.log("Total events:",oe.length),oe.forEach((ve,we)=>{console.log("".concat(we+1,'. "').concat(ve.name,'" at ').concat(ve.position,"s").concat(ve.value!==void 0?" (value: ".concat(JSON.stringify(ve.value),")"):""," (ID: ").concat(ve.id,")"))}),console.groupEnd()}else console.warn("⚠️ No sheet selected for logging events")}catch(T){console.error("❌ Failed to log events:",T)}},[]);return Hoe(t),Ne(()=>{var T;let ee=Z(),oe=(T=(0,it.val)(ee.atomP.historic.panels.sequenceEditor.rightPanelOpen))!=null?T:!0,ve=it.prism.memo("panelSize",()=>{let Ve=e.width,Wo=e.height;return{width:Ve,height:Wo,widthWithoutBorder:Ve-2,heightWithoutBorder:Wo-4,screenX:e.left,screenY:e.top}},[e,oe]),we=sr(ur().filter(Ve=>Zr(Ve)||jt(Ve)).map(Ve=>jt(Ve)?Ve.sheet:Ve));if(sr(we.map(Ve=>Ve.template)).length!==1)return ye.default.createElement(ye.default.Fragment,null);let je=we[0];if(!je)return ye.default.createElement(ye.default.Fragment,null);E.current=je;let De=je.getSequence().length,He=(0,it.val)(Z().atomP.ahistoric.projects.stateByProjectId[je.address.projectId].stateBySheetId[je.address.sheetId].sequence.clippedSpaceRange)||{start:0,end:10},rt=He.start===0&&He.end===10,Le=De*1.05;De>0&&De!==10&&He.end!==Le&&rt&&setTimeout(()=>{Z().transaction(({stateEditors:Ve})=>{Ve.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.clippedSpaceRange.set(ne(F({},je.address),{range:{start:0,end:Le}}))})},0);let gt=Ub("panelSizeP",ve).pointer,Ue=it.prism.memo("key",()=>JSON.stringify(je.address),[je]),Ge=tle(je,gt).getValue();(0,it.val)(Ge.tree.children).length>0;let Ht=(0,it.val)(je.project.pointers.historic.sheetsById[je.address.sheetId].sequence);Ht?.length&&Ht.length>0||Ht?.markers&&Ht.markers.length>0;let Et=it.prism.memo("containerRef",cK,[]),mr=(0,it.val)(Ge.graphEditorDims.isAvailable),Fn=(0,it.val)(Ge.graphEditorDims.isOpen),$t=(0,it.val)(Ge.rightPanelOpen),qe=$t?void 0:(0,it.val)(Ge.leftDims.width);return ye.default.createElement(FV,{collapsedWidth:qe,ref:Ve=>{Et(Ve),Ve!==t&&n(Ve)}},ye.default.createElement(NV,{style:{width:"".concat((0,it.val)(Ge.leftDims.width),"px")}}),ye.default.createElement(H7,{layoutP:Ge,onSVGViewerClear:P,onSVGViewerLoad:O,onSVGViewerShow:z,onSVGViewerHide:B,onFileSave:Y,onMarkersAdd:ie,onMarkersClear:G,onMarkersLog:ue,onEventsAdd:q,onEventsClear:de,onEventsLog:re,onSheetCreate:L,onSheetDuplicate:U,onSheetObjectCreate:K,onSearchChange:ce,onSearchTrigger:J}),ye.default.createElement($B,{layoutP:Ge},ye.default.createElement(WV,{layoutP:Ge}),ye.default.createElement(rN,{ref:c,key:Ue+"-svgViewer",layoutP:Ge,sheetAddress:je.address,renderMode:"both",color:"#4575e3"}),ye.default.createElement(nM,{searchTerm:o,searchTrigger:l},ye.default.createElement(aF,{key:Ue+"-dopeSheet-"+o+"-"+l,layoutP:Ge})),Fn&&ye.default.createElement(hR,{key:Ue+"-graphEditor",layoutP:Ge}),mr&&ye.default.createElement(JL,{layoutP:Ge}),$t&&ye.default.createElement(WL,{layoutP:Ge})),ye.default.createElement(oV,{ref:y,onConfirm:N,onCancel:se}),ye.default.createElement(MV,{ref:x,onConfirm:W,onCancel:A}),d&&ye.default.createElement(YN,{onLoad:D,onCancel:X}),h&&ye.default.createElement(P7,{onAttach:M,onCancel:_}))},[e,t,o,l,d,h])},WV=({layoutP:e})=>Ne(()=>{let t=(0,it.val)(e.sheet);return t.getSequence(),ye.default.createElement(KV,{style:{width:(0,it.val)(e.leftDims.width)}},ye.default.createElement(Hf,{style:{borderRight:"1px solid #222"}},ye.default.createElement(XV,{style:{borderBottom:"1px solid #222"}},ye.default.createElement(sb,{style:{color:"white",fontSize:"14px",fontWeight:"bold"}},t.address.sheetId)),ye.default.createElement(ZV,null,ye.default.createElement(YV,null,ye.default.createElement(aK,{layoutP:e}),ye.default.createElement(Uf,null,"/"),ye.default.createElement(iK,{layoutP:e}),ye.default.createElement(Uf,null,"-"),ye.default.createElement(sK,{layoutP:e}),ye.default.createElement(Uf,null,":"),ye.default.createElement(lK,{layoutP:e}),ye.default.createElement(sb,{style:{fontSize:"9px",opacity:.7}},"fps")))))},[e]),YV=C.div(GV||(GV=j([`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 30px;
`]))),XV=C.div(QV||(QV=j([`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 8px;
`]))),ZV=C.div(JV||(JV=j([`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 8px;
`]))),Oc=C(Yl)(eK||(eK=j([`
  flex: 1;
  min-width: 0;
  height: 20px;
  font-size: 12px;
  padding: 0;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #adadadb3;
  border-radius: 2px;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
  }
`]))),nK=C(Oc)(tK||(tK=j([`
  width: 40px;
`]))),oK=C(Oc)(rK||(rK=j([`
  width: 40px;
`]))),aK=({layoutP:e})=>Ne(()=>{let t=(0,it.val)(e.sheet).getSequence(),n=Number((0,it.val)(t.pointer.position).toFixed(3)),o,i=t.position;return ye.default.createElement(Oc,ne(F({value:n},{temporarilySetValue(l){o!==void 0&&(o=void 0),o=at(l,0,t.length),t.position=o},discardTemporaryValue(){o!==void 0&&(o=void 0,t.position=i)},permanentlySetValue(l){o!==void 0&&(o=void 0),t.position=at(l,0,t.length)}}),{isValid:l=>isFinite(l)&&l>=0,nudge:({deltaX:l})=>l*.01}))},[e]),iK=({layoutP:e})=>Ne(()=>{let t=(0,it.val)(e.sheet),n=t.getSequence().length,o;return ye.default.createElement(Oc,ne(F({value:n},{temporarilySetValue(i){o&&(o.discard(),o=void 0),o=Z().tempTransaction(({stateEditors:l})=>{l.coreByProject.historic.sheetsById.sequence.setLength(ne(F({},t.address),{length:i}))})},discardTemporaryValue(){o&&(o.discard(),o=void 0)},permanentlySetValue(i){o&&(o.discard(),o=void 0),Z().transaction(({stateEditors:l})=>{l.coreByProject.historic.sheetsById.sequence.setLength(ne(F({},t.address),{length:i}))})}}),{isValid:i=>isFinite(i)&&i>0,nudge:({deltaX:i})=>i*.1}))},[e]),lK=({layoutP:e})=>Ne(()=>{let t=(0,it.val)(e.sheet),n=t.getSequence().subUnitsPerUnit,o;return ye.default.createElement(oK,ne(F({value:n},{temporarilySetValue(i){o&&(o.discard(),o=void 0),o=Z().tempTransaction(({stateEditors:l})=>{l.coreByProject.historic.sheetsById.sequence.setSubUnitsPerUnit(ne(F({},t.address),{subUnitsPerUnit:i}))})},discardTemporaryValue(){o&&(o.discard(),o=void 0)},permanentlySetValue(i){o&&(o.discard(),o=void 0),Z().transaction(({stateEditors:l})=>{l.coreByProject.historic.sheetsById.sequence.setSubUnitsPerUnit(ne(F({},t.address),{subUnitsPerUnit:i}))})}}),{isValid:i=>isFinite(i)&&i>=1&&i<=wS(2,12),nudge:({deltaX:i})=>i*1}))},[e]),sK=({layoutP:e})=>Ne(()=>{let t=(0,it.val)(e.sheet).getSequence(),n=t.subUnitsPerUnit,o=(0,it.val)(t.pointer.position),i=Math.round(o*n),l,u=t.position;return ye.default.createElement(nK,ne(F({value:i},{temporarilySetValue(c){l!==void 0&&(l=void 0),l=c;let d=at(c/n,0,t.length);t.position=d},discardTemporaryValue(){l!==void 0&&(l=void 0,t.position=u)},permanentlySetValue(c){l!==void 0&&(l=void 0);let d=at(c/n,0,t.length);t.position=d}}),{isValid:c=>isFinite(c)&&c>=0,nudge:({deltaX:c})=>c*1}))},[e]),uK=HV,cK=()=>{let e=null,t={passive:!1,capture:!1},n=o=>{Math.abs(o.deltaY)<Math.abs(o.deltaX)&&(o.preventDefault(),o.stopPropagation())};return o=>{e!==o&&e&&e.removeEventListener("wheel",n,t),e=o,o&&o.addEventListener("wheel",n,t)}}}),xs,dK,fK,$le=w(()=>{ire(),xs=V(H()),Pe(),_e(),Jre(),vo(),dK=()=>{let e=Me(Z().paneManager.allPanesD),t=Object.entries(e).map(([n,o])=>xs.default.createElement(aD,{key:"pane-".concat(n),paneInstance:o}));return xs.default.createElement(xs.default.Fragment,null,t,xs.default.createElement(z3,null),xs.default.createElement(uK,null))},fK=dK}),pK,hK,Uh,Cx=w(()=>{fe(),Br(),hK=C(An)(pK||(pK=j([`
  padding: 1em;
  max-width: 240px;
  pointer-events: none !important;
  --popover-outer-stroke: transparent;
  --popover-inner-stroke: #45464d;
`]))),Uh=hK}),mK,gK,vK,Wle=w(()=>{fe(),Cx(),gK=C(Uh)(mK||(mK=j([`
  --popover-outer-stroke: #e11c1c;
  --popover-inner-stroke: #2c1c1c;
  --popover-bg: #2c1c1c;
  pointer-events: none !important;
`]))),vK=gK}),Gle=Te((e,t)=>{var n,o;n=[],o=[];function i(l,u,c){var d,p,h,b,g,m,y,x;if(l===u)return 0;if(d=l.length,p=u.length,d===0)return p;if(p===0)return d;for(c&&(l=l.toLowerCase(),u=u.toLowerCase()),y=0;y<d;)o[y]=l.charCodeAt(y),n[y]=++y;for(x=0;x<p;)for(h=u.charCodeAt(x),b=g=x++,y=-1;++y<d;)m=h===o[y]?g:g+1,g=n[y],n[y]=b=g>b?m>b?b+1:m:m>g?g+1:m;return b}t.exports=i}),Yle=Te((e,t)=>{var n=Gle();function o(){var i,l,u,c,d,p=0,h=arguments[0],b=arguments[1],g=b.length,m=arguments[2];m&&(c=m.threshold,d=m.ignoreCase),c===void 0&&(c=0);for(var y=0;y<g;++y)d?l=n(h,b[y],!0):l=n(h,b[y]),l>h.length?i=1-l/b[y].length:i=1-l/h.length,i>p&&(p=i,u=b[y]);return p>=c?u:null}t.exports=o});function Qle(e,t,n="Did you mean ",o="?"){let i=(0,bK.default)(e,t,{threshold:.7});return i?n+JSON.stringify(i)+o:""}var bK,Xle=w(()=>{bK=V(Yle())});function yK(e,t){return e.length<=t?e:e.substr(0,t-3)+"..."}var Jle=w(()=>{}),xK,Ox,kK=w(()=>{Jle(),xK=e=>typeof e=="string"?'string("'.concat(yK(e,10),'")'):typeof e=="number"?"number(".concat(yK(String(e),10),")"):e===null?"null":e===void 0?"undefined":typeof e=="boolean"?String(e):Array.isArray(e)?"array":typeof e=="object"?"object":"unknown",Ox=xK}),wK,SK,_x,EK=w(()=>{fe(),Cx(),SK=C(Uh)(wK||(wK=j([`
  padding: 6px;
`]))),_x=SK}),PK,IK,Dx,jK=w(()=>{fe(),di(),IK=C(T_)(PK||(PK=j([`
  display: flex;
  height: fit-content;
  backdrop-filter: blur(14px);
  border-radius: 2px;
`]))),Dx=IK}),ks,CK,OK,_K,_c,Hh=w(()=>{fe(),tt(),ks=V(H()),Jp(),ip(),EK(),jK(),OK=C.button(CK||(CK=j([`
  `,`;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  width: 32px;
  height: 32px;
  outline: none;

  color: #a8a8a9;

  background: rgba(40, 43, 47, 0.8);
  backdrop-filter: blur(14px);
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;

  svg {
    display: block;
  }

  &:hover {
    background: rgba(59, 63, 69, 0.8);
  }

  &:active {
    background: rgba(82, 88, 96, 0.8);
  }

  &.selected {
    color: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }

  // Don't blur if in a button group, because it already blurs. We need to blur
  // on the group-level, otherwise we get seams.
  `,` > & {
    backdrop-filter: none;
    filter: none;
    border-radius: 0;

    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    &:last-child {
      border-bottom-right-radius: 2px;
      border-top-right-radius: 2px;
    }
  }

  @supports not (backdrop-filter: blur()) {
    background: rgba(40, 43, 47, 0.95);
  }
`])),Qe,Dx),_K=ks.default.forwardRef((e,t)=>{var n=e,{title:o}=n,i=nu(n,["title"]);let[l,u]=Qp({enabled:typeof o=="string"},()=>ks.default.createElement(_x,null,o));return ks.default.createElement(ks.default.Fragment,null,l,ks.default.createElement(OK,F({ref:ap([u,t])},i))," ")}),_c=_K}),DK,TK,AK,BK,zK,Zle=w(()=>{DK=V(H()),Hh(),fe(),tt(),AK=C(_c)(TK||(TK=j([`
  `,`;
  & > svg {
    width: 1em;
    height: 1em;
    pointer-events: none;
  }
`])),Qe),BK=({config:e,testId:t})=>{var n;return DK.default.createElement(AK,{onClick:e.onClick,"data-testid":t,title:e.title,dangerouslySetInnerHTML:{__html:(n=e.svgSource)!=null?n:""}})},zK=BK});function ese({value:e,label:t,icon:n,onClick:o,isSelected:i}){return ws.default.createElement(ws.default.Fragment,null,ws.default.createElement(_c,{forwardedAs:O_,className:i?"selected":void 0,"aria-label":t,onClick:o,title:t},n))}var ws,qK,MK,tse=w(()=>{ws=V(H()),di(),Hh(),jK(),qK=({value:e,onChange:t,options:n})=>ws.default.createElement(Dx,null,n.map(({label:o,icon:i,value:l})=>ws.default.createElement(ese,{key:l,value:l,isSelected:e===l,label:o,icon:i,onClick:()=>t(l)}))),MK=qK}),Tx,RK,FK,LK,NK,nse=w(()=>{Tx=V(H()),fe(),tt(),tse(),FK=C.div(RK||(RK=j([`
  `,`;
  & > svg {
    width: 1em;
    height: 1em;
    pointer-events: none;
  }
`])),Qe),LK=({config:e})=>Tx.default.createElement(MK,{onChange:e.onChange,options:e.options.map(({label:t,value:n,svgSource:o})=>({label:t,value:n,icon:Tx.default.createElement(FK,{dangerouslySetInnerHTML:{__html:o}})})),value:e.value}),NK=LK}),Dc,VK,KK,UK,HK,rse=w(()=>{Dc=V(H()),fe(),tt(),Hh(),BD(),Ar(),KK=C.div(VK||(VK=j([`
  `,`;
  & > svg {
    width: 1em;
    height: 1em;
    pointer-events: none;
  }
`])),Qe),UK=({config:e})=>{let t=(0,Dc.useRef)(null),n=Tn(()=>{let o=t.current.getBoundingClientRect();return{debugName:"ExtensionFlyoutMenu:"+e.label,constraints:{maxX:o.right,maxY:8,minX:o.left,minY:8},verticalGap:2}},()=>Dc.default.createElement(Qb,{items:e.items.map((o,i)=>({label:o.label,callback:()=>{var l;try{(l=o.onClick)==null||l.call(o)}catch(u){console.error(u)}}})),onRequestClose:()=>{n.close("clicked")}}));return Dc.default.createElement(KK,null,n.node,Dc.default.createElement(_c,{ref:t,onClick:o=>{n.open(o,t.current)}},e.label))},HK=UK});function ose(e){return Ax[e]}var Tc,$K,Ax,WK,GK,ase=w(()=>{Xle(),kK(),Tc=V(H()),Zle(),nse(),rse(),$K=e=>Tc.default.createElement(Tc.default.Fragment,null,e.config.map((t,n)=>Tc.default.createElement(WK,{config:t,key:n}))),Ax={Icon:zK,Switch:NK,Flyout:HK},WK=({config:e})=>{let t=ose(e.type);if(!t)throw new Error("No tool with tool.type ".concat(Ox(e.type)," exists. Did you mean ").concat(Qle(e.type,Object.keys(Ax))));return Tc.default.createElement(t,{config:e})},GK=$K}),YK,bo,QK,XK,JK,Bx,ZK,eU,zx,tU=w(()=>{YK=ge.requireDist(),_e(),Pe(),bo=V(H()),fe(),ase(),XK=C.div(QK||(QK=j([`
  height: 36px;
  /* pointer-events: none; */

  display: flex;
  gap: 0.5rem;
  justify-content: center;
`]))),Bx=C.div(JK||(JK=j([`
  position: abolute;
  height: 32px;
  width: 1px;
  background: #373b40;
  opacity: 0.4;
`]))),ZK=({extension:e,toolbarId:t})=>{var n;let o=(0,bo.useMemo)(()=>new YK.Atom([]),[]),i=(n=e.toolbars)==null?void 0:n[t];(0,bo.useLayoutEffect)(()=>{let u=i?.(o.set.bind(o),Z().publicApi);if(typeof u=="function")return u},[e,t,i]);let l=Me(o.prism);return bo.default.createElement(GK,{config:l})},eU=({toolbarId:e,showLeftDivider:t})=>{var n;let o=[],i=Me(Z().atomP.ephemeral.extensions.byId),l=!1;for(let[,u]of Object.entries(i))!u||!((n=u.toolbars)!=null&&n[e])||(o.push(bo.default.createElement(bo.default.Fragment,{key:"extensionToolbar-"+u.id},l?bo.default.createElement(Bx,null):void 0,bo.default.createElement(ZK,{extension:u,toolbarId:e}))),l=!0);return o.length===0?null:bo.default.createElement(XK,{"data-testid":"theatre-extensionToolbar-".concat(e)},t?bo.default.createElement(Bx,null):void 0,o)},zx=eU}),Ac,nU,rU,oU,aU,ise=w(()=>{fe(),Ac=V(H()),Hh(),rU=C(_c)(nU||(nU=j([`
  color: `,`;

  border-bottom: 1px solid
    `,`;
`])),({pinned:e})=>e?"rgba(255, 255, 255, 0.8)":"#A8A8A9",({pinned:e})=>e?"rgba(255, 255, 255, 0.7)":"rgba(255, 255, 255, 0.08)"),oU=(0,Ac.forwardRef)((e,t)=>{var n=e,{children:o,hint:i,pinned:l,icon:u,pinHintIcon:c,unpinHintIcon:d}=n,p=nu(n,["children","hint","pinned","icon","pinHintIcon","unpinHintIcon"]);let[h,b]=(0,Ac.useState)(!1),g=h||i;return Ac.default.createElement(rU,ne(F({},p),{pinned:l,ref:t,onMouseOver:()=>b(!0),onMouseOut:()=>b(!1)}),Ac.default.createElement("div",{style:{pointerEvents:"none",width:"fit-content",height:"fit-content",inset:0}},g&&!l?c:g&&l?d:u),o)}),aU=oU});function lse(e){return qx.createElement("svg",F({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),qx.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.732 4.048l-.792-.792L7.2 8l4.74 4.744.792-.792L8.781 8l3.951-3.952zm-3.932 0l-.792-.792L3.268 8l4.74 4.744.792-.792L4.848 8 8.8 4.048z",fill:"currentColor"}))}var qx,iU,sse=w(()=>{qx=V(H()),iU=lse});function use(e){return Mx.createElement("svg",F({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),Mx.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M3.694 3.765l.792-.792 4.74 4.744-4.74 4.744-.792-.793 3.951-3.951-3.951-3.952zm3.932 0l.792-.792 4.74 4.744-4.74 4.744-.792-.793 3.952-3.951-3.952-3.952z",fill:"currentColor"}))}var Mx,lU,cse=w(()=>{Mx=V(H()),lU=use}),qt,sU,uU,cU,Rx,dU,Oa,fU,pU,hU,mU,gU,vU,bU,yU,xU,$h,kU,wU,Fx,Lx,SU,EU,dse=w(()=>{_e(),Pe(),qt=V(H()),fe(),uU=C.div(sU||(sU=j([`
  width: 138px;
  border-radius: 2px;
  background-color: rgba(42, 45, 50, 0.9);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(14px);
  pointer-events: auto;
  // makes the edges of the item highlights match the rounded corners
  overflow: hidden;

  @supports not (backdrop-filter: blur()) {
    background-color: rgba(42, 45, 50, 0.98);
  }

  color: rgba(255, 255, 255, 0.9);

  & a {
    // Fix colors of links to not be default
    color: inherit;
  }
`]))),Rx=C.div(cU||(cU=j([`
  position: relative;
  padding: 0px 12px;
  font-weight: 400;
  font-size: 11px;
  height: 32px;
  text-decoration: none;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default;
`]))),Oa=C(Rx)(dU||(dU=j([`
  &:before {
    position: absolute;
    display: block;
    content: ' ';
    inset: 3px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
  }

  &.secondary {
    color: rgba(255, 255, 255, 0.5);
  }

  &:hover {
    /* background-color: #398995; */
    color: white !important;
    &:before {
      opacity: 1;
    }
  }
`]))),pU=C(Rx)(fU||(fU=j([`
  height: auto;
  min-height: 32px;
  padding-top: 12px;
  padding-bottom: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
`]))),mU=C.div(hU||(hU=j([`
  font-weight: 600;
`]))),vU=C.div(gU||(gU=j([`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`]))),yU=C.div(bU||(bU=j([`
  margin-left: 2px;
`]))),$h=C.div(xU||(xU=j([`
  height: 1px;
  margin: 0 2px;
  background: rgba(255, 255, 255, 0.02);
`]))),wU=C.div(kU||(kU=j([`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #40aaa4;
  right: 14px;
  top: 12px;
  border-radius: 50%;
`]))),Fx="1.0.19",Lx=Fx.match(/^[^\-]+/)[0],SU=qt.default.forwardRef((e,t)=>{let n=Me(Z().atomP.ahistoric.updateChecker.result.hasUpdates);return qt.default.createElement(uU,{ref:t},qt.default.createElement(Oa,{as:"a",href:"https://www.theatrejs.com/docs/latest",className:"",target:"_blank"},"Docs"),qt.default.createElement(Oa,{as:"a",href:"https://www.theatrejs.com/docs/latest/releases",className:"",target:"_blank"},"Changelog"),qt.default.createElement($h,null),qt.default.createElement(Oa,{as:"a",href:"https://github.com/theatre-js/theatre",className:"",target:"_blank"},"Github"),qt.default.createElement(Oa,{as:"a",href:"https://twitter.com/theatre_js",className:"",target:"_blank"},"Twitter"),qt.default.createElement(Oa,{className:"",as:"a",href:"https://discord.gg/bm9f8F9Y9N",target:"_blank"},"Discord"),qt.default.createElement($h,null),qt.default.createElement(pU,null,qt.default.createElement(mU,null,"Version"),qt.default.createElement(vU,null,qt.default.createElement(yU,null,Fx," ",n===!0?"(outdated)":n===!1?"(latest)":""))),n===!0&&qt.default.createElement(qt.default.Fragment,null,qt.default.createElement($h,null),qt.default.createElement(Oa,{as:"a",href:"https://www.theatrejs.com/docs/latest/releases".concat(encodeURIComponent(Lx)),className:"",target:"_blank"},"Update",qt.default.createElement(wU,null)),qt.default.createElement(Oa,{as:"a",href:"https://www.theatrejs.com/docs/latest/releases#".concat(encodeURIComponent(Lx)),className:"",target:"_blank"},"What's new?")))}),EU=SU}),Nx,Wh,PU,Vx,IU,jU,Bc,CU,Kx,OU,Gh,zc,qc,_a,_U,DU,TU,Ss,Rn,AU,BU,zU,Ux,fse=w(()=>{Nx=V(H(),1),Wh=V(H(),1),PU=e=>typeof e=="function",Vx=(e,t)=>PU(e)?e(t):e,IU=(()=>{let e=0;return()=>(++e).toString()})(),jU=20,Bc=new Map,CU=1e3,Kx=e=>{if(Bc.has(e))return;let t=setTimeout(()=>{Bc.delete(e),_a({type:4,toastId:e})},CU);Bc.set(e,t)},OU=e=>{let t=Bc.get(e);t&&clearTimeout(t)},Gh=(e,t)=>{switch(t.type){case 0:return ne(F({},e),{toasts:[t.toast,...e.toasts].slice(0,jU)});case 1:return t.toast.id&&OU(t.toast.id),ne(F({},e),{toasts:e.toasts.map(l=>l.id===t.toast.id?F(F({},l),t.toast):l)});case 2:let{toast:n}=t;return e.toasts.find(l=>l.id===n.id)?Gh(e,{type:1,toast:n}):Gh(e,{type:0,toast:n});case 3:let{toastId:o}=t;return o?Kx(o):e.toasts.forEach(l=>{Kx(l.id)}),ne(F({},e),{toasts:e.toasts.map(l=>l.id===o||o===void 0?ne(F({},l),{visible:!1}):l)});case 4:return t.toastId===void 0?ne(F({},e),{toasts:[]}):ne(F({},e),{toasts:e.toasts.filter(l=>l.id!==t.toastId)});case 5:return ne(F({},e),{pausedAt:t.time});case 6:let i=t.time-(e.pausedAt||0);return ne(F({},e),{pausedAt:void 0,toasts:e.toasts.map(l=>ne(F({},l),{pauseDuration:l.pauseDuration+i}))})}},zc=[],qc={toasts:[],pausedAt:void 0},_a=e=>{qc=Gh(qc,e),zc.forEach(t=>{t(qc)})},_U={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},DU=(e={})=>{let[t,n]=(0,Nx.useState)(qc);(0,Nx.useEffect)(()=>(zc.push(n),()=>{let i=zc.indexOf(n);i>-1&&zc.splice(i,1)}),[t]);let o=t.toasts.map(i=>{var l,u;return ne(F(F(F({},e),e[i.type]),i),{duration:i.duration||((l=e[i.type])==null?void 0:l.duration)||e?.duration||_U[i.type],style:F(F(F({},e.style),(u=e[i.type])==null?void 0:u.style),i.style)})});return ne(F({},t),{toasts:o})},TU=(e,t="blank",n)=>ne(F({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0},n),{id:n?.id||IU()}),Ss=e=>(t,n)=>{let o=TU(t,e,n);return _a({type:2,toast:o}),o.id},Rn=(e,t)=>Ss("blank")(e,t),Rn.error=Ss("error"),Rn.success=Ss("success"),Rn.loading=Ss("loading"),Rn.custom=Ss("custom"),Rn.dismiss=e=>{_a({type:3,toastId:e})},Rn.remove=e=>_a({type:4,toastId:e}),Rn.promise=(e,t,n)=>{let o=Rn.loading(t.loading,F(F({},n),n?.loading));return e.then(i=>(Rn.success(Vx(t.success,i),F(F({id:o},n),n?.success)),i)).catch(i=>{Rn.error(Vx(t.error,i),F(F({id:o},n),n?.error))}),e},AU=(e,t)=>{_a({type:1,toast:{id:e,height:t}})},BU=()=>{_a({type:5,time:Date.now()})},zU=e=>{let{toasts:t,pausedAt:n}=DU(e);(0,Wh.useEffect)(()=>{if(n)return;let l=Date.now(),u=t.map(c=>{if(c.duration===1/0)return;let d=(c.duration||0)+c.pauseDuration-(l-c.createdAt);if(d<0){c.visible&&Rn.dismiss(c.id);return}return setTimeout(()=>Rn.dismiss(c.id),d)});return()=>{u.forEach(c=>c&&clearTimeout(c))}},[t,n]);let o=(0,Wh.useCallback)(()=>{n&&_a({type:6,time:Date.now()})},[n]),i=(0,Wh.useCallback)((l,u)=>{let{reverseOrder:c=!1,gutter:d=8,defaultPosition:p}=u||{},h=t.filter(m=>(m.position||p)===(l.position||p)&&m.height),b=h.findIndex(m=>m.id===l.id),g=h.filter((m,y)=>y<b&&m.visible).length;return h.filter(m=>m.visible).slice(...c?[g+1]:[0,g]).reduce((m,y)=>m+(y.height||0)+d,0)},[t]);return{toasts:t,handlers:{updateHeight:AU,startPause:BU,endPause:o,calculateOffset:i}}},Ux=Rn});function qU(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}function pse(e){Ni=e}function Ut(e,t){if(t){if(UU.test(e))return e.replace(HU,Hx)}else if($U.test(e))return e.replace(WU,Hx);return e}function MU(e){return e.replace(YU,(t,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}function st(e,t){e=typeof e=="string"?e:e.source,t=t||"";let n={replace:(o,i)=>(i=i.source||i,i=i.replace(QU,"$1"),e=e.replace(o,i),n),getRegex:()=>new RegExp(e,t)};return n}function RU(e,t,n){if(e){let o;try{o=decodeURIComponent(MU(n)).replace(XU,"").toLowerCase()}catch{return null}if(o.indexOf("javascript:")===0||o.indexOf("vbscript:")===0||o.indexOf("data:")===0)return null}t&&!JU.test(n)&&(n=hse(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}function hse(e,t){Mc[" "+e]||(ZU.test(e)?Mc[" "+e]=e+"/":Mc[" "+e]=Yh(e,"/",!0)),e=Mc[" "+e];let n=e.indexOf(":")===-1;return t.substring(0,2)==="//"?n?t:e.replace(eH,"$1")+t:t.charAt(0)==="/"?n?t:e.replace(tH,"$1")+t:e+t}function Ur(e){let t=1,n,o;for(;t<arguments.length;t++){n=arguments[t];for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}function FU(e,t){let n=e.replace(/\|/g,(l,u,c)=>{let d=!1,p=u;for(;--p>=0&&c[p]==="\\";)d=!d;return d?"|":" |"}),o=n.split(/ \|/),i=0;if(o[0].trim()||o.shift(),o.length>0&&!o[o.length-1].trim()&&o.pop(),o.length>t)o.splice(t);else for(;o.length<t;)o.push("");for(;i<o.length;i++)o[i]=o[i].trim().replace(/\\\|/g,"|");return o}function Yh(e,t,n){let o=e.length;if(o===0)return"";let i=0;for(;i<o;){let l=e.charAt(o-i-1);if(l===t&&!n)i++;else if(l!==t&&n)i++;else break}return e.slice(0,o-i)}function mse(e,t){if(e.indexOf(t[1])===-1)return-1;let n=e.length,o=0,i=0;for(;i<n;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])o++;else if(e[i]===t[1]&&(o--,o<0))return i;return-1}function LU(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function NU(e,t){if(t<1)return"";let n="";for(;t>1;)t&1&&(n+=e),t>>=1,e+=e;return n+e}function VU(e,t,n,o){let i=t.href,l=t.title?Ut(t.title):null,u=e[1].replace(/\\([\[\]])/g,"$1");if(e[0].charAt(0)!=="!"){o.state.inLink=!0;let c={type:"link",raw:n,href:i,title:l,text:u,tokens:o.inlineTokens(u)};return o.state.inLink=!1,c}return{type:"image",raw:n,href:i,title:l,text:Ut(u)}}function gse(e,t){let n=e.match(/^(\s+)(?:```)/);if(n===null)return t;let o=n[1];return t.split(`
`).map(i=>{let l=i.match(/^\s+/);if(l===null)return i;let[u]=l;return u.length>=o.length?i.slice(o.length):i}).join(`
`)}function vse(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function KU(e){let t="",n,o,i=e.length;for(n=0;n<i;n++)o=e.charCodeAt(n),Math.random()>.5&&(o="x"+o.toString(16)),t+="&#"+o+";";return t}function Re(e,t,n){if(typeof e>"u"||e===null)throw new Error("marked(): input parameter is undefined or null");if(typeof e!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(typeof t=="function"&&(n=t,t=null),t=Ur({},Re.defaults,t||{}),LU(t),n){let i=t.highlight,l;try{l=Vi.lex(e,t)}catch(d){return n(d)}let u=function(d){let p;if(!d)try{t.walkTokens&&Re.walkTokens(l,t.walkTokens),p=Da.parse(l,t)}catch(h){d=h}return t.highlight=i,d?n(d):n(null,p)};if(!i||i.length<3||(delete t.highlight,!l.length))return u();let c=0;Re.walkTokens(l,function(d){d.type==="code"&&(c++,setTimeout(()=>{i(d.text,d.lang,function(p,h){if(p)return u(p);h!=null&&h!==d.text&&(d.text=h,d.escaped=!0),c--,c===0&&u()})},0))}),c===0&&u();return}function o(i){if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,t.silent)return"<p>An error occurred:</p><pre>"+Ut(i.message+"",!0)+"</pre>";throw i}try{let i=Vi.lex(e,t);if(t.walkTokens){if(t.async)return Promise.all(Re.walkTokens(i,t.walkTokens)).then(()=>Da.parse(i,t)).catch(o);Re.walkTokens(i,t.walkTokens)}return Da.parse(i,t)}catch(i){o(i)}}var Ni,UU,HU,$U,WU,GU,Hx,YU,QU,XU,JU,Mc,ZU,eH,tH,Rc,Qh,Ae,ke,Vi,Xh,$x,Wx,Da,bse=w(()=>{Ni=qU(),UU=/[&<>"']/,HU=/[&<>"']/g,$U=/[<>"']|&(?!#?\w+;)/,WU=/[<>"']|&(?!#?\w+;)/g,GU={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Hx=e=>GU[e],YU=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,QU=/(^|[^\[])\^/g,XU=/[^\w:]/g,JU=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i,Mc={},ZU=/^[^:]+:\/*[^/]*$/,eH=/^([^:]+:)[\s\S]*$/,tH=/^([^:]+:\/*[^/]*)[\s\S]*$/,Rc={exec:function(){}},Qh=class{constructor(e){this.options=e||Ni}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Yh(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],o=gse(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim():t[2],text:o}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){let o=Yh(n,"#");(this.options.pedantic||!o||/ $/.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/^ *>[ \t]?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(n,[]),text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n,o,i,l,u,c,d,p,h,b,g,m,y=t[1].trim(),x=y.length>1,S={type:"list",raw:"",ordered:x,start:x?+y.slice(0,-1):"",loose:!1,items:[]};y=x?"\\d{1,9}\\".concat(y.slice(-1)):"\\".concat(y),this.options.pedantic&&(y=x?y:"[*+-]");let E=new RegExp("^( {0,3}".concat(y,")((?:[	 ][^\\n]*)?(?:\\n|$))"));for(;e&&(m=!1,!(!(t=E.exec(e))||this.rules.block.hr.test(e)));){if(n=t[0],e=e.substring(n.length),p=t[2].split(`
`,1)[0],h=e.split(`
`,1)[0],this.options.pedantic?(l=2,g=p.trimLeft()):(l=t[2].search(/[^ ]/),l=l>4?1:l,g=p.slice(l),l+=t[1].length),c=!1,!p&&/^ *$/.test(h)&&(n+=h+`
`,e=e.substring(h.length+1),m=!0),!m){let O=new RegExp("^ {0,".concat(Math.min(3,l-1),"}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))")),z=new RegExp("^ {0,".concat(Math.min(3,l-1),"}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)")),B=new RegExp("^ {0,".concat(Math.min(3,l-1),"}(?:```|~~~)")),D=new RegExp("^ {0,".concat(Math.min(3,l-1),"}#"));for(;e&&(b=e.split(`
`,1)[0],p=b,this.options.pedantic&&(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(B.test(p)||D.test(p)||O.test(p)||z.test(e)));){if(p.search(/[^ ]/)>=l||!p.trim())g+=`
`+p.slice(l);else if(!c)g+=`
`+p;else break;!c&&!p.trim()&&(c=!0),n+=b+`
`,e=e.substring(b.length+1)}}S.loose||(d?S.loose=!0:/\n *\n *$/.test(n)&&(d=!0)),this.options.gfm&&(o=/^\[[ xX]\] /.exec(g),o&&(i=o[0]!=="[ ] ",g=g.replace(/^\[[ xX]\] +/,""))),S.items.push({type:"list_item",raw:n,task:!!o,checked:i,loose:!1,text:g}),S.raw+=n}S.items[S.items.length-1].raw=n.trimRight(),S.items[S.items.length-1].text=g.trimRight(),S.raw=S.raw.trimRight();let P=S.items.length;for(u=0;u<P;u++){this.lexer.state.top=!1,S.items[u].tokens=this.lexer.blockTokens(S.items[u].text,[]);let O=S.items[u].tokens.filter(B=>B.type==="space"),z=O.every(B=>{let D=B.raw.split(""),X=0;for(let M of D)if(M===`
`&&(X+=1),X>1)return!0;return!1});!S.loose&&O.length&&z&&(S.loose=!0,S.items[u].loose=!0)}return S}}html(e){let t=this.rules.block.html.exec(e);if(t){let n={type:"html",raw:t[0],pre:!this.options.sanitizer&&(t[1]==="pre"||t[1]==="script"||t[1]==="style"),text:t[0]};if(this.options.sanitize){let o=this.options.sanitizer?this.options.sanitizer(t[0]):Ut(t[0]);n.type="paragraph",n.text=o,n.tokens=this.lexer.inline(o)}return n}}def(e){let t=this.rules.block.def.exec(e);if(t)return t[3]&&(t[3]=t[3].substring(1,t[3].length-1)),{type:"def",tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}}table(e){let t=this.rules.block.table.exec(e);if(t){let n={type:"table",header:FU(t[1]).map(o=>({text:o})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(n.header.length===n.align.length){n.raw=t[0];let o=n.align.length,i,l,u,c;for(i=0;i<o;i++)/^ *-+: *$/.test(n.align[i])?n.align[i]="right":/^ *:-+: *$/.test(n.align[i])?n.align[i]="center":/^ *:-+ *$/.test(n.align[i])?n.align[i]="left":n.align[i]=null;for(o=n.rows.length,i=0;i<o;i++)n.rows[i]=FU(n.rows[i],n.header.length).map(d=>({text:d}));for(o=n.header.length,l=0;l<o;l++)n.header[l].tokens=this.lexer.inline(n.header[l].text);for(o=n.rows.length,l=0;l<o;l++)for(c=n.rows[l],u=0;u<c.length;u++)c[u].tokens=this.lexer.inline(c[u].text);return n}}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Ut(t[1])}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):Ut(t[0]):t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;let l=Yh(n.slice(0,-1),"\\");if((n.length-l.length)%2===0)return}else{let l=mse(t[2],"()");if(l>-1){let u=(t[0].indexOf("!")===0?5:4)+t[1].length+l;t[2]=t[2].substring(0,l),t[0]=t[0].substring(0,u).trim(),t[3]=""}}let o=t[2],i="";if(this.options.pedantic){let l=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);l&&(o=l[1],i=l[3])}else i=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(n)?o=o.slice(1):o=o.slice(1,-1)),VU(t,{href:o&&o.replace(this.rules.inline._escapes,"$1"),title:i&&i.replace(this.rules.inline._escapes,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let o=(n[2]||n[1]).replace(/\s+/g," ");if(o=t[o.toLowerCase()],!o||!o.href){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return VU(n,o,n[0],this.lexer)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrong.lDelim.exec(e);if(!o||o[3]&&n.match(/[\p{L}\p{N}]/u))return;let i=o[1]||o[2]||"";if(!i||i&&(n===""||this.rules.inline.punctuation.exec(n))){let l=o[0].length-1,u,c,d=l,p=0,h=o[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+l);(o=h.exec(t))!=null;){if(u=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!u)continue;if(c=u.length,o[3]||o[4]){d+=c;continue}else if((o[5]||o[6])&&l%3&&!((l+c)%3)){p+=c;continue}if(d-=c,d>0)continue;if(c=Math.min(c,c+d+p),Math.min(l,c)%2){let g=e.slice(1,l+o.index+c);return{type:"em",raw:e.slice(0,l+o.index+c+1),text:g,tokens:this.lexer.inlineTokens(g)}}let b=e.slice(2,l+o.index+c-1);return{type:"strong",raw:e.slice(0,l+o.index+c+1),text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," "),o=/[^ ]/.test(n),i=/^ /.test(n)&&/ $/.test(n);return o&&i&&(n=n.substring(1,n.length-1)),n=Ut(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){let n=this.rules.inline.autolink.exec(e);if(n){let o,i;return n[2]==="@"?(o=Ut(this.options.mangle?t(n[1]):n[1]),i="mailto:"+o):(o=Ut(n[1]),i=o),{type:"link",raw:n[0],text:o,href:i,tokens:[{type:"text",raw:o,text:o}]}}}url(e,t){let n;if(n=this.rules.inline.url.exec(e)){let o,i;if(n[2]==="@")o=Ut(this.options.mangle?t(n[0]):n[0]),i="mailto:"+o;else{let l;do l=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0];while(l!==n[0]);o=Ut(n[0]),n[1]==="www."?i="http://"+o:i=o}return{type:"link",raw:n[0],text:o,href:i,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e,t){let n=this.rules.inline.text.exec(e);if(n){let o;return this.lexer.state.inRawBlock?o=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):Ut(n[0]):n[0]:o=Ut(this.options.smartypants?t(n[0]):n[0]),{type:"text",raw:n[0],text:o}}}},Ae={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Rc,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/},Ae._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ae._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,Ae.def=st(Ae.def).replace("label",Ae._label).replace("title",Ae._title).getRegex(),Ae.bullet=/(?:[*+-]|\d{1,9}[.)])/,Ae.listItemStart=st(/^( *)(bull) */).replace("bull",Ae.bullet).getRegex(),Ae.list=st(Ae.list).replace(/bull/g,Ae.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+Ae.def.source+")").getRegex(),Ae._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ae._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,Ae.html=st(Ae.html,"i").replace("comment",Ae._comment).replace("tag",Ae._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ae.paragraph=st(Ae._paragraph).replace("hr",Ae.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ae._tag).getRegex(),Ae.blockquote=st(Ae.blockquote).replace("paragraph",Ae.paragraph).getRegex(),Ae.normal=Ur({},Ae),Ae.gfm=Ur({},Ae.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),Ae.gfm.table=st(Ae.gfm.table).replace("hr",Ae.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ae._tag).getRegex(),Ae.gfm.paragraph=st(Ae._paragraph).replace("hr",Ae.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",Ae.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ae._tag).getRegex(),Ae.pedantic=Ur({},Ae.normal,{html:st(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ae._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Rc,paragraph:st(Ae.normal._paragraph).replace("hr",Ae.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ae.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()}),ke={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Rc,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Rc,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/},ke._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",ke.punctuation=st(ke.punctuation).replace(/punctuation/g,ke._punctuation).getRegex(),ke.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,ke.escapedEmSt=/\\\*|\\_/g,ke._comment=st(Ae._comment).replace("(?:-->|$)","-->").getRegex(),ke.emStrong.lDelim=st(ke.emStrong.lDelim).replace(/punct/g,ke._punctuation).getRegex(),ke.emStrong.rDelimAst=st(ke.emStrong.rDelimAst,"g").replace(/punct/g,ke._punctuation).getRegex(),ke.emStrong.rDelimUnd=st(ke.emStrong.rDelimUnd,"g").replace(/punct/g,ke._punctuation).getRegex(),ke._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,ke._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,ke._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,ke.autolink=st(ke.autolink).replace("scheme",ke._scheme).replace("email",ke._email).getRegex(),ke._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,ke.tag=st(ke.tag).replace("comment",ke._comment).replace("attribute",ke._attribute).getRegex(),ke._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,ke._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,ke._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,ke.link=st(ke.link).replace("label",ke._label).replace("href",ke._href).replace("title",ke._title).getRegex(),ke.reflink=st(ke.reflink).replace("label",ke._label).replace("ref",Ae._label).getRegex(),ke.nolink=st(ke.nolink).replace("ref",Ae._label).getRegex(),ke.reflinkSearch=st(ke.reflinkSearch,"g").replace("reflink",ke.reflink).replace("nolink",ke.nolink).getRegex(),ke.normal=Ur({},ke),ke.pedantic=Ur({},ke.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:st(/^!?\[(label)\]\((.*?)\)/).replace("label",ke._label).getRegex(),reflink:st(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ke._label).getRegex()}),ke.gfm=Ur({},ke.normal,{escape:st(ke.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),ke.gfm.url=st(ke.gfm.url,"i").replace("email",ke.gfm._extended_email).getRegex(),ke.breaks=Ur({},ke.gfm,{br:st(ke.br).replace("{2,}","*").getRegex(),text:st(ke.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()}),Vi=class yS{constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ni,this.options.tokenizer=this.options.tokenizer||new Qh,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={block:Ae.normal,inline:ke.normal};this.options.pedantic?(n.block=Ae.pedantic,n.inline=ke.pedantic):this.options.gfm&&(n.block=Ae.gfm,this.options.breaks?n.inline=ke.breaks:n.inline=ke.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ae,inline:ke}}static lex(t,n){return new yS(n).lex(t)}static lexInline(t,n){return new yS(n).inlineTokens(t)}lex(t){t=t.replace(/\r\n|\r/g,`
`),this.blockTokens(t,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(t,n=[]){this.options.pedantic?t=t.replace(/\t/g,"    ").replace(/^ +$/gm,""):t=t.replace(/^( *)(\t+)/gm,(c,d,p)=>d+"    ".repeat(p.length));let o,i,l,u;for(;t;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(c=>(o=c.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))){if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length),o.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+o.raw,i.text+=`
`+o.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+o.raw,i.text+=`
`+o.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(l=t,this.options.extensions&&this.options.extensions.startBlock){let c=1/0,d=t.slice(1),p;this.options.extensions.startBlock.forEach(function(h){p=h.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(o=this.tokenizer.paragraph(l))){i=n[n.length-1],u&&i.type==="paragraph"?(i.raw+=`
`+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(o),u=l.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(o);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let o,i,l,u=t,c,d,p;if(this.tokens.links){let h=Object.keys(this.tokens.links);if(h.length>0)for(;(c=this.tokenizer.rules.inline.reflinkSearch.exec(u))!=null;)h.includes(c[0].slice(c[0].lastIndexOf("[")+1,-1))&&(u=u.slice(0,c.index)+"["+NU("a",c[0].length-2)+"]"+u.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(c=this.tokenizer.rules.inline.blockSkip.exec(u))!=null;)u=u.slice(0,c.index)+"["+NU("a",c[0].length-2)+"]"+u.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(c=this.tokenizer.rules.inline.escapedEmSt.exec(u))!=null;)u=u.slice(0,c.index)+"++"+u.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;t;)if(d||(p=""),d=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(h=>(o=h.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))){if(o=this.tokenizer.escape(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.tag(t)){t=t.substring(o.raw.length),i=n[n.length-1],i&&o.type==="text"&&i.type==="text"?(i.raw+=o.raw,i.text+=o.text):n.push(o);continue}if(o=this.tokenizer.link(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(o.raw.length),i=n[n.length-1],i&&o.type==="text"&&i.type==="text"?(i.raw+=o.raw,i.text+=o.text):n.push(o);continue}if(o=this.tokenizer.emStrong(t,u,p)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.codespan(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.br(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.del(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.autolink(t,KU)){t=t.substring(o.raw.length),n.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(t,KU))){t=t.substring(o.raw.length),n.push(o);continue}if(l=t,this.options.extensions&&this.options.extensions.startInline){let h=1/0,b=t.slice(1),g;this.options.extensions.startInline.forEach(function(m){g=m.call({lexer:this},b),typeof g=="number"&&g>=0&&(h=Math.min(h,g))}),h<1/0&&h>=0&&(l=t.substring(0,h+1))}if(o=this.tokenizer.inlineText(l,vse)){t=t.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(p=o.raw.slice(-1)),d=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=o.raw,i.text+=o.text):n.push(o);continue}if(t){let h="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return n}},Xh=class{constructor(e){this.options=e||Ni}code(e,t,n){let o=(t||"").match(/\S*/)[0];if(this.options.highlight){let i=this.options.highlight(e,o);i!=null&&i!==e&&(n=!0,e=i)}return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="'+this.options.langPrefix+Ut(o,!0)+'">'+(n?e:Ut(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:Ut(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
`.concat(e,`</blockquote>
`)}html(e){return e}heading(e,t,n,o){if(this.options.headerIds){let i=this.options.headerPrefix+o.slug(n);return"<h".concat(t,' id="').concat(i,'">').concat(e,"</h").concat(t,`>
`)}return"<h".concat(t,">").concat(e,"</h").concat(t,`>
`)}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,t,n){let o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
`+e+"</"+o+`>
`}listitem(e){return"<li>".concat(e,`</li>
`)}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>".concat(e,`</p>
`)}table(e,t){return t&&(t="<tbody>".concat(t,"</tbody>")),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
`.concat(e,`</tr>
`)}tablecell(e,t){let n=t.header?"th":"td";return(t.align?"<".concat(n,' align="').concat(t.align,'">'):"<".concat(n,">"))+e+"</".concat(n,`>
`)}strong(e){return"<strong>".concat(e,"</strong>")}em(e){return"<em>".concat(e,"</em>")}codespan(e){return"<code>".concat(e,"</code>")}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>".concat(e,"</del>")}link(e,t,n){if(e=RU(this.options.sanitize,this.options.baseUrl,e),e===null)return n;let o='<a href="'+Ut(e)+'"';return t&&(o+=' title="'+t+'"'),o+=">"+n+"</a>",o}image(e,t,n){if(e=RU(this.options.sanitize,this.options.baseUrl,e),e===null)return n;let o='<img src="'.concat(e,'" alt="').concat(n,'"');return t&&(o+=' title="'.concat(t,'"')),o+=this.options.xhtml?"/>":">",o}text(e){return e}},$x=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}},Wx=class{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let n=e,o=0;if(this.seen.hasOwnProperty(n)){o=this.seen[e];do o++,n=e+"-"+o;while(this.seen.hasOwnProperty(n))}return t||(this.seen[e]=o,this.seen[n]=0),n}slug(e,t={}){let n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)}},Da=class xS{constructor(t){this.options=t||Ni,this.options.renderer=this.options.renderer||new Xh,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new $x,this.slugger=new Wx}static parse(t,n){return new xS(n).parse(t)}static parseInline(t,n){return new xS(n).parseInline(t)}parse(t,n=!0){let o="",i,l,u,c,d,p,h,b,g,m,y,x,S,E,P,O,z,B,D,X=t.length;for(i=0;i<X;i++){if(m=t[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[m.type]&&(D=this.options.extensions.renderers[m.type].call({parser:this},m),D!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(m.type))){o+=D||"";continue}switch(m.type){case"space":continue;case"hr":{o+=this.renderer.hr();continue}case"heading":{o+=this.renderer.heading(this.parseInline(m.tokens),m.depth,MU(this.parseInline(m.tokens,this.textRenderer)),this.slugger);continue}case"code":{o+=this.renderer.code(m.text,m.lang,m.escaped);continue}case"table":{for(b="",h="",c=m.header.length,l=0;l<c;l++)h+=this.renderer.tablecell(this.parseInline(m.header[l].tokens),{header:!0,align:m.align[l]});for(b+=this.renderer.tablerow(h),g="",c=m.rows.length,l=0;l<c;l++){for(p=m.rows[l],h="",d=p.length,u=0;u<d;u++)h+=this.renderer.tablecell(this.parseInline(p[u].tokens),{header:!1,align:m.align[u]});g+=this.renderer.tablerow(h)}o+=this.renderer.table(b,g);continue}case"blockquote":{g=this.parse(m.tokens),o+=this.renderer.blockquote(g);continue}case"list":{for(y=m.ordered,x=m.start,S=m.loose,c=m.items.length,g="",l=0;l<c;l++)P=m.items[l],O=P.checked,z=P.task,E="",P.task&&(B=this.renderer.checkbox(O),S?P.tokens.length>0&&P.tokens[0].type==="paragraph"?(P.tokens[0].text=B+" "+P.tokens[0].text,P.tokens[0].tokens&&P.tokens[0].tokens.length>0&&P.tokens[0].tokens[0].type==="text"&&(P.tokens[0].tokens[0].text=B+" "+P.tokens[0].tokens[0].text)):P.tokens.unshift({type:"text",text:B}):E+=B),E+=this.parse(P.tokens,S),g+=this.renderer.listitem(E,z,O);o+=this.renderer.list(g,y,x);continue}case"html":{o+=this.renderer.html(m.text);continue}case"paragraph":{o+=this.renderer.paragraph(this.parseInline(m.tokens));continue}case"text":{for(g=m.tokens?this.parseInline(m.tokens):m.text;i+1<X&&t[i+1].type==="text";)m=t[++i],g+=`
`+(m.tokens?this.parseInline(m.tokens):m.text);o+=n?this.renderer.paragraph(g):g;continue}default:{let M='Token with "'+m.type+'" type was not found.';if(this.options.silent){console.error(M);return}else throw new Error(M)}}}return o}parseInline(t,n){n=n||this.renderer;let o="",i,l,u,c=t.length;for(i=0;i<c;i++){if(l=t[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[l.type]&&(u=this.options.extensions.renderers[l.type].call({parser:this},l),u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(l.type))){o+=u||"";continue}switch(l.type){case"escape":{o+=n.text(l.text);break}case"html":{o+=n.html(l.text);break}case"link":{o+=n.link(l.href,l.title,this.parseInline(l.tokens,n));break}case"image":{o+=n.image(l.href,l.title,l.text);break}case"strong":{o+=n.strong(this.parseInline(l.tokens,n));break}case"em":{o+=n.em(this.parseInline(l.tokens,n));break}case"codespan":{o+=n.codespan(l.text);break}case"br":{o+=n.br();break}case"del":{o+=n.del(this.parseInline(l.tokens,n));break}case"text":{o+=n.text(l.text);break}default:{let d='Token with "'+l.type+'" type was not found.';if(this.options.silent){console.error(d);return}else throw new Error(d)}}}return o}},Re.options=Re.setOptions=function(e){return Ur(Re.defaults,e),pse(Re.defaults),Re},Re.getDefaults=qU,Re.defaults=Ni,Re.use=function(...e){let t=Ur({},...e),n=Re.defaults.extensions||{renderers:{},childTokens:{}},o;e.forEach(i=>{if(i.extensions&&(o=!0,i.extensions.forEach(l=>{if(!l.name)throw new Error("extension name required");if(l.renderer){let u=n.renderers?n.renderers[l.name]:null;u?n.renderers[l.name]=function(...c){let d=l.renderer.apply(this,c);return d===!1&&(d=u.apply(this,c)),d}:n.renderers[l.name]=l.renderer}if(l.tokenizer){if(!l.level||l.level!=="block"&&l.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");n[l.level]?n[l.level].unshift(l.tokenizer):n[l.level]=[l.tokenizer],l.start&&(l.level==="block"?n.startBlock?n.startBlock.push(l.start):n.startBlock=[l.start]:l.level==="inline"&&(n.startInline?n.startInline.push(l.start):n.startInline=[l.start]))}l.childTokens&&(n.childTokens[l.name]=l.childTokens)})),i.renderer){let l=Re.defaults.renderer||new Xh;for(let u in i.renderer){let c=l[u];l[u]=(...d)=>{let p=i.renderer[u].apply(l,d);return p===!1&&(p=c.apply(l,d)),p}}t.renderer=l}if(i.tokenizer){let l=Re.defaults.tokenizer||new Qh;for(let u in i.tokenizer){let c=l[u];l[u]=(...d)=>{let p=i.tokenizer[u].apply(l,d);return p===!1&&(p=c.apply(l,d)),p}}t.tokenizer=l}if(i.walkTokens){let l=Re.defaults.walkTokens;t.walkTokens=function(u){let c=[];return c.push(i.walkTokens.call(this,u)),l&&(c=c.concat(l.call(this,u))),c}}o&&(t.extensions=n),Re.setOptions(t)})},Re.walkTokens=function(e,t){let n=[];for(let o of e)switch(n=n.concat(t.call(Re,o)),o.type){case"table":{for(let i of o.header)n=n.concat(Re.walkTokens(i.tokens,t));for(let i of o.rows)for(let l of i)n=n.concat(Re.walkTokens(l.tokens,t));break}case"list":{n=n.concat(Re.walkTokens(o.items,t));break}default:Re.defaults.extensions&&Re.defaults.extensions.childTokens&&Re.defaults.extensions.childTokens[o.type]?Re.defaults.extensions.childTokens[o.type].forEach(function(i){n=n.concat(Re.walkTokens(o[i],t))}):o.tokens&&(n=n.concat(Re.walkTokens(o.tokens,t)))}return n},Re.parseInline=function(e,t){if(typeof e>"u"||e===null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof e!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");t=Ur({},Re.defaults,t||{}),LU(t);try{let n=Vi.lexInline(e,t);return t.walkTokens&&Re.walkTokens(n,t.walkTokens),Da.parseInline(n,t)}catch(n){if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,t.silent)return"<p>An error occurred:</p><pre>"+Ut(n.message+"",!0)+"</pre>";throw n}},Re.Parser=Da,Re.parser=Da.parse,Re.Renderer=Xh,Re.TextRenderer=$x,Re.Lexer=Vi,Re.lexer=Vi.lex,Re.Tokenizer=Qh,Re.Slugger=Wx,Re.parse=Re,Re.options,Re.setOptions,Re.use,Re.walkTokens,Re.parseInline,Da.parse,Vi.lex}),jn,Jh,Zh,Gx,nH,rH,oH,Yx,aH,iH,lH,Qx,sH,uH,cH,dH,fH,Fc,em,pH,hH,mH,gH,vH,bH,yH,Xx,Jx=w(()=>{jn=V(H()),fse(),fe(),tt(),_e(),bse(),Jp(),EK(),Jh=({title:e,message:t})=>"".concat(e," ").concat(t),Zh=(()=>{let e=new Map;return{add:t=>{let n=Jh(t);e.has(n)?e.set(n,e.get(n)+1):e.set(n,1)},delete:t=>{let n=Jh(t);e.has(n)&&e.get(n)>1?e.set(n,e.get(n)-1):e.delete(n)},clear:()=>{e.clear()},check:t=>e.has(Jh(t))}})(),Gx=(()=>{let e=new Map;return{add:t=>{e.has(t)?e.set(t,e.get(t)+1):e.set(t,1)},delete:t=>{e.has(t)&&e.get(t)>1?e.set(t,e.get(t)-1):e.delete(t)},clear:()=>{e.clear()},check:t=>e.has(t),get types(){return Array.of(...e.keys())}}})(),rH=C.div(nH||(nH=j([`
  width: 100%;
  border-radius: 4px;
  display: flex;
  gap: 12px;
  `,`;
  background-color: rgba(40, 43, 47, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(14px);

  @supports not (backdrop-filter: blur()) {
    background: rgba(40, 43, 47, 0.95);
  }
`])),Qe),Yx=C.div(oH||(oH=j([`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`]))),iH=C.div(aH||(aH=j([`
  flex: 1;
  flex-direction: column;
  width: 0;
  display: flex;
  padding: 16px 0;
  gap: 12px;
`]))),Qx=C.div(lH||(lH=j([`
  color: #b4b4b4;
  font-size: 12px;
  line-height: 1.4;

  a {
    color: rgba(255, 255, 255, 0.9);
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
    color: #d5d5d5;
  }

  p {
    margin-bottom: 8px;
  }

  code {
    font-family: monospace;
    background: rgba(0, 0, 0, 0.3);
    padding: 1px 1px 2px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    white-space: pre-wrap;
  }

  pre > code {
    white-space: pre;
    display: block;
    overflow: auto;
    padding: 4px;
  }

  pre {
    white-space: pre-wrap;
    margin-bottom: 8px;
  }
`]))),uH=C.button(sH||(sH=j([`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding-left: 12px;
  padding-right: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`]))),cH={info:"#3b82f6",success:"#10b981",warning:"#f59e0b",error:"#ef4444"},fH=C.div(dH||(dH=j([`
  display: flex;
  justify-content: center;
  margin-left: 12px;
  padding-top: 21px;

  ::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 999999px;
    background-color: `,`;
  }
`])),({type:e})=>cH[e]),Fc=e=>(t,n,o=[],i=!1)=>{(i||!Zh.check({title:t,message:n}))&&(Zh.add({title:t,message:n}),Gx.add(e),Ux.custom(l=>jn.default.createElement(rH,null,jn.default.createElement(fH,{type:e}),jn.default.createElement(iH,null,jn.default.createElement(Yx,null,t),jn.default.createElement(Qx,{dangerouslySetInnerHTML:{__html:Re.parse(n)}}),o.length>0&&jn.default.createElement(Qx,null,jn.default.createElement("span",null,"Docs:"," ",o.map((u,c)=>jn.default.createElement(jn.Fragment,{key:c},c>0&&", ",jn.default.createElement("a",{target:"_blank",href:u.url},u.title)))))),jn.default.createElement(uH,{onClick:()=>{Ux.remove(l.id),Zh.delete({title:t,message:n}),Gx.delete(e)}},"Close")),{duration:1/0}))},em={warning:Fc("warning"),success:Fc("success"),info:Fc("info"),error:Fc("error")},C.div(pH||(pH=j([`
  display: flex;
  justify-content: `,`;
  gap: 12px;
`])),({align:e})=>e==="center"?"center":"flex-end"),C.button(hH||(hH=j([`
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  `,`;
  background-color: rgba(40, 43, 47, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(14px);
  border: none;
  padding: 12px;
  color: #fff;
  overflow: hidden;

  ::before {
    content: '';
    position: absolute;
    inset: 0;
  }

  :hover::before {
    background: `,`;
  }

  @supports not (backdrop-filter: blur()) {
    background: rgba(40, 43, 47, 0.95);
  }
`])),Qe,({danger:e})=>e?"rgba(255, 0, 0, 0.1)":"rgba(255, 255, 255, 0.1)"),C.div(mH||(mH=j([`
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: fixed;
  right: 92px;
  top: 50px;
  width: 500px;
  height: 85vh;
  min-height: 400px;
`]))),C.div(gH||(gH=j([`
  overflow: hidden;
  pointer-events: auto;
  border-radius: 4px;

  & > div {
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    overflow: scroll;
    height: 100%;
  }
`]))),bH=C.div(vH||(vH=j([`
  width: fit-content;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #b4b4b4;
  font-size: 12px;
  line-height: 1.4;
`]))),yH=()=>{let{hasNotifications:e}=Xx();return Qp({enabled:!e},()=>jn.default.createElement(_x,null,jn.default.createElement(bH,null,jn.default.createElement(Yx,null,"No notifications"),"Notifications will appear here when you get them.")))},Xx=()=>{let{toasts:e}=zU();return{hasNotifications:e.length>0}}}),gn,xH,kH,wH,SH,EH,PH,IH,jH,CH,Zx,OH,_H,yse=w(()=>{_e(),Pe(),gn=V(H()),fe(),Jp(),Wle(),Cx(),xH=ge.requireDist(),tU(),ise(),$f(),sse(),cse(),Ar(),dse(),Jx(),wH=C.div(kH||(kH=j([`
  height: 36px;
  pointer-events: none;

  display: flex;
  justify-content: space-between;
  padding: 12px;
`]))),EH=C.div(SH||(SH=j([`
  color: white;
  width: 14px;
  height: 14px;
  background: #d00;
  border-radius: 4px;
  text-align: center;
  line-height: 14px;
  font-weight: 600;
  font-size: 8px;
  position: relative;
  left: -6px;
  top: -11px;
  margin-right: -14px;
  box-shadow: 0 4px 6px -4px #00000059;
`]))),IH=C.div(PH||(PH=j([`
  display: flex;
  gap: 8px;
`]))),C.div(jH||(jH=j([`
  position: absolute;
  background: `,`;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  right: -2px;
  top: -2px;
`])),({type:e})=>e==="info"?"#40aaa4":"#f59e0b"),C.div(CH||(CH=j([`
  position: absolute;
  height: 32px;
  width: 1px;
  background: #373b40;
  opacity: 0.4;
`]))),Zx=!1,OH=()=>{var e;let t=Ne(()=>{let h=(0,xH.val)(Z().atomP.ephemeral.coreByProject);return Object.entries(h).map(([b,g])=>({projectId:b,state:g})).filter(({state:b})=>b.loadingState.type==="browserStateIsNotBasedOnDiskState")},[]),[n,o]=Qp({enabled:t.length>0,enterDelay:t.length>0?0:200},()=>t.length>0?gn.default.createElement(vK,null,t.length===1?'There is a state conflict in project "'.concat(t[0].projectId,'". Select the project in the outline below in order to fix it.'):"There are ".concat(t.length," projects that have state conflicts. They are highlighted in the outline below. ")):gn.default.createElement(Uh,null,gn.default.createElement(gn.default.Fragment,null,"Outline"))),i=(e=Me(Z().atomP.ahistoric.pinOutline))!=null?e:!0,l=Me(Z().atomP.ahistoric.updateChecker.result.hasUpdates)===!0;Tn(()=>{let h=u.current.getBoundingClientRect();return{debugName:"More Menu",constraints:{maxX:h.right,maxY:8,minX:h.left-140,minY:8},verticalGap:2}},()=>gn.default.createElement(EU,null));let u=(0,gn.useRef)(null);(0,gn.useMemo)(()=>(window.__IS_VISUAL_REGRESSION_TESTING&&(Zx||(Zx=!0,console.warn("Visual regression testing enabled, so we're showing the updates badge unconditionally"))),l||window.__IS_VISUAL_REGRESSION_TESTING?!0:l),[l]);let{hasNotifications:c}=Xx(),[d,p]=yH();return gn.default.createElement(wH,null,gn.default.createElement(IH,null,n,gn.default.createElement(aU,{ref:o,"data-testid":"OutlinePanel-TriggerButton",onClick:()=>{Z().transaction(({stateEditors:h,drafts:b})=>{var g;h.studio.ahistoric.setPinOutline(!((g=b.ahistoric.pinOutline)==null||g))})},icon:gn.default.createElement(G_,null),pinHintIcon:gn.default.createElement(lU,null),unpinHintIcon:gn.default.createElement(iU,null),pinned:i}),t.length>0?gn.default.createElement(EH,null,t.length):null,gn.default.createElement(zx,{showLeftDivider:!0,toolbarId:"global"})))},_H=OH}),DH,Lc,TH,Nc,AH,BH,zH,qH,MH=w(()=>{DH=ge.requireDist(),_e(),Lc=V(H()),TH=V(Io()),Nc=new DH.Atom({set:{},byId:{}}),AH=1,BH=()=>{let e=AH++;function t(o,i,l){Nc.reduce(u=>({byId:ne(F({},u.byId),{[e]:{comp:o,props:i,portalNode:l}}),set:ne(F({},u.set),{[e]:!0})}))}function n(){Nc.reduce(o=>{let i=F({},o.set),l=F({},o.byId);return delete i[e],{byId:l,set:i}})}return{mountOrRender:t,unmount:n}},zH=()=>{let e=Object.keys(Me(Nc.pointer.set));return Lc.default.createElement(Lc.default.Fragment,null,e.map(t=>Lc.default.createElement(qH,{key:"id-"+t,id:t})))},qH=({id:e})=>{let{comp:t,portalNode:n,props:o}=Me(Nc.pointer.byId[e]);return(0,TH.createPortal)(Lc.default.createElement(t,F({},o)),n)}});function xse(e){let t=Z(),[n,o]=$e(void 0),i=iF();i.configureLogging({min:128,dev:tk,internal:tk});let l=i.getLogger().named("Theatre.js UIRoot");kle();let u=Me(t.atomP.ahistoric.visibilityState);return(0,vn.useEffect)(()=>(u==="everythingIsHidden"&&console.warn("Theatre.js Studio is hidden. Use the keyboard shortcut 'alt + \\' to restore the studio, or call studio.ui.restore()."),()=>{}),[u]),Ne(()=>{let c=(0,ek.val)(t.atomP.ahistoric.visibilityState);return(0,ek.val)(t.atomP.ephemeral.initialised)?vn.default.createElement(t4,{logger:l},vn.default.createElement(D8,null,vn.default.createElement(gre,null,vn.default.createElement(KH,null),vn.default.createElement(Bl.Provider,{value:o},vn.default.createElement(lb,{target:window.__IS_VISUAL_REGRESSION_TESTING===!0?void 0:e.containerShadow},vn.default.createElement(vn.default.Fragment,null,vn.default.createElement(FH,null),vn.default.createElement(NH,{className:c==="everythingIsHidden"?"invisible":""},vn.default.createElement(ib,{ref:n}),vn.default.createElement(_H,null),vn.default.createElement(fK,null)))))))):null},[t,n,o])}var ek,vn,RH,FH,LH,NH,VH,tk,KH,kse=w(()=>{Pe(),_e(),ek=ge.requireDist(),vn=V(H()),fe(),$le(),yse(),Ze(),di(),sx(),un(),T8(),Cb(),MH(),tt(),Ph(),pi(),FH=typeof window<"u"?Q5(RH||(RH=j([`
  :host {
    contain: strict;
  }
`]))):{},NH=C(e4)(LH||(LH=j([`
  z-index: 50;
  position: fixed;
  inset: 0;

  &.invisible {
    pointer-events: none !important;
    opacity: 0;
    transform: translateX(1000000px);
  }
`]))),tk=/Playground.+Theatre\.js/.test((VH=typeof document<"u"?document?.title:null)!=null?VH:""),KH=()=>vn.default.createElement(zH,null)}),wse=Te(e=>{var t=Io();e.createRoot=t.createRoot,e.hydrateRoot=t.hydrateRoot}),UH={};SS(UH,{default:()=>WH});var HH,$H,WH,Sse=w(()=>{kse(),HH=V(H()),$H=V(wse()),MH(),tt(),tU(),WH=class{constructor(){Je(this,"containerEl",document.createElement("div")),Je(this,"_renderTimeout"),Je(this,"_documentBodyUIIsRenderedIn"),Je(this,"containerShadow"),this.containerEl.id="theatrejs-studio-root",this.containerEl.style.cssText=`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      z-index: 100;
    `;let e=()=>{if(window.__IS_VISUAL_REGRESSION_TESTING===!0){let t=document.createElement("div");return t.id="theatrejs-faux-shadow-root",document.body.appendChild(t),t}else return this.containerEl.attachShadow({mode:"open"})};this.containerShadow=e()}render(){let e=()=>{if(!document.body){this._renderTimeout=setTimeout(e,5);return}this._renderTimeout=void 0,this._documentBodyUIIsRenderedIn=document.body,this._documentBodyUIIsRenderedIn.appendChild(this.containerEl),$H.default.createRoot(this.containerShadow).render(HH.default.createElement(xse,{containerShadow:this.containerShadow}))};this._renderTimeout=setTimeout(e,10)}renderToolset(e,t){let n=BH();return n.mountOrRender(Fne(zx),{toolbarId:e},t),n.unmount}}}),Ese=Te(e=>{e.compare=i,e.reduce=l;var t,n,o;e.REMOVE=t=-1,e.ADD=n=1,e.EQUAL=o=0;function i(h,b){var g=h.length,m=b.length,y=u(h,b),x=y<g&&y<m?c(h,b):0,S=x+y-1;g-=S,m-=S;for(var E=p(g,m),P=g-1;P>=0;--P)for(var O=m-1;O>=0;--O)E[O][P]=d(E,h,b,y,P,O);return{prefix:y,matrix:E,suffix:x}}function l(h,b,g){var m,y,x,S,E=g.matrix,P=g.prefix;for(m=0;m<P;++m)b=h(b,o,m,m);for(x=m,P=E.length,m=0,y=0;m<P;)switch(S=E[m][y].type,b=h(b,S,m+x,y+x),S){case o:++m,++y;break;case t:++y;break;case n:++m;break}for(m+=x,y+=x,P=g.suffix,x=0;x<P;++x)b=h(b,o,m+x,y+x);return b}function u(h,b){for(var g=0,m=Math.min(h.length,b.length);g<m&&h[g]===b[g];)++g;return g}function c(h,b){for(var g=h.length-1,m=b.length-1,y=Math.min(g,m),x=0;x<y&&h[g-x]===b[m-x];)++x;return x}function d(h,b,g,m,y,x){return b[y+m]===g[x+m]?{value:h[x+1][y+1].value,type:o}:h[x][y+1].value<h[x+1][y].value?{value:h[x][y+1].value+1,type:t}:{value:h[x+1][y].value+1,type:n}}function p(h,b){var g=[],m,y,x;for(x=g[b]=[],y=0;y<h;++y)x[y]={value:h-y,type:t};for(m=0;m<b;++m)g[m]=[],g[m][h]={value:b-m,type:n};return g[b][h]={value:0,type:o},g}}),GH=Te(e=>{e.cons=t,e.tail=n,e.map=o;function t(i,l){var u=l.length,c=new Array(u+1);c[0]=i;for(var d=0;d<u;++d)c[d+1]=l[d];return c}function n(i){for(var l=i.length-1,u=new Array(l),c=0;c<l;++c)u[c]=i[c+1];return u}function o(i,l){for(var u=new Array(l.length),c=0;c<l.length;++c)u[c]=i(l[c]);return u}}),Pse=Te((e,t)=>{t.exports=u;var n=/\/|~1|~0/g,o="/",i="~",l="~1";function u(c,d){var p,h,b,g;for(p=c.charAt(0)===o?1:0,h="",n.lastIndex=p;b=n.exec(c);)if(g=b[0],h+=c.slice(p,n.lastIndex-g.length),p=n.lastIndex,g===o){if(d(h)===!1)return c;h=""}else h+=g===l?o:i;return h+=c.slice(p),d(h),c}}),nk=Te(e=>{var t=Pse();e.find=h,e.join=g,e.absolute=b,e.parse=m,e.contains=y,e.encodeSegment=S,e.decodeSegment=x,e.parseArrayIndex=O,e.isValidArrayIndex=P;var n="/",o=/\//g,i="~1",l=/~1/g,u="~",c=/~/g,d="~0",p=/~0/g;function h(B,D,X,M){if(typeof D=="string"){if(D==="")return{target:B,key:void 0};if(D===n)return{target:B,key:""};var _=B,L,U=M!==void 0;return t(D,function(N){if(B==null)return _=null,!1;Array.isArray(B)?L=U?z(X,O(N),B,M):N==="-"?N:O(N):L=N,_=B,B=B[L]}),_===null?void 0:{target:_,key:L}}}function b(B){return B[0]===n?B:n+B}function g(B){return B.join(n)}function m(B){var D=[];return t(B,D.push.bind(D)),D}function y(B,D){return D.indexOf(B)===0&&D[B.length]===n}function x(B){return B.replace(l,n).replace(p,u)}function S(B){return B.replace(c,d).replace(o,i)}var E=/^(0|[1-9]\d*)$/;function P(B){return E.test(B)}function O(B){if(P(B))return+B;throw new SyntaxError("invalid array index "+B)}function z(B,D,X,M){var _=D;if(_<0)throw new Error("array index out of bounds "+_);if(M!==void 0&&typeof B=="function"&&(_=B(D,X,M),_<0))throw new Error("could not find patch context "+M);return _}}),YH=Te((e,t)=>{t.exports=n;function n(l){return l==null||typeof l!="object"?l:Array.isArray(l)?o(l):i(l)}function o(l){for(var u=l.length,c=new Array(u),d=0;d<u;++d)c[d]=n(l[d]);return c}function i(l){for(var u=Object.keys(l),c={},d,p=0,h=u.length;p<h;++p)d=u[p],c[d]=n(l[d]);return c}}),Ise=Te((e,t)=>{t.exports=n;function n(l,u){return l===u?!0:Array.isArray(l)&&Array.isArray(u)?o(l,u):typeof l=="object"&&typeof u=="object"?i(l,u):!1}function o(l,u){if(l.length!==u.length)return!1;for(var c=0;c<l.length;++c)if(!n(l[c],u[c]))return!1;return!0}function i(l,u){if(l===null&&u!==null||l!==null&&u===null)return!1;var c=Object.keys(l),d=Object.keys(u);if(c.length!==d.length)return!1;for(var p=0,h;p<c.length;++p)if(h=c[p],!(h in u&&n(l[h],u[h])))return!1;return!0}}),jse=Te((e,t)=>{var n=nk();t.exports=function(h,b){var g=n.parse(h.path),m=n.parse(b.path),y=d(g,m),x=l(g,m,y.length),S=p(h),E=p(b);return y.length===0&&!x?[E,S]:x?i(S,g,E,m):o(S,g,E)};function o(h,b,g,m){if(h.path===g.path)throw new TypeError("cannot commute "+h.op+","+g.op+" with identical object paths");return[g,h]}function i(h,b,g,m){return b.length===m.length?u(h,b,g,m):(b.length>m.length?(b=c(g,m,h,b,-1),h.path=n.absolute(n.join(b))):(m=c(h,b,g,m,1),g.path=n.absolute(n.join(m))),[g,h])}function l(h,b,g){return n.isValidArrayIndex(h[g])&&n.isValidArrayIndex(b[g])}function u(h,b,g,m){var y=b.length-1,x=+b[y],S=+m[y],E;return x<S?h.op==="add"||h.op==="copy"?(E=m.slice(),E[y]=Math.max(0,S-1),g.path=n.absolute(n.join(E))):h.op==="remove"&&(E=m.slice(),E[y]=S+1,g.path=n.absolute(n.join(E))):g.op==="add"||g.op==="copy"?(E=b.slice(),E[y]=x+1,h.path=n.absolute(n.join(E))):x>S&&g.op==="remove"&&(E=b.slice(),E[y]=Math.max(0,x-1),h.path=n.absolute(n.join(E))),[g,h]}function c(h,b,g,m,y){var x=b.length-1,S=+b[x],E=+m[x],P=m.slice();return S>E||(h.op==="add"||h.op==="copy"?P[x]=Math.max(0,E-y):h.op==="remove"&&(P[x]=Math.max(0,E+y))),P}function d(h,b){var g=h.length,m=b.length;if(g===0||m===0||g<2&&m<2)return[];for(var y=g===m?g-1:Math.min(g,m),x=0;x<y&&h[x]===b[x];)++x;return h.slice(0,x)}function p(h){return h.op==="remove"?{op:h.op,path:h.path}:h.op==="copy"||h.op==="move"?{op:h.op,path:h.path,from:h.from}:{op:h.op,path:h.path,value:h.value}}}),QH=Te((e,t)=>{t.exports=n;function n(o){Error.call(this),this.name=this.constructor.name,this.message=o,typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,this.constructor)}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n}),rk=Te((e,t)=>{t.exports=n;function n(o){Error.call(this),this.name=this.constructor.name,this.message=o,typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,this.constructor)}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n}),XH=Te((e,t)=>{t.exports=n;function n(o){Error.call(this),this.name=this.constructor.name,this.message=o,typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,this.constructor)}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n}),JH=Te(e=>{var t=nk(),n=YH(),o=Ise(),i=jse(),l=GH(),u=QH(),c=rk(),d=XH(),p=t.find,h=t.parseArrayIndex;e.test={apply:b,inverse:g,commute:m},e.add={apply:y,inverse:S,commute:E},e.remove={apply:B,inverse:X,commute:M},e.replace={apply:P,inverse:O,commute:z},e.move={apply:_,inverse:L,commute:U},e.copy={apply:N,inverse:se,commute:E};function b(W,A,Y){var ie=p(W,A.path,Y.findContext,A.context),q=ie.target,G,ue;if(Array.isArray(q)?(G=h(ie.key),ue=q[G]):ue=ie.key===void 0?ie.target:ie.target[ie.key],!o(ue,A.value))throw new u("test failed "+JSON.stringify(A));return W}function g(W,A){return W.push(A),1}function m(W,A){if(W.path===A.path&&A.op==="remove")throw new TypeError("Can't commute test,remove -> remove,test for same path");return A.op==="test"||A.op==="replace"?[A,W]:i(W,A)}function y(W,A,Y){var ie=p(W,A.path,Y.findContext,A.context);if(K(ie))throw new c("path does not exist "+A.path);if(A.value===void 0)throw new c("missing value");var q=n(A.value);return ie.key===void 0?q:(x(ie,q),W)}function x(W,A){var Y=W.target;if(Array.isArray(Y))if(W.key==="-")Y.push(A);else{if(W.key>Y.length)throw new c("target of add outside of array bounds");Y.splice(W.key,0,A)}else if(J(Y))Y[W.key]=A;else throw new c("target of add must be an object or array "+W.key)}function S(W,A){var Y=A.context;return Y!==void 0&&(Y={before:Y.before,after:l.cons(A.value,Y.after)}),W.push({op:"test",path:A.path,value:A.value,context:Y}),W.push({op:"remove",path:A.path,context:Y}),1}function E(W,A){if(W.path===A.path&&A.op==="remove")throw new TypeError("Can't commute add,remove -> remove,add for same path");return i(W,A)}function P(W,A,Y){var ie=p(W,A.path,Y.findContext,A.context);if(K(ie)||ce(ie))throw new c("path does not exist "+A.path);if(A.value===void 0)throw new c("missing value");var q=n(A.value);if(ie.key===void 0)return q;var G=ie.target;return Array.isArray(G)?G[h(ie.key)]=q:G[ie.key]=q,W}function O(W,A,Y,ie){var q=ie[Y-1];if(q===void 0||q.op!=="test"||q.path!==A.path)throw new d("cannot invert replace w/o test");var G=q.context;return G!==void 0&&(G={before:G.before,after:l.cons(q.value,l.tail(G.after))}),W.push({op:"test",path:q.path,value:A.value}),W.push({op:"replace",path:q.path,value:q.value}),2}function z(W,A){if(W.path===A.path&&A.op==="remove")throw new TypeError("Can't commute replace,remove -> remove,replace for same path");return A.op==="test"||A.op==="replace"?[A,W]:i(W,A)}function B(W,A,Y){var ie=p(W,A.path,Y.findContext,A.context);if(K(ie)||ie.target[ie.key]===void 0)throw new c("path does not exist "+A.path);return D(ie),W}function D(W){var A=W.target,Y;if(Array.isArray(A))return Y=A.splice(h(W.key),1),Y[0];if(J(A))return Y=A[W.key],delete A[W.key],Y;throw new c("target of remove must be an object or array")}function X(W,A,Y,ie){var q=ie[Y-1];if(q===void 0||q.op!=="test"||q.path!==A.path)throw new d("cannot invert remove w/o test");var G=q.context;return G!==void 0&&(G={before:G.before,after:l.tail(G.after)}),W.push({op:"add",path:q.path,value:q.value,context:G}),2}function M(W,A){return W.path===A.path&&A.op==="remove"?[A,W]:i(W,A)}function _(W,A,Y){if(t.contains(A.path,A.from))throw new c("move.from cannot be ancestor of move.path");var ie=p(W,A.path,Y.findContext,A.context),q=p(W,A.from,Y.findContext,A.fromContext);return x(ie,D(q)),W}function L(W,A){return W.push({op:"move",path:A.from,context:A.fromContext,from:A.path,fromContext:A.context}),1}function U(W,A){if(W.path===A.path&&A.op==="remove")throw new TypeError("Can't commute move,remove -> move,replace for same path");return i(W,A)}function N(W,A,Y){var ie=p(W,A.path,Y.findContext,A.context),q=p(W,A.from,Y.findContext,A.fromContext);if(K(q)||ce(q))throw new c("copy.from must exist");var G=q.target,ue;return Array.isArray(G)?ue=G[h(q.key)]:ue=G[q.key],x(ie,n(ue)),W}function se(W,A){throw new d("cannot invert "+A.op)}function K(W){return W===void 0||W.target==null&&W.key!==void 0}function ce(W){return W.key!==void 0&&W.target[W.key]===void 0}function J(W){return W!==null&&typeof W=="object"}}),Cse=Te(e=>{var t=JH(),n=YH(),o=rk();e.apply=l,e.applyInPlace=u,e.clone=n,e.isValidObject=d,e.defaultHash=c;var i={};function l(h,b,g){return u(h,n(b),g)}function u(h,b,g){if(g||(g=i),!Array.isArray(h))return b;for(var m,y,x=0;x<h.length;++x){if(y=h[x],m=t[y.op],m===void 0)throw new o("invalid op "+JSON.stringify(y));b=m.apply(b,y,g)}return b}function c(h){return d(h)||p(h)?JSON.stringify(h):h}function d(h){return h!==null&&Object.prototype.toString.call(h)==="[object Object]"}function p(h){return Object.prototype.toString.call(h)==="[object Array]"}}),Ose=Te((e,t)=>{var n=JH();t.exports=function(i){var l=[],u,c;for(u=i.length-1;u>=0;u-=c)c=o(l,i[u],u,i);return l};function o(i,l,u,c){var d=n[l.op];return d!==void 0&&typeof d.inverse=="function"?d.inverse(i,l,u,c):1}}),_se=Te(e=>{var t=Ese(),n=GH(),o=Cse(),i=Ose(),l=nk(),u=l.encodeSegment;e.diff=p,e.patch=o.apply,e.patchInPlace=o.applyInPlace,e.inverse=i,e.clone=o.clone,e.InvalidPatchOperationError=rk(),e.TestFailedError=QH(),e.PatchNotInvertibleError=XH();var c=o.isValidObject,d=o.defaultHash;function p(O,z,B){return b(O,z,"",h(B,[])).patch}function h(O,z){return typeof O=="object"?{patch:z,hash:S(P,O.hash,d),makeContext:S(P,O.makeContext,E),invertible:O.invertible!==!1}:{patch:z,hash:S(P,O,d),makeContext:E,invertible:!0}}function b(O,z,B,D){return Array.isArray(O)&&Array.isArray(z)?m(O,z,B,D):c(O)&&c(z)?g(O,z,B,D):x(O,z,B,D)}function g(O,z,B,D){var X=Object.keys(z),M=D.patch,_,L;for(_=X.length-1;_>=0;--_){L=X[_];var U=B+"/"+u(L);O[L]!==void 0?b(O[L],z[L],U,D):M.push({op:"add",path:U,value:z[L]})}for(X=Object.keys(O),_=X.length-1;_>=0;--_)if(L=X[_],z[L]===void 0){var N=B+"/"+u(L);D.invertible&&M.push({op:"test",path:N,value:O[L]}),M.push({op:"remove",path:N})}return D}function m(O,z,B,D){var X=n.map(D.hash,O),M=n.map(D.hash,z),_=t.compare(X,M);return y(O,z,B,D,_)}function y(O,z,B,D,X){var M=0;return t.reduce(function(_,L,U,N){var se,K,ce=_.patch,J=B+"/"+(N+M);return L===t.REMOVE?(se=ce[ce.length-1],K=_.makeContext(N,O),_.invertible&&ce.push({op:"test",path:J,value:O[N],context:K}),se!==void 0&&se.op==="add"&&se.path===J?(se.op="replace",se.context=K):ce.push({op:"remove",path:J,context:K}),M-=1):L===t.ADD?(ce.push({op:"add",path:J,value:z[U],context:_.makeContext(N,O)}),M+=1):b(O[N],z[U],J,_),_},D,X)}function x(O,z,B,D){return O!==z&&(D.invertible&&D.patch.push({op:"test",path:B,value:O}),D.patch.push({op:"replace",path:B,value:z})),D}function S(O,z,B){return O(z)?z:B}function E(){}function P(O){return typeof O=="function"}}),Ki=Te((e,t)=>{function n(o,i){for(var l=0,u=i.length-1;l<u;l++){if(!o[i[l]])return null;o=o[i[l]]}return o}t.exports=n}),Ta=Te((e,t)=>{function n(i){return i==="~0"?"~":"/"}function o(i){var l=i.split("/");if(i.indexOf("~")===-1)return l;for(var u=0,c=l.length;u<c;u++)l[u].indexOf("~")!==-1&&(l[u]=l[u].replace(/~[01]/g,n));return l}t.exports=o}),Dse=Te((e,t)=>{var n=Ki(),o=Ta();function i(l,u){var c=o(u),d=c[c.length-1],p=n(l,c);return p?p[d]:void 0}t.exports=i}),tm=Te((e,t)=>{function n(o,i){if(o===i)return!0;if(!(o&&i)||typeof o!="object"||typeof i!="object"||o.length!==i.length)return!1;if(Array.isArray(o)){if(!Array.isArray(i))return!1;for(var l=0,u=o.length;l<u;l++)if(!n(o[l],i[l]))return!1;return!0}var c=Object.keys(o);if(c.length!==Object.keys(i).length)return!1;for(var d=0,p=c.length;d<p;d++){var h=c[d];if(!n(o[h],i[h]))return!1}return!0}t.exports=n}),nm=Te((e,t)=>{function n(o,i){if(i==="-")return o.length;for(var l=0,u=i.length;l<u;l++){var c=i.charCodeAt(l);if(57<c||c<48)return 1/0}return+i}t.exports=n}),rm=Te((e,t)=>{var n=tm(),o=Ki(),i=nm(),l=Ta();function u(c,d,p,h){if(typeof p>"u")return"[op:add] require value, but got undefined";var b=l(d),g=b[b.length-1],m=o(c,b);if(m===null)return"[op:add] path not found: "+d;if(Array.isArray(m)){var y=i(m,g);if(m.length<y)return"[op:add] invalid array index: "+d;h(c,b).splice(y,0,p)}else n(m[g],p)||(h(c,b)[g]=p)}t.exports=u}),ZH=Te((e,t)=>{var n=Ki(),o=nm(),i=Ta();function l(u,c,d){var p=i(c),h=p[p.length-1],b=n(u,p);if(b===null)return"[op:remove] path not found: "+c;if(Array.isArray(b)){var g=o(b,h);if(b.length<=g)return"[op:remove] invalid array index: "+c;d(u,p).splice(g,1)}else delete d(u,p)[h]}t.exports=l}),e$=Te((e,t)=>{var n=tm(),o=Ki(),i=nm(),l=Ta();function u(c,d,p,h){if(typeof p>"u")return"[op:replace] require value, but got undefined";var b=l(d),g=b[b.length-1],m=o(c,b);if(m===null)return"[op:replace] path not found: "+d;if(Array.isArray(m)){var y=i(m,g);if(m.length<=y)return"[op:replace] invalid array index: "+d;n(m[y],p)||h(c,b).splice(y,1,p)}else n(m[g],p)||(h(c,b)[g]=p)}t.exports=u}),t$=Te((e,t)=>{var n=rm(),o=Ki(),i=nm(),l=Ta();function u(c,d,p,h){if(p!==d){var b=l(d),g=b[b.length-1],m=o(c,b);if(m===null)return"[op:move] path not found: "+d;var y=void 0;if(Array.isArray(m)){var x=i(m,g);if(m.length<=x)return"[op:move] invalid array index: "+p;y=m[x],h(c,b).splice(x,1)}else y=m[g],delete h(c,b)[g];return n(c,p,y,h)}}t.exports=u}),n$=Te((e,t)=>{var n=Ki(),o=Ta(),i=rm();function l(u,c,d,p){var h=o(c),b=h[h.length-1],g=n(u,h);return g===null?"[op:copy] path not found: "+c:i(u,d,g[b],p)}t.exports=l}),r$=Te((e,t)=>{var n=tm(),o=Ki(),i=Ta();function l(u,c,d){var p=i(c),h=p[p.length-1],b=o(u,p);if(b===null)return"[op:test] path not found: "+c;if(!n(b[h],d)){var g=JSON.stringify(b[h]),m=JSON.stringify(d);return"[op:test] not matched: "+g+" "+m}}t.exports=l}),ok=Te((e,t)=>{function n(o){if(!o||typeof o!="object")return o;if(Array.isArray(o)){for(var i=o.length,l=new Array(i),u=0;u<i;u++)l[u]=o[u];return l}for(var c=Object.keys(o),d={},p=0,h=c.length;p<h;p++){var b=c[p];d[b]=o[b]}return d}t.exports=n}),Tse=Te((e,t)=>{var n=Dse(),o=rm(),i=ZH(),l=e$(),u=t$(),c=n$(),d=r$(),p=tm(),h=ok(),b=Ta();function g(m,y){return{get:function(x){return n(m,x)},add:function(x,S){return o(m,x,S,y)},remove:function(x){return i(m,x,y)},replace:function(x,S){return l(m,x,S,y)},move:function(x,S){return u(m,x,S,y)},copy:function(x,S){return c(m,x,S,y)},test:function(x,S){return d(m,x,S)},deepEqual:p,shallowCopy:h,toKeys:b}}t.exports=g}),Ase=Te((e,t)=>{function n(o,i,l,u){return u.error=l,u.partial?i[""]:o}t.exports=n}),Bse=Te((e,t)=>{function n(o){return!!o}t.exports=n}),zse=Te((e,t)=>{function n(o){if(o)throw new TypeError(o)}t.exports=n}),qse=Te((e,t)=>{var n=ok();function o(i,l){for(var u=0,c=l.length-1;u<c;u++)i=i[l[u]]=n(i[l[u]]);return i}t.exports=o}),Mse=Te((e,t)=>{var n=ok();function o(l,u,c){var d=l[u];return c.has(d)||(d=n(d),c.add(d)),d}function i(l,u,c){for(var d=0,p=u.length-1;d<p;d++)l=l[u[d]]=o(l,u[d],c);return l}t.exports=i}),Rse=Te((e,t)=>{var n=Tse(),o=Ase(),i=Bse(),l=zse(),u=qse(),c=Mse(),d=rm(),p=ZH(),h=e$(),b=t$(),g=n$(),m=r$(),y=Set||function(){var S=[];return S.has=function(E){return this.indexOf(E)!==-1},S.add=function(E){this.push(E)},S};function x(S,E,P){if(E.length===0)return S;P=P||{};for(var O=P.strict?l:i,z=E.length===1?u:function(L){return function(U,N){return c(U,N,L)}}(new y),B={"":S},D,X=0,M=E.length;X<M;X++){var _=E[X];switch(_.op){case"add":if(O(d(B,""+_.path,_.value,z)))return o(S,B,_,P);break;case"remove":if(O(p(B,""+_.path,z)))return o(S,B,_,P);break;case"replace":if(O(h(B,""+_.path,_.value,z)))return o(S,B,_,P);break;case"move":if(O(b(B,""+_.from,""+_.path,z)))return o(S,B,_,P);break;case"copy":if(O(g(B,""+_.from,""+_.path,z)))return o(S,B,_,P);break;case"test":if(O(m(B,""+_.path,_.value)))return o(S,B,_,P);break;default:if(P.custom&&P.custom[_.op]){if(D=D||n(B,z),O(P.custom[_.op](D,_,X,E)))return o(S,B,_,P)}else return O("[op:"+_.op+"] unknown"),o(S,B,_,P);break}}return B[""]}t.exports=x}),Fse=Te((e,t)=>{t.exports=Rse()}),Lse=Te((e,t)=>{(function(n,o){typeof e=="object"&&typeof t=="object"?t.exports=o():typeof e=="object"?e.blobCompare=o():n.blobCompare=o()})(window,function(){return function(n){var o={};function i(l){if(o[l])return o[l].exports;var u=o[l]={i:l,l:!1,exports:{}};return n[l].call(u.exports,u,u.exports,i),u.l=!0,u.exports}return i.m=n,i.c=o,i.d=function(l,u,c){i.o(l,u)||Object.defineProperty(l,u,{enumerable:!0,get:c})},i.r=function(l){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(l,"__esModule",{value:!0})},i.t=function(l,u){if(1&u&&(l=i(l)),8&u||4&u&&typeof l=="object"&&l&&l.__esModule)return l;var c=Object.create(null);if(i.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:l}),2&u&&typeof l!="string")for(var d in l)i.d(c,d,function(p){return l[p]}.bind(null,d));return c},i.n=function(l){var u=l&&l.__esModule?function(){return l.default}:function(){return l};return i.d(u,"a",u),u},i.o=function(l,u){return Object.prototype.hasOwnProperty.call(l,u)},i.p="",i(i.s=4)}([function(n,o,i){var l=function(h,b){if(Array.isArray(h))return h;if(Symbol.iterator in Object(h))return function(g,m){var y=[],x=!0,S=!1,E=void 0;try{for(var P,O=g[Symbol.iterator]();!(x=(P=O.next()).done)&&(y.push(P.value),!m||y.length!==m);x=!0);}catch(z){S=!0,E=z}finally{try{!x&&O.return&&O.return()}finally{if(S)throw E}}return y}(h,b);throw new TypeError("Invalid attempt to destructure non-iterable instance")},u=function(){function h(b,g){for(var m=0;m<g.length;m++){var y=g[m];y.enumerable=y.enumerable||!1,y.configurable=!0,"value"in y&&(y.writable=!0),Object.defineProperty(b,y.key,y)}}return function(b,g,m){return g&&h(b.prototype,g),m&&h(b,m),b}}();function c(h){if(Array.isArray(h)){for(var b=0,g=Array(h.length);b<h.length;b++)g[b]=h[b];return g}return Array.from(h)}var d=i(2),p=function(h){function b(g){(function(y,x){if(!(y instanceof x))throw new TypeError("Cannot call a class as a function")})(this,b);var m=function(y,x){if(!y)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!x||typeof x!="object"&&typeof x!="function"?y:x}(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return m._messageId=1,m._messages=new Map,m._worker=g,m._worker.onmessage=m._onMessage.bind(m),m._id=Math.ceil(1e7*Math.random()),m}return function(g,m){if(typeof m!="function"&&m!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof m);g.prototype=Object.create(m&&m.prototype,{constructor:{value:g,enumerable:!1,writable:!0,configurable:!0}}),m&&(Object.setPrototypeOf?Object.setPrototypeOf(g,m):g.__proto__=m)}(b,h),u(b,[{key:"terminate",value:function(){this._worker.terminate()}},{key:"isFree",value:function(){return this._messages.size===0}},{key:"jobsLength",value:function(){return this._messages.size}},{key:"exec",value:function(g){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null,y=this,x=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],S=arguments[3];return new Promise(function(E,P){var O=y._messageId++;y._messages.set(O,[E,P,S]),y._worker.postMessage([O,m,g],x||[])})}},{key:"postMessage",value:function(){var g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null,m=this,y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],x=arguments[2];return new Promise(function(S,E){var P=m._messageId++;m._messages.set(P,[S,E,x]),m._worker.postMessage([P,g],y||[])})}},{key:"emit",value:function(g){for(var m=arguments.length,y=Array(m>1?m-1:0),x=1;x<m;x++)y[x-1]=arguments[x];this._worker.postMessage({eventName:g,args:y})}},{key:"_onMessage",value:function(g){var m;if(!Array.isArray(g.data)&&g.data.eventName)return(m=function P(O,z,B){O===null&&(O=Function.prototype);var D=Object.getOwnPropertyDescriptor(O,z);if(D===void 0){var X=Object.getPrototypeOf(O);return X===null?void 0:P(X,z,B)}if("value"in D)return D.value;var M=D.get;return M!==void 0?M.call(B):void 0}(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),"emit",this)).call.apply(m,[this,g.data.eventName].concat(c(g.data.args)));var y,x=(y=g.data,Array.isArray(y)?y:Array.from(y)),S=x[0],E=x.slice(1);if(S===1)this._onEvent.apply(this,c(E));else{if(S!==0)throw new Error("Wrong message type '"+S+"'");this._onResult.apply(this,c(E))}}},{key:"_onResult",value:function(g,m,y){var x=this._messages.get(g),S=l(x,2),E=S[0],P=S[1];return this._messages.delete(g),m===1?E(y):P(y)}},{key:"_onEvent",value:function(g,m,y){var x=this._messages.get(g),S=l(x,3)[2];S&&S(m,y)}}]),b}(d);n.exports=p},function(n,o,i){n.exports=function(){return i(3)(`!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function a(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var f=r(1),c=0,l=1,s=0,y=1,p="main",b=function(e){return"object"===(void 0===e?"undefined":i(e))&&"function"==typeof e.then&&"function"==typeof e.catch};var v=function e(t,r){u(this,e),this.payload=t,this.transferable=r};e.exports=function(e){var t,r,i,h=(i=e,(r=p)in(t={})?Object.defineProperty(t,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[r]=i,t),d=self.postMessage.bind(self),m=new(function(e){function t(){return u(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),n(t,[{key:"emit",value:function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return d({eventName:e,args:r}),this}},{key:"emitLocally",value:function(e){for(var r,n=arguments.length,i=Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];(r=o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"emit",this)).call.apply(r,[this,e].concat(i))}},{key:"operation",value:function(e,t){return h[e]=t,this}}]),t}(f)),g=function(e,t,r){var n=function(t){t&&t instanceof v?w(e,y,t.payload,t.transferable):w(e,y,t)},o=function(t){w(e,s,{message:t.message,stack:t.stack})};try{var i=_(e,t,r);b(i)?i.then(n).catch(o):n(i)}catch(e){o(e)}},_=function(e,t,r){var n=h[r||p];if(!n)throw new Error("Not found handler for this request");return n(t,O.bind(null,e))},w=function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];d([c,e,t,r],n)},O=function(e,t,r){if(!t)throw new Error("eventName is required");if("string"!=typeof t)throw new Error("eventName should be string");d([l,e,t,r])};return self.addEventListener("message",(function(e){var t=e.data;Array.isArray(t)?g.apply(void 0,a(t)):t&&t.eventName&&m.emitLocally.apply(m,[t.eventName].concat(a(t.args)))})),m},e.exports.TransferableResponse=v},function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.defineProperty(this,"__listeners",{value:{},enumerable:!1,writable:!1})}return n(e,[{key:"emit",value:function(e){if(!this.__listeners[e])return this;for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var o=!0,i=!1,a=void 0;try{for(var u,f=this.__listeners[e][Symbol.iterator]();!(o=(u=f.next()).done);o=!0){var c=u.value;c.apply(void 0,r)}}catch(e){i=!0,a=e}finally{try{!o&&f.return&&f.return()}finally{if(i)throw a}}return this}},{key:"once",value:function(e,t){var r=this,n=function n(){r.off(e,n),t.apply(void 0,arguments)};return this.on(e,n)}},{key:"on",value:function(e,t){return this.__listeners[e]||(this.__listeners[e]=[]),this.__listeners[e].push(t),this}},{key:"off",value:function(e,t){return this.__listeners[e]=t?this.__listeners[e].filter((function(e){return e!==t})):[],this}}]),e}();e.exports=o},function(e,t,r){"use strict";r.r(t);var n=r(0);r.n(n)()().operation("binary",async({blob:e,chunk:t})=>await function(e,t){return new Promise((r,n)=>{const o=new FileReader,i=t?Math.min(t,e.size):e.size,a=e.slice(0,i);o.onload=()=>r(o.result),o.onerror=n,o.readAsBinaryString(a)})}(e,t)).operation("buffer",async({blob:e,chunk:t})=>await function(e,t){return new Promise((r,n)=>{const o=new FileReader,i=t?Math.min(t,e.size):e.size,a=e.slice(0,i);o.onload=()=>r(o.result),o.onerror=n,o.readAsArrayBuffer(a)})}(e,t)).operation("compare",({buf1:e,buf2:t})=>(function(e,t){if(e===t)return!0;if(e.byteLength!==t.byteLength)return!1;const r=new DataView(e),n=new DataView(t);for(var o=e.byteLength;o--;)if(r.getUint8(o)!==n.getUint8(o))return!1;return!0})(e,t))}]);`,null)}},function(n,o,i){var l=function(){function c(d,p){for(var h=0;h<p.length;h++){var b=p[h];b.enumerable=b.enumerable||!1,b.configurable=!0,"value"in b&&(b.writable=!0),Object.defineProperty(d,b.key,b)}}return function(d,p,h){return p&&c(d.prototype,p),h&&c(d,h),d}}(),u=function(){function c(){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,c),Object.defineProperty(this,"__listeners",{value:{},enumerable:!1,writable:!1})}return l(c,[{key:"emit",value:function(d){if(!this.__listeners[d])return this;for(var p=arguments.length,h=Array(p>1?p-1:0),b=1;b<p;b++)h[b-1]=arguments[b];var g=!0,m=!1,y=void 0;try{for(var x,S=this.__listeners[d][Symbol.iterator]();!(g=(x=S.next()).done);g=!0){var E=x.value;E.apply(void 0,h)}}catch(P){m=!0,y=P}finally{try{!g&&S.return&&S.return()}finally{if(m)throw y}}return this}},{key:"once",value:function(d,p){var h=this,b=function g(){h.off(d,g),p.apply(void 0,arguments)};return this.on(d,b)}},{key:"on",value:function(d,p){return this.__listeners[d]||(this.__listeners[d]=[]),this.__listeners[d].push(p),this}},{key:"off",value:function(d,p){return this.__listeners[d]=p?this.__listeners[d].filter(function(h){return h!==p}):[],this}}]),c}();n.exports=u},function(n,o,i){var l=window.URL||window.webkitURL;n.exports=function(u,c){try{try{var d;try{(d=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder)).append(u),d=d.getBlob()}catch{d=new Blob([u])}return new Worker(l.createObjectURL(d))}catch{return new Worker("data:application/javascript,"+encodeURIComponent(u))}}catch{if(!c)throw Error("Inline worker is not supported");return new Worker(c)}}},function(n,o,i){i.r(o);var l=i(0),u=i.n(l),c=i(1),d=i.n(c);i.d(o,"workersEnabled",function(){return p}),i.d(o,"default",function(){return h});let p=!!window.Worker;class h{static toBinaryStringWithWorker(g,m){return _t(this,null,function*(){let y=new u.a(new d.a),x=yield y.exec("binary",{blob:g,chunk:m});return y.terminate(),x})}static toBinaryStringWithoutWorker(g,m){return function(y,x){return new Promise((S,E)=>{let P=new FileReader,O=x?Math.min(x,y.size):y.size,z=y.slice(0,O);P.onload=()=>S(P.result),P.onerror=E,P.readAsBinaryString(z)})}(g,m)}static toBinaryString(g,m,y=!0){return y&&p?this.toBinaryStringWithWorker(g,m):this.toBinaryStringWithoutWorker(g,m)}static toArrayBufferWithWorker(g,m){return _t(this,null,function*(){let y=new u.a(new d.a),x=yield y.exec("buffer",{blob:g,chunk:m});return y.terminate(),x})}static toArrayBufferWithoutWorker(g,m){return function(y,x){return new Promise((S,E)=>{let P=new FileReader,O=x?Math.min(x,y.size):y.size,z=y.slice(0,O);P.onload=()=>S(P.result),P.onerror=E,P.readAsArrayBuffer(z)})}(g,m)}static toArrayBuffer(g,m,y=!0){return y&&p?this.toArrayBufferWithWorker(g,m):this.toArrayBufferWithoutWorker(g,m)}static compareBuffersWithWorker(g,m){return _t(this,null,function*(){if(g===m)return!0;let y=new u.a(new d.a),x=yield y.exec("compare",{buf1:g,buf2:m},[g,m]);return y.terminate(),x})}static compareBuffersWithoutWorker(g,m){return function(y,x){if(y===x)return!0;if(y.byteLength!==x.byteLength)return!1;let S=new DataView(y),E=new DataView(x);for(var P=y.byteLength;P--;)if(S.getUint8(P)!==E.getUint8(P))return!1;return!0}(g,m)}static compareBuffers(g,m,y=!0){return y&&p?this.compareBuffersWithWorker(g,m):this.compareBuffersWithoutWorker(g,m)}static sizeEqual(g,m){return g.size===m.size}static typeEqual(g,m){return g.type===m.type}static magicNumbersEqual(g,m,y=!0){return _t(this,null,function*(){if(g===m)return!0;let x=[24,16,14,12,8,6,4],[S,E]=yield Promise.all([this.toBinaryString(g,24,y),this.toBinaryString(m,24,y)]);for(let P of x)if(S.substring(0,P)===E.substring(0,P))return!0;return!1})}static bytesEqualWithBinaryString(g,m,y,x=!0){return _t(this,null,function*(){if(g===m)return!0;let[S,E]=yield Promise.all([this.toBinaryString(g,y,x),this.toBinaryString(m,y,x)]);return S===E})}static bytesEqualWithArrayBuffer(g,m,y,x=!0){return _t(this,null,function*(){if(g===m)return!0;let[S,E]=yield Promise.all([this.toArrayBuffer(g,y,x),this.toArrayBuffer(m,y,x)]);return this.compareBuffers(S,E,x)})}static isEqual(g,m){return _t(this,arguments,function*(y,x,{methods:S=["size","type","magic","byte"],byte:E="buffer",partial:P=!1,chunks:O=null,worker:z=!0}={}){let B=null;for(let D of S){if(B===!1||P&&B===!0)break;switch(D){case"byte":case"bytes":case"content":O=O instanceof Array?O:[y.size],B=!0;for(let X of O){let M=!1;M=E==="buffer"?yield this.bytesEqualWithArrayBuffer(y,x,X,z):yield this.bytesEqualWithBinaryString(y,x,X,z),M||(B=!1)}break;case"magic":case"headers":case"numbers":case"mime":B=yield this.magicNumbersEqual(y,x,z);break;case"size":case"sizes":B=this.sizeEqual(y,x);break;case"type":case"types":B=this.typeEqual(y,x);break;default:throw new Error("Blob-compare : Unknown comparison method")}}return B})}}}])})}),o$={};SS(o$,{ToolbarDropdownSelect:()=>uce,default:()=>dce}),wn.exports=AY(o$),Pe();function om(e,t,n=[]){if(typeof e=="object"&&e){if(Nse(e)||Vse(e)){t(e,n);return}for(let[o,i]of Object.entries(e))om(i,t,[...n,o])}else{if(e==null)return;t(e,n)}}var Nse=e=>typeof e=="object"&&e!==null&&Object.hasOwnProperty.call(e,"type")&&e.type==="image"&&Object.hasOwnProperty.call(e,"id")&&typeof e.id=="string"&&e.id!=="",Vse=e=>typeof e=="object"&&e!==null&&Object.hasOwnProperty.call(e,"r")&&Object.hasOwnProperty.call(e,"g")&&Object.hasOwnProperty.call(e,"b")&&Object.hasOwnProperty.call(e,"a")&&typeof e.r=="number"&&typeof e.g=="number"&&typeof e.b=="number"&&typeof e.a=="number",a$=ge.requireDist();Ja();var Kse=0,Use=class{constructor(e){this._studio=e,Je(this,"_id"),Je(this,"_state",{type:"Ready"}),this._id=String(Kse++)}get status(){return this._state.type}reset(){let{_state:e}=this;if(e.type!=="Ready")if(e.type==="Captured")this._state={type:"Ready"},e.transaction.discard(),e.flagsTransaction.discard();else throw e.type==="Committed"?new Error("This scrub is already committed and can't be reset."):new Error("This scrub is already discarded and can't be reset.")}commit(){let{_state:e}=this;if(e.type==="Captured")e.transaction.commit(),e.flagsTransaction.discard(),this._state={type:"Committed"};else if(e.type==="Ready"){console.warn("Scrub is empty. Nothing to commit.");return}else throw e.type==="Committed"?new Error("This scrub is already committed."):new Error("This scrub is already discarded and can't be comitted.")}capture(e){if(this._state.type==="Captured"&&this.reset(),this._state.type==="Ready"){let t=!0;try{this._state=F({type:"Captured"},this._capture(e)),t=!1}finally{t&&(console.error("This scrub's callback threw an error. We're undo-ing all of the changes made by this scrub, and marking it as discarded."),this._state={type:"Discarded"})}}else throw this._state.type==="Committed"?new Error("This scrub is already committed and cannot capture again. If you wish to capture more, you can start a new studio.scrub() or do so before scrub.commit()"):new Error("This scrub is already discarded and cannot capture again. If you wish to capture more, you can start a new studio.scrub() or do so before scrub.discard()")}_capture(e){let t=[],n=this._studio.tempTransaction(i=>{let l=!0,u={set:(c,d)=>{if(!l)throw new Error("You seem to have called the scrub api after scrub.capture()");let{root:p,path:h}=(0,a$.getPointerParts)(c);if(!jt(p))throw new Error("We can only scrub props of Sheet Objects for now");i.set(c,d),t.push(c)}};try{e(u)}finally{l=!1}}),o=this._studio.tempTransaction(({stateEditors:i})=>{t.forEach(l=>{let{root:u,path:c}=(0,a$.getPointerParts)(l);if(!jt(u))return;let d=u.template.getDefaultsAtPointer(l);om(d,(p,h)=>{i.studio.ephemeral.projects.stateByProjectId.stateBySheetId.stateByObjectKey.propsBeingScrubbed.flag(ne(F({},u.address),{pathToProp:h}))},c)})});return{transaction:n,flagsTransaction:o}}discard(){let{_state:e}=this;if(e.type==="Captured"||e.type==="Ready")e.type==="Captured"&&(e.transaction.discard(),e.flagsTransaction.discard()),this._state={type:"Discarded"};else throw e.type==="Committed"?new Error("This scrub is already committed and can't be discarded."):new Error("This scrub is already discarded")}},Hse=ge.requireDist(),i$=typeof window<"u"?Promise.resolve().then(()=>(Sse(),UH)).then(e=>e.default):null,$se=class{constructor(e){this.studio=e,Je(this,"_rendered",!1),Je(this,"_nonSSRBits",i$?i$.then(t=>new t):Promise.reject()),Je(this,"ready",this._nonSSRBits.then(()=>{},()=>{}))}render(){this._rendered||(this._rendered=!0,this._nonSSRBits.then(e=>{e.render()}).catch(e=>{throw console.error(e),e}))}hide(){this.studio.transaction(({drafts:e})=>{e.ahistoric.visibilityState="everythingIsHidden"})}restore(){this.render(),this.studio.transaction(({drafts:e})=>{e.ahistoric.visibilityState="everythingIsVisible"})}get isHidden(){return(0,Hse.val)(this.studio.atomP.ahistoric.visibilityState)==="everythingIsHidden"}renderToolset(e,t){let n=!1,o=null;return this._nonSSRBits.then(i=>{n||(o=i.renderToolset(e,t))}).catch(i=>{console.error(i)}),()=>{if(o){o();return}n||(n=!0)}}},am=ge.requireDist();function Wse(e){return e}var Gse=(e,t=Wse)=>{let n=o=>({type:e,payload:t(o)});return n.type=e,n.is=o=>o&&o.type&&o.type===e,n},yo=Gse,l$=V(_se()),s$=V(Fse());sv();var im,Yse=new Uint8Array(16);function Qse(){if(!im&&(im=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!im))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return im(Yse)}var Xse=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function Jse(e){return typeof e=="string"&&Xse.test(e)}var Zse=Jse,rn=[];for(lm=0;lm<256;++lm)rn.push((lm+256).toString(16).substr(1));var lm;function eue(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=(rn[e[t+0]]+rn[e[t+1]]+rn[e[t+2]]+rn[e[t+3]]+"-"+rn[e[t+4]]+rn[e[t+5]]+"-"+rn[e[t+6]]+rn[e[t+7]]+"-"+rn[e[t+8]]+rn[e[t+9]]+"-"+rn[e[t+10]]+rn[e[t+11]]+rn[e[t+12]]+rn[e[t+13]]+rn[e[t+14]]+rn[e[t+15]]).toLowerCase();if(!Zse(n))throw TypeError("Stringified UUID is invalid");return n}var tue=eue;function nue(e,t,n){e=e||{};var o=e.random||(e.rng||Qse)();if(o[6]=o[6]&15|64,o[8]=o[8]&63|128,t){n=n||0;for(var i=0;i<16;++i)t[n+i]=o[i];return t}return tue(o)}var rue=nue,Vc={replaceHistory:yo("@history/replaceHistory"),startHistoryFromScratch:yo("@history/startHistoryFromScratch"),undo:yo("@history/undo"),redo:yo("@history/redo")},oue={type:"@history/unknownAction",payload:""},aue={maxNumberOfCommits:100},iue=(e,t=aue)=>{let n=ak(e(void 0,oue));return function(o,i){return Vc.startHistoryFromScratch.is(i)?ak(e(void 0,i.payload)):Vc.replaceHistory.is(i)?i.payload:Vc.undo.is(i)?o?uue(o):n:Vc.redo.is(i)?o?cue(o):n:o?lue(o,e(o.innerState,i),t):ak(e(void 0,i))}};function ak(e){return{currentCommitHash:void 0,commitsByHash:{},listOfCommitHashes:[],innerState:e}}function lue(e,t,n){if(t===e.innerState)return e;let o=sue(e.innerState,t);if(o.forwardDiff.length===0)return e;let i=Iu(e.listOfCommitHashes),l={currentCommitHash:o.hash,commitsByHash:F({},e.commitsByHash),listOfCommitHashes:[...e.listOfCommitHashes],innerState:t};if(e.currentCommitHash!==i){let u=e.listOfCommitHashes.findIndex(c=>c===e.currentCommitHash);e.listOfCommitHashes.slice(u+1).forEach(c=>{delete l.commitsByHash[c]}),l.listOfCommitHashes.splice(u+1,l.listOfCommitHashes.length)}if(l.listOfCommitHashes.push(o.hash),l.commitsByHash[o.hash]=o,l.listOfCommitHashes.length>n.maxNumberOfCommits){let u=l.listOfCommitHashes.length-n.maxNumberOfCommits;l.listOfCommitHashes.slice(0,u).forEach(c=>{delete l.commitsByHash[c]}),l.listOfCommitHashes.splice(0,u)}return l}function sue(e,t){let n=l$.default.diff(e,t,{invertible:!1}),o=l$.default.diff(t,e,{invertible:!1}),i=Date.now(),l=rue();return{forwardDiff:n,backwardDiff:o,timestamp:i,hash:l}}function uue(e){if(e.currentCommitHash===void 0)return e;let t=e.listOfCommitHashes.findIndex(u=>u===e.currentCommitHash);if(t===-1)throw new Error("This should never happen");let n=e.commitsByHash[e.currentCommitHash],o=(0,s$.default)(e.innerState,n.backwardDiff),i=t-1,l=i===-1?void 0:e.listOfCommitHashes[i];return ne(F({},e),{currentCommitHash:l,innerState:o})}function cue(e){if(e.listOfCommitHashes.length===0)return e;let t=e.listOfCommitHashes.findIndex(u=>u===e.currentCommitHash);if(t===e.listOfCommitHashes.length-1)return e;let n=t+1,o=e.listOfCommitHashes[n],i=e.commitsByHash[o],l=(0,s$.default)(e.innerState,i.forwardDiff);return ne(F({},e),{currentCommitHash:o,innerState:l})}Ph();var sm={ahistoric:{visibilityState:"everythingIsVisible",theTrigger:{position:{closestCorner:"bottomLeft",distanceFromHorizontalEdge:.02,distanceFromVerticalEdge:.02}},coreByProject:{},projects:{stateByProjectId:{}}},historic:{projects:{stateByProjectId:{}},autoKey:!0,coreByProject:{},panels:{sequenceEditor:{rightPanelOpen:!0}},panelInstanceDesceriptors:{}},ephemeral:{initialised:!1,coreByProject:{},projects:{stateByProjectId:{}},extensions:{byId:{},paneClasses:{}},showOutline:!1}},u$=yo("@storeBundle/replacePersistentState",e=>e),c$=yo("@storeBundle/reduceParts",e=>e),Es={historic:Vc,replacePersistentState:u$,reduceParts:c$},d$=yo("@storeBundle/setInnerHistoricState",e=>e),due=(e=sm.historic,t)=>d$.is(t)?t.payload:e,ik=iue(due),f$=(e,t)=>{if(u$.is(t)){let{historic:n,ahistoric:o}=t.payload,i=e?.ephemeral||sm.ephemeral;return{$persistent:{historic:n,ahistoric:o},ephemeral:i}}else if(e){let{historic:n,ahistoric:o}=e.$persistent,{ephemeral:i}=e;if(c$.is(t)){let l={historic:e.$persistent.historic.innerState,ahistoric:e.$persistent.ahistoric,ephemeral:e.ephemeral},u=t.payload(l);if(u===l)return e;n.innerState!==u.historic&&(n=ik(n,d$(u.historic))),o=u.ahistoric,i=u.ephemeral}else{let l=ik(n,t);if(l===n)return e;n=l}return{$persistent:n===e.$persistent.historic&&o===e.$persistent.ahistoric?e.$persistent:{historic:n,ahistoric:o},ephemeral:i}}else{let n=ik(void 0,{}),o=sm.ahistoric,i=sm.ephemeral;return{$persistent:{historic:n,ahistoric:o},ephemeral:i}}},p$=yo("@history/pushTempAction",e=>e),h$=yo("@history/discardTempAction",e=>e),m$=yo("@history/commitTempAction",e=>e),fue=0,pue=()=>{let e=fue++;return{push:t=>p$({id:e,originalAction:t}),discard:()=>h$(e),commit:()=>m$(e)}},hue=(e,t)=>{if(e){let{tempActions:n,permanent:o}=e.$temps,i;if(p$.is(t))n=[...n,t];else if(m$.is(t)){let u=n.find(c=>c.payload.id===t.payload);u?(i=u.payload.originalAction,n=n.filter(c=>c.payload.id!==t.payload)):Eh.error("Comitting temp action group ".concat(t.payload," isn't possible as this group doesn't exist"))}else h$.is(t)?n=n.filter(u=>u.payload.id!==t.payload):i=t;i&&(o=f$(e.$temps.permanent,i));let l={historic:o.$persistent.historic.innerState,ahistoric:o.$persistent.ahistoric,ephemeral:o.ephemeral};for(let u of n)l=u.payload.originalAction.payload(l);return F({$temps:{tempActions:n,permanent:o},$persistent:o.$persistent},l)}else{let n=f$(void 0,t);return{$temps:{permanent:n,tempActions:[]},$persistent:n.$persistent,historic:n.$persistent.historic.innerState,ahistoric:n.$persistent.ahistoric,ephemeral:n.ephemeral}}};va(),va(),Dr();function g$(e,t){if(typeof e!="object"||e===null)return;if(t.length===0){for(let u of Object.keys(e))delete e[u];return}let n=t.slice(0,t.length-1),o=e,i=new WeakMap;for(let u of n){let c=o,d=c[u];if(typeof d!="object"||d===null)return;i.set(d,c),o=d}let l=t.slice().reverse();for(let u of l){if(delete o[u],Object.keys(o).length>0)return;o=i.get(o)}}function mue(e,{scale:t,origin:n,translate:o}){let i=n+(e-n)*t;return o+i}function Hr(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];throw Error("[Immer] minified error nr: "+e+(n.length?" "+n.map(function(i){return"'"+i+"'"}).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function Ps(e){return!!e&&!!e[Jn]}function Ui(e){return!!e&&(function(t){if(!t||typeof t!="object")return!1;var n=Object.getPrototypeOf(t);if(n===null)return!0;var o=Object.hasOwnProperty.call(n,"constructor")&&n.constructor;return o===Object||typeof o=="function"&&Function.toString.call(o)===wue}(e)||Array.isArray(e)||!!e[I$]||!!e.constructor[I$]||sk(e)||uk(e))}function Kc(e,t,n){n===void 0&&(n=!1),Is(e)===0?(n?Object.keys:kk)(e).forEach(function(o){n&&typeof o=="symbol"||t(o,e[o],e)}):e.forEach(function(o,i){return t(i,o,e)})}function Is(e){var t=e[Jn];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:sk(e)?2:uk(e)?3:0}function lk(e,t){return Is(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function gue(e,t){return Is(e)===2?e.get(t):e[t]}function v$(e,t,n){var o=Is(e);o===2?e.set(t,n):o===3?(e.delete(t),e.add(n)):e[t]=n}function vue(e,t){return e===t?e!==0||1/e==1/t:e!=e&&t!=t}function sk(e){return xue&&e instanceof Map}function uk(e){return kue&&e instanceof Set}function Hi(e){return e.o||e.t}function ck(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=Sue(e);delete t[Jn];for(var n=kk(t),o=0;o<n.length;o++){var i=n[o],l=t[i];l.writable===!1&&(l.writable=!0,l.configurable=!0),(l.get||l.set)&&(t[i]={configurable:!0,writable:!0,enumerable:l.enumerable,value:e[i]})}return Object.create(Object.getPrototypeOf(e),t)}function dk(e,t){return t===void 0&&(t=!1),fk(e)||Ps(e)||!Ui(e)||(Is(e)>1&&(e.set=e.add=e.clear=e.delete=bue),Object.freeze(e),t&&Kc(e,function(n,o){return dk(o,!0)},!0)),e}function bue(){Hr(2)}function fk(e){return e==null||typeof e!="object"||Object.isFrozen(e)}function Ho(e){var t=Eue[e];return t||Hr(18,e),t}function b$(){return Uc}function pk(e,t){t&&(Ho("Patches"),e.u=[],e.s=[],e.v=t)}function um(e){hk(e),e.p.forEach(yue),e.p=null}function hk(e){e===Uc&&(Uc=e.l)}function y$(e){return Uc={p:[],l:Uc,h:e,m:!0,_:0}}function yue(e){var t=e[Jn];t.i===0||t.i===1?t.j():t.O=!0}function mk(e,t){t._=t.p.length;var n=t.p[0],o=e!==void 0&&e!==n;return t.h.g||Ho("ES5").S(t,e,o),o?(n[Jn].P&&(um(t),Hr(4)),Ui(e)&&(e=cm(t,e),t.l||dm(t,e)),t.u&&Ho("Patches").M(n[Jn],e,t.u,t.s)):e=cm(t,n,[]),um(t),t.u&&t.v(t.u,t.s),e!==P$?e:void 0}function cm(e,t,n){if(fk(t))return t;var o=t[Jn];if(!o)return Kc(t,function(l,u){return x$(e,o,t,l,u,n)},!0),t;if(o.A!==e)return t;if(!o.P)return dm(e,o.t,!0),o.t;if(!o.I){o.I=!0,o.A._--;var i=o.i===4||o.i===5?o.o=ck(o.k):o.o;Kc(o.i===3?new Set(i):i,function(l,u){return x$(e,o,i,l,u,n)}),dm(e,i,!1),n&&e.u&&Ho("Patches").R(o,n,e.u,e.s)}return o.o}function x$(e,t,n,o,i,l){if(Ps(i)){var u=cm(e,i,l&&t&&t.i!==3&&!lk(t.D,o)?l.concat(o):void 0);if(v$(n,o,u),!Ps(u))return;e.m=!1}if(Ui(i)&&!fk(i)){if(!e.h.F&&e._<1)return;cm(e,i),t&&t.A.l||dm(e,i)}}function dm(e,t,n){n===void 0&&(n=!1),e.h.F&&e.m&&dk(t,n)}function gk(e,t){var n=e[Jn];return(n?Hi(n):e)[t]}function k$(e,t){if(t in e)for(var n=Object.getPrototypeOf(e);n;){var o=Object.getOwnPropertyDescriptor(n,t);if(o)return o;n=Object.getPrototypeOf(n)}}function vk(e){e.P||(e.P=!0,e.l&&vk(e.l))}function bk(e){e.o||(e.o=ck(e.t))}function yk(e,t,n){var o=sk(t)?Ho("MapSet").N(t,n):uk(t)?Ho("MapSet").T(t,n):e.g?function(i,l){var u=Array.isArray(i),c={i:u?1:0,A:l?l.A:b$(),P:!1,I:!1,D:{},l,t:i,k:null,o:null,j:null,C:!1},d=c,p=pm;u&&(d=[c],p=hm);var h=Proxy.revocable(d,p),b=h.revoke,g=h.proxy;return c.k=g,c.j=b,g}(t,n):Ho("ES5").J(t,n);return(n?n.A:b$()).p.push(o),o}function fm(e){return Ps(e)||Hr(22,e),function t(n){if(!Ui(n))return n;var o,i=n[Jn],l=Is(n);if(i){if(!i.P&&(i.i<4||!Ho("ES5").K(i)))return i.t;i.I=!0,o=w$(n,l),i.I=!1}else o=w$(n,l);return Kc(o,function(u,c){i&&gue(i.t,u)===c||v$(o,u,t(c))}),l===3?new Set(o):o}(e)}function w$(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return ck(e)}var S$,Uc,xk=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",xue=typeof Map<"u",kue=typeof Set<"u",E$=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",P$=xk?Symbol.for("immer-nothing"):((S$={})["immer-nothing"]=!0,S$),I$=xk?Symbol.for("immer-draftable"):"__$immer_draftable",Jn=xk?Symbol.for("immer-state"):"__$immer_state",wue=""+Object.prototype.constructor,kk=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,Sue=Object.getOwnPropertyDescriptors||function(e){var t={};return kk(e).forEach(function(n){t[n]=Object.getOwnPropertyDescriptor(e,n)}),t},Eue={},pm={get:function(e,t){if(t===Jn)return e;var n=Hi(e);if(!lk(n,t))return function(i,l,u){var c,d=k$(l,u);return d?"value"in d?d.value:(c=d.get)===null||c===void 0?void 0:c.call(i.k):void 0}(e,n,t);var o=n[t];return e.I||!Ui(o)?o:o===gk(e.t,t)?(bk(e),e.o[t]=yk(e.A.h,o,e)):o},has:function(e,t){return t in Hi(e)},ownKeys:function(e){return Reflect.ownKeys(Hi(e))},set:function(e,t,n){var o=k$(Hi(e),t);if(o!=null&&o.set)return o.set.call(e.k,n),!0;if(!e.P){var i=gk(Hi(e),t),l=i?.[Jn];if(l&&l.t===n)return e.o[t]=n,e.D[t]=!1,!0;if(vue(n,i)&&(n!==void 0||lk(e.t,t)))return!0;bk(e),vk(e)}return e.o[t]===n&&typeof n!="number"&&(n!==void 0||t in e.o)||(e.o[t]=n,e.D[t]=!0,!0)},deleteProperty:function(e,t){return gk(e.t,t)!==void 0||t in e.t?(e.D[t]=!1,bk(e),vk(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var n=Hi(e),o=Reflect.getOwnPropertyDescriptor(n,t);return o&&{writable:!0,configurable:e.i!==1||t!=="length",enumerable:o.enumerable,value:n[t]}},defineProperty:function(){Hr(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){Hr(12)}},hm={};Kc(pm,function(e,t){hm[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),hm.deleteProperty=function(e,t){return pm.deleteProperty.call(this,e[0],t)},hm.set=function(e,t,n){return pm.set.call(this,e[0],t,n,e[0])};var Pue=function(){function e(n){var o=this;this.g=E$,this.F=!0,this.produce=function(i,l,u){if(typeof i=="function"&&typeof l!="function"){var c=l;l=i;var d=o;return function(m){var y=this;m===void 0&&(m=c);for(var x=arguments.length,S=Array(x>1?x-1:0),E=1;E<x;E++)S[E-1]=arguments[E];return d.produce(m,function(P){var O;return(O=l).call.apply(O,[y,P].concat(S))})}}var p;if(typeof l!="function"&&Hr(6),u!==void 0&&typeof u!="function"&&Hr(7),Ui(i)){var h=y$(o),b=yk(o,i,void 0),g=!0;try{p=l(b),g=!1}finally{g?um(h):hk(h)}return typeof Promise<"u"&&p instanceof Promise?p.then(function(m){return pk(h,u),mk(m,h)},function(m){throw um(h),m}):(pk(h,u),mk(p,h))}if(!i||typeof i!="object")return(p=l(i))===P$?void 0:(p===void 0&&(p=i),o.F&&dk(p,!0),p);Hr(21,i)},this.produceWithPatches=function(i,l){return typeof i=="function"?function(d){for(var p=arguments.length,h=Array(p>1?p-1:0),b=1;b<p;b++)h[b-1]=arguments[b];return o.produceWithPatches(d,function(g){return i.apply(void 0,[g].concat(h))})}:[o.produce(i,l,function(d,p){u=d,c=p}),u,c];var u,c},typeof n?.useProxies=="boolean"&&this.setUseProxies(n.useProxies),typeof n?.autoFreeze=="boolean"&&this.setAutoFreeze(n.autoFreeze)}var t=e.prototype;return t.createDraft=function(n){Ui(n)||Hr(8),Ps(n)&&(n=fm(n));var o=y$(this),i=yk(this,n,void 0);return i[Jn].C=!0,hk(o),i},t.finishDraft=function(n,o){var i=n&&n[Jn],l=i.A;return pk(l,o),mk(void 0,l)},t.setAutoFreeze=function(n){this.F=n},t.setUseProxies=function(n){n&&!E$&&Hr(20),this.g=n},t.applyPatches=function(n,o){var i;for(i=o.length-1;i>=0;i--){var l=o[i];if(l.path.length===0&&l.op==="replace"){n=l.value;break}}var u=Ho("Patches").$;return Ps(n)?u(n,o):this.produce(n,function(c){return u(c,o.slice(i+1))})},e}(),Zn=new Pue;Zn.produce,Zn.produceWithPatches.bind(Zn),Zn.setAutoFreeze.bind(Zn),Zn.setUseProxies.bind(Zn),Zn.applyPatches.bind(Zn);var wk=Zn.createDraft.bind(Zn),Sk=Zn.finishDraft.bind(Zn);bee(),Iee(),Uee(),pv(),Wee(),xh(),Qt(),Ja();var St={create(e){let t={byId:{},allIds:{}};if(e)for(let[n,o]of e)t.byId[n]=o,t.allIds[n]=!0;return t},shallowCopy(e){return{byId:F({},e?.byId),allIds:F({},e?.allIds)}},add(e,t,n){return{byId:ne(F({},e?.byId),{[t]:n}),allIds:ne(F({},e?.allIds),{[t]:!0})}},merge(e){let t=St.create();for(let n=0;n<e.length;n++)t.byId=F(F({},t.byId),e[n].byId),t.allIds=F(F({},t.allIds),e[n].allIds);return t},remove(e,t){let n=St.shallowCopy(e);return delete n.allIds[t],delete n.byId[t],n},filter(e,t){let n=St.shallowCopy(e);for(let[o,i]of Object.entries(n.byId))t(i)||(delete n.allIds[o],delete n.byId[o]);return n}},j$=e=>(Ek=e,Pk),Ek,on=()=>{if(Ek===void 0)throw new Error("Calling stateEditors outside of a transaction is not allowed.");return Ek},Pk;(e=>{(t=>{(n=>{(o=>{function i(l){let u=on().historic;u.panelPositions!=null||(u.panelPositions={}),u.panelPositions[l.panelId]=l.position}o.setPanelPosition=i})(n.panelPositions||(n.panelPositions={})),(o=>{function i(){var l;return(l=on().historic).panels!=null||(l.panels={}),on().historic.panels}o._ensure=i,(l=>{function u(){let c=e.studio.historic.panels._ensure();return c.outlinePanel!=null||(c.outlinePanel={}),c.outlinePanel}l._ensure=u,(c=>{function d(h){let b=[];for(let g of sr(h))IS(g)?b.push(F({type:"Project"},g.address)):Zr(g)?(b.push(F({type:"Sheet"},g.template.address)),e.studio.historic.projects.stateByProjectId.stateBySheetId.setSelectedInstanceId(g.address)):jS(g)?b.push(F({type:"Sheet"},g.address)):jt(g)?(b.push(F({type:"SheetObject"},g.template.address)),e.studio.historic.projects.stateByProjectId.stateBySheetId.setSelectedInstanceId(g.sheet.address)):OS(g)&&b.push(F({type:"SheetObject"},g.address));l._ensure().selection=b}c.set=d;function p(){l._ensure().selection=[]}c.unset=p})(l.selection||(l.selection={}))})(o.outline||(o.outline={})),(l=>{function u(){let h=e.studio.historic.panels._ensure();return h.sequenceEditor!=null||(h.sequenceEditor={}),h.sequenceEditor}l._ensure=u,(h=>{function b(){let m=l._ensure();return m.graphEditor!=null||(m.graphEditor={height:.5,isOpen:!1}),m.graphEditor}function g(m){b().isOpen=m.isOpen}h.setIsOpen=g})(l.graphEditor||(l.graphEditor={}));function c(h){let b=l._ensure();b.rightPanelOpen=h}l.setRightPanelOpen=c;function d(h){let b=l._ensure();b.dopesheetLeftWidth=h}l.setDopesheetLeftWidth=d;function p(){let h=l._ensure();return h.rightPanelOpen===void 0&&(h.rightPanelOpen=!0),h.rightPanelOpen}l._ensureRightPanelOpen=p})(o.sequenceEditor||(o.sequenceEditor={}))})(n.panels||(n.panels={})),(o=>{(i=>{function l(u){let c=on().historic;return c.projects.stateByProjectId[u.projectId]||(c.projects.stateByProjectId[u.projectId]={stateBySheetId:{}}),c.projects.stateByProjectId[u.projectId]}i._ensure=l,(u=>{function c(p){let h=e.studio.historic.projects.stateByProjectId._ensure(p);return h.stateBySheetId[p.sheetId]||(h.stateBySheetId[p.sheetId]={selectedInstanceId:void 0,sequenceEditor:{selectedPropsByObject:{}}}),h.stateBySheetId[p.sheetId]}u._ensure=c;function d(p){e.studio.historic.projects.stateByProjectId.stateBySheetId._ensure(p).selectedInstanceId=p.sheetInstanceId}u.setSelectedInstanceId=d,(p=>{function h(M){let{selectedPropsByObject:_}=u._ensure(M).sequenceEditor;_[M.objectKey]||(_[M.objectKey]={});let L=_[M.objectKey],U=Rr(M.pathToProp),N=new Set(Object.keys(wc));for(let[K,ce]of Object.entries(fm(_)))for(let[J,W]of Object.entries(ce))N.delete(W);let se=N.size>0?N.values().next().value:Object.keys(wc)[0];L[U]=se}p.addPropToGraphEditor=h;function b(M){let{selectedPropsByObject:_}=u._ensure(M).sequenceEditor;if(!_[M.objectKey])return;let L=_[M.objectKey],U=Rr(M.pathToProp);L[U]&&g$(_,[M.objectKey,U])}p.removePropFromGraphEditor=b;function g(M){let _=e.studio.historic.projects.stateByProjectId.stateBySheetId._ensure(M).sequenceEditor;return _.markerSet||(_.markerSet=St.create()),_.markerSet}function m(M){let _=g(M.sheetAddress),L=M.markers.filter(J=>!!isFinite(J.position)).map(J=>ne(F({},J),{position:M.snappingFunction(J.position)})),U=ua(L,"id"),N=St.filter(_,J=>J&&!U[J.id]),se=ua(Object.values(N.byId),"position");L.forEach(({position:J})=>{let W=se[J];W&&(N=St.remove(N,W.id))}),Object.assign(_,St.merge([N,St.create(L.map(J=>[J.id,J]))]));let K=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);K.sequence||(K.sequence={type:"PositionalSequence",length:10,subUnitsPerUnit:30,tracksByObject:{}});let ce=[...Object.values(N.byId).filter(J=>J!==void 0),...L].sort((J,W)=>J.position-W.position);K.sequence.markers=ce.map(J=>({id:J.id,label:J.label,position:J.position}))}p.replaceMarkers=m;function y(M){var _;let L=g(M.sheetAddress);Object.assign(L,St.remove(L,M.markerId));let U=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);(_=U.sequence)!=null&&_.markers&&(U.sequence.markers=U.sequence.markers.filter(N=>N.id!==M.markerId))}p.removeMarker=y;function x(M){var _;let L=g(M.sheetAddress).byId[M.markerId];if(L!==void 0){L.label=M.label;let U=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);if((_=U.sequence)!=null&&_.markers){let N=U.sequence.markers.find(se=>se.id===M.markerId);N&&(N.label=M.label)}}}p.updateMarker=x;function S(M){let _=e.studio.historic.projects.stateByProjectId.stateBySheetId._ensure(M).sequenceEditor;return _.eventSet||(_.eventSet=St.create()),_.eventSet}function E(M){let _=S(M.sheetAddress),L=M.events.filter(J=>isFinite(J.position)?!J.name||typeof J.name!="string"?(console.warn("Event filtered out: invalid name",J),!1):!0:(console.warn("Event filtered out: invalid position",J),!1)).map(J=>ne(F({},J),{position:M.snappingFunction?M.snappingFunction(J.position):J.position})),U=ua(L,"id"),N=St.filter(_,J=>J&&!U[J.id]),se=ua(Object.values(N.byId),"position");L.forEach(({position:J})=>{let W=se[J];W&&(N=St.remove(N,W.id))}),Object.assign(_,St.merge([N,St.create(L.map(J=>[J.id,J]))]));let K=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);K.sequence||(K.sequence={type:"PositionalSequence",length:10,subUnitsPerUnit:30,tracksByObject:{}});let ce=[...Object.values(N.byId).filter(J=>J!==void 0),...L].sort((J,W)=>J.position-W.position);K.sequence.events=ce.map(J=>({id:J.id,name:J.name,position:J.position,value:J.value}))}p.replaceEvents=E;function P(M){var _;let L=S(M.sheetAddress);Object.assign(L,St.remove(L,M.eventId));let U=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);(_=U.sequence)!=null&&_.events&&(U.sequence.events=U.sequence.events.filter(N=>N.id!==M.eventId))}p.removeEvent=P;function O(M){var _;let L=S(M.sheetAddress).byId[M.eventId];if(L!==void 0){L.name=M.name,L.value=M.value;let U=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);if((_=U.sequence)!=null&&_.events){let N=U.sequence.events.find(se=>se.id===M.eventId);N&&(N.name=M.name,N.value=M.value)}}}p.updateEvent=O;function z(M){let _=e.studio.historic.projects.stateByProjectId.stateBySheetId._ensure(M).sequenceEditor;return _.subSequenceSet||(_.subSequenceSet=St.create()),_.subSequenceSet}function B(M){let _=z(M.sheetAddress),L=M.subSequences.filter(J=>isFinite(J.position)?!J.sheetId||typeof J.sheetId!="string"?(console.warn("SubSequence filtered out: invalid sheetId",J),!1):J.duration!==void 0&&!isFinite(J.duration)?(console.warn("SubSequence filtered out: invalid duration",J),!1):J.timeScale!==void 0&&(!isFinite(J.timeScale)||J.timeScale<=0)?(console.warn("SubSequence filtered out: invalid timeScale",J),!1):!0:(console.warn("SubSequence filtered out: invalid position",J),!1)).map(J=>{var W;return ne(F({},J),{position:M.snappingFunction(J.position),timeScale:(W=J.timeScale)!=null?W:1})}),U=ua(L,"id"),N=St.filter(_,J=>J&&!U[J.id]),se=Object.values(N.byId).filter(J=>J!==void 0);L.forEach(J=>{var W;let A=J.position,Y=J.position+((W=J.duration)!=null?W:0);se.forEach(ie=>{var q;let G=ie.position,ue=ie.position+((q=ie.duration)!=null?q:0);A<ue&&Y>G&&(N=St.remove(N,ie.id))})}),Object.assign(_,St.merge([N,St.create(L.map(J=>[J.id,J]))]));let K=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);K.sequence||(K.sequence={type:"PositionalSequence",length:10,subUnitsPerUnit:30,tracksByObject:{}});let ce=[...Object.values(N.byId).filter(J=>J!==void 0),...L].sort((J,W)=>J.position-W.position);K.sequence.subSequences=ce.map(J=>({id:J.id,sheetId:J.sheetId,position:J.position,duration:J.duration,timeScale:J.timeScale,label:J.label}))}p.replaceSubSequences=B;function D(M){var _;let L=z(M.sheetAddress);Object.assign(L,St.remove(L,M.subSequenceId));let U=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);(_=U.sequence)!=null&&_.subSequences&&(U.sequence.subSequences=U.sequence.subSequences.filter(N=>N.id!==M.subSequenceId))}p.removeSubSequence=D;function X(M){var _;let L=z(M.sheetAddress).byId[M.subSequenceId];if(L!==void 0){M.updates.position!==void 0&&(L.position=M.updates.position),M.updates.duration!==void 0&&(L.duration=M.updates.duration),M.updates.timeScale!==void 0&&(L.timeScale=M.updates.timeScale),M.updates.label!==void 0&&(L.label=M.updates.label);let U=e.coreByProject.historic.sheetsById._ensure(M.sheetAddress);if((_=U.sequence)!=null&&_.subSequences){let N=U.sequence.subSequences.find(se=>se.id===M.subSequenceId);N&&(M.updates.position!==void 0&&(N.position=M.updates.position),M.updates.duration!==void 0&&(N.duration=M.updates.duration),M.updates.timeScale!==void 0&&(N.timeScale=M.updates.timeScale),M.updates.label!==void 0&&(N.label=M.updates.label))}}}p.updateSubSequence=X})(u.sequenceEditor||(u.sequenceEditor={}))})(i.stateBySheetId||(i.stateBySheetId={}))})(o.stateByProjectId||(o.stateByProjectId={}))})(n.projects||(n.projects={}))})(t.historic||(t.historic={})),(n=>{function o(i){on().ephemeral.showOutline=i}n.setShowOutline=o,(i=>{(l=>{function u(c){let d=on().ephemeral;return d.projects.stateByProjectId[c.projectId]||(d.projects.stateByProjectId[c.projectId]={stateBySheetId:{}}),d.projects.stateByProjectId[c.projectId]}l._ensure=u,(c=>{function d(p){let h=e.studio.ephemeral.projects.stateByProjectId._ensure(p);return h.stateBySheetId[p.sheetId]||(h.stateBySheetId[p.sheetId]={stateByObjectKey:{}}),h.stateBySheetId[p.sheetId]}c._ensure=d,(p=>{function h(b){var g;let m=e.studio.ephemeral.projects.stateByProjectId.stateBySheetId._ensure(b).stateByObjectKey;return m[g=b.objectKey]!=null||(m[g]={}),m[b.objectKey]}p._ensure=h,(b=>{function g(y){let x=e.studio.ephemeral.projects.stateByProjectId.stateBySheetId.stateByObjectKey._ensure(y);return x.valuesBeingScrubbed!=null||(x.valuesBeingScrubbed={}),x.valuesBeingScrubbed}b._ensure=g;function m(y){El(g(y),y.pathToProp,!0)}b.flag=m})(p.propsBeingScrubbed||(p.propsBeingScrubbed={}))})(c.stateByObjectKey||(c.stateByObjectKey={}))})(l.stateBySheetId||(l.stateBySheetId={}))})(i.stateByProjectId||(i.stateByProjectId={}))})(n.projects||(n.projects={}))})(t.ephemeral||(t.ephemeral={})),(n=>{function o(d){on().ahistoric.pinOutline=d}n.setPinOutline=o;function i(d){on().ahistoric.pinDetails=d}n.setPinDetails=i;function l(d){on().ahistoric.pinNotifications=d}n.setPinNotifications=l;function u(d){on().ahistoric.visibilityState=d}n.setVisibilityState=u;function c(d){let p=qy(d.map(g=>g.pathToProp)),h=d.map(({keyframe:g,pathToProp:m})=>({keyframe:g,pathToProp:m.slice(p.length)})),b=on();b.ahistoric.clipboard?b.ahistoric.clipboard.keyframesWithRelativePaths=h:b.ahistoric.clipboard={keyframesWithRelativePaths:h}}n.setClipboardKeyframes=c,(d=>{(p=>{function h(b){let g=on().ahistoric;return g.projects.stateByProjectId[b.projectId]||(g.projects.stateByProjectId[b.projectId]={stateBySheetId:{}}),g.projects.stateByProjectId[b.projectId]}p._ensure=h,(b=>{function g(y){let x=e.studio.ahistoric.projects.stateByProjectId._ensure(y);return x.collapsedItemsInOutline||(x.collapsedItemsInOutline={}),x.collapsedItemsInOutline}b._ensure=g;function m(y){let x=e.studio.ahistoric.projects.stateByProjectId.collapsedItemsInOutline._ensure(y);y.isCollapsed?x[y.itemKey]=!0:delete x[y.itemKey]}b.set=m})(p.collapsedItemsInOutline||(p.collapsedItemsInOutline={})),(b=>{function g(m){let y=e.studio.ahistoric.projects.stateByProjectId._ensure(m);return y.stateBySheetId[m.sheetId]||(y.stateBySheetId[m.sheetId]={}),y.stateBySheetId[m.sheetId]}b._ensure=g,(m=>{function y(x){let S=e.studio.ahistoric.projects.stateByProjectId.stateBySheetId._ensure(x);return S.sequence||(S.sequence={}),S.sequence}m._ensure=y,(x=>{function S(P){e.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence._ensure(P).focusRange={range:P.range,enabled:P.enabled}}x.set=S;function E(P){e.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence._ensure(P).focusRange=void 0}x.unset=E})(m.focusRange||(m.focusRange={})),(x=>{function S(E){e.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence._ensure(E).clippedSpaceRange=F({},E.range)}x.set=S})(m.clippedSpaceRange||(m.clippedSpaceRange={})),(x=>{function S(P){let O=e.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence._ensure(P),z=O.collapsableItems;return z||(z=O.collapsableItems=St.create()),z}function E(P){let O=S(P);Object.assign(O,St.add(O,P.studioSheetItemKey,{isCollapsed:P.isCollapsed}))}x.set=E})(m.sequenceEditorCollapsableItems||(m.sequenceEditorCollapsableItems={}))})(b.sequence||(b.sequence={}))})(p.stateBySheetId||(p.stateBySheetId={}))})(d.stateByProjectId||(d.stateByProjectId={}))})(n.projects||(n.projects={}))})(t.ahistoric||(t.ahistoric={}))})(e.studio||(e.studio={})),(t=>{(n=>{(o=>{function i(l){let u=on().historic.coreByProject[l.projectId].revisionHistory,c=50;u.unshift(l.revision),u.length>c&&(u.length=c)}o.add=i})(n.revisionHistory||(n.revisionHistory={})),(o=>{function i(c){let d=on().historic.coreByProject[c.projectId].sheetsById;return d[c.sheetId]||(d[c.sheetId]={staticOverrides:{byObject:{}}}),d[c.sheetId]}o._ensure=i;function l(c){let d=on().historic.coreByProject[c.projectId].sheetsById[c.sheetId];if(!d)return;delete d.staticOverrides.byObject[c.objectKey];let p=d.sequence;p&&delete p.tracksByObject[c.objectKey]}o.forgetObject=l;function u(c){on().historic.coreByProject[c.projectId].sheetsById[c.sheetId]&&delete on().historic.coreByProject[c.projectId].sheetsById[c.sheetId]}o.forgetSheet=u,(c=>{function d(_){let L=e.coreByProject.historic.sheetsById._ensure(_);return L.sequence!=null||(L.sequence={subUnitsPerUnit:30,length:10,type:"PositionalSequence",tracksByObject:{}}),L.sequence}c._ensure=d;function p(_){d(_).length=at(parseFloat(_.length.toFixed(2)),.01,1/0)}c.setLength=p;function h(_){d(_).subUnitsPerUnit=at(_.subUnitsPerUnit,1,wS(2,12))}c.setSubUnitsPerUnit=h;function b(_){var L;let U=e.coreByProject.historic.sheetsById.sequence._ensure(_).tracksByObject;return U[L=_.objectKey]!=null||(U[L]={trackData:{},trackIdByPropPath:{}}),U[_.objectKey]}function g(_,L){let U=b(_),N=Rr(_.pathToProp);if(typeof U.trackIdByPropPath[N]=="string")return;let se=eoe(),K={type:"BasicKeyframedTrack",__debugName:"".concat(_.objectKey,":").concat(N),keyframes:[]};U.trackData[se]=K,U.trackIdByPropPath[N]=se}c.setPrimitivePropAsSequenced=g;function m(_){let L=b(_),U=Rr(_.pathToProp),N=L.trackIdByPropPath[U];typeof N=="string"&&(delete L.trackIdByPropPath[U],delete L.trackData[N],e.coreByProject.historic.sheetsById.staticOverrides.byObject.setValueOfPrimitiveProp(_))}c.setPrimitivePropAsStatic=m;function y(_){let L=b(_);for(let U of Object.keys(L.trackIdByPropPath)){let N=JSON.parse(U);if(_.pathToProp.every((se,K)=>N[K]===se)){let se=L.trackIdByPropPath[U];if(typeof se!="string")continue;delete L.trackIdByPropPath[U],delete L.trackData[se]}}e.coreByProject.historic.sheetsById.staticOverrides.byObject.setValueOfCompoundProp(_)}c.setCompoundPropAsStatic=y;function x(_){return b(_).trackData[_.trackId]}function S(_){let L=x(_);if(L)return L.keyframes.find(U=>U.id===_.keyframeId)}function E(_){let L=_.snappingFunction(_.position),U=x(_);if(!U)return;let{keyframes:N}=U,se=N.findIndex(J=>J.position===L);if(se!==-1){let J=N[se];J.value=_.value;return}let K=n5(N,J=>J.position<L);if(K===-1){N.unshift({id:sD(),position:L,connectedRight:!0,handles:_.handles||[.5,1,.5,0],type:_.type||"bezier",value:_.value});return}let ce=N[K];N.splice(K+1,0,{id:sD(),position:L,connectedRight:ce.connectedRight,handles:_.handles||[.5,1,.5,0],type:_.type||"bezier",value:_.value})}c.setKeyframeAtPosition=E;function P(_){let L=x(_);if(!L)return;let{keyframes:U}=L,N=U.findIndex(se=>se.position===_.position);N!==-1&&U.splice(N,1)}c.unsetKeyframeAtPosition=P;function O(_){let L=x(_);if(!L)return;let U=fm(L.keyframes).filter(N=>_.keyframeIds.includes(N.id)).map(N=>{let se=N.position,K=_.snappingFunction(mue(se,_));return ne(F({},N),{position:K})});M(ne(F({},_),{keyframes:U}))}c.transformKeyframes=O;function z(_){let L=x(_);L&&(L.keyframes=L.keyframes.map((U,N)=>{let se=L.keyframes[N-1],K=_.keyframeIds.includes(U.id),ce=_.keyframeIds.includes(se?.id);return K&&!ce?ne(F({},U),{handles:[U.handles[0],U.handles[1],_.handles[0],_.handles[1]]}):K&&ce?ne(F({},U),{handles:[_.handles[2],_.handles[3],_.handles[0],_.handles[1]]}):ce?ne(F({},U),{handles:[_.handles[2],_.handles[3],U.handles[2],U.handles[3]]}):U}))}c.setTweenBetweenKeyframes=z;function B(_){var L,U,N,se,K,ce,J,W;let A=S(_);A&&(A.handles=[(U=(L=_.end)==null?void 0:L[0])!=null?U:A.handles[0],(se=(N=_.end)==null?void 0:N[1])!=null?se:A.handles[1],(ce=(K=_.start)==null?void 0:K[0])!=null?ce:A.handles[2],(W=(J=_.start)==null?void 0:J[1])!=null?W:A.handles[3]])}c.setHandlesForKeyframe=B;function D(_){let L=x(_);L&&(L.keyframes=L.keyframes.filter(U=>_.keyframeIds.indexOf(U.id)===-1))}c.deleteKeyframes=D;function X(_){let L=S(_);L&&(L.type=_.keyframeType)}c.setKeyframeType=X;function M(_){let L=x(_);if(!L)return;let U=fm(L.keyframes),N=_.keyframes.filter(W=>!(typeof W.value=="number"&&!isFinite(W.value)||!W.handles.every(A=>isFinite(A)))).map(W=>ne(F({},W),{position:_.snappingFunction(W.position)})),se=ua(N,"id"),K=U.filter(W=>!se[W.id]),ce=ua(K,"position");N.forEach(({position:W})=>{let A=ce[W];A&&x5(K,A)});let J=E5([...K,...N],"position");L.keyframes=J}c.replaceKeyframes=M})(o.sequence||(o.sequence={})),(c=>{(d=>{function p(m){var y;let x=e.coreByProject.historic.sheetsById._ensure(m).staticOverrides.byObject;return x[y=m.objectKey]!=null||(x[y]={}),x[m.objectKey]}function h(m){let y=p(m);El(y,m.pathToProp,m.value)}d.setValueOfCompoundProp=h;function b(m){let y=p(m);El(y,m.pathToProp,m.value)}d.setValueOfPrimitiveProp=b;function g(m){let y=e.coreByProject.historic.sheetsById._ensure(m).staticOverrides.byObject[m.objectKey];y&&g$(y,m.pathToProp)}d.unsetValueOfPrimitiveProp=g})(c.byObject||(c.byObject={}))})(o.staticOverrides||(o.staticOverrides={}))})(n.sheetsById||(n.sheetsById={}))})(t.historic||(t.historic={}))})(e.coreByProject||(e.coreByProject={}))})(Pk||(Pk={}));function Ik(){let e,t,n=new Promise((i,l)=>{e=u=>{i(u),o.status="resolved"},t=u=>{l(u),o.status="rejected"}}),o={resolve:e,reject:t,promise:n,status:"pending"};return o}var Iue=ge.requireDist();function jue(e){let t=e.getState(),n=new Iue.Atom(t);return e.subscribe(()=>{let o=e.getState();n.set(o),t=o}),n}KP();function Cue(e){var t,n=e.Symbol;return typeof n=="function"?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}var Hc;typeof self<"u"?Hc=self:typeof window<"u"?Hc=window:typeof ge.commonjsGlobal<"u"?Hc=ge.commonjsGlobal:Hc=wn;var Oue=Cue(Hc),C$=Oue,O$={INIT:"@@redux/INIT"};function _$(e,t,n){var o;if(typeof t=="function"&&typeof n>"u"&&(n=t,t=void 0),typeof n<"u"){if(typeof n!="function")throw new Error("Expected the enhancer to be a function.");return n(_$)(e,t)}if(typeof e!="function")throw new Error("Expected the reducer to be a function.");var i=e,l=t,u=[],c=u,d=!1;function p(){c===u&&(c=u.slice())}function h(){return l}function b(x){if(typeof x!="function")throw new Error("Expected listener to be a function.");var S=!0;return p(),c.push(x),function(){if(S){S=!1,p();var E=c.indexOf(x);c.splice(E,1)}}}function g(x){if(!of(x))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(typeof x.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,l=i(l,x)}finally{d=!1}for(var S=u=c,E=0;E<S.length;E++){var P=S[E];P()}return x}function m(x){if(typeof x!="function")throw new Error("Expected the nextReducer to be a function.");i=x,g({type:O$.INIT})}function y(){var x,S=b;return x={subscribe:function(E){if(typeof E!="object")throw new TypeError("Expected the observer to be an object.");function P(){E.next&&E.next(h())}P();var O=S(P);return{unsubscribe:O}}},x[C$]=function(){return this},x}return g({type:O$.INIT}),o={dispatch:g,subscribe:b,getState:h,replaceReducer:m},o[C$]=y,o}function _ue(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.length===0?function(o){return o}:t.length===1?t[0]:t.reduce(function(o,i){return function(){return o(i.apply(void 0,arguments))}})}function Due(e){let t=_ue();return _$(e.rootReducer,void 0,t)}Ph(),XC();var jk=new WeakMap,Tue=(e,t,n)=>{let o=d=>{e.dispatch(Es.replacePersistentState(d))},i=D$(n),l=()=>e.getState().$persistent;c();let u=()=>{let d=l(),p=jk.get(e);d!==p&&(jk.set(e,d),localStorage.setItem(i,JSON.stringify(d)))};e.subscribe(lv(u,1e3)),window&&window.addEventListener("beforeunload",u);function c(){let d=localStorage.getItem(i);if(d){let p,h=!0;try{p=JSON.parse(d),h=!1}catch{Eh.warn("Could not parse Theatre's persisted state. This must be a bug. Please report it.")}finally{h||o(p),t()}}else t()}},Aue=(e,t)=>{let n=D$(t),o=e.getState().$persistent;localStorage.removeItem(n),jk.set(e,o)};function D$(e){return e+".persistent"}var Bue=(e=21)=>{let t="",n=crypto.getRandomValues(new Uint8Array(e));for(;e--;){let o=n[e]&63;o<36?t+=o.toString(36):o<62?t+=(o-26).toString(36).toUpperCase():o<63?t+="_":t+="-"}return t};function zue(){return Bue(16)}dZ(),Ja(),ku(),l5(),Sp();var mm=ge.requireDist();ha(),Qt(),kK();function Ck(e){if(typeof e=="boolean"||typeof e=="string"||typeof e=="number")return e;if(of(e)){let t={},n=!1;for(let[o,i]of Object.entries(e))Ck(i)!==void 0&&(t[o]=i,n=!0);if(n)return t}else return}function T$(e,t,n){for(let[o,i]of Object.entries(e.props))if(i.type==="compound")T$(i,[...t,o],n);else{if(i.type==="enum")throw new Error("Not yet implemented");n(i,[...t,o])}}function que(e,t,n){return{set:(o,i)=>{e();let l=Ck(i);if(typeof l>"u")return;let{root:u,path:c}=(0,mm.getPointerParts)(o);if(jt(u)){let d=u.template.getMapOfValidSequenceTracks_forStudio().getValue(),p=Zl(u.template.staticConfig,c);if(!p)throw new Error("Object ".concat(u.address.objectKey," does not have a prop at ").concat(JSON.stringify(c)));let h=(b,g,m)=>{if(b==null)return;if(Ck(g.deserializeAndSanitize(b))===void 0)throw new Error("Invalid value ".concat(Ox(b)," for object.props").concat(m.map(S=>"[".concat(JSON.stringify(S),"]")).join("")," is invalid"));let y=ne(F({},u.address),{pathToProp:m}),x=ni(d,m);if(typeof x=="string"){let S=u.sheet.getSequence();S.position=S.closestGridPosition(S.position),t.coreByProject.historic.sheetsById.sequence.setKeyframeAtPosition(ne(F({},y),{trackId:x,position:S.position,value:b,snappingFunction:S.closestGridPosition,type:"bezier"}))}else t.coreByProject.historic.sheetsById.staticOverrides.byObject.setValueOfPrimitiveProp(ne(F({},y),{value:b}))};if(p.type==="compound"){let b=(0,mm.getPointerParts)(o).path,g=b.length;T$(p,b,(m,y)=>{let x=y.slice(g),S=ma(l,x);if(typeof S<"u")h(S,m,y);else throw new Error("Property object.props".concat(y.map(E=>"[".concat(JSON.stringify(E),"]")).join("")," is required but not provided"))})}else{if(p.type==="enum")throw new Error("Enums aren't implemented yet");h(l,p,c)}}else if(CS(u)){let[d]=c;if(d==="subUnitsPerUnit"){if(typeof l!="number"||!dv(l)||l<1)throw new Error("Value ".concat(l," is not an integer, which is required for setting sequence prop ").concat(d));t.coreByProject.historic.sheetsById.sequence.setSubUnitsPerUnit(ne(F({},u.address),{subUnitsPerUnit:l}))}else if(d==="length"){if(typeof l!="number"||l<=.001)throw new Error("Value ".concat(l," is not a positive number, which is required for setting sequence prop ").concat(d));t.coreByProject.historic.sheetsById.sequence.setLength(ne(F({},u.address),{length:l}))}else throw new Error("Setting sequence prop ".concat(d," is not supported"))}else throw new Error("Only setting props of SheetObject-s and sequences is supported in a transaction so far")},unset:o=>{e();let{root:i,path:l}=(0,mm.getPointerParts)(o);if(jt(i)){let u=i.template.getMapOfValidSequenceTracks_forStudio().getValue(),c=ma(i.template.getDefaultValues().getValue(),l),d=Zl(i.template.staticConfig,l),p=(h,b)=>{let g=ne(F({},i.address),{pathToProp:b}),m=ni(u,b);typeof m=="string"?t.coreByProject.historic.sheetsById.sequence.unsetKeyframeAtPosition(ne(F({},g),{trackId:m,position:i.sheet.getSequence().positionSnappedToGrid})):d!==void 0&&t.coreByProject.historic.sheetsById.staticOverrides.byObject.unsetValueOfPrimitiveProp(g)};d.type==="compound"?om(c,(h,b)=>{p(h,b)},(0,mm.getPointerParts)(o).path):p(c,l)}else throw new Error("Only setting props of SheetObject-s is supported in a transaction so far")},get drafts(){return e(),n},get stateEditors(){return t}}}var Mue=class{constructor(){Je(this,"_reduxStore"),Je(this,"_atom"),Je(this,"atomP"),this._reduxStore=Due({rootReducer:hue}),this._atom=jue(this._reduxStore),this.atomP=this._atom.pointer}initialize(e){let t=Ik();return e.usePersistentStorage===!0?Tue(this._reduxStore,()=>{this.tempTransaction(({drafts:n})=>{n.ephemeral.initialised=!0}).commit(),t.resolve()},e.persistenceKey):(this.tempTransaction(({drafts:n})=>{n.ephemeral.initialised=!0}).commit(),t.resolve()),t.promise}getState(){return this._reduxStore.getState()}__experimental_clearPersistentStorage(e){return Aue(this._reduxStore,e),this.getState()}__dev_startHistoryFromScratch(e){this._reduxStore.dispatch(Es.historic.startHistoryFromScratch(Es.reduceParts(t=>ne(F({},t),{historic:e}))))}tempTransaction(e){let t=pue(),n,o=t.push(Es.reduceParts(i=>{let l={historic:wk(i.historic),ahistoric:wk(i.ahistoric),ephemeral:wk(i.ephemeral)},u=!0,c=()=>{if(!u)throw new Error("You seem to have called the transaction api after studio.transaction() has finished running")},d=j$(l),p=que(c,d,l);try{return e(p),u=!1,{historic:Sk(l.historic),ahistoric:Sk(l.ahistoric),ephemeral:Sk(l.ephemeral)}}catch(h){return n=h,i}finally{j$(void 0)}}));if(this._reduxStore.dispatch(o),n)throw this._reduxStore.dispatch(t.discard()),n;return{commit:()=>{this._reduxStore.dispatch(t.commit())},discard:()=>{this._reduxStore.dispatch(t.discard())}}}undo(){this._reduxStore.dispatch(Es.historic.undo())}redo(){this._reduxStore.dispatch(Es.historic.redo())}createContentOfSaveFile(e){var t,n,o,i;if(!this._reduxStore.getState().$persistent.historic.innerState.coreByProject[e])throw new Error("Project ".concat(e," has not been initialized."));let l=zue();this.tempTransaction(({stateEditors:p})=>{p.coreByProject.historic.revisionHistory.add({projectId:e,revision:l})}).commit();let u=this._reduxStore.getState().$persistent.historic.innerState.coreByProject[e],c=(t=this._reduxStore.getState().$persistent.historic.innerState.projects)==null?void 0:t.stateByProjectId[e],d=Nj(u);if(c!=null&&c.stateBySheetId)for(let[p,h]of Object.entries(c.stateBySheetId)){if((n=h?.sequenceEditor)!=null&&n.markerSet){let b=h.sequenceEditor.markerSet;if(b.allIds&&Object.keys(b.allIds).length>0){d.sheetsById[p]||(d.sheetsById[p]={staticOverrides:{byObject:{}}});let g=d.sheetsById[p];g&&!g.sequence&&(g.sequence={type:"PositionalSequence",length:10,subUnitsPerUnit:30,tracksByObject:{}});let m=Object.entries(b.byId).map(([y,x])=>x).filter(y=>y!==void 0).sort((y,x)=>y.position-x.position);g!=null&&g.sequence&&(g.sequence.markers=m)}}if((o=h?.sequenceEditor)!=null&&o.eventSet){let b=h.sequenceEditor.eventSet;if(b.allIds&&Object.keys(b.allIds).length>0){d.sheetsById[p]||(d.sheetsById[p]={staticOverrides:{byObject:{}}});let g=d.sheetsById[p];g&&!g.sequence&&(g.sequence={type:"PositionalSequence",length:10,subUnitsPerUnit:30,tracksByObject:{}});let m=Object.entries(b.byId).map(([y,x])=>x).filter(y=>y!==void 0).sort((y,x)=>y.position-x.position);g!=null&&g.sequence&&(g.sequence.events=m)}}if((i=h?.sequenceEditor)!=null&&i.subSequenceSet){let b=h.sequenceEditor.subSequenceSet;if(b.allIds&&Object.keys(b.allIds).length>0){d.sheetsById[p]||(d.sheetsById[p]={staticOverrides:{byObject:{}}});let g=d.sheetsById[p];g&&!g.sequence&&(g.sequence={type:"PositionalSequence",length:10,subUnitsPerUnit:30,tracksByObject:{}});let m=Object.entries(b.byId).map(([y,x])=>x).filter(y=>y!==void 0).sort((y,x)=>y.position-x.position);g!=null&&g.sequence&&(g.sequence.subSequences=m)}}}return d}},Rue=ge.requireDist(),Ok=class{constructor(){Je(this,"_values",{})}get(e,t){if(this.has(e))return this._values[e];{let n=t();return this._values[e]=n,n}}has(e){return this._values.hasOwnProperty(e)}};Ja(),Ml(),Pe(),Qt(),sx();var Fue=class{constructor(e){Je(this,"ui",{hide(){Z().ui.hide()},get isHidden(){return Z().ui.isHidden},restore(){Z().ui.restore()},renderToolset(t,n){return Z().ui.renderToolset(t,n)}}),Je(this,"_cache",new Ok),Je(this,"__experimental",{__experimental_disblePlayPauseKeyboardShortcut(){yle()},__experimental_enablePlayPauseKeyboardShortcut(){xle()},__experimental_clearPersistentStorage(t){return Z().clearPersistentStorage(t)},__experimental_createContentOfSaveFileTyped(t){return Z().createContentOfSaveFile(t)}})}initialize(e){return Z().initialize(e)}extend(e,t){Z().extend(e,t)}transaction(e){return Z().transaction(({set:t,unset:n,stateEditors:o})=>e({set:t,unset:n,__experimental_forgetObject:i=>{if(!Tg(i))throw new Error("object in transactionApi.__experimental_forgetObject(object) must be the return type of sheet.object(...)");o.coreByProject.historic.sheetsById.forgetObject(i.address)},__experimental_forgetSheet:i=>{if(!Dg(i))throw new Error("sheet in transactionApi.__experimental_forgetSheet(sheet) must be the return type of project.sheet()");o.coreByProject.historic.sheetsById.forgetSheet(i.address)}}))}_getSelectionPrism(){return this._cache.get("_getSelectionPrism()",()=>(0,Rue.prism)(()=>ur().filter(e=>e.type==="Theatre_SheetObject"||e.type==="Theatre_Sheet").map(e=>e.publicApi)))}_getSelection(){return this._getSelectionPrism().getValue()}setSelection(e){let t=[...e].filter(n=>Tg(n)||Dg(n)).map(n=>Z().corePrivateAPI(n));Z().transaction(({stateEditors:n})=>{n.studio.historic.panels.outline.selection.set(t)})}onSelectionChange(e){let t=Z();return this._getSelectionPrism().onChange(t.ticker,e,!0)}get selection(){return this._getSelection()}scrub(){return Z().scrub()}getStudioProject(){let e=Z().core;if(!e)throw new Error("You're calling studio.getStudioProject() before `@tomorrowevening/theatre-core` is loaded. To fix this:\n1. Check if `@tomorrowevening/theatre-core` is import/required in your bundle.\n2. Check the stack trace of this error and make sure the funciton that calls getStudioProject() is run after `@tomorrowevening/theatre-core` is loaded.");return Z().getStudioProject(e)}debouncedScrub(e=1e3){let t,n=lv(()=>{let o=t;o&&(t=void 0,o.commit())},e);return{capture:o=>{t||(t=this.scrub());let i=!0;try{t.capture(o),i=!1}finally{if(i){let l=t;t=void 0,l.discard()}else n()}}}}createPane(e){return Z().paneManager.createPane(e)}destroyPane(e){return Z().paneManager.destroyPane(e)}createContentOfSaveFile(e){return Z().createContentOfSaveFile(e)}};lD();var $i=ge.requireDist(),Lue=class{constructor(e){this._studio=e,Je(this,"_cache",new Ok),this._instantiatePanesAsTheyComeIn()}_instantiatePanesAsTheyComeIn(){let e=this._getAllPanes();e.onStale(()=>{e.getValue()})}_getAllPanes(){return this._cache.get("_getAllPanels()",()=>(0,$i.prism)(()=>{if(!(0,$i.val)(this._studio.coreP))return{};let e=(0,$i.val)(this._studio.atomP.historic.panelInstanceDesceriptors),t=(0,$i.val)(this._studio.atomP.ephemeral.extensions.paneClasses),n={};for(let o of Object.values(e)){if(!o)continue;let i=t[o.paneClass];if(!i)continue;let{instanceId:l}=o,{extensionId:u,classDefinition:c}=i,d=$i.prism.memo("instance-".concat(o.instanceId),()=>({extensionId:u,instanceId:l,definition:c}),[c]);n[l]=d}return n}))}get allPanesD(){return this._getAllPanes()}createPane(e){if(!this._studio.core)throw new Error("Can't create a pane because @tomorrowevening/theatre-core is not yet loaded");let t=(0,$i.val)(this._studio.atomP.ephemeral.extensions.paneClasses[e].extensionId),n=(0,$i.val)(this._studio.atomP.historic.panelInstanceDesceriptors),o;for(let i=1;i<1e3&&(o="".concat(e," #").concat(i),!!n[o]);i++);if(!t)throw new Error('Pane class "'.concat(e,'" is not registered.'));return this._studio.transaction(({drafts:i})=>{i.historic.panelInstanceDesceriptors[o]={instanceId:o,paneClass:e},i.historic.paneFocusOrder||(i.historic.paneFocusOrder=[]);let l=i.historic.paneFocusOrder,u=l.indexOf(o);u!==-1&&l.splice(u,1),l.push(o)}),this._getAllPanes().getValue()[o]}destroyPane(e){if(!this._studio.core)throw new Error("Can't do this yet because @tomorrowevening/theatre-core is not yet loaded");this._studio.transaction(({drafts:t})=>{if(delete t.historic.panelInstanceDesceriptors[e],t.historic.paneFocusOrder){let n=t.historic.paneFocusOrder.indexOf(e);n!==-1&&t.historic.paneFocusOrder.splice(n,1)}})}bringPaneToFront(e){this._studio.transaction(({drafts:t})=>{t.historic.paneFocusOrder||(t.historic.paneFocusOrder=[]);let n=t.historic.paneFocusOrder,o=n.indexOf(e);o!==-1&&n.splice(o,1),n.push(e)})}},gm=ge.requireDist();Pe();var A$=30*60*1e3,Nue=1e3*60*60;function Vue(){return _t(this,null,function*(){let e=Z().atomP.ahistoric.visibilityState;if((0,gm.val)(e)==="everythingIsVisible")return;let t=Ik(),n=(0,gm.pointerToPrism)(e).onStale(()=>{(0,gm.val)(e)==="everythingIsVisible"&&(n(),t.resolve(void 0))});return t.promise})}function Kue(){return _t(this,null,function*(){if(!"1.0.19".match(/COMPAT/))for(yield vm(500),yield Vue();;){let e=(0,gm.val)(Z().atomP.ahistoric.updateChecker);if(e&&e.result!=="error"){let t=e.lastChecked,n=Date.now(),o=Math.abs(n-t);o<A$&&(yield vm(A$-o))}try{let t=yield fetch(new Request("https://updates.theatrejs.com/updates/1.0.19"));if(t.ok){let n=yield t.json();if(!Uue(n))throw new Error("Bad response");Z().transaction(({drafts:o})=>{o.ahistoric.updateChecker={lastChecked:Date.now(),result:F({},n)}}),yield vm(1e3)}else throw new Error("HTTP Error ".concat(t.statusText))}catch{yield vm(Nue)}}})}var vm=e=>new Promise(t=>setTimeout(t,e));function Uue(e){if(typeof e!="object")return!1;let t=e;return typeof t.hasUpdates!="boolean"?!1:t.hasUpdates===!0&&typeof t.newVersion=="string"&&typeof t.releasePage=="string"||t.hasUpdates===!1}var Hue=V(z5());function $o(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function B$(e,t){let n=indexedDB.open(e);n.onupgradeneeded=()=>n.result.createObjectStore(t);let o=$o(n);return(i,l)=>o.then(u=>l(u.transaction(t,i).objectStore(t)))}var _k;function js(){return _k||(_k=B$("keyval-store","keyval")),_k}function $ue(e,t=js()){return t("readonly",n=>$o(n.get(e)))}function Wue(e,t,n=js()){return n("readwrite",o=>(o.put(t,e),$o(o.transaction)))}function Gue(e,t=js()){return t("readwrite",n=>(n.delete(e),$o(n.transaction)))}function Dk(e,t){return e.openCursor().onsuccess=function(){this.result&&(t(this.result),this.result.continue())},$o(e.transaction)}function Yue(e=js()){return e("readonly",t=>{if(t.getAllKeys)return $o(t.getAllKeys());let n=[];return Dk(t,o=>n.push(o.key)).then(()=>n)})}function Que(e=js()){return e("readonly",t=>{if(t.getAll)return $o(t.getAll());let n=[];return Dk(t,o=>n.push(o.value)).then(()=>n)})}function Xue(e=js()){return e("readonly",t=>{if(t.getAll&&t.getAllKeys)return Promise.all([$o(t.getAllKeys()),$o(t.getAll())]).then(([o,i])=>o.map((l,u)=>[l,i[u]]));let n=[];return e("readonly",o=>Dk(o,i=>n.push([i.key,i.value])).then(()=>n))})}var Jue=e=>{let t=B$("theatrejs-".concat(e),"default-store");return{set:(n,o)=>Wue(n,o,t),get:n=>$ue(n,t),del:n=>Gue(n,t),keys:()=>Yue(t),entries:()=>Xue(t),values:()=>Que(t)}},Zue=ge.requireDist();function z$(e,t){var n;let o=Object.values((n=(0,Zue.val)(e.pointers.historic.sheetsById))!=null?n:{}),i=o.flatMap(u=>{var c;return Object.values((c=u?.staticOverrides.byObject)!=null?c:{})}).flatMap(u=>Object.values(u??{})),l=[...o.flatMap(u=>{var c,d;return Object.values((d=(c=u?.sequence)==null?void 0:c.tracksByObject)!=null?d:{})}).flatMap(u=>{var c;return Object.values((c=u?.trackData)!=null?c:{})}).flatMap(u=>u?.keyframes).map(u=>u?.value)];return i.forEach(u=>{om(u,c=>{l.push(c)},[])}),l.filter(u=>u?.type&&typeof u?.type=="string").map(u=>u.id).filter((u,c,d)=>u!==null&&u!==""&&d.indexOf(u)===c)}Jx();var q$="theatre-0.4",ece=`You seem to have imported '@tomorrowevening/theatre-studio' but haven't initialized it. You can initialize the studio by:
\`\`\`
import studio from '@tomorrowevening/theatre-studio'
studio.initialize()
\`\`\`

* If you didn't mean to import '@tomorrowevening/theatre-studio', this means that your bundler is not tree-shaking it. This is most likely a bundler misconfiguration.

* If you meant to import '@tomorrowevening/theatre-studio' without showing its UI, you can do that by running:

\`\`\`
import studio from '@tomorrowevening/theatre-studio'
studio.initialize()
studio.ui.hide()
\`\`\`
`,tce="You seem to have imported '@tomorrowevening/theatre-studio' but called `studio.initialize()` after some delay.\nTheatre.js projects remain in pending mode (won't play their sequences) until the studio is initialized, so you should place the `studio.initialize()` line right after the import line:\n\n```\nimport studio from '@tomorrowevening/theatre-studio'\n// ... and other imports\n\nstudio.initialize()\n```\n",nce=class{constructor(){Je(this,"ui"),Je(this,"publicApi"),Je(this,"address"),Je(this,"_projectsProxy",new am.PointerProxy(new am.Atom({}).pointer)),Je(this,"projectsP",this._projectsProxy.pointer),Je(this,"_store",new Mue),Je(this,"_corePrivateApi"),Je(this,"_cache",new Ok),Je(this,"paneManager"),Je(this,"_coreAtom",new am.Atom({})),Je(this,"_initializedDeferred",Ik()),Je(this,"_initializeFnCalled",!1),Je(this,"_didWarnAboutNotInitializing",!1),Je(this,"_coreBits"),Je(this,"_rafDriver"),this.address={studioId:Wl(10)},this.publicApi=new Fue(this),this.ui=new $se(this),this._attachToIncomingProjects(),this.paneManager=new Lue(this),typeof window<"u"&&setTimeout(()=>{this._initializeFnCalled||(console.error(ece),this._didWarnAboutNotInitializing=!0)},100)}get ticker(){if(!this._rafDriver)throw new Error("`studio.ticker` was read before studio.initialize() was called.");return this._rafDriver.ticker}get atomP(){return this._store.atomP}initialize(e){return _t(this,null,function*(){if(!this._coreBits)throw new Error("You seem to have imported `@tomorrowevening/theatre-studio` without importing `@tomorrowevening/theatre-core`. Make sure to include an import of `@tomorrowevening/theatre-core` before calling `studio.initializer()`.");if(this._initializeFnCalled)return this._initializedDeferred.promise;this._initializeFnCalled=!0,this._didWarnAboutNotInitializing&&console.warn(tce);let t={persistenceKey:q$,usePersistentStorage:!0};if(typeof e?.persistenceKey=="string"&&(t.persistenceKey=e.persistenceKey),(e?.usePersistentStorage===!1||typeof window>"u")&&(t.usePersistentStorage=!1),e!=null&&e.__experimental_rafDriver){if(e.__experimental_rafDriver.type!=="Theatre_RafDriver_PublicAPI")throw new Error("parameter `rafDriver` in `studio.initialize({__experimental_rafDriver})` must be either be undefined, or the return type of core.createRafDriver()");let n=this._coreBits.privateAPI(e.__experimental_rafDriver);if(!n)throw new Error("parameter `rafDriver` in `studio.initialize({__experimental_rafDriver})` seems to come from a different version of `@tomorrowevening/theatre-core` than the version that is attached to `@tomorrowevening/theatre-studio`");this._rafDriver=n}else this._rafDriver=this._coreBits.getCoreRafDriver();try{yield this._store.initialize(t)}catch(n){this._initializedDeferred.reject(n);return}typeof window<"u"&&(yield this.ui.ready),this._initializedDeferred.resolve(),this.ui.render(),Kue().catch(n=>{console.error(n)})})}get initialized(){return this._initializedDeferred.promise}_attachToIncomingProjects(){let e=(0,am.pointerToPrism)(this.projectsP),t=n=>{for(let o of Object.values(n))o.isAttachedToStudio||o.attachToStudio(this)};e.onStale(()=>{t(e.getValue())}),t(e.getValue())}setCoreBits(e){this._coreBits=e,this._corePrivateApi=e.privateAPI,this._coreAtom.setByPointer(t=>t.core,e.coreExports),this._setProjectsP(e.projectsP)}_setProjectsP(e){this._projectsProxy.setPointer(e)}scrub(){return new Use(this)}tempTransaction(e){return this._store.tempTransaction(e)}transaction(e){return this.tempTransaction(e).commit()}__dev_startHistoryFromScratch(e){return this._store.__dev_startHistoryFromScratch(e)}get corePrivateAPI(){return this._corePrivateApi}get core(){return this._coreAtom.get().core}get coreP(){return this._coreAtom.pointer.core}extend(e,t){if(!e||typeof e!="object")throw new Error("Extensions must be JS objects");if(typeof e.id!="string")throw new Error("extension.id must be a string");let n=t?.__experimental_reconfigure===!0,o=e.id,i=this._store.getState().ephemeral.extensions.byId[o];if(i&&!n){if(e===i||(0,Hue.default)(e,i))return;throw new Error('Extension id "'.concat(e.id,'" is already defined. If you mean to re-configure the extension, do it like this: studio.extend(extension, {__experimental_reconfigure: true})})'))}this.transaction(({drafts:l})=>{var u,c;l.ephemeral.extensions.byId[e.id]=e;let d=l.ephemeral.extensions.paneClasses;n&&i&&((u=i.panes)==null||u.forEach(p=>{delete d[p.class]})),(c=e.panes)==null||c.forEach(p=>{if(typeof p.class!="string")throw new Error("pane.class must be a string");if(p.class.length<3)throw new Error("pane.class should be a string with 3 or more characters");let h=d[p.class];if(h)if(n&&h.extensionId===e.id)console.warn('Pane class "'.concat(p.class,'" already exists. This is a bug in Theatre.js. Please report it at https://github.com/theatre-js/theatre/issues/new'));else throw new Error('Pane class "'.concat(p.class,'" already exists and is supplied by extension ').concat(h));d[p.class]={extensionId:e.id,classDefinition:p}})})}getStudioProject(e){return this._cache.get("getStudioProject",()=>e.getProject("Studio"))}getExtensionSheet(e,t){return this._cache.get("extensionSheet-"+e,()=>this.getStudioProject(t).sheet("Extension "+e))}undo(){this._store.undo()}redo(){this._store.redo()}createContentOfSaveFile(e){return this._store.createContentOfSaveFile(e)}createAssetStorage(e,t){return _t(this,null,function*(){if(typeof window>"u")return{getAssetUrl:()=>"",createAsset:()=>Promise.resolve(null)};if(!("indexedDB"in window))return console.log("This browser doesn't support IndexedDB."),{getAssetUrl:p=>{throw new Error("IndexedDB is required by the default asset manager, but it's not supported by this browser. To use assets, please provide your own asset manager to the project config.")},createAsset:p=>{throw new Error("IndexedDB is required by the default asset manager, but it's not supported by this browser. To use assets, please provide your own asset manager to the project config.")}};let n=Jue("".concat(e.address.projectId,"-assets")),o=z$(e),i=yield n.keys();yield Promise.all(i.map(p=>_t(this,null,function*(){o.includes(p)||(yield n.del(p))}))),yield Promise.all(i.map(p=>_t(this,null,function*(){var h,b;let g="".concat(t,"/").concat(p);try{(yield fetch(g,{method:"HEAD"})).ok&&(yield n.del(p))}catch{em.error("Failed to access assets","Failed to access assets at ".concat((b=(h=e.config.assets)==null?void 0:h.baseUrl)!=null?b:"/",". This is likely due to a CORS issue."))}})));let l=new Map(yield n.entries()),u=new Map,c=p=>{if(u.has(p))return u.get(p);{let h=URL.createObjectURL(p);return u.set(p,h),h}},d=p=>{let h=l.get(p);if(!h)throw new Error("Asset with id ".concat(p," not found"));return c(h)};return{getAssetUrl:p=>l.has(p)?d(p):"".concat(t,"/").concat(p),createAsset:p=>_t(this,null,function*(){var h,b,g;let m=z$(e),y=!1;if(m.includes(p.name)){let x;try{x=(h=l.get(p.name))!=null?h:yield fetch("".concat(t,"/").concat(p.name)).then(S=>S.ok?S.blob():void 0)}catch{return em.error("Failed to access assets","Failed to access assets at ".concat((g=(b=e.config.assets)==null?void 0:b.baseUrl)!=null?g:"/",". This is likely due to a CORS issue.")),Promise.resolve(null)}if(x){if(y=yield(yield Promise.resolve().then(()=>V(Lse()))).default.isEqual(p,x),y)return p.name;{let S=E=>{let P=prompt(E,p.name);return P===null?!1:P===""?S("Asset name cannot be empty. Please choose a different file name for this asset."):m.includes(P)?(console.log(m),S("An asset with this name already exists. Please choose a different file name for this asset.")):(p=new File([p],P,{type:p.type}),!0)};if(!S("An asset with this name already exists. Please choose a different file name for this asset."))return null}}}return l.set(p.name,p),yield n.set(p.name,p),p.name})}})}clearPersistentStorage(e=q$){this._store.__experimental_clearPersistentStorage(e)}},Tk="__TheatreJS_StudioBundle",rce="__TheatreJS_CoreBundle",oce="__TheatreJS_Notifications",ace=class{constructor(e){this._studio=e,Je(this,"_coreBundle")}get type(){return"Theatre_StudioBundle"}registerCoreBundle(e){if(this._coreBundle)throw new Error("StudioBundle.coreBundle is already registered. This is a bug.");this._coreBundle=e;let t;e.getBitsForStudio(this._studio,n=>{t=n}),this._studio.setCoreBits(t)}},ice=V(H());fe();var M$,lce=C.div(M$||(M$=j([""]))),sce=e=>ice.default.createElement(lce,null),uce=sce;Jx();var Ak=new nce;qY(Ak);var cce=Ak.publicApi,dce=cce;fce();function fce(){if(typeof window>"u")return;let e=window[Tk];if(typeof e<"u")throw typeof e=="object"&&e&&typeof e.version=="string"?new Error(`It seems that the module '@tomorrowevening/theatre-studio' is loaded more than once. This could have two possible causes:
1. You might have two separate versions of Theatre.js in node_modules.
2. Or this might be a bundling misconfiguration, in case you're using a bundler like Webpack/ESBuild/Rollup.

Note that it **is okay** to import '@tomorrowevening/theatre-studio' multiple times. But those imports should point to the same module.`):new Error("The variable window.".concat(Tk," seems to be already set by a module other than @tomorrowevening/theatre-core."));let t=new ace(Ak);window[Tk]=t;let n=window[rce];n&&n!==null&&n.type==="Theatre_CoreBundle"&&t.registerCoreBundle(n)}typeof window<"u"&&(window[oce]={notify:em});/*! Bundled license information:

		lodash-es/lodash.js:
		  (**
		   * @license
		   * Lodash (Custom Build) <https://lodash.com/>
		   * Build: `lodash modularize exports="es" -o ./`
		   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
		   * Released under MIT license <https://lodash.com/license>
		   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		   *)

		queue-microtask/index.js:
		  (*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

		react/cjs/react.production.min.js:
		  (**
		   * @license React
		   * react.production.min.js
		   *
		   * Copyright (c) Facebook, Inc. and its affiliates.
		   *
		   * This source code is licensed under the MIT license found in the
		   * LICENSE file in the root directory of this source tree.
		   *)

		scheduler/cjs/scheduler.production.min.js:
		  (**
		   * @license React
		   * scheduler.production.min.js
		   *
		   * Copyright (c) Facebook, Inc. and its affiliates.
		   *
		   * This source code is licensed under the MIT license found in the
		   * LICENSE file in the root directory of this source tree.
		   *)

		react-dom/cjs/react-dom.production.min.js:
		  (**
		   * @license React
		   * react-dom.production.min.js
		   *
		   * Copyright (c) Facebook, Inc. and its affiliates.
		   *
		   * This source code is licensed under the MIT license found in the
		   * LICENSE file in the root directory of this source tree.
		   *)

		react-is/cjs/react-is.production.min.js:
		  (** @license React v17.0.2
		   * react-is.production.min.js
		   *
		   * Copyright (c) Facebook, Inc. and its affiliates.
		   *
		   * This source code is licensed under the MIT license found in the
		   * LICENSE file in the root directory of this source tree.
		   *)

		react-is/cjs/react-is.production.min.js:
		  (** @license React v16.13.1
		   * react-is.production.min.js
		   *
		   * Copyright (c) Facebook, Inc. and its affiliates.
		   *
		   * This source code is licensed under the MIT license found in the
		   * LICENSE file in the root directory of this source tree.
		   *)

		jiff/lib/lcs.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)

		jiff/lib/array.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)

		jiff/lib/jsonPointerParse.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)

		jiff/lib/jsonPointer.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)

		jiff/lib/clone.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)

		jiff/lib/jsonPatch.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)

		jiff/jiff.js:
		  (** @license MIT License (c) copyright 2010-2014 original author or authors *)
		*/}(_d,_d.exports)),_d.exports}var CY=sfe();const ufe=ge.getDefaultExportFromCjs(CY),cfe=lfe({__proto__:null,default:ufe},[CY]);exports.index=cfe;
