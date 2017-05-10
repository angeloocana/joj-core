import * as Player from './Player';

import { IPlayers, IPlayersArgs } from './IPlayers';

function create(args: IPlayersArgs): IPlayers {
    return {
        white: Player.createWhite(args.white),
        black: Player.createBlack(args.black)
    };
}

export {
    create
};
