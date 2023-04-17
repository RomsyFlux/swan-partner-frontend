"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[743],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),l=s(n),f=o,m=l["".concat(p,".").concat(f)]||l[f]||d[f]||a;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[l]="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6177:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return s}});var r=n(3117),o=(n(7294),n(3905));const a={},i="APIs",c={unversionedId:"apis",id:"apis",title:"APIs",description:"The server exposes two GraphQL API endpoints:",source:"@site/docs/apis.md",sourceDirName:".",slug:"/apis",permalink:"/swan-partner-frontend/apis",draft:!1,editUrl:"https://github.com/swan-io/swan-partner-frontend/edit/main/docs/docs/apis.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"User sessions",permalink:"/swan-partner-frontend/user-sessions"}},p={},s=[{value:"POST <code>/api/partner</code>",id:"post-apipartner",level:2},{value:"POST <code>/api/unauthenticated</code>",id:"post-apiunauthenticated",level:2}],u={toc:s},l="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(l,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"apis"},"APIs"),(0,o.kt)("p",null,"The server exposes two GraphQL API endpoints:"),(0,o.kt)("h2",{id:"post-apipartner"},"POST ",(0,o.kt)("inlineCode",{parentName:"h2"},"/api/partner")),(0,o.kt)("p",null,"The Swan Partner API."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"This endpoint requires the user to have an active session")),(0,o.kt)("h2",{id:"post-apiunauthenticated"},"POST ",(0,o.kt)("inlineCode",{parentName:"h2"},"/api/unauthenticated")),(0,o.kt)("p",null,"The Swan Unauthenticated API, used for the onboarding process, before the user had a chance to authenticate."))}d.isMDXComponent=!0}}]);