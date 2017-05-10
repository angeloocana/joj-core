import { getY0Start7End } from './Board';
import { isSamePositionAs } from './Position';

import { IPiece } from './IPiece';

function createPiece(x: number, y: number, isBlack: boolean): IPiece {
    return {
        position: { x, y, isBlack }
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}

function getOtherPieces(pieces: IPiece[], remove: IPiece): IPiece[] {
    return pieces.filter(piece =>
        piece && !isSamePositionAs(piece.position, remove.position));
}

function getPiecesOrdered(pieces: IPiece[], isBlack: boolean): IPiece[][] {
    const ordered: IPiece[][] = [];

    pieces.forEach(piece => {
        const y = getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });

    return ordered;
}

export {
    createPiece,
    getOtherPieces,
    getPiecesOrdered
};
