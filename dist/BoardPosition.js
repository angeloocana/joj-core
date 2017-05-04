'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoardPosition = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GamePieceType = require('./GamePieceType');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardPosition = exports.BoardPosition = function () {
    function BoardPosition(args) {
        _classCallCheck(this, BoardPosition);

        this.x = args.x;
        this.y = args.y;
        this.setPiece(args.isBlackPiece);
        // this.isWhiteHome = false;
        // this.isBlackHome = ;
    }

    _createClass(BoardPosition, [{
        key: 'setPiece',
        value: function setPiece(isBlack) {
            if (isBlack === true) this.piece = _GamePieceType.gamePieceType.black;else if (isBlack === false) this.piece = _GamePieceType.gamePieceType.white;else this.removePiece();
        }
    }, {
        key: 'removePiece',
        value: function removePiece() {
            this.piece = null;
        }
    }, {
        key: 'isBlackPiece',
        value: function isBlackPiece() {
            if (!this.piece) return null;
            return this.piece === _GamePieceType.gamePieceType.black;
        }
    }, {
        key: 'isWhitePiece',
        value: function isWhitePiece() {
            if (!this.piece) return null;
            return this.piece === _GamePieceType.gamePieceType.white;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.piece ? false : true;
        }
    }, {
        key: 'isSamePositionAs',
        value: function isSamePositionAs(comparePosition) {
            return this.x === comparePosition.x && this.y === comparePosition.y;
        }
    }, {
        key: 'move',
        value: function move(nextPosition) {
            nextPosition.setPiece(this.isBlackPiece());
            this.removePiece();
        }
    }]);

    return BoardPosition;
}();
//# sourceMappingURL=BoardPosition.js.map
//# sourceMappingURL=BoardPosition.js.map