'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasPositionByBoardSize = exports.hasPosition = exports.removePieceOnBoard = exports.setPosition = exports.setPieceOnBoard = exports.whereCanIJump = exports.printXAndYBoard = exports.printUnicodeBoard = exports.printBoardCurried = exports.printBoard = exports.getPositionsWhereCanIGo = exports.getPosition = exports.getNotEmptyNearPositions = exports.getNearPositions = exports.getJumpPosition = exports.getEmptyNearPositions = exports.getColorStartEndRow = exports.getBoardWhereCanIGo = exports.getBoardConf = exports.getInitialBoard = exports.getCleanBoard = exports.defaultBoardConf = exports.defaultBoardSize = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

var _Positions = require('./Positions');

var Positions = _interopRequireWildcard(_Positions);

var _ptzLog = require('ptz-log');

var _ptzLog2 = _interopRequireDefault(_ptzLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default 8x8 board size
 */
var defaultBoardSize = { x: 8, y: 8 };
/**
 * Checks if position exists in this board size
 */
var hasPositionByBoardSize = function hasPositionByBoardSize(boardSize, position) {
    return position && position.x >= 0 && position.y >= 0 && boardSize.y > position.y && boardSize.x > position.x;
};
/**
 * Check if position exists on board
 */
var hasPosition = function hasPosition(board, position) {
    return hasPositionByBoardSize(getBoardSize(board), position);
};
/**
 * Map some function in all board positions and return a new board
 */
var mapBoard = function mapBoard(board, func) {
    return board.map(function (col) {
        return col.map(function (p) {
            return func(p);
        });
    });
};
function getColorStartEndRow(boardEndRow, isBlack) {
    return {
        startRow: isBlack ? 0 : boardEndRow,
        endRow: isBlack ? boardEndRow : 0
    };
}
function getBoardConf(boardSize) {
    var endRow = boardSize.y - 1;
    return {
        size: boardSize,
        endRow: endRow,
        white: getColorStartEndRow(endRow, false),
        black: getColorStartEndRow(endRow, true)
    };
}
/**
 * Default configuration for 8x8 board
 */
var defaultBoardConf = getBoardConf(defaultBoardSize);
/**
 * Get cached initial board, using memoize from ramda
 *
 * The _getInitialBoard returns :Function Type,
 * that's why we created getInitialBoard witch returns :IGetInitialBoardResult
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
var _getInitialBoard = _ramda2.default.memoize(function (boardConf) {
    // Do NOT remove the log below. We use it to check if cache works and this code run once.
    (0, _ptzLog2.default)('--> You MUST see this msg only once, otherwise memoize is not working <-- \n _getInitialBoard for', boardConf);
    var board = [],
        blackPieces = [],
        whitePieces = [];
    for (var x = 0; x < boardConf.size.x; x++) {
        for (var y = 0; y < boardConf.size.y; y++) {
            if (!board[y]) board[y] = [];
            var position = { x: x, y: y };
            if (y === 0) {
                position.isBlack = true;
                blackPieces.push({ position: position });
            }
            if (y === boardConf.endRow) {
                position.isBlack = false;
                whitePieces.push({ position: position });
            }
            board[y][x] = position;
        }
    }
    return {
        board: board,
        blackPieces: blackPieces,
        whitePieces: whitePieces
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
        return board[position.y][position.x];
    } catch (e) {
        throw new Error('Error getting position');
    }
}
function setPosition(board, position) {
    try {
        board[position.y][position.x] = position;
        return board;
    } catch (e) {
        throw new Error('Error getting position');
    }
}
var setPieceOnBoard = function setPieceOnBoard(board, position, isBlack) {
    return setPosition(board, Position.setPiece(isBlack, position));
};
var removePieceOnBoard = function removePieceOnBoard(board, position) {
    return setPosition(board, Position.removePiece(position));
};
var getCleanBoard = function getCleanBoard(board) {
    return mapBoard(board, Position.getCleanPosition);
};
/**
 * Take a board: IPosition[][] an return the number of rows(X)
 */
var getBoardSizeX = function getBoardSizeX(board) {
    return board[0].length;
};
/**
 * Take a board: IPosition[][] an return the number of rows(Y)
 */
var getBoardSizeY = function getBoardSizeY(board) {
    return board.length;
};
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
 * Takes a function to printPosition and print board.
 */
function printBoard(printPosition, board) {
    return board.reduce(function (txtCol, col) {
        return col.reduce(function (txtRow, position) {
            return txtRow + printPosition(position);
        }, txtCol) + '\n';
    }, '');
}
var printBoardCurried = _ramda2.default.curry(printBoard);
/**
 * Get board in a nice format to print it on console
 */
var printUnicodeBoard = printBoardCurried(Position.printUnicodePosition);
/**
 * Prints only X and Y positions of a board.
 */
var printXAndYBoard = printBoardCurried(Position.printXAndYPosition);
function getPositionsWhereCanIGo(board, from, isBlack) {
    if (!from) return null;
    var allNearPositions = getNearPositions(board, from);
    var positions = [];
    var orderedPositions = [];
    for (var i = 0; i < allNearPositions.length; i++) {
        var nearPosition = allNearPositions[i];
        if (Position.hasNoPiece(nearPosition)) {
            positions.push(nearPosition);
            var y = Position.getYAsBlack(getBoardSizeY(board), nearPosition.y, isBlack);
            if (!orderedPositions[y]) orderedPositions[y] = [];
            orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), nearPosition.x)] = nearPosition;
        } else {
            var jumpPosition = getJumpPosition(board, from, nearPosition);
            if (jumpPosition) {
                jumpPosition.jumps = 1;
                positions.push(jumpPosition);
                var _y = Position.getYAsBlack(getBoardSizeY(board), jumpPosition.y, isBlack);
                if (!orderedPositions[_y]) orderedPositions[_y] = [];
                orderedPositions[_y][Position.getToSearchOrder(getBoardSize(board), jumpPosition.x)] = jumpPosition;
                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    }
    return {
        positions: positions,
        orderedPositions: orderedPositions
    };
}
/**
 * Get all valid and invalid near positions.
 */
function getAllNearPositions(position) {
    return [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(function (toAdd) {
        return {
            x: position.x + toAdd[0],
            y: position.y + toAdd[1]
        };
    });
}
/**
 * Caches near positions by each boardSize
 */
// tslint:disable-next-line:variable-name
var _getNearPositions = _ramda2.default.memoize(function (boardSize, position) {
    return getAllNearPositions(position).filter(function (p) {
        return hasPositionByBoardSize(boardSize, p);
    });
});
function getNearPositions(board, position) {
    return _getNearPositions(getBoardSize(board), Position.getXAndY(position)).map(function (p) {
        return getPosition(board, p);
    });
}
var getEmptyNearPositions = function getEmptyNearPositions(board, position) {
    return getNearPositions(board, position).filter(function (p) {
        return Position.hasNoPiece(p);
    });
};
var getNotEmptyNearPositions = function getNotEmptyNearPositions(board, position) {
    return getNearPositions(board, position).filter(function (p) {
        return Position.hasPiece(p);
    });
};
function getJumpPosition(board, from, toJumpPosition) {
    var jumpPosition = { x: 0, y: 0 };
    if (from.x < toJumpPosition.x) jumpPosition.x = toJumpPosition.x + 1;else if (from.x > toJumpPosition.x) jumpPosition.x = toJumpPosition.x - 1;else jumpPosition.x = toJumpPosition.x;
    if (from.y < toJumpPosition.y) jumpPosition.y = toJumpPosition.y + 1;else if (from.y > toJumpPosition.y) jumpPosition.y = toJumpPosition.y - 1;else jumpPosition.y = toJumpPosition.y;
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
    var nearFilledPositions = getNotEmptyNearPositions(board, jumpFrom);
    nearFilledPositions.forEach(function (nearFilledPosition) {
        var jumpPosition = getJumpPosition(board, jumpFrom, nearFilledPosition);
        if (jumpPosition) {
            if (Positions.notContains(positions, jumpPosition)) {
                jumpPosition.lastPosition = jumpFrom;
                jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlack;
                jumpPosition.jumps = jumpFrom.jumps ? jumpFrom.jumps++ : 2;
                positions.push(jumpPosition);
                var y = Position.getYAsBlack(getBoardSizeY(board), jumpPosition.y, isBlack);
                if (!orderedPositions[y]) orderedPositions[y] = [];
                orderedPositions[y][Position.getToSearchOrder(getBoardSize(board), jumpPosition.x)] = jumpPosition;
                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    });
}
function getBoardWhereCanIGo(board, from, blackPiece) {
    var _getPositionsWhereCan = getPositionsWhereCanIGo(board, from, blackPiece),
        positions = _getPositionsWhereCan.positions;

    return mapBoard(board, function (position) {
        return Position.setICanGoHere(positions, position);
    });
}
exports.defaultBoardSize = defaultBoardSize;
exports.defaultBoardConf = defaultBoardConf;
exports.getCleanBoard = getCleanBoard;
exports.getInitialBoard = getInitialBoard;
exports.getBoardConf = getBoardConf;
exports.getBoardWhereCanIGo = getBoardWhereCanIGo;
exports.getColorStartEndRow = getColorStartEndRow;
exports.getEmptyNearPositions = getEmptyNearPositions;
exports.getJumpPosition = getJumpPosition;
exports.getNearPositions = getNearPositions;
exports.getNotEmptyNearPositions = getNotEmptyNearPositions;
exports.getPosition = getPosition;
exports.getPositionsWhereCanIGo = getPositionsWhereCanIGo;
exports.printBoard = printBoard;
exports.printBoardCurried = printBoardCurried;
exports.printUnicodeBoard = printUnicodeBoard;
exports.printXAndYBoard = printXAndYBoard;
exports.whereCanIJump = whereCanIJump;
exports.setPieceOnBoard = setPieceOnBoard;
exports.setPosition = setPosition;
exports.removePieceOnBoard = removePieceOnBoard;
exports.hasPosition = hasPosition;
exports.hasPositionByBoardSize = hasPositionByBoardSize;
//# sourceMappingURL=Board.js.map
//# sourceMappingURL=Board.js.map