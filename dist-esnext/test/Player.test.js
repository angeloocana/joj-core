import { ok } from 'ptz-assert';
import { Player } from '../index';
describe('Player', () => {
    let player;
    describe('new', () => {
        const name = 'John';
        beforeEach(() => {
            player = new Player({ name });
        });
        it('Setting name', () => {
            ok(name === player.name);
        });
    });
});
//# sourceMappingURL=Player.test.js.map