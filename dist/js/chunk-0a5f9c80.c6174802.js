(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a5f9c80"],{"06d9":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n("2b0e"),r=i["default"].extend({computed:{selectionStart:{cache:!1,get:function(){return this.$refs.input.selectionStart},set:function(t){this.$refs.input.selectionStart=t}},selectionEnd:{cache:!1,get:function(){return this.$refs.input.selectionEnd},set:function(t){this.$refs.input.selectionEnd=t}},selectionDirection:{cache:!1,get:function(){return this.$refs.input.selectionDirection},set:function(t){this.$refs.input.selectionDirection=t}}},methods:{select:function(){var t;(t=this.$refs.input).select.apply(t,arguments)},setSelectionRange:function(){var t;(t=this.$refs.input).setSelectionRange.apply(t,arguments)},setRangeText:function(){var t;(t=this.$refs.input).setRangeText.apply(t,arguments)}}})},"11de":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return u}));var i=n("2b0e"),r=n("b42e"),c=n("c637"),a=n("a723"),o=n("cf75"),s=Object(o["d"])({id:Object(o["c"])(a["u"]),inline:Object(o["c"])(a["g"],!1),novalidate:Object(o["c"])(a["g"],!1),validated:Object(o["c"])(a["g"],!1)},c["J"]),u=i["default"].extend({name:c["J"],functional:!0,props:s,render:function(t,e){var n=e.props,i=e.data,c=e.children;return t("form",Object(r["a"])(i,{class:{"form-inline":n.inline,"was-validated":n.validated},attrs:{id:n.id,novalidate:n.novalidate}}),c)}})},"134f":function(t,e,n){"use strict";n("295a")},"1f1e":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n("2b0e"),r=i["default"].extend({computed:{validity:{cache:!1,get:function(){return this.$refs.input.validity}},validationMessage:{cache:!1,get:function(){return this.$refs.input.validationMessage}},willValidate:{cache:!1,get:function(){return this.$refs.input.willValidate}}},methods:{setCustomValidity:function(){var t;return(t=this.$refs.input).setCustomValidity.apply(t,arguments)},checkValidity:function(){var t;return(t=this.$refs.input).checkValidity.apply(t,arguments)},reportValidity:function(){var t;return(t=this.$refs.input).reportValidity.apply(t,arguments)}}})},"295a":function(t,e,n){},"40fc":function(t,e,n){"use strict";n.d(e,"b",(function(){return w})),n.d(e,"a",(function(){return x}));var i=n("2b0e"),r=n("0056"),c=n("a723"),a=n("906c"),o=n("6b77"),s=n("a8c8"),u=n("58f2"),l=n("3a58"),f=n("d82f"),d=n("cf75"),p=n("fa73");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){m(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O=Object(u["a"])("value",{type:c["p"],defaultValue:"",event:r["bb"]}),v=O.mixin,j=O.props,g=O.prop,y=O.event,w=Object(d["d"])(Object(f["m"])(h(h({},j),{},{ariaInvalid:Object(d["c"])(c["j"],!1),autocomplete:Object(d["c"])(c["u"]),debounce:Object(d["c"])(c["p"],0),formatter:Object(d["c"])(c["l"]),lazy:Object(d["c"])(c["g"],!1),lazyFormatter:Object(d["c"])(c["g"],!1),number:Object(d["c"])(c["g"],!1),placeholder:Object(d["c"])(c["u"]),plaintext:Object(d["c"])(c["g"],!1),readonly:Object(d["c"])(c["g"],!1),trim:Object(d["c"])(c["g"],!1)})),"formTextControls"),x=i["default"].extend({mixins:[v],props:w,data:function(){var t=this[g];return{localValue:Object(p["g"])(t),vModelValue:this.modifyValue(t)}},computed:{computedClass:function(){var t=this.plaintext,e=this.type,n="range"===e,i="color"===e;return[{"custom-range":n,"form-control-plaintext":t&&!n&&!i,"form-control":i||!t&&!n},this.sizeFormClass,this.stateClass]},computedDebounce:function(){return Object(s["d"])(Object(l["c"])(this.debounce,0),0)},hasFormatter:function(){return Object(d["b"])(this.formatter)}},watch:m({},g,(function(t){var e=Object(p["g"])(t),n=this.modifyValue(t);e===this.localValue&&n===this.vModelValue||(this.clearDebounce(),this.localValue=e,this.vModelValue=n)})),created:function(){this.$_inputDebounceTimer=null},mounted:function(){this.$on(r["eb"],this.clearDebounce)},beforeDestroy:function(){this.clearDebounce()},methods:{clearDebounce:function(){clearTimeout(this.$_inputDebounceTimer),this.$_inputDebounceTimer=null},formatValue:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return t=Object(p["g"])(t),!this.hasFormatter||this.lazyFormatter&&!n||(t=this.formatter(t,e)),t},modifyValue:function(t){return t=Object(p["g"])(t),this.trim&&(t=t.trim()),this.number&&(t=Object(l["b"])(t,t)),t},updateValue:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.lazy;if(!i||n){this.clearDebounce();var r=function(){if(t=e.modifyValue(t),t!==e.vModelValue)e.vModelValue=t,e.$emit(y,t);else if(e.hasFormatter){var n=e.$refs.input;n&&t!==n.value&&(n.value=t)}},c=this.computedDebounce;c>0&&!i&&!n?this.$_inputDebounceTimer=setTimeout(r,c):r()}},onInput:function(t){if(!t.target.composing){var e=t.target.value,n=this.formatValue(e,t);!1===n||t.defaultPrevented?Object(o["f"])(t,{propagation:!1}):(this.localValue=n,this.updateValue(n),this.$emit(r["y"],n))}},onChange:function(t){var e=t.target.value,n=this.formatValue(e,t);!1===n||t.defaultPrevented?Object(o["f"])(t,{propagation:!1}):(this.localValue=n,this.updateValue(n,!0),this.$emit(r["d"],n))},onBlur:function(t){var e=t.target.value,n=this.formatValue(e,t,!0);!1!==n&&(this.localValue=Object(p["g"])(this.modifyValue(n)),this.updateValue(n,!0)),this.$emit(r["b"],t)},focus:function(){this.disabled||Object(a["d"])(this.$el)},blur:function(){this.disabled||Object(a["c"])(this.$el)}}})},4797:function(t,e,n){"use strict";n.d(e,"a",(function(){return V}));var i=n("2b0e"),r=n("c637"),c=n("a723"),a=n("2326"),o=n("906c"),s=n("6b77"),u=n("d82f"),l=n("cf75"),f=n("dde7"),d=n("06d9"),p=n("ad47"),b=n("d520"),h=n("40fc"),m=n("1f1e"),O=n("90ef"),v=n("bc9a");function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){y(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=["text","password","email","number","url","tel","search","range","color","date","time","datetime","datetime-local","month","week"],x=Object(l["d"])(Object(u["m"])(g(g(g(g(g(g({},O["b"]),f["b"]),p["b"]),b["b"]),h["b"]),{},{list:Object(l["c"])(c["u"]),max:Object(l["c"])(c["p"]),min:Object(l["c"])(c["p"]),noWheel:Object(l["c"])(c["g"],!1),step:Object(l["c"])(c["p"]),type:Object(l["c"])(c["u"],"text",(function(t){return Object(a["a"])(w,t)}))})),r["R"]),V=i["default"].extend({name:r["R"],mixins:[v["a"],O["a"],f["a"],p["a"],b["a"],h["a"],d["a"],m["a"]],props:x,computed:{localType:function(){var t=this.type;return Object(a["a"])(w,t)?t:"text"},computedAttrs:function(){var t=this.localType,e=this.name,n=this.form,i=this.disabled,r=this.placeholder,c=this.required,a=this.min,o=this.max,s=this.step;return{id:this.safeId(),name:e,form:n,type:t,disabled:i,placeholder:r,required:c,autocomplete:this.autocomplete||null,readonly:this.readonly||this.plaintext,min:a,max:o,step:s,list:"password"!==t?this.list:null,"aria-required":c?"true":null,"aria-invalid":this.computedAriaInvalid}},computedListeners:function(){return g(g({},this.bvListeners),{},{input:this.onInput,change:this.onChange,blur:this.onBlur})}},watch:{noWheel:function(t){this.setWheelStopper(t)}},mounted:function(){this.setWheelStopper(this.noWheel)},deactivated:function(){this.setWheelStopper(!1)},activated:function(){this.setWheelStopper(this.noWheel)},beforeDestroy:function(){this.setWheelStopper(!1)},methods:{setWheelStopper:function(t){var e=this.$el;Object(s["c"])(t,e,"focus",this.onWheelFocus),Object(s["c"])(t,e,"blur",this.onWheelBlur),t||Object(s["a"])(document,"wheel",this.stopWheel)},onWheelFocus:function(){Object(s["b"])(document,"wheel",this.stopWheel)},onWheelBlur:function(){Object(s["a"])(document,"wheel",this.stopWheel)},stopWheel:function(t){Object(s["f"])(t,{propagation:!1}),Object(o["c"])(this.$el)}},render:function(t){return t("input",{class:this.computedClass,attrs:this.computedAttrs,domProps:{value:this.localValue},on:this.computedListeners,ref:"input"})}})},"7b13":function(t,e,n){t.exports=n.p+"img/coming-soon.cbe7222a.svg"},"8cd0":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"misc-wrapper"},[n("b-link",{staticClass:"brand-logo"},[n("vuexy-logo"),n("h2",{staticClass:"brand-text text-primary ml-1"},[t._v(" Vuexy ")])],1),n("div",{staticClass:"misc-inner p-2 p-sm-3"},[n("div",{staticClass:"w-100 text-center"},[n("h2",{staticClass:"mb-1"},[t._v(" We are launching soon 🚀 ")]),n("p",{staticClass:"mb-3"},[t._v(" We're creating something awesome. Please subscribe to get notified when it's ready! ")]),n("b-form",{staticClass:"row justify-content-center m-0 mb-2",attrs:{inline:""},on:{submit:function(t){t.preventDefault()}}},[n("b-form-input",{staticClass:"col-12 col-md-5 mb-1 mr-md-2",attrs:{id:"notify-email",type:"text",placeholder:"john@example.com"}}),n("b-button",{staticClass:"mb-1 btn-sm-block",attrs:{variant:"primary",type:"submit"}},[t._v(" Notify ")])],1),n("b-img",{attrs:{fluid:"",src:t.imgUrl,alt:"Coming soon page"}})],1)])],1)},r=[],c=n("aa59"),a=n("11de"),o=n("1947"),s=n("4797"),u=n("4918"),l=n("088b"),f=n("4360"),d={components:{VuexyLogo:l["a"],BLink:c["a"],BForm:a["a"],BButton:o["a"],BFormInput:s["a"],BImg:u["a"]},data:function(){return{downImg:n("7b13")}},computed:{imgUrl:function(){return"dark"===f["a"].state.appConfig.layout.skin?(this.downImg=n("c09f"),this.downImg):this.downImg}}},p=d,b=(n("134f"),n("2877")),h=Object(b["a"])(p,i,r,!1,null,null,null);e["default"]=h.exports},ad47:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return o}));var i=n("2b0e"),r=n("a723"),c=n("cf75"),a=Object(c["d"])({size:Object(c["c"])(r["u"])},"formControls"),o=i["default"].extend({props:a,computed:{sizeFormClass:function(){return[this.size?"form-control-".concat(this.size):null]}}})},c09f:function(t,e,n){t.exports=n.p+"img/coming-soon-dark.da4040a1.svg"},d520:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return s}));var i=n("2b0e"),r=n("a723"),c=n("7b1e"),a=n("cf75"),o=Object(a["d"])({state:Object(a["c"])(r["g"],null)},"formState"),s=i["default"].extend({props:o,computed:{computedState:function(){return Object(c["b"])(this.state)?this.state:null},stateClass:function(){var t=this.computedState;return!0===t?"is-valid":!1===t?"is-invalid":null},computedAriaInvalid:function(){var t=this.ariaInvalid;return!0===t||"true"===t||""===t||!1===this.computedState?"true":t}}})},dde7:function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return u}));var i=n("2b0e"),r=n("a723"),c=n("906c"),a=n("cf75"),o="input, textarea, select",s=Object(a["d"])({autofocus:Object(a["c"])(r["g"],!1),disabled:Object(a["c"])(r["g"],!1),form:Object(a["c"])(r["u"]),id:Object(a["c"])(r["u"]),name:Object(a["c"])(r["u"]),required:Object(a["c"])(r["g"],!1)},"formControls"),u=i["default"].extend({props:s,mounted:function(){this.handleAutofocus()},activated:function(){this.handleAutofocus()},methods:{handleAutofocus:function(){var t=this;this.$nextTick((function(){Object(c["B"])((function(){var e=t.$el;t.autofocus&&Object(c["u"])(e)&&(Object(c["v"])(e,o)||(e=Object(c["C"])(o,e)),Object(c["d"])(e))}))}))}}})}}]);
//# sourceMappingURL=chunk-0a5f9c80.c6174802.js.map