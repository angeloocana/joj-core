import * as assert from 'ptz-assert';
import {
    Board,
    IPosition,
    Position
} from './index';

import log from 'ptz-log';

import * as TestData from './__tests__/board.data.test';

function assertPosition(actualPosition: IPosition, expectedPosition: IPosition): void {
    const samePositionAs = Position.hasSamePosition(actualPosition, expectedPosition);

    if (!samePositionAs)
        log('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);

    assert.ok(samePositionAs, 'samePositionAs');
    assert.equal(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}

function assertPositions(actual: IPosition[], expected: IPosition[]): void {
    assert.equal(actual.length, expected.length, 'diferent length of actual and expected positions');

    for (let i = 0; i < actual.length; i++) {
        assertPosition(actual[i], expected[i]);
    }
}

describe('Board', () => {

    describe('isBackGroundBlack', () => {
        it('0,0 => true', () => {
            assert.ok(Board.isBackGroundBlack(0, 0));
        });

        it('0,1 => false', () => {
            assert.ok(!Board.isBackGroundBlack(0, 1));
        });
    });

    describe('getY0Start7End', () => {
        it('for white y2 should return 5', () => {
            const y = 2;
            const isBlack = false;

            assert.equal(Board.getY0Start7End(y, isBlack), 5);
        });

        it('for black y2 should return 2', () => {
            const y = 2;
            const isBlack = true;

            assert.equal(Board.getY0Start7End(y, isBlack), 2);
        });
    });

    describe('getY7Start0End', () => {
        it('for white y2 should return 2', () => {
            const y = 2;
            const isBlack = false;

            assert.equal(Board.getY7Start0End(y, isBlack), 2);
        });

        it('for black y2 should return 5', () => {
            const y = 2;
            const isBlack = true;

            assert.equal(Board.getY7Start0End(y, isBlack), 5);
        });
    });

    describe('getInitialBoard', () => {
        it('8x8', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            assert.deepEqual(board, TestData.initialBoardExpected);
        });

        it('memoize', () => {
            const board1 = Board.getInitialBoard(Board.defaultBoardConf);
            const board2 = Board.getInitialBoard(Board.defaultBoardConf);

            assert.equal(board1, board2);
        });
    });

    describe('hasPosition', () => {
        it('return false for null position', () => {
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, null));
        });

        it('return false for undefined position', () => {
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, undefined));
        });

        it('return false for negative x', () => {
            const position = { x: -1, y: 0 };
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return false for negative y', () => {
            const position = { x: 1, y: -1 };
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return false for negative x and y', () => {
            const position = { x: -1, y: -1 };
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return false for x > 7', () => {
            const position = { x: 8, y: 1 };
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return false for y > 7', () => {
            const position = { x: 7, y: 8 };
            assert.notOk(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return true for x: 0, y: 0', () => {
            const position = { x: 0, y: 0 };
            assert.ok(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return true for x: 1, y: 1', () => {
            const position = { x: 0, y: 0 };
            assert.ok(Board.hasPosition(TestData.defaultInitialBoard, position));
        });

        it('return true for x: 7, y: 7', () => {
            const position = { x: 7, y: 7 };
            assert.ok(Board.hasPosition(TestData.defaultInitialBoard, position));
        });
    });

    describe('getPosition', () => {
        it('valid position', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position = { x: 2, y: 3 };
            const actual = Board.getPosition(board, position);
            const expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });

        it('invalid position', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position = { x: -2, y: -3 };
            assert.throws(() => Board.getPosition(board, position));
        });
    });

    describe('setPosition', () => {
        it('valid position', () => {
            let { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position = { x: 2, y: 3 };
            board = Board.setPosition(board, position);
            assert.equal(board[position.x][position.y], position);
        });

        it('invalid position', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position = { x: -2, y: -3 };
            assert.throws(() => Board.setPosition(board, position));
        });
    });

    describe('getNearPositions', () => {
        it('onlyEmpty=false should return only filled near positions', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position: IPosition = { x: 7, y: 7 };

            const onlyEmpty = false;
            const expected = [{ x: 6, y: 7, isBlack: false }];
            const actual = Board.getNearPositions(board, position, onlyEmpty);

            assertPositions(actual, expected);
        });

        it('onlyEmpty=true should return all empty near positions', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position: IPosition = { x: 7, y: 7 };

            const onlyEmpty = true;
            const expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];

            const actual = Board.getNearPositions(board, position, onlyEmpty);
            log('actual', actual);
            assertPositions(actual, expected);
        });

        it('onlyEmpty=undefined should return all near positions', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position: IPosition = { x: 7, y: 7 };

            const onlyEmpty = undefined;
            const expected = [
                { x: 6, y: 6 },
                { x: 7, y: 6 },
                { x: 6, y: 7, isBlack: false }
            ];
            const actual = Board.getNearPositions(board, position, onlyEmpty);

            assertPositions(actual, expected);
        });
    });

    describe('getJumpPosition', () => {
        it('jumping up and rigth', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 0, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 2, y: 2 };

            const actual = Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });

        it('jumping up and left', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 2, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 0, y: 2 };

            const actual = Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });

        it('jumping up', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 0, y: 0 };

            const toJumpPosition = { x: 1, y: 1 };

            const expected = { x: 2, y: 2 };

            const actual = Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });

        it('jumping down and rigth', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 0, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 2, y: 5 };

            const actual = Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });

        it('jumping down and left', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 2, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 0, y: 5 };

            const actual = Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });

        it('jumping down', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 1, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 1, y: 5 };

            const actual = Board.getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });

        it('should return undefined because position is not empty', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const from = { x: 3, y: 0 };
            const toJumpPosition = { x: 4, y: 0 };

            assert.notOk(Board.getJumpPosition(board, from, toJumpPosition));
        });
    });

    it('printUnicode', function printUnicodeTest() {
        const { board } = Board.getInitialBoard(Board.defaultBoardConf);
        const actual = Board.printUnicode(board);
        assert.equal(actual, TestData.unicodeStartBoard);
    });

    describe('getColorStartEndRow', () => {
        it('return {startRow: 0, endRow } for black', () => {
            const actual = Board.getColorStartEndRow(Board.defaultBoardConf.endRow, true);
            assert.equal(actual.startRow, 0);
            assert.equal(actual.endRow, 7);
        });
        it('return {startRow: endRow, endRow: 0} for white', () => {
            const actual = Board.getColorStartEndRow(Board.defaultBoardConf.endRow, false);
            assert.equal(actual.startRow, 7);
            assert.equal(actual.endRow, 0);
        });
    });

    describe('getToSearchOrder', () => {
        it('return 0 for 0', () => assert.equal(Board.getToSearchOrder(0), 0));
        it('return 1 for 7', () => assert.equal(Board.getToSearchOrder(7), 1));
        it('return 2 for 1', () => assert.equal(Board.getToSearchOrder(1), 2));
        it('return 3 for 6', () => assert.equal(Board.getToSearchOrder(6), 3));
        it('return 4 for 2', () => assert.equal(Board.getToSearchOrder(2), 4));
        it('return 5 for 5', () => assert.equal(Board.getToSearchOrder(5), 5));
        it('return 6 for 3', () => assert.equal(Board.getToSearchOrder(3), 6));
        it('return 7 for 4', () => assert.equal(Board.getToSearchOrder(4), 7));
        it('return null for invalid x', () => assert.notOk(Board.getToSearchOrder(-1)));
    });

    describe('getY0Start7End', () => {
        describe('for white', () => {
            it('return 7 for 0', () => assert.equal(Board.getY0Start7End(0, false), 7));
            it('return 6 for 1', () => assert.equal(Board.getY0Start7End(1, false), 6));
            it('return 5 for 2', () => assert.equal(Board.getY0Start7End(2, false), 5));
            it('return 4 for 3', () => assert.equal(Board.getY0Start7End(3, false), 4));
            it('return 3 for 4', () => assert.equal(Board.getY0Start7End(4, false), 3));
            it('return 2 for 5', () => assert.equal(Board.getY0Start7End(5, false), 2));
            it('return 1 for 6', () => assert.equal(Board.getY0Start7End(6, false), 1));
            it('return 0 for 7', () => assert.equal(Board.getY0Start7End(7, false), 0));
            it('return null for invalid x', () => assert.notOk(Board.getY0Start7End(-1, false)));
        });
        describe('for black', () => {
            it('return 0 for 0', () => assert.equal(Board.getY0Start7End(0, true), 0));
            it('return 1 for 1', () => assert.equal(Board.getY0Start7End(1, true), 1));
            it('return 2 for 2', () => assert.equal(Board.getY0Start7End(2, true), 2));
            it('return 3 for 3', () => assert.equal(Board.getY0Start7End(3, true), 3));
            it('return 4 for 4', () => assert.equal(Board.getY0Start7End(4, true), 4));
            it('return 5 for 5', () => assert.equal(Board.getY0Start7End(5, true), 5));
            it('return 6 for 6', () => assert.equal(Board.getY0Start7End(6, true), 6));
            it('return 7 for 7', () => assert.equal(Board.getY0Start7End(7, true), 7));
        });
    });

    describe('getY7Start0End', () => {
        describe('for white', () => {
            it('return 0 for 0', () => assert.equal(Board.getY7Start0End(0, false), 0));
            it('return 1 for 1', () => assert.equal(Board.getY7Start0End(1, false), 1));
            it('return 2 for 2', () => assert.equal(Board.getY7Start0End(2, false), 2));
            it('return 3 for 3', () => assert.equal(Board.getY7Start0End(3, false), 3));
            it('return 4 for 4', () => assert.equal(Board.getY7Start0End(4, false), 4));
            it('return 5 for 5', () => assert.equal(Board.getY7Start0End(5, false), 5));
            it('return 6 for 6', () => assert.equal(Board.getY7Start0End(6, false), 6));
            it('return 7 for 7', () => assert.equal(Board.getY7Start0End(7, false), 7));
        });
        describe('for black', () => {
            it('return 7 for 0', () => assert.equal(Board.getY7Start0End(0, true), 7));
            it('return 6 for 1', () => assert.equal(Board.getY7Start0End(1, true), 6));
            it('return 5 for 2', () => assert.equal(Board.getY7Start0End(2, true), 5));
            it('return 4 for 3', () => assert.equal(Board.getY7Start0End(3, true), 4));
            it('return 3 for 4', () => assert.equal(Board.getY7Start0End(4, true), 3));
            it('return 2 for 5', () => assert.equal(Board.getY7Start0End(5, true), 2));
            it('return 1 for 6', () => assert.equal(Board.getY7Start0End(6, true), 1));
            it('return 0 for 7', () => assert.equal(Board.getY7Start0End(7, true), 0));
            it('return null for invalid x', () => assert.notOk(Board.getY7Start0End(-1, true)));
        });
    });

    describe('getPositionsWhereCanIGo', () => {
        it('return null for invalid from', () => {
            const positions = Board.getPositionsWhereCanIGo(TestData.defaultInitialBoard, null, true);
            assert.notOk(positions);
        });
    });
});
