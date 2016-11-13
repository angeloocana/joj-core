import BoardHelper from "../../helpers/BoardHelper";
import { ok } from "ptz-assert";
describe("GameBoard", function () {
    describe("isBackGroundBlack", () => {
        it("0,0 => true", function () {
            ok(BoardHelper.isBackGroundBlack(0, 0));
        });
        it("0,1 => false", function () {
            ok(!BoardHelper.isBackGroundBlack(0, 1));
        });
    });
});
//# sourceMappingURL=BoardHelper.test.js.map