'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPiece = exports.removePiece = exports.hasWhitePiece = exports.hasNoPiece = exports.hasPiece = exports.hasBlackPiece = exports.isSamePositionAs = undefined;

var _ramda = require('ramda');

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
var hasBlackPiece = (0, _ramda.propEq)('isBlack', true);
var hasWhitePiece = (0, _ramda.propEq)('isBlack', false);
var hasPiece = (0, _ramda.anyPass)([hasBlackPiece, hasWhitePiece]);
var hasNoPiece = (0, _ramda.compose)(_ramda.not, hasPiece);
function isSamePositionAs(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
exports.isSamePositionAs = isSamePositionAs;
exports.hasBlackPiece = hasBlackPiece;
exports.hasPiece = hasPiece;
exports.hasNoPiece = hasNoPiece;
exports.hasWhitePiece = hasWhitePiece;
exports.removePiece = removePiece;
exports.setPiece = setPiece;
//# sourceMappingURL=Position.js.map
//# sourceMappingURL=Position.js.map