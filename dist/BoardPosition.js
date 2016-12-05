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
    }

    _createClass(BoardPosition, [{
        key: "isBlackPiece",
        value: function isBlackPiece() {
            if (!this.piece) return null;
            return this.piece === _GamePieceType2.default.black;
        }
    }, {
        key: "isSamePositionAs",
        value: function isSamePositionAs(comparePosition) {
            return this.x === comparePosition.x && this.y === comparePosition.y;
        }
    }]);

    return BoardPosition;
}();

exports.default = BoardPosition;