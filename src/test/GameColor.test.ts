import { equal, notOk, ok } from 'ptz-assert';
import {
    colorWin,
    defaultBoardOptions,
    GameColor,
    GamePiece,
    getColorWinners,
    IGameColor,
    IGamePiece
} from '../index';

function assertPieces(actual: IGamePiece[], expected: IGamePiece[]) {
    for (let i = 0; i < actual.length; i++) {
        const actualPiece = actual[i];
        const expectedPiece = expected[i];
        const isSamePositionAs = actualPiece.position.isSamePositionAs(expectedPiece.position);

        if (!isSamePositionAs) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log('assertPieces');
            console.log('actualPiece');
            console.log(actualPiece);
            console.log('expectedPiece');
            console.log(expectedPiece);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        }

        ok(isSamePositionAs, 'isSamePositionAs');
        equal(actualPiece.position.isBlackPiece(), expectedPiece.position.isBlackPiece());
    }
}

function assertColor(actual: IGameColor, expected) {
    equal(actual.endRow, expected.endRow, 'endRow');
    equal(actual.jumps, expected.jumps, 'jumps');
    equal(actual.nMoves, expected.nMoves, 'nMoves');

    assertPieces(actual.pieces, expected.pieces);
    equal(actual.points, expected.points, 'points');
    equal(actual.winners.preWinnersPoints, expected.winners.preWinnersPoints,
        `preWinnersPoints actual: ${actual.winners.preWinnersPoints} expected: ${expected.winners.preWinnersPoints}`);
    equal(actual.startRow, expected.startRow, 'startRow');
    equal(actual.winners.winners, expected.winners.winners, 'winners');
}

describe('GameColor', () => {

    const boardOptions = { size: { x: 3, y: 3 } };

    it('New white color with default options', () => {
        const isBlack = false;
        const pieces = [new GamePiece(0, 2, isBlack), new GamePiece(1, 2, isBlack), new GamePiece(2, 2, isBlack)];

        const expectedColor = {
            winners: {
                preWinnersPoints: 0,
                winners: 0
            },
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 2,
            endRow: 0,
            pieces
        };

        const actualColor = new GameColor(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });

    it('New black color with default options', () => {
        const isBlack = true;
        const pieces = [new GamePiece(0, 0, isBlack), new GamePiece(1, 0, isBlack), new GamePiece(2, 0, isBlack)];

        const expectedColor = {
            winners: {
                preWinnersPoints: 0,
                winners: 0
            },
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 0,
            endRow: 2,
            pieces
        };

        const actualColor = new GameColor(boardOptions, isBlack);
        assertColor(actualColor, expectedColor);
    });

    describe('getColorWinners', () => {
        it('return 0 when new game', () => {
            const color = new GameColor(defaultBoardOptions, false);
            const winners = getColorWinners(color);

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
        it('return false when new game', () => {
            const color = new GameColor(defaultBoardOptions, false);

            const win = colorWin(color);
            notOk(win);
        });

        it('return true', () => {
            const color = new GameColor(defaultBoardOptions, false);

            color.winners.winners = 8;

            const win = colorWin(color);
            ok(win);
        });
    });
});
