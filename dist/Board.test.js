'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _boardData = require('./__testdata__/board.data.test');

var TestData = _interopRequireWildcard(_boardData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function assertPosition(actualPosition, expectedPosition) {
    var samePositionAs = _index.Position.hasSameXY(actualPosition, expectedPosition);
    if (!samePositionAs) (0, _ptzLog2.default)('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);
    assert.ok(samePositionAs, 'samePositionAs');
    assert.equal(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}
describe('Board', function () {
    describe('getInitialBoard', function () {
        it('8x8', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            assert.deepEqual(board, TestData.initialBoardExpected);
        });
        it('memoize', function () {
            // $FIX
            // const board1 = Board.getInitialBoard(Board.getBoardConf Board.defaultBoardSize);
            // const board2 = Board.getInitialBoard(Board.defaultBoardSize);
            // assert.equal(board1, board2);
        });
    });
    describe('hasPosition', function () {
        it('return false for null position', function () {
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, null));
        });
        it('return false for undefined position', function () {
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, undefined));
        });
        it('return false for negative x', function () {
            var position = { x: -1, y: 0 };
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return false for negative y', function () {
            var position = { x: 1, y: -1 };
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return false for negative x and y', function () {
            var position = { x: -1, y: -1 };
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return false for x > 7', function () {
            var position = { x: 8, y: 1 };
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return false for y > 7', function () {
            var position = { x: 7, y: 8 };
            assert.notOk(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return true for x: 0, y: 0', function () {
            var position = { x: 0, y: 0 };
            assert.ok(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return true for x: 1, y: 1', function () {
            var position = { x: 0, y: 0 };
            assert.ok(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
        it('return true for x: 7, y: 7', function () {
            var position = { x: 7, y: 7 };
            assert.ok(_index.Board.hasPosition(TestData.defaultInitialBoard, position));
        });
    });
    describe('getPosition', function () {
        it('valid position', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var position = { x: 2, y: 3 };
            var actual = _index.Board.getPosition(board, position);
            var expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });
        it('invalid position', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var position = { x: -2, y: -3 };
            assert.throws(function () {
                return _index.Board.getPosition(board, position);
            });
        });
    });
    describe('setPosition', function () {
        it('valid position', function () {
            var oldBoard = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var xy = { x: 2, y: 3 };
            var newBoard = _index.Board.setPosition(oldBoard, xy);
            assert.equal(_index.Board.getPosition(newBoard, xy), xy, 'different position');
            assert.notEqual(newBoard, oldBoard, 'same instance');
            assert.notEqual(_index.Board.getPosition(newBoard, xy), _index.Board.getPosition(oldBoard, xy), 'same instance');
        });
    });
    describe('_getNearPositions', function () {
        it('caches nearPositions', function () {
            // Repeat params to get different instances.
            var firstCall = _index.Board._getNearPositions({ x: 8, y: 8 }, { x: 0, y: 0 });
            var secondCall = _index.Board._getNearPositions({ x: 8, y: 8 }, { x: 0, y: 0 });
            assert.equal(firstCall, secondCall, 'Not same instance');
        });
    });
    describe('getNotEmptyNearPositions', function () {
        it('return only filled near positions', function () {
            var position = { x: 7, y: 7 };
            var expected = [{ x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNotEmptyNearPositions(TestData.defaultInitialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getEmptyNearPositions', function () {
        it('return all empty near positions', function () {
            var position = { x: 7, y: 7 };
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            var actual = _index.Board.getEmptyNearPositions(TestData.defaultInitialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getNearPositions', function () {
        it('return all near positions', function () {
            var position = { x: 7, y: 7 };
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNearPositions(TestData.defaultInitialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getJumpPosition', function () {
        it('jumping up and right', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = _index.Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping up and left', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 2, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 0, y: 2 };
            var actual = _index.Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping up', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = _index.Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping down and right', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 0, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 2, y: 5 };
            var actual = _index.Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping down and left', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 2, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 0, y: 5 };
            var actual = _index.Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping down', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 1, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 1, y: 5 };
            var actual = _index.Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('should return undefined because position is not empty', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 3, y: 0 };
            var toJumpPosition = { x: 4, y: 0 };
            assert.notOk(_index.Board.getJumpPosition(from, toJumpPosition, board));
        });
    });
    describe('print', function () {
        it('printUnicode', function printUnicodeTest() {
            var actual = _index.Board.printUnicodeBoard(TestData.defaultInitialBoard);
            assert.equal(actual, TestData.unicodeStartBoard);
        });
        it('printXAndY', function printUnicodeTest() {
            var actual = _index.Board.printXAndYBoard(TestData.defaultInitialBoard);
            assert.equal(actual, TestData.xAndYStartBoard);
        });
    });
    describe('getStartEndRow', function () {
        it('return {startRow: 0, endRow } for black', function () {
            var actual = _index.Board.getStartEndRow(7, true);
            assert.equal(actual.startRow, 0);
            assert.equal(actual.endRow, 7);
        });
        it('return {startRow: endRow, endRow: 0} for white', function () {
            var actual = _index.Board.getStartEndRow(7, false);
            assert.equal(actual.startRow, 7);
            assert.equal(actual.endRow, 0);
        });
    });
    describe('getPositionsWhereCanIGo', function () {
        it('return null for invalid from', function () {
            var positions = _index.Board.getPositionsWhereCanIGo(TestData.defaultInitialBoard, null, true);
            assert.notOk(positions);
        });
    });
});
//# sourceMappingURL=Board.test.js.map
//# sourceMappingURL=Board.test.js.map