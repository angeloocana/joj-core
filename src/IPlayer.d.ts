import { IAi } from './IAi';

export interface IPlayer {
    name: string;
    isBlack: boolean;
    foto?: string;
    ai?: IAi;
}

export interface IPlayerArgs {
    name: string;
    foto?: string;
    ai?: IAi;
}