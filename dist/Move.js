'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMoveXandY = exports.getGameBeforeLastMove = exports.getGameAfterMove = exports.getBackMove = exports.canMove = undefined;

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _Game = require('./Game');

var Game = _interopRequireWildcard(_Game);

var _GameColor = require('./GameColor');

var GameColor = _interopRequireWildcard(_GameColor);

var _Player = require('./Player');

var Player = _interopRequireWildcard(_Player);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
function getMoveXandY(move) {
    return {
        from: Position.getXandY(move.from),
        to: Position.getXandY(move.to)
    };
}
function canMove(game, move) {
    var positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, Game.isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(function (position) {
        return position.x === move.to.x && position.y === move.to.y;
    }) >= 0;
}
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
 *  - .board (Cleans board, set positions and move breadcrumb)
 *  - .black (Calculate score)
 *  - .white (Calculate score)
 *  - .movements (add new move)
 */
function getGameAfterMove(game, move) {
    var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    game.board = Board.getCleanBoard(game.board);
    if (!backMove && !canMove(game, move)) throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = getBoardAfterMove(game.board, move);
    game.black = GameColor.getColorAfterMove(game.black, move);
    game.white = GameColor.getColorAfterMove(game.white, move);
    if (!backMove) {
        game.movements.push(getMoveXandY(move));
        game.blackWon = Game.hasBlackWon(game);
    }
    return game;
}
function getGameBeforeLastMove(game) {
    var lastMove = game.movements.pop();
    if (lastMove) game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (Player.isComputer(Game.getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
exports.canMove = canMove;
exports.getBackMove = getBackMove;
exports.getGameAfterMove = getGameAfterMove;
exports.getGameBeforeLastMove = getGameBeforeLastMove;
exports.getMoveXandY = getMoveXandY;
//# sourceMappingURL=Move.js.map
//# sourceMappingURL=Move.js.map