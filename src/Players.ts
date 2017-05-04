import { ok } from 'ptz-assert';
import { gamePieceType } from './GamePieceType';

import { IPlayer } from './typings/IPlayer';
import { IPlayers } from './typings/IPlayers';

export class Players implements IPlayers {
    white: IPlayer;
    black: IPlayer;
    vsComputer: boolean;
    computerIsWhite: boolean;

    constructor(args: IPlayers = null) {
        ok(args && args.black && args.white, 'ERROR_BLACK_AND_WHITE_PlAYERS_REQUIRED');

        this.white = args.white;
        this.black = args.black;

        this.white.color = gamePieceType.white;
        this.black.color = gamePieceType.black;
    }
}
