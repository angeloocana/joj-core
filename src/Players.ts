import Player from "./Player";
import {ok} from "assert";
import GamePieceType from "./GamePieceType";

export default class Players implements IPlayers {
    white: IPlayer;
    black: IPlayer;
    vsComputer: boolean;
    computerIsWhite: boolean;

    constructor(args:IPlayers = null) {
        ok(args && args.black && args.white, "ERROR_BLACK_AND_WHITE_PlAYERS_REQUIRED")

        this.white = args.white;
        this.black = args.black; 

        this.white.color = GamePieceType.white;
        this.black.color = GamePieceType.black;
    }
}
