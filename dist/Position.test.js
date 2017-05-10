'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

describe('Position', function () {
    describe('isSamePositionAs', function () {
        it('true', function () {
            var position1 = { x: 2, y: 3 };
            var position2 = { x: 2, y: 3 };
            (0, _ptzAssert.equal)((0, _index.isSamePositionAs)(position1, position2), true);
        });
        it('false', function () {
            var position1 = { x: 3, y: 2 };
            var position2 = { x: 2, y: 3 };
            (0, _ptzAssert.equal)((0, _index.isSamePositionAs)(position1, position2), false);
        });
    });
    describe('hasBlackPiece', function () {
        it('return true for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            (0, _ptzAssert.ok)((0, _index.hasBlackPiece)(position));
        });
        it('return false for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            (0, _ptzAssert.notOk)((0, _index.hasBlackPiece)(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                (0, _ptzAssert.notOk)((0, _index.hasBlackPiece)(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                (0, _ptzAssert.notOk)((0, _index.hasBlackPiece)(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                (0, _ptzAssert.notOk)((0, _index.hasBlackPiece)(position));
            });
        });
    });
    describe('hasNoPiece', function () {
        it('return false for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            (0, _ptzAssert.notOk)((0, _index.hasNoPiece)(position));
        });
        it('return false for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            (0, _ptzAssert.notOk)((0, _index.hasNoPiece)(position));
        });
        describe('return true for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                (0, _ptzAssert.ok)((0, _index.hasNoPiece)(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                (0, _ptzAssert.ok)((0, _index.hasNoPiece)(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                (0, _ptzAssert.ok)((0, _index.hasNoPiece)(position));
            });
        });
    });
    describe('hasWhitePiece', function () {
        it('return false for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            (0, _ptzAssert.notOk)((0, _index.hasWhitePiece)(position));
        });
        it('return true for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            (0, _ptzAssert.ok)((0, _index.hasWhitePiece)(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                (0, _ptzAssert.notOk)((0, _index.hasWhitePiece)(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                (0, _ptzAssert.notOk)((0, _index.hasWhitePiece)(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                (0, _ptzAssert.notOk)((0, _index.hasWhitePiece)(position));
            });
        });
    });
    describe('hasPiece', function () {
        it('return true for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            (0, _ptzAssert.ok)((0, _index.hasPiece)(position));
        });
        it('return true for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            (0, _ptzAssert.ok)((0, _index.hasPiece)(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                (0, _ptzAssert.notOk)((0, _index.hasPiece)(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                (0, _ptzAssert.notOk)((0, _index.hasPiece)(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                (0, _ptzAssert.notOk)((0, _index.hasPiece)(position));
            });
        });
    });
});
//# sourceMappingURL=Position.test.js.map
//# sourceMappingURL=Position.test.js.map