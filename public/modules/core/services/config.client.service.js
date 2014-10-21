'use strict';

angular.module('core').factory('Config', [
	function() {
		var Config = {};

		Config.numSquares = 8;

		Config.startingBoard = '00310111022103410451052106110731080109011001110112011301140115014800490050005100520053005400550056305710582059406050612062106330';

		return Config;
	}
]);