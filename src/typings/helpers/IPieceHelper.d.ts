interface IPieceHelper {
    getStartPieces(boardOptions: IBoardOptions, startRow: number): IBoardPosition[];

    getOtherPieces(pieces: IBoardPosition[], remove: IBoardPosition)
        : IBoardPosition[];

    getPiecesOrdered(pieces: IBoardPosition[], isBlack: boolean)
        : IBoardPosition[][];
}