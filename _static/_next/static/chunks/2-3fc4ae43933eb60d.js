"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2],{54856:function(e,r,n){n.d(r,{z2:function(){return l},x4:function(){return C},b9:function(){return d},e$:function(){return f},gO:function(){return h},lt:function(){return m},H5:function(){return p},Sy:function(){return x}});var o=n(5038),s=n.n(o),c=n(11768),a="https://www.hululmfx.com/api",i=function(e,t,r,n,o){s().post(e,t).then((function(e){console.log("response",e),c.ZP.success("success"),r()})).catch((function(e){e.response?n(e):c.ZP.error(o("errToast:sorry_a_problem_occurred"))}))},u=function(e,r,n){s().get(e).then((function(e){r(e)})).catch((function(e){e.response?n():c.ZP.error(t("errToast:sorry_a_problem_occurred"))}))},l=function(e){var t=e.values,r=e.success,n=e.error,o=e.t;i("".concat(a,"/register"),t,r,(function(e){401===e.response.status&&c.ZP.error(o("errToast:sorry_email_previously_used")),n()}),o)};function C(e){var t=e.values,r=e.success,n=e.error,o=e.t;i("".concat(a,"/login"),t,r,(function(e){401===e.response.status&&c.ZP.error(o("errToast:sorry_the_email_is_not_true")),402===e.response.status&&c.ZP.error(o("errToast:sorry_the_wrong_password")),n()}),o)}function d(e){var t=e.values,r=e.success,n=e.error,o=e.t;i("".concat(a,"/password/forgot-password"),t,(function(){r(),c.ZP.success(o("errToast:we_have_emailed_your_password_reset_link"))}),(function(e){402===e.response.status&&c.ZP.error(o("errToast:sorry_the_e_mail_is_not_used")),n(e)}),o)}function f(e){var t=e.values,r=e.success,n=e.error,o=e.t;i("".concat(a,"/password/forgot-password"),t,(function(){r(),c.ZP.success(o("errToast:we_have_emailed_your_password_reset_link"))}),(function(e){401===e.response.status&&c.ZP.error(o("errToast:sorry_the_e_mail_is_not_used")),n()}),o)}function h(e){var t=e.values,r=e.success,n=e.error,o=e.t;i("".concat(a,"/password/reset"),t,(function(){r(),c.ZP.success(o("errToast:the_word_has_been_successfully_changed"))}),(function(e){401===e.response.status&&c.ZP.error(o("errToast:sorry_the_e_mail_is_not_used")),500===e.response.status&&c.ZP.error(o("errToast:sorry_please_re_appoint_the_password_setd_set")),n()}),o)}function p(e){var t=e.values,r=e.success,n=e.error,o=e.t;i("".concat(a,"/phoneVerifyCode"),t,(function(){r(),c.ZP.success(o("errToast:the_word_has_been_successfully_changed"))}),(function(e){401===e.response.status&&c.ZP.error(o("errToast:sorry_the_code_is_wrong")),n()}),o)}function m(e){var t=e.success,r=e.error;u("".concat(a,"/Get-current-country"),t,r)}function x(e){var t=e.success,r=e.error,n=e.phone;u("".concat(a,"/verifyPhone?phone_number=").concat(n),t,r)}},38421:function(e,t,r){r.d(t,{II:function(){return p},SQ:function(){return m},Z6:function(){return y},sD:function(){return g},Vi:function(){return x},wo:function(){return b},_q:function(){return w}});var n=r(42087),o=r(73882),s=r(33489),c=r(98243),a=r.n(c),i=r(63792),u=r(2473),l=r(54856);function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){d(e,t,r[t])}))}return e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,s=[],c=!0,a=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(s.push(n.value),!t||s.length!==t);c=!0);}catch(i){a=!0,o=i}finally{try{c||null==r.return||r.return()}finally{if(a)throw o}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return C(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e){return(0,n.jsxs)("div",{className:"".concat(!e.noMarginBottom&&"mb-3 md:mb-6"),children:[(0,n.jsx)(s.gN,f({},e,{className:"block w-full  px-4 py-4  rounded-md bg-secondary ".concat(e.className),children:e.children})),(0,n.jsx)(s.Bc,{name:e.name,component:"span",className:"mt-2 text-sm text-red-500 md:mt-4 md:text-md"})]})}function m(e){return(0,n.jsxs)("div",{className:"relative input-with-icon",children:[(0,n.jsx)("div",{className:"absolute rtl:right-4 ltr:left-4 top-4 z-1 w-5",children:e.icon}),e.children]})}function x(e){var t=e.name,r=e.text,o=h((0,s.U$)(t),3),c=(o[0],o[1],o[2]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("label",{className:"flex gap-2",children:(0,n.jsxs)(u.Z,{onChange:function(e,t){c.setValue(t)},children:[" ",r]})}),(0,n.jsx)(s.Bc,{name:t,component:"span",className:"mt-2 text-sm text-red-500 md:mt-4 md:text-md"})]})}function b(e){var t=e.name,r=e.text,o=e.value,c=e.type,a=e.color,i=e.number;return(0,n.jsxs)("div",{className:"relative ".concat(a&&"aspect-square"),children:[(0,n.jsx)(s.gN,{name:t,type:c,value:o,className:"absolute top-0 right-0 w-full h-full opacity-0 peer"}),(0,n.jsx)("div",{className:"".concat(a?"bg-[".concat(a,"]"):!i&&"bg-secondary","  rounded-xl flex items-center justify-center  font-bold border-2  ").concat(a?"peer-checked:ring-offset-2 peer-checked:ring-2 peer-checked:ring-primary":i?"border-primary border  text-primary peer-checked:bg-primary peer-checked:text-white px-4 py-2":"peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary"," ").concat(!i&&"h-full p-6 border-transparent","  "),children:r||(i?"".concat(o,"$"):"")})]})}function w(e){var t=e.name,r=e.head,o=e.options;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"flex justify-between p-4 mb-4 bg-secondary rounded-xl",children:[r,(0,n.jsx)(s.gN,{name:t,component:"select",className:"font-bold bg-transparent text-primary",children:o})]}),(0,n.jsx)(s.Bc,{name:t,component:"span",className:"text-red-500 block mb-4 "})]})}function y(e){var t=(0,i.Z)(),r=t.t,c=(t.lang,h((0,s.U$)(e.name),3)),u=(c[0],c[1],c[2]),C=(0,o.useState)(""),d=C[0],f=C[1];(0,o.useEffect)((function(){console.log("in Input phone"),(0,l.lt)({success:function(e){f(e.data.CurrentCountry.countryCode)},error:function(){f("")}})}),[d]);var p=(0,o.useState)(),m=p[0];p[1];return(0,n.jsxs)("div",{className:"mb-3 md:mb-6",children:[(0,n.jsx)(a(),{className:"block w-full md:p-4 px-4 py-4   rounded-md bg-secondary ".concat(e.className),country:d.toLowerCase(),enableSearch:!0,containerClass:"block w-full md:p-4 px-4 py-4  rounded-md bg-secondary flex justify-between",placeholder:e.placeholder,searchPlaceholder:r("auth:write_the_name_of_the_state"),value:m,onChange:function(e){return u.setValue(e)}}),(0,n.jsx)(s.Bc,{name:e.name,component:"span",className:"mt-2 text-sm text-red-500 md:mt-4 md:text-md"})]})}function g(e){var t=(0,i.Z)(),r=t.t,c=(t.lang,(0,o.useState)()),u=c[0],C=c[1],d=(0,o.useState)(""),p=d[0],m=d[1],x=(0,o.useState)(""),b=x[0],w=x[1],y=(0,o.useState)(""),g=y[0],v=y[1],_=h((0,s.U$)(e.name),3),j=(_[0],_[1],_[2]);(0,o.useEffect)((function(){(0,l.lt)({success:function(e){v(e.data.CurrentCountry.countryCode)},error:function(){v("")}})}),[]);var Z=function(){j.setValue("".concat(b," , ").concat(p))};return(0,n.jsxs)("div",{className:"mb-3 md:mb-6",children:[(0,n.jsx)(a(),{country:g.toLowerCase(),enableSearch:!0,containerClass:"block w-full md:p-4 px-4 py-4  rounded-md bg-secondary flex justify-between city",placeholder:e.placeholder,countryCodeEditable:!1,searchPlaceholder:r("auth:write_the_name_of_the_state"),value:u,onChange:function(e,t,r,n){C(e.slice(t.dialCode.length)),w(t.name),Z()}}),(0,n.jsx)("input",f({},e,{className:"absolute bg-transparent top-4 width-city",value:p,onChange:function(e){m(e.target.value),Z()},children:e.children})),(0,n.jsx)(s.Bc,{name:e.name,component:"span",className:"mt-2 text-sm text-red-500 md:mt-4 md:text-md"})]})}},89964:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(42087),o=r(50543),s=r(97842);function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function a(e){var t=e.color,r=e.as,a=e.outline,i=e.href,u=e.big,l=e.type,C=e.block,d=e.disabled,f=e.loading,h=c(e,["color","as","outline","href","big","type","block","disabled","loading"]),p="button  text-center rounded-lg shadow-md  text-white ".concat(a&&"out-primary"," ").concat(h.className," ").concat(u&&"p-6 text-[1.5rem] md:text-[1.8rem] "," ").concat(C&&"w-full block"," ").concat(d?"bg-[#bebebe] pointer-events-none":"bg-".concat(t," hover:text-white"));return"link"==r?(0,n.jsx)(o.default,{href:i,children:(0,n.jsx)("a",{className:p,children:h.children})}):(0,n.jsx)("button",{className:"".concat(p," ").concat(f?"pointer-events-none":""),type:l,onClick:h.onClick,children:f?(0,n.jsx)(s.Z,{}):h.children})}},25822:function(e,t,r){r.d(t,{fs:function(){return c},Nt:function(){return a},v2:function(){return i},lO:function(){return u},Eh:function(){return l},kr:function(){return C},de:function(){return d}});var n=r(42087);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){o(e,t,r[t])}))}return e}function c(e){return(0,n.jsxs)("svg",s({},e,{width:"920",height:"776",viewBox:"0 0 920 776",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{d:"M749.182 425.104C739.158 462.512 708.726 492.618 666.25 516.103C623.78 539.586 569.338 556.411 511.428 567.286C395.599 589.038 266.038 586.958 190.942 566.836C40.8324 526.615 -48.2494 372.32 -8.02765 222.211C32.1941 72.101 186.488 -16.9808 336.598 23.241C411.694 43.3629 524.936 106.342 614.372 183.094C659.086 221.467 697.822 263.26 722.86 304.831C747.903 346.409 759.205 387.697 749.182 425.104Z",stroke:"white"}),(0,n.jsx)("path",{d:"M677.87 405.974C669.807 436.065 645.324 460.294 611.126 479.203C576.934 498.108 533.097 511.657 486.463 520.414C393.187 537.93 288.856 536.254 228.393 520.053C107.55 487.673 35.8357 363.461 68.2156 242.617C100.596 121.774 224.808 50.0595 345.652 82.4395C406.115 98.6405 497.305 149.354 569.327 211.162C605.335 242.063 636.524 275.715 656.682 309.183C676.844 342.658 685.933 375.883 677.87 405.974Z",stroke:"white"}),(0,n.jsx)("path",{d:"M831.166 446.196C819.051 491.41 782.272 527.786 730.964 556.155C679.663 584.521 613.903 604.843 543.962 617.977C404.071 644.247 247.591 641.737 156.883 617.432C-24.4524 568.844 -132.065 382.454 -83.4761 201.119C-34.8875 19.7838 151.502 -87.8284 332.837 -39.2398C423.546 -14.9345 560.316 61.1317 668.33 153.828C722.334 200.173 769.122 250.652 799.368 300.868C829.617 351.091 843.281 400.983 831.166 446.196Z",stroke:"white"})]}))}function a(e){return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:760,height:157,viewBox:"0 0 760 157",fill:"none",className:"absolute w-full transform translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2",children:(0,n.jsx)("rect",{x:1,y:1,width:758,height:155,rx:19,style:{stroke:"var(--primary-color)"},strokeWidth:2,strokeDasharray:"15 15"})})}function i(e){return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:20,height:21,viewBox:"0 0 20 21",fill:"none",children:[(0,n.jsx)("path",{d:"M2.5 6.26855H13.5",stroke:"#292D32",strokeWidth:"1.5",strokeLinecap:"round"}),(0,n.jsx)("path",{d:"M2.5 10.4271H10.5",stroke:"#292D32",strokeWidth:"1.5",strokeLinecap:"round"}),(0,n.jsx)("path",{d:"M2.5 14.5857H16",stroke:"#292D32",strokeWidth:"1.5",strokeLinecap:"round"})]})}function u(e){return(0,n.jsx)("svg",s({},e,{xmlns:"http://www.w3.org/2000/svg",width:9,height:15,viewBox:"0 0 9 15",fill:e.fill?e.fill:"none",children:(0,n.jsx)("path",{d:"M7.07143 1.60334H6.57143V2.10334V5.59657C6.57143 6.81836 7.37347 7.89009 8.5 8.13844V8.58979H5.12357H4.62357L4.62357 9.08979V13.7853L4.48071 13.9405L4.33786 13.7853V9.08979L4.33786 8.58979H3.83786H0.5L0.5 8.13844C1.62653 7.89009 2.42857 6.81836 2.42857 5.59657L2.42857 2.10334V1.60334H1.92857H1.28571C1.26233 1.60334 1.23108 1.59373 1.19963 1.55956C1.16769 1.52484 1.14286 1.47088 1.14286 1.4047C1.14286 1.33852 1.16769 1.28456 1.19963 1.24984C1.23108 1.21567 1.26233 1.20605 1.28571 1.20605L7.71429 1.20605C7.73767 1.20605 7.76892 1.21567 7.80036 1.24984C7.83231 1.28456 7.85714 1.33852 7.85714 1.4047C7.85714 1.47088 7.83231 1.52484 7.80036 1.55956C7.76892 1.59373 7.73767 1.60334 7.71429 1.60334H7.07143Z",stroke:"black"})}))}function l(e){return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:25,height:18,viewBox:"0 0 25 18",fill:"none",children:(0,n.jsx)("path",{d:"M8.94822 18C8.44797 18 7.97274 17.7991 7.62256 17.4475L0.544022 10.3404C-0.181341 9.61214 -0.181341 8.4067 0.544022 7.67841C1.26938 6.95012 2.46998 6.95012 3.19535 7.67841L8.94822 13.4545L21.8047 0.546216C22.53 -0.182072 23.7306 -0.182072 24.456 0.546216C25.1813 1.2745 25.1813 2.47994 24.456 3.20823L10.2739 17.4475C9.92371 17.7991 9.44847 18 8.94822 18Z",fill:"white"})})}function C(e){return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:45,height:42,viewBox:"0 0 45 42",fill:"none",stroke:"currentColor",children:(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M23.6133 11.3867H23.54C22.3053 11.3623 21.1633 10.7279 20.3336 9.60051C19.5381 8.51705 19.1135 7.09685 19.1379 5.60344C19.1435 5.32388 19.165 5.04713 19.2019 4.77505C18.3359 5.07687 17.4492 5.39701 16.7072 5.85726C16.3314 6.0964 15.9605 6.41363 15.6091 6.71622L15.5095 6.80123L15.409 6.88703C14.9063 7.31651 14.5257 7.6923 14.2036 8.07297C12.3828 10.2252 11.9106 12.8616 11.8703 14.877C12.7645 14.6403 13.7216 14.4546 14.7592 14.3152C14.9589 13.4421 15.6297 11.7934 16.4631 11.46C16.634 11.3916 16.8194 11.4063 16.9756 11.4941C17.1318 11.582 17.2391 11.743 17.2635 11.9187C17.2698 11.9594 17.3524 12.5182 17.4352 13.0927C19.1072 12.1509 21.0003 11.6502 22.9682 11.6502C25.4705 11.6502 27.8518 12.4598 29.8112 13.9562C29.9034 13.3806 29.9571 12.7525 29.9723 12.148C29.9772 11.948 30.0894 11.7625 30.2602 11.6551C30.431 11.5526 30.6458 11.5429 30.8264 11.6356C32.2551 12.3625 32.8184 14.13 32.5195 16.9013C33.2439 18.0381 33.7552 19.2909 34.0329 20.6095C35.2776 16.4264 35.1981 12.8551 33.8423 9.92747C32.482 6.98812 30.2364 5.78234 30.1004 5.70932C30.0969 5.70741 30.0948 5.70628 30.0941 5.7059C30.0917 5.70347 30.088 5.70225 30.0844 5.70103C30.0807 5.69981 30.0771 5.69859 30.0746 5.69614C29.4917 5.38199 28.8266 5.04729 28.1272 4.83774C28.1622 5.14603 28.1776 5.46217 28.1716 5.78401C28.1423 7.2579 27.6689 8.6537 26.8392 9.69811C25.9803 10.7865 24.8334 11.3867 23.6133 11.3867ZM27.8578 3.5612C27.2109 1.50591 25.6355 0.0373007 23.7694 0.000710102C22.5249 -0.0236887 21.3487 0.581483 20.4703 1.68934C20.0702 2.19297 19.7529 2.77831 19.5284 3.4147C19.3245 3.48868 19.1166 3.56242 18.9132 3.63178L18.8865 3.64117L18.8864 3.64119C17.9382 3.97501 16.9576 4.32018 16.0825 4.86653C15.6286 5.1496 15.2236 5.49611 14.838 5.83286C14.7901 5.87049 14.747 5.90812 14.702 5.94744C14.6828 5.96421 14.6632 5.98129 14.6428 5.9988C14.0962 6.47219 13.6667 6.88703 13.3056 7.31651C11.1526 9.86723 10.6828 12.9745 10.691 15.2309C10.0654 15.4421 9.47025 15.6828 8.89818 15.9549C6.9997 16.8578 4.45212 18.5562 3.1344 21.5137C2.10634 23.8197 1.92001 26.4897 2.61266 29.0398C1.07974 30.5537 0.49558 32.6256 1.31891 34.3053C2.01194 35.7255 3.54927 36.5698 5.42823 36.5698C5.71293 36.5698 6.00082 36.5494 6.28917 36.5095C6.48132 36.7222 6.67753 36.9298 6.8778 37.1212C9.00078 39.1856 11.8168 40.435 14.5986 40.5473C14.7304 40.5521 14.8622 40.557 14.9939 40.557C17.3955 40.557 19.972 39.7014 22.6583 38.0181C23.1789 38.4543 23.7069 38.8517 24.2471 39.2148C26.4726 40.718 28.8787 41.5037 31.1481 41.5037C31.6215 41.5037 32.0851 41.4696 32.5439 41.4013C35.1889 41.0028 37.6875 39.6223 39.4128 37.6173C39.8214 37.6991 40.2327 37.7408 40.6407 37.7408C42.344 37.7408 43.7935 36.9892 44.5207 35.7203C45.4468 34.0923 44.9837 31.9745 43.5336 30.3649C44.2034 27.1639 43.8573 24.2058 42.5096 21.7965C41.2256 19.4863 39.05 17.6102 36.0374 16.2048C36.0413 16.1457 36.0449 16.0868 36.0482 16.028C36.1898 13.5439 35.7945 11.3038 34.8721 9.35158C33.3201 6.07194 30.8311 4.7591 30.6261 4.65662C29.8279 4.22717 28.8823 3.77093 27.8578 3.5612ZM35.9131 17.4456C35.7865 18.3953 35.5859 19.3766 35.3119 20.387C36.8036 21.3428 37.5535 23.1837 37.5854 23.2656C37.6732 23.4852 37.6196 23.739 37.4536 23.9001C37.3511 24.0074 37.1998 24.066 37.0485 24.066C36.9753 24.066 36.8924 24.0514 36.8192 24.0221C36.1195 23.7259 35.1745 23.3731 34.419 23.1197C34.368 23.2542 34.3157 23.3891 34.2623 23.5245C34.1246 26.3284 32.9657 28.949 30.9624 30.9523C30.3134 31.6028 29.5988 32.1642 28.8336 32.6306C28.56 32.9478 28.2825 33.257 28.0017 33.5578C28.8425 34.1516 29.8335 34.7243 30.7089 35.2226C30.909 35.3397 31.0262 35.5593 31.0115 35.7838C30.992 36.0132 30.8358 36.2084 30.6162 36.2816L30.0989 36.4524C30.0745 36.4622 30.0403 36.472 30.0159 36.4768C28.1662 36.8087 26.5069 35.9351 25.4234 35.2519C24.7888 34.8548 24.3822 34.5709 23.966 34.223C23.6361 34.2516 23.3033 34.2661 22.9682 34.2661C22.0552 34.2661 21.1591 34.1586 20.2941 33.9497C21.8412 35.8745 23.217 37.1131 24.8962 38.2436C27.3413 39.8932 29.9914 40.6009 32.3682 40.2446C34.5662 39.9153 36.6465 38.8316 38.1729 37.2411C37.8889 37.1248 37.6095 36.9885 37.3367 36.833C36.0385 36.0912 35.038 35.0029 34.5158 33.7632C33.9741 32.4699 34.0082 31.162 34.6231 30.0883C35.3406 28.8242 36.7901 28.0727 38.4982 28.0727C39.6158 28.0727 40.7578 28.385 41.8023 28.9804C42.0496 29.1211 42.2845 29.2739 42.5063 29.4371C42.8277 27.433 42.8372 24.7874 41.4847 22.3675C40.3774 20.3717 38.5043 18.7204 35.9131 17.4456ZM34.8154 22.0155C35.0922 22.1089 35.3883 22.2139 35.6869 22.3237C35.4826 22.0575 35.2391 21.7933 34.9613 21.5721C34.9141 21.7193 34.8655 21.8671 34.8154 22.0155ZM31.3539 14.5508C31.2093 14.5155 31.0644 14.484 30.9198 14.4554C30.9776 14.1583 31.0254 13.8404 31.0606 13.5194C31.1975 13.8054 31.295 14.1504 31.3539 14.5508ZM16.3503 13.7887C16.335 13.6803 16.3188 13.5664 16.3021 13.4512C16.2224 13.62 16.1449 13.8035 16.0767 13.9935C16.167 13.9238 16.2582 13.8555 16.3503 13.7887ZM23.6962 1.17201C21.8807 1.17201 20.3629 3.16811 20.3141 5.62784C20.2897 6.86259 20.6313 8.02413 21.2804 8.9026C21.8905 9.73228 22.7055 10.1959 23.5644 10.2154H23.6133C25.4288 10.2154 26.9466 8.21935 26.9954 5.75961C27.0442 3.26572 25.5849 1.21105 23.745 1.17201H23.6962ZM14.9741 30.9523C15.8063 31.7845 16.7443 32.471 17.7578 32.9991C17.1944 33.4468 16.5426 33.8968 15.711 34.4224C15.506 34.5541 15.4036 34.7933 15.4475 35.0324C15.4914 35.2716 15.6817 35.457 15.9209 35.5009C16.2283 35.5546 16.5358 35.579 16.8384 35.579C17.8646 35.579 18.8301 35.2959 19.648 34.9733C20.346 35.8022 21.0403 36.542 21.7432 37.204C19.2265 38.7316 16.8407 39.4639 14.6523 39.376C12.1584 39.2784 9.62548 38.1461 7.70259 36.2769C7.67237 36.2481 7.64236 36.219 7.61254 36.1896C7.88431 36.0955 8.15262 35.9844 8.41505 35.8572C9.75717 35.2032 10.826 34.1735 11.4214 32.968C12.0461 31.7137 12.0851 30.4058 11.5434 29.2979C10.8504 27.8777 9.31305 27.0334 7.43409 27.0334C6.4336 27.0334 5.40383 27.2774 4.44727 27.746C4.15565 27.8887 3.87915 28.0482 3.61899 28.2217C3.1595 26.1117 3.36776 23.8714 4.20322 21.9871C5.37452 19.3566 7.6732 17.829 9.39599 17.0091C10.9766 16.2602 12.5291 15.6516 14.6246 15.329C13.7749 16.2562 13.0959 17.3015 12.6032 18.4261C12.1925 18.5907 11.792 18.7813 11.4067 19.0051C10.0499 19.7811 9.05919 21.05 8.67852 22.4849C8.65899 22.5386 8.65411 22.5971 8.65411 22.6508C8.65411 22.9436 8.87373 23.1974 9.16656 23.2316C9.19096 23.2365 9.21536 23.2365 9.23976 23.2365C9.35201 23.2365 9.46914 23.2023 9.56187 23.1389C10.2538 22.7986 10.9668 22.4494 11.6889 22.1451C11.6699 22.4144 11.6603 22.6856 11.6603 22.9581C11.6603 25.9742 12.8365 28.8147 14.9741 30.9523ZM11.3932 20.4239C11.4346 20.5973 11.477 20.7709 11.5206 20.9448C11.1645 21.0887 10.8133 21.2437 10.4647 21.4014C10.7211 21.0361 11.0342 20.7066 11.3932 20.4239ZM25.7975 34.106C25.898 34.0132 25.9952 33.9223 26.0902 33.832C25.9204 33.8805 25.7493 33.925 25.5769 33.9655C25.6428 34.0082 25.7148 34.0538 25.7975 34.106ZM22.9682 12.6165C20.2059 12.6165 17.6095 13.6902 15.6573 15.6424C13.7052 17.5946 12.6315 20.1909 12.6315 22.9533C12.6315 25.7156 13.7052 28.312 15.6573 30.2641C17.6095 32.2163 20.2059 33.29 22.9682 33.29C25.7305 33.29 28.3269 32.2163 30.2791 30.2641C32.2313 28.312 33.305 25.7156 33.305 22.9533C33.305 20.1909 32.2313 17.5946 30.2791 15.6424C28.3269 13.6951 25.7305 12.6165 22.9682 12.6165ZM18.0536 34.2516C18.2705 34.0863 18.4776 33.926 18.675 33.7636C18.7396 33.8474 18.804 33.9303 18.8684 34.0125C18.6075 34.1037 18.3345 34.186 18.0536 34.2516ZM38.4933 29.2488C37.1951 29.2488 36.1556 29.771 35.6383 30.6739C35.2088 31.4206 35.199 32.3626 35.5944 33.3142C36.019 34.3196 36.8389 35.203 37.9126 35.8179C38.7813 36.3108 39.7232 36.5695 40.6407 36.5695C41.9389 36.5695 42.9784 36.0473 43.4958 35.1444C44.4084 33.5387 43.3835 31.2352 41.2166 30.0053C40.3479 29.5075 39.406 29.2488 38.4933 29.2488ZM27.1756 34.4095C27.0681 34.5161 26.9602 34.6214 26.852 34.7254C27.466 35.0406 28.0319 35.2394 28.5664 35.3251C28.0893 35.0315 27.6122 34.7249 27.1756 34.4095ZM4.95971 28.8001C5.75522 28.4097 6.60441 28.2047 7.42921 28.2047C8.84941 28.2047 9.99143 28.8001 10.4746 29.8055C10.8553 30.5815 10.8162 31.5136 10.3575 32.4409C9.87918 33.417 9.0007 34.2564 7.89285 34.7982C7.09734 35.1886 6.24326 35.3936 5.42335 35.3936C4.00315 35.3936 2.86113 34.7982 2.36821 33.7879C1.55806 32.1335 2.7196 29.8933 4.95971 28.8001ZM27.498 25.8133V24.3882L25.8533 24.3931V20.6742H24.4136L24.1208 24.3931H20.7679L24.0866 16.7211H22.154L18.7279 25.1056V25.8133H24.1257V28.5268H25.8582V25.8133H27.498Z",fill:"black"})})}function d(e){return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",children:[(0,n.jsx)("path",{d:"M22 11.75H12C11.59 11.75 11.25 11.41 11.25 11V4.00004C11.25 3.64004 11.5 3.33005 11.85 3.26005L21.85 1.26005C22.07 1.22005 22.3 1.27005 22.47 1.42005C22.64 1.56005 22.74 1.78004 22.74 2.00004V11C22.75 11.41 22.41 11.75 22 11.75ZM12.75 10.25H21.25V2.92005L12.75 4.62004V10.25Z",fill:"#81BA03"}),(0,n.jsx)("path",{d:"M22 22.75C21.95 22.75 21.9 22.75 21.85 22.74L11.85 20.74C11.5 20.67 11.25 20.36 11.25 20V13C11.25 12.59 11.59 12.25 12 12.25H22C22.41 12.25 22.75 12.59 22.75 13V22C22.75 22.22 22.65 22.44 22.48 22.58C22.34 22.69 22.17 22.75 22 22.75ZM12.75 19.38L21.25 21.08V13.75H12.75V19.38Z",fill:"#FDB903"}),(0,n.jsx)("path",{d:"M10 11.75H2C1.59 11.75 1.25 11.41 1.25 11V6.00002C1.25 5.65002 1.50003 5.34001 1.84003 5.27001L9.84003 3.57003C10.06 3.52003 10.29 3.58002 10.47 3.72002C10.65 3.86002 10.75 4.08001 10.75 4.30001V11C10.75 11.41 10.41 11.75 10 11.75ZM2.75 10.25H9.25V5.23003L2.75 6.61001V10.25Z",fill:"#F05124"}),(0,n.jsx)("path",{d:"M10 20.45C9.95 20.45 9.90003 20.44 9.84003 20.43L1.84003 18.73C1.49003 18.66 1.25 18.35 1.25 18V13C1.25 12.59 1.59 12.25 2 12.25H10C10.41 12.25 10.75 12.59 10.75 13V19.7C10.75 19.93 10.65 20.14 10.47 20.28C10.34 20.39 10.17 20.45 10 20.45ZM2.75 17.39L9.25 18.77V13.75H2.75V17.39Z",fill:"#05A5F0"})]})}}}]);