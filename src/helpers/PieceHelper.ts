import BoardHelper from "./BoardHelper";
import GamePieceType from "../GamePieceType";
import BoardPosition from "../BoardPosition";

let getStartPieces = function (boardOptions: IBoardOptions, startRow: number): IBoardPosition[] {
    let pieces: IBoardPosition[] = [];
    for (let x = 0; x < boardOptions.size.x; x++) {
        let piece: IBoardPosition = new BoardPosition({ x: x, y: startRow });
        pieces.push(piece);
    }
    return pieces;
};

let getOtherPieces = function (pieces: IBoardPosition[], remove: IBoardPosition)
    : IBoardPosition[] {
    return pieces.filter(piece =>
        piece && (piece.x !== remove.x || piece.y !== remove.y));
};

let getPiecesOrdered = function (pieces: IBoardPosition[], isBlack: boolean)
    : IBoardPosition[][] {
    let ordered: IBoardPosition[][] = [];

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
    getStartPieces
};

export default pieceHelper;