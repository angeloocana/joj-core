interface IGameBoard {
    board: IBoardPosition[][];
    boardOptions: IBoardOptions;

    /**
     * 
     * @piece GamePieceType
     */
    fillPiecesOnBoard(pieces: IBoardPosition[], piece: string)
        : void;

    generateBoard();
    fillAllPiecesOnBoard(whitePieces: IGamePiece[], blackPieces: IGamePiece[]);
    boardHasThisPosition(position: IBoardPosition): boolean;
    getPosition(position: IBoardPosition): IBoardPosition;
    isPositionEmpty(position: IBoardPosition): boolean;
    getNearPositions(position, onlyEmpty): IBoardPosition[];
    getJumpPosition(startPosition: IBoardPosition, toJumpPosition: IBoardPosition)
        : IBoardPosition;

    whereCanIJump(jumpStartPosition: IBoardPosition, positions,
        orderedPositions: IBoardPosition[][], isBlack: boolean): void;

    getPositionsWhereCanIGo(startPosition: IBoardPosition,
        isBlack: boolean): IPositionsWhereCanIGo;
    setWhereCanIGo(startPosition: IBoardPosition, blackPiece: boolean): void;
    cleanBoardWhereCanIGo(): void;
    move(startPosition: IBoardPosition, nextPosition: IBoardPosition,
        backMove?: boolean, whiteTurn?: boolean): void;
    printUnicode(): string;
    logMove:boolean;
}

interface IGameBoardArgs {
    boardOptions?: IBoardOptions;
    whitePieces?: IGamePiece[];
    blackPieces?: IGamePiece[];
    logMove?:boolean;
}