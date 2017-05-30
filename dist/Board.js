'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasPositionByBoardSize = exports.hasPosition = exports.whereCanIJump = exports.printXAndYBoard = exports.printUnicodeBoard = exports.printBoardCurried = exports.printBoard = exports.mapBoard = exports.getPositionsWhereCanIGo = exports.getPositionsFromBoard = exports.getPositionFromBoard = exports.getPiecesWhereCanIGo = exports.getPiecesFromBoard = exports.getNotEmptyNearPositions = exports.getNearPositions = exports.getJumpPosition = exports.getEmptyNearPositions = exports.getStartPieces = exports.getStartEndRows = exports.getStartEndRow = exports.getCleanBoard = exports.getBoardWhereCanIGo = exports.getBoardWithPieces = exports.getInitialBoard = exports.defaultBoardSize = exports._getNearPositions = exports._getInitialBoard = exports._getCleanBoard = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

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
 * Create position {x, y}
 */
function createCol(x, y) {
    return { x: x, y: y };
}
/**
 * Create positions row [{x,y},{x,y},{x,y}]
 */
var createRow = function createRow(boardSizeX, y) {
    return _ramda2.default.range(0, boardSizeX).map(function (x) {
        return createCol(x, y);
    });
};
/**
 * Get cached clean board, using memoize from ramda.
 *
 * The _getCleanBoard returns :Function Type,
 * that's why we created getCleanBoard witch returns :IPosition[y][x]
 * in order to reduce type errors.
 */
// tslint:disable-next-line:variable-name
var _getCleanBoard = _ramda2.default.memoize(function (boardSize) {
    return _ramda2.default.range(0, boardSize.y).map(function (y) {
        return createRow(boardSize.x, y);
    });
});
/**
 * Get cached clean board, using memoize from ramda.
 */
function getCleanBoard(boardSize) {
    return _getCleanBoard(boardSize);
}
/**
 * Takes a board and return a new board with pieces.
 */
var getBoardWithPieces = function getBoardWithPieces(board, pieces) {
    return mapBoard(board, function (p) {
        var x = p.x,
            y = p.y;

        var piece = Position.getPositionFromPositions(pieces, p);
        if (piece) return { x: x, y: y, isBlack: piece.isBlack };else return { x: x, y: y };
    });
};
/**
 * Get start white and black pieces.
 */
var getStartWhiteBlack = function getStartWhiteBlack(x, whiteY) {
    return [{ x: x, y: 0, isBlack: true }, { x: x, y: whiteY, isBlack: false }];
};
/**
 * Add start pieces recursively
 */
var addStartPieces = function addStartPieces(x, whiteY, positions) {
    return x < 0 ? positions : addStartPieces(x - 1, whiteY, positions.concat(getStartWhiteBlack(x, whiteY)));
};
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
var _getInitialBoard = _ramda2.default.memoize(function (boardSize) {
    return getBoardWithPieces(getCleanBoard(boardSize), getStartPieces(boardSize));
});
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
    } catch (e) {
        throw new Error('Error getting position');
    }
}
/**
 * Get the desired x,y positions from a board.
 * @param positions list of x,y positions.
 * @param board board to get the positions from.
 */
var getPositionsFromBoard = function getPositionsFromBoard(board, positions) {
    return positions.map(function (p) {
        return getPositionFromBoard(board, p);
    });
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
var printBoard = function printBoard(printPosition, board) {
    return board.reduce(function (txtRow, col) {
        return col.reduce(function (txt, position) {
            return txt + printPosition(position);
        }, txtRow) + '\n';
    }, '');
};
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
    var nearPieces = getNotEmptyNearPositions(board, from);
    return nearPieces.reduce(function (accPositions, nearPiece) {
        var jumpTo = getJumpPosition(from, nearPiece, board);
        if (!jumpTo || Position.containsXY(accPositions, jumpTo)) return accPositions;
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
    if (!from) return null;
    var allNearPositions = getNearPositions(board, from);
    return allNearPositions.reduce(function (positions, nearPosition) {
        if (Position.hasNoPiece(nearPosition)) return positions.concat(nearPosition);
        var jumpTo = getJumpPosition(from, nearPosition, board);
        if (!jumpTo) return positions;
        return whereCanIJump(board, jumpTo, positions.concat(jumpTo));
    }, []);
}
/**
 * Gets all pieces with whereCanIGo positions.
 */
function getPiecesWhereCanIGo(board, positions) {
    return positions.map(function (position) {
        var x = position.x,
            y = position.y,
            isBlack = position.isBlack;

        return {
            x: x, y: y, isBlack: isBlack,
            whereCanIGo: getPositionsWhereCanIGo(board, position)
        };
    });
}
/**
 * Get all valid and invalid near positions.
 */
var getAllNearPositions = function getAllNearPositions(position) {
    return [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(function (toAdd) {
        return {
            x: position.x + toAdd[0],
            y: position.y + toAdd[1]
        };
    });
};
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
    var nearPositions = _getNearPositions(getBoardSize(board), Position.getXAndY(position));
    return getPositionsFromBoard(board, nearPositions);
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
    var jumpPosition = getPositionFromBoard(board, jumpXY);
    if (Position.hasPiece(jumpPosition)) return;
    return jumpPosition;
}
/**
 * Get board with checked where can I go positions
 */
function getBoardWhereCanIGo(board, from) {
    var positions = getPositionsWhereCanIGo(board, from);
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
exports._getCleanBoard = _getCleanBoard;
exports._getInitialBoard = _getInitialBoard;
exports._getNearPositions = _getNearPositions;
exports.defaultBoardSize = defaultBoardSize;
exports.getInitialBoard = getInitialBoard;
exports.getBoardWithPieces = getBoardWithPieces;
exports.getBoardWhereCanIGo = getBoardWhereCanIGo;
exports.getCleanBoard = getCleanBoard;
exports.getStartEndRow = getStartEndRow;
exports.getStartEndRows = getStartEndRows;
exports.getStartPieces = getStartPieces;
exports.getEmptyNearPositions = getEmptyNearPositions;
exports.getJumpPosition = getJumpPosition;
exports.getNearPositions = getNearPositions;
exports.getNotEmptyNearPositions = getNotEmptyNearPositions;
exports.getPiecesFromBoard = getPiecesFromBoard;
exports.getPiecesWhereCanIGo = getPiecesWhereCanIGo;
exports.getPositionFromBoard = getPositionFromBoard;
exports.getPositionsFromBoard = getPositionsFromBoard;
exports.getPositionsWhereCanIGo = getPositionsWhereCanIGo;
exports.mapBoard = mapBoard;
exports.printBoard = printBoard;
exports.printBoardCurried = printBoardCurried;
exports.printUnicodeBoard = printUnicodeBoard;
exports.printXAndYBoard = printXAndYBoard;
exports.whereCanIJump = whereCanIJump;
exports.hasPosition = hasPosition;
exports.hasPositionByBoardSize = hasPositionByBoardSize;
//# sourceMappingURL=Board.js.map
//# sourceMappingURL=Board.js.map