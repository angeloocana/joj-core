import * as assert from 'ptz-assert';
import log from 'ptz-log';
import { Board, GameColor, Piece, Pieces } from './index';
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
            const pieces = [Piece.create(0, 2, isBlack), Piece.create(1, 2, isBlack), Piece.create(2, 2, isBlack)];
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
            const pieces = [Piece.create(0, 0, isBlack), Piece.create(1, 0, isBlack), Piece.create(2, 0, isBlack)];
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
        it('return 0 when new game', () => {
            const color = GameColor.create(Board.defaultBoardConf, false, []);
            const winners = GameColor.getScore(color);
            assert.equal(winners.preWinnersPoints, 0);
            assert.equal(winners.winners, 0);
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