'use strict';

var _ptzAssert = require('ptz-assert');

var _BoardPosition = require('../BoardPosition');

describe('BoardPosition', function () {
    describe('New', function () {
        var position;
        beforeEach(function () {
            position = new _BoardPosition.BoardPosition({ x: 0, y: 0 });
        });
        it('x');
    });
    describe('isBlackPiece', function () {
        var position;
        beforeEach(function () {
            position = new _BoardPosition.BoardPosition({ x: 0, y: 0 });
        });
        it('true', function () {
            position.setPiece(true);
            var actual = position.isBlackPiece();
            (0, _ptzAssert.equal)(actual, true);
        });
        it('false', function () {
            position.setPiece(false);
            var actual = position.isBlackPiece();
            (0, _ptzAssert.equal)(actual, false);
        });
        it('null', function () {
            position.removePiece();
            var actual = position.isBlackPiece();
            (0, _ptzAssert.equal)(actual, null);
        });
    });
    describe('isSamePositionAs', function () {
        it('true', function () {
            var position1 = new _BoardPosition.BoardPosition({ x: 2, y: 3 });
            var position2 = new _BoardPosition.BoardPosition({ x: 2, y: 3 });
            (0, _ptzAssert.equal)(position1.isSamePositionAs(position2), true);
        });
        it('false', function () {
            var position1 = new _BoardPosition.BoardPosition({ x: 3, y: 2 });
            var position2 = new _BoardPosition.BoardPosition({ x: 2, y: 3 });
            (0, _ptzAssert.equal)(position1.isSamePositionAs(position2), false);
        });
    });
    describe('setPiece', function () {
        var position;
        beforeEach(function () {
            position = new _BoardPosition.BoardPosition({ x: 0, y: 0 });
        });
        it('black', function () {
            position.setPiece(true);
            (0, _ptzAssert.equal)(position.isBlackPiece(), true);
            (0, _ptzAssert.equal)(position.isEmpty(), false);
        });
        it('white', function () {
            position.setPiece(false);
            (0, _ptzAssert.equal)(position.isBlackPiece(), false);
            (0, _ptzAssert.equal)(position.isEmpty(), false);
        });
        it('empty', function () {
            position.setPiece(null);
            (0, _ptzAssert.equal)(position.isEmpty(), true);
        });
    });
    describe('isEmpty', function () {
        var position;
        beforeEach(function () {
            position = new _BoardPosition.BoardPosition({ x: 2, y: 3 });
        });
        it('true', function () {
            position.removePiece();
            (0, _ptzAssert.equal)(position.isEmpty(), true);
        });
        it('false, black piece', function () {
            position.setPiece(true);
            (0, _ptzAssert.equal)(position.isEmpty(), false);
        });
        it('false, white piece', function () {
            position.setPiece(false);
            (0, _ptzAssert.equal)(position.isEmpty(), false);
        });
    });
});
//# sourceMappingURL=BoardPosition.test.js.map
//# sourceMappingURL=BoardPosition.test.js.map