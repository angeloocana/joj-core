"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Return reverse move: from = to, to = from
 */
function getBackMove(move) {
    return {
        from: move.to,
        to: move.from
    };
}
exports.getBackMove = getBackMove;
//# sourceMappingURL=Move.js.map
//# sourceMappingURL=Move.js.map