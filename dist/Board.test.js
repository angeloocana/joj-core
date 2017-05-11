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
        it('return false for null position', function () {
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, null));
        });
        it('return false for undefined position', function () {
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, undefined));
        });
        it('return false for negative x', function () {
            var position = { x: -1, y: 0 };
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return false for negative y', function () {
            var position = { x: 1, y: -1 };
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return false for negative x and y', function () {
            var position = { x: -1, y: -1 };
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return false for x > 7', function () {
            var position = { x: 8, y: 1 };
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return false for y > 7', function () {
            var position = { x: 7, y: 8 };
            assert.notOk(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return true for x: 0, y: 0', function () {
            var position = { x: 0, y: 0 };
            assert.ok(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return true for x: 1, y: 1', function () {
            var position = { x: 0, y: 0 };
            assert.ok(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
        it('return true for x: 7, y: 7', function () {
            var position = { x: 7, y: 7 };
            assert.ok(_index.Board.hasPosition(_index.Board.defaultInitialBoard, position));
        });
    });
    describe('getPosition', function () {
        it('valid position', function () {
            var _Board$getInitialBoar2 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar2.board;

            var position = { x: 2, y: 3 };
            var actual = _index.Board.getPosition(board, position);
            var expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });
        it('invalid position', function () {
            var _Board$getInitialBoar3 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar3.board;

            var position = { x: -2, y: -3 };
            assert.throws(function () {
                return _index.Board.getPosition(board, position);
            });
        });
    });
    describe('setPosition', function () {
        it('valid position', function () {
            var _Board$getInitialBoar4 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar4.board;

            var position = { x: 2, y: 3 };
            board = _index.Board.setPosition(board, position);
            assert.equal(board[position.x][position.y], position);
        });
        it('invalid position', function () {
            var _Board$getInitialBoar5 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar5.board;

            var position = { x: -2, y: -3 };
            assert.throws(function () {
                return _index.Board.setPosition(board, position);
            });
        });
    });
    describe('getNearPositions', function () {
        it('onlyEmpty=false should return only filled near positions', function () {
            var _Board$getInitialBoar6 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar6.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = false;
            var expected = [{ x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=true should return all empty near positions', function () {
            var _Board$getInitialBoar7 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar7.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = true;
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            var actual = _index.Board.getNearPositions(board, position, onlyEmpty);
            (0, _ptzLog2.default)('actual', actual);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=undefined should return all near positions', function () {
            var _Board$getInitialBoar8 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar8.board;

            var position = { x: 7, y: 7 };
            var onlyEmpty = undefined;
            var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7, isBlack: false }];
            var actual = _index.Board.getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
    });
    describe('getJumpPosition', function () {
        it('jumping up and rigth', function () {
            var _Board$getInitialBoar9 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar9.board;

            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up and left', function () {
            var _Board$getInitialBoar10 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar10.board;

            var from = { x: 2, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 0, y: 2 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up', function () {
            var _Board$getInitialBoar11 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar11.board;

            var from = { x: 0, y: 0 };
            var toJumpPosition = { x: 1, y: 1 };
            var expected = { x: 2, y: 2 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and rigth', function () {
            var _Board$getInitialBoar12 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar12.board;

            var from = { x: 0, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 2, y: 5 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and left', function () {
            var _Board$getInitialBoar13 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar13.board;

            var from = { x: 2, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 0, y: 5 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down', function () {
            var _Board$getInitialBoar14 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar14.board;

            var from = { x: 1, y: 7 };
            var toJumpPosition = { x: 1, y: 6 };
            var expected = { x: 1, y: 5 };
            var actual = _index.Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('should return undefined because position is not empty', function () {
            var _Board$getInitialBoar15 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
                board = _Board$getInitialBoar15.board;

            var from = { x: 3, y: 0 };
            var toJumpPosition = { x: 4, y: 0 };
            assert.notOk(_index.Board.getJumpPosition(board, from, toJumpPosition));
        });
    });
    it('printUnicode', function printUnicodeTest() {
        var _Board$getInitialBoar16 = _index.Board.getInitialBoard(_index.Board.defaultBoardConf),
            board = _Board$getInitialBoar16.board;

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
    describe('getToSearchOrder', function () {
        it('return 0 for 0', function () {
            return assert.equal(_index.Board.getToSearchOrder(0), 0);
        });
        it('return 1 for 7', function () {
            return assert.equal(_index.Board.getToSearchOrder(7), 1);
        });
        it('return 2 for 1', function () {
            return assert.equal(_index.Board.getToSearchOrder(1), 2);
        });
        it('return 3 for 6', function () {
            return assert.equal(_index.Board.getToSearchOrder(6), 3);
        });
        it('return 4 for 2', function () {
            return assert.equal(_index.Board.getToSearchOrder(2), 4);
        });
        it('return 5 for 5', function () {
            return assert.equal(_index.Board.getToSearchOrder(5), 5);
        });
        it('return 6 for 3', function () {
            return assert.equal(_index.Board.getToSearchOrder(3), 6);
        });
        it('return 7 for 4', function () {
            return assert.equal(_index.Board.getToSearchOrder(4), 7);
        });
        it('return null for invalid x', function () {
            return assert.notOk(_index.Board.getToSearchOrder(-1));
        });
    });
    describe('getY0Start7End', function () {
        describe('for white', function () {
            it('return 7 for 0', function () {
                return assert.equal(_index.Board.getY0Start7End(0, false), 7);
            });
            it('return 6 for 1', function () {
                return assert.equal(_index.Board.getY0Start7End(1, false), 6);
            });
            it('return 5 for 2', function () {
                return assert.equal(_index.Board.getY0Start7End(2, false), 5);
            });
            it('return 4 for 3', function () {
                return assert.equal(_index.Board.getY0Start7End(3, false), 4);
            });
            it('return 3 for 4', function () {
                return assert.equal(_index.Board.getY0Start7End(4, false), 3);
            });
            it('return 2 for 5', function () {
                return assert.equal(_index.Board.getY0Start7End(5, false), 2);
            });
            it('return 1 for 6', function () {
                return assert.equal(_index.Board.getY0Start7End(6, false), 1);
            });
            it('return 0 for 7', function () {
                return assert.equal(_index.Board.getY0Start7End(7, false), 0);
            });
            it('return null for invalid x', function () {
                return assert.notOk(_index.Board.getY0Start7End(-1, false));
            });
        });
        describe('for black', function () {
            it('return 0 for 0', function () {
                return assert.equal(_index.Board.getY0Start7End(0, true), 0);
            });
            it('return 1 for 1', function () {
                return assert.equal(_index.Board.getY0Start7End(1, true), 1);
            });
            it('return 2 for 2', function () {
                return assert.equal(_index.Board.getY0Start7End(2, true), 2);
            });
            it('return 3 for 3', function () {
                return assert.equal(_index.Board.getY0Start7End(3, true), 3);
            });
            it('return 4 for 4', function () {
                return assert.equal(_index.Board.getY0Start7End(4, true), 4);
            });
            it('return 5 for 5', function () {
                return assert.equal(_index.Board.getY0Start7End(5, true), 5);
            });
            it('return 6 for 6', function () {
                return assert.equal(_index.Board.getY0Start7End(6, true), 6);
            });
            it('return 7 for 7', function () {
                return assert.equal(_index.Board.getY0Start7End(7, true), 7);
            });
        });
    });
    describe('getY7Start0End', function () {
        describe('for white', function () {
            it('return 0 for 0', function () {
                return assert.equal(_index.Board.getY7Start0End(0, false), 0);
            });
            it('return 1 for 1', function () {
                return assert.equal(_index.Board.getY7Start0End(1, false), 1);
            });
            it('return 2 for 2', function () {
                return assert.equal(_index.Board.getY7Start0End(2, false), 2);
            });
            it('return 3 for 3', function () {
                return assert.equal(_index.Board.getY7Start0End(3, false), 3);
            });
            it('return 4 for 4', function () {
                return assert.equal(_index.Board.getY7Start0End(4, false), 4);
            });
            it('return 5 for 5', function () {
                return assert.equal(_index.Board.getY7Start0End(5, false), 5);
            });
            it('return 6 for 6', function () {
                return assert.equal(_index.Board.getY7Start0End(6, false), 6);
            });
            it('return 7 for 7', function () {
                return assert.equal(_index.Board.getY7Start0End(7, false), 7);
            });
        });
        describe('for black', function () {
            it('return 7 for 0', function () {
                return assert.equal(_index.Board.getY7Start0End(0, true), 7);
            });
            it('return 6 for 1', function () {
                return assert.equal(_index.Board.getY7Start0End(1, true), 6);
            });
            it('return 5 for 2', function () {
                return assert.equal(_index.Board.getY7Start0End(2, true), 5);
            });
            it('return 4 for 3', function () {
                return assert.equal(_index.Board.getY7Start0End(3, true), 4);
            });
            it('return 3 for 4', function () {
                return assert.equal(_index.Board.getY7Start0End(4, true), 3);
            });
            it('return 2 for 5', function () {
                return assert.equal(_index.Board.getY7Start0End(5, true), 2);
            });
            it('return 1 for 6', function () {
                return assert.equal(_index.Board.getY7Start0End(6, true), 1);
            });
            it('return 0 for 7', function () {
                return assert.equal(_index.Board.getY7Start0End(7, true), 0);
            });
            it('return null for invalid x', function () {
                return assert.notOk(_index.Board.getY7Start0End(-1, true));
            });
        });
    });
    describe('getPositionsWhereCanIGo', function () {
        it('return null for invalid from', function () {
            var positions = _index.Board.getPositionsWhereCanIGo(_index.Board.defaultInitialBoard, null, true);
            assert.notOk(positions);
        });
    });
});
//# sourceMappingURL=Board.test.js.map
//# sourceMappingURL=Board.test.js.map