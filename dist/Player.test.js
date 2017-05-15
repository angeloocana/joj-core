'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Player', function () {
    var player = void 0;
    describe('createBlackPlayer', function () {
        var name = 'John';
        beforeEach(function () {
            player = _index.Player.createBlackPlayer({ name: name });
        });
        it('set name', function () {
            assert.equal(player.name, name);
        });
        it('set isBlack = true', function () {
            assert.ok(player.isBlack);
        });
    });
    describe('createWhitePlayer', function () {
        var name = 'John';
        beforeEach(function () {
            player = _index.Player.createWhitePlayer({ name: name });
        });
        it('set name', function () {
            assert.equal(player.name, name);
        });
        it('set isBlack = true', function () {
            assert.notOk(player.isBlack);
        });
    });
    describe('Players', function () {
        var players = void 0;
        var white = { name: 'P White' };
        var black = { name: 'P Black' };
        beforeEach(function () {
            players = _index.Player.createPlayers({
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
});
//# sourceMappingURL=Player.test.js.map
//# sourceMappingURL=Player.test.js.map