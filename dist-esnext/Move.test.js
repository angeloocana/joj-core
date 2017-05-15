import * as assert from 'ptz-assert';
import { Game, Move } from './index';
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
            let game = Game.createGame({ players });
            const gameBeforeLastMove = Move.getGameAfterMove(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });
            game = Move.getGameAfterMove(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });
            game = Move.getGameBeforeLastMove(game);
            assert.equal(gameBeforeLastMove.moves.length, game.moves.length);
            assert.deepEqual(gameBeforeLastMove.moves, game.moves);
        });
    });
    describe('getGameAfterMove', () => {
        var game;
        beforeEach(() => {
            game = Game.createGame({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
        });
        it('Block moving to same position', () => {
            const move = {
                from: { x: 0, y: 0 },
                to: { x: 0, y: 0 }
            };
            assert.throws(() => {
                game = Move.getGameAfterMove(game, move);
            });
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
        assert.equal(gameAfterMoves.moves.length, moves.length);
    });
});
//# sourceMappingURL=Move.test.js.map