'use strict';

angular.module('core').controller('GameController', ['$scope', 'Config', 'Board', 
	function($scope, Config, Board) {
		$scope.board = new Board('3630355025310051', {testMode: true});
		$scope.board1 = new Board(Config.startingBoard);
		$scope.board1.rotate();
	}
]);