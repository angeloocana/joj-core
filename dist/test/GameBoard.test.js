'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../index');

var _boardData = require('./testData/board.data.test');

function assertPosition(actualPosition, expectedPosition) {
    var isSamePositionAs = actualPosition.isSamePositionAs(expectedPosition);
    if (!isSamePositionAs) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('actualPosition');
        console.log(actualPosition);
        console.log('expectedPosition');
        console.log(expectedPosition);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    }
    (0, _ptzAssert.ok)(isSamePositionAs, 'isSamePositionAs');
    (0, _ptzAssert.equal)(actualPosition.isBlackPiece(), expectedPosition.isBlackPiece(), 'Is same piece');
}
function assertPositions(actual, expected) {
    for (var i = 0; i < actual.length; i++) {
        var actualPosition = actual[i];
        var expectedPosition = expected[i];
        assertPosition(actualPosition, expectedPosition);
    }
}
describe('GameBoard', function () {
    describe('New with defaults', function () {
        var board = void 0;
        beforeEach(function () {
            board = new _index.GameBoard();
            var white = new _index.GameColor(board.boardOptions, false);
            var black = new _index.GameColor(board.boardOptions, true);
            board.fillAllPiecesOnBoard(white.pieces, black.pieces);
        });
        it('has 8 columns', function () {
            (0, _ptzAssert.equal)(board.board.length, 8);
        });
        it('has 8 rows', function () {
            (0, _ptzAssert.equal)(board.board[0].length, 8);
            (0, _ptzAssert.equal)(board.board[7].length, 8);
        });
        it('boardStartPositions'
        // , () => {
        //     deepEqual(board.board, boardStartPositions);
        // }
        );
        describe('boardHasThisPosition', function () {
            it('x1 y1 should return true', function () {
                var position = new _index.BoardPosition({ x: 1, y: 1 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), true);
            });
            it('x-1 y0 should return false', function () {
                var position = new _index.BoardPosition({ x: -1, y: 0 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it('x0 y-1 should return false', function () {
                var position = new _index.BoardPosition({ x: 0, y: -1 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it('x-1 y-1 should return false', function () {
                var position = new _index.BoardPosition({ x: -1, y: -1 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it('x8 y1 should return false', function () {
                var position = new _index.BoardPosition({ x: 8, y: 1 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it('x1 y-8 should return false', function () {
                var position = new _index.BoardPosition({ x: 1, y: 8 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it('x8 y8 should return false', function () {
                var position = new _index.BoardPosition({ x: 8, y: 8 });
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
        });
        it('getPosition', function () {
            var position = new _index.BoardPosition({ x: 2, y: 3 });
            var actual = board.getPosition(position);
            var expected = new _index.BoardPosition({ x: 2, y: 3 });
            assertPosition(actual, expected);
        });
        describe('getNearPositions', function () {
            var position = new _index.BoardPosition({ x: 7, y: 7 });
            it('onlyEmpty=false should return only filled near positions', function () {
                var onlyEmpty = false;
                var expected = [new _index.BoardPosition({ x: 6, y: 7, isBlackPiece: false })];
                var actual = board.getNearPositions(position, onlyEmpty);
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // console.log("onlyEmpty=false should return only filled near positions");
                // console.log("actual");
                // console.log(actual);
                // console.log("expected");
                // console.log(expected);
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                assertPositions(actual, expected);
            });
            it('onlyEmpty=true should return all empty near positions', function () {
                var onlyEmpty = true;
                var expected = [new _index.BoardPosition({ x: 6, y: 6 }), new _index.BoardPosition({ x: 7, y: 6 })];
                var actual = board.getNearPositions(position, onlyEmpty);
                assertPositions(actual, expected);
            });
            it('onlyEmpty=undefined should return all near positions', function () {
                var onlyEmpty = undefined;
                var expected = [new _index.BoardPosition({ x: 6, y: 6 }), new _index.BoardPosition({ x: 7, y: 6 }), new _index.BoardPosition({ x: 6, y: 7, isBlackPiece: false })];
                var actual = board.getNearPositions(position, onlyEmpty);
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // console.log("onlyEmpty=undefined should return all near positions");
                // console.log("actual");
                // console.log(actual);
                // console.log("expected");
                // console.log(expected);
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                assertPositions(actual, expected);
            });
        });
        describe('getJumpPosition', function () {
            it('jumping up and rigth', function () {
                var startPosition = new _index.BoardPosition({ x: 0, y: 0 });
                var toJumpPosition = new _index.BoardPosition({ x: 1, y: 1 });
                var expected = new _index.BoardPosition({ x: 2, y: 2 });
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });
            it('jumping up and left', function () {
                var startPosition = new _index.BoardPosition({ x: 2, y: 0 });
                var toJumpPosition = new _index.BoardPosition({ x: 1, y: 1 });
                var expected = new _index.BoardPosition({ x: 0, y: 2 });
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });
            it('jumping up', function () {
                var startPosition = new _index.BoardPosition({ x: 0, y: 0 });
                var toJumpPosition = new _index.BoardPosition({ x: 1, y: 1 });
                var expected = new _index.BoardPosition({ x: 2, y: 2 });
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });
            it('jumping down and rigth', function () {
                var startPosition = new _index.BoardPosition({ x: 0, y: 7 });
                var toJumpPosition = new _index.BoardPosition({ x: 1, y: 6 });
                var expected = new _index.BoardPosition({ x: 2, y: 5 });
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });
            it('jumping down and left', function () {
                var startPosition = new _index.BoardPosition({ x: 2, y: 7 });
                var toJumpPosition = new _index.BoardPosition({ x: 1, y: 6 });
                var expected = new _index.BoardPosition({ x: 0, y: 5 });
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });
            it('jumping down', function () {
                var startPosition = new _index.BoardPosition({ x: 1, y: 7 });
                var toJumpPosition = new _index.BoardPosition({ x: 1, y: 6 });
                var expected = new _index.BoardPosition({ x: 1, y: 5 });
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });
            it('should return undefined because position is not empty', function () {
                var startPosition = new _index.BoardPosition({ x: 3, y: 0 });
                var toJumpPosition = new _index.BoardPosition({ x: 4, y: 0 });
                (0, _ptzAssert.notOk)(board.getJumpPosition(startPosition, toJumpPosition));
            });
        });
        it('printUnicode', function printUnicodeTest() {
            var actual = board.printUnicode();
            (0, _ptzAssert.equal)(actual, _boardData.unicodeStartBoard);
        });
    });
    it('generateBoard'
    // , () => {
    //     let board = new GameBoard();
    //     board.generateBoard();
    //     deepEqual(board.board, cleanBoard);
    // }
    );
});
//# sourceMappingURL=GameBoard.test.js.map
//# sourceMappingURL=GameBoard.test.js.map