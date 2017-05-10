'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Game', function () {
    describe('create', function () {
        it('creates a new game');
    });
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
            var game = _index.Game.create({ players: players });
            var gameBeforeLastMove = _index.Game.getGameAfterMove(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            game = _index.Game.getGameAfterMove(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });
            game = _index.Game.getGameBeforeLastMove(game);
            assert.equal(gameBeforeLastMove.movements.length, game.movements.length);
            assert.deepEqual(gameBeforeLastMove.movements, game.movements);
        });
    });
    describe('Move', function () {
        var game;
        beforeEach(function () {
            game = _index.Game.create({
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
            assert.throws(function () {
                game = _index.Game.getGameAfterMove(game, move);
            });
        });
    });
    describe('getCleanGameToSaveOnServer', function () {
        it('map', function () {
            var game = _index.Game.create({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            var cleanGame = _index.Game.getCleanGameToSaveOnServer(game);
            assert.equal(game.ended, cleanGame.ended);
            assert.deepEqual(game.movements, cleanGame.movements);
            assert.equal(game.blackWin, cleanGame.blackWin);
        });
    });
});
//# sourceMappingURL=Game.test.js.map
//# sourceMappingURL=Game.test.js.map