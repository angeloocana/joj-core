import R from 'ramda';
import * as Piece from './Piece';
import * as Position from './Position';

import { IPiece } from './IPiece';
import { IPosition } from './IPosition';

// Remove piece from a list
function removePiece(pieces: IPiece[], pieceToRemove: IPiece): IPiece[] {
    return pieces.filter(piece => !Piece.hasSamePosition(piece, pieceToRemove));
}

function createPieces(isBlack: boolean, positions: IPosition[]): IPiece[] {
    return positions.map(position => {
        position.isBlack = isBlack;
        return Piece.createPiece(position);
    });
}

const createPiecesCurried = R.curry(createPieces);

const createBlackPieces = createPiecesCurried(true);

const createWhitePieces = createPiecesCurried(false);

function getOrderedPieces(boardSizeY: number, isBlack: boolean, pieces: IPiece[]): IPiece[][] {
    return pieces.reduce((ordered: IPiece[][], piece) => {
        const y = Position.getYAsBlack(boardSizeY, piece.position.y, isBlack);
        ordered[y] = (ordered[y] || []).concat(piece);
        return ordered;
    }, []);
}

const getOrderedPiecesCurried = R.curry(getOrderedPieces);

function haveSamePieceAndPosition(a: IPiece[], b: IPiece[]): boolean {
    for (let i = 0; i < a.length; i++) {
        if (!Piece.hasSamePieceAndPosition(a[i], b[i]))
            return false;
    }

    return true;
}

export {
    createBlackPieces,
    createWhitePieces,
    removePiece,
    getOrderedPieces,
    getOrderedPiecesCurried,
    haveSamePieceAndPosition
};
