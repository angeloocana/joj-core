"use strict";

var _GameBoard = require("../GameBoard");

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _ptzAssert = require("ptz-assert");

var _board = require("./testData/board.data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GameBoard", function () {
    describe("New with defaults", function () {
        var board = void 0;
        beforeEach(function () {
            board = new _GameBoard2.default();
        });
        it("has 8 columns", function () {
            (0, _ptzAssert.equal)(board.board.length, 8);
        });
        it("has 8 rows", function () {
            (0, _ptzAssert.equal)(board.board[0].length, 8);
            (0, _ptzAssert.equal)(board.board[7].length, 8);
        });
        it("cleanBoard", function () {
            (0, _ptzAssert.deepEqual)(board.board, _board.cleanBoard);
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
    });
});