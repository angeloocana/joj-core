interface IPlayers {
    white: IPlayer;
    black: IPlayer;
    vsComputer: boolean;
    computerIsWhite: boolean;
}

interface IPlayersArgs{
    white?: IPlayer;
    black?: IPlayer;
    vsComputer?: boolean;
    computerIsWhite?: boolean;
}