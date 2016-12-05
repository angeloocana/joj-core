"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BoardHelper = require("./BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _BoardPosition = require("../BoardPosition");

var _BoardPosition2 = _interopRequireDefault(_BoardPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStartPieces = function getStartPieces(boardOptions, startRow) {
    var pieces = [];
    for (var x = 0; x < boardOptions.size.x; x++) {
        var piece = new _BoardPosition2.default({ x: x, y: startRow });
        pieces.push(piece);
    }
    return pieces;
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
    getStartPieces: getStartPieces
};
exports.default = pieceHelper;