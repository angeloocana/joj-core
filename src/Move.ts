import { IMove } from './IMove';

/**
 * Return reverse move: from = to, to = from
 */
function getBackMove(move: IMove): IMove {
    return {
        from: move.to,
        to: move.from
    };
}

export {
    getBackMove
};
