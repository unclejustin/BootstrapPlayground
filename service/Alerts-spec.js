describe('Alerts', function() {

  beforeEach(module('BootstrapPlayground'));

	describe('getAlerts', function () {
		it('should return an array of alerts', inject(function(Alerts) {
			expect(Alerts.getAlerts()).toEqual([]);
		}));
	});

	describe('addAlert', function () {
		it('should add an an alert', inject(function (Alerts) {
			Alerts.addAlert('success', 'Test');
			var alerts = Alerts.getAlerts();
			expect(alerts.length).toEqual(1);
			expect(alerts[0].type).toEqual('success');
		}));
	});

	describe('remove alerts functions', function() {

		var alerts;

		beforeEach(inject(function(Alerts) {
			Alerts.addAlert('success', 'Alert 1');
			Alerts.addAlert('danger', 'Alert 2');
			Alerts.addAlert('warning', 'Alert 3');

			alerts = angular.copy(Alerts.getAlerts());
		}));

		describe('closeAlert', function () {
			it('should remove the alert by index', inject(function (Alerts) {
				Alerts.closeAlert(1);
				expect(Alerts.getAlerts().length).toEqual(2);
				expect(Alerts.getAlerts()).not.toContain(alerts[1]);
			}));
		});

		describe('killAlert', function () {
			it('should remove the alert by message', inject(function (Alerts) {
				Alerts.killAlert('Alert 2');
				expect(Alerts.getAlerts().length).toEqual(2);
				expect(Alerts.getAlerts()).not.toContain(alerts[1]);
			}));
		});

		describe('killAlerts', function () {
			it('should remove all alerts', inject(function (Alerts) {
				Alerts.killAlerts();
				expect(Alerts.getAlerts()).toEqual([]);
			}));
		});

	});

});