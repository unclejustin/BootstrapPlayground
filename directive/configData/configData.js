angular.module('BootstrapPlayground').directive('configData', function ($compile) {
	return {
		restrict:   'E',
		replace:    true,
		scope:      {
			configdata:     '='
		},
		templateUrl:'directive/configData/configData.html',
		compile:    function (tElement, tAttr, transclude) {
			var contents = tElement.contents().remove();
			var compiledContents;

			return function (scope, iElement) {
				if (!compiledContents) {
					compiledContents = $compile(contents, transclude);
				}

				compiledContents(scope, function (clone) {
					iElement.append(clone);
				});
			};
		},
		controller: 'ConfigDataCtrl'
	};
})
	.controller('ConfigDataCtrl', function ($scope, Alerts) {
	                $scope.$on('clipboard updated', function(evt, clipboard) { $scope.clipboard = clipboard; });

		            $scope.addData = function (target, new_d) {
			            target.data = target.data || [];
			            target.data.push(new_d || {edit:true, data:[], keydata:[]});
		            };

		            $scope.delData = function (d) {
			            var index = $scope.configdata.data.indexOf(d);
			            if (index !== -1) {
				            $scope.configdata.splice(index, 1);
			            }
		            };

		            $scope.copyData = function (d) {
			            $scope.$emit('copy to clipboard', angular.copy(d),'data');
			            Alerts.addAlert('success', 'Copied to clipboard.');
		            };

		            $scope.cutData = function (d) {
			            var index = $scope.configdata.data.indexOf(d);
			            if (index !== -1) {
				            $scope.copyData(d);
				            $scope.configdata.data.splice(index, 1);
			            }
		            };

		            $scope.pasteData = function (target, position) {
			            if (position === -1) {
				            // Insert into target
				            if ($scope.clipboard.type==='data') {
					            $scope.addData(target, $scope.clipboard);
				            } else {
					            $scope.addKey(target, $scope.clipboard);
				            }
			            } else {
				            var index, list; // position in list and the list to paste into

				            // Which list type, and make sure the list exists
				            if ($scope.clipboard.type === 'data') {
					            if (!$scope.configdata.data) { $scope.configdata.data = []; }
					            list = $scope.configdata.data;
				            } else {
					            if (!$scope.configdata.keydata) { $scope.configdata.keydata = []; }
					            list = $scope.configdata.keydata;
				            }

				            index = list.indexOf(target);

				            // Index should always be found, but just in case we throw and alert
				            if (index !== -1) {
					            index += position; // Where in the array

					            // Safe guard to make sure we don't try and splice outside the bounds of the array
					            index = Math.min(list.length, index);

					            // Finally insert the clipboard into the array
					            list.splice(index, 0, $scope.clipboard);
				            } else {
					            Alerts.addAlert('danger', 'Could not paste item!');
				            }
			            }

			            // And clean up the clipboard
			            $scope.$emit('clear clipboard');
		            };

		            $scope.addKey = function (d, new_key) {
			            if (!d.keydata) {
				            d.keydata = [];
			            }
			            d.showdata = true;
			            d.keydata.push(new_key || {add:true, name:'', value:''});
		            };
	            });