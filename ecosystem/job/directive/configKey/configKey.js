angular.module('orca')
	.directive('configKey', function () {
		           return {
			           restrict:   'E',
			           replace:    true,
			           scope:      {
				           key: '=',
				           data:'='
			           },
			           templateUrl:'ecosystem/job/directive/configKey/configKey.html',
			           controller: 'ConfigKeyCtrl'
		           };
	           })
	.controller('ConfigKeyCtrl', function ($scope, focus, Alerts, GUID) {
	                $scope.$on('clipboard updated', function(evt, clipboard) { $scope.clipboard = clipboard; });

	                $scope.getClasses = function(key) {
		                var classes = [key.guid];

		                switch(key.change) {
			                case 'add':
				                classes.push('alert-success');
				                break;
			                case 'edit':
				                classes.push('alert-warning');
				                break;
			                case 'delete':
				                classes.push('alert-danger');
				                break;
			                default:
				                break;
		                }

		                return classes;
	                };

	                $scope.delKey = function (key) {
			            key.change = 'delete';
		            };

		            $scope.saveKey = function () {
			            $scope.key.name = $scope.key.new_name;
			            $scope.key.value = $scope.key.new_value;

			            $scope.key.edit = false;
			            $scope.key.add = false;
			            if ($scope.key.change !== 'add') {
				            $scope.key.change = 'edit';
			            }
		            };

		            $scope.editKey = function () {
			            focus('edit key');
			            $scope.key.new_name = $scope.key.name;
			            $scope.key.new_value = $scope.key.value;

			            $scope.key.edit = true;
		            };

		            $scope.cancelKey = function () {
			            $scope.key.edit = false;

			            // If we just added this key, then we need to remove it from keydata
			            if ($scope.key.change==='add') {
				            var index = $scope.data.indexOf($scope.key);
				            if (index !== -1) {
					            $scope.data.splice(index, 1);
				            }
			            }
		            };

		            $scope.copyKey = function (key) {
			            key.guid = GUID.create();
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
