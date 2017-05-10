import R from 'ramda';
import * as Position from './Position';
import * as Positions from './Positions';

import log from 'ptz-log';

import { IBoard, IBoardConf, IBoardSize, IStartEndRow } from './IBoard';
import { IMove } from './IMove';
import { IPiece } from './IPiece';
import { IPosition } from './IPosition';
import { IPositionsWhereCanIGo } from './IPositionsWhereCanIGo';

const defaultBoardSize: IBoardSize = {
    x: 8,
    y: 8
};

type IMapBoardFunc = (position: IPosition) => IPosition;
function mapBoard(board: IBoard, func: IMapBoardFunc): IBoard {
    return board.map(col => col.map(position => func(position)));
}

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

const defaultBoardConf = getBoardConf(defaultBoardSize);

function getStartRow(boardConf: IBoardConf, isBlack: boolean): number {
    const color = isBlack ? boardConf.black : boardConf.white;
    return color.startRow;
}

function isBackGroundBlack(x: number, y: number): boolean {
    if (x % 2 === 0) {
        if (y % 2 === 0)
            return true;
        else
            return false;
    } else {
        if (y % 2 === 0)
            return false;
        else
            return true;
    }
}

function getToSearchOrder(x: number): number {
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

function getY0Start7End(y: number, isBlack: boolean): number {
    if (isBlack)
        return y;

    switch (y) {
        case 0:
            return 7;
        case 1:
            return 6;
        case 2:
            return 5;
        case 3:
            return 4;
        case 4:
            return 3;
        case 5:
            return 2;
        case 6:
            return 1;
        case 7:
            return 0;
        default:
            return null;
    }
}

function getY7Start0End(y: number, isBlack: boolean): number {
    if (!isBlack)
        return y;

    switch (y) {
        case 0:
            return 7;
        case 1:
            return 6;
        case 2:
            return 5;
        case 3:
            return 4;
        case 4:
            return 3;
        case 5:
            return 2;
        case 6:
            return 1;
        case 7:
            return 0;
        default:
            return null;
    }
}

interface IGetInitialBoardResult {
    board: IPosition[][];
    whitePieces: IPiece[];
    blackPieces: IPiece[];
}

// tslint:disable-next-line:variable-name
const _getInitialBoard = R.memoize((boardConf: IBoardConf) => {
    log('_getInitialBoard for', boardConf);
    const board = [],
        blackPieces: IPiece[] = [],
        whitePieces: IPiece[] = [];

    for (let x = 0; x < boardConf.size.x; x++) {
        for (let y = 0; y < boardConf.size.y; y++) {
            if (!board[x])
                board[x] = [];

            const position: IPosition = { x, y };

            if (y === 0) {
                position.isBlack = true;
                blackPieces.push({ position });
            }

            if (y === boardConf.endRow) {
                position.isBlack = false;
                whitePieces.push({ position });
            }

            board[x][y] = position;
        }
    }

    return {
        board,
        blackPieces,
        whitePieces
    };
});

function getInitialBoard(boardConf: IBoardConf): IGetInitialBoardResult {
    return _getInitialBoard(boardConf);
}

function getPosition(board: IBoard, position: IPosition): IPosition {
    try {
        return board[position.x][position.y];
    } catch (e) {
        log('Error getting position:', position, ' \n board:', board);
        throw new Error('Error getting position');
    }
}

function setPosition(board: IBoard, position: IPosition): IBoard {
    try {
        board[position.x][position.y] = position;
        return board;
    } catch (e) {
        log('Error getting position: ', position);
        throw new Error('Error getting position');
    }
}

function setPieceOnBoard(board: IBoard, position: IPosition, isBlack: boolean): IBoard {
    return setPosition(board, Position.setPiece(position, isBlack));
}

function removePieceOnBoard(board: IBoard, position: IPosition): IBoard {
    return setPosition(board, Position.removePiece(position));
}

function clean(board: IBoard): IBoard {
    return mapBoard(board, position => {
        position.iCanGoHere = false;
        position.lastMove = false;
        position.lastMoveJump = false;
        return position;
    });
}

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

            const y = getY0Start7End(nearPosition.y,
                isBlack);
            if (!orderedPositions[y])
                orderedPositions[y] = [];

            orderedPositions[y][
                getToSearchOrder(nearPosition.x)] = nearPosition;
        } else {
            const jumpPosition = getJumpPosition(board, from, nearPosition);
            if (jumpPosition) {
                jumpPosition.jumps = 1;
                positions.push(jumpPosition);

                const y = getY0Start7End(jumpPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][getToSearchOrder(jumpPosition.x)] = jumpPosition;

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
function whereCanIJump(board: IBoard, jumpfrom: IPosition, positions, orderedPositions: IPosition[][], isBlack: boolean): void {

    const nearFilledPositions: IPosition[]
        = getNearPositions(board, jumpfrom, false);

    nearFilledPositions.forEach(nearFilledPosition => {
        const jumpPosition: IPosition
            = getJumpPosition(board, jumpfrom,
                nearFilledPosition);

        if (jumpPosition) {
            if (Positions.notContains(positions, jumpPosition)) {

                jumpPosition.lastPosition = jumpfrom;
                jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlack;
                jumpPosition.jumps = jumpfrom.jumps ? jumpfrom.jumps++ : 2;

                positions.push(jumpPosition);
                const y = getY0Start7End(jumpPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][getToSearchOrder(jumpPosition.x)] = jumpPosition;

                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    });
}

function setWhereCanIGo(board: IBoard, from: IPosition, blackPiece: boolean): IBoard {
    const positions = getPositionsWhereCanIGo(board, from, blackPiece).positions;

    return mapBoard(board, position => {
        position.iCanGoHere = Positions.contains(positions, position);
        return position;
    });
}

function printUnicode(board: IBoard): string {
    var txt = '';
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            const position = board[x][y];

            if (isBackGroundBlack(x, y)) {
                if (Position.hasWhitePiece(position))
                    txt += '\u{25CF}';
                else if (Position.hasBlackPiece(position))
                    txt += '\u{25CB}';
                else
                    txt += ' ';
            } else {
                if (Position.hasWhitePiece(position))
                    txt += '\u{25D9}';
                else if (Position.hasBlackPiece(position))
                    txt += '\u{25D8}';
                else
                    txt += '\u{2588}';
            }
        }

        txt += '\n';
    }

    return txt;
}

function getBoardAfterMove(board: IBoard, move: IMove): IBoard {

    move.to.lastMove = true;
    move.from.lastMove = true;

    board = setPieceOnBoard(board, move.to, Position.hasBlackPiece(move.from));
    board = removePieceOnBoard(board, move.from);

    let jumpPosition = move.to.lastPosition;
    while (jumpPosition) {
        getPosition(board, jumpPosition).lastMoveJump = true;
        jumpPosition = jumpPosition.lastPosition;
    }

    return board;
}

function hasPosition(board: IBoard, position: IPosition): boolean {
    if (!position || position.x < 0 || position.y < 0)
        return false;
    return board.length > position.x && board[position.x].length > position.y;
}

function isWhiteHome(position: IPosition, boardConf: IBoardConf): boolean {
    if (position.y === boardConf.size.y - 1)
        return true;
}

function isBlackHome(position: IPosition): boolean {
    if (position.y === 0)
        return true;
}

export {
    defaultBoardSize,
    defaultBoardConf,
    getBoardAfterMove,
    clean,
    getInitialBoard,
    getToSearchOrder,
    getBoardConf,
    getColorStartEndRow,
    getJumpPosition,
    getNearPositions,
    getPosition,
    getPositionsWhereCanIGo,
    getStartRow,
    getY0Start7End,
    getY7Start0End,
    isBackGroundBlack,
    isBlackHome,
    isWhiteHome,
    printUnicode,
    whereCanIJump,
    setPosition,
    setWhereCanIGo,
    hasPosition
};