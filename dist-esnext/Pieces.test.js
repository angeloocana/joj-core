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
        it('');
    });
});
//# sourceMappingURL=Pieces.test.js.map