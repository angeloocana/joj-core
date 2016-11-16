"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PieceHelper = require("./helpers/PieceHelper");

var _PieceHelper2 = _interopRequireDefault(_PieceHelper);

var _GameBoard = require("./GameBoard");

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _GameColor = require("./GameColor");

var _GameColor2 = _interopRequireDefault(_GameColor);

var _ptzCopy = require("ptz-copy");

var _ptzCopy2 = _interopRequireDefault(_ptzCopy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Game);

        this.ended = false;
        this.board = new _GameBoard2.default();
        this.white = new _GameColor2.default(this.board.boardOptions, false);
        this.black = new _GameColor2.default(this.board.boardOptions, true);
        if (args.needToValidateMovements !== true && args.needToValidateMovements !== false) args.needToValidateMovements = true;
        this.setMovements(args.movements, args.needToValidateMovements);
        this.setPlayers(args.players);
    }

    _createClass(Game, [{
        key: "setPlayers",
        value: function setPlayers(players) {
            this.players = players;
        }
    }, {
        key: "setMovements",
        value: function setMovements() {
            var movements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var needToValidateMovements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.movements = movements;
            this.board.generateBoard(this.white.pieces, this.black.pieces);
        }
    }, {
        key: "isWhiteTurn",
        value: function isWhiteTurn() {
            return this.movements.length % 2 == 0;
        }
    }, {
        key: "getCleanGameToSaveOnServer",
        value: function getCleanGameToSaveOnServer() {
            var cleanGame = {
                ended: this.ended,
                movements: [],
                blackWin: this.blackWin
            };
            for (var i = 0; i < this.movements.length; i++) {
                var move = this.movements[i];
                cleanGame.movements.push({
                    startPosition: { x: move.startPosition.x, y: move.startPosition.y },
                    nextPosition: { x: move.nextPosition.x, y: move.nextPosition.y }
                });
            }
            return cleanGame;
        }
    }, {
        key: "setWhereCanIGo",
        value: function setWhereCanIGo(startPosition) {
            this.board.cleanBoardWhereCanIGo();
            var blackPiece = _PieceHelper2.default.isBlackPiece(startPosition);
            var whiteTurn = this.isWhiteTurn();
            if (this.ended || blackPiece === null || !blackPiece && !whiteTurn || blackPiece && whiteTurn) return;
            this.board.setWhereCanIGo(startPosition, blackPiece);
        }
    }, {
        key: "verifyWinner",
        value: function verifyWinner() {
            this.white.setColorWinners();
            this.black.setColorWinners();
            if (this.white.win()) this.blackWin = false;else if (this.black.win()) this.blackWin = true;
        }
    }, {
        key: "canMove",
        value: function canMove(startPosition, nextPosition) {
            var positionsWhereCanIGo = this.board.getPositionsWhereCanIGo(startPosition, !this.isWhiteTurn()).positions;
            var nextPositionFound = false;
            nextPositionFound = positionsWhereCanIGo.findIndex(function (position) {
                return position.x === nextPosition.x && position.y === nextPosition.y;
            }) >= 0;
            this.board.cleanBoardWhereCanIGo();
            return nextPositionFound;
        }
    }, {
        key: "move",
        value: function move(startPosition, nextPosition) {
            var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!backMove) if (!this.canMove(startPosition, nextPosition)) return;
            this.board.move(startPosition, nextPosition, backMove, this.isWhiteTurn());
            this.black.move(startPosition, nextPosition);
            this.white.move(startPosition, nextPosition);
            if (!backMove) {
                this.movements.push({ startPosition: startPosition, nextPosition: nextPosition });
                this.verifyWinner();
            }
        }
    }, {
        key: "backMove",
        value: function backMove() {
            this.board.cleanBoardWhereCanIGo();
            var lastMove = this.movements.pop();
            if (lastMove) this.move(lastMove.nextPosition, lastMove.startPosition, true);
            if (this.getPlayerTurn().isComputer()) {
                lastMove = this.movements.pop();
                if (lastMove) {
                    this.board.cleanBoardWhereCanIGo();
                    this.move(lastMove.nextPosition, lastMove.startPosition, true);
                }
            }
        }
    }, {
        key: "getColorTurn",
        value: function getColorTurn() {
            return this.isWhiteTurn ? this.white : this.black;
        }
    }, {
        key: "getPlayerTurn",
        value: function getPlayerTurn() {
            return this.isWhiteTurn ? this.players.white : this.players.black;
        }
    }, {
        key: "getNewCopy",
        value: function getNewCopy() {
            return new Game(this);
        }
    }, {
        key: "getCopy",
        value: function getCopy() {
            return (0, _ptzCopy2.default)(this);
        }
    }]);

    return Game;
}();

exports.default = Game;