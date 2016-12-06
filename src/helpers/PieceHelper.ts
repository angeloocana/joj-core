import BoardHelper from "./BoardHelper";
import GamePieceType from "../GamePieceType";
//import BoardPosition from "../BoardPosition";BoardPosition
import GamePiece from "../GamePiece";

function getStartPieces(boardOptions: IBoardOptions, startRow: number, isBlack: boolean): IGamePiece[] {
    var pieces: IGamePiece[] = [];
    for (let x = 0; x < boardOptions.size.x; x++) {
        let piece: IGamePiece = new GamePiece(x, startRow, isBlack);
        pieces.push(piece);
    }
    return pieces;
};

function getOtherPieces(pieces: IBoardPosition[], remove: IBoardPosition)
    : IBoardPosition[] {
    return pieces.filter(piece =>
        piece && (piece.x !== remove.x || piece.y !== remove.y));
};

function getPiecesOrdered(pieces: IBoardPosition[], isBlack: boolean)
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

var pieceHelper: IPieceHelper = {
    getOtherPieces,
    getPiecesOrdered,
    getStartPieces
};

export default pieceHelper;