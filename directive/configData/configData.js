angular.module('BootstrapPlayground').directive('configData', function ($compile) {
	return {
		restrict:   'E',
		replace:    true,
		scope:      {
			data:     '='
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
	.controller('ConfigDataCtrl', function ($scope) {
	                $scope.$on('clipboard updated', function(evt, clipboard) { $scope.clipboard = clipboard; });

		            $scope.addData = function (d, new_d) {
			            d.data = d.data || [];
			            d.data.push(new_d || {edit:true, data:[], keydata:[]});
		            };

		            $scope.delData = function (leaf, branch) {
			            var index = branch.indexOf(leaf);
			            if (index !== -1) {
				            branch.splice(index, 1);
			            }
		            };

		            $scope.cloneData = function (leaf, branch) {
			            branch.push(angular.copy(leaf));
		            };

		            $scope.cutData = function (leaf, branch) {
			            $scope.$emit('cut to clipboard', leaf);
			            var index = branch.indexOf(leaf);
			            if (index !== -1) {
				            branch.splice(index, 1);
			            }
		            };

		            $scope.pasteData = function (leaf, branch, position) {
			            if (position === -1) {
				            $scope.addData(leaf, $scope.clipboard);
			            } else {
				            var index = branch.indexOf(leaf);
				            if (index !== -1) {
					            index += position;

					            index = Math.min(branch.length, index);
					            index = Math.max(0, index);
						            branch.splice(index, 1, $scope.clipboard);
				            }
			            }
			            $scope.$emit('clear clipboard');
		            };

		            $scope.addKey = function (d, new_key) {
			            if (!d.keydata) {
				            d.keydata = [];
			            }

			            d.keydata.push(new_key || {edit:true, name:'', value:''});
		            };
	            });