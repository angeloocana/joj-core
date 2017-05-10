import { curry } from 'ramda';
function createPlayer(isBlack, args) {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack
    };
}
const curriedCreatePlayer = curry(createPlayer);
const createWhitePlayer = curriedCreatePlayer(false);
const createBlackPlayer = curriedCreatePlayer(true);
function isComputer(player) {
    return player.ai ? true : false;
}
export { createBlackPlayer, createWhitePlayer, isComputer };
//# sourceMappingURL=Player.js.map