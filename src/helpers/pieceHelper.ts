import BoardHelper from "./boardHelper";
import {GamePieceType} from "../enums/gamePieceType"; 

export default class PieceHelper {

    static getStartPieces(boardOptions: IBoardOptions, startRow: number): IGamePiece[] {
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

    static isBlackPiece(position: IGamePosition)
        : boolean {

        if (!position)
            return null;

        return position.piece === GamePieceType.Black.toString();
    }

    static getOtherPieces(pieces: IGamePiece[], remove: IGamePiece)
        : IGamePiece[] {
        return pieces.filter(piece =>
            piece && (piece.x !== remove.x || piece.y !== remove.y));
    }

    static getPiecesOrdered(pieces: IGamePiece[], isBlack: boolean)
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
    }
}
