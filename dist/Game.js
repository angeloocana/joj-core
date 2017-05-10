'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCleanGameToSaveOnServer = exports.setMovements = exports.setPlayers = exports.getGameBeforeLastMove = exports.getGameAfterMove = exports.getGameWhereCanIGo = exports.getWinner = exports.getPlayerTurn = exports.getColorTurn = exports.getBackMove = exports.createGame = exports.canMove = undefined;

var _ramda = require('ramda');

var _Board = require('./Board');

var _GameColor = require('./GameColor');

var _Player = require('./Player');

var _Players = require('./Players');

var _Position = require('./Position');

function createGame(args) {
    var boardConf = args.boardConf || _Board.defaultBoardConf;

    var _getInitialBoard = (0, _Board.getInitialBoard)(boardConf),
        board = _getInitialBoard.board,
        blackPieces = _getInitialBoard.blackPieces,
        whitePieces = _getInitialBoard.whitePieces;

    var game = {
        ended: false,
        movements: args.movements || [],
        players: (0, _Players.createPlayers)(args.players),
        boardConf: boardConf,
        white: (0, _GameColor.createGameColor)(boardConf, false, whitePieces),
        black: (0, _GameColor.createGameColor)(boardConf, true, blackPieces),
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
    game.white.score = (0, _GameColor.getColorScore)(game.white);
    game.black.score = (0, _GameColor.getColorScore)(game.black);
    if ((0, _GameColor.colorWin)(game.white)) game.blackWin = false;else if ((0, _GameColor.colorWin)(game.black)) game.blackWin = true;
    return game;
}
function isMyTurn(game, from) {
    if (game.ended) return false;
    return isWhiteTurn(game) ? (0, _Position.hasWhitePiece)(from) : (0, _Position.hasBlackPiece)(from);
}
function getGameWhereCanIGo(game, from) {
    game.board = (0, _Board.getCleanBoardWhereCanIGo)(game.board);
    if (!isMyTurn(game, from)) return game;
    game.board = (0, _Board.setWhereCanIGo)(game.board, from, (0, _Position.hasBlackPiece)(from));
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
    var positionsWhereCanIGo = (0, _Board.getPositionsWhereCanIGo)(game.board, move.from, isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(function (position) {
        return position.x === move.to.x && position.y === move.to.y;
    }) >= 0;
}
function getGameAfterMove(game, move) {
    var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if ((0, _Position.isSamePositionAs)(move.from, move.to)) throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
    game.board = (0, _Board.getCleanBoardWhereCanIGo)(game.board);
    if (!backMove) if (!canMove(game, move)) throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = (0, _Board.getBoardAfterMove)(game.board, move);
    game.black = (0, _GameColor.getColorAfterMove)(game.black, move);
    game.white = (0, _GameColor.getColorAfterMove)(game.white, move);
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
    if ((0, _Player.isComputer)(getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
exports.canMove = canMove;
exports.createGame = createGame;
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