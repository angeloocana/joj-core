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

    describe("isSamePositionAs",function(){
        it("true", function(){
            var position1 = new BoardPosition({x:2, y:3});
            var position2 = new BoardPosition({x:2, y:3});
            equal(position1.isSamePositionAs(position2),true);
        });

        it("false", function(){
            var position1 = new BoardPosition({x:3, y:2});
            var position2 = new BoardPosition({x:2, y:3});
            equal(position1.isSamePositionAs(position2),false);
        });
    });
});