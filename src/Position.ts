import R from 'ramda';

import { IPosition } from './IPosition';

function setPiece(position: IPosition, isBlack: boolean): IPosition {
    position.isBlack = isBlack;
    return position;
}

function removePiece(position: IPosition): IPosition {
    delete position.isBlack;
    return position;
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

export {
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
