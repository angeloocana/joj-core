import { createBlackPlayer, createWhitePlayer } from './Player';
function createPlayers(args) {
    return {
        white: createWhitePlayer(args.white),
        black: createBlackPlayer(args.black)
    };
}
export { createPlayers };
//# sourceMappingURL=Players.js.map