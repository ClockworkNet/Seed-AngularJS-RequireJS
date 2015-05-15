define([
	'angular',
	'./app-module',
	'./app-routes'
], function(angular, app){
	return {
		run: function( element ){
			angular.element(document).ready(function() {
				angular.bootstrap(element, ['myApp']);
			});
		}
	}
});