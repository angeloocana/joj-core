'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../index');

function assertPieces(actual, expected) {
    for (var i = 0; i < actual.length; i++) {
        var actualPiece = actual[i];
        var expectedPiece = expected[i];
        var isSamePositionAs = actualPiece.position.isSamePositionAs(expectedPiece.position);
        if (!isSamePositionAs) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log('assertPieces');
            console.log('actualPiece');
            console.log(actualPiece);
            console.log('expectedPiece');
            console.log(expectedPiece);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        }
        (0, _ptzAssert.ok)(isSamePositionAs, 'isSamePositionAs');
        (0, _ptzAssert.equal)(actualPiece.position.isBlackPiece(), expectedPiece.position.isBlackPiece());
    }
}
function assertColor(actual, expected) {
    (0, _ptzAssert.equal)(actual.endRow, expected.endRow, 'endRow');
    (0, _ptzAssert.equal)(actual.jumps, expected.jumps, 'jumps');
    (0, _ptzAssert.equal)(actual.nMoves, expected.nMoves, 'nMoves');
    assertPieces(actual.pieces, expected.pieces);
    (0, _ptzAssert.equal)(actual.points, expected.points, 'points');
    (0, _ptzAssert.equal)(actual.winners.preWinnersPoints, expected.winners.preWinnersPoints, 'preWinnersPoints actual: ' + actual.winners.preWinnersPoints + ' expected: ' + expected.winners.preWinnersPoints);
    (0, _ptzAssert.equal)(actual.startRow, expected.startRow, 'startRow');
    (0, _ptzAssert.equal)(actual.winners.winners, expected.winners.winners, 'winners');
}
describe('GameColor', function () {
    var boardOptions = { size: { x: 3, y: 3 } };
    it('New white color with default options', function () {
        var isBlack = false;
        var pieces = [new _index.GamePiece(0, 2, isBlack), new _index.GamePiece(1, 2, isBlack), new _index.GamePiece(2, 2, isBlack)];
        var expectedColor = {
            winners: {
                preWinnersPoints: 0,
                winners: 0
            },
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 2,
            endRow: 0,
            pieces: pieces
        };
        var actualColor = new _index.GameColor(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });
    it('New black color with default options', function () {
        var isBlack = true;
        var pieces = [new _index.GamePiece(0, 0, isBlack), new _index.GamePiece(1, 0, isBlack), new _index.GamePiece(2, 0, isBlack)];
        var expectedColor = {
            winners: {
                preWinnersPoints: 0,
                winners: 0
            },
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 0,
            endRow: 2,
            pieces: pieces
        };
        var actualColor = new _index.GameColor(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });
    describe('getColorWinners', function () {
        it('return 0 when new game', function () {
            var color = new _index.GameColor(_index.defaultBoardOptions, false);
            var winners = (0, _index.getColorWinners)(color);
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
        it('return false when new game', function () {
            var color = new _index.GameColor(_index.defaultBoardOptions, false);
            var win = (0, _index.colorWin)(color);
            (0, _ptzAssert.notOk)(win);
        });
        it('return true', function () {
            var color = new _index.GameColor(_index.defaultBoardOptions, false);
            color.winners.winners = 8;
            var win = (0, _index.colorWin)(color);
            (0, _ptzAssert.ok)(win);
        });
    });
});
//# sourceMappingURL=GameColor.test.js.map
//# sourceMappingURL=GameColor.test.js.map