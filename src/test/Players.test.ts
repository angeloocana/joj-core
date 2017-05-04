import { ok } from 'ptz-assert';
import {
    gamePieceType,
    IPlayers,
    Player,
    Players
} from '../index';

describe('Players', () => {

    let players: IPlayers;
    const white = new Player({ name: 'P White' });
    const black = new Player({ name: 'P Black' });

    beforeEach(() => {
        players = new Players({
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

    describe('Set Colors', () => {

        it('White', () => {
            ok(players.white.color === gamePieceType.white);
        });

        it('Black', () => {
            ok(players.black.color === gamePieceType.black);
        });
    });
});
