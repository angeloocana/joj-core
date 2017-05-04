import { gamePieceType } from './GamePieceType';

import { IBoardPosition, IBoardPositionArgs } from './typings/IBoardPosition';
import { IMove } from './typings/IMove';

export class BoardPosition implements IBoardPosition {
    x: number;
    y: number;

    piece?: string; // GamePieceType;

    lastMoviment?: IMove;

    lastPosition?: IBoardPosition;
    jumpingBlackPiece?: boolean;
    jumps?: number;

    iCanGoHere?: boolean;
    lastMove?: boolean;
    lastMoveJump?: boolean;

    isWhiteHome?: boolean;
    isBlackHome?: boolean;

    constructor(args: IBoardPositionArgs) {
        this.x = args.x;
        this.y = args.y;

        this.setPiece(args.isBlackPiece);

        // this.isWhiteHome = false;
        // this.isBlackHome = ;
    }

    setPiece(isBlack: boolean): void {
        if (isBlack === true)
            this.piece = gamePieceType.black;
        else if (isBlack === false)
            this.piece = gamePieceType.white;
        else
            this.removePiece();
    }

    removePiece(): void {
        this.piece = null;
    }

    isBlackPiece(): boolean {
        if (!this.piece)
            return null;

        return this.piece === gamePieceType.black;
    }

    isWhitePiece(): boolean {
        if (!this.piece)
            return null;

        return this.piece === gamePieceType.white;
    }

    isEmpty(): boolean {
        return this.piece ? false : true;
    }

    isSamePositionAs(comparePosition: IBoardPosition): boolean {
        return this.x === comparePosition.x && this.y === comparePosition.y;
    }

    move(nextPosition: IBoardPosition): void {
        nextPosition.setPiece(this.isBlackPiece());
        this.removePiece();
    }
}
