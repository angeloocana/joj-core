import Player from "../player";
import { ok } from "assert";

describe("Player", () => {

    let player:IPlayer;

    describe("new", () => {
        let name = "John";
        beforeEach(() => {
            player = new Player({name});
        });

        it("Setting name", ()=>{
             ok(name == player.name);
        });
    });
});
