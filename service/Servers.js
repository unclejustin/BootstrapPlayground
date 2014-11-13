angular.module('BootstrapPlayground').factory('Servers',function($resource, authtoken) {

	var serverResource = $resource('http://localhost:8888/index.php/servers/:op/:id.json', {}, {
		getConfig:{ method:'POST', params:{ op:'getConfig', authtoken:authtoken } }
	});

	var Servers = {};

	Servers.getConfig = function(params) { return serverResource.getConfig(params).$promise; };

	return Servers;
});