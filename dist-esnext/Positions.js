import R from 'ramda';
function contains(positions, position) {
    return positions.some(p => p.x === position.x && p.y === position.y);
}
const notContains = R.compose(R.not, contains);
export { contains, notContains };
//# sourceMappingURL=Positions.js.map