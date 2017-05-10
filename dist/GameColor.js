"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function create(boardConf, isBlack, pieces) {
    var _ref = isBlack ? boardConf.black : boardConf.white,
        startRow = _ref.startRow,
        endRow = _ref.endRow;

    return {
        score: {
            winners: 0,
            preWinnersPoints: 0
        },
        jumps: 0,
        points: 0,
        nMoves: 0,
        pieces: pieces,
        isBlack: isBlack,
        startRow: startRow,
        endRow: endRow
    };
}
function getColorAfterMove(color, move) {
    color.pieces = color.pieces.map(function (piece) {
        if (piece.position.x === move.from.x && piece.position.y === move.from.y) {
            piece.position.x = move.to.x;
            piece.position.y = move.to.y;
        }
        return piece;
    });
    return color;
}
function getScore(color) {
    var initialWinners = {
        winners: 0,
        preWinnersPoints: 0
    };
    return color.pieces.reduce(function (winners, piece) {
        if (piece.position.y === color.endRow) winners.winners += 1;else winners.preWinnersPoints += color.endRow === 0 ? color.startRow - piece.position.y : piece.position.y;
        return winners;
    }, initialWinners);
}
function setColorScore(color) {
    color.score = getScore(color);
    return color;
}
function hasWon(color) {
    return color.score.winners === color.pieces.length;
}
exports.create = create;
exports.getColorAfterMove = getColorAfterMove;
exports.getScore = getScore;
exports.setColorScore = setColorScore;
exports.hasWon = hasWon;
//# sourceMappingURL=GameColor.js.map
//# sourceMappingURL=GameColor.js.map