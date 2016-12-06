interface IPieceHelper {
    getStartPieces(boardOptions: IBoardOptions, startRow: number, isBlack: boolean): IGamePiece[];

    getOtherPieces(pieces: IGamePiece[], remove: IGamePiece): IGamePiece[];

    getPiecesOrdered(pieces: IGamePiece[], isBlack: boolean): IGamePiece[][];
}