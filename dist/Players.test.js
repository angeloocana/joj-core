'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Players', function () {
    var players = void 0;
    var white = { name: 'P White' };
    var black = { name: 'P Black' };
    beforeEach(function () {
        players = _index.Players.create({
            black: black,
            white: white
        });
    });
    describe('New setting players', function () {
        it('Set white player name', function () {
            assert.ok(players.white.name === white.name);
        });
        it('Set black player name', function () {
            assert.ok(players.black.name === black.name);
        });
        it('Set white player ai', function () {
            assert.ok(players.white.ai === white.ai);
        });
        it('Set black player ai', function () {
            assert.ok(players.black.ai === black.ai);
        });
    });
});
//# sourceMappingURL=Players.test.js.map
//# sourceMappingURL=Players.test.js.map