angular.module('BootstrapPlayground').directive('configKey', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			key:'=',
			data:'='
		},
		templateUrl: 'directive/configKey/configKey.html',
		link: function(scope, element, attrs, fn) {

		},
		controller: function($scope) {
			$scope.delKey = function (leaf, branch) {
				var index = branch.indexOf(leaf);
				if (index!==-1) {
					branch.splice(index, 1);
				}
			};

			$scope.cloneKey = function (leaf, branch) {
				branch.push(angular.copy(leaf));
			};
		}
	};
});
