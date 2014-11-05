describe('configKey', function () {

	beforeEach(module('BootstrapPlayground'));

	var scope, ctrl, new_key;

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('ConfigKeyCtrl', {
			$scope:scope
		});
		new_key = { edit:true };
	}));

	it('should change key.edit to false and flag key as dirty', function () {
		scope.key = angular.copy(new_key);
		scope.saveKey();
		expect(scope.key.edit).toBe(false);
		expect(scope.key.dirty).toBe(true);
	});
});