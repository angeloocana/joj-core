import { equal, notOk, ok } from 'ptz-assert';
import { hasBlackPiece, hasNoPiece, hasPiece, hasWhitePiece, isSamePositionAs } from './index';
describe('Position', () => {
    describe('isSamePositionAs', () => {
        it('true', () => {
            const position1 = { x: 2, y: 3 };
            const position2 = { x: 2, y: 3 };
            equal(isSamePositionAs(position1, position2), true);
        });
        it('false', () => {
            const position1 = { x: 3, y: 2 };
            const position2 = { x: 2, y: 3 };
            equal(isSamePositionAs(position1, position2), false);
        });
    });
    describe('hasBlackPiece', () => {
        it('return true for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            ok(hasBlackPiece(position));
        });
        it('return false for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            notOk(hasBlackPiece(position));
        });
        describe('return false for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                notOk(hasBlackPiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                notOk(hasBlackPiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                notOk(hasBlackPiece(position));
            });
        });
    });
    describe('hasNoPiece', () => {
        it('return false for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            notOk(hasNoPiece(position));
        });
        it('return false for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            notOk(hasNoPiece(position));
        });
        describe('return true for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                ok(hasNoPiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                ok(hasNoPiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                ok(hasNoPiece(position));
            });
        });
    });
    describe('hasWhitePiece', () => {
        it('return false for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            notOk(hasWhitePiece(position));
        });
        it('return true for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            ok(hasWhitePiece(position));
        });
        describe('return false for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                notOk(hasWhitePiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                notOk(hasWhitePiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                notOk(hasWhitePiece(position));
            });
        });
    });
    describe('hasPiece', () => {
        it('return true for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            ok(hasPiece(position));
        });
        it('return true for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            ok(hasPiece(position));
        });
        describe('return false for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                notOk(hasPiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                notOk(hasPiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                notOk(hasPiece(position));
            });
        });
    });
});
//# sourceMappingURL=Position.test.js.map