"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[25],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return k}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(t),m=i,k=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return t?r.createElement(k,a(a({ref:n},u),{},{components:t})):r.createElement(k,a({ref:n},u))}));function k(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[d]="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6550:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return a},default:function(){return c},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return s}});var r=t(3117),i=(t(7294),t(3905));const o={},a="Deployment",l={unversionedId:"deploy",id:"deploy",title:"Deployment",description:"Required env variables",source:"@site/docs/deploy.md",sourceDirName:".",slug:"/deploy",permalink:"/swan-partner-frontend/deploy",draft:!1,editUrl:"https://github.com/swan-io/swan-partner-frontend/edit/main/docs/docs/deploy.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Production build",permalink:"/swan-partner-frontend/build"},next:{title:"Lake (UI Kit)",permalink:"/swan-partner-frontend/lake-ui-kit"}},p={},s=[{value:"Required env variables",id:"required-env-variables",level:2},{value:"Environment",id:"environment",level:3},{value:"APIs",id:"apis",level:3},{value:"Sessions",id:"sessions",level:3},{value:"URLs to expose",id:"urls-to-expose",level:3},{value:"Exposing the app",id:"exposing-the-app",level:2},{value:"Routing",id:"routing",level:2},{value:"CDN",id:"cdn",level:2}],u={toc:s},d="wrapper";function c(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"deployment"},"Deployment"),(0,i.kt)("h2",{id:"required-env-variables"},"Required env variables"),(0,i.kt)("h3",{id:"environment"},"Environment"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NODE_ENV"),": ",(0,i.kt)("inlineCode",{parentName:"li"},'"development"')," or ",(0,i.kt)("inlineCode",{parentName:"li"},'"production"')),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"LOG_LEVEL"),": ",(0,i.kt)("inlineCode",{parentName:"li"},'"fatal"'),", ",(0,i.kt)("inlineCode",{parentName:"li"},'"error"'),", ",(0,i.kt)("inlineCode",{parentName:"li"},'"warn"'),", ",(0,i.kt)("inlineCode",{parentName:"li"},'"info"'),", ",(0,i.kt)("inlineCode",{parentName:"li"},'"debug"'),", ",(0,i.kt)("inlineCode",{parentName:"li"},'"trace"')," or ",(0,i.kt)("inlineCode",{parentName:"li"},'"silent"'))),(0,i.kt)("h3",{id:"apis"},"APIs"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"PARTNER_API_URL"),": Swan Partner API URL"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"UNAUTHENTICATED_API_URL"),": Swan Unauthenticated API URL"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"OAUTH_SERVER_URL"),": Swan OAuth2 server URL"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"OAUTH_CLIENT_ID"),": Your Swan project's OAuth2 Client ID"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"OAUTH_CLIENT_SECRET"),": Your Swan project's OAuth2 Client Secret")),(0,i.kt)("h3",{id:"sessions"},"Sessions"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"COOKIE_KEY"),": the key to encrypt session cookies (generate one using ",(0,i.kt)("inlineCode",{parentName:"li"},"yarn generate-cookie-key"),")")),(0,i.kt)("h3",{id:"urls-to-expose"},"URLs to expose"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"BANKING_URL"),": URL you serve the banking interface from"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ONBOARDING_URL")," URL you serve the onboarding interface from")),(0,i.kt)("h2",{id:"exposing-the-app"},"Exposing the app"),(0,i.kt)("p",null,"The server is ",(0,i.kt)("strong",{parentName:"p"},"a single application")," that serves both domains (onboarding & banking)."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"It's recommended to make both subdomains ",(0,i.kt)("strong",{parentName:"p"},"point to the same application")," so that you don't have any sync issues between onboarding & banking.")),(0,i.kt)("h2",{id:"routing"},"Routing"),(0,i.kt)("p",null,"In order to route to the correct client given the domain, the server using the ",(0,i.kt)("inlineCode",{parentName:"p"},"X-Forwarded-Host")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"Host")," header."),(0,i.kt)("h2",{id:"cdn"},"CDN"),(0,i.kt)("p",null,"In order to avoid stale contents or too many hits, it's recommended that your CDN ",(0,i.kt)("strong",{parentName:"p"},"applies the caching policy in the app's HTTP Response headers"),"."))}c.isMDXComponent=!0}}]);