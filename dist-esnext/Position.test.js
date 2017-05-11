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
    describe('isBackGroundBlack', () => {
        it('0,0 => true', () => {
            assert.ok(Position.isBackGroundBlack(0, 0));
        });
        it('0,1 => false', () => {
            assert.ok(!Position.isBackGroundBlack(0, 1));
        });
    });
    describe('getToSearchOrder', () => {
        const getToSearchOrder8x8 = Position.getToSearchOrderCurried({ x: 8, y: 8 });
        it('return 0 for 0', () => assert.equal(getToSearchOrder8x8(0), 0));
        it('return 1 for 7', () => assert.equal(getToSearchOrder8x8(7), 1));
        it('return 2 for 1', () => assert.equal(getToSearchOrder8x8(1), 2));
        it('return 3 for 6', () => assert.equal(getToSearchOrder8x8(6), 3));
        it('return 4 for 2', () => assert.equal(getToSearchOrder8x8(2), 4));
        it('return 5 for 5', () => assert.equal(getToSearchOrder8x8(5), 5));
        it('return 6 for 3', () => assert.equal(getToSearchOrder8x8(3), 6));
        it('return 7 for 4', () => assert.equal(getToSearchOrder8x8(4), 7));
        it('return null for invalid x', () => assert.notOk(getToSearchOrder8x8(-1)));
    });
    describe('getYAsBlack', () => {
        describe('4x4 Board', () => {
            describe('for white', () => {
                it('return 7 for 0', () => assert.equal(Position.getYAsBlack(4, 0, false), 3));
                it('return 6 for 1', () => assert.equal(Position.getYAsBlack(4, 1, false), 2));
                it('return 5 for 2', () => assert.equal(Position.getYAsBlack(4, 2, false), 1));
                it('return 4 for 3', () => assert.equal(Position.getYAsBlack(4, 3, false), 0));
            });
            describe('for black', () => {
                it('return 0 for 0', () => assert.equal(Position.getYAsBlack(4, 0, true), 0));
                it('return 1 for 1', () => assert.equal(Position.getYAsBlack(4, 1, true), 1));
                it('return 2 for 2', () => assert.equal(Position.getYAsBlack(4, 2, true), 2));
                it('return 3 for 3', () => assert.equal(Position.getYAsBlack(4, 3, true), 3));
            });
        });
        describe('8x8 Board', () => {
            describe('for white', () => {
                it('return 7 for 0', () => assert.equal(Position.getYAsBlack(8, 0, false), 7));
                it('return 6 for 1', () => assert.equal(Position.getYAsBlack(8, 1, false), 6));
                it('return 5 for 2', () => assert.equal(Position.getYAsBlack(8, 2, false), 5));
                it('return 4 for 3', () => assert.equal(Position.getYAsBlack(8, 3, false), 4));
                it('return 3 for 4', () => assert.equal(Position.getYAsBlack(8, 4, false), 3));
                it('return 2 for 5', () => assert.equal(Position.getYAsBlack(8, 5, false), 2));
                it('return 1 for 6', () => assert.equal(Position.getYAsBlack(8, 6, false), 1));
                it('return 0 for 7', () => assert.equal(Position.getYAsBlack(8, 7, false), 0));
            });
            describe('for black', () => {
                it('return 0 for 0', () => assert.equal(Position.getYAsBlack(8, 0, true), 0));
                it('return 1 for 1', () => assert.equal(Position.getYAsBlack(8, 1, true), 1));
                it('return 2 for 2', () => assert.equal(Position.getYAsBlack(8, 2, true), 2));
                it('return 3 for 3', () => assert.equal(Position.getYAsBlack(8, 3, true), 3));
                it('return 4 for 4', () => assert.equal(Position.getYAsBlack(8, 4, true), 4));
                it('return 5 for 5', () => assert.equal(Position.getYAsBlack(8, 5, true), 5));
                it('return 6 for 6', () => assert.equal(Position.getYAsBlack(8, 6, true), 6));
                it('return 7 for 7', () => assert.equal(Position.getYAsBlack(8, 7, true), 7));
            });
        });
    });
    describe('getYAsWhite', () => {
        describe('4x4 Board', () => {
            const getYAsWhite4x4 = Position.getYAsWhiteCurried(4);
            describe('for white', () => {
                it('return 0 for 0', () => assert.equal(getYAsWhite4x4(0, false), 0));
                it('return 1 for 1', () => assert.equal(getYAsWhite4x4(1, false), 1));
                it('return 2 for 2', () => assert.equal(getYAsWhite4x4(2, false), 2));
                it('return 3 for 3', () => assert.equal(getYAsWhite4x4(3, false), 3));
            });
            describe('for black', () => {
                it('return 7 for 0', () => assert.equal(getYAsWhite4x4(0, true), 3));
                it('return 6 for 1', () => assert.equal(getYAsWhite4x4(1, true), 2));
                it('return 5 for 2', () => assert.equal(getYAsWhite4x4(2, true), 1));
                it('return 4 for 3', () => assert.equal(getYAsWhite4x4(3, true), 0));
            });
        });
        describe('8x8 Board', () => {
            const getYAsWhite8x8 = Position.getYAsWhiteCurried(8);
            describe('for white', () => {
                it('return 0 for 0', () => assert.equal(getYAsWhite8x8(0, false), 0));
                it('return 1 for 1', () => assert.equal(getYAsWhite8x8(1, false), 1));
                it('return 2 for 2', () => assert.equal(getYAsWhite8x8(2, false), 2));
                it('return 3 for 3', () => assert.equal(getYAsWhite8x8(3, false), 3));
                it('return 4 for 4', () => assert.equal(getYAsWhite8x8(4, false), 4));
                it('return 5 for 5', () => assert.equal(getYAsWhite8x8(5, false), 5));
                it('return 6 for 6', () => assert.equal(getYAsWhite8x8(6, false), 6));
                it('return 7 for 7', () => assert.equal(getYAsWhite8x8(7, false), 7));
            });
            describe('for black', () => {
                it('return 7 for 0', () => assert.equal(getYAsWhite8x8(0, true), 7));
                it('return 6 for 1', () => assert.equal(getYAsWhite8x8(1, true), 6));
                it('return 5 for 2', () => assert.equal(getYAsWhite8x8(2, true), 5));
                it('return 4 for 3', () => assert.equal(getYAsWhite8x8(3, true), 4));
                it('return 3 for 4', () => assert.equal(getYAsWhite8x8(4, true), 3));
                it('return 2 for 5', () => assert.equal(getYAsWhite8x8(5, true), 2));
                it('return 1 for 6', () => assert.equal(getYAsWhite8x8(6, true), 1));
                it('return 0 for 7', () => assert.equal(getYAsWhite8x8(7, true), 0));
            });
        });
    });
});
//# sourceMappingURL=Position.test.js.map