define([
		'angular',
		'angular-ui-router',
		'../base-url/base-url',
		'../ie-polyfills/ie-polyfills'
	],
	function (angular) {
		"use strict";
		return angular.module('myApp', ['ui.router', 'base-url', 'ie-polyfills']);
	});