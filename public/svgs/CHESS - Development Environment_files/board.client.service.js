'use strict';

angular.module('core').factory('Board', ['King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn', '$filter',
	function(King, Queen, Rook, Bishop, Knight, Pawn, $filter) {
		var pieceMapper = [Pawn, Knight, Bishop, Rook, Queen, King];

		return function Board(string, config) {
			var self = this;
			config = config || {};

			self.gameLog = [];

			self.testMode = config.testMode|| false;
			
			self.whiteIsComp = config.whiteIsComp || false;
			self.blackIsComp = config.blackIsComp || true;
			
			self.rules = config.rules || 0;

			self.turn = 0;

			self.pieces = [];
			self.highlighted = {
				red: [],
				green: [],
				blue: [],
				yellow: [],
			};

			self.rotated = false;

			angular.forEach(string.match(/..../g), function(piece) {
				self.pieces.push(new pieceMapper[piece[2]] ({
					color: parseInt(piece[3]),
					square: parseInt(piece.substring(0,2)),
				}));
			});
			
			self.toString = function() {
				return self.pieces.map(function(piece) {
					return  piece.toString();
				}).join('');
			};

			self.pieceOn = function(square) {
				var correctPiece = false;

				angular.forEach(self.pieces, function(piece) {
					if (piece.square === square) {
						correctPiece = piece;
						return;
					}
				});

				return correctPiece;
			};

			self.highlight = function(squares, color) {
				color = color || 'blue';
				squares = angular.isArray(squares) ? squares : [squares];

				angular.forEach(squares, function(square) {
					var index = self.highlighted[color].indexOf(square);
					if (index > -1) {
						self.highlighted[color].splice(index, 1);
					} else {
						self.highlighted[color].push(square);
					}
				});
			};

			self.clearHighlights = function() {
				self.highlighted = {
					red: [],
					green: [],
					blue: [],
					yellow: [],
				};
			};

			self.move = function(from, to) {
				var piece = self.pieceOn(from);
				if (piece !== false) {
					if (piece.legal(to, self) === true) {
						piece.square = to;
						if (self.rules !== 1) {
							self.turn = Math.abs(self.turn - 1);
							self.gameLog.push({from: from, to: to});
							self.isMated(self.turn);
						}
					}
				}
			};

			self.rotate = function() {
				self.rotated =! self.rotated;
			};

			self.getPieces = function(color) {
				return $filter('filter')(this.pieces, function(piece) {
					return piece.color === color;
				});
			};

			self.getKing = function(color) {
				return $filter('filter')(this.pieces, function(piece) {
					return piece.color === color && piece.code === 5;
				})[0];
			};

			self.removePieceOn = function(square) {
				self.pieces = $filter('filter')(self.pieces, function(piece) {
					return piece.square !== square;
				});
			};

			self.allMoves = function(color) {
				var moves = [];
				angular.forEach(self.getPieces(color), function(piece) {
					moves = moves.concat(piece.getMoves(self, 1));
				});

				return moves;
			};

			self.isInCheck = function(color) {
				return self.getKing(color).isInCheck(self);
			};

			self.isMated = function(color) {
				if (self.isInCheck(color) && self.allMoves(color).length === 0) {
					console.log('checkmate');
				}
				return false;
			};
		};
	}
]);