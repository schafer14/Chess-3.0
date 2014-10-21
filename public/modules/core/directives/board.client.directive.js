'use strict';

angular.module('core').directive('board', [ 'Config',
	function(Config) {
		return {
			templateUrl: '/modules/core/views/board.client.view.html',
			restrict: 'EA',
			scope: {
				board: '=',
			},
			link: function postLink(scope, element, attrs) {
				var groupsOfFourRegex = /..../g;
				var numSquares = attrs.numSquares || Config.numSquares;

				scope.squaresIter = new Array(numSquares);

				scope.drawBoard = function(board) {
					if (angular.isUndefined(board)) {
						return false;
					}

					scope.squares = [];
					var pieces = board.match(groupsOfFourRegex);
					angular.forEach(pieces, function(piece) {
						scope.squares[parseInt(piece.substring(0,2))] = piece[2] + piece[3];
					});
				};
				
				scope.$watch('board.toString()', function(value) {
					scope.drawBoard(scope.board.toString());
				});

				scope.click = function(square, event) {
					if (event.altKey && event.ctrlKey) {
						scope.board.highlight(square, 'red');				
					} else if (event.ctrlKey) {
						scope.board.highlight(square);
					} else {
						if (angular.isUndefined(scope.selected)) {
							scope.selected = square;
						}

						else {
							scope.board.move(scope.selected, square);
							delete scope.selected;
						}
					}
				};

				scope.dblClick = function(square) {
					if (scope.board.testMode === true && scope.board.pieceOn(square)) {
						scope.board.pieceOn(square).showTest(scope.board);
					}
				}
			}
		};
	}
]);