import { curry } from 'ramda';
import * as I from './typings';

function createPlayer(isBlack: boolean, args: I.IPlayerArgs): I.IPlayer {
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
    createPlayers
};
