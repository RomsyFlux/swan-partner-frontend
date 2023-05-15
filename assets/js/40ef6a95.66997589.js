"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[597],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var m=r.createContext({}),c=function(e){var t=r.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(m.Provider,{value:t},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,m=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=c(n),d=a,f=l["".concat(m,".").concat(d)]||l[d]||u[d]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var m in t)hasOwnProperty.call(t,m)&&(s[m]=t[m]);s.originalType=e,s[l]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9312:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return o},default:function(){return u},frontMatter:function(){return i},metadata:function(){return s},toc:function(){return c}});var r=n(3117),a=(n(7294),n(3905));const i={},o="Members",s={unversionedId:"specs/banking/members",id:"specs/banking/members",title:"Members",description:"Account memberships provide account access to as many people as needed with various levels of permission.",source:"@site/docs/specs/banking/members.md",sourceDirName:"specs/banking",slug:"/specs/banking/members",permalink:"/swan-partner-frontend/specs/banking/members",draft:!1,editUrl:"https://github.com/swan-io/swan-partner-frontend/edit/main/docs/docs/specs/banking/members.md",tags:[],version:"current",frontMatter:{},sidebar:"specs",previous:{title:"Cards",permalink:"/swan-partner-frontend/specs/banking/cards"},next:{title:"Profile",permalink:"/swan-partner-frontend/specs/banking/profile"}},m={},c=[{value:"Primary members content",id:"primary-members-content",level:2},{value:"Add a new account member",id:"add-a-new-account-member",level:2}],p={toc:c},l="wrapper";function u(e){let{components:t,...i}=e;return(0,a.kt)(l,(0,r.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"members"},"Members"),(0,a.kt)("p",null,"Account memberships provide account access to as many people as needed with various levels of permission.\nLearn more about ",(0,a.kt)("a",{parentName:"p",href:"https://docs.swan.io/guide/give-access-to-your-account"},"account memberships")," in our main documentation."),(0,a.kt)("h2",{id:"primary-members-content"},"Primary members content"),(0,a.kt)("p",null,"Along with the main navigation, the ",(0,a.kt)("strong",{parentName:"p"},"members page")," should include the following content:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Button to add a new account membership"),(0,a.kt)("li",{parentName:"ul"},"Filters for ",(0,a.kt)("strong",{parentName:"li"},"status")," and ",(0,a.kt)("strong",{parentName:"li"},"permission type")),(0,a.kt)("li",{parentName:"ul"},"List of current account memberships",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Full name"),(0,a.kt)("li",{parentName:"ul"},"Permissions (",(0,a.kt)("em",{parentName:"li"},"can view account"),", ",(0,a.kt)("em",{parentName:"li"},"can initiate payments"),", ",(0,a.kt)("em",{parentName:"li"},"can manage memberships"),", and ",(0,a.kt)("em",{parentName:"li"},"can manage beneficiaries"),")"),(0,a.kt)("li",{parentName:"ul"},"Email"),(0,a.kt)("li",{parentName:"ul"},"Phone number"))),(0,a.kt)("li",{parentName:"ul"},"Current status")),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(2026).Z,width:"2920",height:"1874"})),(0,a.kt)("h2",{id:"add-a-new-account-member"},"Add a new account member"),(0,a.kt)("p",null,"When adding a new account member, the user should provide the following information about that person:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"First or given name"),(0,a.kt)("li",{parentName:"ul"},"Last or family name"),(0,a.kt)("li",{parentName:"ul"},"Phone number"),(0,a.kt)("li",{parentName:"ul"},"Birth date"),(0,a.kt)("li",{parentName:"ul"},"Email"),(0,a.kt)("li",{parentName:"ul"},"Permissions checkboxes (",(0,a.kt)("em",{parentName:"li"},"can view account"),", ",(0,a.kt)("em",{parentName:"li"},"can initiate payments"),", ",(0,a.kt)("em",{parentName:"li"},"can manage memberships"),", and ",(0,a.kt)("em",{parentName:"li"},"can manage beneficiaries"),")")),(0,a.kt)("p",null,"When the user clicks ",(0,a.kt)("strong",{parentName:"p"},"Send invitation"),", an invitation is sent to the potential new account member by email, which they must open and accept."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(5524).Z,width:"2920",height:"1874"})),(0,a.kt)("admonition",{title:"\ud83c\udde9\ud83c\uddea Germany",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"For German accounts, ",(0,a.kt)("strong",{parentName:"p"},"add a second step")," asking for the ",(0,a.kt)("strong",{parentName:"p"},"residency address")," of the potential new account member. If that address in Germany, you must also collect their ",(0,a.kt)("strong",{parentName:"p"},"tax identification number")," (",(0,a.kt)("em",{parentName:"p"},"Steuer-Identifikationsnummer"),").")))}u.isMDXComponent=!0},2026:function(e,t,n){t.Z=n.p+"assets/images/members-main-23475eedc5232908d43a9aae385d4b95.png"},5524:function(e,t,n){t.Z=n.p+"assets/images/members-new-feb8850fba103ed0ce5d2a3cd7aa7957.png"}}]);