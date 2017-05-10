import R from 'ramda';
import * as Board from './Board';
import * as Piece from './Piece';

import { IPiece } from './IPiece';
import { IPosition } from './IPosition';

// Remove piece from a list
function remove(pieces: IPiece[], pieceToRemove: IPiece): IPiece[] {
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

function getPiecesOrdered(pieces: IPiece[], isBlack: boolean): IPiece[][] {
    const ordered: IPiece[][] = [];

    pieces.forEach(piece => {
        const y = Board.getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });

    return ordered;
}

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
    remove,
    getPiecesOrdered,
    haveSamePieceAndPosition
};
