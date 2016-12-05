import GamePieceType from "./GamePieceType";

export default class BoardPosition implements IBoardPosition {
    x: number;
    y: number;

    piece?: string;//GamePieceType;

    lastMoviment?: IMove;

    lastPosition?: IBoardPosition;
    jumpingBlackPiece?: boolean;
    jumps?: number;

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;

    isWhiteHome?: boolean;
    isBlackHome?: boolean;

    constructor(args: IBoardPositionArgs) {
        this.x = args.x;
        this.y = args.y;

        //this.isWhiteHome = false;
        //this.isBlackHome = ;
    }

    isBlackPiece(): boolean {
        if (!this.piece)
            return null;

        return this.piece === GamePieceType.black;
    }

    isSamePositionAs(comparePosition:IBoardPosition):boolean{
        return this.x === comparePosition.x && this.y === comparePosition.y;
    }
}