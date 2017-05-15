'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasPositionByBoardSize = exports.hasPosition = exports.removePieceOnBoard = exports.setPosition = exports.setPieceOnBoard = exports.whereCanIJump = exports.printXAndYBoard = exports.printUnicodeBoard = exports.printBoardCurried = exports.printBoard = exports.getPiecesFromBoard = exports.getPositionsWhereCanIGo = exports.getPosition = exports.getNotEmptyNearPositions = exports.getNearPositions = exports.getJumpPosition = exports.getEmptyNearPositions = exports.getStartEndRows = exports.getStartEndRow = exports.getBoardWhereCanIGo = exports.getInitialBoard = exports.defaultBoardSize = exports._getNearPositions = exports._getInitialBoard = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

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
    var endRow = boardSize.y - 1;
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
var getStartEndRows = _ramda2.default.compose(getStartEndRowsFromBoardSize, getBoardSize);
/**
 * Get cached initial board, using memoize from ramda
 *
 * The _getInitialBoard returns :Function Type,
 * that's why we created getInitialBoard witch returns :IGetInitialBoardResult
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
var _getInitialBoard = _ramda2.default.memoize(function (boardSize) {
    // Do NOT remove the log below. We use it to check if cache works and this code run once.
    (0, _ptzLog2.default)('--> You MUST see this msg only once, otherwise memoize is not working <-- \n _getInitialBoard for', boardSize);
    var endRow = boardSize.y - 1;
    var board = [];
    for (var x = 0; x < boardSize.x; x++) {
        for (var y = 0; y < boardSize.y; y++) {
            if (!board[y]) board[y] = [];
            var position = { x: x, y: y };
            if (y === 0) position.isBlack = true;
            if (y === endRow) position.isBlack = false;
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
    } catch (e) {
        throw new Error('Error getting position');
    }
}
var setPosition = function setPosition(board, position) {
    return mapBoard(board, function (p) {
        return Position.hasSameXY(p, position) ? position : p;
    });
};
var setPieceOnBoard = function setPieceOnBoard(board, position, isBlack) {
    return setPosition(board, Position.setPiece(isBlack, position));
};
var removePieceOnBoard = function removePieceOnBoard(board, position) {
    return setPosition(board, Position.removePiece(position));
};
/**
 * Take a board: I.IPosition[][] an return the number of rows(X)
 */
var getBoardSizeX = function getBoardSizeX(board) {
    return board[0].length;
};
/**
 * Take a board: I.IPosition[][] an return the number of rows(Y)
 */
var getBoardSizeY = function getBoardSizeY(board) {
    return board.length;
};
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
    return board.reduce(function (txtRow, col) {
        return col.reduce(function (txt, position) {
            return txt + printPosition(position);
        }, txtRow) + '\n';
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
/**
 * Gets all near positions and reduce. Foreach near position checks:
 *  - Has no piece: concat positions and return.
 *  - Has piece:
 *      1. Get jump position, if jump position do not exists return prev positions.
 *      2. Concat jump to positions then call whereCanIJump() and return it.
 */
function getPositionsWhereCanIGo(board, from, isBlack) {
    if (!from) return null;
    var allNearPositions = getNearPositions(board, from);
    return allNearPositions.reduce(function (positions, nearPosition) {
        if (Position.hasNoPiece(nearPosition)) return positions.concat(nearPosition);
        var jumpTo = getJumpPosition(from, nearPosition, board);
        if (!jumpTo) return positions;
        jumpTo.jumps = 1;
        return whereCanIJump(board, jumpTo, positions.concat(jumpTo), isBlack);
    }, []);
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
 * Get near positions and CACHES it for each boardSize
 */
// tslint:disable-next-line:variable-name
var _getNearPositions = _ramda2.default.memoize(function (boardSize, xy) {
    return getAllNearPositions(xy).filter(function (p) {
        return hasPositionByBoardSize(boardSize, p);
    });
});
/**
 * Get all near positions from the given board instance.
 */
function getNearPositions(board, position) {
    return _getNearPositions(getBoardSize(board), Position.getXAndY(position)).map(function (p) {
        return getPosition(board, p);
    });
}
/**
 * Get empty near positions
 */
var getEmptyNearPositions = function getEmptyNearPositions(board, position) {
    return getNearPositions(board, position).filter(function (p) {
        return Position.hasNoPiece(p);
    });
};
/**
 * Get not empty near positions
 */
var getNotEmptyNearPositions = function getNotEmptyNearPositions(board, position) {
    return getNearPositions(board, position).filter(function (p) {
        return Position.hasPiece(p);
    });
};
/**
 * Takes from position (x or y) and to jump position (x or y) then returns the x or y of the target position.
 */
function getJump(from, toJump) {
    if (from < toJump) return toJump + 1;else if (from > toJump) return toJump - 1;else return toJump;
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
    var jumpXY = getJumpXY(from, toJump);
    if (!hasPosition(board, jumpXY)) return;
    var jumpPosition = getPosition(board, jumpXY);
    if (Position.hasPiece(jumpPosition)) return;
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
function whereCanIJump(board, from, positions, isBlack) {
    var nearPieces = getNotEmptyNearPositions(board, from);
    return nearPieces.reduce(function (accPositions, nearPiece) {
        var jumpTo = getJumpPosition(from, nearPiece, board);
        if (!jumpTo || Position.containsXY(accPositions, jumpTo)) return accPositions;
        jumpTo.lastPosition = from;
        jumpTo.jumpingBlackPiece = nearPiece.isBlack;
        jumpTo.jumps = from.jumps ? from.jumps + 1 : 2;
        return whereCanIJump(board, jumpTo, accPositions.concat(jumpTo), isBlack);
    }, positions);
}
/**
 * Get board with checked where can I go positions
 */
function getBoardWhereCanIGo(board, from, isBlack) {
    var positions = getPositionsWhereCanIGo(board, from, isBlack);
    return mapBoard(board, function (position) {
        return Position.setICanGoHere(positions, position);
    });
}
/**
 * Takes a board and return white and black pieces.
 * Used to calculate score from a board.
 *
 * returns { white: [{x,y}], black: [{x,y}] }
 */
function getPiecesFromBoard(board) {
    var initialPieces = {
        white: [],
        black: []
    };
    return board.reduce(function (piecesRow, row) {
        return row.reduce(function (pieces, position) {
            if (Position.hasBlackPiece(position)) pieces.black = pieces.black.concat(position);else if (Position.hasWhitePiece(position)) pieces.white = pieces.white.concat(position);
            return pieces;
        }, piecesRow);
    }, initialPieces);
}
exports._getInitialBoard = _getInitialBoard;
exports._getNearPositions = _getNearPositions;
exports.defaultBoardSize = defaultBoardSize;
exports.getInitialBoard = getInitialBoard;
exports.getBoardWhereCanIGo = getBoardWhereCanIGo;
exports.getStartEndRow = getStartEndRow;
exports.getStartEndRows = getStartEndRows;
exports.getEmptyNearPositions = getEmptyNearPositions;
exports.getJumpPosition = getJumpPosition;
exports.getNearPositions = getNearPositions;
exports.getNotEmptyNearPositions = getNotEmptyNearPositions;
exports.getPosition = getPosition;
exports.getPositionsWhereCanIGo = getPositionsWhereCanIGo;
exports.getPiecesFromBoard = getPiecesFromBoard;
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