'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _boardData = require('./testData/board.data.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function assertPosition(actualPosition, expectedPosition) {
    var samePositionAs = _index.Position.hasSamePosition(actualPosition, expectedPosition);
    if (!samePositionAs) (0, _ptzLog2.default)('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);
    assert.ok(samePositionAs, 'samePositionAs');
    assert.equal(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}
function assertPositions(actual, expected) {
    assert.equal(actual.length, expected.length, 'diferent length of actual and expected positions');
    for (var i = 0; i < actual.length; i++) {
        assertPosition(actual[i], expected[i]);
    }
}
describe('Board', function () {
    describe('isBackGroundBlack', function () {
        it('0,0 => true', function () {
            assert.ok(_index.Board.isBackGroundBlack(0, 0));
        });
        it('0,1 => false', function () {
            assert.ok(!_index.Board.isBackGroundBlack(0, 1));
        });
    });
    describe('getY0Start7End', function () {
        it('for white y2 should return 5', function () {
            var y = 2;
            var isBlack = false;
            assert.equal(_index.Board.getY0Start7End(y, isBlack), 5);
        });
        it('for black y2 should return 2', function () {
            var y = 2;
            var isBlack = true;
            assert.equal(_index.Board.getY0Start7End(y, isBlack), 2);
        });
    });
    describe('getY7Start0End', function () {
        it('for white y2 should return 2', function () {
            var y = 2;
            var isBlack = false;
            assert.equal(_index.Board.getY7Start0End(y, isBlack), 2);
        });
        it('for black y2 should return 5', function () {
            var y = 2;
            var isBlack = true;
            assert.equal(_index.Board.getY7Start0End(y, isBlack), 5);
        });
    });
    describe('getInitialBoard', function () {
        it('8x8', function () {
            var _Board$getInitialBoar = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar.board;

            assert.deepEqual(board, _boardData.initialBoard);
        });
        it('memoize', function () {
            var board1 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf);
            var board2 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf);
            assert.equal(board1, board2);
        });
    });
    describe('hasPosition', function () {
        var _Board$getInitialBoar2 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
            board = _Board$getInitialBoar2.board;

        it('x1 y1 should return true', function () {
            var position = { x: 1, y: 1 };
            assert.ok(_index.Board.hasPosition(board, position));
        });
        it('x-1 y0 should return false', function () {
            var position = { x: -1, y: 0 };
            assert.notOk(_index.Board.hasPosition(board, position));
        });
        it('x0 y-1 should return false', function () {
            var position = { x: 0, y: -1 };
            assert.notOk(_index.Board.hasPosition(board, position));
        });
        it('x-1 y-1 should return false', function () {
            var position = { x: -1, y: -1 };
            assert.notOk(_index.Board.hasPosition(board, position));
        });
        it('x8 y1 should return false', function () {
            var position = { x: 8, y: 1 };
            assert.notOk(_index.Board.hasPosition(board, position));
        });
        it('x1 y-8 should return false', function () {
            var position = { x: 1, y: 8 };
            assert.notOk(_index.Board.hasPosition(board, position));
        });
        it('x8 y8 should return false', function () {
            var position = { x: 8, y: 8 };
            assert.notOk(_index.Board.hasPosition(board, position));
        });
    });
    describe('getPosition', function () {
        it('getPosition', function () {
            var _Board$getInitialBoar3 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar3.board;

            var position = { x: 2, y: 3 };
            var actual = _index.Board.getPosition(board, position);
            var expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });
    });
    describe('getNearPositions', function () {
        it('onlyEmpty=false should return only filled near positions', function () {
            var _Board$getInitialBoar4 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar4.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = false;
            var expected = [{ x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=true should return all empty near positions', function () {
            var _Board$getInitialBoar5 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar5.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = true;
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            var actual = _index.Board.getNearPositions(board, position, onlyEmpty);
            (0, _ptzLog2.default)('actual', actual);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=undefined should return all near positions', function () {
            var _Board$getInitialBoar6 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar6.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = undefined;
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
    });
    describe('getJumpPosition', function () {
        it('jumping up and rigth', function () {
            var _Board$getInitialBoar7 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar7.board;

            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up and left', function () {
            var _Board$getInitialBoar8 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar8.board;

            var from = { x: 2, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 0, y: 2 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up', function () {
            var _Board$getInitialBoar9 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar9.board;

            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and rigth', function () {
            var _Board$getInitialBoar10 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar10.board;

            var from = { x: 0, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 2, y: 5 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and left', function () {
            var _Board$getInitialBoar11 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar11.board;

            var from = { x: 2, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 0, y: 5 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down', function () {
            var _Board$getInitialBoar12 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar12.board;

            var from = { x: 1, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 1, y: 5 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('should return undefined because position is not empty', function () {
            var _Board$getInitialBoar13 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar13.board;

            var from = { x: 3, y: 0 };
            var toJumpPosition = { x: 4, y: 0 };
            assert.notOk(_index.Board.getJumpPosition(board, from, toJumpPosition));
        });
    });
    it('printUnicode', function printUnicodeTest() {
        var _Board$getInitialBoar14 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
            board = _Board$getInitialBoar14.board;

        var actual = _index.Board.printUnicode(board);
        assert.equal(actual, _boardData.unicodeStartBoard);
    });
    describe('getColorStartEndRow', function () {
        it('return {startRow: 0, endRow } for black', function () {
            var actual = _index.Board.getColorStartEndRow(_index.Board.defaultBoardConf.endRow, true);
            assert.equal(actual.startRow, 0);
            assert.equal(actual.endRow, 7);
        });
        it('return {startRow: endRow, endRow: 0} for white', function () {
            var actual = _index.Board.getColorStartEndRow(_index.Board.defaultBoardConf.endRow, false);
            assert.equal(actual.startRow, 7);
            assert.equal(actual.endRow, 0);
        });
    });
});
//# sourceMappingURL=Board.test.js.map
//# sourceMappingURL=Board.test.js.map