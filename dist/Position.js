'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPiece = exports.removePiece = exports.hasWhitePiece = exports.hasNoPiece = exports.hasPiece = exports.hasBlackPiece = exports.hasSamePieceAndPosition = exports.hasSamePosition = exports.hasSamePiece = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasBlackPiece = _ramda2.default.propEq('isBlack', true);
var hasWhitePiece = _ramda2.default.propEq('isBlack', false);
var hasPiece = _ramda2.default.anyPass([hasBlackPiece, hasWhitePiece]);
var hasNoPiece = _ramda2.default.compose(_ramda2.default.not, hasPiece);
function hasSamePiece(p1, p2) {
    return p1.isBlack === p2.isBlack;
}
function hasSamePosition(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
var hasSamePieceAndPosition = _ramda2.default.allPass([hasSamePiece, hasSamePosition]);
function setPiece(position, isBlack) {
    position.isBlack = isBlack;
    return position;
}
/**
 * Deletes .isBlack prop from position
 */
function removePiece(position) {
    delete position.isBlack;
    return position;
}
exports.hasSamePiece = hasSamePiece;
exports.hasSamePosition = hasSamePosition;
exports.hasSamePieceAndPosition = hasSamePieceAndPosition;
exports.hasBlackPiece = hasBlackPiece;
exports.hasPiece = hasPiece;
exports.hasNoPiece = hasNoPiece;
exports.hasWhitePiece = hasWhitePiece;
exports.removePiece = removePiece;
exports.setPiece = setPiece;
//# sourceMappingURL=Position.js.map
//# sourceMappingURL=Position.js.map