"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BoardHelper = require("./BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _GamePieceType = require("../GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PieceHelper = function () {
    function PieceHelper() {
        _classCallCheck(this, PieceHelper);
    }

    _createClass(PieceHelper, null, [{
        key: "getStartPieces",
        value: function getStartPieces(boardOptions, startRow) {
            var pieces = [];
            for (var x = 0; x < boardOptions.size.x; x++) {
                var piece = {
                    x: x,
                    y: startRow
                };
                pieces.push(piece);
            }
            return pieces;
        }
    }, {
        key: "isBlackPiece",
        value: function isBlackPiece(position) {
            if (!position || !position.piece) return null;
            return position.piece === _GamePieceType2.default.black;
        }
    }, {
        key: "getOtherPieces",
        value: function getOtherPieces(pieces, remove) {
            return pieces.filter(function (piece) {
                return piece && (piece.x !== remove.x || piece.y !== remove.y);
            });
        }
    }, {
        key: "getPiecesOrdered",
        value: function getPiecesOrdered(pieces, isBlack) {
            var ordered = [];
            pieces.forEach(function (piece) {
                var y = _BoardHelper2.default.getY0Start7End(piece.y, isBlack);
                if (!ordered[y]) ordered[y] = [piece];else ordered[y].push(piece);
            });
            return ordered;
        }
    }]);

    return PieceHelper;
}();

exports.default = PieceHelper;