angular.module('orca').directive('orcaSearch', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			search:'='
		},
		templateUrl: 'directive/orcaSearch/orcaSearch.html',
		controller: function($scope, $timeout) {
			// This prevents the search box from dirtying the parent form
			$timeout(function() {
				if ($scope.searchForm.searchBox) {
					$scope.searchForm.searchBox.$pristine = false;
				}
			}, 100);
		}
	};
});