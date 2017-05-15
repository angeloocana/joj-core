import { curry } from 'ramda';
function createPlayer(isBlack, args) {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack
    };
}
const createPlayerCurried = curry(createPlayer);
const createWhitePlayer = createPlayerCurried(false);
const createBlackPlayer = createPlayerCurried(true);
function isComputer(player) {
    return player.ai ? true : false;
}
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
export { createPlayer, createPlayerCurried, createBlackPlayer, createWhitePlayer, createPlayers, isComputer };
//# sourceMappingURL=Player.js.map