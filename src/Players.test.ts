import { ok } from 'ptz-assert';
import {
    createPlayers,
    IPlayerArgs,
    IPlayers
} from './index';

describe('Players', () => {

    let players: IPlayers;
    const white: IPlayerArgs = { name: 'P White' };
    const black: IPlayerArgs = { name: 'P Black' };

    beforeEach(() => {
        players = createPlayers({
            black,
            white
        });
    });

    describe('New setting players', () => {

        it('Set white player name', () => {
            ok(players.white.name === white.name);
        });

        it('Set black player name', () => {
            ok(players.black.name === black.name);
        });

        it('Set white player ai', () => {
            ok(players.white.ai === white.ai);
        });

        it('Set black player ai', () => {
            ok(players.black.ai === black.ai);
        });
    });
});
