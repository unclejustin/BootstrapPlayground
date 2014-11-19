angular.module('orca').controller('JobCtrl', function ($scope, $state, $stateParams, $urlRouter, job, Alerts, ExecuteJob) {
	$scope.job = job;
	$scope.jobtab = {};
	$scope.jobtab[$stateParams.state] = true;

	function setTab() {
		$scope.jobtab = {};
		$scope.jobtab[$stateParams.state] = true;
	}

	$scope.$on('$stateChangeStart', setTab());

	$scope.saveJob = function () { ExecuteJob.saveJob($scope.job.data); };

	$scope.updateJob = function (state) {
		if ($scope.job.data.dirty) {
			ExecuteJob.saveJob($scope.job.data, true).then(function (resp) { $scope.job = resp; });
		}

		if($stateParams.state !== state) {
			$state.go($state.current.name, { state:state });
		}
	};

	$scope.$on('copy to clipboard', function (evt, leaf, type) {
		leaf.change = 'add';
		leaf.dirty = true;
		leaf.type = type;
		$scope.clipboard = leaf;
	});
	$scope.$on('clear clipboard', function () {
		$scope.clipboard = {};
		$scope.job.dirty = true;
	});
	$scope.$on('job dirty', function () { $scope.job.data.dirty = true; });
	$scope.$on('job update', function () {
		$scope.job.data.dirty = true;
		$scope.updateJob();
	});
	$scope.$watch('clipboard', function () { $scope.$broadcast('clipboard updated', $scope.clipboard); });
});