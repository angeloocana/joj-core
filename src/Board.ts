import R from 'ramda';
import * as Position from './Position';

import log from 'ptz-log';

import * as I from './typings';

/**
 * Default 8x8 board size
 */
const defaultBoardSize: I.IBoardSize = { x: 8, y: 8 };

/**
 * Checks if position exists in this board size
 */
const hasPositionByBoardSize = (boardSize: I.IBoardSize, position: I.IPosition) => position
    && position.x >= 0 && position.y >= 0
    && boardSize.y > position.y && boardSize.x > position.x;

/**
 * Check if position exists on board
 */
const hasPosition = (board: I.IBoard, position: I.IPosition) => hasPositionByBoardSize(getBoardSize(board), position);

/**
 * Map some function in all board positions and return a new board
 */
const mapBoard = (board: I.IBoard, func: I.IMapBoardFunc) =>
    board.map(col => col.map(p => func(p)));

/**
 * Get START and END rows
 *
 * returns { startRow, endRow }
 */
function getStartEndRow(boardEndRow: number, isBlack: boolean): I.IStartEndRow {
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
function getStartEndRowsFromBoardSize(boardSize: I.IBoardSize): I.IStartEndRows {
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
const _getInitialBoard = R.memoize((boardSize: I.IBoardSize) => {

    // Do NOT remove the log below. We use it to check if cache works and this code run once.
    log('--> You MUST see this msg only once, otherwise memoize is not working <-- \n _getInitialBoard for', boardSize);

    const endRow = boardSize.y - 1;
    const board = [];

    for (let x = 0; x < boardSize.x; x++) {
        for (let y = 0; y < boardSize.y; y++) {
            if (!board[y])
                board[y] = [];

            const position: I.IPosition = { x, y };

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
function getInitialBoard(boardSize: I.IBoardSize): I.IBoard {
    return _getInitialBoard(boardSize);
}

function getPosition(board: I.IBoard, position: I.IPosition): I.IPosition {
    try {
        return board[position.y][position.x];
    } catch (e) {
        throw new Error('Error getting position');
    }
}

const setPosition = (board: I.IBoard, position: I.IPosition) =>
    mapBoard(board, p => Position.hasSameXY(p, position) ? position : p);

const setPieceOnBoard = (board: I.IBoard, position: I.IPosition, isBlack: boolean) =>
    setPosition(board, Position.setPiece(isBlack, position));

const removePieceOnBoard = (board: I.IBoard, position: I.IPosition) =>
    setPosition(board, Position.removePiece(position));

/**
 * Take a board: I.IPosition[][] an return the number of rows(X)
 */
const getBoardSizeX = (board: I.IBoard) => board[0].length;

/**
 * Take a board: I.IPosition[][] an return the number of rows(Y)
 */
const getBoardSizeY = (board: I.IBoard) => board.length;

/**
 * Take a board: I.IPosition[][] an return the number of columns and rows {x, y}
 */
function getBoardSize(board: I.IBoard): I.IBoardSize {
    return {
        x: getBoardSizeX(board),
        y: getBoardSizeY(board)
    };
}

/**
 * Takes a function to printPosition and print board.
 */
function printBoard(printPosition: I.IPrintPosition, board: I.IBoard): string {
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

/**
 * Gets all near positions and reduce. Foreach near position checks:
 *  - Has no piece: concat positions and return.
 *  - Has piece:
 *      1. Get jump position, if jump position do not exists return prev positions.
 *      2. Concat jump to positions then call whereCanIJump() and return it.
 */
function getPositionsWhereCanIGo(board: I.IBoard, from: I.IPosition, isBlack: boolean): I.IPosition[] {
    if (!from)
        return null;

    const allNearPositions = getNearPositions(board, from);

    return allNearPositions.reduce((positions, nearPosition) => {
        if (Position.hasNoPiece(nearPosition))
            return positions.concat(nearPosition);

        const jumpTo = getJumpPosition(from, nearPosition, board);
        if (!jumpTo)
            return positions;

        jumpTo.jumps = 1;

        return whereCanIJump(board, jumpTo, positions.concat(jumpTo), isBlack);
    }, []);
}

/**
 * Get all valid and invalid near positions.
 */
function getAllNearPositions(position: I.IXY): I.IXY[] {
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
const _getNearPositions = R.memoize((boardSize: I.IBoardSize, xy: I.IXY) =>
    getAllNearPositions(xy)
        .filter(p => hasPositionByBoardSize(boardSize, p)));

/**
 * Get all near positions from the given board instance.
 */
function getNearPositions(board: I.IBoard, position: I.IPosition): I.IPosition[] {
    return _getNearPositions(getBoardSize(board), Position.getXAndY(position))
        .map(p => getPosition(board, p));
}

/**
 * Get empty near positions
 */
const getEmptyNearPositions = (board: I.IBoard, position: I.IPosition) =>
    getNearPositions(board, position)
        .filter(p => Position.hasNoPiece(p));

/**
 * Get not empty near positions
 */
const getNotEmptyNearPositions = (board: I.IBoard, position: I.IPosition) =>
    getNearPositions(board, position)
        .filter(p => Position.hasPiece(p));

/**
 * Takes from position (x or y) and to jump position (x or y) then returns the x or y of the target position.
 */
function getJump(from: number, toJump: number): number {
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
function getJumpXY(from: I.IXY, toJump: I.IXY): I.IXY {
    return {
        x: getJump(from.x, toJump.x),
        y: getJump(from.y, toJump.y)
    };
}

/**
 * Returns the target board position from a jump if this position exists and is empty.
 */
function getJumpPosition(from: I.IXY, toJump: I.IXY, board: I.IBoard): I.IPosition {
    const jumpXY = getJumpXY(from, toJump);

    if (!hasPosition(board, jumpXY))
        return;

    const jumpPosition = getPosition(board, jumpXY);

    if (Position.hasPiece(jumpPosition))
        return;

    return jumpPosition;
}

/**
 * Gets all positions where can I jump recursively.
 * 1. Get not empty near positions from board.
 * 2. Foreach not empty near position:
 *  - Get jump position.
 *  - If jump position do NOT exists or accumulated positions
 *      contains jump position then return accumulated positions.
 *  - Set last position equals from.
 *  - Set Jumping black piece to true if is black piece.
 *  - Set Jumps to from jumps +1.
 *  - Call and return this method again recursively to get next jump positions.
 */
function whereCanIJump(board: I.IBoard, from: I.IPosition, positions: I.IPosition[], isBlack: boolean): I.IPosition[] {

    const nearPieces = getNotEmptyNearPositions(board, from);

    return nearPieces.reduce((accPositions, nearPiece) => {
        const jumpTo = getJumpPosition(from, nearPiece, board);

        if (!jumpTo || Position.containsXY(accPositions, jumpTo))
            return accPositions;

        jumpTo.lastPosition = from;
        jumpTo.jumpingBlackPiece = nearPiece.isBlack;
        jumpTo.jumps = from.jumps ? from.jumps + 1 : 2;

        return whereCanIJump(board, jumpTo, accPositions.concat(jumpTo), isBlack);

    }, positions);
}

/**
 * Get board with checked where can I go positions
 */
function getBoardWhereCanIGo(board: I.IBoard, from: I.IPosition, isBlack: boolean): I.IBoard {
    const positions = getPositionsWhereCanIGo(board, from, isBlack);
    return mapBoard(board, position => Position.setICanGoHere(positions, position));
}

/**
 * Takes a board and return white and black pieces.
 * Used to calculate score from a board.
 *
 * returns { white: [{x,y}], black: [{x,y}] }
 */
function getPiecesFromBoard(board: I.IBoard): I.IPieces {
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

export {
    _getInitialBoard,
    _getNearPositions,
    defaultBoardSize,
    getInitialBoard,
    getBoardWhereCanIGo,
    getStartEndRow,
    getStartEndRows,
    getEmptyNearPositions,
    getJumpPosition,
    getNearPositions,
    getNotEmptyNearPositions,
    getPosition,
    getPositionsWhereCanIGo,
    getPiecesFromBoard,
    printBoard,
    printBoardCurried,
    printUnicodeBoard,
    printXAndYBoard,
    whereCanIJump,
    setPieceOnBoard,
    setPosition,
    removePieceOnBoard,
    hasPosition,
    hasPositionByBoardSize
};
