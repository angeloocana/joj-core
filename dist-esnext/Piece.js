import { getY0Start7End } from './Board';
import { isSamePositionAs } from './Position';
function createPiece(x, y, isBlack) {
    return {
        position: { x, y, isBlack }
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}
function getOtherPieces(pieces, remove) {
    return pieces.filter(piece => piece && !isSamePositionAs(piece.position, remove.position));
}
function getPiecesOrdered(pieces, isBlack) {
    const ordered = [];
    pieces.forEach(piece => {
        const y = getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });
    return ordered;
}
export { createPiece, getOtherPieces, getPiecesOrdered };
//# sourceMappingURL=Piece.js.map