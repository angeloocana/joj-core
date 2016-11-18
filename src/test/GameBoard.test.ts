import GameBoard from "../GameBoard";
import { equal, deepEqual, ok, notOk } from "ptz-assert";
import { cleanBoard } from "./testData/board.data";
import PieceHelper from "../helpers/PieceHelper";
import GamePieceType from "../GamePieceType";
import GameColor from "../GameColor";

describe("GameBoard", () => {

    describe("New with defaults", () => {
        let board: IGameBoard;
        beforeEach(() => {
            board = new GameBoard();
            let white = new GameColor(board.boardOptions, false);
            let black = new GameColor(board.boardOptions, true);
            board.fillAllPiecesOnBoard(white.pieces, black.pieces);
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

        it("getPosition", () => {
            let actual = board.getPosition({ x: 2, y: 3 });
            let expected = { x: 2, y: 3, isWhiteHome: false, isBlackHome: false, piece: null };
            deepEqual(actual, expected)
        });

        describe("isPositionEmpty", () => {
            it("true", () => {
                let empty = board.isPositionEmpty({ x: 2, y: 3 });
                ok(empty);
            });

            it("false", () => {
                let empty = board.isPositionEmpty({ x: 0, y: 0 });

                notOk(empty);
            });
        });

        describe("getNearPositions", () => {
            let position: IGamePosition = {
                x: 7, y: 7
            };

            it("onlyEmpty=false should return only filled near positions", function () {
                let onlyEmpty = false;
                let expected = [{ x: 6, y: 7 }];
                let actual = board.getNearPositions(position, onlyEmpty);

                deepEqual(actual, expected);
            });

            it("onlyEmpty=true should return all empty near positions", function () {
                let onlyEmpty = true;
                let expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
                let actual = board.getNearPositions(position, onlyEmpty);

                deepEqual(actual, expected);
            });

            it("onlyEmpty=undefined should return all near positions", function () {
                let onlyEmpty = undefined;
                let expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7 }];
                let actual = board.getNearPositions(position, onlyEmpty);

                deepEqual(actual, expected);
            });
        });
    });
});