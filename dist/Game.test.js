'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

describe('Game', function () {
    describe('needToValidateMovements', function () {
        it('when null should validate');
        it('when undefined should validate');
        it('when true should validate');
        it('when false should NOT validate');
    });
    describe('backMove', function () {
        it('backMove offline game', function () {
            var players = {
                white: { name: 'Angelo', foto: 'img/black_user.png' },
                black: { name: 'Gabi', foto: 'img/white_user.png' }
            };
            var game = (0, _index.createGame)({ players: players });
            var gameBeforeLastMove = (0, _index.getGameAfterMove)(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            game = (0, _index.getGameAfterMove)(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });
            game = (0, _index.getGameBeforeLastMove)(game);
            (0, _ptzAssert.equal)(gameBeforeLastMove.movements.length, game.movements.length);
            (0, _ptzAssert.deepEqual)(gameBeforeLastMove.movements, game.movements);
        });
    });
    describe('Move', function () {
        var game;
        beforeEach(function () {
            game = (0, _index.createGame)({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
        });
        it('Block moving to same position', function () {
            var move = {
                from: { x: 0, y: 0 },
                to: { x: 0, y: 0 }
            };
            (0, _ptzAssert.throws)(function () {
                game = (0, _index.getGameAfterMove)(game, move);
            });
        });
    });
    describe('getCleanGameToSaveOnServer', function () {
        it('map', function () {
            var game = (0, _index.createGame)({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            var cleanGame = (0, _index.getCleanGameToSaveOnServer)(game);
            (0, _ptzAssert.equal)(game.ended, cleanGame.ended);
            (0, _ptzAssert.deepEqual)(game.movements, cleanGame.movements);
            (0, _ptzAssert.equal)(game.blackWin, cleanGame.blackWin);
        });
    });
});
//# sourceMappingURL=Game.test.js.map
//# sourceMappingURL=Game.test.js.map