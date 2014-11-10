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
			           controller: 'ConfigKeyCtrl'
		           };
	           })
	.controller('ConfigKeyCtrl', function ($scope, focus, Alerts) {
	                $scope.$on('clipboard updated', function(evt, clipboard) { $scope.clipboard = clipboard; });

	                $scope.confirmDel = function(evt, key) {
		                evt.stopPropagation();
		                key.delete=true;
	                };

		            $scope.delKey = function (key) {
			            var index = $scope.data.indexOf(key);
			            if (index !== -1) {
				            $scope.data.splice(index, 1);
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
			            focus('edit key');
			            $scope.key.new_name = $scope.key.name;
			            $scope.key.new_value = $scope.key.value;

			            $scope.key.edit = true;
		            };

		            $scope.cancelKey = function () {
			            $scope.key.edit = false;
		            };

		            $scope.copyKey = function (key) {
			            $scope.$emit('copy to clipboard', angular.copy(key), 'key');
			            Alerts.addAlert('success', '`'+ key.name +'` copied to clipboard.');
		            };

	                $scope.cutKey = function (key) {
		                $scope.copyKey(key);
		                var index = $scope.data.indexOf(key);
		                if (index !== -1) {
			                $scope.data.splice(index, 1);
		                }
	                };

	                $scope.pasteKey = function (key, position) {
		                var index = $scope.data.indexOf(key);
		                if (index !== -1) {
			                index += position;

			                index = Math.min($scope.data.length, index);
			                index = Math.max(0, index);
			                $scope.data.splice(index, 0, $scope.clipboard);
		                }
		                $scope.$emit('clear clipboard');
	                };
	            });
