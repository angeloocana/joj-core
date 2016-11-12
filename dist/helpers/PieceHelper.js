import BoardHelper from "./BoardHelper";
import GamePieceType from "../GamePieceType";
export default class PieceHelper {
    static getStartPieces(boardOptions, startRow) {
        let pieces = [];
        for (let x = 0; x < boardOptions.size.x; x++) {
            let piece = {
                x: x,
                y: startRow
            };
            pieces.push(piece);
        }
        return pieces;
    }
    static isBlackPiece(position) {
        if (!position || !position.piece)
            return null;
        return position.piece === GamePieceType.black;
    }
    static getOtherPieces(pieces, remove) {
        return pieces.filter(piece => piece && (piece.x !== remove.x || piece.y !== remove.y));
    }
    static getPiecesOrdered(pieces, isBlack) {
        let ordered = [];
        pieces.forEach(piece => {
            let y = BoardHelper.getY0Start7End(piece.y, isBlack);
            if (!ordered[y])
                ordered[y] = [piece];
            else
                ordered[y].push(piece);
        });
        return ordered;
    }
}
//# sourceMappingURL=PieceHelper.js.map