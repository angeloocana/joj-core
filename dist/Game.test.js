'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _index = require('./index');

var _gameData = require('./__tests__/game.data.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            var cleanGame = _index.Game.getCleanGameToSaveOnServer(_gameData.initialGame);
            assert.equal(_gameData.initialGame.ended, cleanGame.ended);
            assert.deepEqual(_gameData.initialGame.movements, cleanGame.movements);
        });
        it('map with movements', function () {
            var move = {
                from: { x: 4, y: 7 },
                to: { x: 4, y: 6 }
            };
            (0, _ptzLog2.default)('before initialGame.movements', _gameData.initialGame.movements);
            var game = _index.Move.getGameAfterMove(_gameData.initialGame, move, false);
            (0, _ptzLog2.default)('game === initialGame: ', game === _gameData.initialGame);
            (0, _ptzLog2.default)('after initialGame.movements', _gameData.initialGame.movements);
            (0, _ptzLog2.default)('game.movements', game.movements);
            var cleanGame = _index.Game.getCleanGameToSaveOnServer(game);
            assert.equal(game.ended, cleanGame.ended);
            assert.equal(cleanGame.movements.length, 1);
            assert.deepEqual(game.movements, cleanGame.movements);
        });
    });
    describe('isMyTurn', function () {
        it('returns true for black piece and black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(_gameData.initialGame, firstMove);
            var from = { x: 5, y: 0 };
            assert.ok(_index.Game.isMyTurn(game, from));
        });
        it('returns true for white piece and white turn', function () {
            var from = { x: 5, y: 7 };
            assert.ok(_index.Game.isMyTurn(_gameData.initialGame, from));
        });
        it('returns false for white piece and black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            (0, _ptzLog2.default)('initialGame', _gameData.initialGame);
            var game = _index.Move.getGameAfterMove(_gameData.initialGame, firstMove);
            var from = { x: 7, y: 7 };
            assert.notOk(_index.Game.isMyTurn(game, from));
        });
        it('returns false for black piece and white turn', function () {
            var from = { x: 5, y: 0 };
            assert.notOk(_index.Game.isMyTurn(_gameData.initialGame, from));
        });
        it('returns false for ended game', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(_gameData.initialGame, firstMove);
            var from = { x: 5, y: 0 };
            // I dont know if it is the best way
            // Are getGameAfterMove supposed to calculate if game is ended???
            game.ended = true;
            assert.notOk(_index.Game.isMyTurn(game, from));
        });
    });
    describe('getPlayerTurn', function () {
        it('return white player when white turn', function () {
            assert.equal(_index.Game.getPlayerTurn(_gameData.initialGame), _gameData.initialGame.players.white);
        });
        it('return black player when black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(_gameData.initialGame, firstMove);
            assert.equal(_index.Game.getPlayerTurn(game), game.players.black);
        });
    });
    describe('getColorTurn', function () {
        it('return white color when white turn', function () {
            assert.equal(_index.Game.getColorTurn(_gameData.initialGame), _gameData.initialGame.white);
        });
        it('return black color when black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(_gameData.initialGame, firstMove);
            assert.equal(_index.Game.getColorTurn(game), game.black);
        });
    });
});
//# sourceMappingURL=Game.test.js.map
//# sourceMappingURL=Game.test.js.map