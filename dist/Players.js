'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Players = undefined;

var _ptzAssert = require('ptz-assert');

var _GamePieceType = require('./GamePieceType');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Players = exports.Players = function Players() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Players);

    (0, _ptzAssert.ok)(args && args.black && args.white, 'ERROR_BLACK_AND_WHITE_PlAYERS_REQUIRED');
    this.white = args.white;
    this.black = args.black;
    this.white.color = _GamePieceType.gamePieceType.white;
    this.black.color = _GamePieceType.gamePieceType.black;
};
//# sourceMappingURL=Players.js.map
//# sourceMappingURL=Players.js.map