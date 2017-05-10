import * as Position from './Position';
function createPiece(position) {
    return {
        position
        // Other props:
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}
// function create(isBlack: boolean, x: number, y: number): IPiece {
//     return createPiece({
//         position: { x, y, isBlack }
//     });
// }
// const createCurried = R.curry(create);
// const createBlackPiece = createCurried(true);
// const createWhitePiece = createCurried(true);
function hasSamePosition(a, b) {
    return Position.hasSamePosition(a.position, b.position);
}
function hasSamePieceAndPosition(a, b) {
    return Position.hasSamePieceAndPosition(a.position, b.position);
}
export { createPiece, 
// createBlackPiece,
// createWhitePiece,
hasSamePosition, hasSamePieceAndPosition };
//# sourceMappingURL=Piece.js.map