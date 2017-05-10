import { createBlackPlayer, createWhitePlayer } from './Player';

import { IPlayers, IPlayersArgs } from './IPlayers';

function createPlayers(args: IPlayersArgs): IPlayers {
    return {
        white: createWhitePlayer(args.white),
        black: createBlackPlayer(args.black)
    };
}

export {
    createPlayers
};
