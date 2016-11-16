"use strict";

var _BoardHelper = require("../../helpers/BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _ptzAssert = require("ptz-assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GameBoard", function () {
    describe("isBackGroundBlack", function () {
        it("0,0 => true", function () {
            (0, _ptzAssert.ok)(_BoardHelper2.default.isBackGroundBlack(0, 0));
        });
        it("0,1 => false", function () {
            (0, _ptzAssert.ok)(!_BoardHelper2.default.isBackGroundBlack(0, 1));
        });
    });
});