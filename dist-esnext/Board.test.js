import { deepEqual, equal, notOk, ok } from 'ptz-assert';
import { boardHasThisPosition, defaultBoardConf, getColorStartEndRow, getInitialBoard, getJumpPosition, getNearPositions, getPosition, getY0Start7End, getY7Start0End, isBackGroundBlack, isSamePositionAs, positionsContains, positionsNotContains, printUnicode } from './index';
import log from 'ptz-log';
import { initialBoard, unicodeStartBoard } from './testData/board.data.test';
function assertPosition(actualPosition, expectedPosition) {
    const samePositionAs = isSamePositionAs(actualPosition, expectedPosition);
    if (!samePositionAs)
        log('actualPosition: ', actualPosition, ' \n expectedPosition: ', expectedPosition);
    ok(samePositionAs, 'samePositionAs');
    equal(actualPosition.isBlack, expectedPosition.isBlack, 'Is same piece');
}
function assertPositions(actual, expected) {
    equal(actual.length, expected.length, 'diferent length of actual and expected positions');
    for (let i = 0; i < actual.length; i++) {
        assertPosition(actual[i], expected[i]);
    }
}
describe('Board', () => {
    it('generateBoard'
    // , () => {
    //     let board = new Board();
    //     board.generateBoard();
    //     deepEqual(board.board, initialBoard);
    // }
    );
    describe('isBackGroundBlack', () => {
        it('0,0 => true', () => {
            ok(isBackGroundBlack(0, 0));
        });
        it('0,1 => false', () => {
            ok(!isBackGroundBlack(0, 1));
        });
    });
    describe('positionsContains', () => {
        it('not contains', () => {
            const position = { x: 5, y: 2 };
            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            notOk(positionsContains(positions, position));
        });
        it('contains', () => {
            const position = { x: 3, y: 0 };
            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            ok(positionsContains(positions, position));
        });
    });
    describe('positionsNotContains', () => {
        it('not contains', () => {
            const position = { x: 5, y: 2 };
            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            ok(positionsNotContains(positions, position));
        });
        it('contains', () => {
            const position = { x: 3, y: 0 };
            const positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            notOk(positionsNotContains(positions, position));
        });
    });
    describe('getY0Start7End', () => {
        it('for white y2 should return 5', () => {
            const y = 2;
            const isBlack = false;
            equal(getY0Start7End(y, isBlack), 5);
        });
        it('for black y2 should return 2', () => {
            const y = 2;
            const isBlack = true;
            equal(getY0Start7End(y, isBlack), 2);
        });
    });
    describe('getY7Start0End', () => {
        it('for white y2 should return 2', () => {
            const y = 2;
            const isBlack = false;
            equal(getY7Start0End(y, isBlack), 2);
        });
        it('for black y2 should return 5', () => {
            const y = 2;
            const isBlack = true;
            equal(getY7Start0End(y, isBlack), 5);
        });
    });
    describe('getInitialBoard', () => {
        it('8x8', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            log('board', board);
            log('initialBoard', initialBoard);
            deepEqual(board, initialBoard);
        });
        it('memoize', () => {
            const board1 = getInitialBoard(defaultBoardConf);
            const board2 = getInitialBoard(defaultBoardConf);
            equal(board1, board2);
        });
    });
    describe('boardHasThisPosition', () => {
        const { board } = getInitialBoard(defaultBoardConf);
        it('x1 y1 should return true', () => {
            const position = { x: 1, y: 1 };
            ok(boardHasThisPosition(board, position));
        });
        it('x-1 y0 should return false', () => {
            const position = { x: -1, y: 0 };
            notOk(boardHasThisPosition(board, position));
        });
        it('x0 y-1 should return false', () => {
            const position = { x: 0, y: -1 };
            notOk(boardHasThisPosition(board, position));
        });
        it('x-1 y-1 should return false', () => {
            const position = { x: -1, y: -1 };
            notOk(boardHasThisPosition(board, position));
        });
        it('x8 y1 should return false', () => {
            const position = { x: 8, y: 1 };
            notOk(boardHasThisPosition(board, position));
        });
        it('x1 y-8 should return false', () => {
            const position = { x: 1, y: 8 };
            notOk(boardHasThisPosition(board, position));
        });
        it('x8 y8 should return false', () => {
            const position = { x: 8, y: 8 };
            notOk(boardHasThisPosition(board, position));
        });
    });
    describe('getPosition', () => {
        it('getPosition', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const position = { x: 2, y: 3 };
            const actual = getPosition(board, position);
            const expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });
    });
    describe('getNearPositions', () => {
        it('onlyEmpty=false should return only filled near positions', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const position = { x: 7, y: 7 };
            const onlyEmpty = false;
            const expected = [{ x: 6, y: 7, isBlack: false }];
            const actual = getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=true should return all empty near positions', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const position = { x: 7, y: 7 };
            const onlyEmpty = true;
            const expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
            const actual = getNearPositions(board, position, onlyEmpty);
            log('actual', actual);
            assertPositions(actual, expected);
        });
        it('onlyEmpty=undefined should return all near positions', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const position = { x: 7, y: 7 };
            const onlyEmpty = undefined;
            const expected = [
                { x: 6, y: 6 },
                { x: 7, y: 6 },
                { x: 6, y: 7, isBlack: false }
            ];
            const actual = getNearPositions(board, position, onlyEmpty);
            assertPositions(actual, expected);
        });
    });
    describe('getJumpPosition', () => {
        it('jumping up and rigth', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 0, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 2, y: 2 };
            const actual = getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up and left', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 2, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 0, y: 2 };
            const actual = getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping up', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 0, y: 0 };
            const toJumpPosition = { x: 1, y: 1 };
            const expected = { x: 2, y: 2 };
            const actual = getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and rigth', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 0, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 2, y: 5 };
            const actual = getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down and left', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 2, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 0, y: 5 };
            const actual = getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('jumping down', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 1, y: 7 };
            const toJumpPosition = { x: 1, y: 6 };
            const expected = { x: 1, y: 5 };
            const actual = getJumpPosition(board, from, toJumpPosition);
            assertPosition(actual, expected);
        });
        it('should return undefined because position is not empty', () => {
            const { board } = getInitialBoard(defaultBoardConf);
            const from = { x: 3, y: 0 };
            const toJumpPosition = { x: 4, y: 0 };
            notOk(getJumpPosition(board, from, toJumpPosition));
        });
    });
    it('printUnicode', function printUnicodeTest() {
        const { board } = getInitialBoard(defaultBoardConf);
        const actual = printUnicode(board);
        equal(actual, unicodeStartBoard);
    });
    describe('getColorStartEndRow', () => {
        it('return {startRow: 0, endRow } for black', () => {
            const actual = getColorStartEndRow(defaultBoardConf.endRow, true);
            equal(actual.startRow, 0);
            equal(actual.endRow, 7);
        });
        it('return {startRow: endRow, endRow: 0} for white', () => {
            const actual = getColorStartEndRow(defaultBoardConf.endRow, false);
            equal(actual.startRow, 7);
            equal(actual.endRow, 0);
        });
    });
});
//# sourceMappingURL=Board.test.js.map