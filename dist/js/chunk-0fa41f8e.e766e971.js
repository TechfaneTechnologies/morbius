(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fa41f8e"],{"2f73":function(t,e,n){},"895b":function(t,e,n){"use strict";n("2f73")},a15b:function(t,e,n){"use strict";n.d(e,"a",(function(){return w}));var l=n("b42e"),o=n("c637"),r=n("a723"),i=n("2326"),c=n("228e"),s=n("6c06"),a=n("b508"),u=n("d82f"),d=n("cf75"),p=n("fa73");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,l)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m=["start","end","center"],j=Object(a["a"])((function(t,e){return e=Object(p["h"])(Object(p["g"])(e)),e?Object(p["c"])(["row-cols",t,e].filter(s["a"]).join("-")):null})),q=Object(a["a"])((function(t){return Object(p["c"])(t.replace("cols",""))})),O=[],v=function(){var t=Object(c["b"])().reduce((function(t,e){return t[Object(d["g"])(e,"cols")]=Object(d["c"])(r["p"]),t}),Object(u["c"])(null));return O=Object(u["h"])(t),Object(d["d"])(Object(u["m"])(h(h({},t),{},{alignContent:Object(d["c"])(r["u"],null,(function(t){return Object(i["a"])(Object(i["b"])(m,"between","around","stretch"),t)})),alignH:Object(d["c"])(r["u"],null,(function(t){return Object(i["a"])(Object(i["b"])(m,"between","around"),t)})),alignV:Object(d["c"])(r["u"],null,(function(t){return Object(i["a"])(Object(i["b"])(m,"baseline","stretch"),t)})),noGutters:Object(d["c"])(r["g"],!1),tag:Object(d["c"])(r["u"],"div")})),o["Ob"])},w={name:o["Ob"],functional:!0,get props(){return delete this.props,this.props=v(),this.props},render:function(t,e){var n,o=e.props,r=e.data,i=e.children,c=o.alignV,s=o.alignH,a=o.alignContent,u=[];return O.forEach((function(t){var e=j(q(t),o[t]);e&&u.push(e)})),u.push((n={"no-gutters":o.noGutters},f(n,"align-items-".concat(c),c),f(n,"justify-content-".concat(s),s),f(n,"align-content-".concat(a),a),n)),t(o.tag,Object(l["a"])(r,{staticClass:"row",class:u}),i)}}},a395:function(t,e,n){"use strict";n.r(e);var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",[n("b-col",{attrs:{cols:"12"}},[n("quill-editor-snow"),n("quill-editor-bubble"),n("quill-editor-custom")],1)],1)},o=[],r=n("a15b"),i=n("b28b"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card-code",{attrs:{title:"Snow Editor"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeSnow)+" ")]},proxy:!0}])},[n("b-card-text",[t._v("Snow is a clean, flat toolbar theme")]),n("quill-editor",{attrs:{options:t.snowOption},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},s=[],a=n("d6e4"),u=n("541c"),d=n("953d"),p='\n<template>\n  <div>\n    <quill-editor\n      v-model="content"\n      :options="editorOption"\n    />\n  </div>\n</template>\n\n<script>\nimport { quillEditor } from \'vue-quill-editor\'\n\n// eslint-disable-next-line\nimport \'quill/dist/quill.core.css\'\n// eslint-disable-next-line\nimport \'quill/dist/quill.snow.css\'\n// eslint-disable-next-line\nimport \'quill/dist/quill.bubble.css\'\n\nexport default {\n  components: {\n    quillEditor,\n  },\n  data: () => ({\n    editorOption: {\n      theme: \'bubble\',\n    },\n    content: `<h2><span>Quill Rich Text Editor</span></h2><br />\n<p>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive <a href="http://quilljs.com/docs/api/">API</a>.</p><br />\n<iframe class="ql-video" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" width="560" height="238"></iframe>`,\n  }),\n}\n<\/script>\n',b='\n<template>\n  <quill-editor\n    v-model="content"\n    :options="snowOption"\n  />\n</template>\n\n<script>\n// eslint-disable-next-line\nimport \'quill/dist/quill.core.css\'\n// eslint-disable-next-line\nimport \'quill/dist/quill.snow.css\'\n// eslint-disable-next-line\nimport \'quill/dist/quill.bubble.css\'\n\nimport { quillEditor } from \'vue-quill-editor\'\n\nexport default {\n  components: {\n    quillEditor,\n  },\n  data: () => ({\n    content: `<h1>Quill Rich Text Editor</h1>\n  <p>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.</p>\n  <iframe class="ql-video" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" width="560" height="238"></iframe>\n  <p><br></p>\n  <h2>Getting Started is Easy</h2>\n  <p><br></p>\n  <pre>\n// &lt;link href="https://cdn.quilljs.com/1.0.5/quill.snow.css" rel="stylesheet"&gt;\n// &lt;script src="https://cdn.quilljs.com/1.0.5/quill.min.js" type="text/javascript"&gt;&lt;/script&gt;\n  var quill = new Quill(\'#editor\', {\n  modules: {\n  toolbar: \'#toolbar\'\n  },\n  theme: \'snow\'\n  });\n// Open your browser\'s developer console to try out the API!</pre>  `,\n  }),\n}\n<\/script>\n',h='\n<template>\n  <div>\n    <quill-editor\n      v-model="content"\n      :options="editorOption"\n      >\n      <div\n        id="toolbar"\n        slot="toolbar"\n      >\n        \x3c!-- Add a bold button --\x3e\n        <button class="ql-bold">\n          Bold\n        </button>\n        <button class="ql-italic">\n          Italic\n        </button>\n\n        \x3c!-- Add font size dropdown --\x3e\n        <select class="ql-size">\n          <option value="small" />\n          \x3c!-- Note a missing, thus falsy value, is used to reset to default --\x3e\n          <option selected />\n          <option value="large" />\n          <option value="huge" />\n        </select>\n\n        <select class="ql-font">\n          <option selected="selected" />\n          <option value="serif" />\n          <option value="monospace" />\n        </select>\n\n        \x3c!-- Add subscript and superscript buttons --\x3e\n        <button\n          class="ql-script"\n          value="sub"\n        />\n        <button\n          class="ql-script"\n          value="super"\n        />\n\n        \x3c!-- You can also add your own --\x3e\n        <button\n          style="width:auto"\n          @click="customButtonClick"\n        >\n          Click here\n        </button>\n      </div>\n    </quill-editor>\n  </div>\n</template>\n\n<script>\n// eslint-disable-next-line\nimport \'quill/dist/quill.core.css\'\n// eslint-disable-next-line\nimport \'quill/dist/quill.snow.css\'\n// eslint-disable-next-line\nimport \'quill/dist/quill.bubble.css\'\nimport { quillEditor } from \'vue-quill-editor\'\n\nexport default {\n  components: {\n    quillEditor,\n  },\n  data: () => ({\n    editorOption: {\n      modules: {\n        toolbar: \'#toolbar\',\n      },\n    },\n    content: `<h2><span class="ql-font-serif">Quill Rich Text Editor</span></h2><br />\n<p>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.</p><br />\n<iframe class="ql-video" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" width="560" height="238"></iframe>`,\n  }),\n  methods: {\n    customButtonClick() {\n      alert(\'Button clicked!\')\n    },\n  },\n}\n<\/script>\n',f={components:{quillEditor:d["quillEditor"],BCardCode:u["a"],BCardText:a["a"]},data:function(){return{codeSnow:b,snowOption:{theme:"snow"},content:'<h1 class="ql-align-center">Quill Rich Text Editor</h1>\n                    <p class="card-text"><br /></p>\n                    <p class="card-text">\n                      Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built\n                      for the modern web. With its\n                      <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive\n                      <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.\n                    </p>\n                    <p class="card-text"><br /></p>\n                    <iframe\n                      class="ql-video ql-align-center"\n                      src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0"\n                      width="560"\n                      height="238"\n                    ></iframe>\n                    <p class="card-text"><br /></p>\n                    <p class="card-text"><br /></p>\n                    <h2 class="ql-align-center">Getting Started is Easy</h2>\n                    <p class="card-text"><br /></p>\n                    <pre>\n// &lt;link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"&gt;\n// &lt;script src="https://cdn.quilljs.com/1.3.6/quill.min.js" type="text/javascript"&gt;&lt;/script&gt;\nvar quill = new Quill(\'#editor\', {\n    modules: {\n        toolbar: \'#toolbar\'\n    },\n    theme: \'snow\'\n});\n// Open your browser\'s developer console to try out the API!</pre>'}}},m=f,j=n("2877"),q=Object(j["a"])(m,c,s,!1,null,null,null),O=q.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card-code",{attrs:{title:"Bubble Editor"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeBubble)+" ")]},proxy:!0}])},[n("b-card-text",[t._v("Bubble is a simple tooltip based theme.")]),n("quill-editor",{attrs:{options:t.editorOption},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},w=[],g={components:{quillEditor:d["quillEditor"],BCardCode:u["a"],BCardText:a["a"]},data:function(){return{codeBubble:p,editorOption:{theme:"bubble",syntax:!1,modules:{toolbar:[["bold","italic"],[{header:[1,2,3,4,5,6,!1]}],["link","image"]]}},content:'<h1 class="ql-align-center">Quill Rich Text Editor</h1>\n                    <p class="card-text"><br /></p>\n                    <p class="card-text">\n                      Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built\n                      for the modern web. With its\n                      <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive\n                      <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.\n                    </p>\n                    <p class="card-text"><br /></p>\n                    <iframe\n                      class="ql-video ql-align-center"\n                      src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0"\n                      width="560"\n                      height="238"\n                    ></iframe>\n                    <p class="card-text"><br /></p>\n                    <p class="card-text"><br /></p>\n                    <h2 class="ql-align-center">Getting Started is Easy</h2>\n                    <p class="card-text"><br /></p>\n                    <pre>\n// &lt;link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"&gt;\n// &lt;script src="https://cdn.quilljs.com/1.3.6/quill.min.js" type="text/javascript"&gt;&lt;/script&gt;\nvar quill = new Quill(\'#editor\', {\n    modules: {\n        toolbar: \'#toolbar\'\n    },\n    theme: \'bubble\'\n});\n// Open your browser\'s developer console to try out the API!</pre>'}}},x=g,y=Object(j["a"])(x,v,w,!1,null,null,null),E=y.exports,C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card-code",{attrs:{title:"Custom Toolbar"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeCustom)+" ")]},proxy:!0}])},[n("b-card-text",[t._v("You have freedom to create your own custom toolbar")]),n("quill-editor",{attrs:{options:t.editorOption},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[n("div",{attrs:{slot:"toolbar",id:"toolbar"},slot:"toolbar"},[n("button",{staticClass:"ql-bold"},[t._v(" Bold ")]),n("button",{staticClass:"ql-italic"},[t._v(" Italic ")]),n("select",{staticClass:"ql-size"},[n("option",{attrs:{value:"small"}}),n("option",{attrs:{selected:""}}),n("option",{attrs:{value:"large"}}),n("option",{attrs:{value:"huge"}})]),n("select",{staticClass:"ql-font"},[n("option",{attrs:{selected:"selected"}}),n("option",{attrs:{value:"serif"}}),n("option",{attrs:{value:"monospace"}})]),n("button",{staticClass:"ql-script",attrs:{value:"sub"}}),n("button",{staticClass:"ql-script",attrs:{value:"super"}}),n("button",{staticClass:"w-auto btn btn-primary",on:{click:t.customButtonClick}},[t._v(" Click here ")])])])],1)},S=[],P={components:{quillEditor:d["quillEditor"],BCardCode:u["a"],BCardText:a["a"]},data:function(){return{codeCustom:h,editorOption:{modules:{toolbar:"#toolbar"}},content:'<h1 class="ql-align-center">Quill Rich Text Editor</h1>\n                    <p class="card-text"><br /></p>\n                    <p class="card-text">\n                      Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built\n                      for the modern web. With its\n                      <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive\n                      <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.\n                    </p>\n                    <p class="card-text"><br /></p>\n                    <iframe\n                      class="ql-video ql-align-center"\n                      src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0"\n                      width="560"\n                      height="238"\n                    ></iframe>\n                    <p class="card-text"><br /></p>\n                    <p class="card-text"><br /></p>\n                    <h2 class="ql-align-center">Getting Started is Easy</h2>\n                    <p class="card-text"><br /></p>\n                    <pre>\n// &lt;link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"&gt;\n// &lt;script src="https://cdn.quilljs.com/1.3.6/quill.min.js" type="text/javascript"&gt;&lt;/script&gt;\nvar quill = new Quill(\'#editor\', {\n    modules: {\n        toolbar: \'#toolbar\'\n    },\n    theme: \'snow\'\n});\n// Open your browser\'s developer console to try out the API!</pre>'}},methods:{customButtonClick:function(){alert("Button clicked!")}}},B=P,k=Object(j["a"])(B,C,S,!1,null,null,null),Q=k.exports,_={components:{BRow:r["a"],BCol:i["a"],QuillEditorSnow:O,QuillEditorBubble:E,QuillEditorCustom:Q}},I=_,W=(n("895b"),Object(j["a"])(I,l,o,!1,null,null,null));e["default"]=W.exports},b28b:function(t,e,n){"use strict";n.d(e,"a",(function(){return x}));var l=n("b42e"),o=n("c637"),r=n("a723"),i=n("992e"),c=n("2326"),s=n("228e"),a=n("6c06"),u=n("7b1e"),d=n("b508"),p=n("d82f"),b=n("cf75"),h=n("fa73");function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,l)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){j(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var q=["auto","start","end","center","baseline","stretch"],O=function(t,e,n){var l=t;if(!Object(u["p"])(n)&&!1!==n)return e&&(l+="-".concat(e)),"col"!==t||""!==n&&!0!==n?(l+="-".concat(n),Object(h["c"])(l)):Object(h["c"])(l)},v=Object(d["a"])(O),w=Object(p["c"])(null),g=function(){var t=Object(s["b"])().filter(a["a"]),e=t.reduce((function(t,e){return t[e]=Object(b["c"])(r["i"]),t}),Object(p["c"])(null)),n=t.reduce((function(t,e){return t[Object(b["g"])(e,"offset")]=Object(b["c"])(r["p"]),t}),Object(p["c"])(null)),l=t.reduce((function(t,e){return t[Object(b["g"])(e,"order")]=Object(b["c"])(r["p"]),t}),Object(p["c"])(null));return w=Object(p["a"])(Object(p["c"])(null),{col:Object(p["h"])(e),offset:Object(p["h"])(n),order:Object(p["h"])(l)}),Object(b["d"])(Object(p["m"])(m(m(m(m({},e),n),l),{},{alignSelf:Object(b["c"])(r["u"],null,(function(t){return Object(c["a"])(q,t)})),col:Object(b["c"])(r["g"],!1),cols:Object(b["c"])(r["p"]),offset:Object(b["c"])(r["p"]),order:Object(b["c"])(r["p"]),tag:Object(b["c"])(r["u"],"div")})),o["y"])},x={name:o["y"],functional:!0,get props(){return delete this.props,this.props=g()},render:function(t,e){var n,o=e.props,r=e.data,c=e.children,s=o.cols,a=o.offset,u=o.order,d=o.alignSelf,p=[];for(var b in w)for(var h=w[b],f=0;f<h.length;f++){var m=v(b,h[f].replace(b,""),o[h[f]]);m&&p.push(m)}var q=p.some((function(t){return i["e"].test(t)}));return p.push((n={col:o.col||!q&&!s},j(n,"col-".concat(s),s),j(n,"offset-".concat(a),a),j(n,"order-".concat(u),u),j(n,"align-self-".concat(d),d),n)),t(o.tag,Object(l["a"])(r,{class:p}),c)}}},d6e4:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var l=n("2b0e"),o=n("b42e"),r=n("c637"),i=n("a723"),c=n("cf75"),s=Object(c["d"])({textTag:Object(c["c"])(i["u"],"p")},r["u"]),a=l["default"].extend({name:r["u"],functional:!0,props:s,render:function(t,e){var n=e.props,l=e.data,r=e.children;return t(n.textTag,Object(o["a"])(l,{staticClass:"card-text"}),r)}})}}]);
//# sourceMappingURL=chunk-0fa41f8e.e766e971.js.map