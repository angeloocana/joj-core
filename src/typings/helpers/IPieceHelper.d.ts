interface IPieceHelper {
    getStartPieces(boardOptions: IBoardOptions, startRow: number): IGamePiece[];

    isBlackPiece(position: IGamePosition)
        : boolean;

    getOtherPieces(pieces: IGamePiece[], remove: IGamePiece)
        : IGamePiece[];

    getPiecesOrdered(pieces: IGamePiece[], isBlack: boolean)
        : IGamePiece[][];
}