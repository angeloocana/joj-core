'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../index');

describe('Players', function () {
    var players = void 0;
    var white = new _index.Player({ name: 'P White' });
    var black = new _index.Player({ name: 'P Black' });
    beforeEach(function () {
        players = new _index.Players({
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
    describe('Set Colors', function () {
        it('White', function () {
            (0, _ptzAssert.ok)(players.white.color === _index.gamePieceType.white);
        });
        it('Black', function () {
            (0, _ptzAssert.ok)(players.black.color === _index.gamePieceType.black);
        });
    });
});
//# sourceMappingURL=Players.test.js.map
//# sourceMappingURL=Players.test.js.map