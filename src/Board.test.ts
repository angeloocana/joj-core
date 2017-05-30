import * as assert from 'ptz-assert';
import {
    Board,
    Position
} from './index';

import * as I from './typings';

import log from 'ptz-log';

import * as TestData from './__testdata__/index.data.test';

function assertPosition(actualPosition: I.IPosition, expectedPosition: I.IPosition): void {
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
            const board1 = Board.getInitialBoard(Board.defaultBoardSize);
            const board2 = Board.getInitialBoard(Board.defaultBoardSize);

            assert.equal(board1, board2);
        });
    });

    describe('hasPosition', () => {
        it('return false for null position', () => {
            assert.notOk(Board.hasPosition(TestData.initialBoard, null));
        });

        it('return false for undefined position', () => {
            assert.notOk(Board.hasPosition(TestData.initialBoard, undefined));
        });

        it('return false for negative x', () => {
            const position = { x: -1, y: 0 };
            assert.notOk(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return false for negative y', () => {
            const position = { x: 1, y: -1 };
            assert.notOk(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return false for negative x and y', () => {
            const position = { x: -1, y: -1 };
            assert.notOk(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return false for x > 7', () => {
            const position = { x: 8, y: 1 };
            assert.notOk(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return false for y > 7', () => {
            const position = { x: 7, y: 8 };
            assert.notOk(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return true for x: 0, y: 0', () => {
            const position = { x: 0, y: 0 };
            assert.ok(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return true for x: 1, y: 1', () => {
            const position = { x: 0, y: 0 };
            assert.ok(Board.hasPosition(TestData.initialBoard, position));
        });

        it('return true for x: 7, y: 7', () => {
            const position = { x: 7, y: 7 };
            assert.ok(Board.hasPosition(TestData.initialBoard, position));
        });
    });

    describe('getPositionFromBoard', () => {
        it('valid position', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const position = { x: 2, y: 3 };
            const actual = Board.getPositionFromBoard(board, position);
            const expected = { x: 2, y: 3 };
            assertPosition(actual, expected);
        });

        it('invalid position', () => {
            const board = Board.getInitialBoard(Board.defaultBoardSize);
            const position = { x: -2, y: -3 };
            assert.throws(() => Board.getPositionFromBoard(board, position));
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
            const position: I.IPosition = { x: 7, y: 7 };
            const expected = [{ x: 6, y: 7, isBlack: false }];

            log(Board.printUnicodeBoard(TestData.initialBoard));
            log(Board.printXAndYBoard(TestData.initialBoard));
            const actual = Board.getNotEmptyNearPositions(TestData.initialBoard, position);

            assert.deepEqual(actual, expected);
        });
    });

    describe('getEmptyNearPositions', () => {
        it('return all empty near positions', () => {
            const position: I.IPosition = { x: 7, y: 7 };
            const expected = [{ x: 6, y: 6 }, { x: 7, y: 6 }];

            const actual = Board.getEmptyNearPositions(TestData.initialBoard, position);

            assert.deepEqual(actual, expected);
        });
    });

    describe('getNearPositions', () => {
        it('return all near positions', () => {
            const position: I.IPosition = { x: 7, y: 7 };
            const expected = [
                { x: 6, y: 6 },
                { x: 7, y: 6 },
                { x: 6, y: 7, isBlack: false }
            ];

            const actual = Board.getNearPositions(TestData.initialBoard, position);

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
            const actual = Board.printUnicodeBoard(TestData.initialBoard);
            assert.equal(actual, TestData.unicodeStartBoard);
        });

        it('printXAndY', function printUnicodeTest() {
            const actual = Board.printXAndYBoard(TestData.initialBoard);
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
            const positions = Board.getPositionsWhereCanIGo(TestData.initialBoard, null);
            assert.notOk(positions);
        });
    });

    describe('getCleanBoard', () => {
        it('8x8', () => {
            const board = Board.getCleanBoard({ x: 8, y: 8 });
            const board2 = Board.getCleanBoard({ x: 8, y: 8 });

            assert.deepEqual(board, TestData.cleanBoardExpected);
            assert.equal(board, board2, 'Cache did not worked');
        });
    });

    describe('whereCanIJump', () => {
        it('jump up 5,7 => 5,5 5,3 5,1', () => {
            const pieces = [
                { x: 5, y: 7, isBlack: true },
                { x: 5, y: 6, isBlack: false },
                { x: 5, y: 4, isBlack: false },
                { x: 5, y: 2, isBlack: false },
            ];
            const board = Board.getBoardWithPieces(TestData.cleanBoard, pieces);
            const from = { x: 5, y: 7 };

            const p55 = {
                x: 5, y: 5,
                jumpingBlackPiece: false,
                jumps: [from]
            };

            const p53 = {
                x: 5, y: 3,
                jumpingBlackPiece: false,
                jumps: [from, p55]
            };

            const p51 = {
                x: 5, y: 1,
                jumpingBlackPiece: false,
                jumps: [from, p55, p53]
            };

            const whereCanIJump = Board.whereCanIJump(board, from);

            assert.deepEqual(whereCanIJump, [p55, p53, p51]);
        });
    });

    describe('getBoardWhereCanIGo', () => {
        it('jump up 7,7 => 5,7 5,5 3,3 3,5 5,3', () => {
            const pieces = [
                { x: 7, y: 7, isBlack: true },
                { x: 6, y: 7, isBlack: true },
                { x: 5, y: 7, isBlack: true },
                { x: 5, y: 6, isBlack: true },
                { x: 4, y: 4, isBlack: false },
                { x: 3, y: 4, isBlack: false },
            ];
            const board = Board.getBoardWithPieces(TestData.cleanBoard, pieces);
            const from = { x: 7, y: 7 };

            const actual = Board.getBoardWhereCanIGo(board, from);

            // tslint:disable:max-line-length
            const expected = [
                [{ iCanGoHere: false, x: 0, y: 0 }, { iCanGoHere: false, x: 1, y: 0 }, { iCanGoHere: false, x: 2, y: 0 }, { iCanGoHere: false, x: 3, y: 0 }, { iCanGoHere: false, x: 4, y: 0 }, { iCanGoHere: false, x: 5, y: 0 }, { iCanGoHere: false, x: 6, y: 0 }, { iCanGoHere: false, x: 7, y: 0 }],
                [{ iCanGoHere: false, x: 0, y: 1 }, { iCanGoHere: false, x: 1, y: 1 }, { iCanGoHere: false, x: 2, y: 1 }, { iCanGoHere: false, x: 3, y: 1 }, { iCanGoHere: false, x: 4, y: 1 }, { iCanGoHere: false, x: 5, y: 1 }, { iCanGoHere: false, x: 6, y: 1 }, { iCanGoHere: false, x: 7, y: 1 }],
                [{ iCanGoHere: false, x: 0, y: 2 }, { iCanGoHere: false, x: 1, y: 2 }, { iCanGoHere: false, x: 2, y: 2 }, { iCanGoHere: false, x: 3, y: 2 }, { iCanGoHere: false, x: 4, y: 2 }, { iCanGoHere: false, x: 5, y: 2 }, { iCanGoHere: false, x: 6, y: 2 }, { iCanGoHere: false, x: 7, y: 2 }],
                [{ iCanGoHere: false, x: 0, y: 3 }, { iCanGoHere: false, x: 1, y: 3 }, { iCanGoHere: false, x: 2, y: 3 }, { iCanGoHere: false, x: 3, y: 3 }, { iCanGoHere: false, x: 4, y: 3 }, { iCanGoHere: false, x: 5, y: 3 }, { iCanGoHere: false, x: 6, y: 3 }, { iCanGoHere: false, x: 7, y: 3 }],
                [{ iCanGoHere: false, x: 0, y: 4 }, { iCanGoHere: false, x: 1, y: 4 }, { iCanGoHere: false, x: 2, y: 4 }, { iCanGoHere: false, x: 3, y: 4, isBlack: false }, { iCanGoHere: false, x: 4, y: 4, isBlack: false }, { iCanGoHere: false, x: 5, y: 4 }, { iCanGoHere: false, x: 6, y: 4 }, { iCanGoHere: false, x: 7, y: 4 }],
                [{ iCanGoHere: false, x: 0, y: 5 }, { iCanGoHere: false, x: 1, y: 5 }, { iCanGoHere: false, x: 2, y: 5 }, { iCanGoHere: false, x: 3, y: 5 }, { iCanGoHere: false, x: 4, y: 5 }, { iCanGoHere: false, x: 5, y: 5 }, { iCanGoHere: false, x: 6, y: 5 }, { iCanGoHere: false, x: 7, y: 5 }],
                [{ iCanGoHere: false, x: 0, y: 6 }, { iCanGoHere: false, x: 1, y: 6 }, { iCanGoHere: false, x: 2, y: 6 }, { iCanGoHere: false, x: 3, y: 6 }, { iCanGoHere: false, x: 4, y: 6 }, { iCanGoHere: false, x: 5, y: 6, isBlack: true }, { iCanGoHere: true, x: 6, y: 6 }, { iCanGoHere: true, x: 7, y: 6 }],
                [{ iCanGoHere: false, x: 0, y: 7 }, { iCanGoHere: false, x: 1, y: 7 }, { iCanGoHere: false, x: 2, y: 7 }, { iCanGoHere: false, x: 3, y: 7 }, { iCanGoHere: false, x: 4, y: 7 }, { iCanGoHere: false, x: 5, y: 7, isBlack: true }, { iCanGoHere: false, x: 6, y: 7, isBlack: true }, { iCanGoHere: false, x: 7, y: 7, isBlack: true }]
            ];

            assert.deepEqual(actual, expected);
        });
    });

    describe('getStartPieces', () => {
        it('8x8', () => {
            const pieces = Board.getStartPieces({ x: 8, y: 8 });
            assert.deepEqual(pieces, TestData.startPiecesExpected);
        });
    });

    describe('getPiecesFromBoard', () => {
        it('get initial pieces', () => {
            const pieces = Board.getPiecesFromBoard(TestData.initialBoard);
            const expectedPieces = {
                white: [
                    { x: 0, y: 7, isBlack: false },
                    { x: 1, y: 7, isBlack: false },
                    { x: 2, y: 7, isBlack: false },
                    { x: 3, y: 7, isBlack: false },
                    { x: 4, y: 7, isBlack: false },
                    { x: 5, y: 7, isBlack: false },
                    { x: 6, y: 7, isBlack: false },
                    { x: 7, y: 7, isBlack: false }
                ],
                black: [
                    { x: 0, y: 0, isBlack: true },
                    { x: 1, y: 0, isBlack: true },
                    { x: 2, y: 0, isBlack: true },
                    { x: 3, y: 0, isBlack: true },
                    { x: 4, y: 0, isBlack: true },
                    { x: 5, y: 0, isBlack: true },
                    { x: 6, y: 0, isBlack: true },
                    { x: 7, y: 0, isBlack: true }
                ]
            };
            assert.deepEqual(pieces, expectedPieces);
        });
    });

    describe('getPiecesWhereCanIGo', () => {
        it('return white pieces', () => {
            const board = TestData.initialBoard;
            const positions = TestData.startWhitePiecesExpected;
            const expectedPieces = TestData.startWhitePiecesWhereCanIGoExpected;

            const pieces = Board.getPiecesWhereCanIGo(board, positions);

            assert.deepEqual(pieces, expectedPieces);
        });

        it('return black pieces', () => {
            const board = TestData.initialBoard;
            const positions = TestData.startBlackPiecesExpected;
            const expectedPieces = TestData.startBlackPiecesWhereCanIGoExpected;

            const pieces = Board.getPiecesWhereCanIGo(board, positions);

            assert.deepEqual(pieces, expectedPieces);
        });
    });
});
