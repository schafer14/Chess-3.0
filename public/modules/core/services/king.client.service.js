'use strict';

angular.module('core').factory('King', [ 'Piece',
	function(Piece) {
		var King = function(config) {
			var self = this;

			self.color = config.color;
			self.square = config.square;
			self.code = 5;

			self.valid = function(to) {
				var from = self.square;

				// Literal corner case
				if (
					Math.abs(from - to) === 8 || 
					Math.abs(from - to) === 9 || 
					Math.abs(from - to) === 7 || 
					Math.abs(from - to) === 1
				) {
					return true;
				}

				return false;
			};
		};

		King.prototype = new Piece();

		return King;
	}
]);