import { IBoardPosition } from './IBoardPosition';
import { IGamePiece } from './IGamePiece';

export interface IGameColor {
    winners: number;
    jumps: number;
    points: number;
    preWinnersPoints: number;
    nMoves: number;
    startRow: number;
    endRow: number;
    pieces: IGamePiece[];

    setColorWinners(): void;
    win(): boolean;
    move(startPosition: IBoardPosition, nextPosition: IBoardPosition): void;
}
