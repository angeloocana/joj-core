import { IBoardPosition } from './IBoardPosition';

export interface IMove {
    startPosition: IBoardPosition;
    nextPosition: IBoardPosition;
}
