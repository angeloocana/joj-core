"use strict";

var _GameBoard = require("../GameBoard");

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _ptzAssert = require("ptz-assert");

var _boardData = require("./testData/board.data.test");

var _GameColor = require("../GameColor");

var _GameColor2 = _interopRequireDefault(_GameColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GameBoard", function () {
    describe("New with defaults", function () {
        var board = void 0;
        beforeEach(function () {
            board = new _GameBoard2.default();
            var white = new _GameColor2.default(board.boardOptions, false);
            var black = new _GameColor2.default(board.boardOptions, true);
            board.fillAllPiecesOnBoard(white.pieces, black.pieces);
        });
        it("has 8 columns", function () {
            (0, _ptzAssert.equal)(board.board.length, 8);
        });
        it("has 8 rows", function () {
            (0, _ptzAssert.equal)(board.board[0].length, 8);
            (0, _ptzAssert.equal)(board.board[7].length, 8);
        });
        it("boardStartPositions", function () {
            (0, _ptzAssert.deepEqual)(board.board, _boardData.boardStartPositions);
        });
        describe("boardHasThisPosition", function () {
            it("x1 y1 should return true", function () {
                var position = { x: 1, y: 1 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), true);
            });
            it("x-1 y0 should return false", function () {
                var position = { x: -1, y: 0 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it("x0 y-1 should return false", function () {
                var position = { x: 0, y: -1 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it("x-1 y-1 should return false", function () {
                var position = { x: -1, y: -1 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it("x8 y1 should return false", function () {
                var position = { x: 8, y: 1 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it("x1 y-8 should return false", function () {
                var position = { x: 1, y: 8 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
            it("x8 y8 should return false", function () {
                var position = { x: 8, y: 8 };
                (0, _ptzAssert.equal)(board.boardHasThisPosition(position), false);
            });
        });
        it("getPosition", function () {
            var actual = board.getPosition({ x: 2, y: 3 });
            var expected = { x: 2, y: 3 };
            (0, _ptzAssert.deepEqual)(actual, expected);
        });
        describe("isPositionEmpty", function () {
            it("true", function () {
                var empty = board.isPositionEmpty({ x: 2, y: 3 });
                (0, _ptzAssert.ok)(empty);
            });
            it("false", function () {
                var empty = board.isPositionEmpty({ x: 0, y: 0 });
                (0, _ptzAssert.notOk)(empty);
            });
        });
        describe("getNearPositions", function () {
            var position = {
                x: 7, y: 7
            };
            it("onlyEmpty=false should return only filled near positions", function () {
                var onlyEmpty = false;
                var expected = [{ x: 6, y: 7 }];
                var actual = board.getNearPositions(position, onlyEmpty);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("onlyEmpty=true should return all empty near positions", function () {
                var onlyEmpty = true;
                var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
                var actual = board.getNearPositions(position, onlyEmpty);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("onlyEmpty=undefined should return all near positions", function () {
                var onlyEmpty = undefined;
                var expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7 }];
                var actual = board.getNearPositions(position, onlyEmpty);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
        });
        describe("getJumpPosition", function () {
            it("jumping up and rigth", function () {
                var startPosition = { "x": 0, "y": 0 };
                var toJumpPosition = { "x": 1, "y": 1 };
                var expected = { "x": 2, "y": 2 };
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("jumping up and left", function () {
                var startPosition = { "x": 2, "y": 0 };
                var toJumpPosition = { "x": 1, "y": 1 };
                var expected = { "x": 0, "y": 2 };
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("jumping up", function () {
                var startPosition = { "x": 0, "y": 0 };
                var toJumpPosition = { "x": 1, "y": 1 };
                var expected = { "x": 2, "y": 2 };
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("jumping down and rigth", function () {
                var startPosition = { "x": 0, "y": 7 };
                var toJumpPosition = { "x": 1, "y": 6 };
                var expected = { "x": 2, "y": 5 };
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("jumping down and left", function () {
                var startPosition = { "x": 2, "y": 7 };
                var toJumpPosition = { "x": 1, "y": 6 };
                var expected = { "x": 0, "y": 5 };
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("jumping down", function () {
                var startPosition = { "x": 1, "y": 7 };
                var toJumpPosition = { "x": 1, "y": 6 };
                var expected = { "x": 1, "y": 5 };
                var actual = board.getJumpPosition(startPosition, toJumpPosition);
                (0, _ptzAssert.deepEqual)(actual, expected);
            });
            it("should return undefined because position is not empty", function () {
                var startPosition = { "x": 3, "y": 0 };
                var toJumpPosition = { "x": 4, "y": 0 };
                (0, _ptzAssert.notOk)(board.getJumpPosition(startPosition, toJumpPosition));
            });
        });
    });
    it("generateBoard", function () {
        var board = new _GameBoard2.default();
        board.generateBoard();
        (0, _ptzAssert.deepEqual)(board.board, _boardData.cleanBoard);
    });
});