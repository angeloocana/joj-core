'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pieceHelper = undefined;

var _GamePiece = require('../GamePiece');

var _BoardHelper = require('./BoardHelper');

function getStartPieces(boardOptions, startRow, isBlack) {
    var pieces = [];
    for (var x = 0; x < boardOptions.size.x; x++) {
        var piece = new _GamePiece.GamePiece(x, startRow, isBlack);
        pieces.push(piece);
    }
    return pieces;
}
function getOtherPieces(pieces, remove) {
    return pieces.filter(function (piece) {
        return piece && !piece.position.isSamePositionAs(remove.position);
    });
}
function getPiecesOrdered(pieces, isBlack) {
    var ordered = [];
    pieces.forEach(function (piece) {
        var y = _BoardHelper.boardHelper.getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y]) ordered[y] = [piece];else ordered[y].push(piece);
    });
    return ordered;
}
var pieceHelper = exports.pieceHelper = {
    getOtherPieces: getOtherPieces,
    getPiecesOrdered: getPiecesOrdered,
    getStartPieces: getStartPieces
};
//# sourceMappingURL=PieceHelper.js.map
//# sourceMappingURL=PieceHelper.js.map