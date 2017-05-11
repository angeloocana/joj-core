'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Move', function () {
    describe('getBackMove', function () {
        it('invert move {from:0,7 to:1,6} => {from:1,6 to:0,7}', function () {
            var move = {
                from: { x: 0, y: 7 },
                to: { x: 1, y: 6 }
            };
            var backMove = _index.Move.getBackMove(move);
            assert.equal(backMove.from, move.to);
            assert.equal(backMove.to, move.from);
        });
    });
});
//# sourceMappingURL=Move.test.js.map
//# sourceMappingURL=Move.test.js.map