import { IBoard, IBoardSize } from './IBoard';
import { IMove } from './IMove';
import { IPlayers, IPlayersArgs } from './IPlayer';
import { IScore } from './IScore';

export interface IGame {
    players: IPlayers;
    score: IScore;
    board: IBoard;
    moves?: IMove[];
}

export interface IGameArgs {
    players?: IPlayersArgs;
    moves?: IMove[];
    boardSize?: IBoardSize;
}
