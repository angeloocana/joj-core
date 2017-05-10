import { ok } from 'ptz-assert';
import { createPlayers } from './index';
describe('Players', () => {
    let players;
    const white = { name: 'P White' };
    const black = { name: 'P Black' };
    beforeEach(() => {
        players = createPlayers({
            black,
            white
        });
    });
    describe('New setting players', () => {
        it('Set white player name', () => {
            ok(players.white.name === white.name);
        });
        it('Set black player name', () => {
            ok(players.black.name === black.name);
        });
        it('Set white player ai', () => {
            ok(players.white.ai === white.ai);
        });
        it('Set black player ai', () => {
            ok(players.black.ai === black.ai);
        });
    });
});
//# sourceMappingURL=Players.test.js.map