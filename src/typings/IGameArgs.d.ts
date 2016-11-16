interface IGameArgs{
    players?: IPlayers;
    movements?: IMove[];
    needToValidateMovements?: boolean;
    boardArgs?:IGameBoardArgs;
}