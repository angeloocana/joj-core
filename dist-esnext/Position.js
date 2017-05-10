import { anyPass, compose, not, propEq } from 'ramda';
// export class Position implements IPosition {
//     x: number;
//     y: number;
//     piece?: string; // PieceType;
//     lastMoviment?: IMove;
//     lastPosition?: IPosition;
//     jumpingBlackPiece?: boolean;
//     jumps?: number;
//     iCanGoHere?: boolean;
//     lastMove?: boolean;
//     lastMoveJump?: boolean;
//     isWhiteHome?: boolean;
//     isBlackHome?: boolean;
//     constructor(args: IPositionArgs) {
//         this.x = args.x;
//         this.y = args.y;
//         this.setPiece(args.isBlackPiece);
//         // this.isWhiteHome = false;
//         // this.isBlackHome = ;
//     }
// }
function setPiece(position, isBlack) {
    position.isBlack = isBlack;
    return position;
}
function removePiece(position) {
    delete position.isBlack;
    return position;
}
const hasBlackPiece = propEq('isBlack', true);
const hasWhitePiece = propEq('isBlack', false);
const hasPiece = anyPass([hasBlackPiece, hasWhitePiece]);
const hasNoPiece = compose(not, hasPiece);
function isSamePositionAs(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
export { isSamePositionAs, hasBlackPiece, hasPiece, hasNoPiece, hasWhitePiece, removePiece, setPiece };
//# sourceMappingURL=Position.js.map