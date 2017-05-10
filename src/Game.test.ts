import { deepEqual, equal, throws } from 'ptz-assert';
import {
    createGame,
    getCleanGameToSaveOnServer,
    getGameAfterMove,
    getGameBeforeLastMove,
    IGame
} from './index';

describe('Game', () => {
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

            let game = createGame({ players });

            const gameBeforeLastMove = getGameAfterMove(game, { from: { x: 2, y: 7 }, to: { x: 2, y: 6 } });

            game = getGameAfterMove(gameBeforeLastMove, { from: { x: 2, y: 0 }, to: { x: 2, y: 1 } });

            game = getGameBeforeLastMove(game);

            equal(gameBeforeLastMove.movements.length, game.movements.length);
            deepEqual(gameBeforeLastMove.movements, game.movements);
        });
    });

    describe('Move', () => {
        var game: IGame;

        beforeEach(() => {
            game = createGame({
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

            throws(() => {
                game = getGameAfterMove(game, move);
            });
        });
    });

    describe('getCleanGameToSaveOnServer', () => {
        it('map', () => {
            const game = createGame({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            const cleanGame = getCleanGameToSaveOnServer(game);

            equal(game.ended, cleanGame.ended);
            deepEqual(game.movements, cleanGame.movements);
            equal(game.blackWin, cleanGame.blackWin);
        });
    });
});
