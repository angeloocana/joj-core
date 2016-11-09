interface IGamePosition {
    x: number;
    y: number;

    piece?: string;//GamePieceType;

    lastMoviment?: IMove;

    lastPosition?: IGamePosition;
    jumpingBlackPiece?: boolean;
    jumps?: number;

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;
}
