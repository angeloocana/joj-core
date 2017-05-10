import { curry } from 'ramda';
function create(isBlack, args) {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack
    };
}
const curriedCreate = curry(create);
const createWhite = curriedCreate(false);
const createBlack = curriedCreate(true);
function isComputer(player) {
    return player.ai ? true : false;
}
export { createBlack, createWhite, isComputer };
//# sourceMappingURL=Player.js.map