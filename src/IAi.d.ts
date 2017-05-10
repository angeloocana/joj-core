import { IGame } from './IGame';
import { IMove } from './IMove';

export interface IAi {
    getComputerMove(game: IGame): IMove;
}
