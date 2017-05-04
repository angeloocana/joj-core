import { pieceHelper } from './helpers/PieceHelper';
export class GameColor {
    /**
     * Get a clean game color
     */
    constructor(boardOptions, isBlack) {
        this.winners = 0;
        this.jumps = 0;
        this.points = 0;
        this.preWinnersPoints = 0;
        this.nMoves = 0;
        const y = (boardOptions.size.y - 1);
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;
        this.pieces = pieceHelper.getStartPieces(boardOptions, this.startRow, isBlack);
    }
    setColorWinners() {
        this.winners = 0;
        this.preWinnersPoints = 0;
        for (var i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.position.y === this.endRow)
                this.winners++;
            else
                this.preWinnersPoints += this.endRow === 0
                    ? this.startRow - piece.position.y
                    : piece.position.y;
        }
    }
    win() {
        return this.winners === this.pieces.length;
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
//# sourceMappingURL=GameColor.js.map