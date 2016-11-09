describe("jojColorService", function () {
    var jojColorService = {};
    beforeEach(module("jojApp"));
    beforeEach(inject(function (_jojColorService_) {
        jojColorService = _jojColorService_;
    }));
    it("getCleanColor should return white color with default options", function () {
        var boardOptions = { size: { x: 3, y: 3 } };
        var isBlack = false;
        var pieces = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }];
        var color = {
            winners: 7,
            jumps: 24,
            points: 54,
            nMoves: 24,
            startRow: 6,
            endRow: 4,
            pieces: {}
        };
        var expectedColor = {
            winners: 0,
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 2,
            endRow: 0,
            pieces: pieces
        };
        expect(jojColorService.getCleanColor(color, boardOptions, isBlack)).toEqual(expectedColor);
    });
    it("getCleanColor should return black color with default options", function () {
        var boardOptions = { size: { x: 3, y: 3 } };
        var isBlack = true;
        var pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        var color = {
            winners: 7,
            jumps: 24,
            points: 54,
            nMoves: 24,
            startRow: 6,
            endRow: 4,
            pieces: {}
        };
        var expectedColor = {
            winners: 0,
            jumps: 0,
            points: 0,
            nMoves: 0,
            startRow: 0,
            endRow: 2,
            pieces: pieces
        };
        expect(jojColorService.getCleanColor(color, boardOptions, isBlack)).toEqual(expectedColor);
    });
});
