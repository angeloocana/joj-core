import { ok } from 'ptz-assert';
import {
    IPlayer,
    Player
} from '../index';

describe('Player', () => {

    let player: IPlayer;

    describe('new', () => {
        const name = 'John';
        beforeEach(() => {
            player = new Player({ name });
        });

        it('Setting name', () => {
            ok(name === player.name);
        });
    });
});
