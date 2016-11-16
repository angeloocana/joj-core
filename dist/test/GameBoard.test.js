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
    });
});