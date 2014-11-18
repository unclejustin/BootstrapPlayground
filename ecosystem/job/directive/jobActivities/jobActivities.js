angular.module('orca').directive('jobActivities', function () {
	return {
		restrict:   'E',
		replace:    true,
		scope:      {
			job:'='
		},
		templateUrl:'ecosystem/job/directive/jobActivities/jobActivities.html',
		link:       function (scope, element, attrs, fn) {

		},
		controller: function ($scope, Tracks) {
			function setTracks() {
				$scope.job.availableTracks = _.filter($scope.job.tracks, function (t) { return t.Track.skip === 'Y'; });
				var selectedTracks = _.filter($scope.job.tracks, function (t) { return t.Track.skip === 'N'; });
				var parsedTracks = _.groupBy(selectedTracks, function (t) { return t.Track.seq; });

				$scope.job.selectedTracks = parsedTracks;
			}

			function remSerial(seq) {
				// Minus 1 to all tracks <= seq
				_.each(_.flatten($scope.job.selectedTracks), function (t) {
					if (t.Track.seq >= seq) {
						t.Track.seq--;
					}
				});
			}

			function extractDescription(scripts) {
				var d = [];

				_.each(scripts, function (s) {
					if (s.Script.Scripts.length > 0) {
						d.push(extractDescription(s.Script.Scripts));
					} else {
						d.push(s);
					}
				});

				return d;
			}

			setTracks();

			$scope.sortTracks = function (track) {
				return parseInt(track.seq);
			};

			$scope.toggleTrack = function (track) {
				track.collapsed = !track.collapsed;

				if (!track.description) {
					Tracks.getTrack({id:track.Track.track_id}).then(
						function (resp) {
							if (resp.rc === 0) {
								track.description = extractDescription(resp.data.Track.Scripts);
							}
						}
					);
				}
			};

			$scope.removeTrack = function (track, serial) {
				track.Track.skip = 'Y';
				$scope.job.dirty = true;

				if (serial) {
					remSerial(track.Track.seq);
				}

				setTracks();
			};

			$scope.nextSeq = function () {
				var flat = _.flatten($scope.job.selectedTracks);

				if (flat.length === 0) {
					return 0;
				}

				var max = _.max(flat, function (t) {
					return t.Track.seq;
				});
				var seq = max.Track.seq;
				return parseInt(seq) + 1;
			};

			$scope.nextSeq = function () {
				var flat = _.flatten($scope.job.selectedTracks);

				if (flat.length === 0) {
					return 0;
				}

				var max = _.max(flat, function (t) {
					return t.Track.seq;
				});
				var seq = max.Track.seq;
				return parseInt(seq) + 1;
			};
		}
	};
});
