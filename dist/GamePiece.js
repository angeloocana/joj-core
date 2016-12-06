"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BoardPosition = require("./BoardPosition");

var _BoardPosition2 = _interopRequireDefault(_BoardPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePiece = function GamePiece(x, y, isBlack) {
    _classCallCheck(this, GamePiece);

    this.position = new _BoardPosition2.default({ x: x, y: y });
    this.position.setPiece(isBlack);
};

exports.default = GamePiece;