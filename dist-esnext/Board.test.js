import * as assert from 'ptz-assert';
import { Board, Position } from './index';
import log from 'ptz-log';
import * as TestData from './__tests__/board.data.test';
function assertPosition(actualPosition, expectedPosition) {
    const samePositionAs = Position.hasSamePosition(actualPosition, expectedPosition);
    if (!samePositionAs)
        log('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);
    assert.ok(samePositionAs, 'samePositionAs');
    assert.equal(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}
function assertPositions(actual, expected) {
    assert.equal(actual.length, expected.length, 'different length of actual and expected positions');
    for (let i = 0; i < actual.length; i++) {
        assertPosition(actual[i], expected[i]);
    }
}
describe('Board', () => {
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
            const position = { x: 7, y: 7 };
            const onlyEmpty = false;
            const expected = [{ x: 6, y: 7, isBlack: false }];
            const actual = Board.getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=true should return all empty near positions', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position = { x: 7, y: 7 };
            const onlyEmpty = true;
            const expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            const actual = Board.getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=undefined should return all near positions', () => {
            const { board } = Board.getInitialBoard(Board.defaultBoardConf);
            const position = { x: 7, y: 7 };
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
        it('jumping up and right', () => {
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
        it('jumping down and right', () => {
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
    describe.skip('print', () => {
        it('printUnicode', function printUnicodeTest() {
            const actual = Board.printUnicodeBoard(TestData.defaultInitialBoard);
            assert.equal(actual, TestData.unicodeStartBoard);
        });
        it('printXAndY', function printUnicodeTest() {
            const actual = Board.printXAndYBoard(TestData.defaultInitialBoard);
            assert.equal(actual, TestData.unicodeStartBoard);
        });
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
    describe('getPositionsWhereCanIGo', () => {
        it('return null for invalid from', () => {
            const positions = Board.getPositionsWhereCanIGo(TestData.defaultInitialBoard, null, true);
            assert.notOk(positions);
        });
    });
});
//# sourceMappingURL=Board.test.js.map