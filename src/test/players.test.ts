import Players from "../players";
import Player from "../player";
import { ok } from "assert";
import GamePieceType from "../gamePieceType";

describe("Players", () => {

    let players: IPlayers;
    let white = new Player("P White");
    let black = new Player("P Black");

    beforeEach(() => {
        players = new Players({
            black,
            white
        });
    });

    describe("New setting players", () => {

        it("Set white player name", () => {
            ok(players.white.name == white.name);
        });

        it("Set black player name", () => {
            ok(players.black.name == black.name);
        });

        it("Set white player getMove", () => {
            ok(players.white.getMove == white.getMove);
        });

        it("Set black player getMove", () => {
            ok(players.black.getMove == black.getMove);
        });
    });

    describe("Set Colors", () => {

        it("White", () => {
            ok(players.white.color == GamePieceType.white);
        });

        it("Black", () => {
            ok(players.black.color == GamePieceType.black);
        });
    });
});
