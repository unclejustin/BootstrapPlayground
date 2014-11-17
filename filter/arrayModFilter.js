angular.module('orca').filter('arrayMod', function() {
	/**
	 * Inputs a number and outpus an array with that length
	 * (3 | array) => [0,1,2]
	 */
	return function(arrayLength) {
		var arr = [0];

		if(_.isNumber(arrayLength) && arrayLength > 0) {
			arrayLength = Math.ceil(arrayLength);
			arr = new Array(arrayLength);

			for (var i = 0; i < arrayLength; i++) {
				arr[i] = i;
			}
		}

		return arr;
	};
});