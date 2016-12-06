"use strict";

var _GameColor = require("../GameColor");

var _GameColor2 = _interopRequireDefault(_GameColor);

var _ptzAssert = require("ptz-assert");

var _GamePiece = require("../GamePiece");

var _GamePiece2 = _interopRequireDefault(_GamePiece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertPieces(actual, expected) {
    for (var i = 0; i < actual.length; i++) {
        var actualPiece = actual[i];
        var expectedPiece = expected[i];
        var isSamePositionAs = actualPiece.position.isSamePositionAs(expectedPiece.position);
        if (!isSamePositionAs) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("assertPieces");
            console.log("actualPiece");
            console.log(actualPiece);
            console.log("expectedPiece");
            console.log(expectedPiece);
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        }
        (0, _ptzAssert.ok)(isSamePositionAs, "isSamePositionAs");
        (0, _ptzAssert.equal)(actualPiece.position.isBlackPiece(), expectedPiece.position.isBlackPiece());
    }
}
function assertColor(actual, expected) {
    (0, _ptzAssert.equal)(actual.endRow, expected.endRow, "endRow");
    (0, _ptzAssert.equal)(actual.jumps, expected.jumps, "jumps");
    (0, _ptzAssert.equal)(actual.nMoves, expected.nMoves, "nMoves");
    assertPieces(actual.pieces, expected.pieces);
    (0, _ptzAssert.equal)(actual.points, expected.points, "points");
    (0, _ptzAssert.equal)(actual.preWinnersPoints, expected.preWinnersPoints, "preWinnersPoints actual:" + actual.preWinnersPoints + " expected:" + expected.preWinnersPoints);
    (0, _ptzAssert.equal)(actual.startRow, expected.startRow, "startRow");
    (0, _ptzAssert.equal)(actual.winners, expected.winners, "winners");
}
describe("GameColor", function () {
    var boardOptions = { size: { x: 3, y: 3 } };
    it("New white color with default options", function () {
        var isBlack = false;
        var pieces = [new _GamePiece2.default(0, 2, isBlack), new _GamePiece2.default(1, 2, isBlack), new _GamePiece2.default(2, 2, isBlack)];
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
        var pieces = [new _GamePiece2.default(0, 0, isBlack), new _GamePiece2.default(1, 0, isBlack), new _GamePiece2.default(2, 0, isBlack)];
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