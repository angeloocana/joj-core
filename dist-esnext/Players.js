import { ok } from 'ptz-assert';
import { gamePieceType } from './GamePieceType';
export class Players {
    constructor(args = null) {
        ok(args && args.black && args.white, 'ERROR_BLACK_AND_WHITE_PlAYERS_REQUIRED');
        this.white = args.white;
        this.black = args.black;
        this.white.color = gamePieceType.white;
        this.black.color = gamePieceType.black;
    }
}
//# sourceMappingURL=Players.js.map