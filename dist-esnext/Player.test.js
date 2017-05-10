import { equal, notOk, ok } from 'ptz-assert';
import { createBlackPlayer, createWhitePlayer } from './index';
describe('Player', () => {
    let player;
    describe('createBlackPlayer', () => {
        const name = 'John';
        beforeEach(() => {
            player = createBlackPlayer({ name });
        });
        it('set name', () => {
            equal(player.name, name);
        });
        it('set isBlack = true', () => {
            ok(player.isBlack);
        });
    });
    describe('createWhitePlayer', () => {
        const name = 'John';
        beforeEach(() => {
            player = createWhitePlayer({ name });
        });
        it('set name', () => {
            equal(player.name, name);
        });
        it('set isBlack = true', () => {
            notOk(player.isBlack);
        });
    });
});
//# sourceMappingURL=Player.test.js.map