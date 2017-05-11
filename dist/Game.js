'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCleanGameToSaveOnServer = exports.setMovements = exports.setPlayers = exports.isMyTurn = exports.isWhiteTurn = exports.isBlackTurn = exports.getGameWhereCanIGo = exports.getPlayerTurn = exports.getColorTurn = exports.create = undefined;

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

function create(args) {
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
function isMyTurn(game, from) {
    if (game.ended) return false;
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
function getGameWhereCanIGo(game, from) {
    game.board = Board.getCleanBoard(game.board);
    if (!isMyTurn(game, from)) return game;
    game.board = Board.setWhereCanIGo(game.board, from, Position.hasBlackPiece(from));
}
function isWhiteTurn(game) {
    return game.movements.length % 2 === 0;
}
var isBlackTurn = (0, _ramda.compose)(_ramda.not, isWhiteTurn);
function getColorTurn(game) {
    return isWhiteTurn(game) ? game.white : game.black;
}
function getPlayerTurn(game) {
    return isWhiteTurn(game) ? game.players.white : game.players.black;
}
function setPlayers(players) {
    // Validate Players
    this.players = players;
}
function setMovements() {
    var movements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var needToValidateMovements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    // Validate Movements
    // if(needToValidateMovements)
    this.movements = movements;
    // This must be called in another place
    // this.board.fillAllPiecesOnBoard(this.white.pieces, this.black.pieces);
}
exports.create = create;
exports.getColorTurn = getColorTurn;
exports.getPlayerTurn = getPlayerTurn;
exports.getGameWhereCanIGo = getGameWhereCanIGo;
exports.isBlackTurn = isBlackTurn;
exports.isWhiteTurn = isWhiteTurn;
exports.isMyTurn = isMyTurn;
exports.setPlayers = setPlayers;
exports.setMovements = setMovements;
exports.getCleanGameToSaveOnServer = getCleanGameToSaveOnServer;
//# sourceMappingURL=Game.js.map
//# sourceMappingURL=Game.js.map