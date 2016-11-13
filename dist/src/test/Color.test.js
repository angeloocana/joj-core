import GameColor from "../GameColor";
import { deepEqual, equal } from "assert";
describe("GameColor", function () {
    let boardOptions = { size: { x: 3, y: 3 } };
    let assertColor = function (actual, expected) {
        equal(actual.endRow, expected.endRow, "endRow");
        equal(actual.jumps, expected.jumps, "jumps");
        equal(actual.nMoves, expected.nMoves, "nMoves");
        deepEqual(actual.pieces, expected.pieces, "pieces");
        equal(actual.points, expected.points, "points");
        equal(actual.preWinnersPoints, expected.preWinnersPoints, "preWinnersPoints actual:" + actual.preWinnersPoints + " expected:" + expected.preWinnersPoints);
        equal(actual.startRow, expected.startRow, "startRow");
        equal(actual.winners, expected.winners, "winners");
    };
    it("New white color with default options", function () {
        let isBlack = false;
        let pieces = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }];
        let expectedColor = {
            winners: 0,
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 2,
            preWinnersPoints: 0,
            endRow: 0,
            pieces: pieces
        };
        let actualColor = new GameColor(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });
    it("New black color with default options", function () {
        let isBlack = true;
        let pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        let expectedColor = {
            winners: 0,
            preWinnersPoints: 0,
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 0,
            endRow: 2,
            pieces: pieces
        };
        let actualColor = new GameColor(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });
});
//# sourceMappingURL=Color.test.js.map