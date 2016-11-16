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
    });
});