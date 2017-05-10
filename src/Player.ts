import { curry } from 'ramda';
import { IPlayer, IPlayerArgs } from './IPlayer';

function createPlayer(isBlack: boolean, args: IPlayerArgs): IPlayer {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack
    };
}

const curriedCreatePlayer = curry(createPlayer);

const createWhitePlayer = curriedCreatePlayer(false);

const createBlackPlayer = curriedCreatePlayer(true);

function isComputer(player: IPlayer): boolean {
    return player.ai ? true : false;
}

export {
    createBlackPlayer,
    createWhitePlayer,
    isComputer
};
