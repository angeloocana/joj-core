import * as assert from 'ptz-assert';
import { Position } from './index';
describe('Position', () => {
    describe('hasSamePosition', () => {
        it('true', () => {
            const position1 = { x: 2, y: 3 };
            const position2 = { x: 2, y: 3 };
            assert.equal(Position.hasSamePosition(position1, position2), true);
        });
        it('false', () => {
            const position1 = { x: 3, y: 2 };
            const position2 = { x: 2, y: 3 };
            assert.equal(Position.hasSamePosition(position1, position2), false);
        });
    });
    describe('hasBlackPiece', () => {
        it('return true for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            assert.ok(Position.hasBlackPiece(position));
        });
        it('return false for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            assert.notOk(Position.hasBlackPiece(position));
        });
        describe('return false for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                assert.notOk(Position.hasBlackPiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(Position.hasBlackPiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(Position.hasBlackPiece(position));
            });
        });
    });
    describe('hasNoPiece', () => {
        it('return false for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            assert.notOk(Position.hasNoPiece(position));
        });
        it('return false for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            assert.notOk(Position.hasNoPiece(position));
        });
        describe('return true for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                assert.ok(Position.hasNoPiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                assert.ok(Position.hasNoPiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.ok(Position.hasNoPiece(position));
            });
        });
    });
    describe('hasWhitePiece', () => {
        it('return false for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            assert.notOk(Position.hasWhitePiece(position));
        });
        it('return true for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            assert.ok(Position.hasWhitePiece(position));
        });
        describe('return false for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                assert.notOk(Position.hasWhitePiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(Position.hasWhitePiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(Position.hasWhitePiece(position));
            });
        });
    });
    describe('hasPiece', () => {
        it('return true for black piece', () => {
            const position = { x: 2, y: 3, isBlack: true };
            assert.ok(Position.hasPiece(position));
        });
        it('return true for white piece', () => {
            const position = { x: 2, y: 3, isBlack: false };
            assert.ok(Position.hasPiece(position));
        });
        describe('return false for no piece', () => {
            it('null', () => {
                const position = { x: 2, y: 3, isBlack: null };
                assert.notOk(Position.hasPiece(position));
            });
            it('undefined', () => {
                const position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(Position.hasPiece(position));
            });
            it('no prop', () => {
                const position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(Position.hasPiece(position));
            });
        });
    });
});
//# sourceMappingURL=Position.test.js.map