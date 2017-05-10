import * as assert from 'ptz-assert';
import { Player } from './index';
describe('Player', () => {
    let player;
    describe('createBlack', () => {
        const name = 'John';
        beforeEach(() => {
            player = Player.createBlack({ name });
        });
        it('set name', () => {
            assert.equal(player.name, name);
        });
        it('set isBlack = true', () => {
            assert.ok(player.isBlack);
        });
    });
    describe('createWhite', () => {
        const name = 'John';
        beforeEach(() => {
            player = Player.createWhite({ name });
        });
        it('set name', () => {
            assert.equal(player.name, name);
        });
        it('set isBlack = true', () => {
            assert.notOk(player.isBlack);
        });
    });
});
//# sourceMappingURL=Player.test.js.map