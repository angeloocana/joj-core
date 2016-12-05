interface IBoardPosition {
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

    isWhiteHome?:boolean;
    isBlackHome?:boolean;

    isBlackPiece(): boolean;
}

interface IBoardPositionArgs{
    x: number;
    y: number;
}