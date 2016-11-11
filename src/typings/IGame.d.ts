interface IGame extends ICleanGame {

    players: IPlayers;
    white: IGameColor;
    black: IGameColor;
    board: IGameBoard;

    isWhiteTurn(): boolean;
    
    getCleanGameToSaveOnServer(): ICleanGame;

    setWhereCanIGo(startPosition): void;
    verifyWinner(): void;
    canMove(startPosition: IGamePosition,
        nextPosition: IGamePosition): boolean;
    move(startPosition: IGamePosition,
        nextPosition: IGamePosition, backMove?: boolean): void;
    backMove(): void;

    getColorTurn(): IGameColor;
    getPlayerTurn(): IPlayer;

    getNewCopy(): IGame;
}
