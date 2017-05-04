'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GameBoard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BoardPosition = require('./BoardPosition');

var _BoardHelper = require('./helpers/BoardHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = exports.GameBoard = function () {
    /**
     * Game Board
     */
    function GameBoard(args) {
        _classCallCheck(this, GameBoard);

        if (!args) args = {};
        this.logMove = args.logMove || false;
        this.boardOptions = args.boardOptions || { size: { x: 8, y: 8 } };
        this.generateBoard();
        this.fillAllPiecesOnBoard(args.whitePieces, args.blackPieces);
    }

    _createClass(GameBoard, [{
        key: 'fillPiecesOnBoard',
        value: function fillPiecesOnBoard(pieces) {
            var _this = this;

            if (!pieces) return;
            pieces.forEach(function (piece) {
                return _this.getPosition(piece.position).setPiece(piece.position.isBlackPiece());
            });
        }
    }, {
        key: 'fillAllPiecesOnBoard',
        value: function fillAllPiecesOnBoard(whitePieces, blackPieces) {
            this.fillPiecesOnBoard(whitePieces);
            this.fillPiecesOnBoard(blackPieces);
        }
    }, {
        key: 'generateBoard',
        value: function generateBoard() {
            this.board = [];
            for (var x = 0; x < this.boardOptions.size.x; x++) {
                for (var y = 0; y < this.boardOptions.size.y; y++) {
                    if (!this.board[x]) this.board[x] = [];
                    var position = new _BoardPosition.BoardPosition({ x: x, y: y });
                    if (y === this.boardOptions.size.y - 1) position.isWhiteHome = true;
                    if (y === 0) position.isBlackHome = true;
                    this.board[x][y] = position;
                }
            }
        }
    }, {
        key: 'boardHasThisPosition',
        value: function boardHasThisPosition(position) {
            return position.x < 0 || position.y < 0 || position.x >= this.boardOptions.size.x || position.y >= this.boardOptions.size.y ? false : true;
        }
    }, {
        key: 'getPosition',
        value: function getPosition(position) {
            try {
                return this.board[position.x][position.y];
            } catch (e) {
                console.log('Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
                console.log(position);
                console.log('Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
                throw new Error('Error getting position');
            }
        }
    }, {
        key: 'getNearPositions',
        value: function getNearPositions(position, onlyEmpty) {
            var positions = [];
            var board = this;
            function add(plusX, plusY) {
                var newPosition = new _BoardPosition.BoardPosition({
                    x: position.x + plusX,
                    y: position.y + plusY
                });
                if (!board.boardHasThisPosition(newPosition)) return;
                newPosition = board.getPosition(newPosition);
                if (typeof onlyEmpty !== 'undefined') {
                    if (onlyEmpty === newPosition.isEmpty()) positions.push(newPosition);
                } else positions.push(newPosition);
            }
            add(-1, -1);
            add(0, -1);
            add(+1, -1);
            add(-1, 0);
            add(+1, 0);
            add(-1, +1);
            add(0, +1);
            add(+1, +1);
            return positions;
        }
    }, {
        key: 'getJumpPosition',
        value: function getJumpPosition(startPosition, toJumpPosition) {
            var jumpPosition = new _BoardPosition.BoardPosition({ x: 0, y: 0 });
            if (startPosition.x < toJumpPosition.x) jumpPosition.x = toJumpPosition.x + 1;else if (startPosition.x > toJumpPosition.x) jumpPosition.x = toJumpPosition.x - 1;else jumpPosition.x = toJumpPosition.x;
            if (startPosition.y < toJumpPosition.y) jumpPosition.y = toJumpPosition.y + 1;else if (startPosition.y > toJumpPosition.y) jumpPosition.y = toJumpPosition.y - 1;else jumpPosition.y = toJumpPosition.y;
            if (!this.boardHasThisPosition(jumpPosition)) {
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // console.log("getJumpPosition boardHasThisPosition = false");
                // console.log("startPosition");
                // console.log(startPosition);
                // console.log("toJumpPosition");
                // console.log(toJumpPosition);
                // console.log("jumpPosition");
                // console.log(jumpPosition);
                // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                return;
            }
            jumpPosition = this.getPosition(jumpPosition);
            if (!jumpPosition.isEmpty()) {
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // console.log("getJumpPosition isEmpty = false");
                // console.log("startPosition");
                // console.log(startPosition);
                // console.log("toJumpPosition");
                // console.log(toJumpPosition);
                // console.log("jumpPosition");
                // console.log(jumpPosition);
                // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                return;
            }
            return jumpPosition;
        }
        // tslint:disable-next-line:max-line-length

    }, {
        key: 'whereCanIJump',
        value: function whereCanIJump(jumpStartPosition, positions, orderedPositions, isBlack) {
            var _this2 = this;

            var nearFilledPositions = this.getNearPositions(jumpStartPosition, false);
            nearFilledPositions.forEach(function (nearFilledPosition) {
                var jumpPosition = _this2.getJumpPosition(jumpStartPosition, nearFilledPosition);
                if (jumpPosition) {
                    if (_BoardHelper.boardHelper.isPositionNotAdded(jumpPosition, positions)) {
                        jumpPosition.lastPosition = jumpStartPosition;
                        jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlackPiece();
                        jumpPosition.jumps = jumpStartPosition.jumps ? jumpStartPosition.jumps++ : 2;
                        positions.push(jumpPosition);
                        var y = _BoardHelper.boardHelper.getY0Start7End(jumpPosition.y, isBlack);
                        if (!orderedPositions[y]) orderedPositions[y] = [];
                        orderedPositions[y][_BoardHelper.boardHelper.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;
                        _this2.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                    }
                }
            });
        }
    }, {
        key: 'getPositionsWhereCanIGo',
        value: function getPositionsWhereCanIGo(startPosition, isBlack) {
            if (!startPosition) return null;
            var allNearPositions = this.getNearPositions(startPosition, undefined);
            var positions = [];
            var orderedPositions = [];
            for (var i = 0; i < allNearPositions.length; i++) {
                var nearPosition = allNearPositions[i];
                if (nearPosition.isEmpty()) {
                    positions.push(nearPosition);
                    var y = _BoardHelper.boardHelper.getY0Start7End(nearPosition.y, isBlack);
                    if (!orderedPositions[y]) orderedPositions[y] = [];
                    orderedPositions[y][_BoardHelper.boardHelper.getIndexToSearchOrder(nearPosition.x)] = nearPosition;
                } else {
                    var jumpPosition = this.getJumpPosition(startPosition, nearPosition);
                    if (jumpPosition) {
                        jumpPosition.jumps = 1;
                        positions.push(jumpPosition);
                        var _y = _BoardHelper.boardHelper.getY0Start7End(jumpPosition.y, isBlack);
                        if (!orderedPositions[_y]) orderedPositions[_y] = [];
                        orderedPositions[_y][_BoardHelper.boardHelper.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;
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
        key: 'setWhereCanIGo',
        value: function setWhereCanIGo(startPosition, blackPiece) {
            var _this3 = this;

            var positions = this.getPositionsWhereCanIGo(startPosition, blackPiece).positions;
            positions.forEach(function (position) {
                _this3.getPosition(position).iCanGoHere = true;
            });
        }
    }, {
        key: 'cleanBoardWhereCanIGo',
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
        key: 'printUnicode',
        value: function printUnicode() {
            var board = '';
            for (var y = 0; y < this.board.length; y++) {
                for (var x = 0; x < this.board[y].length; x++) {
                    var position = this.board[x][y];
                    if (_BoardHelper.boardHelper.isBackGroundBlack(x, y)) {
                        if (position.isWhitePiece()) board += '\u25CF';else if (position.isBlackPiece()) board += '\u25CB';else board += ' ';
                    } else {
                        if (position.isWhitePiece()) board += '\u25D9';else if (position.isBlackPiece()) board += '\u25D8';else board += '\u2588';
                    }
                }
                board += '\n';
            }
            return board;
        }
    }, {
        key: 'move',
        value: function move(startPosition, nextPosition, backMove, whiteTurn) {
            if (backMove) {
                this.getPosition(nextPosition).setPiece(!whiteTurn);
                this.getPosition(startPosition).removePiece();
            } else this.getPosition(startPosition).move(this.getPosition(nextPosition));
            var jumpPosition = nextPosition.lastPosition;
            while (jumpPosition) {
                this.getPosition(jumpPosition).lastMoveJump = true;
                jumpPosition = jumpPosition.lastPosition;
            }
            this.getPosition(nextPosition).lastMove = true;
            this.getPosition(startPosition).lastMove = true;
            if (this.logMove) console.log(this.printUnicode());
        }
    }]);

    return GameBoard;
}();
//# sourceMappingURL=GameBoard.js.map
//# sourceMappingURL=GameBoard.js.map