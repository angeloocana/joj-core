import R from 'ramda';
const createPlayer = R.curry((isBlack, args) => {
    return {
        isAi: args.isAi,
        name: args.name,
        foto: args.foto,
        isBlack
    };
});
const createWhitePlayer = createPlayer(false);
const createBlackPlayer = createPlayer(true);
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
export { createPlayer, createBlackPlayer, createWhitePlayer, createPlayers };
//# sourceMappingURL=Player.js.map