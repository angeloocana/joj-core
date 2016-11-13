import { ok } from "assert";
import GamePieceType from "./GamePieceType";
export default class Players {
    constructor(args = null) {
        ok(args && args.black && args.white, "ERROR_BLACK_AND_WHITE_PlAYERS_REQUIRED");
        this.white = args.white;
        this.black = args.black;
        this.white.color = GamePieceType.white;
        this.black.color = GamePieceType.black;
    }
}
//# sourceMappingURL=Players.js.map