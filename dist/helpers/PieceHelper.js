"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BoardHelper = require("./BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _GamePieceType = require("../GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStartPieces = function getStartPieces(boardOptions, startRow) {
    var pieces = [];
    for (var x = 0; x < boardOptions.size.x; x++) {
        var piece = {
            x: x,
            y: startRow
        };
        pieces.push(piece);
    }
    return pieces;
};
var isBlackPiece = function isBlackPiece(position) {
    if (!position || !position.piece) return null;
    return position.piece === _GamePieceType2.default.black;
};
var getOtherPieces = function getOtherPieces(pieces, remove) {
    return pieces.filter(function (piece) {
        return piece && (piece.x !== remove.x || piece.y !== remove.y);
    });
};
var getPiecesOrdered = function getPiecesOrdered(pieces, isBlack) {
    var ordered = [];
    pieces.forEach(function (piece) {
        var y = _BoardHelper2.default.getY0Start7End(piece.y, isBlack);
        if (!ordered[y]) ordered[y] = [piece];else ordered[y].push(piece);
    });
    return ordered;
};
var pieceHelper = {
    getOtherPieces: getOtherPieces,
    getPiecesOrdered: getPiecesOrdered,
    getStartPieces: getStartPieces,
    isBlackPiece: isBlackPiece
};
exports.default = pieceHelper;