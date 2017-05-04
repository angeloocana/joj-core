'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GameColor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PieceHelper = require('./helpers/PieceHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameColor = exports.GameColor = function () {
    /**
     * Get a clean game color
     */
    function GameColor(boardOptions, isBlack) {
        _classCallCheck(this, GameColor);

        this.winners = 0;
        this.jumps = 0;
        this.points = 0;
        this.preWinnersPoints = 0;
        this.nMoves = 0;
        var y = boardOptions.size.y - 1;
        this.startRow = isBlack ? 0 : y;
        this.endRow = isBlack ? y : 0;
        this.pieces = _PieceHelper.pieceHelper.getStartPieces(boardOptions, this.startRow, isBlack);
    }

    _createClass(GameColor, [{
        key: 'setColorWinners',
        value: function setColorWinners() {
            this.winners = 0;
            this.preWinnersPoints = 0;
            for (var i = 0; i < this.pieces.length; i++) {
                var piece = this.pieces[i];
                if (piece.position.y === this.endRow) this.winners++;else this.preWinnersPoints += this.endRow === 0 ? this.startRow - piece.position.y : piece.position.y;
            }
        }
    }, {
        key: 'win',
        value: function win() {
            return this.winners === this.pieces.length;
        }
    }, {
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
//# sourceMappingURL=GameColor.js.map
//# sourceMappingURL=GameColor.js.map