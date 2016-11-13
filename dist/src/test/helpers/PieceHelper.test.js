import { equal, deepEqual, ok } from "assert";
import PieceHelper from "../../helpers/PieceHelper";
describe("PieceHelper", function () {
    it("getStartPieces should return pieces in start positions", function () {
        let boardOptions = { size: { x: 3, y: 3 } };
        let row = 0;
        let pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        deepEqual(PieceHelper.getStartPieces(boardOptions, row), pieces);
    });
    it("isBlackPiece should return true", function () {
        let position = {
            piece: "BLACK",
            x: 0,
            y: 0
        };
        ok(PieceHelper.isBlackPiece(position));
    });
    it("isBlackPiece should return false", function () {
        let position = {
            piece: "WHITE",
            x: 0,
            y: 0
        };
        ok(!PieceHelper.isBlackPiece(position));
    });
    it("isBlackPiece should return null", function () {
        let position = {
            piece: null,
            x: 0,
            y: 0
        };
        equal(PieceHelper.isBlackPiece(position), null);
    });
});
//# sourceMappingURL=PieceHelper.test.js.map