'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasPosition = exports.setWhereCanIGo = exports.setPosition = exports.whereCanIJump = exports.printUnicode = exports.isWhiteHome = exports.isBlackHome = exports.isBackGroundBlack = exports.getY7Start0End = exports.getY0Start7End = exports.getPositionsWhereCanIGo = exports.getPosition = exports.getNearPositions = exports.getJumpPosition = exports.getColorStartEndRow = exports.getBoardConf = exports.getToSearchOrder = exports.getInitialBoard = exports.clean = exports.getBoardAfterMove = exports.defaultBoardConf = exports.defaultBoardSize = undefined;

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

var defaultBoardSize = {
    x: 8,
    y: 8
};
function mapBoard(board, func) {
    return board.map(function (col) {
        return col.map(function (position) {
            return func(position);
        });
    });
}
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
var defaultBoardConf = getBoardConf(defaultBoardSize);
function isBackGroundBlack(x, y) {
    if (x % 2 === 0) {
        if (y % 2 === 0) return true;else return false;
    } else {
        if (y % 2 === 0) return false;else return true;
    }
}
function getToSearchOrder(x) {
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
function getY0Start7End(y, isBlack) {
    if (isBlack) return y;
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
function getY7Start0End(y, isBlack) {
    if (!isBlack) return y;
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
// tslint:disable-next-line:variable-name
var _getInitialBoard = _ramda2.default.memoize(function (boardConf) {
    (0, _ptzLog2.default)('_getInitialBoard for', boardConf);
    var board = [],
        blackPieces = [],
        whitePieces = [];
    for (var x = 0; x < boardConf.size.x; x++) {
        for (var y = 0; y < boardConf.size.y; y++) {
            if (!board[x]) board[x] = [];
            var position = { x: x, y: y };
            if (y === 0) {
                position.isBlack = true;
                blackPieces.push({ position: position });
            }
            if (y === boardConf.endRow) {
                position.isBlack = false;
                whitePieces.push({ position: position });
            }
            board[x][y] = position;
        }
    }
    return {
        board: board,
        blackPieces: blackPieces,
        whitePieces: whitePieces
    };
});
function getInitialBoard(boardConf) {
    return _getInitialBoard(boardConf);
}
function getPosition(board, position) {
    try {
        return board[position.x][position.y];
    } catch (e) {
        (0, _ptzLog2.default)('Error getting position:', position, ' \n board:', board);
        throw new Error('Error getting position');
    }
}
function setPosition(board, position) {
    try {
        board[position.x][position.y] = position;
        return board;
    } catch (e) {
        (0, _ptzLog2.default)('Error getting position: ', position);
        throw new Error('Error getting position');
    }
}
function setPieceOnBoard(board, position, isBlack) {
    return setPosition(board, Position.setPiece(position, isBlack));
}
function removePieceOnBoard(board, position) {
    return setPosition(board, Position.removePiece(position));
}
function clean(board) {
    return mapBoard(board, function (position) {
        position.iCanGoHere = false;
        position.lastMove = false;
        position.lastMoveJump = false;
        return position;
    });
}
function getPositionsWhereCanIGo(board, from, isBlack) {
    if (!from) return null;
    var allNearPositions = getNearPositions(board, from, undefined);
    var positions = [];
    var orderedPositions = [];
    for (var i = 0; i < allNearPositions.length; i++) {
        var nearPosition = allNearPositions[i];
        if (Position.hasNoPiece(nearPosition)) {
            positions.push(nearPosition);
            var y = getY0Start7End(nearPosition.y, isBlack);
            if (!orderedPositions[y]) orderedPositions[y] = [];
            orderedPositions[y][getToSearchOrder(nearPosition.x)] = nearPosition;
        } else {
            var jumpPosition = getJumpPosition(board, from, nearPosition);
            if (jumpPosition) {
                jumpPosition.jumps = 1;
                positions.push(jumpPosition);
                var _y = getY0Start7End(jumpPosition.y, isBlack);
                if (!orderedPositions[_y]) orderedPositions[_y] = [];
                orderedPositions[_y][getToSearchOrder(jumpPosition.x)] = jumpPosition;
                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    }
    return {
        positions: positions,
        orderedPositions: orderedPositions
    };
}
function getNearPositions(board, position, onlyEmpty) {
    var positions = [];
    function add(plusX, plusY) {
        var newPosition = {
            x: position.x + plusX,
            y: position.y + plusY
        };
        if (!hasPosition(board, newPosition)) return;
        newPosition = getPosition(board, newPosition);
        if (typeof onlyEmpty !== 'undefined') {
            if (onlyEmpty === Position.hasNoPiece(newPosition)) positions.push(newPosition);
        } else positions.push(newPosition);
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
function whereCanIJump(board, jumpfrom, positions, orderedPositions, isBlack) {
    var nearFilledPositions = getNearPositions(board, jumpfrom, false);
    nearFilledPositions.forEach(function (nearFilledPosition) {
        var jumpPosition = getJumpPosition(board, jumpfrom, nearFilledPosition);
        if (jumpPosition) {
            if (Positions.notContains(positions, jumpPosition)) {
                jumpPosition.lastPosition = jumpfrom;
                jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlack;
                jumpPosition.jumps = jumpfrom.jumps ? jumpfrom.jumps++ : 2;
                positions.push(jumpPosition);
                var y = getY0Start7End(jumpPosition.y, isBlack);
                if (!orderedPositions[y]) orderedPositions[y] = [];
                orderedPositions[y][getToSearchOrder(jumpPosition.x)] = jumpPosition;
                whereCanIJump(board, jumpPosition, positions, orderedPositions, isBlack);
            }
        }
    });
}
function setWhereCanIGo(board, from, blackPiece) {
    var positions = getPositionsWhereCanIGo(board, from, blackPiece).positions;
    return mapBoard(board, function (position) {
        position.iCanGoHere = Positions.contains(positions, position);
        return position;
    });
}
function printUnicode(board) {
    var txt = '';
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            var position = board[x][y];
            if (isBackGroundBlack(x, y)) {
                if (Position.hasWhitePiece(position)) txt += '\u25CF';else if (Position.hasBlackPiece(position)) txt += '\u25CB';else txt += ' ';
            } else {
                if (Position.hasWhitePiece(position)) txt += '\u25D9';else if (Position.hasBlackPiece(position)) txt += '\u25D8';else txt += '\u2588';
            }
        }
        txt += '\n';
    }
    return txt;
}
function getBoardAfterMove(board, move) {
    move.to.lastMove = true;
    move.from.lastMove = true;
    board = setPieceOnBoard(board, move.to, Position.hasBlackPiece(move.from));
    board = removePieceOnBoard(board, move.from);
    var jumpPosition = move.to.lastPosition;
    while (jumpPosition) {
        getPosition(board, jumpPosition).lastMoveJump = true;
        jumpPosition = jumpPosition.lastPosition;
    }
    return board;
}
function hasPosition(board, position) {
    if (!position || position.x < 0 || position.y < 0) return false;
    return board.length > position.x && board[position.x].length > position.y;
}
function isWhiteHome(position, boardConf) {
    if (position.y === boardConf.size.y - 1) return true;
}
function isBlackHome(position) {
    if (position.y === 0) return true;
}
exports.defaultBoardSize = defaultBoardSize;
exports.defaultBoardConf = defaultBoardConf;
exports.getBoardAfterMove = getBoardAfterMove;
exports.clean = clean;
exports.getInitialBoard = getInitialBoard;
exports.getToSearchOrder = getToSearchOrder;
exports.getBoardConf = getBoardConf;
exports.getColorStartEndRow = getColorStartEndRow;
exports.getJumpPosition = getJumpPosition;
exports.getNearPositions = getNearPositions;
exports.getPosition = getPosition;
exports.getPositionsWhereCanIGo = getPositionsWhereCanIGo;
exports.getY0Start7End = getY0Start7End;
exports.getY7Start0End = getY7Start0End;
exports.isBackGroundBlack = isBackGroundBlack;
exports.isBlackHome = isBlackHome;
exports.isWhiteHome = isWhiteHome;
exports.printUnicode = printUnicode;
exports.whereCanIJump = whereCanIJump;
exports.setPosition = setPosition;
exports.setWhereCanIGo = setWhereCanIGo;
exports.hasPosition = hasPosition;
//# sourceMappingURL=Board.js.map
//# sourceMappingURL=Board.js.map