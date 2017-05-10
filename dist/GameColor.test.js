'use strict';

var _ptzAssert = require('ptz-assert');

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertPieces(actual, expected) {
    for (var i = 0; i < actual.length; i++) {
        var actualPiece = actual[i];
        var expectedPiece = expected[i];
        var samePositionAs = (0, _index.isSamePositionAs)(actualPiece.position, expectedPiece.position);
        if (!samePositionAs) {
            (0, _ptzLog2.default)('assertPieces: actualPiece:', actualPiece, ' \n expectedPiece', expectedPiece);
        }
        (0, _ptzAssert.ok)(samePositionAs, 'isSamePositionAs');
        (0, _ptzAssert.equal)((0, _index.hasBlackPiece)(actualPiece.position), (0, _index.hasBlackPiece)(expectedPiece.position));
        (0, _ptzAssert.equal)((0, _index.hasWhitePiece)(actualPiece.position), (0, _index.hasWhitePiece)(expectedPiece.position));
        (0, _ptzAssert.equal)((0, _index.hasNoPiece)(actualPiece.position), (0, _index.hasNoPiece)(expectedPiece.position));
    }
}
function assertColor(actual, expected) {
    (0, _ptzAssert.equal)(actual.endRow, expected.endRow, 'endRow');
    (0, _ptzAssert.equal)(actual.jumps, expected.jumps, 'jumps');
    (0, _ptzAssert.equal)(actual.nMoves, expected.nMoves, 'nMoves');
    assertPieces(actual.pieces, expected.pieces);
    (0, _ptzAssert.equal)(actual.points, expected.points, 'points');
    (0, _ptzAssert.equal)(actual.score.preWinnersPoints, expected.score.preWinnersPoints, 'preWinnersPoints actual: ' + actual.score.preWinnersPoints + ' expected: ' + expected.score.preWinnersPoints);
    (0, _ptzAssert.equal)(actual.startRow, expected.startRow, 'startRow');
    (0, _ptzAssert.equal)(actual.score.winners, expected.score.winners, 'winners');
}
describe('GameColor', function () {
    describe('createGameColor', function () {
        var miniBoardConf = (0, _index.getBoardConf)({ x: 3, y: 3 });
        it('New white color with default options', function () {
            var isBlack = false;
            var pieces = [(0, _index.createPiece)(0, 2, isBlack), (0, _index.createPiece)(1, 2, isBlack), (0, _index.createPiece)(2, 2, isBlack)];
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
            var actualColor = (0, _index.createGameColor)(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
        it('New black color with default options', function () {
            var isBlack = true;
            var pieces = [(0, _index.createPiece)(0, 0, isBlack), (0, _index.createPiece)(1, 0, isBlack), (0, _index.createPiece)(2, 0, isBlack)];
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
            var actualColor = (0, _index.createGameColor)(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
    });
    describe('getColorScore', function () {
        it('return 0 when new game', function () {
            var color = (0, _index.createGameColor)(_index.defaultBoardConf, false, []);
            var winners = (0, _index.getColorScore)(color);
            (0, _ptzAssert.equal)(winners.preWinnersPoints, 0);
            (0, _ptzAssert.equal)(winners.winners, 0);
        });
        it('return 1');
        it('return 2');
        it('return 3');
        it('return 4');
        it('return 5');
        it('return 6');
        it('return 7');
        it('return 8');
    });
    describe('colorWin', function () {
        var _getInitialBoard = (0, _index.getInitialBoard)(_index.defaultBoardConf),
            blackPieces = _getInitialBoard.blackPieces;

        (0, _ptzLog2.default)('blackPieces', blackPieces);
        it('return false when new game', function () {
            var color = (0, _index.createGameColor)(_index.defaultBoardConf, false, blackPieces);
            var win = (0, _index.colorWin)(color);
            (0, _ptzLog2.default)('color', color);
            (0, _ptzAssert.notOk)(win);
        });
        it('return true', function () {
            var color = (0, _index.createGameColor)(_index.defaultBoardConf, false, blackPieces);
            color.score.winners = 8;
            var win = (0, _index.colorWin)(color);
            (0, _ptzLog2.default)('color', color);
            (0, _ptzAssert.ok)(win);
        });
    });
});
//# sourceMappingURL=GameColor.test.js.map
//# sourceMappingURL=GameColor.test.js.map