'use strict';

angular.module('core').factory('Pawn', ['Piece',
	function(Piece) {
		var Pawn = function(config) {
			this.color = config.color;
			this.square = config.square;
			this.code = 0;
		};

		Pawn.prototype = new Piece();

		return Pawn;
	}
]);