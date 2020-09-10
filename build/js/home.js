!function(t){var e={};function i(s){if(e[s])return e[s].exports;var h=e[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,i),h.l=!0,h.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var h in t)i.d(s,h,function(e){return t[e]}.bind(null,h));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);let s,h,n={};function o(t,e){n[t]=n[t]||[],n[t].push(e)}function r(t,...e){(n[t]||[]).map(t=>t(...e))}function a(){return s}function l(){return h}function c(t){if(s=document.getElementById(t)||t||document.querySelector("canvas"),!s)throw Error("You must provide a canvas element for the game");return h=s.getContext("2d"),h.imageSmoothingEnabled=!1,r("init"),{canvas:s,context:h}}class d{constructor({spriteSheet:t,frames:e,frameRate:i,loop:s=!0}){this.spriteSheet=t,this.frames=e,this.frameRate=i,this.loop=s;let{width:h,height:n,margin:o=0}=t.frame;this.width=h,this.height=n,this.margin=o,this._f=0,this._a=0}clone(){return new d(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:i=this.width,height:s=this.height,context:h=l()}){let n=this.frames[this._f]/this.spriteSheet._f|0,o=this.frames[this._f]%this.spriteSheet._f|0;h.drawImage(this.spriteSheet.image,o*this.width+(2*o+1)*this.margin,n*this.height+(2*n+1)*this.margin,this.width,this.height,t,e,i,s)}}function u(){return new d(...arguments)}u.prototype=d.prototype,u.class=d;new WeakMap;function p(t,e){let i=Math.sin(e),s=Math.cos(e);return{x:t.x*s-t.y*i,y:t.x*i+t.y*s}}function f(t,e,i){return Math.min(Math.max(t,i),e)}function y(t,e){return t.rotation||e.rotation?null:([t,e]=[t,e].map(t=>g(t)),t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y)}function g(t){let{x:e,y:i,width:s,height:h}=t.world||t;return t.anchor&&(e-=s*t.anchor.x,i-=h*t.anchor.y),s<0&&(e+=s,s*=-1),h<0&&(i+=h,h*=-1),{x:e,y:i,width:s,height:h}}class _{constructor(t=0,e=0,i={}){this.x=t,this.y=e,i._c&&(this.clamp(i._a,i._b,i._d,i._e),this.x=t,this.y=e)}add(t){return new _(this.x+t.x,this.y+t.y,this)}subtract(t){return new _(this.x-t.x,this.y-t.y,this)}scale(t){return new _(this.x*t,this.y*t)}normalize(t=this.length()){return new _(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?f(this._a,this._d,t):t}set y(t){this._y=this._c?f(this._b,this._e,t):t}}function m(){return new _(...arguments)}m.prototype=_.prototype,m.class=_;const x=()=>{};function w(t,e){let i=e.parentNode;if(t.setAttribute("data-kontra",""),i){let s=i.querySelector("[data-kontra]:last-of-type")||e;i.insertBefore(t,s.nextSibling)}else document.body.appendChild(t)}class b extends class{constructor(t){return this.init(t)}init(t={}){this.position=m(),this.velocity=m(),this.acceleration=m(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let i=this.velocity;t&&(i=i.scale(t)),this.position=this.position.add(i),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}{init({width:t=0,height:e=0,context:i=l(),render:s=this.draw,update:h=this.advance,children:n=[],anchor:o={x:0,y:0},sx:r=0,sy:a=0,opacity:c=1,rotation:d=0,scaleX:u=1,scaleY:p=1,...f}={}){this.children=[],super.init({width:t,height:e,context:i,anchor:o,sx:r,sy:a,opacity:c,rotation:d,scaleX:u,scaleY:p,...f}),this._di=!0,this._uw(),n.map(t=>this.addChild(t)),this._rf=s,this._uf=h}update(t){this._uf(t),this.children.map(t=>t.update&&t.update())}render(t){let e=this.context;e.save(),(this.x||this.y)&&e.translate(this.x,this.y),this.rotation&&e.rotate(this.rotation),(this.sx||this.sy)&&e.translate(-this.sx,-this.sy),1==this.scaleX&&1==this.scaleY||e.scale(this.scaleX,this.scaleY);let i=-this.width*this.anchor.x,s=-this.height*this.anchor.y;(i||s)&&e.translate(i,s),this.context.globalAlpha=this.opacity,this._rf(),(i||s)&&e.translate(-i,-s);let h=this.children;t&&(h=h.filter(t)),h.map(t=>t.render&&t.render()),e.restore()}draw(){}_pc(t,e){this._uw(),this.children.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:i=1,_wr:s=0,_wsx:h=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=i*this.opacity,this._wr=s+this.rotation;let{x:o,y:r}=p({x:this.x,y:this.y},s);this._wx=o,this._wy=r,this._wsx=h*this.scaleX,this._wsy=n*this.scaleY,this._wx=this.x*h,this._wy=this.y*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}addChild(t,{absolute:e=!1}={}){this.children.push(t),t.parent=this,t._pc=t._pc||x,t._pc()}removeChild(t){let e=this.children.indexOf(t);-1!==e&&(this.children.splice(e,1),t.parent=null,t._pc())}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function v(){return new b(...arguments)}v.prototype=b.prototype,v.class=b;class S extends v.class{init({image:t,width:e=(t?t.width:void 0),height:i=(t?t.height:void 0),...s}={}){super.init({image:t,width:e,height:i,...s})}get animations(){return this._a}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){super.advance(t),this.currentAnimation&&this.currentAnimation.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function k(){return new S(...arguments)}k.prototype=S.prototype,k.class=S;let E=/(\d+)(\w+)/;class C extends v.class{init({text:t="",textAlign:e="",lineHeight:i=1,font:s=l().font,...h}={}){super.init({text:t,textAlign:e,lineHeight:i,font:s,...h}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){let e=t.match(E),i=+e[1];return{size:i,unit:e[2],computed:i}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context;if(t.font=this.font,!this._s.length&&this._fw){let e=this.text.split(" "),i=0,s=2;for(;s<=e.length;s++){let h=e.slice(i,s).join(" ");t.measureText(h).width>this._fw&&(this._s.push(e.slice(i,s-1).join(" ")),i=s-1)}this._s.push(e.slice(i,s).join(" "))}if(!this._s.length&&this.text.includes("\n")){let e=0;this.text.split("\n").map(i=>{this._s.push(i),e=Math.max(e,t.measureText(i).width)}),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,i=this.context;e=this.textAlign||("rtl"===i.canvas.dir?"right":"left"),t="right"===e?this.width:"center"===e?this.width/2|0:0,this._s.map((s,h)=>{i.textBaseline="top",i.textAlign=e,i.fillStyle=this.color,i.font=this.font,i.fillText(s,t,this._fs*this.lineHeight*h)})}}function A(){return new C(...arguments)}A.prototype=C.prototype,A.class=C;let j=new WeakMap,P={},M={},T={0:"left",1:"middle",2:"right"};function O(t,e){let{x:i,y:s,width:h,height:n}=g(t);do{i-=t.sx||0,s-=t.sy||0}while(t=t.parent);let o=e.x-Math.max(i,Math.min(e.x,i+h)),r=e.y-Math.max(s,Math.min(e.y,s+n));return o*o+r*r<e.radius*e.radius}function I(t){let e=t._lf.length?t._lf:t._cf;for(let i=e.length-1;i>=0;i--){let s=e[i];if(s.collidesWithPointer?s.collidesWithPointer(t):O(s,t))return s}}function z(t,e){return parseFloat(t.getPropertyValue(e))||0}function Y(t){let e=void 0!==t.button?T[t.button]:"left";M[e]=!0,B(t,"onDown")}function X(t){let e=void 0!==t.button?T[t.button]:"left";M[e]=!1,B(t,"onUp")}function L(t){B(t,"onOver")}function q(t){j.get(t.target)._oo=null,M={}}function B(t,e){t.preventDefault();let i=t.target,s=j.get(i),{scaleX:h,scaleY:n,offsetX:o,offsetY:r}=function(t){let{canvas:e,_s:i}=t,s=e.getBoundingClientRect(),h="none"!==i.transform?i.transform.replace("matrix(","").split(","):[1,1,1,1],n=parseFloat(h[0]),o=parseFloat(h[3]),r=(z(i,"border-left-width")+z(i,"border-right-width"))*n,a=(z(i,"border-top-width")+z(i,"border-bottom-width"))*o,l=(z(i,"padding-left")+z(i,"padding-right"))*n,c=(z(i,"padding-top")+z(i,"padding-bottom"))*o;return{scaleX:(s.width-r-l)/e.width,scaleY:(s.height-a-c)/e.height,offsetX:s.left+(z(i,"border-left-width")+z(i,"padding-left"))*n,offsetY:s.top+(z(i,"border-top-width")+z(i,"padding-top"))*o}}(s);if(-1!==["touchstart","touchmove","touchend"].indexOf(t.type)){s.touches={};for(var a=0;a<t.touches.length;a++)s.touches[t.touches[a].identifier]={id:t.touches[a].identifier,x:(t.touches[a].clientX-o)/h,y:(t.touches[a].clientY-r)/n,changed:!1};for(a=t.changedTouches.length;a--;){const i=t.changedTouches[a].identifier;void 0!==s.touches[i]&&(s.touches[i].changed=!0);let l=t.changedTouches[a].clientX,c=t.changedTouches[a].clientY;s.x=(l-o)/h,s.y=(c-r)/n;let d=I(s);d&&d[e]&&d[e](t),P[e]&&P[e](t,d)}}else{s.x=(t.clientX-o)/h,s.y=(t.clientY-r)/n;let i=I(s);i&&i[e]&&i[e](t),P[e]&&P[e](t,i),"onOver"==e&&(i!=s._oo&&s._oo&&s._oo.onOut&&s._oo.onOut(t),s._oo=i)}}function D(t=a()){let e=j.get(t);if(!e){let i=window.getComputedStyle(t);e={x:0,y:0,radius:5,touches:{},canvas:t,_cf:[],_lf:[],_o:[],_oo:null,_s:i},j.set(t,e)}return t.addEventListener("mousedown",Y),t.addEventListener("touchstart",Y),t.addEventListener("mouseup",X),t.addEventListener("touchend",X),t.addEventListener("touchcancel",X),t.addEventListener("blur",q),t.addEventListener("mousemove",L),t.addEventListener("touchmove",L),e._t||(e._t=!0,o("tick",()=>{e._lf.length=0,e._cf.map(t=>{e._lf.push(t)}),e._cf.length=0})),e}function R(...t){t.map(t=>{let e=t.context?t.context.canvas:a(),i=j.get(e);if(!i)throw new ReferenceError("Pointer events not initialized for the objects canvas");t._r||(t._r=t.render,t.render=function(){i._cf.push(this),this._r()},i._o.push(t))})}class F extends k.class{init({padX:t=0,padY:e=0,text:i,onDown:s,onUp:h,...n}={}){super.init({padX:t,padY:e,...n}),this.textNode=A({...i,context:this.context}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),R(this),this.addChild(this.textNode),this._od=s||x,this._ou=h||x;const o=this._dn=document.createElement("button");o.style="position:absolute;left:-9999px",o.textContent=this.text,o.addEventListener("focus",()=>this.focus()),o.addEventListener("blur",()=>this.blur()),o.addEventListener("keydown",t=>this._kd(t)),o.addEventListener("keyup",t=>this._ku(t)),w(o,this.context.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!==this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();let t=this.textNode.width+2*this.padX,e=this.textNode.height+2*this.padY;this.width=Math.max(t,this.width),this.height=Math.max(e,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){"Enter"!=t.code&&"Space"!=t.code||this.onDown()}_ku(t){"Enter"!=t.code&&"Space"!=t.code||this.onUp()}}function N(){return new F(...arguments)}function W(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}function G({fps:t=60,clearCanvas:e=!0,update:i=x,render:s,context:h=l()}={}){if(!s)throw Error("You must provide a render() function");let n,o,a,c,d,u=0,p=1e3/t,f=1/t,y=e?W:x;function g(){if(o=requestAnimationFrame(g),a=performance.now(),c=a-n,n=a,!(c>1e3)){for(r("tick"),u+=c;u>=p;)d.update(f),u-=p;y(h),d.render()}}return d={update:i,render:s,isStopped:!0,start(){n=performance.now(),this.isStopped=!1,requestAnimationFrame(g)},stop(){this.isStopped=!0,cancelAnimationFrame(o)},_frame:g,set _last(t){n=t}},d}N.prototype=F.prototype,N.class=F;let H={set:(t,e,i)=>(e.startsWith("_")||(t._d=!0),Reflect.set(t,e,i))},V={start:t=>t?1:0,center:()=>.5,end:t=>t?0:1};class U extends v.class{init({flow:t="column",align:e="start",justify:i="start",colGap:s=0,rowGap:h=0,numCols:n=1,dir:o="",breakpoints:r=[],...a}={}){return super.init({flow:t,align:e,justify:i,colGap:s,rowGap:h,numCols:n,dir:o,breakpoints:r,...a}),this._p(),new Proxy(this,H)}addChild(t){this._d=!0,super.addChild(t)}removeChild(t){this._d=!0,super.removeChild(t)}render(){this._d&&this._p(),super.render()}destroy(){this.children.map(t=>t.destroy&&t.destroy())}_p(){this._d=!1,this.breakpoints.map(t=>{t.metric.call(this)&&this._b!==t&&(this._b=t,t.callback.call(this))});let t=this._g=[],e=this._cw=[],i=this._rh=[],s=this.children,h=this._nc="column"===this.flow?1:"row"===this.flow?s.length:this.numCols,n=0,o=0;for(let r,a=0;r=s[a];a++){t[n]=t[n]||[],r._p&&r._p(),i[n]=Math.max(i[n]||0,r.height);let s=r.colSpan||1,a=s;do{e[o]=Math.max(e[o]||0,r.width/a),t[n][o]=r}while(a+o++<=h&&--s);o>=h&&(o=0,n++)}for(;o>0&&o<h;)t[n][o++]=!1;let r=t.length,a=[].concat(this.colGap),l=[].concat(this.rowGap);this._w=e.reduce((t,e)=>t+e,0);for(let t=0;t<h-1;t++)this._w+=a[t%a.length];this._h=i.reduce((t,e)=>t+e,0);for(let t=0;t<r-1;t++)this._h+=l[t%l.length];this._uw();let c="rtl"===this.context.canvas.dir&&!this.dir||"rtl"===this.dir;this._rtl=c,c&&(this._g=t.map(t=>t.reverse()),this._cw=e.reverse());let d=-this.anchor.y*this.height,u=[];this._g.map((t,s)=>{let h=-this.anchor.x*this.width;t.map((t,n)=>{if(t&&!u.includes(t)){u.push(t);let o=V[t.justifySelf||this.justify](this._rtl),r=V[t.alignSelf||this.align](),l=t.colSpan||1,c=e[n];if(l>1&&n+l<=this._nc)for(let t=1;t<l;t++)c+=e[n+t]+a[(n+t)%a.length];let p=c*o,f=i[s]*r,y=0,g=0,{width:_,height:m}=t;if(t.anchor&&(y=t.anchor.x,g=t.anchor.y),0===o)p+=_*y;else if(.5===o){p+=(y<.5?-1:.5===y?0:1)*_*o}else p-=_*(1-y);if(0===r)f+=m*g;else if(.5===r){f+=(g<.5?-1:.5===g?0:1)*m*r}else f-=m*(1-g);t.x=h+p,t.y=d+f}h+=e[n]+a[n%a.length]}),d+=i[s]+l[s%l.length]})}}function J(){return new U(...arguments)}J.prototype=U.prototype,J.class=U;let K={},Q={},Z={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"left",ArrowUp:"up",ArrowRight:"right",ArrowDown:"down"};function $(t){let e=Z[t.code];Q[e]=!0,K[e]&&K[e](t)}function tt(t){Q[Z[t.code]]=!1}function et(){Q={}}function it(){let t;for(t=0;t<26;t++)Z[t+65]=Z["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)Z[48+t]=Z["Digit"+t]=""+t;window.addEventListener("keydown",$),window.addEventListener("keyup",tt),window.addEventListener("blur",et)}function st(t){return!!Q[t]}class ht{constructor({create:t,maxSize:e=1024}={}){let i;if(!t||!(i=t())||!(i.update&&i.init&&i.isAlive&&i.render))throw Error("Must provide create() function which returns an object with init(), update(), render(), and isAlive() functions");this._c=t,this.objects=[t()],this.size=0,this.maxSize=e}get(t={}){if(this.size===this.objects.length){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.push(this._c())}let e=this.objects[this.size];return this.size++,e.init(t),e}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let e,i=!1;for(let s=this.size;s--;)e=this.objects[s],e.update(t),e.isAlive()||(i=!0,this.size--);i&&this.objects.sort((t,e)=>e.isAlive()-t.isAlive())}render(){for(let t=this.size;t--;)this.objects[t].render()}}function nt(){return new ht(...arguments)}function ot(t,e){let i=[],s=e.x+e.width/2,h=e.y+e.height/2,{x:n,y:o,width:r,height:a}=g(t),l=t.y<h,c=t.y+t.height>=h;return t.x<s&&(l&&i.push(0),c&&i.push(2)),t.x+t.width>=s&&(l&&i.push(1),c&&i.push(3)),i}nt.prototype=ht.prototype,nt.class=ht;class rt{constructor({maxDepth:t=3,maxObjects:e=25,bounds:i}={}){this.maxDepth=t,this.maxObjects=e;let s=a();this.bounds=i||{x:0,y:0,width:s.width,height:s.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map((function(t){t.clear()})),this._b=!1,this._o.length=0}get(t){let e=new Set;for(;this._s.length&&this._b;)return ot(t,this.bounds).map(i=>{this._s[i].get(t).map(t=>e.add(t))}),Array.from(e);return this._o.filter(e=>e!==t)}add(...t){t.map(t=>{Array.isArray(t)?this.add.apply(this,t):this._b?this._a(t):(this._o.push(t),this._o.length>this.maxObjects&&this._d<this.maxDepth&&(this._sp(),this._o.map(t=>this._a(t)),this._o.length=0))})}_a(t){ot(t,this.bounds).map(e=>{this._s[e].add(t)})}_sp(t,e,i){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,i=0;i<4;i++)this._s[i]=new rt({bounds:{x:this.bounds.x+(i%2==1?t:0),y:this.bounds.y+(i>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[i]._d=this._d+1,this._s[i]._p=this}}function at(){return new rt(...arguments)}function lt(t){let e=[];return t._dn?e.push(t._dn):t.children&&t.children.map(t=>{e=e.concat(lt(t))}),e}at.prototype=rt.prototype,at.class=rt;class ct extends v.class{init({id:t,name:e=t,cullObjects:i=!0,cullFunction:s=y,...h}){const n=this._dn=document.createElement("section");n.tabIndex=-1,n.style="position:absolute;left:-9999px",n.id=t,n.setAttribute("aria-label",e),super.init({id:t,name:e,cullObjects:i,cullFunction:s,...h}),w(n,this.context.canvas);let o=this.context.canvas;this.camera=v({x:o.width/2,y:o.height/2,width:o.width,height:o.height,anchor:{x:.5,y:.5}}),this.camera._pc=()=>{super._pc.call(this.camera);this.context.canvas;this.camera._wx=this.camera.x*this.scaleX,this.camera._wy=this.camera.y*this.scaleY}}show(){this.hidden=this._dn.hidden=!1;let t=this.children.find(t=>t.focus);t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}addChild(t,e){super.addChild(t,e),lt(t).map(t=>{this._dn.appendChild(t)})}removeChild(t){super.removeChild(t),lt(t).map(t=>{w(t,this.context.canvas)})}destroy(){this._dn.remove(),this.children.map(t=>t.destroy&&t.destroy())}update(t){this.hidden||super.update(t)}lookAt(t){let e=(t=t.world||t).x,i=t.y;t.scaleX&&(e/=t.scaleX,i/=t.scaleY),this.camera.x=e,this.camera.y=i,this._pc()}_pc(){super._pc(),this.camera&&this.camera._pc()}render(){let{x:t,y:e,width:i,height:s}=this.camera;this.sx=t*this.scaleX-i/2,this.sy=e*this.scaleY-s/2,this.hidden||super.render(t=>!this.cullObjects||this.cullFunction(t,this.camera))}onShow(){}onHide(){}}function dt(){return new ct(...arguments)}function ut(t){if(+t===t)return t;let e=[],i=t.split(".."),s=+i[0],h=+i[1],n=s;if(s<h)for(;n<=h;n++)e.push(n);else for(;n>=h;n--)e.push(n);return e}dt.prototype=ct.prototype,dt.class=ct;class pt{constructor({image:t,frameWidth:e,frameHeight:i,frameMargin:s,animations:h}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:i,margin:s},this._f=t.width/e|0,this.createAnimations(h)}createAnimations(t){let e,i;for(i in t){let{frames:s,frameRate:h,loop:n}=t[i];if(e=[],void 0===s)throw Error("Animation "+i+" must provide a frames property");[].concat(s).map(t=>{e=e.concat(ut(t))}),this.animations[i]=u({spriteSheet:this,frames:e,frameRate:h,loop:n})}}}function ft(){return new pt(...arguments)}ft.prototype=pt.prototype,ft.class=pt;c();let yt=l("2d");it(),D();const gt=0,_t=1,mt=5,xt=0,wt=1;let bt=document.getElementById("not-found"),vt=document.querySelector(".top"),St=document.getElementById("gameScreen"),kt=document.querySelector(".bottom");screen.width<=280?document.write("<style>body{zoom:35%}</style>"):screen.width>320&&screen.width<=375?document.write("<style>body{zoom:45%}</style>"):screen.width>375&&screen.width<=414?document.write("<style>body{zoom:50%}</style>"):screen.width>280&&screen.width<=320?document.write("<style>body{zoom:40%}</style>"):screen.width>=500&&screen.width<700?document.write("<style>body{zoom:65%}</style>"):screen.width>=750&&screen.width<1e3?document.write("<style>body{zoom:92%}</style>"):screen.width>=1e3&&document.write("<style>body{zoom:80%}</style>");let Et={id:document.getElementById("left-arrow"),flag:!1},Ct={id:document.getElementById("right-arrow"),flag:!1},At=new class{constructor(t,e=0){this.valueElem=t.querySelector(".energy-bar-value"),this.fillElem=t.querySelector(".energy-bar-fill"),this.setValue(e)}setValue(t){t<0&&(t=0),t>100&&(t=100),this.value=t,this.update()}update(){const t=Math.round(this.value)+"%";this.fillElem.style.width=t,this.valueElem.textContent=t}}(document.querySelector(".energy-bar"),100),jt=new class{constructor(t,e=0){this.valueElem=t.querySelector(".life-bar-value"),this.fillElem=t.querySelector(".life-bar-fill"),this.setValue(e)}setValue(t){t<0&&(t=0),t>100&&(t=100),this.value=t,this.update()}update(){const t=this.value+"%";this.fillElem.style.width=t,this.valueElem.textContent=t}}(document.querySelector(".life-bar"),100),Pt=new function(){this.life=100,this.r=40,this.angle=0,this.position={x:400,y:400},this.speed={x:1,y:-2},this.visible=!0,this.update=function(){this.angle+=1/60,this.position.x+=this.speed.x,this.position.y+=this.speed.y,yt.lineWidth=2,yt.save(),yt.translate(this.position.x,this.position.y),yt.beginPath(),yt.rotate(this.angle+45),yt.rect(-this.r/2,-this.r/2,this.r,this.r),yt.fillStyle="#899",yt.fill(),yt.stroke(),yt.closePath(),yt.restore(),yt.save(),yt.translate(this.position.x,this.position.y),yt.fillStyle="rgb(250, 245, 80)",yt.strokeStyle="#000",yt.rotate(this.angle),yt.beginPath(),yt.rect(-this.r/2,-this.r/2,this.r,this.r),yt.fill(),yt.stroke(),yt.closePath(),yt.restore(),Math.sqrt(Math.pow(400-this.position.x,2)+Math.pow(400-this.position.y,2))>=200-Math.sqrt(2*Math.pow(this.r/2,2))&&(this.position.x>400&&this.position.y<400?(this.speed.x=Vt(),this.speed.y=-Vt()):this.position.x<400&&this.position.y<400?(this.speed.x=-Vt(),this.speed.y=-Vt()):this.position.x<400&&this.position.y>400?(this.speed.x=-Vt(),this.speed.y=Vt()):this.position.x>400&&this.position.y>400&&(this.speed.x=Vt(),this.speed.y=Vt()))}},Mt=new Jt(-350,0,0,"rgba(0, 0, 255, .3)","rgba(0, 255, 0, .3)",xt),Tt=new Jt(-350,0,qt(90),"rgba(0, 255, 0, .3)","rgba(0, 0, 255, .3)",wt),Ot=new Bt("A","rgba(0, 0, 255, .3)",!1,!0),It=new Bt("S","rgba(0, 255, 0, .3)",!1,!0),zt=new Bt("D","rgba(0, 255, 0, .3)",!1,!1),Yt=new Bt("F","rgba(0, 255, 0, .3)",!1,!1);[Ot,It,zt,Yt].forEach(t=>t.changeActive());var Xt=[Mt,Tt,Pt,At,jt],Lt=[Mt,Tt];function qt(t){return t*Math.PI/180}function Bt(t,e,i=!1,s=!0){const h=document.querySelector(".InputButtonContainer");this.button=document.createElement("button"),this.color=e,this.active=s,this.button.style.backgroundColor="rgba(92, 92, 92, 1)",this.button.style.width="80px",this.button.style.height="80px",this.button.style.borderRadius="50%",this.button.style.outline="none",this.button.style.margin="5px",this.button.style.border="solid 7px",this.button.style.borderColor="black",this.button.innerText=t,this.button.id=t.toLowerCase(),this.button.style.fontSize="40px",this.button.style.backgroundColor=this.color,h.appendChild(this.button),this.id=document.getElementById(this.button.id),this.isOn=i,this.changeActive=function(){this.active?this.button.style.display="block":this.button.style.display="none"}}function Dt(){vt.style.display="none",St.style.display="none",kt.style.display="none"}function Rt(){vt.style.opacity="0.5",St.style.opacity="0.5",kt.style.opacity="0.5"}function Ft(t){let e=t.split("\n");var i=0;for(yt.beginPath(),yt.rect(200,200,400,30*e.length),yt.fillStyle="rgba(0, 0, 0, .4)",yt.fill(),yt.beginPath(),yt.textBaseline="top",yt.font="30px sans-serif",yt.fillStyle="rgba(255, 255, 255, 1)",i=0;i<e.length;i++)yt.fillText(e[i],200,200+30*i);yt.closePath()}function Nt(){vt.style.display="flex",St.style.display="block",kt.style.display="flex"}function Wt(){bt.style.display="none"}function Gt(t){let e=t.split("");return e.pop(),e.pop(),e.pop(),e.push("1)"),e.join("")}function Ht(t){let e=t.split("");return e.pop(),e.pop(),e.pop(),e.push(" .3)"),e.join("")}function Vt(){return 2*Math.random()-3}function Ut(t){t.lasers.push({position:{x:t.x,y:t.y},speed:{x:3*Math.cos(t.angle)/60,y:3*Math.sin(t.angle)/60},a:t.a,type:t.type})}function Jt(t,e,i,s,h,n){this.r=20,this.x=0===n?t+10:t+2,this.y=e,this.angle=i,this.type=n,this.colorSup=s,this.colorInf=h,this.canShoot=!0,this.lasers=[],this.update=function(){yt.fillStyle="#899",yt.strokeStyle="#000",yt.lineWidth=3,yt.save(),yt.translate(400,400),yt.rotate(this.angle),yt.beginPath(),0===this.type&&(yt.arc(this.x,this.y,this.r,qt(90),qt(270),!0),yt.fill(),yt.moveTo(this.x,this.y-this.r),yt.lineTo(this.x-this.r,this.y-this.r),yt.lineTo(this.x-this.r,this.y+this.r),yt.lineTo(this.x,this.y+this.r),yt.fill(),yt.stroke(),yt.beginPath(),yt.moveTo(this.x-this.r,this.y-this.r+this.r/2),yt.lineTo(this.x-2*this.r,this.y-this.r+this.r/2),yt.stroke(),yt.beginPath(),yt.moveTo(this.x-this.r,this.y+this.r/2),yt.lineTo(this.x-2*this.r,this.y+this.r/2),yt.stroke(),yt.beginPath(),yt.moveTo(this.x+this.r,this.y),yt.lineTo(this.x+2*this.r,this.y),yt.closePath(),yt.stroke(),yt.beginPath(),yt.arc(this.x-2*this.r,this.y-this.r+this.r/2,this.r/3,0,qt(360),!0),yt.fillStyle=this.colorSup,yt.fill(),yt.beginPath(),yt.arc(this.x-2*this.r,this.y+this.r/2,this.r/3,0,qt(360),!0),yt.fillStyle=this.colorInf,yt.fill(),yt.closePath()),1===this.type&&(yt.arc(this.x-2*this.r-Math.sin(qt(45)),this.y,this.r/Math.sin(qt(45)),qt(45),-qt(45),!0),yt.arcTo(this.x+this.r,this.y-this.r,this.x+2*this.r,this.y+this.r,2*this.r),yt.arcTo(this.x+this.r,this.y+this.r,this.x-2*this.r,this.y+this.r,2*this.r),yt.closePath(),yt.fill(),yt.stroke(),yt.beginPath(),yt.moveTo(this.x+3*this.r/2+1,this.y+2),yt.lineTo(this.x+5*this.r/2,this.y+2),yt.stroke(),yt.beginPath(),yt.moveTo(this.x-this.r+7,this.y-this.r+this.r/2),yt.lineTo(this.x-2*this.r,this.y-this.r+this.r/2),yt.stroke(),yt.beginPath(),yt.moveTo(this.x-this.r+7,this.y+this.r/2),yt.lineTo(this.x-2*this.r,this.y+this.r/2),yt.stroke(),yt.beginPath(),yt.arc(this.x-2*this.r,this.y-this.r+this.r/2,this.r/3,0,qt(360),!0),yt.fillStyle=this.colorSup,yt.fill(),yt.beginPath(),yt.arc(this.x-2*this.r,this.y+this.r/2,this.r/3,0,qt(360),!0),yt.fillStyle=this.colorInf,yt.fill()),yt.restore()}}Bt.prototype.changeColor=function(){switch(this.color.length){case 19:this.button.style.backgroundColor=Gt(this.color),this.color=Gt(this.color);break;case 18:this.button.style.backgroundColor=Ht(this.color),this.color=Ht(this.color)}};let Kt=!1,Qt=!1,Zt=0;function $t(t){65==t.keyCode&&(!1===Kt?(Mt.colorSup="rgba(0, 0, 255, 1)",Tt.colorInf="rgba(0, 0, 255, 1)",Kt=!0):(Mt.colorSup="rgba(0, 0, 255, .3)",Tt.colorInf="rgba(0, 0, 255, .3)",Kt=!1),Ot.changeColor()),83==t.keyCode&&(!1===Qt?(Mt.colorInf="rgba(0, 255, 0, 1)",Tt.colorSup="rgba(0, 255, 0, 1)",Qt=!0):(Mt.colorInf="rgba(0, 255, 0, .3)",Tt.colorSup="rgba(0, 255, 0, .3)",Qt=!1),It.changeColor())}function te(){se<=4&&(St.ontouchstart=function(t){se++},St.onmousedown=function(t){se++},document.onkeypress=function(t){se++})}let ee=document.getElementById("start-game"),ie=document.getElementById("asking");ie.style.display="none",ee.style.display="none";let se=0;Dt();let he=gt;G({update:function(){switch(he){case gt:Dt(),setTimeout(()=>{ie.style.display="block",setTimeout(()=>{ee.style.display="block",document.onkeypress=function(t){he=mt},document.onmousedown=function(t){he=mt},document.touchstart=function(t){he=mt}},2e3)},2e3);break;case mt:Wt(),Nt(),Rt(),te();break;case mt:se<4&&(Wt(),Nt(),Rt(),te());break;case _t:Wt(),Nt(),Xt.forEach(t=>t.update()),At.setValue(At.value-Zt),Zt=0,Ct.id.ontouchstart=function(){Ct.flag=!0},Ct.id.ontouchend=function(){Ct.flag=!1},Et.id.ontouchstart=function(){Et.flag=!0},Et.id.ontouchend=function(){Et.flag=!1},Ct.id.onmousedown=function(){Ct.flag=!0},Ct.id.onmouseup=function(){Ct.flag=!1},Et.id.onmousedown=function(){Et.flag=!0},Et.id.onmouseup=function(){Et.flag=!1},st("right")&&(Mt.angle+=qt(1),Tt.angle+=qt(1)),st("left")&&(Mt.angle-=qt(1),Tt.angle-=qt(1)),!0===Kt&&!0===Qt?Lt.forEach(t=>{0===t.type?Zt+=.05:1===t.type&&(Zt+=1/60)}):!0===Kt||!0===Qt?Lt.forEach(t=>{1===t.type&&(Zt+=1/60)}):Zt-=1/60/2,!0===Ct.flag&&(Mt.angle+=qt(1),Tt.angle+=qt(1)),!0===Et.flag&&(Mt.angle-=qt(1),Tt.angle-=qt(1)),Ot.id.onmousedown=function(){!1===Kt?(Mt.colorSup="rgba(0, 0, 255, 1)",Tt.colorInf="rgba(0, 0, 255, 1)",Kt=!0):(Mt.colorSup="rgba(0, 0, 255, .3)",Tt.colorInf="rgba(0, 0, 255, .3)",Kt=!1),Ot.changeColor()},It.id.onmousedown=function(){!1===Qt?(Mt.colorInf="rgba(0, 255, 0, 1)",Tt.colorSup="rgba(0, 255, 0, 1)",Qt=!0):(Mt.colorInf="rgba(0, 255, 0, .3)",Tt.colorSup="rgba(0, 255, 0, .3)",Qt=!1),It.changeColor()},document.addEventListener("keydown",$t),function(){if(Kt&&Qt&&Pt.visible)Ut(Mt),Ut(Tt);else if(Kt||Qt&&Pt.visible){Ut(Tt);for(var t=0;t<Mt.lasers.length;t++)Mt.lasers.length>0&&Mt.lasers.splice(t,1)}}()}},render:function(){switch(yt.beginPath(),yt.arc(400,400,3,0,2*Math.PI,!0),yt.fillStyle="white",yt.closePath(),yt.fill(),yt.beginPath(),yt.arc(400,400,300,0,2*Math.PI,!0),yt.strokeStyle="white",yt.closePath(),yt.stroke(),he){case mt:switch(se){case 0:Ft("We've found the error, you'll\nhave to destroy the generator\nand the enemies that came \nfrom it ");break;case 1:Ft("The only way to defeat them \nis by supplying energy to the \nlogic gates inputs. This can \nbe done by pressing the \nbuttons in the bottom left and \nif you wanna change the \nposition of the logic gates, \nyou can rotate them by \npressing the buttons in the \nbottom right.\n\nYou can also press the a, s, d, \nf, left arrow and right arrow \nkeys to do the same actions"),kt.style.opacity="1";break;case 2:Ft("The one on the left is an \nAnd Logic Gate. The TWO \ninputs of it must be supplied \nby energy in order to shoot \nenemies.\n\nThe one on the top is an Or \nLogic Gate. Just ONE of its \ninputs needs to be supplied \nby energy in order to shoot \nenemies"),St.style.opacity="1";break;case 3:Ft("Lastly just keep in mind that \nenergy decreases per each \ninput that is activated. Good \nluck c:"),vt.style.opacity="1";break;default:he=_t,vt.style.opacity="1",St.style.opacity="1",kt.style.opacity="1"}}Xt.forEach(t=>t.update()),function(t){for(var e=0;e<t.lasers.length;e++){if(yt.fillStyle="red",t.type===xt)for(e=0;e<t.lasers.length;e++)t.lasers[e].type===xt&&yt.save(),yt.translate(400,400),yt.rotate(t.angle),yt.beginPath(),yt.rect(t.lasers[e].position.x+4*t.r/2,t.lasers[e].position.y-t.r/7,300,10),yt.fill(),yt.restore();t.type===wt&&(yt.fillStyle="blue",yt.save(),yt.translate(400,400),yt.rotate(t.lasers.a+qt(45)),yt.beginPath(),yt.rect(t.lasers[e].position.x+5*t.r/2,t.lasers[e].position.y-t.r/7,30,10),yt.fill(),yt.restore())}}(Mt)},fps:60}).start()}]);