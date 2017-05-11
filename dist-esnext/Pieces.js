import R from 'ramda';
import * as Piece from './Piece';
import * as Position from './Position';
// Remove piece from a list
function removePiece(pieces, pieceToRemove) {
    return pieces.filter(piece => !Piece.hasSamePosition(piece, pieceToRemove));
}
function createPieces(isBlack, positions) {
    return positions.map(position => {
        position.isBlack = isBlack;
        return Piece.createPiece(position);
    });
}
const createPiecesCurried = R.curry(createPieces);
const createBlackPieces = createPiecesCurried(true);
const createWhitePieces = createPiecesCurried(false);
function getOrderedPieces(boardSizeY, isBlack, pieces) {
    return pieces.reduce((ordered, piece) => {
        const y = Position.getYAsBlack(boardSizeY, piece.position.y, isBlack);
        ordered[y] = (ordered[y] || []).concat(piece);
        return ordered;
    }, []);
}
const getOrderedPiecesCurried = R.curry(getOrderedPieces);
function haveSamePieceAndPosition(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (!Piece.hasSamePieceAndPosition(a[i], b[i]))
            return false;
    }
    return true;
}
export { createBlackPieces, createWhitePieces, removePiece, getOrderedPieces, getOrderedPiecesCurried, haveSamePieceAndPosition };
//# sourceMappingURL=Pieces.js.map