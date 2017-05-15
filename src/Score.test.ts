import * as assert from 'ptz-assert';
import {
    Score
} from './index';

describe('Score', () => {
    describe('getColorScore', () => {
        describe('for Black', () => {
            it('return 0', () => {
                const positions = [
                    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
                    { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 0, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });

            it('return 1', () => {
                const positions = [
                    { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
                    { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 21, 'preWinnersPoints');
                assert.equal(score.winners, 1, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });

            it('return 2', () => {
                const positions = [
                    { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
                    { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 7, y: 7 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 15, 'preWinnersPoints');
                assert.equal(score.winners, 2, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });

            it('return 8', () => {
                const positions = [
                    { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
                    { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 8, 'winners');
                assert.ok(score.won, 'won');
            });
        });

        describe('for White', () => {
            it('return 0', () => {
                const positions = [
                    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
                    { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 0, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });

            it('return 1', () => {
                const positions = [
                    { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
                    { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 21, 'preWinnersPoints');
                assert.equal(score.winners, 1, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });

            it('return 2', () => {
                const positions = [
                    { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
                    { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 7, y: 7 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 15, 'preWinnersPoints');
                assert.equal(score.winners, 2, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });

            it('return 8', () => {
                const positions = [
                    { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
                    { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }
                ];

                const score = Score.getColorScore({ startRow: 0, endRow: 7 }, positions);

                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 8, 'winners');
                assert.ok(score.won, 'won');
            });
        });
    });
});
