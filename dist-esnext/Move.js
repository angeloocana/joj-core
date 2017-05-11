/**
 * Return reverse move: from = to, to = from
 */
function getBackMove(move) {
    return {
        from: move.to,
        to: move.from
    };
}
export { getBackMove };
//# sourceMappingURL=Move.js.map