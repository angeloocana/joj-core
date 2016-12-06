"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GamePieceType = require("./GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardPosition = function () {
    function BoardPosition(args) {
        _classCallCheck(this, BoardPosition);

        this.x = args.x;
        this.y = args.y;
        this.setPiece(args.isBlackPiece);
    }

    _createClass(BoardPosition, [{
        key: "setPiece",
        value: function setPiece(isBlack) {
            if (isBlack === true) this.piece = _GamePieceType2.default.black;else if (isBlack === false) this.piece = _GamePieceType2.default.white;else this.removePiece();
        }
    }, {
        key: "removePiece",
        value: function removePiece() {
            this.piece = null;
        }
    }, {
        key: "isBlackPiece",
        value: function isBlackPiece() {
            if (!this.piece) return null;
            return this.piece === _GamePieceType2.default.black;
        }
    }, {
        key: "isWhitePiece",
        value: function isWhitePiece() {
            if (!this.piece) return null;
            return this.piece === _GamePieceType2.default.white;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.piece ? false : true;
        }
    }, {
        key: "isSamePositionAs",
        value: function isSamePositionAs(comparePosition) {
            return this.x === comparePosition.x && this.y === comparePosition.y;
        }
    }, {
        key: "move",
        value: function move(nextPosition) {
            nextPosition.setPiece(this.isBlackPiece());
            this.removePiece();
        }
    }]);

    return BoardPosition;
}();

exports.default = BoardPosition;