import * as Position from './Position';
function create(x, y, isBlack) {
    return {
        position: { x, y, isBlack }
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
export { create, hasSamePosition, hasSamePieceAndPosition };
//# sourceMappingURL=Piece.js.map