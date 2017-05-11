import * as assert from 'ptz-assert';
import R from 'ramda';
import { Piece, Pieces } from './index';
describe('Pieces', () => {
    describe('removePiece', () => {
        it('remove', () => {
            const pieceToRemove = { position: { x: 0, y: 2, isBlack: false } };
            const pieces = Pieces.createWhitePieces([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
            const newPieces = Pieces.removePiece(pieces, pieceToRemove);
            assert.notContains(newPieces, pieces[0]);
        });
        it('do not remove', () => {
            const pieceToRemove = { position: { x: 0, y: 0, isBlack: false } };
            const pieces = Pieces.createWhitePieces([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
            const newPieces = Pieces.removePiece(pieces, pieceToRemove);
            assert.deepEqual(newPieces, pieces);
        });
    });
    describe('getOrderedPieces', () => {
        describe('board=8x8', () => {
            const getOrderedPieces8x8 = R.curry(Pieces.getOrderedPiecesCurried(8));
            describe('white pieces', () => {
                const getOrderedPieces8x8ForWhite = getOrderedPieces8x8(false);
                it('return all pieces in orderedPieces[0]', () => {
                    const pieces = [
                        { x: 0, y: 7 },
                        { x: 1, y: 7 },
                        { x: 2, y: 7 },
                        { x: 3, y: 7 },
                        { x: 4, y: 7 },
                        { x: 5, y: 7 },
                        { x: 6, y: 7 },
                        { x: 7, y: 7 }
                    ].map(p => Piece.createPiece(p));
                    const orderedPieces = getOrderedPieces8x8ForWhite(pieces);
                    assert.equal(orderedPieces[0].length, 8);
                });
            });
            describe('black pieces', () => {
                const getOrderedPieces8x8ForBlack = getOrderedPieces8x8(true);
                it('return all pieces in orderedPieces[0]', () => {
                    const pieces = [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 3, y: 0 },
                        { x: 4, y: 0 },
                        { x: 5, y: 0 },
                        { x: 6, y: 0 },
                        { x: 7, y: 0 }
                    ].map(p => Piece.createPiece(p));
                    const orderedPieces = getOrderedPieces8x8ForBlack(pieces);
                    assert.equal(orderedPieces[0].length, 8);
                });
                it('return all pieces in orderedPieces[7]', () => {
                    const pieces = [
                        { x: 0, y: 7 },
                        { x: 1, y: 7 },
                        { x: 2, y: 7 },
                        { x: 3, y: 7 },
                        { x: 4, y: 7 },
                        { x: 5, y: 7 },
                        { x: 6, y: 7 },
                        { x: 7, y: 7 }
                    ].map(p => Piece.createPiece(p));
                    const orderedPieces = getOrderedPieces8x8ForBlack(pieces);
                    assert.equal(orderedPieces[7].length, 8);
                });
            });
        });
    });
    describe('haveSamePieceAndPosition', () => {
        it('return true for same piece and same position', () => {
            const a = [{ position: { x: 0, y: 0, isBlack: true } }];
            const b = [{ position: { x: 0, y: 0, isBlack: true } }];
            assert.ok(Pieces.haveSamePieceAndPosition(a, b));
        });
        it('return false for diferente piece and same position', () => {
            const a = [{ position: { x: 0, y: 0, isBlack: true } }];
            const b = [{ position: { x: 0, y: 0, isBlack: false } }];
            assert.notOk(Pieces.haveSamePieceAndPosition(a, b));
        });
        it('return false for same piece and diferent position', () => {
            const a = [{ position: { x: 0, y: 0, isBlack: true } }];
            const b = [{ position: { x: 0, y: 1, isBlack: true } }];
            assert.notOk(Pieces.haveSamePieceAndPosition(a, b));
        });
        it('return false for diferente piece and diferent position', () => {
            const a = [{ position: { x: 0, y: 0, isBlack: true } }];
            const b = [{ position: { x: 0, y: 1, isBlack: false } }];
            assert.notOk(Pieces.haveSamePieceAndPosition(a, b));
        });
    });
});
//# sourceMappingURL=Pieces.test.js.map