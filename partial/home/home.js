angular.module('orca').controller('HomeCtrl', function ($scope, Alerts, Servers) {
	$scope.configdata = {};
	$scope.clipboard = {};

	$scope.$on('copy to clipboard', function(evt, leaf, type) { leaf.change = 'add'; leaf.dirty = true; leaf.type = type; $scope.clipboard = leaf; });
	$scope.$on('clear clipboard', function() { $scope.clipboard = {}; });
	$scope.$watch('clipboard', function() { $scope.$broadcast('clipboard updated', $scope.clipboard); });

	$scope.alerts = Alerts.getAlerts();
	$scope.closeAlert = function(index) { Alerts.closeAlert(index); };

	Servers.getConfig({id:1}).then(function(resp) {
		$scope.configdata.data = resp.data;
	});
});