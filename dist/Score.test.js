'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Score', function () {
    describe('getColorScore', function () {
        describe('for Black', function () {
            it('return 0', function () {
                var positions = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 0, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });
            it('return 1', function () {
                var positions = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 21, 'preWinnersPoints');
                assert.equal(score.winners, 1, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });
            it('return 2', function () {
                var positions = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 7, y: 7 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 15, 'preWinnersPoints');
                assert.equal(score.winners, 2, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });
            it('return 8', function () {
                var positions = [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 8, 'winners');
                assert.ok(score.won, 'won');
            });
        });
        describe('for White', function () {
            it('return 0', function () {
                var positions = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 0, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });
            it('return 1', function () {
                var positions = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 21, 'preWinnersPoints');
                assert.equal(score.winners, 1, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });
            it('return 2', function () {
                var positions = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 7, y: 7 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 15, 'preWinnersPoints');
                assert.equal(score.winners, 2, 'winners');
                assert.notOk(score.won, 'did NOT won');
            });
            it('return 8', function () {
                var positions = [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }];
                var score = _index.Score.getColorScore({ startRow: 0, endRow: 7 }, positions);
                assert.equal(score.preWinnersPoints, 0, 'preWinnersPoints');
                assert.equal(score.winners, 8, 'winners');
                assert.ok(score.won, 'won');
            });
        });
    });
});
//# sourceMappingURL=Score.test.js.map
//# sourceMappingURL=Score.test.js.map