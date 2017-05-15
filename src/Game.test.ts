import * as assert from 'ptz-assert';
import { initialGame } from './__testdata__/game.data.test';
import { Game, Move } from './index';

describe('Game', () => {
    describe('create', () => {
        it('creates a new game');
    });

    describe('needToValidateMovements', () => {
        it('when null should validate');
        it('when undefined should validate');
        it('when true should validate');
        it('when false should NOT validate');
    });

    describe('isMyTurn', () => {
        it('returns true for black piece and black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const moveFrom = { x: 5, y: 0 };

            const game = Move.getGameAfterMove(initialGame, firstMove);

            assert.ok(Game.isMyTurn(game, moveFrom));
        });

        it('returns true for white piece and white turn', () => {
            const from = { x: 5, y: 7 };
            assert.ok(Game.isMyTurn(initialGame, from));
        });

        it('returns false for white piece and black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(initialGame, firstMove);
            const from = { x: 7, y: 7 };
            assert.notOk(Game.isMyTurn(game, from));
        });

        it('returns false for black piece and white turn', () => {
            const from = { x: 5, y: 0 };
            assert.notOk(Game.isMyTurn(initialGame, from));
        });

        it('returns false for ended game', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(initialGame, firstMove);
            const from = { x: 5, y: 0 };

            // $Fix
            // I dont know if it is the best way
            // Are getGameAfterMove supposed to calculate if game is ended???
            game.score.ended = true;

            assert.notOk(Game.isMyTurn(game, from));
        });
    });

    describe('getPlayerTurn', () => {
        it('return white player when white turn', () => {
            assert.equal(Game.getPlayerTurn(initialGame), initialGame.players.white);
        });

        it('return black player when black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(initialGame, firstMove);
            assert.equal(Game.getPlayerTurn(game), game.players.black);
        });
    });
});
