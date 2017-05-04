'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GamePiece = undefined;

var _BoardPosition = require('./BoardPosition');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePiece = exports.GamePiece = function GamePiece(x, y, isBlack) {
    _classCallCheck(this, GamePiece);

    this.position = new _BoardPosition.BoardPosition({ x: x, y: y });
    this.position.setPiece(isBlack);
};
//# sourceMappingURL=GamePiece.js.map
//# sourceMappingURL=GamePiece.js.map