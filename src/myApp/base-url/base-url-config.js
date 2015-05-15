define(['angular', './base-url-module'], function (angular, app) {
	"use strict";
	app.config(function ($httpProvider) {
		$httpProvider.interceptors.push(function ($q, $rootElement) {
			var checked_app_template_root = false,
				app_template_root;

			return {
				'request': function (config) {
					if(!checked_app_template_root) {
						app_template_root = angular.element($rootElement).attr('data-template-root');
						app_template_root = app_template_root === undefined ? '' : app_template_root;
						checked_app_template_root = true;
					}
					config.url = config.url.replace(/(\:app_template_root)[\/?#:]|(\:app_template_root)$/, app_template_root);
					return config || $q.when(config);

				}

			};
		});
	});
});