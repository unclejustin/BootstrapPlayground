describe('HomeCtrl', function () {
	var $scope, ctrl, $rootScope, leaf = {name:'leaf'};

	beforeEach(function () {
		module('BootstrapPlayground');

		inject(function (_$rootScope_, $controller) {
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			ctrl = $controller('HomeCtrl', { $scope:$scope });
		});
	});

	it('should set clipboard to leaf', function () {
		spyOn($scope, '$on');
		$rootScope.$broadcast('cut to clipboard', leaf);
		expect($scope.clipboard).toEqual(leaf);
	});

	it('should clear the clipboard', function () {
		spyOn($scope, '$on');
		$rootScope.$broadcast('clear clipboard');
		expect($scope.clipboard).toEqual({});
	});

	it('should broadcast updates to the clipboard', function () {
		spyOn($scope, '$watch');
		spyOn($scope, '$broadcast');
		$scope.clipboard = leaf;
		$scope.$digest();

		expect($scope.$broadcast).toHaveBeenCalled();
	});

});