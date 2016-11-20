import BoardHelper from "./BoardHelper";
import GamePieceType from "../GamePieceType";

let getStartPieces = function (boardOptions: IBoardOptions, startRow: number): IGamePiece[] {
    let pieces = [];
    for (let x = 0; x < boardOptions.size.x; x++) {
        let piece = {
            x: x,
            y: startRow
        };
        pieces.push(piece);
    }
    return pieces;
};

let isBlackPiece = function (position: IGamePosition)
    : boolean {

    if (!position || !position.piece)
        return null;

    return position.piece === GamePieceType.black;
};

let getOtherPieces = function (pieces: IGamePiece[], remove: IGamePiece)
    : IGamePiece[] {
    return pieces.filter(piece =>
        piece && (piece.x !== remove.x || piece.y !== remove.y));
};

let getPiecesOrdered = function (pieces: IGamePiece[], isBlack: boolean)
    : IGamePiece[][] {
    let ordered: IGamePiece[][] = [];

    pieces.forEach(piece => {
        let y = BoardHelper.getY0Start7End(piece.y, isBlack);
        if (!ordered[y])
            ordered[y] = [piece];
        else
            ordered[y].push(piece);
    });

    return ordered;
};

let pieceHelper: IPieceHelper = {
    getOtherPieces,
    getPiecesOrdered,
    getStartPieces,
    isBlackPiece
};

export default pieceHelper;