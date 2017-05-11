import * as Position from './Position';

import { IPiece } from './IPiece';
import { IPosition } from './IPosition';

function createPiece(position: IPosition): IPiece {
    return {
        position
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
    createPiece,
    hasSamePosition,
    hasSamePieceAndPosition
};
