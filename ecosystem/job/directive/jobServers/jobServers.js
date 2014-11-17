angular.module('orca').directive('jobServers', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			job:'=',
			columns:'@'
		},
		templateUrl: 'ecosystem/job/directive/jobServers/jobServers.html',
		link: function(scope, element, attrs, fn) {
			scope.search = { query:'' };

			scope.setServers = function (node, skip) {
				_.each(node.servers, function (s, idx) {
					node.servers[idx].Server.skip = skip;
				});
				scope.job.dirty = true;
			};

			scope.toggleServer = function (server) {
				server.Server.skip = server.Server.skip === 'N' ? 'Y' : 'N';
				scope.job.dirty = true;
			};
		}
	};
});
