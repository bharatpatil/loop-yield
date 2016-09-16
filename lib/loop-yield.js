(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("loop-yield", [], factory);
	else if(typeof exports === 'object')
		exports["loop-yield"] = factory();
	else
		root["loop-yield"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (opts) {
	
	    const options = {
	        totalItems: 1000,
	        chunks: 100,
	        yieldTime: 10,
	        iterator: index => {},
	        iterationDone: () => {}
	    };
	
	    let arrTotalChuncks = [];
	    let chunckCount = 0;
	    let iteratorCount = 0;
	
	    this.setOptions = function (opts) {
	        if (opts) {
	            for (const key in options) {
	                if (options.hasOwnProperty(key)) {
	                    if (opts[key]) {
	                        options[key] = opts[key];
	                    }
	                }
	            }
	        }
	
	        arrTotalChuncks = [];
	        chunckCount = 0;
	        iteratorCount = 0;
	
	        for (let j = 0, len = options.chunks; j < len; j++) {
	            arrTotalChuncks[j] = Math.floor(options.totalItems / options.chunks);
	        }
	        for (let j = 0, len = options.totalItems % options.chunks; j < len; j++) {
	            arrTotalChuncks[j] += 1;
	        }
	    };
	
	    this.setOptions(opts);
	
	    this.loadBalancer = function () {
	        let j = iteratorCount;
	        const len = iteratorCount + arrTotalChuncks[chunckCount];
	        while (j < len) {
	            options.iterator(j);
	            j++;
	        }
	
	        chunckCount++;
	        iteratorCount = j;
	
	        if (iteratorCount === options.totalItems) {
	            options.iterationDone();
	            return;
	        }
	
	        let that = this;
	        setTimeout(function () {
	            that.loadBalancer.apply(that);
	        }, options.yieldTime);
	    };
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=loop-yield.js.map