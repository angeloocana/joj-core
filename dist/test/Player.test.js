import Player from "../Player";
import { ok } from "ptz-assert";
describe("Player", () => {
    let player;
    describe("new", () => {
        let name = "John";
        beforeEach(() => {
            player = new Player({ name });
        });
        it("Setting name", () => {
            ok(name == player.name);
        });
    });
});
//# sourceMappingURL=Player.test.js.map