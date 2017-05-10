import * as assert from 'ptz-assert';
import { Positions } from './index';

describe('Positions', () => {

    describe('positionsContains', () => {
        it('not contains', () => {
            const position = { x: 5, y: 2 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.notOk(Positions.contains(positions, position));
        });

        it('contains', () => {
            const position = { x: 3, y: 0 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.ok(Positions.contains(positions, position));
        });
    });

    describe('positionsNotContains', () => {
        it('not contains', () => {
            const position = { x: 5, y: 2 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.ok(Positions.notContains(positions, position));
        });

        it('contains', () => {
            const position = { x: 3, y: 0 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.notOk(Positions.notContains(positions, position));
        });
    });
});
