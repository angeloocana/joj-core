import R from 'ramda';
import * as Position from './Position';
/**
 * Default 8x8 board size
 */
const defaultBoardSize = { x: 8, y: 8 };
/**
 * Checks if position exists in this board size
 */
const hasPositionByBoardSize = (boardSize, position) => position
    && position.x >= 0 && position.y >= 0
    && boardSize.y > position.y && boardSize.x > position.x;
/**
 * Check if position exists on board
 */
const hasPosition = (board, position) => hasPositionByBoardSize(getBoardSize(board), position);
/**
 * Map some function in all board positions and return a new board
 */
const mapBoard = (board, func) => board.map(col => col.map(p => func(p)));
/**
 * Get START and END rows
 *
 * returns { startRow, endRow }
 */
function getStartEndRow(boardEndRow, isBlack) {
    return {
        startRow: isBlack ? 0 : boardEndRow,
        endRow: isBlack ? boardEndRow : 0
    };
}
/**
 * Takes a boardSize and return START and END rows for WHITE and BLACK.
 *
 * returns { white:{startRow, endRow}, black:{startRow, endRow} }
 */
function getStartEndRowsFromBoardSize(boardSize) {
    const endRow = boardSize.y - 1;
    return {
        white: getStartEndRow(endRow, false),
        black: getStartEndRow(endRow, true)
    };
}
/**
 * Takes a board and return START and END rows for WHITE and BLACK.
 *
 * returns { white:{startRow, endRow}, black:{startRow, endRow} }
 */
const getStartEndRows = R.compose(getStartEndRowsFromBoardSize, getBoardSize);
/**
 * Create position {x, y}
 */
function createCol(x, y) {
    return { x, y };
}
/**
 * Create positions row [{x,y},{x,y},{x,y}]
 */
const createRow = (boardSizeX, y) => R.range(0, boardSizeX).map(x => createCol(x, y));
/**
 * Get cached clean board, using memoize from ramda.
 *
 * The _getCleanBoard returns :Function Type,
 * that's why we created getCleanBoard witch returns :IPosition[y][x]
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
const _getCleanBoard = R.memoize((boardSize) => R.range(0, boardSize.y)
    .map(y => createRow(boardSize.x, y)));
/**
 * Get cached clean board, using memoize from ramda.
 */
function getCleanBoard(boardSize) {
    return _getCleanBoard(boardSize);
}
/**
 * Takes a board and return a new board with pieces.
 */
const getBoardWithPieces = (board, pieces) => mapBoard(board, p => {
    const { x, y } = p;
    const piece = Position.getPositionFromPositions(pieces, p);
    if (piece)
        return { x, y, isBlack: piece.isBlack };
    else
        return { x, y };
});
/**
 * Get start white and black pieces.
 */
const getStartWhiteBlack = (x, whiteY) => [
    { x, y: 0, isBlack: true },
    { x, y: whiteY, isBlack: false }
];
/**
 * Add start pieces recursively
 */
const addStartPieces = (x, whiteY, positions) => x < 0
    ? positions
    : addStartPieces(x - 1, whiteY, positions.concat(getStartWhiteBlack(x, whiteY)));
/**
 * Get start white and black pieces
 */
function getStartPieces(boardSize) {
    return addStartPieces(boardSize.x - 1, boardSize.y - 1, []);
}
/**
 * Get cached initial board, using memoize from ramda
 *
 * The _getInitialBoard returns :Function Type,
 * that's why we created getInitialBoard witch returns :IPosition[y][x]
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
const _getInitialBoard = R.memoize((boardSize) => getBoardWithPieces(getCleanBoard(boardSize), getStartPieces(boardSize)));
/**
 * Get cached initial board, using memoize from ramda.
 */
function getInitialBoard(boardSize) {
    return _getInitialBoard(boardSize);
}
/**
 * Gets board position from x and y coordinates.
 * @param board board to get the position.
 * @param position desired x,y position.
 */
function getPositionFromBoard(board, position) {
    try {
        return board[position.y][position.x];
    }
    catch (e) {
        throw new Error('Error getting position');
    }
}
/**
 * Get the desired x,y positions from a board.
 * @param positions list of x,y positions.
 * @param board board to get the positions from.
 */
const getPositionsFromBoard = (board, positions) => positions.map(p => getPositionFromBoard(board, p));
/**
 * Take a board: I.IPosition[][] an return the number of rows(X)
 */
const getBoardSizeX = (board) => board[0].length;
/**
 * Take a board: I.IPosition[][] an return the number of rows(Y)
 */
const getBoardSizeY = (board) => board.length;
/**
 * Take a board: I.IPosition[][] an return the number of columns and rows {x, y}
 */
function getBoardSize(board) {
    return {
        x: getBoardSizeX(board),
        y: getBoardSizeY(board)
    };
}
/**
 * Takes a function to printPosition and print board.
 */
const printBoard = (printPosition, board) => board.reduce((txtRow, col) => {
    return col.reduce((txt, position) => {
        return txt + printPosition(position);
    }, txtRow) + '\n';
}, '');
const printBoardCurried = R.curry(printBoard);
/**
 * Get board in a nice format to print it on console
 */
const printUnicodeBoard = printBoardCurried(Position.printUnicodePosition);
/**
 * Prints only X and Y positions of a board.
 */
const printXAndYBoard = printBoardCurried(Position.printXAndYPosition);
/**
 * Gets all positions where can I jump recursively.
 * 1. Get not empty near positions from board.
 * 2. Foreach not empty near position:
 *  - Get jump position.
 *  - If jump position do NOT exists or accumulated positions
 *      contains jump position then return accumulated positions.
 *  - Set Jumping black piece to true if is black piece.
 *  - Set Jumps to from + from.jumps.
 *  - Call and return this method again recursively to get next jump positions.
 */
function whereCanIJump(board, from, positions) {
    const nearPieces = getNotEmptyNearPositions(board, from);
    return nearPieces.reduce((accPositions, nearPiece) => {
        const jumpTo = getJumpPosition(from, nearPiece, board);
        if (!jumpTo || Position.containsXY(accPositions, jumpTo))
            return accPositions;
        jumpTo.jumpingBlackPiece = nearPiece.isBlack;
        jumpTo.jumps = (from.jumps || []).concat(from);
        return whereCanIJump(board, jumpTo, accPositions.concat(jumpTo));
    }, positions || []);
}
/**
 * Gets all near positions and reduce. Foreach near position checks:
 *  - Has no piece: concat positions and return.
 *  - Has piece:
 *      1. Get jump position, if jump position do not exists return prev positions.
 *      2. Concat jump to positions then call whereCanIJump() and return it.
 */
function getPositionsWhereCanIGo(board, from) {
    if (!from)
        return null;
    const allNearPositions = getNearPositions(board, from);
    return allNearPositions.reduce((positions, nearPosition) => {
        if (Position.hasNoPiece(nearPosition))
            return positions.concat(nearPosition);
        const jumpTo = getJumpPosition(from, nearPosition, board);
        if (!jumpTo)
            return positions;
        return whereCanIJump(board, jumpTo, positions.concat(jumpTo));
    }, []);
}
/**
 * Gets all pieces with whereCanIGo positions.
 */
function getPiecesWhereCanIGo(board, positions) {
    return positions.map(position => {
        const { x, y, isBlack } = position;
        return {
            x, y, isBlack,
            whereCanIGo: getPositionsWhereCanIGo(board, position)
        };
    });
}
/**
 * Get all valid and invalid near positions.
 */
const getAllNearPositions = (position) => [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
].map(toAdd => {
    return {
        x: position.x + toAdd[0],
        y: position.y + toAdd[1]
    };
});
/**
 * Get near positions and CACHES it for each boardSize
 */
// tslint:disable-next-line:variable-name
const _getNearPositions = R.memoize((boardSize, xy) => getAllNearPositions(xy).filter(p => hasPositionByBoardSize(boardSize, p)));
/**
 * Get all near positions from the given board instance.
 */
function getNearPositions(board, position) {
    const nearPositions = _getNearPositions(getBoardSize(board), Position.getXAndY(position));
    return getPositionsFromBoard(board, nearPositions);
}
/**
 * Get empty near positions
 */
const getEmptyNearPositions = (board, position) => getNearPositions(board, position)
    .filter(p => Position.hasNoPiece(p));
/**
 * Get not empty near positions
 */
const getNotEmptyNearPositions = (board, position) => getNearPositions(board, position)
    .filter(p => Position.hasPiece(p));
/**
 * Takes from position (x or y) and to jump position (x or y) then returns the x or y of the target position.
 */
function getJump(from, toJump) {
    if (from < toJump)
        return toJump + 1;
    else if (from > toJump)
        return toJump - 1;
    else
        return toJump;
}
/**
 * Returns the target position from a jump.
 */
function getJumpXY(from, toJump) {
    return {
        x: getJump(from.x, toJump.x),
        y: getJump(from.y, toJump.y)
    };
}
/**
 * Returns the target board position from a jump if this position exists and is empty.
 */
function getJumpPosition(from, toJump, board) {
    const jumpXY = getJumpXY(from, toJump);
    if (!hasPosition(board, jumpXY))
        return;
    const jumpPosition = getPositionFromBoard(board, jumpXY);
    if (Position.hasPiece(jumpPosition))
        return;
    return jumpPosition;
}
/**
 * Get board with checked where can I go positions
 */
function getBoardWhereCanIGo(board, from) {
    const positions = getPositionsWhereCanIGo(board, from);
    return mapBoard(board, position => Position.setICanGoHere(positions, position));
}
/**
 * Takes a board and return white and black pieces.
 * Used to calculate score from a board.
 *
 * returns { white: [{x,y}], black: [{x,y}] }
 */
function getPiecesFromBoard(board) {
    const initialPieces = {
        white: [],
        black: []
    };
    return board.reduce((piecesRow, row) => {
        return row.reduce((pieces, position) => {
            if (Position.hasBlackPiece(position))
                pieces.black = pieces.black.concat(position);
            else if (Position.hasWhitePiece(position))
                pieces.white = pieces.white.concat(position);
            return pieces;
        }, piecesRow);
    }, initialPieces);
}
export { _getCleanBoard, _getInitialBoard, _getNearPositions, defaultBoardSize, getInitialBoard, getBoardWithPieces, getBoardWhereCanIGo, getCleanBoard, getStartEndRow, getStartEndRows, getStartPieces, getEmptyNearPositions, getJumpPosition, getNearPositions, getNotEmptyNearPositions, getPiecesFromBoard, getPiecesWhereCanIGo, getPositionFromBoard, getPositionsFromBoard, getPositionsWhereCanIGo, mapBoard, printBoard, printBoardCurried, printUnicodeBoard, printXAndYBoard, whereCanIJump, hasPosition, hasPositionByBoardSize };
//# sourceMappingURL=Board.js.map