'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTurnPieces = exports.isMyTurn = exports.isWhiteTurn = exports.isBlackTurn = exports.getPlayerTurn = exports.createGame = undefined;

var _ramda = require('ramda');

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _Player = require('./Player');

var Player = _interopRequireWildcard(_Player);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

var _Score = require('./Score');

var Score = _interopRequireWildcard(_Score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createGame(args) {
    args = args || [];
    var boardSize = args.boardSize || Board.defaultBoardSize;
    var game = {
        moves: args.moves || [],
        players: Player.createPlayers(args.players),
        score: Score.getInitialScore(),
        board: Board.getInitialBoard(boardSize)
    };
    return game;
}
var isWhiteTurn = function isWhiteTurn(game) {
    return game.moves.length % 2 === 0;
};
var isBlackTurn = (0, _ramda.compose)(_ramda.not, isWhiteTurn);
/**
 * Returns true if from piece can be played.
 */
function isMyTurn(game, from) {
    if (game.score.ended) return false;
    from = Board.getPosition(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
var getPlayerTurn = function getPlayerTurn(game) {
    return isWhiteTurn(game) ? game.players.white : game.players.black;
};
/**
 * Gets all positions from current player turn.
 */
function getTurnPieces(game) {
    var isBlack = isBlackTurn(game);
    return game.board.reduce(function (piecesRow, row) {
        return piecesRow.concat(row.reduce(function (pieces, position) {
            return isBlack !== position.isBlack ? pieces : pieces.concat({ x: position.x, y: position.y, isBlack: isBlack });
        }, []));
    }, []);
}
exports.createGame = createGame;
exports.getPlayerTurn = getPlayerTurn;
exports.isBlackTurn = isBlackTurn;
exports.isWhiteTurn = isWhiteTurn;
exports.isMyTurn = isMyTurn;
exports.getTurnPieces = getTurnPieces;
//# sourceMappingURL=Game.js.map
//# sourceMappingURL=Game.js.map