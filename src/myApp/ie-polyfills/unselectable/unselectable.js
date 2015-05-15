define(['./../ie-polyfills-module'], function (app) {
	"use strict";
	app.directive('unselectable', function (isIE) {
		// Description: Makes elements and children unselectable in IE8 & 9
		return {
			restrict: 'A',
			link    : function ($scope, element, attrs, ngModel) {
				if (isIE(9, 'lte')) {
					element.on('selectstart', false);
				}
				// For everything else see CSS rule [unselectable]
				// used this attr unselectable="on" because that's the IE standard, though it doesn't inherit which is why this is needed.
				// Didn't make sense to have a CSS class AND and attribute required.
			}
		};
	});
});