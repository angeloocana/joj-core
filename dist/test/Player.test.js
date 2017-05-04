'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../index');

describe('Player', function () {
    var player = void 0;
    describe('new', function () {
        var name = 'John';
        beforeEach(function () {
            player = new _index.Player({ name: name });
        });
        it('Setting name', function () {
            (0, _ptzAssert.ok)(name === player.name);
        });
    });
});
//# sourceMappingURL=Player.test.js.map
//# sourceMappingURL=Player.test.js.map