'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

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
    describe('getPiecesOrdered', function () {
        it('');
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