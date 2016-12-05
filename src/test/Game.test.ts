﻿import Game from "../Game";
import { ok, deepEqual, equal, notEqual, throws } from "ptz-assert";
import Players from "../Players";
import Player from "../Player";
import BoardPosition from "../BoardPosition";

describe("Game", function () {
    var game: IGame;

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

            game.move(new BoardPosition({ x: 2, y: 7 }), new BoardPosition({ x: 2, y: 6 }));

            let gameBeforeLastMove = game.getCopy();

            game.move(new BoardPosition({ x: 2, y: 0 }), new BoardPosition({ x: 2, y: 1 }));

            game.backMove();

            equal(gameBeforeLastMove.movements.length, game.movements.length);
            deepEqual(gameBeforeLastMove.movements, game.movements);
        });
    });

    describe("Move", () => {
        beforeEach(() => {
            var players = new Players({
                white: new Player({ name: "Angelo", foto: "img/black_user.png" }),
                black: new Player({ name: "Gabi", foto: "img/white_user.png" })
            });

            game = new Game({
                players,
                boardArgs: {
                    logMove: true
                }
            });
        });

        it("Block moving to same position", () => {
            var startPosition = new BoardPosition({ x: 0, y: 0 });
            var nextPosition = new BoardPosition({ x: 0, y: 0 });

            throws(() => {
                game.move(startPosition, nextPosition);
            });
        });
    });
});