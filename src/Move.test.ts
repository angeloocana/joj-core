import * as assert from 'ptz-assert';
import { Move } from './index';

describe('Move', () => {
    describe('getBackMove', () => {
        it('invert move {from:0,7 to:1,6} => {from:1,6 to:0,7}', () => {
            const move = {
                from: { x: 0, y: 7 },
                to: { x: 1, y: 6 }
            };

            const backMove = Move.getBackMove(move);
            assert.equal(backMove.from, move.to);
            assert.equal(backMove.to, move.from);
        });
    });
});
