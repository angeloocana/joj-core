"use strict";

var _BoardPosition = require("../BoardPosition");

var _BoardPosition2 = _interopRequireDefault(_BoardPosition);

var _GamePieceType = require("../GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

var _ptzAssert = require("ptz-assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("BoardPosition", function () {
    describe("New", function () {
        var position;
        beforeEach(function () {
            position = new _BoardPosition2.default({ x: 0, y: 0 });
        });
        it("x", function () {});
    });
    describe("isBlackPiece", function () {
        var position;
        beforeEach(function () {
            position = new _BoardPosition2.default({ x: 0, y: 0 });
        });
        it("true", function () {
            position.piece = _GamePieceType2.default.black;
            var actual = position.isBlackPiece();
            (0, _ptzAssert.equal)(actual, true);
        });
        it("false", function () {
            position.piece = _GamePieceType2.default.white;
            var actual = position.isBlackPiece();
            (0, _ptzAssert.equal)(actual, false);
        });
        it("null", function () {
            position.piece = null;
            var actual = position.isBlackPiece();
            (0, _ptzAssert.equal)(actual, null);
        });
    });
    describe("isSamePositionAs", function () {
        it("true", function () {
            var position1 = new _BoardPosition2.default({ x: 2, y: 3 });
            var position2 = new _BoardPosition2.default({ x: 2, y: 3 });
            (0, _ptzAssert.equal)(position1.isSamePositionAs(position2), true);
        });
        it("false", function () {
            var position1 = new _BoardPosition2.default({ x: 3, y: 2 });
            var position2 = new _BoardPosition2.default({ x: 2, y: 3 });
            (0, _ptzAssert.equal)(position1.isSamePositionAs(position2), false);
        });
    });
});