var ie=Object.defineProperty,de=Object.defineProperties;var ue=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var me=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable;var J=(o,e,t)=>e in o?ie(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,R=(o,e)=>{for(var t in e||(e={}))me.call(e,t)&&J(o,t,e[t]);if(G)for(var t of G(e))pe.call(e,t)&&J(o,t,e[t]);return o},$=(o,e)=>de(o,ue(e));import{T as _,u as he,C as be,a as fe,B as K,d as Ce,b as M,G as U,L as Q}from"./index.esm.28da3e2b.js";import{g as O,a as V,s as z,B as ge,_ as s,r as P,b as q,u as xe,c as Y,d as j,j as v,e as n,f as Z,h as S,i as E,k as ke,l as ye,m as ee,n as ve,A as Pe,T as X,o as Be}from"./index.89c375a9.js";function Fe(o){return O("PrivateSwitchBase",o)}V("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Ie=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Se=o=>{const{classes:e,checked:t,disabled:r,edge:a}=o,l={root:["root",t&&"checked",r&&"disabled",a&&`edge${S(a)}`],input:["input"]};return j(l,Fe,e)},we=z(ge)(({ownerState:o})=>s({padding:9,borderRadius:"50%"},o.edge==="start"&&{marginLeft:o.size==="small"?-3:-12},o.edge==="end"&&{marginRight:o.size==="small"?-3:-12})),Re=z("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),$e=P.exports.forwardRef(function(e,t){const{autoFocus:r,checked:a,checkedIcon:l,className:m,defaultChecked:g,disabled:B,disableFocusRipple:i=!1,edge:x=!1,icon:F,id:d,inputProps:c,inputRef:f,name:k,onBlur:p,onChange:C,onFocus:h,readOnly:y,required:oe,tabIndex:te,type:w,value:H}=e,ne=q(e,Ie),[W,ae]=xe({controlled:a,default:Boolean(g),name:"SwitchBase",state:"checked"}),b=Y(),re=u=>{h&&h(u),b&&b.onFocus&&b.onFocus(u)},le=u=>{p&&p(u),b&&b.onBlur&&b.onBlur(u)},se=u=>{if(u.nativeEvent.defaultPrevented)return;const A=u.target.checked;ae(A),C&&C(u,A)};let I=B;b&&typeof I=="undefined"&&(I=b.disabled);const ce=w==="checkbox"||w==="radio",T=s({},e,{checked:W,disabled:I,disableFocusRipple:i,edge:x}),D=Se(T);return v(we,s({component:"span",className:Z(D.root,m),centerRipple:!0,focusRipple:!i,disabled:I,tabIndex:null,role:void 0,onFocus:re,onBlur:le,ownerState:T,ref:t},ne,{children:[n(Re,s({autoFocus:r,checked:a,defaultChecked:g,className:D.input,disabled:I,id:ce&&d,name:k,onChange:se,readOnly:y,ref:f,required:oe,ownerState:T,tabIndex:te,type:w},w==="checkbox"&&H===void 0?{}:{value:H},c)),W?l:F]}))});var Le=$e,ze=E(n("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Te=E(n("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Me=E(n("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Ue(o){return O("MuiCheckbox",o)}const Ne=V("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]);var N=Ne;const _e=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],Oe=o=>{const{classes:e,indeterminate:t,color:r}=o,a={root:["root",t&&"indeterminate",`color${S(r)}`]},l=j(a,Ue,e);return s({},e,l)},Ve=z(Le,{shouldForwardProp:o=>ke(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.indeterminate&&e.indeterminate,t.color!=="default"&&e[`color${S(t.color)}`]]}})(({theme:o,ownerState:e})=>s({color:o.palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:ye(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${N.checked}, &.${N.indeterminate}`]:{color:o.palette[e.color].main},[`&.${N.disabled}`]:{color:o.palette.action.disabled}})),qe=n(Te,{}),je=n(ze,{}),Ee=n(Me,{}),He=P.exports.forwardRef(function(e,t){var r,a;const l=ee({props:e,name:"MuiCheckbox"}),{checkedIcon:m=qe,color:g="primary",icon:B=je,indeterminate:i=!1,indeterminateIcon:x=Ee,inputProps:F,size:d="medium"}=l,c=q(l,_e),f=i?x:B,k=i?x:m,p=s({},l,{color:g,indeterminate:i,size:d}),C=Oe(p);return n(Ve,s({type:"checkbox",inputProps:s({"data-indeterminate":i},F),icon:P.exports.cloneElement(f,{fontSize:(r=f.props.fontSize)!=null?r:d}),checkedIcon:P.exports.cloneElement(k,{fontSize:(a=k.props.fontSize)!=null?a:d}),ownerState:p,ref:t},c,{classes:C}))});var We=He;function De(o){return O("MuiFormControlLabel",o)}const Ae=V("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]);var L=Ae;const Ge=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","value"],Je=o=>{const{classes:e,disabled:t,labelPlacement:r,error:a}=o,l={root:["root",t&&"disabled",`labelPlacement${S(r)}`,a&&"error"],label:["label",t&&"disabled"]};return j(l,De,e)},Ke=z("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[{[`& .${L.label}`]:e.label},e.root,e[`labelPlacement${S(t.labelPlacement)}`]]}})(({theme:o,ownerState:e})=>s({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${L.disabled}`]:{cursor:"default"}},e.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},e.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},e.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${L.label}`]:{[`&.${L.disabled}`]:{color:o.palette.text.disabled}}})),Qe=P.exports.forwardRef(function(e,t){const r=ee({props:e,name:"MuiFormControlLabel"}),{className:a,componentsProps:l={},control:m,disabled:g,disableTypography:B,label:i,labelPlacement:x="end"}=r,F=q(r,Ge),d=Y();let c=g;typeof c=="undefined"&&typeof m.props.disabled!="undefined"&&(c=m.props.disabled),typeof c=="undefined"&&d&&(c=d.disabled);const f={disabled:c};["checked","name","onChange","value","inputRef"].forEach(y=>{typeof m.props[y]=="undefined"&&typeof r[y]!="undefined"&&(f[y]=r[y])});const k=ve({props:r,muiFormControl:d,states:["error"]}),p=s({},r,{disabled:c,labelPlacement:x,error:k.error}),C=Je(p);let h=i;return h!=null&&h.type!==_&&!B&&(h=n(_,s({component:"span",className:C.label},l.typography,{children:h}))),v(Ke,s({className:Z(C.root,a),ownerState:p,ref:t},F,{children:[P.exports.cloneElement(m,f),h]}))});var Xe=Qe;function Ye(o){return o.json().then(e=>o.ok?e:Promise.reject(e))}function to(){const{handleSubmit:o,control:e,formState:{errors:t}}=he({mode:"onChange"}),r=a=>{fetch("http://localhost:8000/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),credentials:"include"}).then(Ye).then(l=>{console.log(l.message),window.location.href="/"+l.username}).catch(l=>{alert(l.error)})};return console.log(t),v(be,{component:"main",maxWidth:"xs",children:[n(fe,{}),v(K,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[n(Pe,{sx:{m:1,bgcolor:"secondary.main"},children:n(Ce,{})}),n(_,{component:"h1",variant:"h5",children:"Sign in"}),v(K,{component:"form",onSubmit:o(r),noValidate:!0,sx:{mt:1},children:[n(M,{name:"username",control:e,defaultValue:"",rules:{required:!0},render:({field:a})=>n(X,$(R({},a),{margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",autoFocus:!0}))}),n(M,{name:"password",control:e,defaultValue:"",rules:{required:!0},render:({field:a})=>n(X,$(R({},a),{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}))}),n(M,{name:"remember",control:e,defaultValue:!1,render:({field:a})=>n(Xe,{control:n(We,$(R({},a),{value:"remember"})),label:"Remember me"})}),n(Be,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),v(U,{container:!0,children:[n(U,{item:!0,xs:!0,children:n(Q,{href:"#",variant:"body2",children:"Forgot password?"})}),n(U,{item:!0,children:n(Q,{href:"/i/flow/signup",variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]})]})}export{to as default};