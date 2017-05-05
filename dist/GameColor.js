'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GameColor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getColorWinners = getColorWinners;
exports.setColorWinners = setColorWinners;
exports.colorWin = colorWin;

var _PieceHelper = require('./helpers/PieceHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameColor = exports.GameColor = function () {
    /**
     * Get a clean game color
     */
    function GameColor(boardOptions, isBlack) {
        _classCallCheck(this, GameColor);

        this.winners = {
            winners: 0,
            preWinnersPoints: 0
        };
        this.jumps = 0;
        this.points = 0;
        this.nMoves = 0;
        var y = boardOptions.size.y - 1;
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;
        this.pieces = _PieceHelper.pieceHelper.getStartPieces(boardOptions, this.startRow, isBlack);
    }

    _createClass(GameColor, [{
        key: 'move',
        value: function move(startPosition, nextPosition) {
            this.pieces.forEach(function (piece) {
                if (piece.position.x === startPosition.x && piece.position.y === startPosition.y) {
                    piece.position.x = nextPosition.x;
                    piece.position.y = nextPosition.y;
                }
            });
        }
    }]);

    return GameColor;
}();

function getColorWinners(color) {
    var initialWinners = {
        winners: 0,
        preWinnersPoints: 0
    };
    return color.pieces.reduce(function (winners, piece) {
        if (piece.position.y === color.endRow) winners.winners += 1;else winners.preWinnersPoints += color.endRow === 0 ? color.startRow - piece.position.y : piece.position.y;
        return winners;
    }, initialWinners);
}
function setColorWinners(color) {
    color.winners = getColorWinners(color);
    return color;
}
function colorWin(color) {
    return color.winners.winners === color.pieces.length;
}
//# sourceMappingURL=GameColor.js.map
//# sourceMappingURL=GameColor.js.map