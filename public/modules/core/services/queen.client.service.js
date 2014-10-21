'use strict';

angular.module('core').factory('Queen', ['Piece',
	function(Piece) {
		var Queen = function(config) {
			this.color = config.color;
			this.square = config.square;
			this.code = 4;
		};

		Queen.prototype = new Piece();

		return Queen;
	}
]);