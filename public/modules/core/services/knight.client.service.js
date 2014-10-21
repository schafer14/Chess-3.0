'use strict';

angular.module('core').factory('Knight', ['Piece',
	function(Piece) {
		var Knight = function(config) {
			this.color = config.color;
			this.square = config.square;
			this.code = 1;
		};

		Knight.prototype = new Piece();

		return Knight;
	}
]);