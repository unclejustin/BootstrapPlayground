angular.module('orca').factory('ExecuteJob',function($resource, APIURL, Alerts) {

	var ExecuteJob = {};
	var resource = $resource(APIURL+'/index.php/jobs/:op/:id.json', {}, {
		preview:{ method:'POST', params:{ op:'preview' } },
		setJob: { method:'POST', params:{ op:'setJob' } }
	});

	ExecuteJob.getJob = function(params) {
		return resource.preview(params).$promise;
	};

	ExecuteJob.saveJob = function(params, returnUpdatedJob) {
		return resource.setJob(params).$promise.then(function(resp) {
			if(resp.rc === 0) {
				Alerts.addAlert('success', 'Job saved.');
			} else {
				Alerts.addAlert('danger', 'Job could not be saved. '+resp.message);
			}

			if(returnUpdatedJob) {
				return resource.preview({ id:params.id }).$promise;
			} else {
				return resp;
			}
		});
	};

	return ExecuteJob;
});