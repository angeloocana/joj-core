import * as Position from './Position';
function createPiece(position) {
    return {
        position
        // Other props:
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}
function hasSamePosition(a, b) {
    return Position.hasSamePosition(a.position, b.position);
}
function hasSamePieceAndPosition(a, b) {
    return Position.hasSamePieceAndPosition(a.position, b.position);
}
export { createPiece, hasSamePosition, hasSamePieceAndPosition };
//# sourceMappingURL=Piece.js.map