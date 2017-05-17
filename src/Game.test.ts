import * as assert from 'ptz-assert';
import * as TestData from './__testdata__/index.data.test';
import { Game, Move } from './index';

describe('Game', () => {
    describe('create', () => {
        it('creates a new game');
    });

    describe('needToValidateMovements', () => {
        it('when null should validate');
        it('when undefined should validate');
        it('when true should validate');
        it('when false should NOT validate');
    });

    describe('isMyTurn', () => {
        it('returns true for black piece and black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const moveFrom = { x: 5, y: 0 };

            const game = Move.getGameAfterMove(TestData.initialGame, firstMove);

            assert.ok(Game.isMyTurn(game, moveFrom));
        });

        it('returns true for white piece and white turn', () => {
            const from = { x: 5, y: 7 };
            assert.ok(Game.isMyTurn(TestData.initialGame, from));
        });

        it('returns false for white piece and black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(TestData.initialGame, firstMove);
            const from = { x: 7, y: 7 };
            assert.notOk(Game.isMyTurn(game, from));
        });

        it('returns false for black piece and white turn', () => {
            const from = { x: 5, y: 0 };
            assert.notOk(Game.isMyTurn(TestData.initialGame, from));
        });

        it('returns false for ended game', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(TestData.initialGame, firstMove);
            const from = { x: 5, y: 0 };

            // $Fix
            // I dont know if it is the best way
            // Are getGameAfterMove supposed to calculate if game is ended???
            game.score.ended = true;

            assert.notOk(Game.isMyTurn(game, from));
        });
    });

    describe('getPlayerTurn', () => {
        it('return white player when white turn', () => {
            assert.equal(Game.getPlayerTurn(TestData.initialGame), TestData.initialGame.players.white);
        });

        it('return black player when black turn', () => {
            const firstMove = { from: { x: 5, y: 7 }, to: { x: 5, y: 6 } };
            const game = Move.getGameAfterMove(TestData.initialGame, firstMove);
            assert.equal(Game.getPlayerTurn(game), game.players.black);
        });
    });

    describe('getTurnPieces', () => {
        it('return white pieces', () => {
            const game = Game.createGame();
            const pieces = Game.getTurnPieces(game);
            const expectedPieces = TestData.startWhitePiecesExpected;

            assert.deepEqual(pieces, expectedPieces);
        });

        it('return black pieces', () => {
            const game = Move.getGameAfterMove(Game.createGame(), { from: { x: 0, y: 7 }, to: { x: 0, y: 6 } });
            const pieces = Game.getTurnPieces(game);
            const expectedPieces = TestData.startBlackPiecesExpected;

            assert.deepEqual(pieces, expectedPieces);
        });
    });

    describe('getTurnPiecesWhereCanIGo', () => {
        it('return white pieces', () => {
            const game = Game.createGame();
            const pieces = Game.getTurnPiecesWhereCanIGo(game);
            const expectedPieces = TestData.startWhitePiecesWhereCanIGoExpected;
            assert.deepEqual(pieces, expectedPieces);
        });
        it('return black pieces', () => {
            const game = Move.getGameAfterMove(Game.createGame(), { from: { x: 0, y: 7 }, to: { x: 0, y: 6 } });
            const pieces = Game.getTurnPiecesWhereCanIGo(game);
            const expectedPieces = TestData.startBlackPiecesWhereCanIGoExpected;
            assert.deepEqual(pieces, expectedPieces);
        });
    });
});
