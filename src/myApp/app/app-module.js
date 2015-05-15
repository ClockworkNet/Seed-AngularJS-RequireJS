define([
		'angular',
		'angular-ui-router',
		'../base-url/base-url'
	],
	function (angular) {
		"use strict";
		return angular.module('myApp', ['ui.router', 'base-url']);
	});