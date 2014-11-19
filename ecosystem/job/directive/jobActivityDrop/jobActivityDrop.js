angular.module('orca').directive('jobActivityDrop', function () {
	return {
		restrict:   'E',
		replace:    true,
		scope:      {
			ptrack:'=',
			job:   '=',
			serial:'@',
			nextSeq:'&'
		},
		transclude: true,
		templateUrl:'ecosystem/job/directive/jobActivityDrop/jobActivityDrop.html',
		link:       function (scope, element, attrs, fn) {

		},
		controller: function ($scope) {
			if (!$scope.ptrack) {
				$scope.ptrack = [{ Track:{ seq:$scope.nextSeq() } }];
			}

			function selectTrack(event, ui) {
				var track = angular.element(ui.draggable).data('track');

				track.Track.skip = 'N';
				track.Track.seq = $scope.ptrack[0] ? $scope.ptrack[0].Track.seq : 0;
				track.selected = 0;

				$scope.job.dirty = true;

				if ($scope.serial==='true') {
					addSerial(track.Track.seq);
				}

				setTracks();
				$scope.$apply();
			}

			function addSerial(seq) {
				// Plus 1 to all tracks >= seq
				_.each(_.flatten($scope.job.selectedTracks), function (t) {
					if (t.Track.seq >= seq) {
						t.Track.seq++;
					}
				});
			}

			function setTracks() {
				$scope.job.availableTracks = _.filter($scope.job.tracks, function (t) { return t.Track.skip === 'Y'; });
				var selectedTracks = _.filter($scope.job.tracks, function (t) { return t.Track.skip === 'N'; });
				var parsedTracks = _.groupBy(selectedTracks, function (t) { return t.Track.seq; });

				$scope.job.selectedTracks = parsedTracks;
			}

			$scope.dropoptions = {
				activeClass:'drop-add',
				hoverClass: 'drop-overlay-hover',
				drop:       selectTrack
			};
		}
	};
});
