define([
		'./app-module',
		'./states/state-x/state-x'
	],
	function (app) {
		"use strict";

		app.config(function ($stateProvider) {
			$stateProvider
				.state('state-x', {
					url  : '',
					views: {
						"main": {
							templateUrl: ':app_template_root/app/states/state-x/state-x.html',
							controller : 'StateXController'
						}
					}
				});

		});
	}
);