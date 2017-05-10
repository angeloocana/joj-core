import * as assert from 'ptz-assert';
import log from 'ptz-log';
import { Board, GameColor, Pieces } from './index';
function assertColor(actual, expected) {
    assert.equal(actual.endRow, expected.endRow, 'endRow');
    assert.equal(actual.jumps, expected.jumps, 'jumps');
    assert.equal(actual.nMoves, expected.nMoves, 'nMoves');
    assert.ok(Pieces.haveSamePieceAndPosition(actual.pieces, expected.pieces));
    // assert.equal(actual.points, expected.points, 'points');
    // assert.equal(actual.score.preWinnersPoints, expected.score.preWinnersPoints,
    //     `preWinnersPoints actual: ${actual.score.preWinnersPoints} expected: ${expected.score.preWinnersPoints}`);
    // assert.equal(actual.startRow, expected.startRow, 'startRow');
    // assert.equal(actual.score.winners, expected.score.winners, 'winners');
}
describe('GameColor', () => {
    describe('GameColor.create', () => {
        const miniBoardConf = Board.getBoardConf({ x: 3, y: 3 });
        it('New white color with default options', () => {
            const isBlack = false;
            const pieces = Pieces.createBlackPieces([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
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
            const actualColor = GameColor.create(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
        it('New black color with default options', () => {
            const isBlack = true;
            const pieces = Pieces.createBlackPieces([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]);
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
            const actualColor = GameColor.create(miniBoardConf, isBlack, pieces);
            assertColor(actualColor, expectedColor);
        });
    });
    describe('getColorScore', () => {
        it('return 0', () => {
            const pieces = Pieces.createWhitePieces([
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
                { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }
            ]);
            const color = GameColor.create(Board.defaultBoardConf, true, pieces);
            const score = GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
            assert.equal(score.winners, 0, 'winners');
        });
        it('return 1', () => {
            const pieces = Pieces.createBlackPieces([
                { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
                { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }
            ]);
            const color = GameColor.create(Board.defaultBoardConf, true, pieces);
            const score = GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 21, 'preWinnersPoints');
            assert.equal(score.winners, 1, 'winners');
        });
        it('return 2', () => {
            const pieces = Pieces.createBlackPieces([
                { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
                { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 7, y: 7 }
            ]);
            const color = GameColor.create(Board.defaultBoardConf, true, pieces);
            const score = GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 15, 'preWinnersPoints');
            assert.equal(score.winners, 2, 'winners');
        });
        it('return 8', () => {
            const pieces = Pieces.createBlackPieces([
                { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
                { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }
            ]);
            const color = GameColor.create(Board.defaultBoardConf, true, pieces);
            const score = GameColor.getScore(color);
            assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
            assert.equal(score.winners, 8, 'winners');
        });
    });
    describe('colorWin', () => {
        const { blackPieces } = Board.getInitialBoard(Board.defaultBoardConf);
        log('blackPieces', blackPieces);
        it('return false when new game', () => {
            const color = GameColor.create(Board.defaultBoardConf, false, blackPieces);
            const won = GameColor.hasWon(color);
            assert.notOk(won);
        });
        it('return true', () => {
            const color = GameColor.create(Board.defaultBoardConf, false, blackPieces);
            color.score.winners = 8;
            const won = GameColor.hasWon(color);
            assert.ok(won);
        });
    });
});
//# sourceMappingURL=GameColor.test.js.map