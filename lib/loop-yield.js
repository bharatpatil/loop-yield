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
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function (opts) {
	
	    var options = {
	        totalItems: 1000,
	        chunkSize: 100,
	        yieldTime: 10,
	        beforeIterator: function beforeIterator() {},
	        iterator: function iterator(index) {},
	        afterIterator: function afterIterator() {},
	        iterationDone: function iterationDone() {}
	    };
	
	    var iteratorCount = 0;
	
	    var setOptions = function setOptions(opts) {
	        if (opts) {
	            for (var key in options) {
	                if (options.hasOwnProperty(key)) {
	                    if (opts[key]) {
	                        options[key] = opts[key];
	                    }
	                }
	            }
	        }
	        iteratorCount = 0;
	        return this;
	    };
	
	    setOptions(opts);
	
	    var internalIterator = function internalIterator() {
	        var j = iteratorCount;
	        var len = iteratorCount + options.chunkSize;
	        if (len > options.totalItems) {
	            len = iteratorCount + (options.totalItems - iteratorCount);
	        };
	
	        if (options.beforeIterator) {
	            options.beforeIterator();
	        }
	        while (j < len) {
	            options.iterator(j);
	            j++;
	        }
	        if (options.afterIterator) {
	            options.afterIterator();
	        }
	        iteratorCount = j;
	
	        if (iteratorCount === options.totalItems) {
	            options.iterationDone();
	            return;
	        }
	
	        setTimeout(function () {
	            internalIterator();
	        }, options.yieldTime);
	    };
	
	    this.loadBalancer = function () {
	        internalIterator();
	    };
	};

/***/ })
/******/ ])
});
;
//# sourceMappingURL=loop-yield.js.map