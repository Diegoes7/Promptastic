"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@whatwg-node";
exports.ids = ["vendor-chunks/@whatwg-node"];
exports.modules = {

/***/ "(rsc)/./node_modules/@whatwg-node/events/esm/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@whatwg-node/events/esm/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomEvent: () => (/* binding */ CustomEvent)\n/* harmony export */ });\nconst CustomEvent = globalThis.CustomEvent ||\n    class PonyfillCustomEvent extends Event {\n        detail = null;\n        constructor(type, eventInitDict) {\n            super(type, eventInitDict);\n            if (eventInitDict?.detail != null) {\n                this.detail = eventInitDict.detail;\n            }\n        }\n        initCustomEvent(type, bubbles, cancelable, detail) {\n            this.initEvent(type, bubbles, cancelable);\n            if (detail != null) {\n                this.detail = detail;\n            }\n        }\n    };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHdoYXR3Zy1ub2RlL2V2ZW50cy9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbXB0YXN0aWNfc2dkLy4vbm9kZV9tb2R1bGVzL0B3aGF0d2ctbm9kZS9ldmVudHMvZXNtL2luZGV4LmpzP2ZiNWIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEN1c3RvbUV2ZW50ID0gZ2xvYmFsVGhpcy5DdXN0b21FdmVudCB8fFxuICAgIGNsYXNzIFBvbnlmaWxsQ3VzdG9tRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gICAgICAgIGRldGFpbCA9IG51bGw7XG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGUsIGV2ZW50SW5pdERpY3QpIHtcbiAgICAgICAgICAgIHN1cGVyKHR5cGUsIGV2ZW50SW5pdERpY3QpO1xuICAgICAgICAgICAgaWYgKGV2ZW50SW5pdERpY3Q/LmRldGFpbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWwgPSBldmVudEluaXREaWN0LmRldGFpbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbml0Q3VzdG9tRXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGV0YWlsKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRFdmVudCh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlKTtcbiAgICAgICAgICAgIGlmIChkZXRhaWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsID0gZGV0YWlsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@whatwg-node/events/esm/index.js\n");

/***/ })

};
;