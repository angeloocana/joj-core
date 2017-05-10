import { IBoardConf } from './IBoard';
import { IGameColor, IScore } from './IGameColor';
import { IMove } from './IMove';
import { IPiece } from './IPiece';

function create(boardConf: IBoardConf, isBlack: boolean, pieces: IPiece[]): IGameColor {
    const { startRow, endRow } = isBlack ? boardConf.black : boardConf.white;
    return {
        score: {
            winners: 0,
            preWinnersPoints: 0
        },
        jumps: 0,
        points: 0,
        nMoves: 0,
        pieces,
        isBlack,
        startRow,
        endRow
    };
}

function getColorAfterMove(color: IGameColor, move: IMove): IGameColor {
    color.pieces = color.pieces.map(piece => {
        if (piece.position.x === move.from.x
            && piece.position.y === move.from.y) {
            piece.position.x = move.to.x;
            piece.position.y = move.to.y;
        }
        return piece;
    });

    return color;
}

function getScore(color: IGameColor): IScore {
    const initialWinners: IScore = {
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

function setColorScore(color: IGameColor): IGameColor {
    color.score = getScore(color);
    return color;
}

function hasWon(color: IGameColor): boolean {
    return color.score.winners === color.pieces.length;
}

export {
    create,
    getColorAfterMove,
    getScore,
    setColorScore,
    hasWon
};
