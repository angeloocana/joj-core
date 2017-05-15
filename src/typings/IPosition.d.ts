import { IMove } from './IMove';

export interface IXY {
    x: number;
    y: number;
}

export interface IPieces {
    white: IXY[];
    black: IXY[];
}

export type IPrintPosition = (position: IPosition) => string;

export interface IPosition {
    x: number;
    y: number;

    /**
     *  - true is black.
     *  - false is white.
     *  - undefined is empty position.
     */
    isBlack?: boolean;

    // Moved to pure functions at Board
    // isWhiteHome?: boolean;
    // isBlackHome?: boolean;

    lastMovement?: IMove;

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
