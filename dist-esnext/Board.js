import R from 'ramda';
import * as Position from './Position';
import log from 'ptz-log';
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
 * Get cached initial board, using memoize from ramda
 *
 * The _getInitialBoard returns :Function Type,
 * that's why we created getInitialBoard witch returns :IGetInitialBoardResult
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
const _getInitialBoard = R.memoize((boardSize) => {
    // Do NOT remove the log below. We use it to check if cache works and this code run once.
    log('--> You MUST see this msg only once, otherwise memoize is not working <-- \n _getInitialBoard for', boardSize);
    const endRow = boardSize.y - 1;
    const board = [];
    for (let x = 0; x < boardSize.x; x++) {
        for (let y = 0; y < boardSize.y; y++) {
            if (!board[y])
                board[y] = [];
            const position = { x, y };
            if (y === 0)
                position.isBlack = true;
            if (y === endRow)
                position.isBlack = false;
            board[y][x] = position;
        }
    }
    return board;
});
/**
 * Get cached initial board, using memoize from ramda
 */
function getInitialBoard(boardSize) {
    return _getInitialBoard(boardSize);
}
function getPosition(board, position) {
    try {
        return board[position.y][position.x];
    }
    catch (e) {
        throw new Error('Error getting position');
    }
}
const setPosition = (board, position) => mapBoard(board, p => Position.hasSameXY(p, position) ? position : p);
const setPieceOnBoard = (board, position, isBlack) => setPosition(board, Position.setPiece(isBlack, position));
const removePieceOnBoard = (board, position) => setPosition(board, Position.removePiece(position));
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
function printBoard(printPosition, board) {
    return board.reduce((txtRow, col) => {
        return col.reduce((txt, position) => {
            return txt + printPosition(position);
        }, txtRow) + '\n';
    }, '');
}
const printBoardCurried = R.curry(printBoard);
/**
 * Get board in a nice format to print it on console
 */
const printUnicodeBoard = printBoardCurried(Position.printUnicodePosition);
/**
 * Prints only X and Y positions of a board.
 */
const printXAndYBoard = printBoardCurried(Position.printXAndYPosition);
function getPositionsWhereCanIGo(board, from, isBlack) {
    if (!from)
        return null;
    const allNearPositions = getNearPositions(board, from);
    const positions = [];
    const orderedPositions = [];
    for (let i = 0; i < allNearPositions.length; i++) {
        const nearPosition = allNearPositions[i];
        if (Position.hasNoPiece(nearPosition)) {
            positions.push(nearPosition);
            const y = Position.getY0Start(getBoardSizeY(board), nearPosition.y, isBlack);
            if (!orderedPositions[y])
                orderedPositions[y] = [];
            orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), nearPosition.x)] = nearPosition;
        }
        else {
            const jumpPosition = getJumpPosition(board, from, nearPosition);
            if (jumpPosition) {
                jumpPosition.jumps = 1;
                positions.push(jumpPosition);
                const y = Position.getY0Start(getBoardSizeY(board), jumpPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), jumpPosition.x)] = jumpPosition;
                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    }
    return {
        positions,
        orderedPositions
    };
}
/**
 * Get all valid and invalid near positions.
 */
function getAllNearPositions(position) {
    return [
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
}
/**
 * Get near positions and CACHES it for each boardSize
 */
// tslint:disable-next-line:variable-name
const _getNearPositions = R.memoize((boardSize, xy) => getAllNearPositions(xy)
    .filter(p => hasPositionByBoardSize(boardSize, p)));
/**
 * Get near positions from the given board instance.
 */
function getNearPositions(board, position) {
    return _getNearPositions(getBoardSize(board), Position.getXAndY(position))
        .map(p => getPosition(board, p));
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
function getJumpPosition(board, from, toJumpPosition) {
    var jumpPosition = { x: 0, y: 0 };
    if (from.x < toJumpPosition.x)
        jumpPosition.x = toJumpPosition.x + 1;
    else if (from.x > toJumpPosition.x)
        jumpPosition.x = toJumpPosition.x - 1;
    else
        jumpPosition.x = toJumpPosition.x;
    if (from.y < toJumpPosition.y)
        jumpPosition.y = toJumpPosition.y + 1;
    else if (from.y > toJumpPosition.y)
        jumpPosition.y = toJumpPosition.y - 1;
    else
        jumpPosition.y = toJumpPosition.y;
    if (!hasPosition(board, jumpPosition)) {
        return;
    }
    jumpPosition = getPosition(board, jumpPosition);
    if (Position.hasPiece(jumpPosition)) {
        return;
    }
    return jumpPosition;
}
// tslint:disable-next-line:max-line-length
function whereCanIJump(board, jumpFrom, positions, orderedPositions, isBlack) {
    const nearFilledPositions = getNotEmptyNearPositions(board, jumpFrom);
    nearFilledPositions.forEach(nearFilledPosition => {
        const jumpPosition = getJumpPosition(board, jumpFrom, nearFilledPosition);
        if (jumpPosition) {
            if (Position.notContainsXY(positions, jumpPosition)) {
                jumpPosition.lastPosition = jumpFrom;
                jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlack;
                jumpPosition.jumps = jumpFrom.jumps ? jumpFrom.jumps++ : 2;
                positions.push(jumpPosition);
                const y = Position.getY0Start(getBoardSizeY(board), jumpPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), jumpPosition.x)] = jumpPosition;
                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    });
}
/**
 * Get board with checked where can I go positions
 */
function getBoardWhereCanIGo(board, from, isBlack) {
    const { positions } = getPositionsWhereCanIGo(board, from, isBlack);
    return mapBoard(board, position => Position.setICanGoHere(positions, position));
}
/**
 * Get Pieces from board
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
export { _getInitialBoard, _getNearPositions, defaultBoardSize, getInitialBoard, getBoardWhereCanIGo, getStartEndRow, getStartEndRows, getEmptyNearPositions, getJumpPosition, getNearPositions, getNotEmptyNearPositions, getPosition, getPositionsWhereCanIGo, getPiecesFromBoard, printBoard, printBoardCurried, printUnicodeBoard, printXAndYBoard, whereCanIJump, setPieceOnBoard, setPosition, removePieceOnBoard, hasPosition, hasPositionByBoardSize };
//# sourceMappingURL=Board.js.map