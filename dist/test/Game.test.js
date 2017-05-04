'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../index');

describe('Game', function () {
    describe('needToValidateMovements', function () {
        it('when null should validate');
        it('when undefined should validate');
        it('when true should validate');
        it('when false should NOT validate');
    });
    describe('getCopy', function () {
        var gameCopy = void 0;
        var game;
        beforeEach(function () {
            game = new _index.Game({
                boardArgs: {
                    logMove: true
                }
            });
            gameCopy = game.getCopy();
        });
        it('notEqual = not using same reference', function () {
            (0, _ptzAssert.notEqual)(gameCopy, game);
        });
        it('movements', function () {
            (0, _ptzAssert.deepEqual)(gameCopy.movements, game.movements);
        });
        it('players', function () {
            (0, _ptzAssert.deepEqual)(gameCopy.players, game.players);
        });
        it('ended', function () {
            (0, _ptzAssert.deepEqual)(gameCopy.ended, game.ended);
        });
        it('board', function () {
            (0, _ptzAssert.deepEqual)(gameCopy.board, game.board);
        });
    });
    describe('backMove', function () {
        it('backMove offline game', function () {
            var players = new _index.Players({
                white: new _index.Player({ name: 'Angelo', foto: 'img/black_user.png' }),
                black: new _index.Player({ name: 'Gabi', foto: 'img/white_user.png' })
            });
            var game = new _index.Game({
                players: players,
                boardArgs: {
                    logMove: true
                }
            });
            game.move(new _index.BoardPosition({ x: 2, y: 7 }), new _index.BoardPosition({ x: 2, y: 6 }));
            var gameBeforeLastMove = game.getCopy();
            game.move(new _index.BoardPosition({ x: 2, y: 0 }), new _index.BoardPosition({ x: 2, y: 1 }));
            game.backMove();
            (0, _ptzAssert.equal)(gameBeforeLastMove.movements.length, game.movements.length);
            (0, _ptzAssert.deepEqual)(gameBeforeLastMove.movements, game.movements);
        });
    });
    describe('Move', function () {
        var game;
        beforeEach(function () {
            var players = new _index.Players({
                white: new _index.Player({ name: 'Angelo', foto: 'img/black_user.png' }),
                black: new _index.Player({ name: 'Gabi', foto: 'img/white_user.png' })
            });
            game = new _index.Game({
                players: players,
                boardArgs: {
                    logMove: true
                }
            });
        });
        it('Block moving to same position', function () {
            var startPosition = new _index.BoardPosition({ x: 0, y: 0 });
            var nextPosition = new _index.BoardPosition({ x: 0, y: 0 });
            (0, _ptzAssert.throws)(function () {
                game.move(startPosition, nextPosition);
            });
        });
    });
});
//# sourceMappingURL=Game.test.js.map
//# sourceMappingURL=Game.test.js.map