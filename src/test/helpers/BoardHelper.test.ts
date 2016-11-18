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

    
    // it("generateBoard should return board filled whith pieces", function () {
    //     var game = {
    //         boardOptions: {
    //             size: {
    //                 x: 1,
    //                 y: 2
    //             }
    //         },
    //         white: {
    //             pieces: [{ x: 0, y: 0 }]
    //         },
    //         black: {
    //             pieces: [{ x: 0, y: 1 }]
    //         }
    //     };
    //     var board = [
    //         [
    //             { x: 0, y: 0, backgroundBlack: true, whiteHome: false, blackHome: true, piece: 1 },
    //             { x: 0, y: 1, backgroundBlack: false, whiteHome: true, blackHome: false, piece: 0 }
    //         ]
    //     ];

    //     //console.log(angular.mock.dump(board));
    //     expect(jojBoardService.generateBoard(game)).toEqual(board);
    // });


    // it("getJumpPosition should return the jumpPosition", function () {
    //     var startPosition = {
    //         "x": 0,
    //         "y": 0
    //     };

    //     var toJumpPosition = {
    //         "x": 1,
    //         "y": 0
    //     };

    //     var jumpPosition = {
    //         "x": 2,
    //         "y": 0
    //     };

    //     expect(jojBoardService.getJumpPosition(startPosition, toJumpPosition, getGame())).toEqual(jumpPosition);
    // });

    // it("getJumpPosition should return undefined because position is not empty", function () {
    //     var startPosition = {
    //         "x": 3,
    //         "y": 0
    //     };

    //     var toJumpPosition = {
    //         "x": 4,
    //         "y": 0
    //     };

    //     var jumpPosition = undefined;

    //     expect(jojBoardService.getJumpPosition(startPosition, toJumpPosition, getGame())).toEqual(jumpPosition);
    // });

    // it("isPositionNotAdded should return true", function () {
    //     var position = {
    //         "x": 5,
    //         "y": 2
    //     };

    //     var positions = [{
    //         "x": 4,
    //         "y": 0
    //     }, {
    //         "x": 3,
    //         "y": 0
    //     }];

    //     var jumpPosition = undefined;

    //     expect(jojBoardService.isPositionNotAdded(position, positions)).toBe(true);
    // });

    // it("isPositionNotAdded should return false", function () {
    //     var position = {
    //         "x": 3,
    //         "y": 0
    //     };

    //     var positions = [{
    //         "x": 4,
    //         "y": 0
    //     }, {
    //         "x": 3,
    //         "y": 0
    //     }];

    //     var jumpPosition = undefined;

    //     expect(jojBoardService.isPositionNotAdded(position, positions)).toBe(false);
    // });

    // it("getY0Start7End for white y2 should return 5", function () {
    //     var y = 2;
    //     var isBlack = false;

    //     expect(jojBoardService.getY0Start7End(y, isBlack)).toBe(5);
    // });

    // it("getY0Start7End for black y2 should return 2", function () {
    //     var y = 2;
    //     var isBlack = true;

    //     expect(jojBoardService.getY0Start7End(y, isBlack)).toBe(2);
    // });

    // it("getY7Start0End for white y2 should return 2", function () {
    //     var y = 2;
    //     var isBlack = false;

    //     expect(jojBoardService.getY7Start0End(y, isBlack)).toBe(2);
    // });

    // it("getY7Start0End for black y2 should return 5", function () {
    //     var y = 2;
    //     var isBlack = true;

    //     expect(jojBoardService.getY7Start0End(y, isBlack)).toBe(5);
    // });
});