import { gamePieceType } from './GamePieceType';
export class BoardPosition {
    constructor(args) {
        this.x = args.x;
        this.y = args.y;
        this.setPiece(args.isBlackPiece);
        // this.isWhiteHome = false;
        // this.isBlackHome = ;
    }
    setPiece(isBlack) {
        if (isBlack === true)
            this.piece = gamePieceType.black;
        else if (isBlack === false)
            this.piece = gamePieceType.white;
        else
            this.removePiece();
    }
    removePiece() {
        this.piece = null;
    }
    isBlackPiece() {
        if (!this.piece)
            return null;
        return this.piece === gamePieceType.black;
    }
    isWhitePiece() {
        if (!this.piece)
            return null;
        return this.piece === gamePieceType.white;
    }
    isEmpty() {
        return this.piece ? false : true;
    }
    isSamePositionAs(comparePosition) {
        return this.x === comparePosition.x && this.y === comparePosition.y;
    }
    move(nextPosition) {
        nextPosition.setPiece(this.isBlackPiece());
        this.removePiece();
    }
}
//# sourceMappingURL=BoardPosition.js.map