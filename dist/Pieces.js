'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.haveSamePieceAndPosition = exports.getPiecesOrdered = exports.removePiece = exports.createWhitePieces = exports.createBlackPieces = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _Piece = require('./Piece');

var Piece = _interopRequireWildcard(_Piece);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remove piece from a list
function removePiece(pieces, pieceToRemove) {
    return pieces.filter(function (piece) {
        return !Piece.hasSamePosition(piece, pieceToRemove);
    });
}
function createPieces(isBlack, positions) {
    return positions.map(function (position) {
        position.isBlack = isBlack;
        return Piece.createPiece(position);
    });
}
var createPiecesCurried = _ramda2.default.curry(createPieces);
var createBlackPieces = createPiecesCurried(true);
var createWhitePieces = createPiecesCurried(false);
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
exports.createBlackPieces = createBlackPieces;
exports.createWhitePieces = createWhitePieces;
exports.removePiece = removePiece;
exports.getPiecesOrdered = getPiecesOrdered;
exports.haveSamePieceAndPosition = haveSamePieceAndPosition;
//# sourceMappingURL=Pieces.js.map
//# sourceMappingURL=Pieces.js.map