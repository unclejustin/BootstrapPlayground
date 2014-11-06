angular.module('BootstrapPlayground').controller('HomeCtrl', function ($scope, Alerts) {
	$scope.configdata = {};
	$scope.clipboard = {};

	$scope.$on('copy to clipboard', function(evt, leaf, type) { leaf.dirty = true; leaf.type = type; $scope.clipboard = leaf; });
	$scope.$on('clear clipboard', function() { $scope.clipboard = {}; });
	$scope.$watch('clipboard', function() { $scope.$broadcast('clipboard updated', $scope.clipboard); });

	$scope.alerts = Alerts.getAlerts();
	$scope.closeAlert = function(index) { Alerts.closeAlert(index); };

	//$scope.configdata = {data:[]};

	$.getJSON('configdata.json', function(data) {
		$scope.configdata = data;
	});
});