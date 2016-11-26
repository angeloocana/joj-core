"use strict";

var _Game = require("../Game");

var _Game2 = _interopRequireDefault(_Game);

var _ptzAssert = require("ptz-assert");

var _Players = require("../Players");

var _Players2 = _interopRequireDefault(_Players);

var _Player = require("../Player");

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Game", function () {
    var game = void 0;
    describe("needToValidateMovements", function () {
        it("when null should validate");
        it("when undefined should validate");
        it("when true should validate");
        it("when false should NOT validate");
    });
    describe("Game ended", function () {
        beforeEach(function () {
            game = new _Game2.default({
                boardArgs: {
                    logMove: true
                }
            });
        });
    });
    describe("getCopy", function () {
        var gameCopy = void 0;
        beforeEach(function () {
            game = new _Game2.default({
                boardArgs: {
                    logMove: true
                }
            });
            gameCopy = game.getCopy();
        });
        it("notEqual = not using same reference", function () {
            (0, _ptzAssert.notEqual)(gameCopy, game);
        });
        it("movements", function () {
            (0, _ptzAssert.deepEqual)(gameCopy.movements, game.movements);
        });
        it("players", function () {
            (0, _ptzAssert.deepEqual)(gameCopy.players, game.players);
        });
        it("ended", function () {
            (0, _ptzAssert.deepEqual)(gameCopy.ended, game.ended);
        });
        it("board", function () {
            (0, _ptzAssert.deepEqual)(gameCopy.board, game.board);
        });
    });
    describe("backMove", function () {
        it("backMove offline game", function () {
            var players = new _Players2.default({
                white: new _Player2.default({ name: "Angelo", foto: "img/black_user.png" }),
                black: new _Player2.default({ name: "Gabi", foto: "img/white_user.png" })
            });
            var game = new _Game2.default({
                players: players,
                boardArgs: {
                    logMove: true
                }
            });
            game.move({ x: 2, y: 7 }, { x: 2, y: 6 });
            var gameBeforeLastMove = game.getCopy();
            game.move({ x: 2, y: 0 }, { x: 2, y: 1 });
            game.backMove();
            (0, _ptzAssert.equal)(gameBeforeLastMove.movements.length, game.movements.length);
            (0, _ptzAssert.deepEqual)(gameBeforeLastMove.movements, game.movements);
        });
    });
});