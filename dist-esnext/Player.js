import { curry } from 'ramda';
function createPlayer(isBlack, args) {
    return {
        isAi: args.isAi,
        name: args.name,
        foto: args.foto,
        isBlack
    };
}
const createPlayerCurried = curry(createPlayer);
const createWhitePlayer = createPlayerCurried(false);
const createBlackPlayer = createPlayerCurried(true);
const initialPlayers = {
    white: {
        isBlack: false,
        name: 'White'
    },
    black: {
        isBlack: true,
        name: 'Black'
    }
};
function createPlayers(args) {
    return args ? {
        white: createWhitePlayer(args.white),
        black: createBlackPlayer(args.black)
    } : initialPlayers;
}
export { createPlayer, createPlayerCurried, createBlackPlayer, createWhitePlayer, createPlayers };
//# sourceMappingURL=Player.js.map