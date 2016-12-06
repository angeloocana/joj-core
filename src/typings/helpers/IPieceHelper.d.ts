interface IPieceHelper {
    getStartPieces(boardOptions: IBoardOptions, startRow: number, isBlack: boolean): IGamePiece[];

    getOtherPieces(pieces: IBoardPosition[], remove: IBoardPosition)
        : IBoardPosition[];

    getPiecesOrdered(pieces: IBoardPosition[], isBlack: boolean)
        : IBoardPosition[][];
}