'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPiece = exports.removePiece = exports.hasWhitePiece = exports.hasNoPiece = exports.hasPiece = exports.hasBlackPiece = exports.hasSamePieceAndPosition = exports.hasSamePosition = exports.hasSamePiece = exports.getYAsWhiteCurried = exports.getYAsWhite = exports.getYAsBlackCurried = exports.getYAsBlack = exports.getXandY = exports.getToSearchOrderCurried = exports.getToSearchOrder = exports.getCleanPosition = exports.isBackGroundBlack = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a position and return only {x, y, isBlack}.
 *
 * Remove unnecessery props like lastMoviment, lastPosition,
 * jumpingBlackPiece, jumps, iCanGoHere, lastMove, lastMoveJump, etc.
 */
function getCleanPosition(_ref) {
    var x = _ref.x,
        y = _ref.y,
        isBlack = _ref.isBlack;

    return { x: x, y: y, isBlack: isBlack };
}
/**
 * Takes a position and return only {x, y}.
 */
function getXandY(_ref2) {
    var x = _ref2.x,
        y = _ref2.y;

    return { x: x, y: y };
}
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
function isBackGroundBlack(x, y) {
    if (x % 2 === 0) {
        if (y % 2 === 0) return true;else return false;
    } else {
        if (y % 2 === 0) return false;else return true;
    }
}
/**
 * Returns the index to store the position in orderedPositions
 *
 * The order to search is 0, 7, 1, 6, 2, 5, 3, 1
 *
 * The goal is to fill the corners first
 */
function getToSearchOrder(boardSize, x) {
    switch (x) {
        case 0:
            return 0;
        case 1:
            return 2;
        case 2:
            return 4;
        case 3:
            return 6;
        case 4:
            return 7;
        case 5:
            return 5;
        case 6:
            return 3;
        case 7:
            return 1;
        default:
            return null;
    }
}
var getToSearchOrderCurried = _ramda2.default.curry(getToSearchOrder);
/**
 * It Inverts white Y position.
 *
 * For 8x8 board Get Y starting from 0 and ending on 7 for both black and white pieces.
 */
function getYAsBlack(boardSizeY, y, isBlack) {
    return isBlack ? y : boardSizeY - 1 - y;
}
var getYAsBlackCurried = _ramda2.default.curry(getYAsBlack);
/**
 * It Inverts black Y position.
 *
 * For 8x8 board Get Y starting from 7 and ending on 0 for both black and white pieces.
 */
function getYAsWhite(boardSizeY, y, isBlack) {
    return isBlack ? boardSizeY - 1 - y : y;
}
var getYAsWhiteCurried = _ramda2.default.curry(getYAsWhite);
exports.isBackGroundBlack = isBackGroundBlack;
exports.getCleanPosition = getCleanPosition;
exports.getToSearchOrder = getToSearchOrder;
exports.getToSearchOrderCurried = getToSearchOrderCurried;
exports.getXandY = getXandY;
exports.getYAsBlack = getYAsBlack;
exports.getYAsBlackCurried = getYAsBlackCurried;
exports.getYAsWhite = getYAsWhite;
exports.getYAsWhiteCurried = getYAsWhiteCurried;
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