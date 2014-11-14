describe('Directive: configKey', function () {
	var data = [
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
	];

	beforeEach(module('BootstrapPlayground'));
	beforeEach(module('ngMockE2E'));

	var scope, ctrl, new_key;

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('ConfigKeyCtrl', {
			$scope:scope
		});
		new_key = { edit:true };
		scope.data = angular.copy(data);
	}));

	describe('Directive', function () {
		var html, elem, directive, compiled;
		var key = { name:'name', value:'value', new_name:'new name', new_value:'new value', guid:'1234565789' };

		beforeEach(function() {

			scope.key = angular.copy(key);
			scope.data = angular.copy(data);
			html = '<config-key key="key" data="data"></config-key>';
			inject(function($compile) {
				elem = angular.element(html);
				compiled = $compile(elem);
				compiled(scope);
				scope.$digest();
			});
		});

		it('should highlight added keys', function () {
			scope.key.change = 'add';
			scope.saveKey();
			scope.$digest();
			expect(elem.hasClass('alert-success')).toBe(true);
		});

		it('should highlight edited keys', function () {
			scope.saveKey();
			scope.$digest();
			expect(elem.hasClass('alert-warning')).toBe(true);
		});

		it('should highlight deleted keys', function () {
			scope.delKey(scope.key);
			scope.$digest();
			expect(elem.hasClass('alert-danger')).toBe(true);
		});
	});

	describe('Controller', function () {
		describe('saveKey', function () {
			it('should change key.edit to false and flag key as edit', function () {
				scope.key =new_key;
				scope.saveKey();
				expect(scope.key.edit).toBe(false);
				expect(scope.key.change).toBe('edit');
			});
		});

		describe('delKey', function () {
			it('should flag key for deletion', function () {
				var key = scope.data[0];

				scope.delKey(key);
				expect(key.change).toBe('delete');
			});
		});

		describe('editKey', function () {
			it('should set new values and flag key as edit', function () {
				scope.key = scope.data[0];
				scope.editKey();
				expect(scope.key.new_name).toEqual(scope.key.name);
				expect(scope.key.new_value).toEqual(scope.key.value);
				expect(scope.key.edit).toBe(true);
			});
		});

		describe('cancelKey', function () {
			it('should set edit flag to false', function () {
				scope.key = scope.data[0];
				scope.editKey();
				expect(scope.key.edit).toBe(true);

				scope.cancelKey();
				expect(scope.key.edit).toBe(false);
			});
		});

		describe('Clipboard functions', function () {
			beforeEach(function() {
				scope.data = angular.copy(scope.data);
			});

			describe('copyKey', function () {
				it('should emit a notice to the clipboard', function () {
					spyOn(scope, '$emit');
					scope.copyKey(scope.data[0]);
					expect(scope.$emit).toHaveBeenCalledWith('copy to clipboard', jasmine.any(Object),'key');
				});
			});

			describe('cutKey', function () {
				it('should remove the item from the collection', function () {
					var datalength = scope.data.length;

					scope.cutKey(scope.data[0]);
					expect(scope.data.length).toBeLessThan(datalength);
				});

				it('emit a notice to the clipboard', function () {
					spyOn(scope, '$emit');
					scope.cutKey(scope.data[0]);
					expect(scope.$emit).toHaveBeenCalledWith('copy to clipboard', jasmine.any(Object),'key');
				});
			});

			describe('pasteKey', function () {
				var leaf, branch_count;

				beforeEach(function() {
					scope.clipboard = leaf = scope.data[0];
					scope.cutKey(scope.data[0]);
					branch_count = scope.data.length + 1;
				});

				it('should add the clipboard to the given array before the target', function () {
					scope.pasteKey(scope.data[0], 0);
					expect(scope.data[0]).toEqual(leaf);
					expect(branch_count).toEqual(scope.data.length);
				});

				it('should add the clipboard to the given array after the target', function () {
					scope.pasteKey(scope.data[0], 1);
					expect(scope.data[1]).toEqual(leaf);
					expect(branch_count).toEqual(scope.data.length);
				});

				it('should emit a "clear clipboard" to clear the clipboard', function () {
					spyOn(scope, '$emit');
					scope.pasteKey(scope.data[0], 0);
					expect(scope.$emit).toHaveBeenCalledWith('clear clipboard');
				});
			});
		});
	});
});