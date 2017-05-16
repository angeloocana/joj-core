'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _indexData = require('./__testdata__/index.data.test');

var TestData = _interopRequireWildcard(_indexData);

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
    describe('isMyTurn', function () {
        it('returns true for black piece and black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var moveFrom = { x: 5, y: 0 };
            var game = _index.Move.getGameAfterMove(TestData.initialGame, firstMove);
            assert.ok(_index.Game.isMyTurn(game, moveFrom));
        });
        it('returns true for white piece and white turn', function () {
            var from = { x: 5, y: 7 };
            assert.ok(_index.Game.isMyTurn(TestData.initialGame, from));
        });
        it('returns false for white piece and black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(TestData.initialGame, firstMove);
            var from = { x: 7, y: 7 };
            assert.notOk(_index.Game.isMyTurn(game, from));
        });
        it('returns false for black piece and white turn', function () {
            var from = { x: 5, y: 0 };
            assert.notOk(_index.Game.isMyTurn(TestData.initialGame, from));
        });
        it('returns false for ended game', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(TestData.initialGame, firstMove);
            var from = { x: 5, y: 0 };
            // $Fix
            // I dont know if it is the best way
            // Are getGameAfterMove supposed to calculate if game is ended???
            game.score.ended = true;
            assert.notOk(_index.Game.isMyTurn(game, from));
        });
    });
    describe('getPlayerTurn', function () {
        it('return white player when white turn', function () {
            assert.equal(_index.Game.getPlayerTurn(TestData.initialGame), TestData.initialGame.players.white);
        });
        it('return black player when black turn', function () {
            var firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            var game = _index.Move.getGameAfterMove(TestData.initialGame, firstMove);
            assert.equal(_index.Game.getPlayerTurn(game), game.players.black);
        });
    });
    describe('getTurnPieces', function () {
        it('return white pieces', function () {
            var game = _index.Game.createGame();
            var pieces = _index.Game.getTurnPieces(game);
            var expectedPieces = TestData.startWhitePiecesExpected;
            assert.deepEqual(pieces, expectedPieces);
        });
        it('return black pieces', function () {
            var game = _index.Move.getGameAfterMove(_index.Game.createGame(), { from: { x: 0, y: 7 }, to: { x: 0, y: 6 } });
            var pieces = _index.Game.getTurnPieces(game);
            var expectedPieces = TestData.startBlackPiecesExpected;
            assert.deepEqual(pieces, expectedPieces);
        });
    });
    describe('getTurnPiecesWhereCanIGo', function () {
        it('return white pieces', function () {
            var game = _index.Game.createGame();
            var pieces = _index.Game.getTurnPiecesWhereCanIGo(game);
            var expectedPieces = TestData.startWhitePiecesWhereCanIGoExpected;
            assert.deepEqual(pieces, expectedPieces);
        });
        it('return black pieces', function () {
            var game = _index.Move.getGameAfterMove(_index.Game.createGame(), { from: { x: 0, y: 7 }, to: { x: 0, y: 6 } });
            var pieces = _index.Game.getTurnPiecesWhereCanIGo(game);
            var expectedPieces = TestData.startBlackPiecesWhereCanIGoExpected;
            assert.deepEqual(pieces, expectedPieces);
        });
    });
});
//# sourceMappingURL=Game.test.js.map
//# sourceMappingURL=Game.test.js.map