'use strict';

angular.module('core').factory('Piece', [
	function() {
		return function Piece () {
			this.valid = function(square) {
				return false;
			};

			this.path = function() {
				return [];
			}

			this.occupiedByFriend = function(board, to) {
				var toPiece = board.pieceOn(to);
				return !(this.color === toPiece.color);
			};

			this.myTurn = function(board) {
				return this.color === board.turn;
			};

			this.toString = function() {
				var pre = this.square < 10 ? '0' : '';
				return pre + this.square + this.code + this.color;
			};

			this.actuallyMoved = function(from, to) {
				return !(from === to);
			};

			this.clearPath = function(path, board) {
				var pass = true;

				angular.forEach(path, function(square) {
					if (board.pieceOn(square)) {
						pass = false;
						return;
					}
				});

				return pass;
			};

			this.showTest = function(board) {
				var squares = this.getMoves(board);

				board.clearHighlights();
				board.highlight(squares, 'yellow');
			};

			// strict determines whether to check if moves are valid or legal
			this.getMoves = function(board, strict) {
				var strict = strict || 0;
				var i = 0;
				var squares = [];

				for (i; i < 64; i += 1) {
					if (strict === 1) {
						if (this.occupiedByFriend(board, i) && this.valid(i, board) && this.clearPath(this.path(i), board) && !this.wouldBeInCheck(board, i)) {
							squares.push(i);
						} 
					} else if (strict === 2) {
						if (this.occupiedByFriend(board, i) && this.valid(i, board) && this.clearPath(this.path(i), board)) {
							squares.push(i);
						}
					} else if (strict === 0) {
						if (this.legal(i, board)) {
							squares.push(i);
						} 
					}
				}

				return squares;
			};

			this.isInCheck = function(board) {
				var color = this.color;

				var inCheck = false;

				angular.forEach(board.getPieces(Math.abs(color - 1)), function(piece) {
					if (piece.getMoves(board, 2).indexOf(board.getKing(color).square) > -1) {
						inCheck = true;
						return;
					}
				});
				
				return inCheck;
			};

			this.wouldBeInCheck = function(board, to) {
				var color = this.color;
				var oldSquare = this.square;
				var oldPiece = board.pieceOn(to);

				if (oldPiece) {
					board.removePieceOn(to);
				};

				this.square = to;

				var passed = this.isInCheck(board, color);

				if (oldPiece) {
					board.pieces.push(oldPiece);
				}

				this.square = oldSquare;
				return passed
			};

			this.legal = function(to, board) {
				var from = this.square;

				var legal = true;
				legal = legal === false ? false : this.actuallyMoved(to, from);
				legal = legal === false ? false : this.myTurn(board);
				legal = legal === false ? false : this.occupiedByFriend(board, to);
				legal = legal === false ? false : this.valid(to);
				var path = this.path(to);
				legal = legal === false ? false : this.clearPath(path, board);
				legal = legal === false ? false : !this.wouldBeInCheck(board, to);

				return legal;
			}
		};
	}
]);