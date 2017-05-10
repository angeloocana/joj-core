'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasSamePieceAndPosition = exports.hasSamePosition = exports.createPiece = undefined;

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createPiece(position) {
    return {
        position: position
        // Other props:
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}
// function create(isBlack: boolean, x: number, y: number): IPiece {
//     return createPiece({
//         position: { x, y, isBlack }
//     });
// }
// const createCurried = R.curry(create);
// const createBlackPiece = createCurried(true);
// const createWhitePiece = createCurried(true);
function hasSamePosition(a, b) {
    return Position.hasSamePosition(a.position, b.position);
}
function hasSamePieceAndPosition(a, b) {
    return Position.hasSamePieceAndPosition(a.position, b.position);
}
exports.createPiece = createPiece;
exports.hasSamePosition = hasSamePosition;
exports.hasSamePieceAndPosition = hasSamePieceAndPosition;
//# sourceMappingURL=Piece.js.map
//# sourceMappingURL=Piece.js.map