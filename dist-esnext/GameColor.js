function create(boardConf, isBlack, pieces) {
    const { startRow, endRow } = isBlack ? boardConf.black : boardConf.white;
    return {
        score: {
            won: false,
            winners: 0,
            preWinnersPoints: 0
        },
        jumps: 0,
        points: 0,
        nMoves: 0,
        pieces,
        isBlack,
        startRow,
        endRow
    };
}
/**
 * Takes a list of pieces and move.
 * Returns the pieces changed with move positions.
 */
function getPiecesAfterMove(pieces, move) {
    return pieces.map(piece => {
        if (piece.position.x === move.from.x
            && piece.position.y === move.from.y) {
            piece.position.x = move.to.x;
            piece.position.y = move.to.y;
        }
        return piece;
    });
}
function getColorScore(color) {
    let score = {
        won: false,
        winners: 0,
        preWinnersPoints: 0
    };
    score = color.pieces.reduce((winners, piece) => {
        if (piece.position.y === color.endRow)
            winners.winners += 1;
        else
            winners.preWinnersPoints += color.endRow === 0
                ? color.startRow - piece.position.y
                : piece.position.y;
        return winners;
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
export { create, getColorAfterMove, getColorScore };
//# sourceMappingURL=GameColor.js.map