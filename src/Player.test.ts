import * as assert from 'ptz-assert';
import { Player } from './index';
import * as I from './typings';

describe('Player', () => {

    let player: I.IPlayer;

    describe('createBlackPlayer', () => {
        const name = 'John';
        beforeEach(() => {
            player = Player.createBlackPlayer({ name });
        });

        it('set name', () => {
            assert.equal(player.name, name);
        });

        it('set isBlack = true', () => {
            assert.ok(player.isBlack);
        });
    });

    describe('createWhitePlayer', () => {
        const name = 'John';
        beforeEach(() => {
            player = Player.createWhitePlayer({ name });
        });

        it('set name', () => {
            assert.equal(player.name, name);
        });

        it('set isBlack = true', () => {
            assert.notOk(player.isBlack);
        });
    });

    describe('Players', () => {

        let players: I.IPlayers;
        const white: I.IPlayerArgs = { name: 'P White' };
        const black: I.IPlayerArgs = { name: 'P Black' };

        beforeEach(() => {
            players = Player.createPlayers({
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
});
