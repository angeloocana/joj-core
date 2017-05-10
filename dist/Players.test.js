'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

describe('Players', function () {
    var players = void 0;
    var white = { name: 'P White' };
    var black = { name: 'P Black' };
    beforeEach(function () {
        players = (0, _index.createPlayers)({
            black: black,
            white: white
        });
    });
    describe('New setting players', function () {
        it('Set white player name', function () {
            (0, _ptzAssert.ok)(players.white.name === white.name);
        });
        it('Set black player name', function () {
            (0, _ptzAssert.ok)(players.black.name === black.name);
        });
        it('Set white player ai', function () {
            (0, _ptzAssert.ok)(players.white.ai === white.ai);
        });
        it('Set black player ai', function () {
            (0, _ptzAssert.ok)(players.black.ai === black.ai);
        });
    });
});
//# sourceMappingURL=Players.test.js.map
//# sourceMappingURL=Players.test.js.map