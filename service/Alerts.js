angular.module('BootstrapPlayground').factory('Alerts',function() {
	var alerts = [];

	var addAlert = function (type, msg, inline) {
		if (!inline) { inline = false; }
		alerts.unshift({ type:type, msg:msg, seen:false, inline:inline });
		if (alerts.length > 5 && msg !== 'Loading...') {
			alerts.pop();
		}
	};

	var closeAlert = function (index) {
		alerts.splice(index, 1);
	};

	var getAlerts = function () {
		return alerts;
	};

	var killAlert = function (msg) {
		var alert = _.where(alerts, {msg:msg});
		var idx = _.indexOf(alerts, alert[0]);
		if (idx > -1) {
			closeAlert(idx);
		}
	};

	var killAlerts = function () {
		alerts = [];
	};

	return {
		addAlert:  addAlert,
		closeAlert:closeAlert,
		getAlerts: getAlerts,
		killAlert: killAlert,
		killAlerts:killAlerts
	};
});