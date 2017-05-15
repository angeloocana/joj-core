import * as assert from 'ptz-assert';
import { Board, Position } from './index';
import log from 'ptz-log';
import * as TestData from './__testdata__/board.data.test';
function assertPosition(actualPosition, expectedPosition) {
    const samePositionAs = Position.hasSameXY(actualPosition, expectedPosition);
    if (!samePositionAs)
        log('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);
    assert.ok(samePositionAs, 'samePositionAs');
    assert.equal(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}
describe('Board', () => {
    describe('getInitialBoard', () => {
        it('8x8', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            assert.deepEqual(board, TestData.initialBoardExpected);
        });
        it('memoize', () => {
            // $FIX
            // const board1 = Board.getInitialBoard(Board.getBoardConf Board.defaultBoardSize);
            // const board2 = Board.getInitialBoard(Board.defaultBoardSize);
            // assert.equal(board1, board2);
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
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const position = { x: 2, y: 3 };
            const actual = Board.getPosition(board, position);
            const expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });
        it('invalid position', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const position = { x: -2, y: -3 };
            assert.throws(() => Board.getPosition(board, position));
        });
    });
    describe('setPosition', () => {
        it('valid position', () => {
            const oldBoard = Board.getInitialBoard(Board.defaultBoardSize);
            const xy = { x: 2, y: 3 };
            const newBoard = Board.setPosition(oldBoard, xy);
            assert.equal(Board.getPosition(newBoard, xy), xy, 'different position');
            assert.notEqual(newBoard, oldBoard, 'same instance');
            assert.notEqual(Board.getPosition(newBoard, xy), Board.getPosition(oldBoard, xy), 'same instance');
        });
    });
    describe('_getNearPositions', () => {
        it('caches nearPositions', () => {
            // Repeat params to get different instances.
            const firstCall = Board._getNearPositions({ x: 8, y: 8 }, { x: 0, y: 0 });
            const secondCall = Board._getNearPositions({ x: 8, y: 8 }, { x: 0, y: 0 });
            assert.equal(firstCall, secondCall, 'Not same instance');
        });
    });
    describe('getNotEmptyNearPositions', () => {
        it('return only filled near positions', () => {
            const position = { x: 7, y: 7 };
            const expected = [{ x: 6, y: 7, isBlack: false }];
            const actual = Board.getNotEmptyNearPositions(TestData.defaultInitialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getEmptyNearPositions', () => {
        it('return all empty near positions', () => {
            const position = { x: 7, y: 7 };
            const expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            const actual = Board.getEmptyNearPositions(TestData.defaultInitialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getNearPositions', () => {
        it('return all near positions', () => {
            const position = { x: 7, y: 7 };
            const expected = [
                { x: 6, y: 6 },
                { x: 7, y: 6 },
                { x: 6, y: 7, isBlack: false }
            ];
            const actual = Board.getNearPositions(TestData.defaultInitialBoard, position);
            assert.deepEqual(actual, expected);
        });
    });
    describe('getJumpPosition', () => {
        it('jumping up and right', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 0, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 2, y: 2 };
            const actual = Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping up and left', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 2, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 0, y: 2 };
            const actual = Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping up', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 0, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 2, y: 2 };
            const actual = Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping down and right', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 0, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 2, y: 5 };
            const actual = Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping down and left', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 2, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 0, y: 5 };
            const actual = Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('jumping down', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 1, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 1, y: 5 };
            const actual = Board.getJumpPosition(from, toJumpPosition, board);
            assertPosition(actual, expected);
        });
        it('return undefined if position is NOT empty', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 3, y: 0 };
            const toJumpPosition = { x: 4, y: 0 };
            assert.notOk(Board.getJumpPosition(from, toJumpPosition, board));
        });
        it('return undefined if position do NOT exists', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const from = { x: 0, y: 1 };
            const toJumpPosition = { x: 0, y: 0 };
            assert.notOk(Board.getJumpPosition(from, toJumpPosition, board));
        });
    });
    describe('print', () => {
        it('printUnicode', function printUnicodeTest() {
            const actual = Board.printUnicodeBoard(TestData.defaultInitialBoard);
            assert.equal(actual, TestData.unicodeStartBoard);
        });
        it('printXAndY', function printUnicodeTest() {
            const actual = Board.printXAndYBoard(TestData.defaultInitialBoard);
            assert.equal(actual, TestData.xAndYStartBoard);
        });
    });
    describe('getStartEndRow', () => {
        it('return {startRow: 0, endRow } for black', () => {
            const actual = Board.getStartEndRow(7, true);
            assert.equal(actual.startRow, 0);
            assert.equal(actual.endRow, 7);
        });
        it('return {startRow: endRow, endRow: 0} for white', () => {
            const actual = Board.getStartEndRow(7, false);
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
    describe('getCleanBoard', () => {
        it('8x8', () => {
            const board = Board.getCleanBoard({ x: 8, y: 8 });
            const board2 = Board.getCleanBoard({ x: 8, y: 8 });
            console.log(Board.printXAndYBoard(TestData.cleanBoardExpected));
            console.log(Board.printXAndYBoard(board));
            assert.deepEqual(board, TestData.cleanBoardExpected);
            assert.equal(board, board2, 'Cache did not worked');
        });
    });
    describe('whereCanIJump', () => {
        it('jump up 5,7 5,5 5,3 5,1'
        // , () => {
        // const board = [
        // ];
        // const from = ;
        // const position = [];
        // const isBlack = true;
        // }
        );
    });
    describe('getStartPieces', () => {
        it('8x8', () => {
            const pieces = Board.getStartPieces({ x: 8, y: 8 });
            console.log('pieces \n', pieces);
            console.log('expected \n', TestData.startPiecesExpected);
            assert.deepEqual(pieces, TestData.startPiecesExpected);
        });
    });
});
//# sourceMappingURL=Board.test.js.map