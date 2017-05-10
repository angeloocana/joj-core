'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

describe('Player', function () {
    var player = void 0;
    describe('createBlackPlayer', function () {
        var name = 'John';
        beforeEach(function () {
            player = (0, _index.createBlackPlayer)({ name: name });
        });
        it('set name', function () {
            (0, _ptzAssert.equal)(player.name, name);
        });
        it('set isBlack = true', function () {
            (0, _ptzAssert.ok)(player.isBlack);
        });
    });
    describe('createWhitePlayer', function () {
        var name = 'John';
        beforeEach(function () {
            player = (0, _index.createWhitePlayer)({ name: name });
        });
        it('set name', function () {
            (0, _ptzAssert.equal)(player.name, name);
        });
        it('set isBlack = true', function () {
            (0, _ptzAssert.notOk)(player.isBlack);
        });
    });
});
//# sourceMappingURL=Player.test.js.map
//# sourceMappingURL=Player.test.js.map