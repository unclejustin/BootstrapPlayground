describe('Filter: arrayMod', function() {

	beforeEach(module('orca'));

	it('should return a single element array if passed in a non number', inject(function($filter) {
        var filter = $filter('arrayMod');
		expect(filter('input')).toEqual([0]);
	}));

	it('should return an array equal to the size of the input, but at least 1', inject(function($filter) {
		var filter = $filter('arrayMod');
		expect(filter(-1).length).toEqual(1);
		expect(filter(0).length).toEqual(1);
		expect(filter(1).length).toEqual(1);
		expect(filter(2).length).toEqual(2);
	}));

});