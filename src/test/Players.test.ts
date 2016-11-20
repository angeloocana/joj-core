import Players from "../Players";
import Player from "../Player";
import { ok } from "ptz-assert";
import GamePieceType from "../GamePieceType";

describe("Players", () => {

    let players: IPlayers;
    let white = new Player({name:"P White"});
    let black = new Player({name:"P Black"});

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

        it("Set white player ai", () => {
            ok(players.white.ai == white.ai);
        });

        it("Set black player ai", () => {
            ok(players.black.ai == black.ai);
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
