'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ptzCopy = require('ptz-copy');

var _ptzCopy2 = _interopRequireDefault(_ptzCopy);

var _BoardPosition = require('./BoardPosition');

var _GameBoard = require('./GameBoard');

var _GameColor = require('./GameColor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    /**
     * Create new Game
     */
    function Game() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Game);

        this.ended = false;
        if (args.needToValidateMovements !== true && args.needToValidateMovements !== false) args.needToValidateMovements = true;
        this.board = new _GameBoard.GameBoard(args.boardArgs);
        this.white = new _GameColor.GameColor(this.board.boardOptions, false);
        this.black = new _GameColor.GameColor(this.board.boardOptions, true);
        this.setMovements(args.movements, args.needToValidateMovements);
        this.setPlayers(args.players);
    }

    _createClass(Game, [{
        key: 'setPlayers',
        value: function setPlayers(players) {
            // Validate Players
            this.players = players;
        }
    }, {
        key: 'setMovements',
        value: function setMovements() {
            var movements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var needToValidateMovements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // Validate Movements
            // if(needToValidateMovements)
            this.movements = movements;
            this.board.fillAllPiecesOnBoard(this.white.pieces, this.black.pieces);
        }
    }, {
        key: 'isWhiteTurn',
        value: function isWhiteTurn() {
            return this.movements.length % 2 === 0;
        }
    }, {
        key: 'getCleanGameToSaveOnServer',
        value: function getCleanGameToSaveOnServer() {
            var cleanGame = {
                ended: this.ended,
                movements: [],
                blackWin: this.blackWin
            };
            for (var i = 0; i < this.movements.length; i++) {
                var move = this.movements[i];
                var startPosition = new _BoardPosition.BoardPosition({ x: move.startPosition.x, y: move.startPosition.y });
                var nextPosition = new _BoardPosition.BoardPosition({ x: move.nextPosition.x, y: move.nextPosition.y });
                cleanGame.movements.push({ startPosition: startPosition, nextPosition: nextPosition });
            }
            return cleanGame;
        }
    }, {
        key: 'setWhereCanIGo',
        value: function setWhereCanIGo(startPosition) {
            this.board.cleanBoardWhereCanIGo();
            var blackPiece = startPosition.isBlackPiece();
            var whiteTurn = this.isWhiteTurn();
            if (this.ended || blackPiece === null || !blackPiece && !whiteTurn || blackPiece && whiteTurn) return;
            this.board.setWhereCanIGo(startPosition, blackPiece);
        }
    }, {
        key: 'verifyWinner',
        value: function verifyWinner() {
            this.white.setColorWinners();
            this.black.setColorWinners();
            if (this.white.win()) this.blackWin = false;else if (this.black.win()) this.blackWin = true;
        }
    }, {
        key: 'canMove',
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
        key: 'move',
        value: function move(startPosition, nextPosition) {
            var backMove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (startPosition.isSamePositionAs(nextPosition)) throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
            if (!backMove) if (!this.canMove(startPosition, nextPosition)) throw new Error('ERROR_CANT_MOVE_TO_POSITION');
            this.board.move(startPosition, nextPosition, backMove, this.isWhiteTurn());
            this.black.move(startPosition, nextPosition);
            this.white.move(startPosition, nextPosition);
            if (!backMove) {
                this.movements.push({ startPosition: startPosition, nextPosition: nextPosition });
                this.verifyWinner();
            }
        }
    }, {
        key: 'backMove',
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
        key: 'getColorTurn',
        value: function getColorTurn() {
            return this.isWhiteTurn ? this.white : this.black;
        }
    }, {
        key: 'getPlayerTurn',
        value: function getPlayerTurn() {
            return this.isWhiteTurn ? this.players.white : this.players.black;
        }
    }, {
        key: 'getNewCopy',
        value: function getNewCopy() {
            return new Game(this);
        }
    }, {
        key: 'getCopy',
        value: function getCopy() {
            return (0, _ptzCopy2.default)(this);
        }
    }]);

    return Game;
}();
//# sourceMappingURL=Game.js.map
//# sourceMappingURL=Game.js.map