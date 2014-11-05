angular.module('BootstrapPlayground')
	.directive('configKey', function () {
		           return {
			           restrict:   'E',
			           replace:    true,
			           scope:      {
				           key: '=',
				           data:'='
			           },
			           templateUrl:'directive/configKey/configKey.html',
			           link:       function (scope, element, attrs, fn) {

			           },
			           controller: 'ConfigKeyCtrl'
		           };
	           })
	.controller('ConfigKeyCtrl', function ($scope) {
		            $scope.delKey = function (leaf, branch) {
			            var index = branch.indexOf(leaf);
			            if (index !== -1) {
				            branch.splice(index, 1);
			            }
		            };

		            $scope.saveKey = function () {
			            $scope.key.name = $scope.key.new_name;
			            $scope.key.value = $scope.key.new_value;

			            $scope.key.edit = false;
			            $scope.key.add = false;
			            $scope.key.dirty = true;
		            };

		            $scope.editKey = function () {
			            $scope.key.new_name = $scope.key.name;
			            $scope.key.new_value = $scope.key.value;

			            $scope.key.edit = true;
		            };

		            $scope.cancelKey = function () {
			            $scope.key.edit = false;
		            };

		            $scope.cloneKey = function (leaf, branch) {
			            branch.push(angular.copy(leaf));
		            };
	            });
