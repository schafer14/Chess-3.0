'use strict';

angular.module('core').factory('Rook', ['Piece',
	function(Piece) {
		var Rook = function(config) {
			var self = this;
			self.color = config.color;
			self.square = config.square;
			self.code = 3;

			self.valid = function(to) {
				var from = self.square;

				if ((from % 8) === (to % 8)) {
					return true;
				}

				if (Math.floor(from / 8) === Math.floor(to / 8)) {
					return true;
				}

				return false;
			};

			self.path = function(to) {
				var from = self.square;
				var path = [];

				//find out if moving horizontal or verticle
				var bigger = from > to ? from : to;
				var smaller = to > from ? from : to;
				//verticle
				if ((from % 8) === (to % 8)) {
					smaller += 8;
					while (smaller < bigger) {
						path.push(smaller);
						smaller += 8;
					}
				}
				//horizontal
				if (Math.floor(from / 8) === Math.floor(to / 8)) {
					smaller += 1;
					while (smaller < bigger) {
						path.push(smaller);
						smaller += 1;
					}
				}

				return path;
			};
		};

		Rook.prototype = new Piece();

		return Rook;
	}
]);