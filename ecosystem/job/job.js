angular.module('orca').controller('JobCtrl',function($scope, job, Alerts, ExecuteJob){
	$scope.job = job;

	$scope.saveJob = function() { ExecuteJob.saveJob($scope.job.data); };

	$scope.updateJob = function() {
		if ($scope.job.data.dirty) {
			ExecuteJob.saveJob($scope.job.data, true).then(function(resp) { $scope.job = resp; });
		}
	};

	$scope.$on('copy to clipboard', function(evt, leaf, type) { leaf.change = 'add'; leaf.dirty = true; leaf.type = type; $scope.clipboard = leaf; });
	$scope.$on('clear clipboard', function() { $scope.clipboard = {}; $scope.job.dirty = true; });
	$scope.$on('job dirty', function() { $scope.job.data.dirty = true; });
	$scope.$on('job update', function() { $scope.job.data.dirty = true; $scope.updateJob(); });
	$scope.$watch('clipboard', function() { $scope.$broadcast('clipboard updated', $scope.clipboard); });
});