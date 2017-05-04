import { IMove } from './IMove';

export interface IBoardPosition {
    x: number;
    y: number;

    lastMoviment?: IMove;

    lastPosition?: IBoardPosition;
    jumpingBlackPiece?: boolean;
    jumps?: number;

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;

    isWhiteHome?: boolean;
    isBlackHome?: boolean;

    setPiece(isBlack: boolean): void;

    move(nextPosition: IBoardPosition): void;
    removePiece(): void;
    isEmpty(): boolean;
    isBlackPiece(): boolean;
    isWhitePiece(): boolean;
    isSamePositionAs(comparePosition: IBoardPosition): boolean;
}

export interface IBoardPositionArgs {
    x: number;
    y: number;
    isBlackPiece?: boolean;
}
