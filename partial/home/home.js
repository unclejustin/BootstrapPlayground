angular.module('BootstrapPlayground').controller('HomeCtrl', function ($scope) {
	function move(arr, fromIndex, toIndex) {
		arr.splice(fromIndex + 1, 0, arr.splice(toIndex, 1)[0]);
	}

	$scope.toggle = function(show, root) {
		root = root || $scope.configdata;

		root.showdata = show;

		_.each(root.data, function(d) {
			$scope.toggle(show, d);
		});
	};

	$scope.addData = function (d) {
		d.data.push({edit:true, data:[], keydata:[]});
	};

	$scope.configdata = {};
	$scope.clipboard = {};

	$scope.$on('cut to clipboard', function(evt, leaf) { $scope.clipboard = leaf; });
	$scope.$on('clear clipboard', function() { $scope.clipboard = {}; });
	$scope.$watch('clipboard', function() { $scope.$broadcast('clipboard updated', $scope.clipboard); });

	//$scope.configdata = {data:[]};

	$.getJSON('configdata.json', function(data) {
		$scope.configdata = data;
	});
});