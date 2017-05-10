'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Player', function () {
    var player = void 0;
    describe('createBlack', function () {
        var name = 'John';
        beforeEach(function () {
            player = _index.Player.createBlack({ name: name });
        });
        it('set name', function () {
            assert.equal(player.name, name);
        });
        it('set isBlack = true', function () {
            assert.ok(player.isBlack);
        });
    });
    describe('createWhite', function () {
        var name = 'John';
        beforeEach(function () {
            player = _index.Player.createWhite({ name: name });
        });
        it('set name', function () {
            assert.equal(player.name, name);
        });
        it('set isBlack = true', function () {
            assert.notOk(player.isBlack);
        });
    });
});
//# sourceMappingURL=Player.test.js.map
//# sourceMappingURL=Player.test.js.map