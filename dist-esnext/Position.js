import R from 'ramda';
const hasBlackPiece = R.propEq('isBlack', true);
const hasWhitePiece = R.propEq('isBlack', false);
const hasPiece = R.anyPass([hasBlackPiece, hasWhitePiece]);
const hasNoPiece = R.compose(R.not, hasPiece);
function hasSamePiece(p1, p2) {
    return p1.isBlack === p2.isBlack;
}
function hasSamePosition(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
const hasSamePieceAndPosition = R.allPass([hasSamePiece, hasSamePosition]);
function setPiece(position, isBlack) {
    position.isBlack = isBlack;
    return position;
}
/**
 * Deletes .isBlack prop from position
 */
function removePiece(position) {
    delete position.isBlack;
    return position;
}
export { hasSamePiece, hasSamePosition, hasSamePieceAndPosition, hasBlackPiece, hasPiece, hasNoPiece, hasWhitePiece, removePiece, setPiece };
//# sourceMappingURL=Position.js.map