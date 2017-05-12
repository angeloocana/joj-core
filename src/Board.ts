import R from 'ramda';
import * as Position from './Position';
import * as Positions from './Positions';

import log from 'ptz-log';

import {
    IBoard, IBoardConf,
    IBoardSize, IGetInitialBoardResult,
    IMapBoardFunc, IStartEndRow
} from './IBoard';
import { IPiece } from './IPiece';
import { IPosition } from './IPosition';
import { IPositionsWhereCanIGo } from './IPositionsWhereCanIGo';

/**
 * Default 8x8 board size
 */
const defaultBoardSize: IBoardSize = { x: 8, y: 8 };

/**
 * Check if position exists on board
 */
const hasPosition = (board: IBoard, position: IPosition) => position
    && position.x >= 0 && position.y >= 0
    && board.length > position.y && board[position.y].length > position.x;

/**
 * Map some function in all board positions and return a new board
 */
const mapBoard = (board: IBoard, func: IMapBoardFunc) =>
    board.map(col => col.map(p => func(p)));

function getColorStartEndRow(boardEndRow: number, isBlack: boolean): IStartEndRow {
    return {
        startRow: isBlack ? 0 : boardEndRow,
        endRow: isBlack ? boardEndRow : 0
    };
}

function getBoardConf(boardSize: IBoardSize): IBoardConf {
    const endRow = boardSize.y - 1;

    return {
        size: boardSize,
        endRow,
        white: getColorStartEndRow(endRow, false),
        black: getColorStartEndRow(endRow, true)
    };
}

/**
 * Default configuration for 8x8 board
 */
const defaultBoardConf = getBoardConf(defaultBoardSize);

/**
 * Get cached initial board, using memoize from ramda
 *
 * The _getInitialBoard returns :Function Type,
 * that's why we created getInitialBoard witch returns :IGetInitialBoardResult
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
const _getInitialBoard = R.memoize((boardConf: IBoardConf) => {

    // Do NOT remove the log below. We use it to check if cache works and this code run once.
    log('--> You MUST see this msg only once, otherwise memoize is not working <-- \n _getInitialBoard for', boardConf);

    const board = [],
        blackPieces: IPiece[] = [],
        whitePieces: IPiece[] = [];

    for (let x = 0; x < boardConf.size.x; x++) {
        for (let y = 0; y < boardConf.size.y; y++) {
            if (!board[y])
                board[y] = [];

            const position: IPosition = { x, y };

            if (y === 0) {
                position.isBlack = true;
                blackPieces.push({ position });
            }

            if (y === boardConf.endRow) {
                position.isBlack = false;
                whitePieces.push({ position });
            }

            board[y][x] = position;
        }
    }

    return {
        board,
        blackPieces,
        whitePieces
    };
});

/**
 * Get cached initial board, using memoize from ramda
 */
function getInitialBoard(boardConf: IBoardConf): IGetInitialBoardResult {
    return _getInitialBoard(boardConf);
}

function getPosition(board: IBoard, position: IPosition): IPosition {
    try {
        return board[position.y][position.x];
    } catch (e) {
        throw new Error('Error getting position');
    }
}

function setPosition(board: IBoard, position: IPosition): IBoard {
    try {
        board[position.y][position.x] = position;
        return board;
    } catch (e) {
        throw new Error('Error getting position');
    }
}

const setPieceOnBoard = (board: IBoard, position: IPosition, isBlack: boolean) =>
    setPosition(board, Position.setPiece(isBlack, position));

const removePieceOnBoard = (board: IBoard, position: IPosition) =>
    setPosition(board, Position.removePiece(position));

const getCleanBoard = (board: IBoard) => mapBoard(board, Position.getCleanPosition);

/**
 * Take a board: IPosition[][] an return the number of rows(X)
 */
const getBoardSizeX = (board: IBoard) => board[0].length;

/**
 * Take a board: IPosition[][] an return the number of rows(Y)
 */
const getBoardSizeY = (board: IBoard) => board.length;

/**
 * Take a board: IPosition[][] an return the number of columns and rows {x, y}
 */
function getBoardSize(board: IBoard): IBoardSize {
    return {
        x: getBoardSizeX(board),
        y: getBoardSizeY(board)
    };
}

type IPrintPosition = (position: IPosition) => string;

/**
 * Takes a function to printPosition and print board.
 */
function printBoard(printPosition: IPrintPosition, board: IBoard): string {
    return board.reduce((txtCol, col) => {
        return col.reduce((txtRow, position) => {
            return txtRow + printPosition(position);
        }, txtCol) + '\n';
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

// function printUnicodeBK(board: IBoard): string {
//     var txt = '';
//     for (var y = 0; y < board.length; y++) {
//         for (var x = 0; x < board[y].length; x++) {
//             const position = board[x][y];

//             if (Position.isBackGroundBlack(x, y)) {
//                 if (Position.hasWhitePiece(position))
//                     txt += '\u{25CF}';
//                 else if (Position.hasBlackPiece(position))
//                     txt += '\u{25CB}';
//                 else
//                     txt += ' ';
//             } else {
//                 if (Position.hasWhitePiece(position))
//                     txt += '\u{25D9}';
//                 else if (Position.hasBlackPiece(position))
//                     txt += '\u{25D8}';
//                 else
//                     txt += '\u{2588}';
//             }
//         }

//         txt += '\n';
//     }

//     return txt;
// }

function getPositionsWhereCanIGo(board: IBoard, from: IPosition, isBlack: boolean): IPositionsWhereCanIGo {
    if (!from)
        return null;

    const allNearPositions = getNearPositions(board, from, undefined);
    const positions = [];
    const orderedPositions = [];

    for (let i = 0; i < allNearPositions.length; i++) {
        const nearPosition = allNearPositions[i];
        if (Position.hasNoPiece(nearPosition)) {
            positions.push(nearPosition);

            const y = Position.getYAsBlack(getBoardSizeY(board), nearPosition.y, isBlack);
            if (!orderedPositions[y])
                orderedPositions[y] = [];

            orderedPositions[y][
                Position.getToSearchOrder(getBoardSize(board), nearPosition.x)] = nearPosition;
        } else {
            const jumpPosition = getJumpPosition(board, from, nearPosition);
            if (jumpPosition) {
                jumpPosition.jumps = 1;
                positions.push(jumpPosition);

                const y = Position.getYAsBlack(getBoardSizeY(board), jumpPosition.y, isBlack);
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

function getNearPositions(board: IBoard, position, onlyEmpty): IPosition[] {
    const positions: IPosition[] = [];

    function add(plusX: number, plusY: number): IPosition[] {
        var newPosition: IPosition = {
            x: position.x + plusX,
            y: position.y + plusY
        };

        if (!hasPosition(board, newPosition))
            return;

        newPosition = getPosition(board, newPosition);

        if (typeof onlyEmpty !== 'undefined') {
            if (onlyEmpty === Position.hasNoPiece(newPosition))
                positions.push(newPosition);
        } else
            positions.push(newPosition);
    }

    add(-1, -1);
    add(0, -1);
    add(+1, -1);

    add(-1, 0);
    add(+1, 0);

    add(-1, +1);
    add(0, +1);
    add(+1, +1);

    return positions;
}

function getJumpPosition(board: IBoard, from: IPosition, toJumpPosition: IPosition): IPosition {

    var jumpPosition: IPosition = { x: 0, y: 0 };

    if (from.x < toJumpPosition.x)
        jumpPosition.x = toJumpPosition.x + 1;
    else if (from.x > toJumpPosition.x)
        jumpPosition.x = toJumpPosition.x - 1;
    else jumpPosition.x = toJumpPosition.x;

    if (from.y < toJumpPosition.y)
        jumpPosition.y = toJumpPosition.y + 1;
    else if (from.y > toJumpPosition.y)
        jumpPosition.y = toJumpPosition.y - 1;
    else jumpPosition.y = toJumpPosition.y;

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
function whereCanIJump(board: IBoard, jumpFrom: IPosition, positions, orderedPositions: IPosition[][], isBlack: boolean): void {

    const nearFilledPositions: IPosition[]
        = getNearPositions(board, jumpFrom, false);

    nearFilledPositions.forEach(nearFilledPosition => {
        const jumpPosition: IPosition
            = getJumpPosition(board, jumpFrom,
                nearFilledPosition);

        if (jumpPosition) {
            if (Positions.notContains(positions, jumpPosition)) {

                jumpPosition.lastPosition = jumpFrom;
                jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlack;
                jumpPosition.jumps = jumpFrom.jumps ? jumpFrom.jumps++ : 2;

                positions.push(jumpPosition);
                const y = Position.getYAsBlack(getBoardSizeY(board), jumpPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), jumpPosition.x)] = jumpPosition;

                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    });
}

function getBoardWhereCanIGo(board: IBoard, from: IPosition, blackPiece: boolean): IBoard {
    const positions = getPositionsWhereCanIGo(board, from, blackPiece).positions;

    return mapBoard(board, position => {
        position.iCanGoHere = Positions.contains(positions, position);
        return position;
    });
}

export {
    defaultBoardSize,
    defaultBoardConf,
    getCleanBoard,
    getInitialBoard,
    getBoardConf,
    getBoardWhereCanIGo,
    getColorStartEndRow,
    getJumpPosition,
    getNearPositions,
    getPosition,
    getPositionsWhereCanIGo,
    printBoard,
    printBoardCurried,
    printUnicodeBoard,
    printXAndYBoard,
    whereCanIJump,
    setPieceOnBoard,
    setPosition,
    removePieceOnBoard,
    hasPosition
};
