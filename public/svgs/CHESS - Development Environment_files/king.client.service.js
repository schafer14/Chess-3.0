'use strict';

angular.module('core').factory('King', [ 'Piece',
	function(Piece) {
		var King = function(config) {
			this.color = config.color;
			this.square = config.square;
			this.code = 5;
		};

		King.prototype = new Piece();

		return King;
	}
]);