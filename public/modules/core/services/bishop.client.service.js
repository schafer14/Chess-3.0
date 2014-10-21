'use strict';

angular.module('core').factory('Bishop', [ 'Piece',
	function(Piece) {
		var Bishop = function(config) {
			this.color = config.color;
			this.square = config.square;
			this.code = 2;
		};

		Bishop.prototype = new Piece();

		return Bishop;
	}
]);