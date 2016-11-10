import Players from "../players";
import { ok } from "assert";

describe("Players", () => {

    let players:IPlayers;

    describe("New with defaults", () => {
        it("Set white player to unkown");
        it("Set black player to pc ai medium");
    });

    describe("New setting players", () => {
        it("Set white player to given player");
        it("Set black player to given player");
    });

    describe("Colors", () => {
        beforeEach(() => {
            players = new Players({});
        });

        it("White", ()=>{
             ok(players.white.color == "WHITE");
        });

        it("Black", ()=>{
             ok(players.black.color == "BLACK");
        });
    });
});
