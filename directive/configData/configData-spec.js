var data = {
	"track_id": "1",
	"provider_version_id": "3",
	"path": "Config IIS and Features",
	"depth": 0,
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

	var scope, elem, html;
	html = '<config-data configdata="configdata"></config-data>';

	beforeEach(inject(function ($rootScope, $compile) {
		elem = angular.element(html);
		scope = $rootScope.$new();
		scope.configdata = angular.copy(data);
		$compile(elem)(scope);
		scope.$digest();
	}));

	it('should display the data', function () {
		var wrappers = elem.find('.cd-wrapper');

		expect(wrappers.length).toBeGreaterThan(0);
	});
});

describe('Controller: ConfigDataCtrl', function () {
	var $rootScope, scope, ctrl;

	var new_data = {path:'New Path', edit:true, data:[], keydata:[]};
	var empty_data = {add:true, change:'add', data:[], keydata:[]};

	var new_key = {edit:true, name:'New Key', value:'New Value'};
	var empty_key = {add:true, change:'add', name:'', value:''};

	beforeEach(function () {
		module('BootstrapPlayground');

		inject(function (_$rootScope_, $controller) {
			$rootScope = _$rootScope_;
			scope = $rootScope.$new();
			ctrl = $controller('ConfigDataCtrl', {
				$scope:scope
			});
		});

		scope.configdata = angular.copy(data);
	});

	it('should update the local clipboard when clipboard updated is fired', function () {
		spyOn(scope, '$on');
		$rootScope.$broadcast('clipboard updated', {});
		expect(scope.clipboard).toEqual({});
	});

	describe('Data functions', function () {
		it('should have data', function () {
			expect(scope.configdata).toEqual(data);
		});

		describe('addData', function () {
			it('should add data', function () {
				scope.addData(scope.configdata);
				expect(_.isUndefined(_.find(scope.configdata.data, function (d) { return _.isEqual(d, empty_data); }))).toBe(false);

				scope.addData(scope.configdata, new_data);
				expect(scope.configdata.data).toContain(new_data);
			});
		});

		describe('delData', function () {
			it('should delete data', function () {
				scope.delData(new_data);
				expect(scope.configdata.data).not.toContain(new_data);
			});

			it('should not alter branch if leaf is not found', function () {
				var tmp_branch = angular.copy(scope.configdata.data);
				scope.delData({some:'fake object'});
				expect(tmp_branch).toEqual(scope.configdata.data);
			});
		});
	});

	describe('Clipboard functions', function () {
		beforeEach(function() {
			scope.configdata = angular.copy(data);
		});

		describe('copyData', function () {
			it('emit a notice to the clipboard', function () {
				spyOn(scope, '$emit');
				scope.copyData(scope.configdata.data[0].data[0]);
				expect(scope.$emit).toHaveBeenCalledWith('copy to clipboard', jasmine.any(Object), 'data');
			});
		});

		describe('cutData', function () {
			it('should remove the item from the collection', function () {
				var datalength = scope.configdata.data.length;

				scope.cutData(scope.configdata.data[0]);
				expect(scope.configdata.data.length).toBeLessThan(datalength);
			});

			it('emit a notice to the clipboard', function () {
				spyOn(scope, '$emit');
				scope.cutData(scope.configdata.data[0]);
				expect(scope.$emit).toHaveBeenCalledWith('copy to clipboard', jasmine.any(Object),'data');
			});
		});

		describe('pasteData', function () {
			var leaf, branch_count;

			beforeEach(function() {
				scope.clipboard = leaf = angular.copy(scope.configdata.data[0].data[0]);
				scope.clipboard.type = 'data';
				scope.cutData(scope.configdata.data[0].data[0]);
				branch_count = scope.configdata.data.length + 1;
			});

			it('should add the clipboard to the given array before the target', function () {
				scope.pasteData(scope.configdata.data[0], 0);
				expect(scope.configdata.data[0]).toEqual(leaf);
				expect(branch_count).toEqual(scope.configdata.data.length);
			});

			it('should add the clipboard to the given array after the target', function () {
				scope.pasteData(scope.configdata.data[0], 1);
				expect(scope.configdata.data[1]).toEqual(leaf);
				expect(branch_count).toEqual(scope.configdata.data.length);
			});

			it('should add the clipboard to the given array in the target', function () {
				branch_count = scope.configdata.data[0].data.length + 1;
				scope.pasteData(scope.configdata.data[0], -1);
				expect(scope.configdata.data[0].data).toContain(leaf);
				expect(branch_count).toEqual(scope.configdata.data[0].data.length);
			});

			it('should emit a "clear clipboard" to clear the clipboard', function () {
				spyOn(scope, '$emit');
				scope.pasteData(scope.configdata.data[0], 0);
				expect(scope.$emit).toHaveBeenCalledWith('clear clipboard');
			});
		});
	});

	describe('Key functions', function () {
		it('should add a key', function () {
			scope.addKey(scope.configdata);
			expect(_.find(scope.configdata.keydata, function (k) { return _.isEqual(k, empty_key); })).not.toBeUndefined();

			scope.addKey(scope.configdata, new_key);
			expect(scope.configdata.keydata).toContain(new_key);
		});
	});
});