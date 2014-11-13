describe('HomeCtrl', function () {
	var $scope, ctrl, $rootScope, data, leaf = {name:'leaf'};

	$.getJSON('configdata.json', function(d) {
		data = d;
	});

	beforeEach(function () {
		module('BootstrapPlayground');

		inject(function (_$rootScope_, $controller, $httpBackend) {
			$httpBackend.when('POST', 'http://localhost:8888/index.php/servers/getConfig.json?authtoken=54526cae3966c:default').respond(data);

			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			ctrl = $controller('HomeCtrl', { $scope:$scope });
		});
	});

	it('should set clipboard to leaf', function () {
		spyOn($scope, '$on');
		$rootScope.$broadcast('copy to clipboard', leaf);
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