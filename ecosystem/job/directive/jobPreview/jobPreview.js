angular.module('orca').directive('jobPreview', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			preview:'='
		},
		templateUrl: 'ecosystem/job/directive/jobPreview/jobPreview.html',
		link: function(scope, element, attrs, fn) {


		},
		controller:function($scope) {
			$.getJSON("preview.json", function (json) {
				$scope.preview = json;
				$scope.$apply();
			});

			$scope.getChangeBg = function(change) {
				var classes = [];

				switch(change) {
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

			$scope.getChangeIcon = function(change) {
				var classes = [];

				switch(change) {
					case 'add':
						classes.push('fa-plus');
						break;
					case 'edit':
						classes.push('fa-exclamation');
						break;
					case 'delete':
						classes.push('fa-times');
						break;
					default:
						break;
				}

				return classes;
			};
		}
	};
});
