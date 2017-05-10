import R from 'ramda';

import { IPosition } from './IPosition';

function contains(positions: IPosition[], position: IPosition): boolean {
    return positions.some(p => p.x === position.x && p.y === position.y);
}

const notContains = R.compose(R.not, contains);

export {
    contains,
    notContains
};
