import { IMove } from './IMove';

/**
 * Clean Game To Save on Server
 */
export interface ICleanGame {
    ended: boolean;
    movements: IMove[];
}
