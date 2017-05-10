import { IMove } from './IMove';

export interface IPosition {
    x: number;
    y: number;
    isBlack?: boolean;

    // Moved to pure functions at Board
    // isWhiteHome?: boolean;
    // isBlackHome?: boolean;

    lastMoviment?: IMove;

    lastPosition?: IPosition;
    jumpingBlackPiece?: boolean;
    jumps?: number;

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;

    // Old methods
    // setPiece(isBlack: boolean): void;
    // move(to: IPosition): void;
    // removePiece(): void;
    // isEmpty(): boolean;
    // isBlackPiece(): boolean;
    // isWhitePiece(): boolean;
    // isSamePositionAs(comparePosition: IPosition): boolean;
}

export interface IPositionArgs {
    x: number;
    y: number;
    isBlackPiece?: boolean;
}
