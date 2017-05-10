import { equal, notOk, ok } from 'ptz-assert';
import log from 'ptz-log';
import {
    colorWin,
    createGameColor,
    createPiece,
    defaultBoardConf,
    getBoardConf,
    getColorScore,
    getInitialBoard,
    hasBlackPiece,
    hasNoPiece,
    hasWhitePiece,
    IGameColor,
    IPiece,
    isSamePositionAs
} from './index';

function assertPieces(actual: IPiece[], expected: IPiece[]) {
    for (let i = 0; i < actual.length; i++) {
        const actualPiece = actual[i];
        const expectedPiece = expected[i];
        const samePositionAs = isSamePositionAs(actualPiece.position, expectedPiece.position);

        if (!samePositionAs) {
            log('assertPieces: actualPiece:', actualPiece, ' \n expectedPiece', expectedPiece);
        }

        ok(samePositionAs, 'isSamePositionAs');
        equal(hasBlackPiece(actualPiece.position), hasBlackPiece(expectedPiece.position));
        equal(hasWhitePiece(actualPiece.position), hasWhitePiece(expectedPiece.position));
        equal(hasNoPiece(actualPiece.position), hasNoPiece(expectedPiece.position));
    }
}

function assertColor(actual: IGameColor, expected: IGameColor) {
    equal(actual.endRow, expected.endRow, 'endRow');
    equal(actual.jumps, expected.jumps, 'jumps');
    equal(actual.nMoves, expected.nMoves, 'nMoves');

    assertPieces(actual.pieces, expected.pieces);
    equal(actual.points, expected.points, 'points');
    equal(actual.score.preWinnersPoints, expected.score.preWinnersPoints,
        `preWinnersPoints actual: ${actual.score.preWinnersPoints} expected: ${expected.score.preWinnersPoints}`);
    equal(actual.startRow, expected.startRow, 'startRow');
    equal(actual.score.winners, expected.score.winners, 'winners');
}

describe('GameColor', () => {

    describe('createGameColor', () => {
        const miniBoardConf = getBoardConf({ x: 3, y: 3 });

        it('New white color with default options', () => {
            const isBlack = false;
            const pieces = [createPiece(0, 2, isBlack), createPiece(1, 2, isBlack), createPiece(2, 2, isBlack)];

            const expectedColor = {
                score: {
                    preWinnersPoints: 0,
                    winners: 0
                },
                jumps: 0,
                points: 0,
                nMoves: 0,
                startRow: 2,
                endRow: 0,
                pieces,
                isBlack
            };

            const actualColor = createGameColor(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });

        it('New black color with default options', () => {
            const isBlack = true;
            const pieces = [createPiece(0, 0, isBlack), createPiece(1, 0, isBlack), createPiece(2, 0, isBlack)];

            const expectedColor = {
                score: {
                    preWinnersPoints: 0,
                    winners: 0
                },
                jumps: 0,
                points: 0,
                nMoves: 0,
                startRow: 0,
                endRow: 2,
                pieces,
                isBlack
            };

            const actualColor = createGameColor(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
    });

    describe('getColorScore', () => {
        it('return 0 when new game', () => {
            const color = createGameColor(defaultBoardConf, false, []);
            const winners = getColorScore(color);

            equal(winners.preWinnersPoints, 0);
            equal(winners.winners, 0);
        });

        it('return 1');
        it('return 2');
        it('return 3');
        it('return 4');
        it('return 5');
        it('return 6');
        it('return 7');
        it('return 8');
    });

    describe('colorWin', () => {
        const { blackPieces } = getInitialBoard(defaultBoardConf);
        log('blackPieces', blackPieces);

        it('return false when new game', () => {
            const color = createGameColor(defaultBoardConf, false, blackPieces);

            const win = colorWin(color);
            log('color', color);
            notOk(win);
        });

        it('return true', () => {
            const color = createGameColor(defaultBoardConf, false, blackPieces);

            color.score.winners = 8;

            const win = colorWin(color);
            log('color', color);
            ok(win);
        });
    });
});
