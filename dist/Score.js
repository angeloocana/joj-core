'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInitialScore = exports.getInitialColorScore = exports.getScore = exports.getColorScore = undefined;

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
function getColorScore(_ref, positions) {
    var startRow = _ref.startRow,
        endRow = _ref.endRow;

    var score = positions.reduce(function (newScore, p) {
        if (p.y === endRow) newScore.winners += 1;else newScore.preWinnersPoints += endRow === 0 ? startRow - p.y : p.y;
        return newScore;
    }, getInitialColorScore());
    score.won = score.winners === positions.length;
    return score;
}
/**
 * Takes a board and return Score
 */
function getScore(board) {
    var pieces = Board.getPiecesFromBoard(board);
    var startEndRows = Board.getStartEndRows(board);
    var white = getColorScore(startEndRows.white, pieces.white);
    var black = getColorScore(startEndRows.black, pieces.black);
    return {
        ended: white.won || black.won,
        white: white,
        black: black
    };
}
exports.getColorScore = getColorScore;
exports.getScore = getScore;
exports.getInitialColorScore = getInitialColorScore;
exports.getInitialScore = getInitialScore;
//# sourceMappingURL=Score.js.map
//# sourceMappingURL=Score.js.map