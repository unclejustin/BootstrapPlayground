angular.module('orca').directive('configData', function ($compile) {
	return {
		restrict:   'E',
		replace:    true,
		scope:      {
			configdata:'=',
			job:       '='
		},
		templateUrl:'ecosystem/job/directive/configData/configData.html',
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
	.controller('ConfigDataCtrl', function ($scope, Alerts, GUID, focus) {
		            $scope.$on('clipboard updated', function (evt, clipboard) { $scope.clipboard = clipboard; });

		            $scope.getClasses = function (d) {
			            var classes = [];

			            switch (d.change) {
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

	                function impeachObama(liberal_asshole) {
		                delete liberal_asshole.change;
		                var i;

		                if (liberal_asshole.data) {
			                for (i=0; i<liberal_asshole.data.length; i++) {
				                impeachObama(liberal_asshole.data[i]);
			                }
		                }

		                if (liberal_asshole.keydata) {
			                for (i=0; i<liberal_asshole.keydata.length; i++) {
				                impeachObama(liberal_asshole.keydata[i]);
			                }
		                }
	                }

		            $scope.addData = function (target, new_d) {
			            target.showdata = true;
			            focus('focus data');
			            target.data = target.data || [];
			            target.data.splice(0, 0, new_d || {add:true, change:'add', data:[], keydata:[]});
		            };

		            $scope.saveData = function (d) {
			            d.path = d.new_path;
			            d.add = false;
			            if (d.change !== 'add') {
				            d.change = 'edit';
			            }
			            $scope.$emit('job dirty');
		            };

		            $scope.cancelData = function (d) {
			            var index = $scope.configdata.data.indexOf(d);
			            if (index !== -1) {
				            $scope.configdata.data.splice(index, 1);
			            }
		            };

		            $scope.delData = function (d) {
			            d.change = 'delete';
			            $scope.$emit('job dirty');
		            };

		            $scope.copyData = function (d) {
			            var copy = angular.copy(d);
			            impeachObama(copy);
			            copy.guid = GUID.create();
			            $scope.$emit('copy to clipboard', copy, 'data');
			            Alerts.addAlert('success', '`' + d.path + '` copied to clipboard.');
		            };

		            $scope.cutData = function (d) {
			            var index = $scope.configdata.data.indexOf(d);
			            if (index !== -1) {
				            $scope.copyData(d);
				            $scope.configdata.data.splice(index, 1);
			            }
		            };

		            $scope.pasteData = function (target, position) {
			            target.showdata = true;
			            if (position === -1) {
				            // Insert into target
				            if ($scope.clipboard.type === 'data') {
					            $scope.addData(target, $scope.clipboard);
				            } else {
					            $scope.addKey(target, $scope.clipboard);
				            }
			            } else {
				            // Which list type, and make sure the list exists
				            if ($scope.clipboard.type === 'data') {
					            var index, list; // position in list and the list to paste into

					            if (!$scope.configdata.data) {
						            $scope.configdata.data = [];
					            }
					            list = $scope.configdata.data;

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
				            } else {
					            if (!$scope.configdata.keydata) {
						            $scope.configdata.keydata = [];
					            }
					            $scope.configdata.keydata.splice(0, 0, $scope.clipboard);
				            }
			            }

			            // And clean up the clipboard
			            $scope.$emit('clear clipboard');
		            };

		            $scope.addKey = function (d, new_key) {
			            d.showdata = true;
			            focus('add key');
			            if (!d.keydata) {
				            d.keydata = [];
			            }
			            d.showdata = true;
			            d.keydata.push(new_key || {add:true, name:'', value:'', change:'add'});
		            };
	            });