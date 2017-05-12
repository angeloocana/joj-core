import R from 'ramda';
import * as Position from './Position';
import * as Positions from './Positions';
import log from 'ptz-log';
/**
 * Default 8x8 board size
 */
const defaultBoardSize = { x: 8, y: 8 };
/**
 * Check if position exists on board
 */
const hasPosition = (board, position) => position
    && position.x >= 0 && position.y >= 0
    && board.length > position.x && board[position.x].length > position.y;
/**
 * Map some function in all board positions and return a new board
 */
const mapBoard = (board, func) => board.map(col => col.map(p => func(p)));
function getColorStartEndRow(boardEndRow, isBlack) {
    return {
        startRow: isBlack ? 0 : boardEndRow,
        endRow: isBlack ? boardEndRow : 0
    };
}
function getBoardConf(boardSize) {
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
 * that's why we created getInitialBoard wich returns :IGetInitialBoardResult
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
const _getInitialBoard = R.memoize((boardConf) => {
    // Do NOT remove the log below. We use it to check if cache works and this code run once.
    log('_getInitialBoard for', boardConf);
    const board = [], blackPieces = [], whitePieces = [];
    for (let x = 0; x < boardConf.size.x; x++) {
        for (let y = 0; y < boardConf.size.y; y++) {
            if (!board[x])
                board[x] = [];
            const position = { x, y };
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
/**
 * Get cached initial board, using memoize from ramda
 */
function getInitialBoard(boardConf) {
    return _getInitialBoard(boardConf);
}
function getPosition(board, position) {
    try {
        return board[position.x][position.y];
    }
    catch (e) {
        log('Error getting position:', position, ' \n board:', board);
        throw new Error('Error getting position');
    }
}
function setPosition(board, position) {
    try {
        board[position.x][position.y] = position;
        return board;
    }
    catch (e) {
        log('Error getting position: ', position);
        throw new Error('Error getting position');
    }
}
const setPieceOnBoard = (board, position, isBlack) => setPosition(board, Position.setPiece(position, isBlack));
const removePieceOnBoard = (board, position) => setPosition(board, Position.removePiece(position));
const getCleanBoard = (board) => mapBoard(board, Position.getCleanPosition);
/**
 * Take a board: IPosition[][] an return the number of rows(X)
 */
const getBoardSizeX = (board) => board.length;
/**
 * Take a board: IPosition[][] an return the number of rows(Y)
 */
const getBoardSizeY = (board) => board[0].length;
/**
 * Take a board: IPosition[][] an return the number of columns and rows {x, y}
 */
function getBoardSize(board) {
    return {
        x: getBoardSizeX(board),
        y: getBoardSizeY(board)
    };
}
/**
 * Get board in a nice format to print it on console
 */
function printUnicode(board) {
    var txt = '';
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            const position = board[x][y];
            if (Position.isBackGroundBlack(x, y)) {
                if (Position.hasWhitePiece(position))
                    txt += '\u{25CF}';
                else if (Position.hasBlackPiece(position))
                    txt += '\u{25CB}';
                else
                    txt += ' ';
            }
            else {
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
function getPositionsWhereCanIGo(board, from, isBlack) {
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
            orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), nearPosition.x)] = nearPosition;
        }
        else {
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
function getNearPositions(board, position, onlyEmpty) {
    const positions = [];
    function add(plusX, plusY) {
        var newPosition = {
            x: position.x + plusX,
            y: position.y + plusY
        };
        if (!hasPosition(board, newPosition))
            return;
        newPosition = getPosition(board, newPosition);
        if (typeof onlyEmpty !== 'undefined') {
            if (onlyEmpty === Position.hasNoPiece(newPosition))
                positions.push(newPosition);
        }
        else
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
function whereCanIJump(board, jumpfrom, positions, orderedPositions, isBlack) {
    const nearFilledPositions = getNearPositions(board, jumpfrom, false);
    nearFilledPositions.forEach(nearFilledPosition => {
        const jumpPosition = getJumpPosition(board, jumpfrom, nearFilledPosition);
        if (jumpPosition) {
            if (Positions.notContains(positions, jumpPosition)) {
                jumpPosition.lastPosition = jumpfrom;
                jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlack;
                jumpPosition.jumps = jumpfrom.jumps ? jumpfrom.jumps++ : 2;
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
function getBoardWhereCanIGo(board, from, blackPiece) {
    const positions = getPositionsWhereCanIGo(board, from, blackPiece).positions;
    return mapBoard(board, position => {
        position.iCanGoHere = Positions.contains(positions, position);
        return position;
    });
}
export { defaultBoardSize, defaultBoardConf, getCleanBoard, getInitialBoard, getBoardConf, getBoardWhereCanIGo, getColorStartEndRow, getJumpPosition, getNearPositions, getPosition, getPositionsWhereCanIGo, printUnicode, whereCanIJump, setPieceOnBoard, setPosition, removePieceOnBoard, hasPosition };
//# sourceMappingURL=Board.js.map