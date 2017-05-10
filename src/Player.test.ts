import { equal, notOk, ok } from 'ptz-assert';
import {
    createBlackPlayer,
    createWhitePlayer,
    IPlayer
} from './index';

describe('Player', () => {

    let player: IPlayer;

    describe('createBlackPlayer', () => {
        const name = 'John';
        beforeEach(() => {
            player = createBlackPlayer({ name });
        });

        it('set name', () => {
            equal(player.name, name);
        });

        it('set isBlack = true', () => {
            ok(player.isBlack);
        });
    });

    describe('createWhitePlayer', () => {
        const name = 'John';
        beforeEach(() => {
            player = createWhitePlayer({ name });
        });

        it('set name', () => {
            equal(player.name, name);
        });

        it('set isBlack = true', () => {
            notOk(player.isBlack);
        });
    });
});
