import R from 'ramda';
import * as I from './typings';

const createPlayer = R.curry((isBlack: boolean, args: I.IPlayerArgs): I.IPlayer => {
    return {
        isAi: args.isAi,
        name: args.name,
        foto: args.foto,
        isBlack
    };
});

const createWhitePlayer = createPlayer(false);

const createBlackPlayer = createPlayer(true);

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
    createBlackPlayer,
    createWhitePlayer,
    createPlayers
};
