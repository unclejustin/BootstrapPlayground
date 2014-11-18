angular.module('orca')
	.filter('orcaCondition', function () {
		        /**
		         * Translate condition to human readable
		         * TrackScriptCondition: {
				 *   id: "1"
				 *   track_script_id: "23"
				 *   source: "ENV/OUTPUT/EXIT"
				 *   condition: "EQ/NQ"
				 *   param: "Param name, used for ENV"
				 *   val: "Param value, used for ENV and OUTPUT"
				 *   disable_true: {Number} track_script_id
				 *   disable_false: {Number} track_script_id
				 * }
		         */
		        return function (input, scriptList) {
			        var condition;
			        var eq = input.condition.toUpperCase() === 'EQ' ? 'equals' : 'does not equal';
			        var str = [];

			        var d_true = _.findWhere(scriptList, {id:input.disable_true});
			        var d_false = _.findWhere(scriptList, {id:input.disable_false});

			        d_true = _.isUndefined(d_true) ? '' : d_true.name;
			        d_false = _.isUndefined(d_false) ? '' : d_false.name;

			        switch (input.source.toUpperCase()) {
				        case 'ENV':
					        str = ['If <strong>', input.param, '</strong>', eq, '<strong>', input.val, '</strong>'];
					        break;
				        case 'OUTPUT':
					        str = ['If <strong>output string</strong>', eq, '<strong>', input.val, '</strong>'];
					        break;
				        default:
					        str = ['If <strong>exit code</strong>', eq, '<strong>0</strong>'];
					        break;
			        }

			        if (parseInt(input.disable_true, 10) !== 0) {
				        str.push('then skip');
				        str.push('<strong>', d_true, '</strong>');

				        if (parseInt(input.disable_false, 10) !== 0) {
					        str.push('else skip');
					        str.push('<strong>', d_false, '</strong>');
				        }
			        } else {
				        if (parseInt(input.disable_false, 10) !== 0) {
					        str.push('then skip');
					        str.push('<strong>', d_false, '</strong>');
				        }
			        }

			        condition = str.join(' ');

			        return condition;
		        };
	        });