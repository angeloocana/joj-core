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
            won: false,
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
/**
 * Takes a list of pieces and move.
 * Returns the pieces changed with move positions.
 */
function getPiecesAfterMove(pieces, move) {
    return pieces.map(function (piece) {
        if (piece.position.x === move.from.x && piece.position.y === move.from.y) {
            piece.position.x = move.to.x;
            piece.position.y = move.to.y;
        }
        return piece;
    });
}
function getColorScore(color) {
    var score = {
        won: false,
        winners: 0,
        preWinnersPoints: 0
    };
    score = color.pieces.reduce(function (newScore, piece) {
        if (piece.position.y === color.endRow) newScore.winners += 1;else newScore.preWinnersPoints += color.endRow === 0 ? color.startRow - piece.position.y : piece.position.y;
        return newScore;
    }, score);
    score.won = score.winners === color.pieces.length;
    return score;
}
/**
 * Takes a GameColor and move.
 * Sets:
 *  - .pieces = getPiecesAfterMove.
 *  - .score = getScore.
 * Returns GameColor after move.
 */
function getColorAfterMove(color, move) {
    color.pieces = getPiecesAfterMove(color.pieces, move);
    color.score = getColorScore(color);
    return color;
}
exports.create = create;
exports.getColorAfterMove = getColorAfterMove;
exports.getColorScore = getColorScore;
//# sourceMappingURL=GameColor.js.map
//# sourceMappingURL=GameColor.js.map