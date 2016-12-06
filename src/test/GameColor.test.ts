﻿import GameColor from "../GameColor";
import { ok,deepEqual, equal } from "ptz-assert";
import GamePiece from "../GamePiece";

function assertPieces(actual: IGamePiece[], expected: IGamePiece[]) {
    for (let i = 0; i < actual.length; i++) {
        let actualPiece = actual[i];
        let expectedPiece = expected[i];
        let isSamePositionAs = actualPiece.position.isSamePositionAs(expectedPiece.position);

        if(!isSamePositionAs){
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("assertPieces");
            console.log("actualPiece");
            console.log(actualPiece);
            console.log("expectedPiece");
            console.log(expectedPiece);
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        }

        ok(isSamePositionAs, "isSamePositionAs");
        equal(actualPiece.position.isBlackPiece(), expectedPiece.position.isBlackPiece());
    }
}

function assertColor(actual: IGameColor, expected) {
    equal(actual.endRow, expected.endRow, "endRow");
    equal(actual.jumps, expected.jumps, "jumps");
    equal(actual.nMoves, expected.nMoves, "nMoves");

    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log("pieces actual");
    // console.log(actual.pieces);
    // console.log("pieces expected");
    // console.log(expected.pieces);
    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

    assertPieces(actual.pieces, expected.pieces);
    equal(actual.points, expected.points, "points");
    equal(actual.preWinnersPoints, expected.preWinnersPoints, "preWinnersPoints actual:" + actual.preWinnersPoints + " expected:" + expected.preWinnersPoints);
    equal(actual.startRow, expected.startRow, "startRow");
    equal(actual.winners, expected.winners, "winners");
}


describe("GameColor", function () {

    let boardOptions = { size: { x: 3, y: 3 } };

    it("New white color with default options", function () {
        let isBlack = false;
        let pieces = [new GamePiece(0, 2, isBlack), new GamePiece(1, 2, isBlack), new GamePiece(2, 2, isBlack)];

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
        let pieces = [new GamePiece(0, 0, isBlack), new GamePiece(1, 0, isBlack), new GamePiece(2, 0, isBlack)];

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