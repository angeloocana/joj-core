'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _boardData = require('./testData/board.data.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertPosition(actualPosition, expectedPosition) {
    var samePositionAs = (0, _index.isSamePositionAs)(actualPosition, expectedPosition);
    if (!samePositionAs) (0, _ptzLog2.default)('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);
    (0, _ptzAssert.ok)(samePositionAs, 'samePositionAs');
    (0, _ptzAssert.equal)(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}
function assertPositions(actual, expected) {
    (0, _ptzAssert.equal)(actual.length, expected.length, 'diferent length of actual and expected positions');
    for (var i = 0; i < actual.length; i++) {
        assertPosition(actual[i], expected[i]);
    }
}
describe('Board', function () {
    it('generateBoard'
    // , () => {
    //     let board = new Board();
    //     board.generateBoard();
    //     deepEqual(board.board, initialBoard);
    // }
    );
    describe('isBackGroundBlack', function () {
        it('0,0 => true', function () {
            (0, _ptzAssert.ok)((0, _index.isBackGroundBlack)(0, 0));
        });
        it('0,1 => false', function () {
            (0, _ptzAssert.ok)(!(0, _index.isBackGroundBlack)(0, 1));
        });
    });
    describe('positionsContains', function () {
        it('not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            (0, _ptzAssert.notOk)((0, _index.positionsContains)(positions, position));
        });
        it('contains', function () {
            var position = { x: 3, y: 0 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            (0, _ptzAssert.ok)((0, _index.positionsContains)(positions, position));
        });
    });
    describe('positionsNotContains', function () {
        it('not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            (0, _ptzAssert.ok)((0, _index.positionsNotContains)(positions, position));
        });
        it('contains', function () {
            var position = { x: 3, y: 0 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            (0, _ptzAssert.notOk)((0, _index.positionsNotContains)(positions, position));
        });
    });
    describe('getY0Start7End', function () {
        it('for white y2 should return 5', function () {
            var y = 2;
            var isBlack = false;
            (0, _ptzAssert.equal)((0, _index.getY0Start7End)(y, isBlack), 5);
        });
        it('for black y2 should return 2', function () {
            var y = 2;
            var isBlack = true;
            (0, _ptzAssert.equal)((0, _index.getY0Start7End)(y, isBlack), 2);
        });
    });
    describe('getY7Start0End', function () {
        it('for white y2 should return 2', function () {
            var y = 2;
            var isBlack = false;
            (0, _ptzAssert.equal)((0, _index.getY7Start0End)(y, isBlack), 2);
        });
        it('for black y2 should return 5', function () {
            var y = 2;
            var isBlack = true;
            (0, _ptzAssert.equal)((0, _index.getY7Start0End)(y, isBlack), 5);
        });
    });
    describe('getInitialBoard', function () {
        it('8x8', function () {
            var _getInitialBoard = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard.board;

            (0, _ptzLog2.default)('board', board);
            (0, _ptzLog2.default)('initialBoard', _boardData.initialBoard);
            (0, _ptzAssert.deepEqual)(board, _boardData.initialBoard);
        });
        it('memoize', function () {
            var board1 = (0, _index.getInitialBoard)(_index.defaultBoardConf);
            var board2 = (0, _index.getInitialBoard)(_index.defaultBoardConf);
            (0, _ptzAssert.equal)(board1, board2);
        });
    });
    describe('boardHasThisPosition', function () {
        var _getInitialBoard2 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
            board = _getInitialBoard2.board;

        it('x1 y1 should return true', function () {
            var position = { x: 1, y: 1 };
            (0, _ptzAssert.ok)((0, _index.boardHasThisPosition)(board, position));
        });
        it('x-1 y0 should return false', function () {
            var position = { x: -1, y: 0 };
            (0, _ptzAssert.notOk)((0, _index.boardHasThisPosition)(board, position));
        });
        it('x0 y-1 should return false', function () {
            var position = { x: 0, y: -1 };
            (0, _ptzAssert.notOk)((0, _index.boardHasThisPosition)(board, position));
        });
        it('x-1 y-1 should return false', function () {
            var position = { x: -1, y: -1 };
            (0, _ptzAssert.notOk)((0, _index.boardHasThisPosition)(board, position));
        });
        it('x8 y1 should return false', function () {
            var position = { x: 8, y: 1 };
            (0, _ptzAssert.notOk)((0, _index.boardHasThisPosition)(board, position));
        });
        it('x1 y-8 should return false', function () {
            var position = { x: 1, y: 8 };
            (0, _ptzAssert.notOk)((0, _index.boardHasThisPosition)(board, position));
        });
        it('x8 y8 should return false', function () {
            var position = { x: 8, y: 8 };
            (0, _ptzAssert.notOk)((0, _index.boardHasThisPosition)(board, position));
        });
    });
    describe('getPosition', function () {
        it('getPosition', function () {
            var _getInitialBoard3 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard3.board;

            var position = { x: 2, y: 3 };
            var actual = (0, _index.getPosition)(board, position);
            var expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });
    });
    describe('getNearPositions', function () {
        it('onlyEmpty=false should return only filled near positions', function () {
            var _getInitialBoard4 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard4.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = false;
            var expected = [{ x: 6, y: 7, isBlack: false }];
            var actual = (0, _index.getNearPositions)(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=true should return all empty near positions', function () {
            var _getInitialBoard5 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard5.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = true;
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            var actual = (0, _index.getNearPositions)(board, position, onlyEmpty);
            (0, _ptzLog2.default)('actual', actual);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=undefined should return all near positions', function () {
            var _getInitialBoard6 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard6.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = undefined;
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7, isBlack: false }];
            var actual = (0, _index.getNearPositions)(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
    });
    describe('getJumpPosition', function () {
        it('jumping up and rigth', function () {
            var _getInitialBoard7 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard7.board;

            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = (0, _index.getJumpPosition)(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up and left', function () {
            var _getInitialBoard8 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard8.board;

            var from = { x: 2, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 0, y: 2 };
            var actual = (0, _index.getJumpPosition)(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up', function () {
            var _getInitialBoard9 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard9.board;

            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = (0, _index.getJumpPosition)(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and rigth', function () {
            var _getInitialBoard10 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard10.board;

            var from = { x: 0, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 2, y: 5 };
            var actual = (0, _index.getJumpPosition)(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and left', function () {
            var _getInitialBoard11 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard11.board;

            var from = { x: 2, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 0, y: 5 };
            var actual = (0, _index.getJumpPosition)(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down', function () {
            var _getInitialBoard12 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard12.board;

            var from = { x: 1, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 1, y: 5 };
            var actual = (0, _index.getJumpPosition)(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('should return undefined because position is not empty', function () {
            var _getInitialBoard13 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
                board = _getInitialBoard13.board;

            var from = { x: 3, y: 0 };
            var toJumpPosition = { x: 4, y: 0 };
            (0, _ptzAssert.notOk)((0, _index.getJumpPosition)(board, from, toJumpPosition));
        });
    });
    it('printUnicode', function printUnicodeTest() {
        var _getInitialBoard14 = (0, _index.getInitialBoard)(_index.defaultBoardConf),
            board = _getInitialBoard14.board;

        var actual = (0, _index.printUnicode)(board);
        (0, _ptzAssert.equal)(actual, _boardData.unicodeStartBoard);
    });
    describe('getColorStartEndRow', function () {
        it('return {startRow: 0, endRow } for black', function () {
            var actual = (0, _index.getColorStartEndRow)(_index.defaultBoardConf.endRow, true);
            (0, _ptzAssert.equal)(actual.startRow, 0);
            (0, _ptzAssert.equal)(actual.endRow, 7);
        });
        it('return {startRow: endRow, endRow: 0} for white', function () {
            var actual = (0, _index.getColorStartEndRow)(_index.defaultBoardConf.endRow, false);
            (0, _ptzAssert.equal)(actual.startRow, 7);
            (0, _ptzAssert.equal)(actual.endRow, 0);
        });
    });
});
//# sourceMappingURL=Board.test.js.map
//# sourceMappingURL=Board.test.js.map