import { curry } from 'ramda';
import * as I from './typings';

function createPlayer(isBlack: boolean, args: I.IPlayerArgs): I.IPlayer {
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

function isComputer(player: I.IPlayer): boolean {
    return player.ai ? true : false;
}

const initialPlayers: I.IPlayers = {
    white: {
        isBlack: false,
        name: 'White'
    },
    black: {
        isBlack: true,
        name: 'Black'
    }
};

function createPlayers(args: I.IPlayersArgs): I.IPlayers {
    return args ? {
        white: createWhitePlayer(args.white),
        black: createBlackPlayer(args.black)
    } : initialPlayers;
}

export {
    createPlayer,
    createPlayerCurried,
    createBlackPlayer,
    createWhitePlayer,
    createPlayers,
    isComputer
};
