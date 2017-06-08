import R from 'ramda';
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
    const { x, y } = getPositionFromArray(R.head(positions));
    return {
        x, y, isBlack,
        whereCanIGo: R.tail(positions).map(getPositionFromArray)
    };
}
/**
 * Gets an array like [[[0, 7], [0, 6], [1, 6]]],
 * where [[[positionX, positionY], ...[[whereCanIGoX, whereCanIGoY]]]]
 * then returns IPiece[].
 *
 * Used to create clean test data.
 */
const getPositionsWhereCanIGoFromArray = (isBlack, positions) => positions.map(p => getPositionWhereCanIGoFromArray(isBlack, p));
/**
 * Returns a position from an array of positions with equal X an Y.
 */
const getPositionFromPositions = (positions, position) => positions.find(p => hasSameXY(p, position));
/**
 * Takes a position and return only {x, y}.
 */
function getXAndY({ x, y }) {
    return { x, y };
}
/**
 * .isBlack equal true.
 */
const hasBlackPiece = (p) => p.isBlack === true;
/**
 * .isBlack equal false.
 */
const hasWhitePiece = (p) => p.isBlack === false;
/**
 * .isBlack is true or false.
 */
const hasPiece = R.anyPass([hasBlackPiece, hasWhitePiece]);
/**
 * .isBlack is undefined or null.
 */
const hasNoPiece = R.compose(R.not, hasPiece);
const setPiece = (isBlack, position) => Object.assign({}, position, { isBlack });
const setPieceCurried = R.curry(setPiece);
const setPieceToBlack = setPieceCurried(true);
const setPieceToWhite = setPieceCurried(false);
/**
 * Takes a position and return a new position with iCanGoHere checked.
 */
const setICanGoHere = (positionsWhereCanIGo, position) => Object.assign({
    iCanGoHere: containsXY(positionsWhereCanIGo, position)
}, position);
/**
 * Takes 2 positions and return true when same x and y.
 */
const hasSameXY = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
/**
 * Get the board background color of a position.
 */
const isBackGroundBlack = (x, y) => (x % 2 === 0) ? (y % 2 === 0) : (y % 2 !== 0);
/**
 * Returns the index to store the position in orderedPositions.
 *
 * The order to search is 0, 7, 1, 6, 2, 5, 3, 1.
 *
 * The goal is to fill the corners first.
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
const getToSearchOrderCurried = R.curry(getToSearchOrder);
/**
 * It Inverts white Y position.
 *
 * For 8x8 board Get Y starting from 0 and ending on 7 for both black and white positions.
 */
const getY0Start = (boardSizeY, y, isBlack) => isBlack ? y : (boardSizeY - 1) - y;
const getY0StartCurried = R.curry(getY0Start);
/**
 * It Inverts black Y position.
 *
 * For 8x8 board Get Y starting from 7 and ending on 0 for both black and white positions.
 */
const getY0End = (boardSizeY, y, isBlack) => isBlack ? (boardSizeY - 1) - y : y;
const getY0EndCurried = R.curry(getY0End);
const printXAndYPosition = (p) => ` ${p.x},${p.y} |`;
/**
 * Print unicode position for black background.
 * @param p position
 */
const printUnicodeBackgroundBlack = (p) => {
    if (hasWhitePiece(p))
        return '\u{25CF}';
    else if (hasBlackPiece(p))
        return '\u{25CB}';
    else
        return ' ';
};
/**
 * Print unicode position for white background.
 * @param p position
 */
const printUnicodeBackgroundWhite = (p) => {
    if (hasWhitePiece(p))
        return '\u{25D9}';
    else if (hasBlackPiece(p))
        return '\u{25D8}';
    else
        return '\u{2588}';
};
/**
 * Print unicode position to print the board in console.
 * @param p position
 */
const printUnicodePosition = (p) => isBackGroundBlack(p.x, p.y)
    ? printUnicodeBackgroundBlack(p)
    : printUnicodeBackgroundWhite(p);
/**
 * Checks if an array of positions contains a position.
 */
const containsXY = (positions, position) => positions ? positions.some(p => hasSameXY(p, position)) : false;
/**
 * Checks if an array of positions NOT contains a position.
 */
const notContainsXY = R.compose(R.not, containsXY);
/**
 * Get ordered positions IPosition[Y][positions]
 */
const getOrderedPositions = (getYAs, boardSizeY, isBlack, positions) => positions.reduce((ordered, position) => {
    const y = getYAs(boardSizeY, position.y, isBlack);
    ordered[y] = (ordered[y] || []).concat(position);
    return ordered;
}, []);
const getOrderedPositionsCurried = R.curry(getOrderedPositions);
/**
 * Get ordered positions as black IPosition[Y = 0 -> endRow][positions]
 */
const getOrderedPositionsY0Start = getOrderedPositionsCurried(getY0Start);
/**
 * Get ordered positions as black IPosition[Y = 0 -> endRow][positions]
 */
const getOrderedPositionsY0StartCurried = R.curry(getOrderedPositionsY0Start);
/**
 * Get ordered positions as white IPosition[Y = endRow -> 0][positions]
 */
const getOrderedPositionsY0End = getOrderedPositionsCurried(getY0End);
/**
 * Get ordered positions as white IPosition[Y = endRow -> 0][positions]
 */
const getOrderedPositionsY0EndCurried = R.curry(getOrderedPositionsY0End);
export { containsXY, isBackGroundBlack, getPositionFromArray, getPositionFromPositions, getPositionWhereCanIGoFromArray, getPositionsWhereCanIGoFromArray, getToSearchOrder, getToSearchOrderCurried, getOrderedPositions, getOrderedPositionsY0Start, getOrderedPositionsY0StartCurried, getOrderedPositionsY0End, getOrderedPositionsY0EndCurried, getOrderedPositionsCurried, getXAndY, getY0Start, getY0StartCurried, getY0End, getY0EndCurried, hasSameXY, hasBlackPiece, hasPiece, hasNoPiece, hasWhitePiece, notContainsXY, printXAndYPosition, printUnicodePosition, setICanGoHere, setPiece, setPieceCurried, setPieceToBlack, setPieceToWhite };
//# sourceMappingURL=Position.js.map