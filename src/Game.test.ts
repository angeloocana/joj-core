import * as assert from 'ptz-assert';
import {
    Game,
    IGame
} from './index';

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

    describe('backMove', () => {
        it('backMove offline game', () => {

            const players = {
                white: { name: 'Angelo', foto: 'img/black_user.png' },
                black: { name: 'Gabi', foto: 'img/white_user.png' }
            };

            let game = Game.create({ players });

            const gameBeforeLastMove = Game.getGameAfterMove(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });

            game = Game.getGameAfterMove(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });

            game = Game.getGameBeforeLastMove(game);

            assert.equal(gameBeforeLastMove.movements.length, game.movements.length);
            assert.deepEqual(gameBeforeLastMove.movements, game.movements);
        });
    });

    describe('Move', () => {
        var game: IGame;

        beforeEach(() => {
            game = Game.create({
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
                game = Game.getGameAfterMove(game, move);
            });
        });
    });

    describe('getCleanGameToSaveOnServer', () => {
        it('map', () => {
            const game = Game.create({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            const cleanGame = Game.getCleanGameToSaveOnServer(game);

            assert.equal(game.ended, cleanGame.ended);
            assert.deepEqual(game.movements, cleanGame.movements);
            assert.equal(game.blackWin, cleanGame.blackWin);
        });
    });
});
