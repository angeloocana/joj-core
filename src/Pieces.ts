import * as Board from './Board';
import * as Piece from './Piece';

import { IPiece } from './IPiece';

// Remove piece from a list
function remove(pieces: IPiece[], remove: IPiece): IPiece[] {
    return pieces.filter(piece => !Piece.hasSamePosition(piece, remove));
}

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
    remove,
    getPiecesOrdered,
    haveSamePieceAndPosition
};
