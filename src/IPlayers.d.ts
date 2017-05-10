import { IPlayer, IPlayerArgs } from './IPlayer';

export interface IPlayers {
    white: IPlayer;
    black: IPlayer;
}

export interface IPlayersArgs {
    white: IPlayerArgs;
    black: IPlayerArgs;
}
