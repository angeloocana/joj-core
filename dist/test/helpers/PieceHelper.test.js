'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('../../index');

describe('PieceHelper', function () {
    it('getStartPieces should return pieces in start positions', function () {
        var boardOptions = { size: { x: 3, y: 3 } };
        var row = 0;
        var pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        (0, _ptzAssert.deepEqual)(_index.pieceHelper.getStartPieces(boardOptions, row, true), pieces);
    });
});
//# sourceMappingURL=PieceHelper.test.js.map
//# sourceMappingURL=PieceHelper.test.js.map