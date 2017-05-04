'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../../index');

describe('GameBoard', function () {
    describe('isBackGroundBlack', function () {
        it('0,0 => true', function () {
            (0, _ptzAssert.ok)(_index.boardHelper.isBackGroundBlack(0, 0));
        });
        it('0,1 => false', function () {
            (0, _ptzAssert.ok)(!_index.boardHelper.isBackGroundBlack(0, 1));
        });
    });
    describe('isPositionNotAdded', function () {
        it('added', function () {
            var position = new _index.BoardPosition({ x: 5, y: 2 });
            var positions = [new _index.BoardPosition({ x: 4, y: 0 }), new _index.BoardPosition({ x: 3, y: 0 })];
            (0, _ptzAssert.ok)(_index.boardHelper.isPositionNotAdded(position, positions));
        });
        it('not added', function () {
            var position = new _index.BoardPosition({ x: 3, y: 0 });
            var positions = [new _index.BoardPosition({ x: 4, y: 0 }), new _index.BoardPosition({ x: 3, y: 0 })];
            (0, _ptzAssert.notOk)(_index.boardHelper.isPositionNotAdded(position, positions));
        });
    });
    describe('getY0Start7End', function () {
        it('for white y2 should return 5', function () {
            var y = 2;
            var isBlack = false;
            (0, _ptzAssert.equal)(_index.boardHelper.getY0Start7End(y, isBlack), 5);
        });
        it('for black y2 should return 2', function () {
            var y = 2;
            var isBlack = true;
            (0, _ptzAssert.equal)(_index.boardHelper.getY0Start7End(y, isBlack), 2);
        });
    });
    describe('getY7Start0End', function () {
        it('for white y2 should return 2', function () {
            var y = 2;
            var isBlack = false;
            (0, _ptzAssert.equal)(_index.boardHelper.getY7Start0End(y, isBlack), 2);
        });
        it('for black y2 should return 5', function () {
            var y = 2;
            var isBlack = true;
            (0, _ptzAssert.equal)(_index.boardHelper.getY7Start0End(y, isBlack), 5);
        });
    });
});
//# sourceMappingURL=BoardHelper.test.js.map
//# sourceMappingURL=BoardHelper.test.js.map