interface IGame extends ICleanGame {

    players: IPlayers;
    white: IGameColor;
    black: IGameColor;
    board: IGameBoard;

    isWhiteTurn(): boolean;
    isComputerTurn(): boolean;
    getCleanGameToSaveOnServer(): ICleanGame;

    setWhereCanIGo(startPosition): void;
    verifyWinner(): void;
    canMove(startPosition: IGamePosition,
        nextPosition: IGamePosition): boolean;
    move(startPosition: IGamePosition,
        nextPosition: IGamePosition, backMove?: boolean): void;
    backMove(): void;

    getComputerGameColor(): IGameColor;

    getNewCopy(): IGame;
}
