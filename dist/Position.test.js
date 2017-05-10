'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Position', function () {
    describe('hasSamePosition', function () {
        it('true', function () {
            var position1 = { x: 2, y: 3 };
            var position2 = { x: 2, y: 3 };
            assert.equal(_index.Position.hasSamePosition(position1, position2), true);
        });
        it('false', function () {
            var position1 = { x: 3, y: 2 };
            var position2 = { x: 2, y: 3 };
            assert.equal(_index.Position.hasSamePosition(position1, position2), false);
        });
    });
    describe('hasBlackPiece', function () {
        it('return true for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.ok(_index.Position.hasBlackPiece(position));
        });
        it('return false for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.notOk(_index.Position.hasBlackPiece(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.notOk(_index.Position.hasBlackPiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(_index.Position.hasBlackPiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(_index.Position.hasBlackPiece(position));
            });
        });
    });
    describe('hasNoPiece', function () {
        it('return false for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.notOk(_index.Position.hasNoPiece(position));
        });
        it('return false for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.notOk(_index.Position.hasNoPiece(position));
        });
        describe('return true for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.ok(_index.Position.hasNoPiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.ok(_index.Position.hasNoPiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.ok(_index.Position.hasNoPiece(position));
            });
        });
    });
    describe('hasWhitePiece', function () {
        it('return false for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.notOk(_index.Position.hasWhitePiece(position));
        });
        it('return true for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.ok(_index.Position.hasWhitePiece(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.notOk(_index.Position.hasWhitePiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(_index.Position.hasWhitePiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(_index.Position.hasWhitePiece(position));
            });
        });
    });
    describe('hasPiece', function () {
        it('return true for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.ok(_index.Position.hasPiece(position));
        });
        it('return true for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.ok(_index.Position.hasPiece(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.notOk(_index.Position.hasPiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(_index.Position.hasPiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(_index.Position.hasPiece(position));
            });
        });
    });
});
//# sourceMappingURL=Position.test.js.map
//# sourceMappingURL=Position.test.js.map