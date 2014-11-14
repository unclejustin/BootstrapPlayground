angular.module('orca', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ngResource', 'ng-context-menu', 'focusOn']);

angular.module('orca').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html'
    });
    $stateProvider.state('job', {
        url: '/job/:id',
        templateUrl: 'ecosystem/job/job.html',
	    controller:'JobCtrl',
	    resolve:{
		    job:function ($stateParams, ExecuteJob) {
			    return ExecuteJob.getJob({id:$stateParams.id});
		    }
	    }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/job');

});

angular.module('orca').run(function($rootScope) {

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