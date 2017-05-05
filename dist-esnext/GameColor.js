import { pieceHelper } from './helpers/PieceHelper';
export class GameColor {
    /**
     * Get a clean game color
     */
    constructor(boardOptions, isBlack) {
        this.winners = {
            winners: 0,
            preWinnersPoints: 0
        };
        this.jumps = 0;
        this.points = 0;
        this.nMoves = 0;
        const y = (boardOptions.size.y - 1);
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;
        this.pieces = pieceHelper.getStartPieces(boardOptions, this.startRow, isBlack);
    }
    move(startPosition, nextPosition) {
        this.pieces.forEach(piece => {
            if (piece.position.x === startPosition.x
                && piece.position.y === startPosition.y) {
                piece.position.x = nextPosition.x;
                piece.position.y = nextPosition.y;
            }
        });
    }
}
export function getColorWinners(color) {
    const initialWinners = {
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
export function setColorWinners(color) {
    color.winners = getColorWinners(color);
    return color;
}
export function colorWin(color) {
    return color.winners.winners === color.pieces.length;
}
//# sourceMappingURL=GameColor.js.map