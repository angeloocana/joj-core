'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPiecesOrdered = exports.getOtherPieces = exports.createPiece = undefined;

var _Board = require('./Board');

var _Position = require('./Position');

function createPiece(x, y, isBlack) {
    return {
        position: { x: x, y: y, isBlack: isBlack }
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}
function getOtherPieces(pieces, remove) {
    return pieces.filter(function (piece) {
        return piece && !(0, _Position.isSamePositionAs)(piece.position, remove.position);
    });
}
function getPiecesOrdered(pieces, isBlack) {
    var ordered = [];
    pieces.forEach(function (piece) {
        var y = (0, _Board.getY0Start7End)(piece.position.y, isBlack);
        if (!ordered[y]) ordered[y] = [piece];else ordered[y].push(piece);
    });
    return ordered;
}
exports.createPiece = createPiece;
exports.getOtherPieces = getOtherPieces;
exports.getPiecesOrdered = getPiecesOrdered;
//# sourceMappingURL=Piece.js.map
//# sourceMappingURL=Piece.js.map