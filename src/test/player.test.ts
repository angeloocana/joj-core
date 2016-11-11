import Player from "../player";
import { ok } from "assert";

describe("Player", () => {

    let player:IPlayer;

    describe("new", () => {
        let playerName = "John";
        beforeEach(() => {
            player = new Player(playerName);
        });

        it("Setting name", ()=>{
             ok(playerName == player.name);
        });
    });
});
