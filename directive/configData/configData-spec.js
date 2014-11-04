var data = {
	"data":[
		{
			"path": "configuration",
			"guid": "54526cca47225",
			"depth":1,
			"data": [
				{
					"path": "configSections",
					"guid": "54526cca47244",
					"depth":2,
					"data": [
						{
							"path":   "section",
							"guid":   "54526cca47274",
							"depth":  3,
							"keydata":[
								{
									"name": "name",
									"value":"log4net",
									"norm": "[configuration(1)][configSections(1)][section(1)]name",
									"guid": "54526cca47282"
								},
								{
									"name": "type",
									"value":"log4net.Config.Log4NetConfigurationSectionHandler, log4net",
									"norm": "[configuration(1)][configSections(1)][section(1)]type",
									"guid": "54526cca472ca"
								},
								{
									"name": "requirePermission",
									"value":"false",
									"norm": "[configuration(1)][configSections(1)][section(1)]requirePermission",
									"guid": "54526cca47309"
								}
							]
						}
					]
				}
			]
		}
	]
};

describe('Directive: configData', function () {
	beforeEach(module('BootstrapPlayground'));

	// Load templates
	beforeEach(module('templates'));

	var scope, compile, elem, html;
	html = '<config-data data="data.data" showdata="true" clipboard="clipboard"></config-data>';

	beforeEach(inject(function ($rootScope, $compile) {
		elem = angular.element(html);
		scope = $rootScope.$new();
		scope.data = data;
		$compile(elem)(scope);
		scope.$digest();
	}));

	it('should display the data', function () {
		var wrappers = elem.find('.cd-wrapper');

		expect(wrappers.length).toBeGreaterThan(0);
	});
});

describe('Controller: ConfigDataCtrl', function () {
	var $scope, ctrl;

	var new_data = {path:'New Path', edit:true, data:[], keydata:[]};
	var empty_data = {edit:true, data:[], keydata:[]};

	var new_key = {edit:true, name:'New Key', value:'New Value'};
	var empty_key = {edit:true, name:'', value:''};

	beforeEach(function () {
		module('BootstrapPlayground');

		inject(function ($rootScope, $controller) {
			$scope = $rootScope.$new();
			ctrl = $controller('ConfigDataCtrl', {
				$scope:$scope
			});
		});

		$scope.data = data;
	});

	afterEach(function() {
		$scope.data = data;
	});

	describe('Data functions', function () {
		it('should have data', function () {
			expect($scope.data).toBe(data);
		});

		describe('addData', function () {
			it('should add data', function () {
				$scope.addData($scope.data);
				expect(_.isUndefined(_.find($scope.data.data, function (d) { return _.isEqual(d, empty_data); }))).toBe(false);

				$scope.addData($scope.data, new_data);
				expect($scope.data.data).toContain(new_data);
			});
		});

		describe('delData', function () {
			it('should delete data', function () {
				$scope.delData(new_data, $scope.data.data);
				expect($scope.data.data).not.toContain(new_data);
			});
		});

		describe('cloneData', function () {
			it('should clone data', function () {
				var leaf = $scope.data.data[0];
				$scope.cloneData(leaf, $scope.data.data);
				expect(_.where($scope.data.data, {guid:'54526cca47225'}).length).toBe(2);
			});
		});
	});

	describe('Clipboard functions', function () {
		describe('cutData', function () {
			it('should remove the item from the collection and emit a notice to the clipboard', function () {
				var datalength = $scope.data.data[0].data.length;
				spyOn($scope, '$emit');

				$scope.cutData($scope.data.data[0].data[0], $scope.data.data[0].data);
				expect($scope.data.data[0].data.length).toBeLessThan(datalength);
				expect($scope.$emit).toHaveBeenCalledWith('cut to clipboard', jasmine.any(Object));
			});
		});

		describe('pasteData', function () {
			var leaf;

			beforeEach(function() {
				leaf = $scope.data.data[0].data[0];
				$scope.cutData($scope.data.data[0].data[0], $scope.data.data[0].data);
			});

			afterEach(function() {
				$scope.data = data;
			});

			it('should add the clipboard to the given array before the target', function () {
				$scope.pasteData($scope.data.data[0], $scope.data.data, 0);
				expect($scope.data.data[0]).toBe(leaf);
			});

			xit('should add the clipboard to the given array after the target', function () {
				$scope.pasteData($scope.data.data[0], $scope.data.data, 0);
				expect($scope.data.data[0]).toBe(leaf);
			});

			it('should add the clipboard to the given array in the target', function () {
				$scope.pasteData($scope.data.data[0], $scope.data.data, -1);
				expect(false).toBe(true);
			});

			xit('should emit a notice to clear the clipboard', function () {
				$scope.pasteData($scope.data.data[0], $scope.data.data, 0);
				expect($scope.$emit).toHaveBeenCalledWith('clear clipboard', jasmine.any(Object));
			});

			xit('should update the local clipboard after the parent clipboard is cleared', function () {
				$scope.pasteData($scope.data.data[0], $scope.data.data, 0);
				expect($scope.clipboard).toBe({});
			});
		});
	});

	describe('Key functions', function () {
		it('should add a key', function () {
			$scope.addKey($scope.data);
			expect(_.isUndefined(_.find($scope.data.keydata, function (k) { return _.isEqual(k, empty_key); }))).toBe(false);

			$scope.addKey($scope.data, new_key);
			expect(_.contains($scope.data.keydata, new_key)).toBe(true);
		});
	});
});