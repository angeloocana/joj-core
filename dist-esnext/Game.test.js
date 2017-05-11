import * as assert from 'ptz-assert';
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
    describe('getCleanGameToSaveOnServer', () => {
        it('map no movements', () => {
            const game = Game.create({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            const cleanGame = Game.getCleanGameToSaveOnServer(game);
            assert.equal(game.ended, cleanGame.ended);
            assert.deepEqual(game.movements, cleanGame.movements);
        });
        it('map with movements', () => {
            let game = Game.create({
                players: {
                    white: { name: 'Angelo', foto: 'img/black_user.png' },
                    black: { name: 'Gabi', foto: 'img/white_user.png' }
                }
            });
            const move = {
                from: { x: 4, y: 7 },
                to: { x: 4, y: 6 }
            };
            game = Move.getGameAfterMove(game, move, false);
            const cleanGame = Game.getCleanGameToSaveOnServer(game);
            assert.equal(game.ended, cleanGame.ended);
            assert.equal(cleanGame.movements.length, 1);
            assert.deepEqual(game.movements, cleanGame.movements);
        });
    });
});
//# sourceMappingURL=Game.test.js.map