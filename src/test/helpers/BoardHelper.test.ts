import BoardHelper from "../../helpers/BoardHelper";
import { ok, notOk, equal } from "ptz-assert";
import BoardPosition from "../../BoardPosition";

describe("GameBoard", function () {

    describe("isBackGroundBlack", () => {
        it("0,0 => true", function () {
            ok(BoardHelper.isBackGroundBlack(0, 0));
        });

        it("0,1 => false", function () {
            ok(!BoardHelper.isBackGroundBlack(0, 1));
        });
    });

    describe("isPositionNotAdded", () => {
        it("added", function () {
            let position = new BoardPosition({ "x": 5, "y": 2 });

            let positions = [new BoardPosition({ "x": 4, "y": 0 }),
                             new BoardPosition({ "x": 3, "y": 0 })];

            ok(BoardHelper.isPositionNotAdded(position, positions));
        });

        it("not added", function () {
            let position = new BoardPosition({ "x": 3, "y": 0 });

            let positions = [new BoardPosition({ "x": 4, "y": 0 }),
            new BoardPosition({ "x": 3, "y": 0 })];

            notOk(BoardHelper.isPositionNotAdded(position, positions));
        });
    });

    describe("getY0Start7End", () => {
        it("for white y2 should return 5", function () {
            let y = 2;
            let isBlack = false;

            equal(BoardHelper.getY0Start7End(y, isBlack), 5);
        });

        it("for black y2 should return 2", function () {
            let y = 2;
            let isBlack = true;

            equal(BoardHelper.getY0Start7End(y, isBlack), 2);
        });
    });

    describe("getY7Start0End", () => {
        it("for white y2 should return 2", function () {
            let y = 2;
            let isBlack = false;

            equal(BoardHelper.getY7Start0End(y, isBlack), 2);
        });

        it("for black y2 should return 5", function () {
            let y = 2;
            let isBlack = true;

            equal(BoardHelper.getY7Start0End(y, isBlack), 5);
        });
    });
});