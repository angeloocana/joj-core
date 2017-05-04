import { IGameBoardArgs } from './IGameBoard';
import { IMove } from './IMove';
import { IPlayers } from './IPlayers';

export interface IGameArgs {
    players?: IPlayers;
    movements?: IMove[];
    needToValidateMovements?: boolean;
    boardArgs?: IGameBoardArgs;
}
