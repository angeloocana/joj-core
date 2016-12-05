"use strict";

var _BoardHelper = require("../../helpers/BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _ptzAssert = require("ptz-assert");

var _BoardPosition = require("../../BoardPosition");

var _BoardPosition2 = _interopRequireDefault(_BoardPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GameBoard", function () {
    describe("isBackGroundBlack", function () {
        it("0,0 => true", function () {
            (0, _ptzAssert.ok)(_BoardHelper2.default.isBackGroundBlack(0, 0));
        });
        it("0,1 => false", function () {
            (0, _ptzAssert.ok)(!_BoardHelper2.default.isBackGroundBlack(0, 1));
        });
    });
    describe("isPositionNotAdded", function () {
        it("added", function () {
            var position = new _BoardPosition2.default({ "x": 5, "y": 2 });
            var positions = [new _BoardPosition2.default({ "x": 4, "y": 0 }), new _BoardPosition2.default({ "x": 3, "y": 0 })];
            (0, _ptzAssert.ok)(_BoardHelper2.default.isPositionNotAdded(position, positions));
        });
        it("not added", function () {
            var position = new _BoardPosition2.default({ "x": 3, "y": 0 });
            var positions = [new _BoardPosition2.default({ "x": 4, "y": 0 }), new _BoardPosition2.default({ "x": 3, "y": 0 })];
            (0, _ptzAssert.notOk)(_BoardHelper2.default.isPositionNotAdded(position, positions));
        });
    });
    describe("getY0Start7End", function () {
        it("for white y2 should return 5", function () {
            var y = 2;
            var isBlack = false;
            (0, _ptzAssert.equal)(_BoardHelper2.default.getY0Start7End(y, isBlack), 5);
        });
        it("for black y2 should return 2", function () {
            var y = 2;
            var isBlack = true;
            (0, _ptzAssert.equal)(_BoardHelper2.default.getY0Start7End(y, isBlack), 2);
        });
    });
    describe("getY7Start0End", function () {
        it("for white y2 should return 2", function () {
            var y = 2;
            var isBlack = false;
            (0, _ptzAssert.equal)(_BoardHelper2.default.getY7Start0End(y, isBlack), 2);
        });
        it("for black y2 should return 5", function () {
            var y = 2;
            var isBlack = true;
            (0, _ptzAssert.equal)(_BoardHelper2.default.getY7Start0End(y, isBlack), 5);
        });
    });
});