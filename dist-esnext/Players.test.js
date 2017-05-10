import * as assert from 'ptz-assert';
import { Players } from './index';
describe('Players', () => {
    let players;
    const white = { name: 'P White' };
    const black = { name: 'P Black' };
    beforeEach(() => {
        players = Players.create({
            black,
            white
        });
    });
    describe('New setting players', () => {
        it('Set white player name', () => {
            assert.ok(players.white.name === white.name);
        });
        it('Set black player name', () => {
            assert.ok(players.black.name === black.name);
        });
        it('Set white player ai', () => {
            assert.ok(players.white.ai === white.ai);
        });
        it('Set black player ai', () => {
            assert.ok(players.black.ai === black.ai);
        });
    });
});
//# sourceMappingURL=Players.test.js.map