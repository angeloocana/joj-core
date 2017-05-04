import { GamePiece } from '../GamePiece';
import { boardHelper } from './BoardHelper';

import { IPieceHelper } from '../typings/helpers/IPieceHelper';
import { IBoardOptions } from '../typings/IBoardOptions';
import { IGamePiece } from '../typings/IGamePiece';

function getStartPieces(boardOptions: IBoardOptions, startRow: number, isBlack: boolean): IGamePiece[] {
    const pieces: IGamePiece[] = [];
    for (let x = 0; x < boardOptions.size.x; x++) {
        const piece: IGamePiece = new GamePiece(x, startRow, isBlack);
        pieces.push(piece);
    }
    return pieces;
}

function getOtherPieces(pieces: IGamePiece[], remove: IGamePiece): IGamePiece[] {
    return pieces.filter(piece =>
        piece && !piece.position.isSamePositionAs(remove.position));
}

function getPiecesOrdered(pieces: IGamePiece[], isBlack: boolean): IGamePiece[][] {
    const ordered: IGamePiece[][] = [];

    pieces.forEach(piece => {
        const y = boardHelper.getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });

    return ordered;
}

export const pieceHelper: IPieceHelper = {
    getOtherPieces,
    getPiecesOrdered,
    getStartPieces
};
