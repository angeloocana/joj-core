import * as assert from 'ptz-assert';
import R from 'ramda';
import { Position } from './index';
import * as I from './typings';

describe('Position', () => {
    describe('hasSameXY', () => {
        it('true', () => {
            const position1 = { x: 2, y: 3 };
            const position2 = { x: 2, y: 3 };
            assert.equal(Position.hasSameXY(position1, position2), true);
        });

        it('false', () => {
            const position1 = { x: 3, y: 2 };
            const position2 = { x: 2, y: 3 };
            assert.equal(Position.hasSameXY(position1, position2), false);
        });
    });

    describe('hasBlackPiece', () => {
        it('return true for black piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: true };
            assert.ok(Position.hasBlackPiece(position));
        });

        it('return false for white piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: false };
            assert.notOk(Position.hasBlackPiece(position));
        });

        describe('return false for no piece', () => {
            it('null', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: null };
                assert.notOk(Position.hasBlackPiece(position));
            });
            it('undefined', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(Position.hasBlackPiece(position));
            });
            it('no prop', () => {
                const position: I.IPosition = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(Position.hasBlackPiece(position));
            });
        });
    });

    describe('hasNoPiece', () => {
        it('return false for black piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: true };
            assert.notOk(Position.hasNoPiece(position));
        });

        it('return false for white piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: false };
            assert.notOk(Position.hasNoPiece(position));
        });

        describe('return true for no piece', () => {
            it('null', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: null };
                assert.ok(Position.hasNoPiece(position));
            });
            it('undefined', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: undefined };
                assert.ok(Position.hasNoPiece(position));
            });
            it('no prop', () => {
                const position: I.IPosition = { x: 2, y: 3 };
                delete position.isBlack;
                assert.ok(Position.hasNoPiece(position));
            });
        });
    });

    describe('hasWhitePiece', () => {
        it('return false for black piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: true };
            assert.notOk(Position.hasWhitePiece(position));
        });

        it('return true for white piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: false };
            assert.ok(Position.hasWhitePiece(position));
        });

        describe('return false for no piece', () => {
            it('null', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: null };
                assert.notOk(Position.hasWhitePiece(position));
            });
            it('undefined', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(Position.hasWhitePiece(position));
            });
            it('no prop', () => {
                const position: I.IPosition = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(Position.hasWhitePiece(position));
            });
        });
    });

    describe('hasPiece', () => {
        it('return true for black piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: true };
            assert.ok(Position.hasPiece(position));
        });

        it('return true for white piece', () => {
            const position: I.IPosition = { x: 2, y: 3, isBlack: false };
            assert.ok(Position.hasPiece(position));
        });

        describe('return false for no piece', () => {
            it('null', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: null };
                assert.notOk(Position.hasPiece(position));
            });
            it('undefined', () => {
                const position: I.IPosition = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(Position.hasPiece(position));
            });
            it('no prop', () => {
                const position: I.IPosition = { x: 2, y: 3 };
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
        const getToSearchOrder8x8 = Position.getToSearchOrder({ x: 8, y: 8 });
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

    describe('getY0Start', () => {
        describe('4x4 Board', () => {
            describe('for white', () => {
                it('return 7 for 0', () => assert.equal(Position.getY0Start(4, 0, false), 3));
                it('return 6 for 1', () => assert.equal(Position.getY0Start(4, 1, false), 2));
                it('return 5 for 2', () => assert.equal(Position.getY0Start(4, 2, false), 1));
                it('return 4 for 3', () => assert.equal(Position.getY0Start(4, 3, false), 0));
            });
            describe('for black', () => {
                it('return 0 for 0', () => assert.equal(Position.getY0Start(4, 0, true), 0));
                it('return 1 for 1', () => assert.equal(Position.getY0Start(4, 1, true), 1));
                it('return 2 for 2', () => assert.equal(Position.getY0Start(4, 2, true), 2));
                it('return 3 for 3', () => assert.equal(Position.getY0Start(4, 3, true), 3));
            });
        });
        describe('8x8 Board', () => {
            describe('for white', () => {
                it('return 7 for 0', () => assert.equal(Position.getY0Start(8, 0, false), 7));
                it('return 6 for 1', () => assert.equal(Position.getY0Start(8, 1, false), 6));
                it('return 5 for 2', () => assert.equal(Position.getY0Start(8, 2, false), 5));
                it('return 4 for 3', () => assert.equal(Position.getY0Start(8, 3, false), 4));
                it('return 3 for 4', () => assert.equal(Position.getY0Start(8, 4, false), 3));
                it('return 2 for 5', () => assert.equal(Position.getY0Start(8, 5, false), 2));
                it('return 1 for 6', () => assert.equal(Position.getY0Start(8, 6, false), 1));
                it('return 0 for 7', () => assert.equal(Position.getY0Start(8, 7, false), 0));
            });
            describe('for black', () => {
                it('return 0 for 0', () => assert.equal(Position.getY0Start(8, 0, true), 0));
                it('return 1 for 1', () => assert.equal(Position.getY0Start(8, 1, true), 1));
                it('return 2 for 2', () => assert.equal(Position.getY0Start(8, 2, true), 2));
                it('return 3 for 3', () => assert.equal(Position.getY0Start(8, 3, true), 3));
                it('return 4 for 4', () => assert.equal(Position.getY0Start(8, 4, true), 4));
                it('return 5 for 5', () => assert.equal(Position.getY0Start(8, 5, true), 5));
                it('return 6 for 6', () => assert.equal(Position.getY0Start(8, 6, true), 6));
                it('return 7 for 7', () => assert.equal(Position.getY0Start(8, 7, true), 7));
            });
        });
    });

    describe('getY0End', () => {
        describe('4x4 Board', () => {
            const getY0End4x4 = Position.getY0End(4);

            describe('for white', () => {
                it('return 0 for 0', () => assert.equal(getY0End4x4(0, false), 0));
                it('return 1 for 1', () => assert.equal(getY0End4x4(1, false), 1));
                it('return 2 for 2', () => assert.equal(getY0End4x4(2, false), 2));
                it('return 3 for 3', () => assert.equal(getY0End4x4(3, false), 3));
            });
            describe('for black', () => {
                it('return 7 for 0', () => assert.equal(getY0End4x4(0, true), 3));
                it('return 6 for 1', () => assert.equal(getY0End4x4(1, true), 2));
                it('return 5 for 2', () => assert.equal(getY0End4x4(2, true), 1));
                it('return 4 for 3', () => assert.equal(getY0End4x4(3, true), 0));
            });
        });

        describe('8x8 Board', () => {
            const getY0End8x8 = Position.getY0End(8);

            describe('for white', () => {
                it('return 0 for 0', () => assert.equal(getY0End8x8(0, false), 0));
                it('return 1 for 1', () => assert.equal(getY0End8x8(1, false), 1));
                it('return 2 for 2', () => assert.equal(getY0End8x8(2, false), 2));
                it('return 3 for 3', () => assert.equal(getY0End8x8(3, false), 3));
                it('return 4 for 4', () => assert.equal(getY0End8x8(4, false), 4));
                it('return 5 for 5', () => assert.equal(getY0End8x8(5, false), 5));
                it('return 6 for 6', () => assert.equal(getY0End8x8(6, false), 6));
                it('return 7 for 7', () => assert.equal(getY0End8x8(7, false), 7));
            });
            describe('for black', () => {
                it('return 7 for 0', () => assert.equal(getY0End8x8(0, true), 7));
                it('return 6 for 1', () => assert.equal(getY0End8x8(1, true), 6));
                it('return 5 for 2', () => assert.equal(getY0End8x8(2, true), 5));
                it('return 4 for 3', () => assert.equal(getY0End8x8(3, true), 4));
                it('return 3 for 4', () => assert.equal(getY0End8x8(4, true), 3));
                it('return 2 for 5', () => assert.equal(getY0End8x8(5, true), 2));
                it('return 1 for 6', () => assert.equal(getY0End8x8(6, true), 1));
                it('return 0 for 7', () => assert.equal(getY0End8x8(7, true), 0));
            });
        });
    });

    describe('containsXY', () => {
        it('not contains', () => {
            const position = { x: 5, y: 2 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.notOk(Position.containsXY(positions, position));
        });

        it('contains', () => {
            const position = { x: 3, y: 0 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.ok(Position.containsXY(positions, position));
        });

        it('undefined not contains', () => {
            const position = { x: 5, y: 2 };
            const positions = undefined;

            assert.notOk(Position.containsXY(positions, position));
        });
    });

    describe('positionsNotContains', () => {
        it('not contains', () => {
            const position = { x: 5, y: 2 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.ok(Position.notContainsXY(positions, position));
        });

        it('contains', () => {
            const position = { x: 3, y: 0 };

            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];

            assert.notOk(Position.notContainsXY(positions, position));
        });
    });

    describe('setICanGoHere', () => {
        it('I can go here', () => {
            const positionsWhereCanIGo = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
            const oldPosition: I.IPosition = { x: 0, y: 0 };

            const newPosition = Position.setICanGoHere(positionsWhereCanIGo, oldPosition);

            assert.notOk(oldPosition.iCanGoHere);
            assert.ok(newPosition.iCanGoHere);
            assert.notEqual(oldPosition, newPosition);
        });
    });

    describe('getOrderedPositionsY0End', () => {
        describe('board=8x8', () => {
            const getOrderedPositionsY0End8x8 = R.curry(Position.getOrderedPositionsY0End(8));

            describe('white positions', () => {
                const getOrderedPositionsY0End8x8ForWhite = getOrderedPositionsY0End8x8(false);

                it('return all positions in orderedPositions[0]', () => {
                    const positions = [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 3, y: 0 },
                        { x: 4, y: 0 },
                        { x: 5, y: 0 },
                        { x: 6, y: 0 },
                        { x: 7, y: 0 }
                    ];

                    const orderedPositions = getOrderedPositionsY0End8x8ForWhite(positions);
                    assert.equal(orderedPositions[0].length, 8);
                });
            });

            describe('black positions', () => {
                const getOrderedPositionsY0End8x8ForBlack = getOrderedPositionsY0End8x8(true);

                it('return all positions in orderedPositions[0]', () => {
                    const positions = [
                        { x: 0, y: 7 },
                        { x: 1, y: 7 },
                        { x: 2, y: 7 },
                        { x: 3, y: 7 },
                        { x: 4, y: 7 },
                        { x: 5, y: 7 },
                        { x: 6, y: 7 },
                        { x: 7, y: 7 }
                    ];

                    const orderedPositions = getOrderedPositionsY0End8x8ForBlack(positions);
                    assert.equal(orderedPositions[0].length, 8);
                });

                it('return all positions in orderedPositions[7]', () => {
                    const positions = [
                        { x: 0, y: 7 },
                        { x: 1, y: 7 },
                        { x: 2, y: 7 },
                        { x: 3, y: 7 },
                        { x: 4, y: 7 },
                        { x: 5, y: 7 },
                        { x: 6, y: 7 },
                        { x: 7, y: 7 }
                    ];

                    const orderedPositions = getOrderedPositionsY0End8x8ForBlack(positions);
                    assert.equal(orderedPositions[0].length, 8);
                });
            });
        });
    });
});
