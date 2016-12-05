import { equal, deepEqual, ok } from "ptz-assert";
import PieceHelper from "../../helpers/PieceHelper";

describe("PieceHelper", function () {

    it("getStartPieces should return pieces in start positions", function () {
        let boardOptions: IBoardOptions = { size: { x: 3, y: 3 } };
        let row = 0;
        let pieces = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];

        deepEqual(PieceHelper.getStartPieces(boardOptions, row), pieces);
    });    
});