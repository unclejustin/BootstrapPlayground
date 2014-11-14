angular.module('orca').factory('ExecuteJob',function($resource, APIURL, authtoken) {

	var ExecuteJob = {};
	var resource = $resource(APIURL+'/index.php/jobs/:op/:id.json', {}, {
		preview:{ method:'POST', params:{ op:'preview', authtoken:authtoken } }
	});

	ExecuteJob.getJob = function(params) {
		return resource.preview(params).$promise;
	};

	return ExecuteJob;
});