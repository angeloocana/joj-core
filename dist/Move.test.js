'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _boardData = require('./__testdata__/board.data.test');

var TestData = _interopRequireWildcard(_boardData);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Move', function () {
    describe('getBackMove', function () {
        it('invert move {from:0,7 to:1,6} => {from:1,6 to:0,7}', function () {
            var move = {
                from: { x: 0, y: 7 },
                to: { x: 1, y: 6 }
            };
            var backMove = _index.Move.getBackMove(move);
            assert.equal(backMove.from, move.to);
            assert.equal(backMove.to, move.from);
        });
    });
    describe('backMove', function () {
        it('backMove offline game', function () {
            var players = {
                white: { name: 'Angelo', foto: 'img/black_user.png' },
                black: { name: 'Gabi', foto: 'img/white_user.png' }
            };
            var game = _index.Game.createGame({ players: players });
            var gameBeforeLastMove = _index.Move.getGameAfterMove(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            game = _index.Move.getGameAfterMove(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });
            game = _index.Move.getGameBeforeLastMove(game);
            assert.equal(gameBeforeLastMove.moves.length, game.moves.length);
            assert.deepEqual(gameBeforeLastMove.moves, game.moves);
        });
        it('return AI move too', function () {
            var players = {
                white: { name: 'Angelo' },
                black: { name: 'AI', isAi: true }
            };
            var game0 = _index.Game.createGame({ players: players });
            var game1 = _index.Move.getGameAfterMove(game0, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            var game2 = _index.Move.getGameAfterMove(game1, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });
            var gameBefore = _index.Move.getGameBeforeLastMove(game2);
            assert.equal(gameBefore.moves.length, game0.moves.length);
            assert.deepEqual(gameBefore.moves, game0.moves);
        });
        it('no moves', function () {
            var game = _index.Game.createGame();
            var gameBefore = _index.Move.getGameBeforeLastMove(game);
            assert.equal(gameBefore.moves.length, game.moves.length);
            assert.deepEqual(gameBefore.moves, game.moves);
        });
        it('no AI move', function () {
            var players = {
                white: { name: 'AI', isAi: true },
                black: { name: 'Angelo' }
            };
            var game0 = _index.Game.createGame({ players: players });
            var game1 = _index.Move.getGameAfterMove(game0, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            var gameBefore = _index.Move.getGameBeforeLastMove(game1);
            assert.equal(gameBefore.moves.length, game0.moves.length);
            assert.deepEqual(gameBefore.moves, game0.moves);
        });
    });
    describe('getGameAfterMove', function () {
        var game;
        beforeEach(function () {
            game = _index.Game.createGame({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
        });
        it('Block moving to same position', function () {
            var move = {
                from: { x: 0, y: 0 },
                to: { x: 0, y: 0 }
            };
            assert.throws(function () {
                game = _index.Move.getGameAfterMove(game, move);
            });
        });
    });
    it('getGameAfterMoves', function () {
        var gameBeforeMoves = _index.Game.createGame();
        var moves = _index.Move.getMovesFromArray([[[5, 7], [5, 6]], [[2, 0], [2, 1]], [[7, 7], [5, 5]]]);
        var gameAfterMoves = _index.Move.getGameAfterMoves(gameBeforeMoves, moves);
        assert.notEqual(gameBeforeMoves, gameAfterMoves, 'immutable');
        assert.equal(gameAfterMoves.moves.length, moves.length);
    });
    describe('getBoardAfterMove', function () {
        it('5,7 => 5,6 5,5 5,3 => 5,1', function () {
            var pieces = [{ x: 5, y: 7, isBlack: true }, { x: 5, y: 6, isBlack: false }, { x: 5, y: 4, isBlack: false }, { x: 5, y: 2, isBlack: false }];
            var boardBefore = _index.Board.getBoardWithPieces(TestData.cleanBoard, pieces);
            var from = { x: 5, y: 7 };
            var p55 = {
                x: 5, y: 5,
                jumpingBlackPiece: false,
                jumps: [from]
            };
            var p53 = {
                x: 5, y: 3,
                jumpingBlackPiece: false,
                jumps: [from, p55]
            };
            var p51 = {
                x: 5, y: 1,
                jumpingBlackPiece: false,
                jumps: [from, p55, p53]
            };
            var move = {
                from: from,
                to: p51
            };
            var boardAfter = _index.Move.getBoardAfterMove(boardBefore, move);
            // tslint:disable:max-line-length
            var boardAfterExpected = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1, isBlack: true, lastMove: true }, { x: 6, y: 1 }, { x: 7, y: 1 }], [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2, isBlack: false }, { x: 6, y: 2 }, { x: 7, y: 2 }], [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3, lastMoveJump: true }, { x: 6, y: 3 }, { x: 7, y: 3 }], [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4, isBlack: false }, { x: 6, y: 4 }, { x: 7, y: 4 }], [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5, lastMoveJump: true }, { x: 6, y: 5 }, { x: 7, y: 5 }], [{ x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6, isBlack: false }, { x: 6, y: 6 }, { x: 7, y: 6 }], [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7, lastMove: true }, { x: 6, y: 7 }, { x: 7, y: 7 }]];
            assert.deepEqual(boardAfter, boardAfterExpected);
        });
    });
});
//# sourceMappingURL=Move.test.js.map
//# sourceMappingURL=Move.test.js.map