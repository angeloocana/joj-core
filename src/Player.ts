import { curry } from 'ramda';
import { IPlayer, IPlayerArgs } from './IPlayer';

function create(isBlack: boolean, args: IPlayerArgs): IPlayer {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack
    };
}

const curriedCreate = curry(create);

const createWhite = curriedCreate(false);

const createBlack = curriedCreate(true);

function isComputer(player: IPlayer): boolean {
    return player.ai ? true : false;
}

export {
    createBlack,
    createWhite,
    isComputer
};
