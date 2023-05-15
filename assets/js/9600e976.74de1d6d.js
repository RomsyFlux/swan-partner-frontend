"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[855],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=i.createContext({}),u=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return i.createElement(c.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=u(n),d=r,f=l["".concat(c,".").concat(d)]||l[d]||m[d]||a;return n?i.createElement(f,o(o({ref:t},p),{},{components:n})):i.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[l]="string"==typeof e?e:r,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7290:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return a},metadata:function(){return s},toc:function(){return u}});var i=n(3117),r=(n(7294),n(3905));const a={title:"Automate account membership invitation",sidebar_label:"Automate account membership invitation"},o=void 0,s={unversionedId:"invitation",id:"invitation",title:"Automate account membership invitation",description:"When a new account membership is created, the invited user must accept the membership.",source:"@site/docs/invitation.mdx",sourceDirName:".",slug:"/invitation",permalink:"/swan-partner-frontend/invitation",draft:!1,editUrl:"https://github.com/swan-io/swan-partner-frontend/edit/main/docs/docs/invitation.mdx",tags:[],version:"current",frontMatter:{title:"Automate account membership invitation",sidebar_label:"Automate account membership invitation"},sidebar:"docs",previous:{title:"APIs",permalink:"/swan-partner-frontend/apis"}},c={},u=[{value:"Write expected signature",id:"write-expected-signature",level:2},{value:"Review example",id:"review-example",level:2},{value:"Pass to function parameters",id:"pass-to-function-parameters",level:2}],p={toc:u},l="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(l,(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"When a new account membership is created, the invited user must accept the membership."),(0,r.kt)("p",null,"By default, this is done with an invitation link.\nThe link needs to be copied manually from the app and sent to the invited user.\nThen, the invited user opens the links and follows the prompts to accept the membership."),(0,r.kt)("p",null,"Alternatively, you can ",(0,r.kt)("strong",{parentName:"p"},"automate sending the link")," by including a ",(0,r.kt)("inlineCode",{parentName:"p"},"sendAccountMembershipInvitation")," in the ",(0,r.kt)("inlineCode",{parentName:"p"},"start")," function called in ",(0,r.kt)("inlineCode",{parentName:"p"},"server/src/index.ts"),"."),(0,r.kt)("h2",{id:"write-expected-signature"},"Write expected signature"),(0,r.kt)("p",null,"The expected signature contains the following information:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export type InvitationConfig = {\n  accessToken: string;\n  requestLanguage: string;\n  inviteeAccountMembershipId: string;\n  inviterAccountMembershipId: string;\n};\n\ntype sendAccountMembershipInvitation = (config: InvitationConfig) => Promise<unknown>;\n")),(0,r.kt)("h2",{id:"review-example"},"Review example"),(0,r.kt)("p",null,"Review Swan's internal implementation:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="index.ts"',title:'"index.ts"'},'const sendAccountMembershipInvitation = (invitationConfig: InvitationConfig) => {\n  // Get data from the API\n  return (\n    getAccountMembershipInvitationData({\n      accessToken: invitationConfig.accessToken,\n      inviteeAccountMembershipId: invitationConfig.inviteeAccountMembershipId,\n      inviterAccountMembershipId: invitationConfig.inviterAccountMembershipId,\n    })\n      // Build mailjet config\n      .mapOkToResult(invitationData =>\n        getMailjetInput({ invitationData, requestLanguage: invitationConfig.requestLanguage }),\n      )\n      // Send email\n      .flatMapOk(data => {\n        return Future.fromPromise(mailjet.post("send", { version: "v3.1" }).request(data));\n      })\n      .resultToPromise()\n  );\n};\n')),(0,r.kt)("h2",{id:"pass-to-function-parameters"},"Pass to function parameters"),(0,r.kt)("p",null,"Pass the expected signature to the ",(0,r.kt)("inlineCode",{parentName:"p"},"start")," function parameters:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="index.ts"',title:'"index.ts"'},"start({\n  mode: env.NODE_ENV,\n  // ...\n  sendAccountMembershipInvitation,\n});\n")),(0,r.kt)("admonition",{title:"success",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"With this configuration, sending the invitation is automated thanks to your function.")))}m.isMDXComponent=!0}}]);