describe('JobCtrl', function() {

	beforeEach(module('orca'));

	var scope,ctrl,job = {};

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('JobCtrl', {$scope: scope, job:job});
    }));	

	it('should ...', inject(function() {

		expect(1).toEqual(1);
		
	}));

});