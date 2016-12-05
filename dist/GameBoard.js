"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BoardHelper = require("./helpers/BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _GamePieceType = require("./GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

var _BoardPosition = require("./BoardPosition");

var _BoardPosition2 = _interopRequireDefault(_BoardPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = function () {
    function GameBoard(args) {
        _classCallCheck(this, GameBoard);

        if (!args) args = {};
        this.logMove = args.logMove || false;
        this.boardOptions = args.boardOptions || { size: { x: 8, y: 8 } };
        this.generateBoard();
        this.fillAllPiecesOnBoard(args.whitePieces, args.blackPieces);
    }

    _createClass(GameBoard, [{
        key: "fillPiecesOnBoard",
        value: function fillPiecesOnBoard(pieces, pieceType) {
            if (!pieces) return;
            for (var i = 0; i < pieces.length; i++) {
                var piece = pieces[i];
                this.board[piece.x][piece.y].piece = pieceType;
            }
        }
    }, {
        key: "fillAllPiecesOnBoard",
        value: function fillAllPiecesOnBoard(whitePieces, blackPieces) {
            this.fillPiecesOnBoard(whitePieces, _GamePieceType2.default.white);
            this.fillPiecesOnBoard(blackPieces, _GamePieceType2.default.black);
        }
    }, {
        key: "generateBoard",
        value: function generateBoard() {
            this.board = [];
            for (var x = 0; x < this.boardOptions.size.x; x++) {
                for (var y = 0; y < this.boardOptions.size.y; y++) {
                    if (!this.board[x]) this.board[x] = [];
                    var position = new _BoardPosition2.default({ x: x, y: y });
                    if (y === this.boardOptions.size.y - 1) position.isWhiteHome = true;
                    if (y === 0) position.isBlackHome = true;
                    this.board[x][y] = position;
                }
            }
        }
    }, {
        key: "boardHasThisPosition",
        value: function boardHasThisPosition(position) {
            return position.x < 0 || position.y < 0 || position.x >= this.boardOptions.size.x || position.y >= this.boardOptions.size.y ? false : true;
        }
    }, {
        key: "getPosition",
        value: function getPosition(position) {
            try {
                return this.board[position.x][position.y];
            } catch (e) {
                console.log("Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
                console.log(position);
                console.log("Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
                throw "Error getting position";
            }
        }
    }, {
        key: "isPositionEmpty",
        value: function isPositionEmpty(position) {
            return !this.getPosition(position).piece;
        }
    }, {
        key: "getNearPositions",
        value: function getNearPositions(position, onlyEmpty) {
            var positions = [];
            var board = this;
            var add = function add(plusX, plusY, board) {
                var newPosition = new _BoardPosition2.default({
                    x: position.x + plusX,
                    y: position.y + plusY
                });
                if (!board.boardHasThisPosition(newPosition)) return;
                if (typeof onlyEmpty != "undefined") {
                    var positionEmpty = board.isPositionEmpty(newPosition);
                    if (onlyEmpty === positionEmpty) positions.push(newPosition);
                } else positions.push(newPosition);
            };
            add(-1, -1, this);
            add(0, -1, this);
            add(+1, -1, this);
            add(-1, 0, this);
            add(+1, 0, this);
            add(-1, +1, this);
            add(0, +1, this);
            add(+1, +1, this);
            return positions;
        }
    }, {
        key: "getJumpPosition",
        value: function getJumpPosition(startPosition, toJumpPosition) {
            var jumpPosition = new _BoardPosition2.default({ x: 0, y: 0 });
            if (startPosition.x < toJumpPosition.x) jumpPosition.x = toJumpPosition.x + 1;else if (startPosition.x > toJumpPosition.x) jumpPosition.x = toJumpPosition.x - 1;else jumpPosition.x = toJumpPosition.x;
            if (startPosition.y < toJumpPosition.y) jumpPosition.y = toJumpPosition.y + 1;else if (startPosition.y > toJumpPosition.y) jumpPosition.y = toJumpPosition.y - 1;else jumpPosition.y = toJumpPosition.y;
            if (this.boardHasThisPosition(jumpPosition) && this.isPositionEmpty(jumpPosition)) return jumpPosition;
        }
    }, {
        key: "whereCanIJump",
        value: function whereCanIJump(jumpStartPosition, positions, orderedPositions, isBlack) {
            var _this = this;

            var nearFilledPositions = this.getNearPositions(jumpStartPosition, false);
            nearFilledPositions.forEach(function (nearFilledPosition) {
                var jumpPosition = _this.getJumpPosition(jumpStartPosition, nearFilledPosition);
                if (jumpPosition) {
                    if (_BoardHelper2.default.isPositionNotAdded(jumpPosition, positions)) {
                        jumpPosition.lastPosition = jumpStartPosition;
                        jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlackPiece();
                        jumpPosition.jumps = jumpStartPosition.jumps ? jumpStartPosition.jumps++ : 2;
                        positions.push(jumpPosition);
                        var y = _BoardHelper2.default.getY0Start7End(jumpPosition.y, isBlack);
                        if (!orderedPositions[y]) orderedPositions[y] = [];
                        orderedPositions[y][_BoardHelper2.default.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;
                        _this.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                    }
                }
            });
        }
    }, {
        key: "getPositionsWhereCanIGo",
        value: function getPositionsWhereCanIGo(startPosition, isBlack) {
            if (!startPosition) return null;
            var allNearPositions = this.getNearPositions(startPosition, undefined);
            var positions = [];
            var orderedPositions = [];
            for (var i = 0; i < allNearPositions.length; i++) {
                var nearPosition = allNearPositions[i];
                if (this.isPositionEmpty(nearPosition)) {
                    positions.push(nearPosition);
                    var y = _BoardHelper2.default.getY0Start7End(nearPosition.y, isBlack);
                    if (!orderedPositions[y]) orderedPositions[y] = [];
                    orderedPositions[y][_BoardHelper2.default.getIndexToSearchOrder(nearPosition.x)] = nearPosition;
                } else {
                    var jumpPosition = this.getJumpPosition(startPosition, nearPosition);
                    if (jumpPosition) {
                        jumpPosition.jumps = 1;
                        positions.push(jumpPosition);
                        var _y = _BoardHelper2.default.getY0Start7End(jumpPosition.y, isBlack);
                        if (!orderedPositions[_y]) orderedPositions[_y] = [];
                        orderedPositions[_y][_BoardHelper2.default.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;
                        this.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                    }
                }
            }
            return {
                positions: positions,
                orderedPositions: orderedPositions
            };
        }
    }, {
        key: "setWhereCanIGo",
        value: function setWhereCanIGo(startPosition, blackPiece) {
            var _this2 = this;

            var positions = this.getPositionsWhereCanIGo(startPosition, blackPiece).positions;
            positions.forEach(function (position) {
                _this2.board[position.x][position.y].iCanGoHere = true;
            });
        }
    }, {
        key: "cleanBoardWhereCanIGo",
        value: function cleanBoardWhereCanIGo() {
            for (var x = 0; x < this.board.length; x++) {
                for (var y = 0; y < this.board[x].length; y++) {
                    this.board[x][y].iCanGoHere = false;
                    this.board[x][y].lastMove = false;
                    this.board[x][y].lastMoveJump = false;
                }
            }
        }
    }, {
        key: "printUnicode",
        value: function printUnicode() {
            var board = "";
            for (var y = 0; y < this.board.length; y++) {
                for (var x = 0; x < this.board[y].length; x++) {
                    var position = this.board[x][y];
                    if (_BoardHelper2.default.isBackGroundBlack(x, y)) {
                        if (position.piece == _GamePieceType2.default.white) board += "\u25CF";else if (position.piece == _GamePieceType2.default.black) board += "\u25CB";else board += " ";
                    } else {
                        if (position.piece == _GamePieceType2.default.white) board += "\u25D9";else if (position.piece == _GamePieceType2.default.black) board += "\u25D8";else board += "\u2588";
                    }
                }
                board += "\n";
            }
            return board;
        }
    }, {
        key: "move",
        value: function move(startPosition, nextPosition, backMove, whiteTurn) {
            if (backMove) {
                this.board[nextPosition.x][nextPosition.y].piece = whiteTurn ? _GamePieceType2.default.black : _GamePieceType2.default.white;
                this.board[startPosition.x][startPosition.y].piece = null;
            } else {
                this.board[nextPosition.x][nextPosition.y].piece = this.board[startPosition.x][startPosition.y].piece;
                this.board[startPosition.x][startPosition.y].piece = null;
            }
            var jumpPosition = nextPosition.lastPosition;
            while (jumpPosition) {
                this.board[jumpPosition.x][jumpPosition.y].lastMoveJump = true;
                jumpPosition = jumpPosition.lastPosition;
            }
            this.board[nextPosition.x][nextPosition.y].lastMove = true;
            this.board[startPosition.x][startPosition.y].lastMove = true;
            if (this.logMove) console.log(this.printUnicode());
        }
    }]);

    return GameBoard;
}();

exports.default = GameBoard;