"use strict";

var _GameColor = require("../GameColor");

var _GameColor2 = _interopRequireDefault(_GameColor);

var _ptzAssert = require("ptz-assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GameColor", function () {
    var boardOptions = { size: { x: 3, y: 3 } };
    var assertColor = function assertColor(actual, expected) {
        (0, _ptzAssert.equal)(actual.endRow, expected.endRow, "endRow");
        (0, _ptzAssert.equal)(actual.jumps, expected.jumps, "jumps");
        (0, _ptzAssert.equal)(actual.nMoves, expected.nMoves, "nMoves");
        (0, _ptzAssert.deepEqual)(actual.pieces, expected.pieces, "pieces");
        (0, _ptzAssert.equal)(actual.points, expected.points, "points");
        (0, _ptzAssert.equal)(actual.preWinnersPoints, expected.preWinnersPoints, "preWinnersPoints actual:" + actual.preWinnersPoints + " expected:" + expected.preWinnersPoints);
        (0, _ptzAssert.equal)(actual.startRow, expected.startRow, "startRow");
        (0, _ptzAssert.equal)(actual.winners, expected.winners, "winners");
    };
    it("New white color with default options", function () {
        var isBlack = false;
        var pieces = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }];
        var expectedColor = {
            winners: 0,
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 2,
            preWinnersPoints: 0,
            endRow: 0,
            pieces: pieces
        };
        var actualColor = new _GameColor2.default(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });
    it("New black color with default options", function () {
        var isBlack = true;
        var pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        var expectedColor = {
            winners: 0,
            preWinnersPoints: 0,
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 0,
            endRow: 2,
            pieces: pieces
        };
        var actualColor = new _GameColor2.default(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });
});