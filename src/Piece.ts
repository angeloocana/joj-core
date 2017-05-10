import * as Position from './Position';

import { IPiece } from './IPiece';

function create(x: number, y: number, isBlack: boolean): IPiece {
    return {
        position: { x, y, isBlack }
        // Other props:
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}

function hasSamePosition(a: IPiece, b: IPiece) {
    return Position.hasSamePosition(a.position, b.position);
}

function hasSamePieceAndPosition(a: IPiece, b: IPiece) {
    return Position.hasSamePieceAndPosition(a.position, b.position);
}

export {
    create,
    hasSamePosition,
    hasSamePieceAndPosition
};
