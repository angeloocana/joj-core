import BoardPosition from "../BoardPosition";
import GamePieceType from "../GamePieceType";
import {equal} from "ptz-assert";

describe("BoardPosition", function () {
    describe("New", function () {
        var position:IBoardPosition;

        beforeEach(function () {
            position = new BoardPosition({x:0,y:0});
        });

        it("x", function () {

        })
    });

    describe("isBlackPiece", function(){
        var position:IBoardPosition;

        beforeEach(function () {
            position = new BoardPosition({x:0,y:0});
        });

        it("true",function(){
            position.piece = GamePieceType.black;
            var actual = position.isBlackPiece();
            equal(actual,true);
        });

        it("false",function(){
            position.piece = GamePieceType.white;
            var actual = position.isBlackPiece();
            equal(actual,false);
        });

        it("null",function(){
            position.piece = null;
            var actual = position.isBlackPiece();
            equal(actual,null);
        });
    });
});