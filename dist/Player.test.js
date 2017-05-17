'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Player', function () {
    describe('createBlackPlayer', function () {
        var name = 'John';
        var player = _index.Player.createBlackPlayer({ name: name });
        assert.equal(player.name, name, 'set name');
        assert.ok(player.isBlack, 'set isBlack = true');
    });
    describe('createWhitePlayer', function () {
        var name = 'John';
        var player = _index.Player.createWhitePlayer({ name: name });
        assert.equal(player.name, name, 'set name');
        assert.notOk(player.isBlack, 'set isBlack = false');
    });
    describe('Players', function () {
        describe('New setting players', function () {
            var white = { name: 'P White' };
            var black = { name: 'P Black', isAi: true };
            var players = _index.Player.createPlayers({
                black: black,
                white: white
            });
            assert.ok(players.white.name === white.name, 'Set white player name');
            assert.ok(players.black.name === black.name, 'Set black player name');
            assert.ok(players.white.isAi === white.isAi, 'Set white player ai');
            assert.ok(players.black.isAi === black.isAi, 'Set black player ai');
        });
    });
});
//# sourceMappingURL=Player.test.js.map
//# sourceMappingURL=Player.test.js.map