'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCleanGameToSaveOnServer = exports.setMovements = exports.setPlayers = exports.getGameBeforeLastMove = exports.getGameAfterMove = exports.getGameWhereCanIGo = exports.getWinner = exports.getPlayerTurn = exports.getColorTurn = exports.getBackMove = exports.create = exports.canMove = undefined;

var _ramda = require('ramda');

var _Board = require('./Board');

var Board = _interopRequireWildcard(_Board);

var _GameColor = require('./GameColor');

var GameColor = _interopRequireWildcard(_GameColor);

var _Player = require('./Player');

var Player = _interopRequireWildcard(_Player);

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
function getCleanGameToSaveOnServer(game) {
    var cleanGame = {
        ended: game.ended,
        movements: [],
        blackWin: game.blackWin
    };
    cleanGame.movements = game.movements.map(function (move) {
        var from = { x: move.from.x, y: move.from.y };
        var to = { x: move.to.x, y: move.to.y };
        return { from: from, to: to };
    });
    return cleanGame;
}
function getWinner(game) {
    game.white.score = GameColor.getScore(game.white);
    game.black.score = GameColor.getScore(game.black);
    if (GameColor.hasWon(game.white)) game.blackWin = false;else if (GameColor.hasWon(game.black)) game.blackWin = true;
    return game;
}
function isMyTurn(game, from) {
    if (game.ended) return false;
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
function getGameWhereCanIGo(game, from) {
    game.board = Board.clean(game.board);
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
function canMove(game, move) {
    var positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(function (position) {
        return position.x === move.to.x && position.y === move.to.y;
    }) >= 0;
}
function getGameAfterMove(game, move) {
    var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (Position.hasSamePosition(move.from, move.to)) throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
    game.board = Board.clean(game.board);
    if (!backMove) if (!canMove(game, move)) throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = Board.getBoardAfterMove(game.board, move);
    game.black = GameColor.getColorAfterMove(game.black, move);
    game.white = GameColor.getColorAfterMove(game.white, move);
    if (!backMove) {
        game.movements.push(move);
        game = getWinner(game);
    }
    return game;
}
function getBackMove(move) {
    return {
        from: move.to,
        to: move.from
    };
}
function getGameBeforeLastMove(game) {
    var lastMove = game.movements.pop();
    if (lastMove) game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (Player.isComputer(getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
exports.canMove = canMove;
exports.create = create;
exports.getBackMove = getBackMove;
exports.getColorTurn = getColorTurn;
exports.getPlayerTurn = getPlayerTurn;
exports.getWinner = getWinner;
exports.getGameWhereCanIGo = getGameWhereCanIGo;
exports.getGameAfterMove = getGameAfterMove;
exports.getGameBeforeLastMove = getGameBeforeLastMove;
exports.setPlayers = setPlayers;
exports.setMovements = setMovements;
exports.getCleanGameToSaveOnServer = getCleanGameToSaveOnServer;
//# sourceMappingURL=Game.js.map
//# sourceMappingURL=Game.js.map