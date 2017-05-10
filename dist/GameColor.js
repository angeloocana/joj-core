'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.colorWin = exports.setColorScore = exports.getColorScore = exports.getColorAfterMove = exports.createGameColor = undefined;

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGameColor(boardConf, isBlack, pieces) {
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
    try {
        color.pieces = color.pieces.map(function (piece) {
            if (piece.position.x === move.from.x && piece.position.y === move.from.y) {
                piece.position.x = move.to.x;
                piece.position.y = move.to.y;
            }
            return piece;
        });
    } catch (e) {
        (0, _ptzLog2.default)('color', color);
        (0, _ptzLog2.default)('move', move);
        throw e;
    }
    return color;
}
function getColorScore(color) {
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
    color.score = getColorScore(color);
    return color;
}
function colorWin(color) {
    return color.score.winners === color.pieces.length;
}
exports.createGameColor = createGameColor;
exports.getColorAfterMove = getColorAfterMove;
exports.getColorScore = getColorScore;
exports.setColorScore = setColorScore;
exports.colorWin = colorWin;
//# sourceMappingURL=GameColor.js.map
//# sourceMappingURL=GameColor.js.map