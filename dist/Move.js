'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMoveXAndY = exports.getMovesFromArray = exports.getMoveFromArray = exports.getGameBeforeLastMove = exports.getGameAfterMoves = exports.getGameAfterMove = exports.getBackMove = exports.canMove = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _Game = require('./Game');

var Game = _interopRequireWildcard(_Game);

var _Player = require('./Player');

var Player = _interopRequireWildcard(_Player);

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
    var positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, Game.isBlackTurn(game));
    return positionsWhereCanIGo.some(function (position) {
        return Position.hasSameXY(position, move.to);
    });
}
/**
 * Can not move
 */
var canNotMove = _ramda2.default.compose(_ramda2.default.not, canMove);
function getBoardAfterMove(board, move) {
    move.to.lastMove = true;
    move.from.lastMove = true;
    board = Board.setPieceOnBoard(board, move.to, Position.hasBlackPiece(move.from));
    board = Board.removePieceOnBoard(board, move.from);
    var jumpPosition = move.to.lastPosition;
    while (jumpPosition) {
        Board.getPosition(board, jumpPosition).lastMoveJump = true;
        jumpPosition = jumpPosition.lastPosition;
    }
    return board;
}
/**
 * Takes game and move and returns new game after move.
 *
 * Updates:
 *  - .board (It cleans board, set new positions and move breadcrumb)
 *  - .score
 *  - .moves (add new move if valid)
 */
function getGameAfterMove(game, move) {
    var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!backMove && canNotMove(game, move)) throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    var board = getBoardAfterMove(game.board, move);
    return {
        players: game.players,
        board: board,
        score: Score.getScore(game.board),
        moves: backMove ? game.moves : game.moves.concat(getMoveXAndY(move))
    };
}
function getGameBeforeLastMove(game) {
    var lastMove = game.moves.pop();
    if (lastMove) game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (Player.isComputer(Game.getPlayerTurn(game))) {
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
function getGameAfterMoves(game, moves) {
    return moves.reduce(function (lastGame, move) {
        return getGameAfterMove(lastGame, move);
    }, game);
}
exports.canMove = canMove;
exports.getBackMove = getBackMove;
exports.getGameAfterMove = getGameAfterMove;
exports.getGameAfterMoves = getGameAfterMoves;
exports.getGameBeforeLastMove = getGameBeforeLastMove;
exports.getMoveFromArray = getMoveFromArray;
exports.getMovesFromArray = getMovesFromArray;
exports.getMoveXAndY = getMoveXAndY;
//# sourceMappingURL=Move.js.map
//# sourceMappingURL=Move.js.map