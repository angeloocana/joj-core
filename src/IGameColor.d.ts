import { IPiece } from './IPiece';
import { IPosition } from './IPosition';

export interface IGameColor {
    jumps: number;
    points: number;
    nMoves: number;
    pieces: IPiece[];
    score: IScore;
    isBlack: boolean;
    startRow: number;
    endRow: number;
}

export interface IScore {
    winners: number;
    preWinnersPoints: number;
}
