import * as assert from 'ptz-assert';
import * as TestData from './__testdata__/index.data.test';
import { Board, Game, Move } from './index';
import * as I from './typings';

describe('Move', () => {
    describe('getBackMove', () => {
        it('invert move {from:0,7 to:1,6} => {from:1,6 to:0,7}', () => {
            const move = {
                from: { x: 0, y: 7 },
                to: { x: 1, y: 6 }
            };

            const backMove = Move.getBackMove(move);
            assert.equal(backMove.from, move.to);
            assert.equal(backMove.to, move.from);
        });
    });

    describe('backMove', () => {
        it('backMove offline game', () => {

            const players = {
                white: { name: 'Angelo', foto: 'img/black_user.png' },
                black: { name: 'Gabi', foto: 'img/white_user.png' }
            };

            const game0 = Game.createGame({ players });

            const game1 = Move.getGameAfterMove(game0, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });

            const game2 = Move.getGameAfterMove(game1, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });

            const game_1 = Move.getGameBeforeLastMove(game2); // tslint:disable-line:variable-name

            assert.deepEqual(game_1.moves, game1.moves);
        });

        it('return AI move too', () => {
            const players: I.IPlayersArgs = {
                white: { name: 'Angelo' },
                black: { name: 'AI', isAi: true }
            };

            const game0 = Game.createGame({ players });

            const game1 = Move.getGameAfterMove(game0, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });

            const game2 = Move.getGameAfterMove(game1, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });

            const gameBefore = Move.getGameBeforeLastMove(game2);

            assert.equal(gameBefore.moves.length, game0.moves.length);
            assert.deepEqual(gameBefore.moves, game0.moves);
        });

        it('no moves', () => {
            const game = Game.createGame();

            const gameBefore = Move.getGameBeforeLastMove(game);

            assert.equal(gameBefore.moves.length, game.moves.length);
            assert.deepEqual(gameBefore.moves, game.moves);
        });

        it('no AI move', () => {
            const players: I.IPlayersArgs = {
                white: { name: 'AI', isAi: true },
                black: { name: 'Angelo' }
            };

            const game0 = Game.createGame({ players });

            const game1 = Move.getGameAfterMove(game0, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });

            const gameBefore = Move.getGameBeforeLastMove(game1);

            assert.equal(gameBefore.moves.length, game0.moves.length);
            assert.deepEqual(gameBefore.moves, game0.moves);
        });
    });

    describe('getGameAfterMove', () => {
        it('Block moving to same position', () => {
            const game = Game.createGame({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });

            const move = {
                from: { x: 0, y: 0 },
                to: { x: 0, y: 0 }
            };

            const gameAfterMove = Move.getGameAfterMove(game, move);
            assert.equal(gameAfterMove, game, 'not the same game');
        });
    });

    it('getGameAfterMoves', () => {
        const gameBeforeMoves = Game.createGame();

        const moves = Move.getMovesFromArray([
            [[5, 7], [5, 6]],
            [[2, 0], [2, 1]],
            [[7, 7], [5, 5]]
        ]);

        const gameAfterMoves = Move.getGameAfterMoves(gameBeforeMoves, moves);

        assert.notEqual(gameBeforeMoves, gameAfterMoves, 'immutable');
        assert.equal(gameAfterMoves.moves.length, moves.length, 'n moves');
    });

    describe('getBoardAfterMove', () => {
        it('5,7 => 5,6 5,5 5,3 => 5,1', () => {
            const pieces = [
                { x: 5, y: 7, isBlack: true },
                { x: 5, y: 6, isBlack: false },
                { x: 5, y: 4, isBlack: false },
                { x: 5, y: 2, isBlack: false },
            ];
            const boardBefore = Board.getBoardWithPieces(TestData.cleanBoard, pieces);
            const from = { x: 5, y: 7 };

            const p55 = {
                x: 5, y: 5,
                jumpingBlackPiece: false,
                jumps: [from]
            };

            const p53 = {
                x: 5, y: 3,
                jumpingBlackPiece: false,
                jumps: [from, p55]
            };

            const p51 = {
                x: 5, y: 1,
                jumpingBlackPiece: false,
                jumps: [from, p55, p53]
            };

            const move = {
                from,
                to: p51
            };

            const boardAfter = Move.getBoardAfterMove(boardBefore, move);

            // tslint:disable:max-line-length
            const boardAfterExpected = [
                [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }],
                [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1, isBlack: true, lastMove: true }, { x: 6, y: 1 }, { x: 7, y: 1 }],
                [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2, isBlack: false }, { x: 6, y: 2 }, { x: 7, y: 2 }],
                [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3, lastMoveJump: true }, { x: 6, y: 3 }, { x: 7, y: 3 }],
                [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4, isBlack: false }, { x: 6, y: 4 }, { x: 7, y: 4 }],
                [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5, lastMoveJump: true }, { x: 6, y: 5 }, { x: 7, y: 5 }],
                [{ x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6, isBlack: false }, { x: 6, y: 6 }, { x: 7, y: 6 }],
                [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7, lastMove: true }, { x: 6, y: 7 }, { x: 7, y: 7 }]
            ];

            assert.deepEqual(boardAfter, boardAfterExpected);
        });
    });

    describe('getAllowedMovesFromArrays', () => {
        it('get from array', () => {
            const moves = Move.getAllowedMovesFromArrays([
                [[0, 7], [0, 6], [1, 6]],
                [[1, 7], [0, 6], [1, 6], [2, 6]]
            ]);

            const expectedMoves = [
                { from: { x: 0, y: 7 }, to: { x: 0, y: 6 } },
                { from: { x: 0, y: 7 }, to: { x: 1, y: 6 } },

                { from: { x: 1, y: 7 }, to: { x: 0, y: 6 } },
                { from: { x: 1, y: 7 }, to: { x: 1, y: 6 } },
                { from: { x: 1, y: 7 }, to: { x: 2, y: 6 } },
            ];

            assert.deepEqual(moves, expectedMoves);
        });
    });

    describe('movesContains', () => {
        it('contains', () => {
            const moves = Move.getMovesFromArray([
                [[0, 0], [0, 1]],
                [[7, 6], [6, 6]],
                [[2, 3], [3, 4]]
            ]);

            const move = Move.getMoveFromArray([[0, 0], [0, 1]]);

            assert.ok(Move.movesContains(moves, move));
        });

        it('NOT contains', () => {
            const moves = Move.getMovesFromArray([
                [[0, 0], [0, 1]],
                [[7, 6], [6, 6]],
                [[2, 3], [3, 4]]
            ]);

            const move = Move.getMoveFromArray([[3, 3], [2, 2]]);

            assert.notOk(Move.movesContains(moves, move));
        });
    });
});
