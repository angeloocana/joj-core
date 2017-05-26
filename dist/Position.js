'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPieceToWhite = exports.setPieceToBlack = exports.setPiece = exports.setICanGoHere = exports.printUnicodePosition = exports.printXAndYPosition = exports.notContainsXY = exports.hasWhitePiece = exports.hasNoPiece = exports.hasPiece = exports.hasBlackPiece = exports.hasSameXY = exports.getY0EndCurried = exports.getY0End = exports.getY0StartCurried = exports.getY0Start = exports.getXAndY = exports.getOrderedPositionsCurried = exports.getOrderedPositionsY0EndCurried = exports.getOrderedPositionsY0End = exports.getOrderedPositionsY0StartCurried = exports.getOrderedPositionsY0Start = exports.getOrderedPositions = exports.getToSearchOrder = exports.getPositionsWhereCanIGoFromArray = exports.getPositionWhereCanIGoFromArray = exports.getPositionFromPositions = exports.getPositionFromArray = exports.isBackGroundBlack = exports.containsXY = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get [x,y] and returns {x, y}
 *
 * const position = [5, 7];
 */
function getPositionFromArray(position) {
    return {
        x: position[0],
        y: position[1]
    };
}
/**
 * Gets an array like [[0, 7], [0, 6], [1, 6]],
 * where [[positionX, positionY], ...[[whereCanIGoX, whereCanIGoY]]]
 * then returns IPiece.
 *
 * Used to create clean test data.
 */
function getPositionWhereCanIGoFromArray(isBlack, positions) {
    var _getPositionFromArray = getPositionFromArray(_ramda2.default.head(positions)),
        x = _getPositionFromArray.x,
        y = _getPositionFromArray.y;

    return {
        x: x, y: y, isBlack: isBlack,
        whereCanIGo: _ramda2.default.tail(positions).map(getPositionFromArray)
    };
}
/**
 * Gets an array like [[[0, 7], [0, 6], [1, 6]]],
 * where [[[positionX, positionY], ...[[whereCanIGoX, whereCanIGoY]]]]
 * then returns IPiece[].
 *
 * Used to create clean test data.
 */
var getPositionsWhereCanIGoFromArray = function getPositionsWhereCanIGoFromArray(isBlack, positions) {
    return positions.map(function (p) {
        return getPositionWhereCanIGoFromArray(isBlack, p);
    });
};
/**
 * Returns a position from an array of positions with equal X an Y.
 */
var getPositionFromPositions = function getPositionFromPositions(positions, position) {
    return positions.find(function (p) {
        return hasSameXY(p, position);
    });
};
/**
 * Takes a position and return only {x, y}.
 */
function getXAndY(_ref) {
    var x = _ref.x,
        y = _ref.y;

    return { x: x, y: y };
}
/**
 * .isBlack equal true.
 */
var hasBlackPiece = function hasBlackPiece(p) {
    return p.isBlack === true;
};
/**
 * .isBlack equal false.
 */
var hasWhitePiece = function hasWhitePiece(p) {
    return p.isBlack === false;
};
/**
 * .isBlack is true or false.
 */
var hasPiece = _ramda2.default.anyPass([hasBlackPiece, hasWhitePiece]);
/**
 * .isBlack is undefined or null.
 */
var hasNoPiece = _ramda2.default.compose(_ramda2.default.not, hasPiece);
var setPiece = _ramda2.default.curry(function (isBlack, position) {
    return Object.assign({}, position, { isBlack: isBlack });
});
var setPieceToBlack = setPiece(true);
var setPieceToWhite = setPiece(false);
/**
 * Takes a position and return a new position with iCanGoHere checked.
 */
var setICanGoHere = function setICanGoHere(positionsWhereCanIGo, position) {
    return Object.assign({
        iCanGoHere: containsXY(positionsWhereCanIGo, position)
    }, position);
};
/**
 * Takes 2 positions and return true when same x and y.
 */
var hasSameXY = function hasSameXY(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
};
/**
 * Get the board background color of a position.
 */
var isBackGroundBlack = function isBackGroundBlack(x, y) {
    return x % 2 === 0 ? y % 2 === 0 : y % 2 !== 0;
};
/**
 * Returns the index to store the position in orderedPositions.
 *
 * The order to search is 0, 7, 1, 6, 2, 5, 3, 1.
 *
 * The goal is to fill the corners first.
 */
var getToSearchOrder = _ramda2.default.curry(function (boardSize, x) {
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
});
/**
 * It Inverts white Y position.
 *
 * For 8x8 board Get Y starting from 0 and ending on 7 for both black and white positions.
 */
var getY0Start = function getY0Start(boardSizeY, y, isBlack) {
    return isBlack ? y : boardSizeY - 1 - y;
};
var getY0StartCurried = _ramda2.default.curry(getY0Start);
/**
 * It Inverts black Y position.
 *
 * For 8x8 board Get Y starting from 7 and ending on 0 for both black and white positions.
 */
var getY0End = function getY0End(boardSizeY, y, isBlack) {
    return isBlack ? boardSizeY - 1 - y : y;
};
var getY0EndCurried = _ramda2.default.curry(getY0End);
var printXAndYPosition = function printXAndYPosition(p) {
    return ' ' + p.x + ',' + p.y + ' |';
};
function printUnicodePosition(position) {
    if (isBackGroundBlack(position.x, position.y)) {
        if (hasWhitePiece(position)) return '\u25CF';else if (hasBlackPiece(position)) return '\u25CB';else return ' ';
    } else {
        if (hasWhitePiece(position)) return '\u25D9';else if (hasBlackPiece(position)) return '\u25D8';else return '\u2588';
    }
}
/**
 * Checks if an array of positions contains a position.
 */
var containsXY = function containsXY(positions, position) {
    return positions ? positions.some(function (p) {
        return hasSameXY(p, position);
    }) : false;
};
/**
 * Checks if an array of positions NOT contains a position.
 */
var notContainsXY = _ramda2.default.compose(_ramda2.default.not, containsXY);
/**
 * Get ordered positions IPosition[Y][positions]
 */
var getOrderedPositions = function getOrderedPositions(getYAs, boardSizeY, isBlack, positions) {
    return positions.reduce(function (ordered, position) {
        var y = getYAs(boardSizeY, position.y, isBlack);
        ordered[y] = (ordered[y] || []).concat(position);
        return ordered;
    }, []);
};
var getOrderedPositionsCurried = _ramda2.default.curry(getOrderedPositions);
/**
 * Get ordered positions as black IPosition[Y = 0 -> endRow][positions]
 */
var getOrderedPositionsY0Start = getOrderedPositionsCurried(getY0Start);
/**
 * Get ordered positions as black IPosition[Y = 0 -> endRow][positions]
 */
var getOrderedPositionsY0StartCurried = _ramda2.default.curry(getOrderedPositionsY0Start);
/**
 * Get ordered positions as white IPosition[Y = endRow -> 0][positions]
 */
var getOrderedPositionsY0End = getOrderedPositionsCurried(getY0End);
/**
 * Get ordered positions as white IPosition[Y = endRow -> 0][positions]
 */
var getOrderedPositionsY0EndCurried = _ramda2.default.curry(getOrderedPositionsY0End);
exports.containsXY = containsXY;
exports.isBackGroundBlack = isBackGroundBlack;
exports.getPositionFromArray = getPositionFromArray;
exports.getPositionFromPositions = getPositionFromPositions;
exports.getPositionWhereCanIGoFromArray = getPositionWhereCanIGoFromArray;
exports.getPositionsWhereCanIGoFromArray = getPositionsWhereCanIGoFromArray;
exports.getToSearchOrder = getToSearchOrder;
exports.getOrderedPositions = getOrderedPositions;
exports.getOrderedPositionsY0Start = getOrderedPositionsY0Start;
exports.getOrderedPositionsY0StartCurried = getOrderedPositionsY0StartCurried;
exports.getOrderedPositionsY0End = getOrderedPositionsY0End;
exports.getOrderedPositionsY0EndCurried = getOrderedPositionsY0EndCurried;
exports.getOrderedPositionsCurried = getOrderedPositionsCurried;
exports.getXAndY = getXAndY;
exports.getY0Start = getY0Start;
exports.getY0StartCurried = getY0StartCurried;
exports.getY0End = getY0End;
exports.getY0EndCurried = getY0EndCurried;
exports.hasSameXY = hasSameXY;
exports.hasBlackPiece = hasBlackPiece;
exports.hasPiece = hasPiece;
exports.hasNoPiece = hasNoPiece;
exports.hasWhitePiece = hasWhitePiece;
exports.notContainsXY = notContainsXY;
exports.printXAndYPosition = printXAndYPosition;
exports.printUnicodePosition = printUnicodePosition;
exports.setICanGoHere = setICanGoHere;
exports.setPiece = setPiece;
exports.setPieceToBlack = setPieceToBlack;
exports.setPieceToWhite = setPieceToWhite;
//# sourceMappingURL=Position.js.map
//# sourceMappingURL=Position.js.map