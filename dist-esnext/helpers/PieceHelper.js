import { GamePiece } from '../GamePiece';
import { boardHelper } from './BoardHelper';
function getStartPieces(boardOptions, startRow, isBlack) {
    const pieces = [];
    for (let x = 0; x < boardOptions.size.x; x++) {
        const piece = new GamePiece(x, startRow, isBlack);
        pieces.push(piece);
    }
    return pieces;
}
function getOtherPieces(pieces, remove) {
    return pieces.filter(piece => piece && !piece.position.isSamePositionAs(remove.position));
}
function getPiecesOrdered(pieces, isBlack) {
    const ordered = [];
    pieces.forEach(piece => {
        const y = boardHelper.getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });
    return ordered;
}
export const pieceHelper = {
    getOtherPieces,
    getPiecesOrdered,
    getStartPieces
};
//# sourceMappingURL=PieceHelper.js.map