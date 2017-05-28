'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sameMove = exports.movesContains = exports.getMoveXAndY = exports.getMovesFromArray = exports.getMoveFromArray = exports.getGameBeforeLastMove = exports.getGameAfterMoves = exports.getGameAfterMove = exports.getBoardAfterMove = exports.getBackMove = exports.getAllowedMovesFromArrays = exports.getAllowedMovesFromArray = exports.canMove = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _Game = require('./Game');

var Game = _interopRequireWildcard(_Game);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

var _Score = require('./Score');

var Score = _interopRequireWildcard(_Score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns reverse move: from = to, to = from
 */
function getBackMove(move) {
    return {
        from: move.to,
        to: move.from
    };
}
/**
 * Takes a move and returns it with clean positions {from: {x,y}, to: {x,y}}.
 */
function getMoveXAndY(move) {
    return {
        from: Position.getXAndY(move.from),
        to: Position.getXAndY(move.to)
    };
}
/**
 * Takes game and move then:
 *  - Checks if it is my turn to play otherwise returns false.
 *  - Get positions where can i go.
 *  - Returns true if move.to is in the positions where can i go.
 */
function canMove(game, move) {
    if (!Game.isMyTurn(game, move.from)) return false;
    var positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from);
    return positionsWhereCanIGo.some(function (position) {
        return Position.hasSameXY(position, move.to);
    });
}
/**
 * Can not move
 */
var canNotMove = _ramda2.default.compose(_ramda2.default.not, canMove);
/**
 * Get board after move, return a new board with:
 *  - From: Remove piece and add .lastMove: true
 *  - To: Set piece from move.from and add .lastMove: true
 *  - Jumps: Create jump breadcrumb by setting .lastMoveJump: true
 */
function getBoardAfterMove(board, move) {
    var from = Board.getPosition(board, move.from);
    return Board.mapBoard(board, function (p) {
        var x = p.x,
            y = p.y,
            isBlack = p.isBlack;

        if (Position.hasSameXY(from, p)) return { x: x, y: y, lastMove: true };
        if (Position.hasSameXY(move.to, p)) return { x: x, y: y, isBlack: from.isBlack, lastMove: true };
        if (Position.hasPiece(p)) return { x: x, y: y, isBlack: isBlack };
        if (Position.containsXY(move.to.jumps, p)) return { x: x, y: y, lastMoveJump: true };
        return { x: x, y: y };
    });
}
/**
 * Takes game and move then returns new game after move.
 *
 * Updates:
 *  - .board (It cleans board, set new positions and move breadcrumb)
 *  - .score
 *  - .moves (add new move if valid and it is not backMove)
 */
function getGameAfterMove(game, move) {
    var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!backMove && canNotMove(game, move)) return game;
    var board = getBoardAfterMove(game.board, move);
    return {
        players: game.players,
        board: board,
        score: Score.getScore(game.board),
        moves: backMove ? game.moves : game.moves.concat(getMoveXAndY(move))
    };
}
/**
 * Get game before last move,
 * if playing vs Ai rollback Ai move too.
 */
function getGameBeforeLastMove(game) {
    // $Fix I do NOT know if it is the best way to make game immutable.
    game = Object.assign({}, game);
    var lastMove = game.moves.pop();
    if (lastMove) game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (Game.getPlayerTurn(game).isAi) {
        lastMove = game.moves.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
/**
 * Get IMove from an array like
 * [[fromX,fromY], [toX, toY]]
 *
 * const move = [[5, 7], [5, 6]];
 */
function getMoveFromArray(move) {
    return {
        from: Position.getPositionFromArray(move[0]),
        to: Position.getPositionFromArray(move[1])
    };
}
/**
 * Get IMove[] from an array like
 * [[fromX,fromY], [toX, toY]]
 *
 * const moves = [
 *      [[5, 7], [5, 6]],
 *      [[2, 0], [2, 1]],
 *      [[7, 7], [5, 5]]
 * ];
 */
var getMovesFromArray = function getMovesFromArray(moves) {
    return moves.map(function (move) {
        return getMoveFromArray(move);
    });
};
/**
 * Get game after n moves.
 */
var getGameAfterMoves = function getGameAfterMoves(game, moves) {
    return moves.reduce(function (lastGame, move) {
        return getGameAfterMove(lastGame, move);
    }, game);
};
/**
 * Takes an array like:
 *
 * [[fromX, fromY], ...[toX, toY]]
 *
 * and return IMove[]
 */
function getAllowedMovesFromArray(moves) {
    var from = Position.getPositionFromArray(_ramda2.default.head(moves));
    return _ramda2.default.tail(moves).map(function (to) {
        return { from: from, to: Position.getPositionFromArray(to) };
    });
}
/**
 * Takes an array like:
 *
 * [
 *
 *   [[fromX, fromY], ...[toX, toY]],
 *
 *   [[fromX, fromY], ...[toX, toY]]
 *
 * ]
 *
 * and return IMove[].
 *
 * Used to create smaller test data.
 */
function getAllowedMovesFromArrays(arrMoves) {
    return arrMoves.reduce(function (moves, a) {
        return moves.concat(getAllowedMovesFromArray(a));
    }, []);
}
/**
 * Takes 2 moves and compares theirs **from** and **to** positions.
 */
var sameMove = function sameMove(a, b) {
    return Position.hasSameXY(a.from, b.from) && Position.hasSameXY(a.to, b.to);
};
/**
 * Checks if a list of moves contains some move.
 */
var movesContains = function movesContains(moves, move) {
    return moves.some(function (m) {
        return sameMove(move, m);
    });
};
exports.canMove = canMove;
exports.getAllowedMovesFromArray = getAllowedMovesFromArray;
exports.getAllowedMovesFromArrays = getAllowedMovesFromArrays;
exports.getBackMove = getBackMove;
exports.getBoardAfterMove = getBoardAfterMove;
exports.getGameAfterMove = getGameAfterMove;
exports.getGameAfterMoves = getGameAfterMoves;
exports.getGameBeforeLastMove = getGameBeforeLastMove;
exports.getMoveFromArray = getMoveFromArray;
exports.getMovesFromArray = getMovesFromArray;
exports.getMoveXAndY = getMoveXAndY;
exports.movesContains = movesContains;
exports.sameMove = sameMove;
//# sourceMappingURL=Move.js.map
//# sourceMappingURL=Move.js.map