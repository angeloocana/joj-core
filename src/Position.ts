import R from 'ramda';

import { IBoardSize } from './IBoard';
import { IPosition } from './IPosition';

/**
 * Takes a position and return only {x, y, isBlack}.
 *
 * Remove unnecessery props like lastMoviment, lastPosition,
 * jumpingBlackPiece, jumps, iCanGoHere, lastMove, lastMoveJump, etc.
 */
function getCleanPosition({ x, y, isBlack }: IPosition): IPosition {
    return { x, y, isBlack };
}

/**
 * Takes a position and return only {x, y}.
 */
function getXandY({ x, y }: IPosition): IPosition {
    return { x, y };
}

const hasBlackPiece = R.propEq('isBlack', true);
const hasWhitePiece = R.propEq('isBlack', false);
const hasPiece = R.anyPass([hasBlackPiece, hasWhitePiece]);
const hasNoPiece = R.compose(R.not, hasPiece);

function hasSamePiece(p1: IPosition, p2: IPosition): boolean {
    return p1.isBlack === p2.isBlack;
}

function hasSamePosition(p1: IPosition, p2: IPosition): boolean {
    return p1.x === p2.x && p1.y === p2.y;
}

const hasSamePieceAndPosition = R.allPass([hasSamePiece, hasSamePosition]);

function setPiece(position: IPosition, isBlack: boolean): IPosition {
    position.isBlack = isBlack;
    return position;
}

/**
 * Deletes .isBlack prop from position
 */
function removePiece(position: IPosition): IPosition {
    delete position.isBlack;
    return position;
}

function isBackGroundBlack(x: number, y: number): boolean {
    if (x % 2 === 0) {
        if (y % 2 === 0)
            return true;
        else
            return false;
    } else {
        if (y % 2 === 0)
            return false;
        else
            return true;
    }
}

/**
 * Returns the index to store the position in orderedPositions
 *
 * The order to search is 0, 7, 1, 6, 2, 5, 3, 1
 *
 * The goal is to fill the corners first
 */
function getToSearchOrder(boardSize: IBoardSize, x: number): number {
    switch (x) {
        case 0:
            return 0;
        case 1:
            return 2;
        case 2:
            return 4;
        case 3:
            return 6;
        case 4:
            return 7;
        case 5:
            return 5;
        case 6:
            return 3;
        case 7:
            return 1;
        default:
            return null;
    }
}

const getToSearchOrderCurried = R.curry(getToSearchOrder);

/**
 * It Inverts white Y position.
 *
 * For 8x8 board Get Y starting from 0 and ending on 7 for both black and white pieces.
 */
function getYAsBlack(boardSizeY: number, y: number, isBlack: boolean): number {
    return isBlack ? y : (boardSizeY - 1) - y;
}

const getYAsBlackCurried = R.curry(getYAsBlack);

/**
 * It Inverts black Y position.
 *
 * For 8x8 board Get Y starting from 7 and ending on 0 for both black and white pieces.
 */
function getYAsWhite(boardSizeY: number, y: number, isBlack: boolean): number {
    return isBlack ? (boardSizeY - 1) - y : y;
}

const getYAsWhiteCurried = R.curry(getYAsWhite);

export {
    isBackGroundBlack,
    getCleanPosition,
    getToSearchOrder,
    getToSearchOrderCurried,
    getXandY,
    getYAsBlack,
    getYAsBlackCurried,
    getYAsWhite,
    getYAsWhiteCurried,
    hasSamePiece,
    hasSamePosition,
    hasSamePieceAndPosition,
    hasBlackPiece,
    hasPiece,
    hasNoPiece,
    hasWhitePiece,
    removePiece,
    setPiece
};
