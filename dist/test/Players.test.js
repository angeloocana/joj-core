"use strict";

var _Players = require("../Players");

var _Players2 = _interopRequireDefault(_Players);

var _Player = require("../Player");

var _Player2 = _interopRequireDefault(_Player);

var _ptzAssert = require("ptz-assert");

var _GamePieceType = require("../GamePieceType");

var _GamePieceType2 = _interopRequireDefault(_GamePieceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Players", function () {
    var players = void 0;
    var white = new _Player2.default({ name: "P White" });
    var black = new _Player2.default({ name: "P Black" });
    beforeEach(function () {
        players = new _Players2.default({
            black: black,
            white: white
        });
    });
    describe("New setting players", function () {
        it("Set white player name", function () {
            (0, _ptzAssert.ok)(players.white.name == white.name);
        });
        it("Set black player name", function () {
            (0, _ptzAssert.ok)(players.black.name == black.name);
        });
        it("Set white player ai", function () {
            (0, _ptzAssert.ok)(players.white.ai == white.ai);
        });
        it("Set black player ai", function () {
            (0, _ptzAssert.ok)(players.black.ai == black.ai);
        });
    });
    describe("Set Colors", function () {
        it("White", function () {
            (0, _ptzAssert.ok)(players.white.color == _GamePieceType2.default.white);
        });
        it("Black", function () {
            (0, _ptzAssert.ok)(players.black.color == _GamePieceType2.default.black);
        });
    });
});