import * as assert from 'ptz-assert';
import { Player } from './index';
import * as I from './typings';

describe('Player', () => {
    describe('createBlackPlayer', () => {
        const name = 'John';
        const player = Player.createBlackPlayer({ name });

        assert.equal(player.name, name, 'set name');
        assert.ok(player.isBlack, 'set isBlack = true');
    });

    describe('createWhitePlayer', () => {
        const name = 'John';
        const player = Player.createWhitePlayer({ name });

        assert.equal(player.name, name, 'set name');
        assert.notOk(player.isBlack, 'set isBlack = false');
    });

    describe('Players', () => {
        describe('New setting players', () => {
            const white: I.IPlayerArgs = { name: 'P White' };
            const black: I.IPlayerArgs = { name: 'P Black', isAi: true };

            const players = Player.createPlayers({
                black,
                white
            });

            assert.ok(players.white.name === white.name, 'Set white player name');
            assert.ok(players.black.name === black.name, 'Set black player name');
            assert.ok(players.white.isAi === white.isAi, 'Set white player ai');
            assert.ok(players.black.isAi === black.isAi, 'Set black player ai');
        });
    });
});
