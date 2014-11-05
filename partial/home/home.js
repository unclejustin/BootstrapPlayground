angular.module('BootstrapPlayground').controller('HomeCtrl', function ($scope) {
	$scope.addData = function () {
		$scope.configdata = $scope.configdata || { data:[] };
		$scope.configdata.data.push({edit:true, data:[], keydata:[]});
	};

	$scope.configdata = {};
	$scope.clipboard = {};

	$scope.$on('copy to clipboard', function(evt, leaf) { leaf.dirty = true; $scope.clipboard = leaf; });
	$scope.$on('clear clipboard', function() { $scope.clipboard = {}; });
	$scope.$watch('clipboard', function() { $scope.$broadcast('clipboard updated', $scope.clipboard); });

	//$scope.configdata = {data:[]};

	$.getJSON('configdata.json', function(data) {
		$scope.configdata = data;
	});
});