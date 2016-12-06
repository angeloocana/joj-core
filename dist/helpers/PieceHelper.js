"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BoardHelper = require("./BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _GamePiece = require("../GamePiece");

var _GamePiece2 = _interopRequireDefault(_GamePiece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStartPieces(boardOptions, startRow, isBlack) {
    var pieces = [];
    for (var x = 0; x < boardOptions.size.x; x++) {
        var piece = new _GamePiece2.default(x, startRow, isBlack);
        pieces.push(piece);
    }
    return pieces;
}
;
function getOtherPieces(pieces, remove) {
    return pieces.filter(function (piece) {
        return piece && (piece.x !== remove.x || piece.y !== remove.y);
    });
}
;
function getPiecesOrdered(pieces, isBlack) {
    var ordered = [];
    pieces.forEach(function (piece) {
        var y = _BoardHelper2.default.getY0Start7End(piece.y, isBlack);
        if (!ordered[y]) ordered[y] = [piece];else ordered[y].push(piece);
    });
    return ordered;
}
;
var pieceHelper = {
    getOtherPieces: getOtherPieces,
    getPiecesOrdered: getPiecesOrdered,
    getStartPieces: getStartPieces
};
exports.default = pieceHelper;