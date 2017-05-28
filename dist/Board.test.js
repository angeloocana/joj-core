'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

var _indexData = require('./__testdata__/index.data.test');

var TestData = _interopRequireWildcard(_indexData);

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
            var board1 = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var board2 = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            assert.equal(board1, board2);
        });
    });
    describe('hasPosition', function () {
        it('return false for null position', function () {
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, null));
        });
        it('return false for undefined position', function () {
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, undefined));
        });
        it('return false for negative x', function () {
            var position = { x: -1, y: 0 };
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return false for negative y', function () {
            var position = { x: 1, y: -1 };
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return false for negative x and y', function () {
            var position = { x: -1, y: -1 };
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return false for x > 7', function () {
            var position = { x: 8, y: 1 };
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return false for y > 7', function () {
            var position = { x: 7, y: 8 };
            assert.notOk(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return true for x: 0, y: 0', function () {
            var position = { x: 0, y: 0 };
            assert.ok(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return true for x: 1, y: 1', function () {
            var position = { x: 0, y: 0 };
            assert.ok(_index.Board.hasPosition(TestData.initialBoard, position));
        });
        it('return true for x: 7, y: 7', function () {
            var position = { x: 7, y: 7 };
            assert.ok(_index.Board.hasPosition(TestData.initialBoard, position));
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
            (0, _ptzLog2.default)(_index.Board.printUnicodeBoard(TestData.initialBoard));
            (0, _ptzLog2.default)(_index.Board.printXAndYBoard(TestData.initialBoard));
            var actual = _index.Board.getNotEmptyNearPositions(TestData.initialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getEmptyNearPositions', function () {
        it('return all empty near positions', function () {
            var position = { x: 7, y: 7 };
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            var actual = _index.Board.getEmptyNearPositions(TestData.initialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getNearPositions', function () {
        it('return all near positions', function () {
            var position = { x: 7, y: 7 };
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNearPositions(TestData.initialBoard, position);
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
        it('return undefined if position is NOT empty', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 3, y: 0 };
            var toJumpPosition = { x: 4, y: 0 };
            assert.notOk(_index.Board.getJumpPosition(from, toJumpPosition, board));
        });
        it('return undefined if position do NOT exists', function () {
            var board = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
            var from = { x: 0, y: 1 };
            var toJumpPosition = { x: 0, y: 0 };
            assert.notOk(_index.Board.getJumpPosition(from, toJumpPosition, board));
        });
    });
    describe('print', function () {
        it('printUnicode', function printUnicodeTest() {
            var actual = _index.Board.printUnicodeBoard(TestData.initialBoard);
            assert.equal(actual, TestData.unicodeStartBoard);
        });
        it('printXAndY', function printUnicodeTest() {
            var actual = _index.Board.printXAndYBoard(TestData.initialBoard);
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
            var positions = _index.Board.getPositionsWhereCanIGo(TestData.initialBoard, null);
            assert.notOk(positions);
        });
    });
    describe('getCleanBoard', function () {
        it('8x8', function () {
            var board = _index.Board.getCleanBoard({ x: 8, y: 8 });
            var board2 = _index.Board.getCleanBoard({ x: 8, y: 8 });
            assert.deepEqual(board, TestData.cleanBoardExpected);
            assert.equal(board, board2, 'Cache did not worked');
        });
    });
    describe('whereCanIJump', function () {
        it('jump up 5,7 => 5,5 5,3 5,1', function () {
            var pieces = [{ x: 5, y: 7, isBlack: true }, { x: 5, y: 6, isBlack: false }, { x: 5, y: 4, isBlack: false }, { x: 5, y: 2, isBlack: false }];
            var board = _index.Board.getBoardWithPieces(TestData.cleanBoard, pieces);
            var from = { x: 5, y: 7 };
            var p55 = {
                x: 5, y: 5,
                jumpingBlackPiece: false,
                jumps: [from]
            };
            var p53 = {
                x: 5, y: 3,
                jumpingBlackPiece: false,
                jumps: [from, p55]
            };
            var p51 = {
                x: 5, y: 1,
                jumpingBlackPiece: false,
                jumps: [from, p55, p53]
            };
            var whereCanIJump = _index.Board.whereCanIJump(board, from);
            assert.deepEqual(whereCanIJump, [p55, p53, p51]);
        });
    });
    describe('getBoardWhereCanIGo', function () {
        it('jump up 7,7 => 5,7 5,5 3,3 3,5 5,3', function () {
            var pieces = [{ x: 7, y: 7, isBlack: true }, { x: 6, y: 7, isBlack: true }, { x: 5, y: 7, isBlack: true }, { x: 5, y: 6, isBlack: true }, { x: 4, y: 4, isBlack: false }, { x: 3, y: 4, isBlack: false }];
            var board = _index.Board.getBoardWithPieces(TestData.cleanBoard, pieces);
            var from = { x: 7, y: 7 };
            var actual = _index.Board.getBoardWhereCanIGo(board, from);
            // tslint:disable:max-line-length
            var expected = [[{ iCanGoHere: false, x: 0, y: 0 }, { iCanGoHere: false, x: 1, y: 0 }, { iCanGoHere: false, x: 2, y: 0 }, { iCanGoHere: false, x: 3, y: 0 }, { iCanGoHere: false, x: 4, y: 0 }, { iCanGoHere: false, x: 5, y: 0 }, { iCanGoHere: false, x: 6, y: 0 }, { iCanGoHere: false, x: 7, y: 0 }], [{ iCanGoHere: false, x: 0, y: 1 }, { iCanGoHere: false, x: 1, y: 1 }, { iCanGoHere: false, x: 2, y: 1 }, { iCanGoHere: false, x: 3, y: 1 }, { iCanGoHere: false, x: 4, y: 1 }, { iCanGoHere: false, x: 5, y: 1 }, { iCanGoHere: false, x: 6, y: 1 }, { iCanGoHere: false, x: 7, y: 1 }], [{ iCanGoHere: false, x: 0, y: 2 }, { iCanGoHere: false, x: 1, y: 2 }, { iCanGoHere: false, x: 2, y: 2 }, { iCanGoHere: false, x: 3, y: 2 }, { iCanGoHere: false, x: 4, y: 2 }, { iCanGoHere: false, x: 5, y: 2 }, { iCanGoHere: false, x: 6, y: 2 }, { iCanGoHere: false, x: 7, y: 2 }], [{ iCanGoHere: false, x: 0, y: 3 }, { iCanGoHere: false, x: 1, y: 3 }, { iCanGoHere: false, x: 2, y: 3 }, { iCanGoHere: false, x: 3, y: 3 }, { iCanGoHere: false, x: 4, y: 3 }, { iCanGoHere: false, x: 5, y: 3 }, { iCanGoHere: false, x: 6, y: 3 }, { iCanGoHere: false, x: 7, y: 3 }], [{ iCanGoHere: false, x: 0, y: 4 }, { iCanGoHere: false, x: 1, y: 4 }, { iCanGoHere: false, x: 2, y: 4 }, { iCanGoHere: false, x: 3, y: 4, isBlack: false }, { iCanGoHere: false, x: 4, y: 4, isBlack: false }, { iCanGoHere: false, x: 5, y: 4 }, { iCanGoHere: false, x: 6, y: 4 }, { iCanGoHere: false, x: 7, y: 4 }], [{ iCanGoHere: false, x: 0, y: 5 }, { iCanGoHere: false, x: 1, y: 5 }, { iCanGoHere: false, x: 2, y: 5 }, { iCanGoHere: false, x: 3, y: 5 }, { iCanGoHere: false, x: 4, y: 5 }, { iCanGoHere: false, x: 5, y: 5 }, { iCanGoHere: false, x: 6, y: 5 }, { iCanGoHere: false, x: 7, y: 5 }], [{ iCanGoHere: false, x: 0, y: 6 }, { iCanGoHere: false, x: 1, y: 6 }, { iCanGoHere: false, x: 2, y: 6 }, { iCanGoHere: false, x: 3, y: 6 }, { iCanGoHere: false, x: 4, y: 6 }, { iCanGoHere: false, x: 5, y: 6, isBlack: true }, { iCanGoHere: true, x: 6, y: 6 }, { iCanGoHere: true, x: 7, y: 6 }], [{ iCanGoHere: false, x: 0, y: 7 }, { iCanGoHere: false, x: 1, y: 7 }, { iCanGoHere: false, x: 2, y: 7 }, { iCanGoHere: false, x: 3, y: 7 }, { iCanGoHere: false, x: 4, y: 7 }, { iCanGoHere: false, x: 5, y: 7, isBlack: true }, { iCanGoHere: false, x: 6, y: 7, isBlack: true }, { iCanGoHere: false, x: 7, y: 7, isBlack: true }]];
            assert.deepEqual(actual, expected);
        });
    });
    describe('getStartPieces', function () {
        it('8x8', function () {
            var pieces = _index.Board.getStartPieces({ x: 8, y: 8 });
            assert.deepEqual(pieces, TestData.startPiecesExpected);
        });
    });
    describe('getPiecesFromBoard', function () {
        it('get initial pieces', function () {
            var pieces = _index.Board.getPiecesFromBoard(TestData.initialBoard);
            var expectedPieces = {
                white: [{ x: 0, y: 7, isBlack: false }, { x: 1, y: 7, isBlack: false }, { x: 2, y: 7, isBlack: false }, { x: 3, y: 7, isBlack: false }, { x: 4, y: 7, isBlack: false }, { x: 5, y: 7, isBlack: false }, { x: 6, y: 7, isBlack: false }, { x: 7, y: 7, isBlack: false }],
                black: [{ x: 0, y: 0, isBlack: true }, { x: 1, y: 0, isBlack: true }, { x: 2, y: 0, isBlack: true }, { x: 3, y: 0, isBlack: true }, { x: 4, y: 0, isBlack: true }, { x: 5, y: 0, isBlack: true }, { x: 6, y: 0, isBlack: true }, { x: 7, y: 0, isBlack: true }]
            };
            assert.deepEqual(pieces, expectedPieces);
        });
    });
    describe('getPiecesWhereCanIGo', function () {
        it('return white pieces', function () {
            var board = TestData.initialBoard;
            var positions = TestData.startWhitePiecesExpected;
            var expectedPieces = TestData.startWhitePiecesWhereCanIGoExpected;
            var pieces = _index.Board.getPiecesWhereCanIGo(board, positions);
            assert.deepEqual(pieces, expectedPieces);
        });
        it('return black pieces', function () {
            var board = TestData.initialBoard;
            var positions = TestData.startBlackPiecesExpected;
            var expectedPieces = TestData.startBlackPiecesWhereCanIGoExpected;
            var pieces = _index.Board.getPiecesWhereCanIGo(board, positions);
            assert.deepEqual(pieces, expectedPieces);
        });
    });
});
//# sourceMappingURL=Board.test.js.map
//# sourceMappingURL=Board.test.js.map