'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.haveSamePieceAndPosition = exports.getPiecesOrdered = exports.remove = undefined;

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _Piece = require('./Piece');

var Piece = _interopRequireWildcard(_Piece);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Remove piece from a list
function remove(pieces, remove) {
    return pieces.filter(function (piece) {
        return !Piece.hasSamePosition(piece, remove);
    });
}
function getPiecesOrdered(pieces, isBlack) {
    var ordered = [];
    pieces.forEach(function (piece) {
        var y = Board.getY0Start7End(piece.position.y, isBlack);
        if (!ordered[y]) ordered[y] = [piece];else ordered[y].push(piece);
    });
    return ordered;
}
function haveSamePieceAndPosition(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (!Piece.hasSamePieceAndPosition(a[i], b[i])) return false;
    }
    return true;
}
exports.remove = remove;
exports.getPiecesOrdered = getPiecesOrdered;
exports.haveSamePieceAndPosition = haveSamePieceAndPosition;
//# sourceMappingURL=Pieces.js.map
//# sourceMappingURL=Pieces.js.map