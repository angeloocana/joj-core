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
    describe('getCleanGameToSaveOnServer', function () {
        it('map no movements', function () {
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
        it('map with movements', function () {
            var game = _index.Game.create({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            var move = {
                from: { x: 4, y: 7 },
                to: { x: 4, y: 6 }
            };
            game = _index.Move.getGameAfterMove(game, move, false);
            var cleanGame = _index.Game.getCleanGameToSaveOnServer(game);
            assert.equal(game.ended, cleanGame.ended);
            assert.equal(cleanGame.movements.length, 1);
            assert.deepEqual(game.movements, cleanGame.movements);
            assert.equal(game.blackWin, cleanGame.blackWin);
        });
    });
});
//# sourceMappingURL=Game.test.js.map
//# sourceMappingURL=Game.test.js.map