import BoardPosition from "../BoardPosition";
import GamePieceType from "../GamePieceType";
import { equal } from "ptz-assert";

describe("BoardPosition", function () {
    describe("New", function () {
        var position: IBoardPosition;

        beforeEach(function () {
            position = new BoardPosition({ x: 0, y: 0 });
        });

        it("x", function () {

        })
    });

    describe("isBlackPiece", function () {
        var position: IBoardPosition;

        beforeEach(function () {
            position = new BoardPosition({ x: 0, y: 0 });
        });

        it("true", function () {
            position.setPiece(true);
            var actual = position.isBlackPiece();
            equal(actual, true);
        });

        it("false", function () {
            position.setPiece(false);
            var actual = position.isBlackPiece();
            equal(actual, false);
        });

        it("null", function () {
            position.removePiece();
            var actual = position.isBlackPiece();
            equal(actual, null);
        });
    });

    describe("isSamePositionAs", function () {
        it("true", function () {
            var position1 = new BoardPosition({ x: 2, y: 3 });
            var position2 = new BoardPosition({ x: 2, y: 3 });
            equal(position1.isSamePositionAs(position2), true);
        });

        it("false", function () {
            var position1 = new BoardPosition({ x: 3, y: 2 });
            var position2 = new BoardPosition({ x: 2, y: 3 });
            equal(position1.isSamePositionAs(position2), false);
        });
    });

    describe("setPiece", function () {
        var position: IBoardPosition;

        beforeEach(() => {
            position = new BoardPosition({ x: 0, y: 0 });
        });

        it("black", () => {
            position.setPiece(true);
            equal(position.isBlackPiece(), true);
            equal(position.isEmpty(), false);
        });

        it("white", () => {
            position.setPiece(false);
            equal(position.isBlackPiece(), false);
            equal(position.isEmpty(), false);
        });

        it("empty", () => {
            position.setPiece(null);
            equal(position.isEmpty(), true);
        });
    });

    describe("isEmpty", () => {
        var position: IBoardPosition;

        beforeEach(() => {
            position = new BoardPosition({ x: 2, y: 3 });
        });

        it("true", () => {
            position.removePiece();
            equal(position.isEmpty(), true);
        });

        it("false, black piece", () => {
            position.setPiece(true);
            equal(position.isEmpty(), false);
        });

        it("false, white piece", () => {
            position.setPiece(false);
            equal(position.isEmpty(), false);
        });
    });
});