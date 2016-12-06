interface IBoardPosition {
    x: number;
    y: number;

    setPiece(isBlack: boolean): void;

    lastMoviment?: IMove;

    lastPosition?: IBoardPosition;
    jumpingBlackPiece?: boolean;
    jumps?: number;

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;

    isWhiteHome?: boolean;
    isBlackHome?: boolean;

    move(nextPosition: IBoardPosition): void;
    removePiece(): void;
    isEmpty(): boolean;
    isBlackPiece(): boolean;
    isWhitePiece(): boolean;
    isSamePositionAs(comparePosition: IBoardPosition): boolean;
}

interface IBoardPositionArgs {
    x: number;
    y: number;
    isBlackPiece?: boolean;
}