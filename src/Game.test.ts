import * as assert from 'ptz-assert';
import log from 'ptz-log';
import {
    Game,
    Move
} from './index';

import { initialGame } from './__tests__/game.data.test';

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

    describe('getCleanGameToSaveOnServer', () => {
        it('map no movements', () => {
            const cleanGame = Game.getCleanGameToSaveOnServer(initialGame);

            assert.equal(initialGame.ended, cleanGame.ended);
            assert.deepEqual(initialGame.movements, cleanGame.movements);
        });

        it('map with movements', () => {
            const move = {
                from: { x: 4, y: 7 },
                to: { x: 4, y: 6 }
            };

            log('before initialGame.movements', initialGame.movements);

            const game = Move.getGameAfterMove(initialGame, move, false);

            log('game === initialGame: ', game === initialGame);
            log('after initialGame.movements', initialGame.movements);
            log('game.movements', game.movements);

            const cleanGame = Game.getCleanGameToSaveOnServer(game);

            assert.equal(game.ended, cleanGame.ended);
            assert.equal(cleanGame.movements.length, 1);
            assert.deepEqual(game.movements, cleanGame.movements);
        });
    });

    describe('isMyTurn', () => {
        it('returns true for black piece and black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(initialGame, firstMove);
            const from = { x: 5, y: 0 };
            assert.ok(Game.isMyTurn(game, from));
        });

        it('returns true for white piece and white turn', () => {
            const from = { x: 5, y: 7 };
            assert.ok(Game.isMyTurn(initialGame, from));
        });

        it('returns false for white piece and black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            log('initialGame', initialGame);

            const game = Move.getGameAfterMove(initialGame, firstMove);
            const from = { x: 7, y: 7 };
            assert.notOk(Game.isMyTurn(game, from));
        });

        it('returns false for black piece and white turn', () => {
            const from = { x: 5, y: 0 };
            assert.notOk(Game.isMyTurn(initialGame, from));
        });
    });
});
