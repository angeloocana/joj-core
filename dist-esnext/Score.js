import * as Board from './Board';
function getInitialColorScore() {
    return {
        won: false,
        winners: 0,
        preWinnersPoints: 0
    };
}
function getInitialScore() {
    return {
        black: getInitialColorScore(),
        ended: false,
        white: getInitialColorScore()
    };
}
/**
 * Get color score
 *
 * returns { won, winners, preWinnersPoints }
 */
function getColorScore({ startRow, endRow }, positions) {
    const score = positions.reduce((newScore, p) => {
        if (p.y === endRow)
            newScore.winners += 1;
        else
            newScore.preWinnersPoints += endRow === 0
                ? startRow - p.y
                : p.y;
        return newScore;
    }, getInitialColorScore());
    score.won = score.winners === positions.length;
    return score;
}
/**
 * Takes a board and return Score
 */
function getScore(board) {
    const pieces = Board.getPiecesFromBoard(board);
    const startEndRows = Board.getStartEndRows(board);
    const white = getColorScore(startEndRows.white, pieces.white);
    const black = getColorScore(startEndRows.black, pieces.black);
    return {
        ended: white.won || black.won,
        white,
        black
    };
}
export { getColorScore, getScore, getInitialColorScore, getInitialScore };
//# sourceMappingURL=Score.js.map