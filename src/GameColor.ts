import { pieceHelper } from './helpers/PieceHelper';

import { IBoardOptions } from './typings/IBoardOptions';
import { IBoardPosition } from './typings/IBoardPosition';
import { IGameColor, IWinners } from './typings/IGameColor';
import { IGamePiece } from './typings/IGamePiece';

export class GameColor implements IGameColor {
    winners: IWinners = {
        winners: 0,
        preWinnersPoints: 0
    };

    jumps: number = 0;
    points: number = 0;
    nMoves: number = 0;
    startRow: number;
    endRow: number;
    pieces: IGamePiece[];

    /**
     * Get a clean game color
     */
    constructor(boardOptions: IBoardOptions, isBlack: boolean) {
        const y = (boardOptions.size.y - 1);
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;

        this.pieces = pieceHelper.getStartPieces(boardOptions, this.startRow, isBlack);
    }

    move(startPosition: IBoardPosition, nextPosition: IBoardPosition): void {

        this.pieces.forEach(piece => {
            if (piece.position.x === startPosition.x
                && piece.position.y === startPosition.y) {
                piece.position.x = nextPosition.x;
                piece.position.y = nextPosition.y;
            }
        });
    }
}

export function getColorWinners(color: IGameColor): IWinners {
    const initialWinners: IWinners = {
        winners: 0,
        preWinnersPoints: 0
    };

    return color.pieces.reduce((winners, piece) => {
        if (piece.position.y === color.endRow)
            winners.winners += 1;
        else
            winners.preWinnersPoints += color.endRow === 0
                ? color.startRow - piece.position.y
                : piece.position.y;

        return winners;
    }, initialWinners);
}

export function setColorWinners(color: IGameColor): IGameColor {
    color.winners = getColorWinners(color);
    return color;
}

export function colorWin(color: IGameColor): boolean {
    return color.winners.winners === color.pieces.length;
}
