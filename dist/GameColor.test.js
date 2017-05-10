'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function assertColor(actual, expected) {
    assert.equal(actual.endRow, expected.endRow, 'endRow');
    assert.equal(actual.jumps, expected.jumps, 'jumps');
    assert.equal(actual.nMoves, expected.nMoves, 'nMoves');
    assert.ok(_index.Pieces.haveSamePieceAndPosition(actual.pieces, expected.pieces));
    // assert.equal(actual.points, expected.points, 'points');
    // assert.equal(actual.score.preWinnersPoints, expected.score.preWinnersPoints,
    //     `preWinnersPoints actual: ${actual.score.preWinnersPoints} expected: ${expected.score.preWinnersPoints}`);
    // assert.equal(actual.startRow, expected.startRow, 'startRow');
    // assert.equal(actual.score.winners, expected.score.winners, 'winners');
}
describe('GameColor', function () {
    describe('GameColor.create', function () {
        var miniBoardConf = _index.Board.getBoardConf({ x: 3, y: 3 });
        it('New white color with default options', function () {
            var isBlack = false;
            var pieces = _index.Pieces.createBlackPieces([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
            var expectedColor = {
                score: {
                    preWinnersPoints: 0,
                    winners: 0
                },
                jumps: 0,
                points: 0,
                nMoves: 0,
                startRow: 2,
                endRow: 0,
                pieces: pieces,
                isBlack: isBlack
            };
            var actualColor = _index.GameColor.create(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
        it('New black color with default options', function () {
            var isBlack = true;
            var pieces = _index.Pieces.createBlackPieces([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]);
            var expectedColor = {
                score: {
                    preWinnersPoints: 0,
                    winners: 0
                },
                jumps: 0,
                points: 0,
                nMoves: 0,
                startRow: 0,
                endRow: 2,
                pieces: pieces,
                isBlack: isBlack
            };
            var actualColor = _index.GameColor.create(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
    });
    describe('getColorScore', function () {
        it('return 0', function () {
            var pieces = _index.Pieces.createWhitePieces([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }]);
            var color = _index.GameColor.create(_index.Board.defaultBoardConf, true, pieces);
            var score = _index.GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
            assert.equal(score.winners, 0, 'winners');
        });
        it('return 1', function () {
            var pieces = _index.Pieces.createBlackPieces([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }]);
            var color = _index.GameColor.create(_index.Board.defaultBoardConf, true, pieces);
            var score = _index.GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 21, 'preWinnersPoints');
            assert.equal(score.winners, 1, 'winners');
        });
        it('return 2', function () {
            var pieces = _index.Pieces.createBlackPieces([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 7, y: 7 }]);
            var color = _index.GameColor.create(_index.Board.defaultBoardConf, true, pieces);
            var score = _index.GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 15, 'preWinnersPoints');
            assert.equal(score.winners, 2, 'winners');
        });
        it('return 8', function () {
            var pieces = _index.Pieces.createBlackPieces([{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }]);
            var color = _index.GameColor.create(_index.Board.defaultBoardConf, true, pieces);
            var score = _index.GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
            assert.equal(score.winners, 8, 'winners');
        });
    });
    describe('colorWin', function () {
        var _Board$getInitialBoar = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
            blackPieces = _Board$getInitialBoar.blackPieces;

        (0, _ptzLog2.default)('blackPieces', blackPieces);
        it('return false when new game', function () {
            var color = _index.GameColor.create(_index.Board.defaultBoardConf, false, blackPieces);
            var won = _index.GameColor.hasWon(color);
            assert.notOk(won);
        });
        it('return true', function () {
            var color = _index.GameColor.create(_index.Board.defaultBoardConf, false, blackPieces);
            color.score.winners = 8;
            var won = _index.GameColor.hasWon(color);
            assert.ok(won);
        });
    });
});
//# sourceMappingURL=GameColor.test.js.map
//# sourceMappingURL=GameColor.test.js.map