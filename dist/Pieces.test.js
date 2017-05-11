'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Pieces', function () {
    describe('removePiece', function () {
        it('remove', function () {
            var pieceToRemove = { position: { x: 0, y: 2, isBlack: false } };
            var pieces = _index.Pieces.createWhitePieces([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
            var newPieces = _index.Pieces.removePiece(pieces, pieceToRemove);
            assert.notContains(newPieces, pieces[0]);
        });
        it('do not remove', function () {
            var pieceToRemove = { position: { x: 0, y: 0, isBlack: false } };
            var pieces = _index.Pieces.createWhitePieces([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
            var newPieces = _index.Pieces.removePiece(pieces, pieceToRemove);
            assert.deepEqual(newPieces, pieces);
        });
    });
    describe('getOrderedPieces', function () {
        describe('board=8x8', function () {
            var getOrderedPieces8x8 = _ramda2.default.curry(_index.Pieces.getOrderedPiecesCurried(8));
            describe('white pieces', function () {
                var getOrderedPieces8x8ForWhite = getOrderedPieces8x8(false);
                it('return all pieces in orderedPieces[0]', function () {
                    var pieces = [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }].map(function (p) {
                        return _index.Piece.createPiece(p);
                    });
                    var orderedPieces = getOrderedPieces8x8ForWhite(pieces);
                    assert.equal(orderedPieces[0].length, 8);
                });
            });
            describe('black pieces', function () {
                var getOrderedPieces8x8ForBlack = getOrderedPieces8x8(true);
                it('return all pieces in orderedPieces[0]', function () {
                    var pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }].map(function (p) {
                        return _index.Piece.createPiece(p);
                    });
                    var orderedPieces = getOrderedPieces8x8ForBlack(pieces);
                    assert.equal(orderedPieces[0].length, 8);
                });
                it('return all pieces in orderedPieces[7]', function () {
                    var pieces = [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }].map(function (p) {
                        return _index.Piece.createPiece(p);
                    });
                    var orderedPieces = getOrderedPieces8x8ForBlack(pieces);
                    assert.equal(orderedPieces[7].length, 8);
                });
            });
        });
    });
    describe('haveSamePieceAndPosition', function () {
        it('return true for same piece and same position', function () {
            var a = [{ position: { x: 0, y: 0, isBlack: true } }];
            var b = [{ position: { x: 0, y: 0, isBlack: true } }];
            assert.ok(_index.Pieces.haveSamePieceAndPosition(a, b));
        });
        it('return false for diferente piece and same position', function () {
            var a = [{ position: { x: 0, y: 0, isBlack: true } }];
            var b = [{ position: { x: 0, y: 0, isBlack: false } }];
            assert.notOk(_index.Pieces.haveSamePieceAndPosition(a, b));
        });
        it('return false for same piece and diferent position', function () {
            var a = [{ position: { x: 0, y: 0, isBlack: true } }];
            var b = [{ position: { x: 0, y: 1, isBlack: true } }];
            assert.notOk(_index.Pieces.haveSamePieceAndPosition(a, b));
        });
        it('return false for diferente piece and diferent position', function () {
            var a = [{ position: { x: 0, y: 0, isBlack: true } }];
            var b = [{ position: { x: 0, y: 1, isBlack: false } }];
            assert.notOk(_index.Pieces.haveSamePieceAndPosition(a, b));
        });
    });
});
//# sourceMappingURL=Pieces.test.js.map
//# sourceMappingURL=Pieces.test.js.map