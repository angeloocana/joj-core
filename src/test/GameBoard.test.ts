import GameBoard from "../GameBoard";
import { equal, deepEqual } from "ptz-assert";
import { cleanBoard } from "./testData/board.data";

describe("GameBoard", () => {

    describe("New with defaults", () => {
        let board: IGameBoard;
        beforeEach(() => {
            board = new GameBoard();
        });

        it("has 8 columns", () => {
            equal(board.board.length, 8);
        });
        it("has 8 rows", () => {
            equal(board.board[0].length, 8);
            equal(board.board[7].length, 8);
        });

        it("cleanBoard", () => {
            deepEqual(board.board, cleanBoard);
        });

        describe("boardHasThisPosition", () => {
            it("x1 y1 should return true", function () {
                var position = { x: 1, y: 1 };
                equal(board.boardHasThisPosition(position), true);
            });

            it("x-1 y0 should return false", function () {
                var position = { x: -1, y: 0 };
                equal(board.boardHasThisPosition(position), false);
            });

            it("x0 y-1 should return false", function () {
                var position = { x: 0, y: -1 };
                equal(board.boardHasThisPosition(position), false);
            });

            it("x-1 y-1 should return false", function () {
                var position = { x: -1, y: -1 };
                equal(board.boardHasThisPosition(position), false);
            });

            it("x8 y1 should return false", function () {
                var position = { x: 8, y: 1 };
                equal(board.boardHasThisPosition(position), false);
            });

            it("x1 y-8 should return false", function () {
                var position = { x: 1, y: 8 };
                equal(board.boardHasThisPosition(position), false);
            });

            it("x8 y8 should return false", function () {
                var position = { x: 8, y: 8 };
                equal(board.boardHasThisPosition(position), false);
            });
        });
    });
});