import Game from '../game';
import {ok} from "assert";

describe("Game", function () {
    let game:IGame;

    describe("needToValidateMovements", ()=>{
        it("when null should validate");
        it("when undefined should validate");
        it("when true should validate");
        it("when false should NOT validate");
    });

    describe("Game ended", ()=>{
        beforeEach(()=>{
            game = new Game();
        });

        it("isComputerTurn() should return false", function () {
             let isComputerTurn = game.isComputerTurn();
             ok(!isComputerTurn);
        });
    });
});