import PieceHelper from "./helpers/pieceHelper";
export default class GameColor {
    constructor(boardOptions, isBlack) {
        this.winners = 0;
        this.jumps = 0;
        this.points = 0;
        this.preWinnersPoints = 0;
        this.nMoves = 0;
        let y = (boardOptions.size.y - 1);
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;
        this.pieces = PieceHelper.getStartPieces(boardOptions, this.startRow);
    }
    setColorWinners() {
        this.winners = 0;
        this.preWinnersPoints = 0;
        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            if (piece.y === this.endRow)
                this.winners++;
            else
                this.preWinnersPoints += this.endRow === 0
                    ? this.startRow - piece.y
                    : piece.y;
        }
    }
    win() {
        return this.winners === this.pieces.length;
    }
    move(startPosition, nextPosition) {
        this.pieces.forEach(piece => {
            if (piece.x === startPosition.x
                && piece.y === startPosition.y) {
                piece.x = nextPosition.x;
                piece.y = nextPosition.y;
            }
        });
    }
}
//# sourceMappingURL=gameColor.js.map