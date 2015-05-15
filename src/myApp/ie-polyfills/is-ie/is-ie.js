define(['./../ie-polyfills-module'], function (app) {
	"use strict";
	app.provider('isIE', function isIEProvider() {
		// (edited) from: https://gist.github.com/paulirish/357741
		// EnhanceJS isIE test idea

		// Detect IE and version number through injected conditional comments (no UA detect, no need for cond. compilation / jscript check)

		// Version arg is for IE version (optional)
		// Comparison arg supports 'lte', 'gte', etc (optional)

		// Examples:

		// app.config
		// app.config(['isIEProvider'], function(isIEProvider) {})
		// if(isIEProvider.test(9, 'lte')){ }else { }

		// directives, controllers, etc.
		// app.controller(‘ExampleController’, [‘isIE’], function(isIE) {})
		//if(isIE.test(9, 'lte')){ }else { }

		var cache = {};

		this.test = function (version, comparison) {
			if(cache[comparison + version] !== undefined) {
				return cache[comparison + version];
			}

			var cc      = 'IE',
				b       = document.createElement('B'),
				docElem = document.documentElement,
				isIE;

			if(version){
				cc += ' ' + version;
				if(comparison){ cc = comparison + ' ' + cc; }
			}

			b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
			docElem.appendChild(b);
			isIE = !!document.getElementById('iecctest');
			docElem.removeChild(b);
			cache[comparison + version] = isIE;
			return isIE;
		};

		this.$get = function(){
			return new isIEProvider();
		};
	});
});