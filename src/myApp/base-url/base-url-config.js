define(['require', 'angular', './base-url-module'], function (require, angular, app) {
	"use strict";
	app.config(function ($httpProvider) {
		$httpProvider.interceptors.push(function ($q, $rootElement) {
			var app_template_root = require.toUrl('../');
			return {
				'request': function (config) {
					config.url = config.url.replace(/(\:app_template_root)[\/?#:]|(\:app_template_root)$/, app_template_root);
					return config || $q.when(config);

				}

			};
		});
	});
});