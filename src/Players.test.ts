import * as assert from 'ptz-assert';
import {
    IPlayerArgs,
    IPlayers,
    Players
} from './index';

describe('Players', () => {

    let players: IPlayers;
    const white: IPlayerArgs = { name: 'P White' };
    const black: IPlayerArgs = { name: 'P Black' };

    beforeEach(() => {
        players = Players.create({
            black,
            white
        });
    });

    describe('New setting players', () => {

        it('Set white player name', () => {
            assert.ok(players.white.name === white.name);
        });

        it('Set black player name', () => {
            assert.ok(players.black.name === black.name);
        });

        it('Set white player ai', () => {
            assert.ok(players.white.ai === white.ai);
        });

        it('Set black player ai', () => {
            assert.ok(players.black.ai === black.ai);
        });
    });
});
