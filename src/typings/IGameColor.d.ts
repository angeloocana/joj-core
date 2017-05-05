import { IBoardPosition } from './IBoardPosition';
import { IGamePiece } from './IGamePiece';

export interface IGameColor {
    jumps: number;
    points: number;
    nMoves: number;
    startRow: number;
    endRow: number;
    pieces: IGamePiece[];
    winners: IWinners;

    move(startPosition: IBoardPosition, nextPosition: IBoardPosition): void;
}

export interface IWinners {
    winners: number;
    preWinnersPoints: number;
}
