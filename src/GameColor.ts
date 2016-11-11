import PieceHelper from "./helpers/PieceHelper";

export default class GameColor implements IGameColor {
    winners: number = 0;
    jumps: number = 0;
    points: number = 0;
    preWinnersPoints: number = 0;
    nMoves: number = 0;
    startRow: number;
    endRow: number;
    pieces: IGamePosition[];

    /**
     * Get a clean game color
     */
    constructor(boardOptions: IBoardOptions, isBlack: boolean) {
        let y = (boardOptions.size.y - 1);
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;

        this.pieces = PieceHelper.getStartPieces(boardOptions, this.startRow);
    }

    setColorWinners(): void {
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

    win(): boolean {
        return this.winners === this.pieces.length;
    }

    move(startPosition: IGamePosition, nextPosition: IGamePosition)
        : void {

        this.pieces.forEach(piece => {
            if (piece.x === startPosition.x
                && piece.y === startPosition.y) {
                piece.x = nextPosition.x;
                piece.y = nextPosition.y;
            }
        });
    }
}
