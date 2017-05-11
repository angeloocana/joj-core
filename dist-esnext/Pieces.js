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
function getPiecesOrdered(boardSizeY, pieces, isBlack) {
    const ordered = [];
    pieces.forEach(piece => {
        const y = Position.getYAsBlack(boardSizeY, piece.position.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });
    return ordered;
}
const getPiecesOrderedCurried = R.curry(getPiecesOrdered);
function haveSamePieceAndPosition(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (!Piece.hasSamePieceAndPosition(a[i], b[i]))
            return false;
    }
    return true;
}
export { createBlackPieces, createWhitePieces, removePiece, getPiecesOrdered, getPiecesOrderedCurried, haveSamePieceAndPosition };
//# sourceMappingURL=Pieces.js.map