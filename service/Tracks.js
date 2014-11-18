angular.module('orca').factory('Tracks',function($resource, APIURL) {

	var Tracks = {};

	var resource = $resource(APIURL+'/index.php/tracks/:op/:id.json', {}, {
		getTrackList:            {method:'GET', params:{op:'getTrackList'}},
		getTrack:                {method:'POST', params:{op:'getTrack'}},
		setTrack:                {method:'POST', params:{op:'setTrack'}},
		delTrack:                {method:'POST', params:{op:'delTrack'}},
		setScript:               {method:'POST', params:{op:'setScript'}},
		delScript:               {method:'POST', params:{op:'delScript'}},
		setTrackProviderVersions:{method:'POST', params:{op:'setTrackProviderVersions'}}
	});

	var trackScripts_resource = $resource('/index.php/trackScripts/:op/:id.json', {}, {
		groupScripts:  {method:'POST', params:{op:'groupScripts'}},
		ungroupScripts:{method:'POST', params:{op:'ungroupScripts'}},
		renameGroup:   {method:'POST', params:{op:'renameGroup'}},
		moveScript:    {method:'POST', params:{op:'moveScript'}},
		cloneScript:   {method:'POST', params:{op:'cloneScript'}},
		setCondition:  {method:'POST', params:{op:'setCondition'}},
		delCondition:  {method:'POST', params:{op:'delCondition'}}
	});

	var paging = {
		query: '',
		paging:{page:1, where:{or:[]}}
	};

	function setPage(page) { paging.paging.page = page; }

	function setPageSize(pageSize) { paging.paging.page_size = pageSize; }

	function setWhere(where) {
		paging.query = where;
		paging.paging.where = where;
	}

	function getWhere() { return paging.query; }

	/**
	 * Set the order by clause
	 * @param {order} order - Example: { "admin":"asc", "name":"desc" } would sort by admin ascending then name descending
	 */
	function setOrder(order) {
		paging.paging.order = order;
	}

	Tracks.setPage = setPage;
	Tracks.setPageSize = setPageSize;
	Tracks.setWhere = setWhere;
	Tracks.getWhere = getWhere;
	Tracks.setOrder = setOrder;
	Tracks.paging = paging;

	Tracks.getTrackList = function () {
		return resource.getTrackList().$promise;
	};

	Tracks.getTrack = function (params) {
		return resource.getTrack(params).$promise;
	};

	Tracks.setTrack = function (params) {
		return resource.setTrack(params).$promise;
	};

	Tracks.delTrack = function (params) {
		return resource.delTrack(params).$promise;
	};

	Tracks.setScript = function (params) {
		return resource.setScript(params).$promise;
	};

	Tracks.moveScript = function (params) {
		return trackScripts_resource.moveScript(params).$promise;
	};

	Tracks.cloneScript = function (params) {
		return trackScripts_resource.cloneScript(params).$promise;
	};

	Tracks.delScript = function (params) {
		return resource.delScript(params).$promise;
	};

	Tracks.groupScripts = function (params) {
		return trackScripts_resource.groupScripts(params).$promise;
	};

	Tracks.ungroupScripts = function (params) {
		return trackScripts_resource.ungroupScripts(params).$promise;
	};

	Tracks.renameGroup = function (params) {
		return trackScripts_resource.renameGroup(params).$promise;
	};

	Tracks.ungroupScript = function (params) {
		return trackScripts_resource.ungroupScript(params).$promise;
	};

	Tracks.setCondition = function (params) {
		return trackScripts_resource.setCondition(params).$promise;
	};

	Tracks.delCondition = function (params) {
		return trackScripts_resource.delCondition(params).$promise;
	};

	Tracks.setTrackProviderVersions = function (params) {
		return resource.setTrackProviderVersions(params).$promise;
	};

	return Tracks;
});