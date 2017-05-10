import { IBoard, IBoardConf } from './IBoard';
import { ICleanGame } from './ICleanGame';
import { IPosition } from './IPosition';

import { IGameColor } from './IGameColor';
import { IMove } from './IMove';
import { IPlayer } from './IPlayer';
import { IPlayers, IPlayersArgs } from './IPlayers';

export interface IGame extends ICleanGame {

    players: IPlayers;
    white: IGameColor;
    black: IGameColor;

    board: IBoard;
    boardConf: IBoardConf;

    // isWhiteTurn(): boolean;
    // setWhereCanIGo(from): void;
    // canMove(from: IPosition, to: IPosition): boolean;
    // move(from: IPosition, to: IPosition, backMove?: boolean): void;
    // backMove(): void;

    // getColorTurn(): IGameColor;
    // getPlayerTurn(): IPlayer;

    // getNewCopy(): IGame;
    // getCopy(): IGame;
}

export interface IGameArgs {
    players?: IPlayersArgs;
    movements?: IMove[];
    needToValidateMovements?: boolean;
    boardConf?: IBoardConf;
}
