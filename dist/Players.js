"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ptzAssert = require("ptz-assert");

var _GamePieceType = require("./GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Players = function Players() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Players);

    (0, _ptzAssert.ok)(args && args.black && args.white, "ERROR_BLACK_AND_WHITE_PlAYERS_REQUIRED");
    this.white = args.white;
    this.black = args.black;
    this.white.color = _GamePieceType2.default.white;
    this.black.color = _GamePieceType2.default.black;
};

exports.default = Players;