'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasSamePieceAndPosition = exports.hasSamePosition = exports.create = undefined;

var _Position = require('./Position');

var Position = _interopRequireWildcard(_Position);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function create(x, y, isBlack) {
    return {
        position: { x: x, y: y, isBlack: isBlack }
        // Other props:
        // whereCanIGo?: IPositionsWhereCanIGo;
        // movimentsToWin?: number[];
    };
}
function hasSamePosition(a, b) {
    return Position.hasSamePosition(a.position, b.position);
}
function hasSamePieceAndPosition(a, b) {
    return Position.hasSamePieceAndPosition(a.position, b.position);
}
exports.create = create;
exports.hasSamePosition = hasSamePosition;
exports.hasSamePieceAndPosition = hasSamePieceAndPosition;
//# sourceMappingURL=Piece.js.map
//# sourceMappingURL=Piece.js.map