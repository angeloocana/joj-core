'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCleanGameToSaveOnServer = exports.isMyTurn = exports.isWhiteTurn = exports.isBlackTurn = exports.getPlayerTurn = exports.getColorTurn = exports.createGame = undefined;

var _ramda = require('ramda');

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _GameColor = require('./GameColor');

var GameColor = _interopRequireWildcard(_GameColor);

var _Players = require('./Players');

var Players = _interopRequireWildcard(_Players);

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createGame(args) {
    var boardConf = args.boardConf || Board.defaultBoardConf;

    var _Board$getInitialBoar = Board.getInitialBoard(boardConf),
        board = _Board$getInitialBoar.board,
        blackPieces = _Board$getInitialBoar.blackPieces,
        whitePieces = _Board$getInitialBoar.whitePieces;

    var game = {
        ended: false,
        movements: args.movements || [],
        players: Players.create(args.players),
        boardConf: boardConf,
        white: GameColor.create(boardConf, false, whitePieces),
        black: GameColor.create(boardConf, true, blackPieces),
        board: board
    };
    return game;
}
function getCleanGameToSaveOnServer(_ref) {
    var ended = _ref.ended,
        movements = _ref.movements;

    return {
        ended: ended,
        movements: movements
    };
}
var isWhiteTurn = function isWhiteTurn(game) {
    return game.movements.length % 2 === 0;
};
var isBlackTurn = (0, _ramda.compose)(_ramda.not, isWhiteTurn);
/**
 * Returns true if from piece can be played.
 */
function isMyTurn(game, from) {
    if (game.ended) return false;
    from = Board.getPosition(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
var getColorTurn = function getColorTurn(game) {
    return isWhiteTurn(game) ? game.white : game.black;
};
var getPlayerTurn = function getPlayerTurn(game) {
    return isWhiteTurn(game) ? game.players.white : game.players.black;
};
exports.createGame = createGame;
exports.getColorTurn = getColorTurn;
exports.getPlayerTurn = getPlayerTurn;
exports.isBlackTurn = isBlackTurn;
exports.isWhiteTurn = isWhiteTurn;
exports.isMyTurn = isMyTurn;
exports.getCleanGameToSaveOnServer = getCleanGameToSaveOnServer;
//# sourceMappingURL=Game.js.map
//# sourceMappingURL=Game.js.map