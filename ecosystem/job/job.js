angular.module('orca').controller('JobCtrl',function($scope, job, Alerts, ExecuteJob){
	$scope.job = job;

	$scope.saveJob = function() { ExecuteJob.saveJob($scope.job.data); };

	$scope.updateJob = function() {
		if ($scope.job.data.dirty) {
			ExecuteJob.saveJob($scope.job.data, true).then(function(resp) { $scope.job = resp; });
		}
	};
});