(function(){
    'use strict';
		angular.module('MLGCLPortal').config([
		'$stateProvider',
		'$urlRouterProvider',
		'$qProvider',
		function(
		$stateProvider,
		$urlRouterProvider,
		$qProvider
		) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get('$state');
			return $state.go('dashboard');
		});

		$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			controller : 'dashboardController',
			controllerAs : 'dashboard',
			templateUrl: 'assets/app/template/dashboard.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'login/index.html'
		});

		$qProvider.errorOnUnhandledRejections(false);
		}
		])
})();