"use strict";

var _Player = require("../Player");

var _Player2 = _interopRequireDefault(_Player);

var _ptzAssert = require("ptz-assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Player", function () {
    var player = void 0;
    describe("new", function () {
        var name = "John";
        beforeEach(function () {
            player = new _Player2.default({ name: name });
        });
        it("Setting name", function () {
            (0, _ptzAssert.ok)(name == player.name);
        });
    });
});