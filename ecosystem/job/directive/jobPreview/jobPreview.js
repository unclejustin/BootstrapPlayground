angular.module('orca').directive('jobPreview', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			preview:'='
		},
		templateUrl: 'ecosystem/job/directive/jobPreview/jobPreview.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
