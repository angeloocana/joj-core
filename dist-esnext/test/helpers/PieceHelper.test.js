import { deepEqual } from 'ptz-assert';
import { pieceHelper } from '../../index';
describe('PieceHelper', () => {
    it('getStartPieces should return pieces in start positions', () => {
        const boardOptions = { size: { x: 3, y: 3 } };
        const row = 0;
        const pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        deepEqual(pieceHelper.getStartPieces(boardOptions, row, true), pieces);
    });
});
//# sourceMappingURL=PieceHelper.test.js.map