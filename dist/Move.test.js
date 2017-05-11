'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Move', function () {
    describe('getBackMove', function () {
        it('invert move {from:0,7 to:1,6} => {from:1,6 to:0,7}', function () {
            var move = {
                from: { x: 0, y: 7 },
                to: { x: 1, y: 6 }
            };
            var backMove = _index.Move.getBackMove(move);
            assert.equal(backMove.from, move.to);
            assert.equal(backMove.to, move.from);
        });
    });
    describe('backMove', function () {
        it('backMove offline game', function () {
            var players = {
                white: { name: 'Angelo', foto: 'img/black_user.png' },
                black: { name: 'Gabi', foto: 'img/white_user.png' }
            };
            var game = _index.Game.create({ players: players });
            var gameBeforeLastMove = _index.Move.getGameAfterMove(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            game = _index.Move.getGameAfterMove(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });
            game = _index.Move.getGameBeforeLastMove(game);
            assert.equal(gameBeforeLastMove.movements.length, game.movements.length);
            assert.deepEqual(gameBeforeLastMove.movements, game.movements);
        });
    });
    describe('getGameAfterMove', function () {
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
                game = _index.Move.getGameAfterMove(game, move);
            });
        });
    });
});
//# sourceMappingURL=Move.test.js.map
//# sourceMappingURL=Move.test.js.map