import * as Player from './Player';
function create(args) {
    return {
        white: Player.createWhite(args.white),
        black: Player.createBlack(args.black)
    };
}
export { create };
//# sourceMappingURL=Players.js.map