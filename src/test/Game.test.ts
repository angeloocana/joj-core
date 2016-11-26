﻿import Game from '../Game';
import { ok, deepEqual, equal, notEqual } from "ptz-assert";
import Players from "../Players";
import Player from "../Player";

describe("Game", function () {
    let game: IGame;

    describe("needToValidateMovements", () => {
        it("when null should validate");
        it("when undefined should validate");
        it("when true should validate");
        it("when false should NOT validate");
    });

    describe("Game ended", () => {
        beforeEach(() => {
            game = new Game({
                boardArgs: {
                    logMove: true
                }
            });
        });
    });

    describe("getCopy", () => {
        let gameCopy;

        beforeEach(() => {
            game = new Game({
                boardArgs: {
                    logMove: true
                }
            });
            gameCopy = game.getCopy();
        });

        it("notEqual = not using same reference", () => {
            notEqual(gameCopy, game);
        });
        it("movements", () => {
            deepEqual(gameCopy.movements, game.movements);
        });
        it("players", () => {
            deepEqual(gameCopy.players, game.players);
        });
        it("ended", () => {
            deepEqual(gameCopy.ended, game.ended);
        });
        it("board", () => {
            deepEqual(gameCopy.board, game.board);
        });
    });

    describe("backMove", () => {
        it("backMove offline game", function () {

            let players = new Players({
                white: new Player({ name: "Angelo", foto: "img/black_user.png" }),
                black: new Player({ name: "Gabi", foto: "img/white_user.png" })
            });

            let game = new Game({
                players,
                boardArgs: {
                    logMove: true
                }
            });

            game.move({ x: 2, y: 7 }, { x: 2, y: 6 });

            let gameBeforeLastMove = game.getCopy();

            game.move({ x: 2, y: 0 }, { x: 2, y: 1 });

            game.backMove();

            equal(gameBeforeLastMove.movements.length, game.movements.length);
            deepEqual(gameBeforeLastMove.movements, game.movements);
        });
    });
});