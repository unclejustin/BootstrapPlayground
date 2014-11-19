angular.module('orca', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ngResource', 'ng-context-menu', 'focusOn', 'xeditable']);

angular.module('orca').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html'
    });
    $stateProvider.state('job', {
        url: '/job/:id',
	    abstract:true,
	    template: '<div ui-view></div>',
	    resolve:{
		    job:function ($stateParams, ExecuteJob) {
			    return ExecuteJob.getJob({id:$stateParams.id});
		    }
	    }
    });
	$stateProvider.state('job.state', {
		url:'/:state',
		controller:'JobCtrl',
		templateUrl: 'ecosystem/job/job.html'
	});
    /* Add New States Above */
    $urlRouterProvider.otherwise('/job/720/activities');

});

angular.module('orca').run(function($rootScope, editableOptions) {

	editableOptions.theme = 'bs3';

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('orca').config(
	function ($httpProvider) {

		var authRequest = function () {
			return {
				'request':function (config) {
					if(config.url.indexOf('.html') > -1 || config.url.indexOf('template') > -1 || config.url.indexOf('bootstrap') > -1) {
						return config;
					}
					config.params = config.params || {};

					config.params.authtoken = '54651b0d9a69a:default';
					return config;
				}
			};
		};
		$httpProvider.interceptors.push(authRequest);
	}
);