describe("jojPieceService", function () {
    var jojPieceService = {};
    beforeEach(module("jojApp"));
    beforeEach(inject(function (_jojPieceService_) {
        jojPieceService = _jojPieceService_;
    }));
    it("getStartPieces should return pieces in start positions", function () {
        var boardOptions = { size: { x: 3 } };
        var row = 0;
        var pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        expect(jojPieceService.getStartPieces(boardOptions, row)).toEqual(pieces);
    });
    it("isBlackPiece should return true", function () {
        var position = {
            piece: 0
        };
        expect(jojPieceService.isBlackPiece(position)).toBe(true);
    });
    it("isBlackPiece should return false", function () {
        var position = {
            piece: 1
        };
        expect(jojPieceService.isBlackPiece(position)).toBe(false);
    });
    it("isBlackPiece should return null", function () {
        var position = {
            piece: -1
        };
        expect(jojPieceService.isBlackPiece(position)).toBe(null);
    });
});
