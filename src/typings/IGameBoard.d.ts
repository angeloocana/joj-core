interface IGameBoard {
    board: IGamePosition[][];
    boardOptions: IBoardOptions;

    fillPiecesOnBoard(pieces: IGamePosition[], piece: string /*GamePieceType*/)
        : void;
    generateBoard(whitePieces: IGamePiece[], blackPieces: IGamePiece[])
        : IGamePosition[][];
    boardHasThisPosition(position: IGamePosition): boolean;
    getPosition(position: IGamePosition): IGamePosition;
    isPositionEmpty(position: IGamePosition): boolean;
    getNearPositions(position, onlyEmpty): IGamePosition[];
    getJumpPosition(startPosition: IGamePosition, toJumpPosition: IGamePosition)
        : IGamePosition

    whereCanIJump(jumpStartPosition: IGamePosition, positions,
        orderedPositions: IGamePosition[][], isBlack: boolean): void;

    getPositionsWhereCanIGo(startPosition: IGamePosition,
        isBlack: boolean): IPositionsWhereCanIGo;
    setWhereCanIGo(startPosition: IGamePosition, blackPiece: boolean): void;
    cleanBoardWhereCanIGo(): void;
    move(startPosition: IGamePosition, nextPosition: IGamePosition,
        backMove: boolean, whiteTurn): void
}
