import log from 'ptz-log';
function createGameColor(boardConf, isBlack, pieces) {
    const { startRow, endRow } = isBlack ? boardConf.black : boardConf.white;
    return {
        score: {
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
function getColorAfterMove(color, move) {
    try {
        color.pieces = color.pieces.map(piece => {
            if (piece.position.x === move.from.x
                && piece.position.y === move.from.y) {
                piece.position.x = move.to.x;
                piece.position.y = move.to.y;
            }
            return piece;
        });
    }
    catch (e) {
        log('color', color);
        log('move', move);
        throw e;
    }
    return color;
}
function getColorScore(color) {
    const initialWinners = {
        winners: 0,
        preWinnersPoints: 0
    };
    return color.pieces.reduce((winners, piece) => {
        if (piece.position.y === color.endRow)
            winners.winners += 1;
        else
            winners.preWinnersPoints += color.endRow === 0
                ? color.startRow - piece.position.y
                : piece.position.y;
        return winners;
    }, initialWinners);
}
function setColorScore(color) {
    color.score = getColorScore(color);
    return color;
}
function colorWin(color) {
    return color.score.winners === color.pieces.length;
}
export { createGameColor, getColorAfterMove, getColorScore, setColorScore, colorWin };
//# sourceMappingURL=GameColor.js.map