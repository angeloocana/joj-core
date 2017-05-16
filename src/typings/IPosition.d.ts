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

    jumpingBlackPiece?: boolean;
    jumps?: IPosition[];

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;
}

export interface IPiece {
    x: number;
    y: number;

    isBlack: boolean;

    whereCanIGo: IPosition[];

    // $Fix is this really needed?
    movesToWin?: number;
}

export interface IPositionArgs {
    x: number;
    y: number;
    isBlackPiece?: boolean;
}
