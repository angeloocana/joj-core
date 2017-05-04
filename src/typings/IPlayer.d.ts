import { IAi } from './IAi';

export interface IPlayer {
    name: string;
    color: string;
    foto?: string;
    ai?: IAi;
    isComputer: () => boolean;
}

export interface IPlayerArgs {
    name: string;
    foto?: string;
    ai?: IAi;
}
