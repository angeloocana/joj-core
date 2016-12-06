import GameBoard from "../GameBoard";
import { equal, deepEqual, ok, notOk } from "ptz-assert";
import { cleanBoard, boardStartPositions, unicodeStartBoard } from "./testData/board.data.test";
import PieceHelper from "../helpers/PieceHelper";
import GamePieceType from "../GamePieceType";
import BoardPosition from "../BoardPosition";
import GameColor from "../GameColor";

function assertPosition(actualPosition: IBoardPosition, expectedPosition: IBoardPosition): void {
    var isSamePositionAs = actualPosition.isSamePositionAs(expectedPosition);
    if (!isSamePositionAs) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log("actualPosition");
        console.log(actualPosition);
        console.log("expectedPosition");
        console.log(expectedPosition);
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
    ok(isSamePositionAs, "isSamePositionAs");
    equal(actualPosition.isBlackPiece(), expectedPosition.isBlackPiece(), "Is same piece");
}

function assertPositions(actual: IBoardPosition[], expected: IBoardPosition[]): void {
    for (let i = 0; i < actual.length; i++) {
        let actualPosition = actual[i];
        let expectedPosition = expected[i];
        assertPosition(actualPosition, expectedPosition);
    }
}

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

        it("boardStartPositions"
        // , () => {
        //     deepEqual(board.board, boardStartPositions);
        // }
        );

        describe("boardHasThisPosition", () => {
            it("x1 y1 should return true", function () {
                let position = new BoardPosition({ x: 1, y: 1 });
                equal(board.boardHasThisPosition(position), true);
            });

            it("x-1 y0 should return false", function () {
                let position = new BoardPosition({ x: -1, y: 0 });
                equal(board.boardHasThisPosition(position), false);
            });

            it("x0 y-1 should return false", function () {
                let position = new BoardPosition({ x: 0, y: -1 });
                equal(board.boardHasThisPosition(position), false);
            });

            it("x-1 y-1 should return false", function () {
                let position = new BoardPosition({ x: -1, y: -1 });
                equal(board.boardHasThisPosition(position), false);
            });

            it("x8 y1 should return false", function () {
                let position = new BoardPosition({ x: 8, y: 1 });
                equal(board.boardHasThisPosition(position), false);
            });

            it("x1 y-8 should return false", function () {
                let position = new BoardPosition({ x: 1, y: 8 });
                equal(board.boardHasThisPosition(position), false);
            });

            it("x8 y8 should return false", function () {
                let position = new BoardPosition({ x: 8, y: 8 });
                equal(board.boardHasThisPosition(position), false);
            });
        });

        it("getPosition", () => {
            var position = new BoardPosition({ x: 2, y: 3 });
            let actual = board.getPosition(position);
            let expected = new BoardPosition({ x: 2, y: 3 });
            assertPosition(actual, expected)
        });

        describe("getNearPositions", () => {
            let position: IBoardPosition = new BoardPosition({ x: 7, y: 7 });

            it("onlyEmpty=false should return only filled near positions", function () {
                let onlyEmpty = false;
                let expected = [new BoardPosition({ x: 6, y: 7, isBlackPiece:false })];
                let actual = board.getNearPositions(position, onlyEmpty);

                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // console.log("onlyEmpty=false should return only filled near positions");
                // console.log("actual");
                // console.log(actual);
                // console.log("expected");
                // console.log(expected);
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

                assertPositions(actual, expected);
            });

            it("onlyEmpty=true should return all empty near positions", function () {
                let onlyEmpty = true;
                let expected = [new BoardPosition({ x: 6, y: 6 }), new BoardPosition({ x: 7, y: 6 })];
                let actual = board.getNearPositions(position, onlyEmpty);

                assertPositions(actual, expected);
            });

            it("onlyEmpty=undefined should return all near positions", function () {
                let onlyEmpty = undefined;
                let expected = [new BoardPosition({ x: 6, y: 6 }), new BoardPosition({ x: 7, y: 6 }), new BoardPosition({ x: 6, y: 7, isBlackPiece:false })];
                let actual = board.getNearPositions(position, onlyEmpty);

                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // console.log("onlyEmpty=undefined should return all near positions");
                // console.log("actual");
                // console.log(actual);
                // console.log("expected");
                // console.log(expected);
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

                assertPositions(actual, expected);
            });
        });

        describe("getJumpPosition", () => {
            it("jumping up and rigth", function () {
                let startPosition = new BoardPosition({ "x": 0, "y": 0 });
                let toJumpPosition = new BoardPosition({ "x": 1, "y": 1 });
                let expected = new BoardPosition({ "x": 2, "y": 2 });

                let actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });

            it("jumping up and left", function () {
                let startPosition = new BoardPosition({ "x": 2, "y": 0 });
                let toJumpPosition = new BoardPosition({ "x": 1, "y": 1 });
                let expected = new BoardPosition({ "x": 0, "y": 2 });

                let actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });

            it("jumping up", function () {
                let startPosition = new BoardPosition({ "x": 0, "y": 0 });

                let toJumpPosition = new BoardPosition({ "x": 1, "y": 1 });

                let expected = new BoardPosition({ "x": 2, "y": 2 });

                let actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });

            it("jumping down and rigth", function () {
                let startPosition = new BoardPosition({ "x": 0, "y": 7 });
                let toJumpPosition = new BoardPosition({ "x": 1, "y": 6 });
                let expected = new BoardPosition({ "x": 2, "y": 5 });

                let actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });

            it("jumping down and left", function () {
                let startPosition = new BoardPosition({ "x": 2, "y": 7 });
                let toJumpPosition = new BoardPosition({ "x": 1, "y": 6 });
                let expected = new BoardPosition({ "x": 0, "y": 5 });

                let actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });

            it("jumping down", function () {
                let startPosition = new BoardPosition({ "x": 1, "y": 7 });
                let toJumpPosition = new BoardPosition({ "x": 1, "y": 6 });
                let expected = new BoardPosition({ "x": 1, "y": 5 });

                let actual = board.getJumpPosition(startPosition, toJumpPosition);
                assertPosition(actual, expected);
            });

            it("should return undefined because position is not empty", function () {
                let startPosition = new BoardPosition({ "x": 3, "y": 0 });
                let toJumpPosition = new BoardPosition({ "x": 4, "y": 0 });

                

                notOk(board.getJumpPosition(startPosition, toJumpPosition));
            });
        });

        it("printUnicode", function printUnicodeTest() {
            var actual = board.printUnicode();
            equal(actual, unicodeStartBoard);
        });
    });

    it("generateBoard"
    // , function () {
    //     let board = new GameBoard();
    //     board.generateBoard();
    //     deepEqual(board.board, cleanBoard);
    // }
    );
});