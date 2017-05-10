import * as assert from 'ptz-assert';
import { Pieces } from './index';
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
    describe('getPiecesOrdered', () => {
        it('');
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