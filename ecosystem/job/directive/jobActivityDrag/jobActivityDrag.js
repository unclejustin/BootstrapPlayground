angular.module('orca').directive('jobActivityDrag', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			track:'='
		},
		templateUrl: 'ecosystem/job/directive/jobActivityDrag/jobActivityDrag.html',
		link: function(scope, element, attrs, fn) {

		},
		controller:function($scope) {
			function dragstart(event) {
				var e = angular.element(event.currentTarget);
				e.data('track', $scope.track);
			}

			function dragFn(event, ui) {
				var dragLeft = ui.helper.offset().left,
					dragTop = ui.helper.offset().top;

				$('.activity-drop').each(function () {
					var diff = 50,
						drop = $(this),
						dropLeft = drop.offset().left - diff,
						dropRight = dropLeft + drop.width() + diff,
						dropTop = drop.offset().top - diff,
						dropBottom = dropTop + drop.height() + diff,
						s = angular.element(this);

					if (!_.isUndefined(s.scope) && !_.isUndefined(s.scope().ptrack)) {
						s.scope().ptrack.showdrop = !!((dragLeft > dropLeft && dragLeft < dropRight) && (dragTop > dropTop && dragTop < dropBottom));
						$scope.$apply();
					}
				});
			}

			$scope.dragoptions = {
				helper:          'clone',
				revert:          'invalid',
				appendTo:        'body',
				start:           dragstart,
				drag:            dragFn,
				refreshPositions:true,
				cursorAt:        {left:15, top:15}
			};
		}
	};
});
