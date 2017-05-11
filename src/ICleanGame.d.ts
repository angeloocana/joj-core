import { IMove } from './IMove';

/**
 * Clean Game To Save on Server
 */
export interface ICleanGame {
    ended: boolean;
    movements: IMove[];

    /**
     *  - true black won.
     *  - false white won.
     *  - undefined black and white are still playing.
     */
    blackWon?: boolean;
}
