'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Positions', function () {
    describe('positionsContains', function () {
        it('not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.notOk(_index.Positions.contains(positions, position));
        });
        it('contains', function () {
            var position = { x: 3, y: 0 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.ok(_index.Positions.contains(positions, position));
        });
    });
    describe('positionsNotContains', function () {
        it('not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.ok(_index.Positions.notContains(positions, position));
        });
        it('contains', function () {
            var position = { x: 3, y: 0 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.notOk(_index.Positions.notContains(positions, position));
        });
    });
});
//# sourceMappingURL=Positions.test.js.map
//# sourceMappingURL=Positions.test.js.map