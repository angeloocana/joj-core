"use strict";

var _ptzAssert = require("ptz-assert");

var _PieceHelper = require("../../helpers/PieceHelper");

var _PieceHelper2 = _interopRequireDefault(_PieceHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("PieceHelper", function () {
    it("getStartPieces should return pieces in start positions", function () {
        var boardOptions = { size: { x: 3, y: 3 } };
        var row = 0;
        var pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        (0, _ptzAssert.deepEqual)(_PieceHelper2.default.getStartPieces(boardOptions, row), pieces);
    });
    it("isBlackPiece should return true", function () {
        var position = {
            piece: "BLACK",
            x: 0,
            y: 0
        };
        (0, _ptzAssert.ok)(_PieceHelper2.default.isBlackPiece(position));
    });
    it("isBlackPiece should return false", function () {
        var position = {
            piece: "WHITE",
            x: 0,
            y: 0
        };
        (0, _ptzAssert.ok)(!_PieceHelper2.default.isBlackPiece(position));
    });
    it("isBlackPiece should return null", function () {
        var position = {
            piece: null,
            x: 0,
            y: 0
        };
        (0, _ptzAssert.equal)(_PieceHelper2.default.isBlackPiece(position), null);
    });
});