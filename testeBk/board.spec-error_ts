describe("jojBoardService", function() {
    var jojBoardService = {};

    beforeEach(module("jojApp"));
    beforeEach(inject(function(_jojBoardService_) {
        jojBoardService = _jojBoardService_;
    }));

    it("isBackGroundBlack should return true", function() {
        expect(jojBoardService.isBackGroundBlack(0, 0)).toEqual(true);
    });

    it("isBackGroundBlack should return false", function() {
        expect(jojBoardService.isBackGroundBlack(0, 1)).toEqual(false);
    });

    it("fillPiecesOnBoard should return board filled whith pieces", function() {
        var board = [[{}, {}]];
        var pieces = [{ x: 0, y: 0 }, { x: 0, y: 1 }];

        var boardFilled = [[{ piece: 1 }, { piece: 1 }]];

        //console.log(angular.mock.dump(boardFilled));
        expect(jojBoardService.fillPiecesOnBoard(board, pieces, 1)).toEqual(boardFilled);
    });

    it("generateBoard should return board filled whith pieces", function() {
        var game = {
            boardOptions: {
                size: {
                    x: 1,
                    y: 2
                }
            },
            white: {
                pieces: [{ x: 0, y: 0 }]
            },
            black: {
                pieces: [{ x: 0, y: 1 }]
            }
        };
        var board = [
            [
                { x: 0, y: 0, backgroundBlack: true, whiteHome: false, blackHome: true, piece: 1 },
                { x: 0, y: 1, backgroundBlack: false, whiteHome: true, blackHome: false, piece: 0 }
            ]
        ];

        //console.log(angular.mock.dump(board));
        expect(jojBoardService.generateBoard(game)).toEqual(board);
    });

    var boardOptions = { size: { x: 2, y: 3 } };

    it("boardHasThisPosition x1 y1 should return true", function() {
        var position = { x: 1, y: 1 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(true);
    });

    it("boardHasThisPosition x-1 y0 should return false", function() {
        var position = { x: -1, y: 0 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(false);
    });

    it("boardHasThisPosition x0 y-1 should return false", function() {
        var position = { x: 0, y: -1 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(false);
    });

    it("boardHasThisPosition x-1 y-1 should return false", function() {
        var position = { x: -1, y: -1 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(false);
    });

    it("boardHasThisPosition x8 y1 should return false", function() {
        var position = { x: 8, y: 1 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(false);
    });

    it("boardHasThisPosition x1 y-8 should return false", function() {
        var position = { x: 1, y: 8 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(false);
    });

    it("boardHasThisPosition x8 y8 should return false", function() {
        var position = { x: 8, y: 8 };
        expect(jojBoardService.boardHasThisPosition(position, boardOptions)).toEqual(false);
    });

    it("getPosition x2 y3 should return position", function() {
        var position = {
            x: 2,
            y: 3,
            piece: 1
        };
        var board = [];
        board[2] = [];
        board[2][3] = position;

        expect(jojBoardService.getPosition(position, board)).toEqual(position);
    });

    it("isPositionEmpty x2 y3 should return false for white piece", function() {
        var position = {
            x: 2,
            y: 3,
            piece: 1
        };
        var board = [];
        board[2] = [];
        board[2][3] = position;

        expect(jojBoardService.isPositionEmpty(position, board)).toBe(false);
    });

    it("isPositionEmpty x2 y3 should return false for black piece", function() {
        var position = {
            x: 2,
            y: 3,
            piece: 0
        };
        var board = [];
        board[2] = [];
        board[2][3] = position;

        expect(jojBoardService.isPositionEmpty(position, board)).toBe(false);
    });

    it("isPositionEmpty x2 y3 should return true", function() {
        var position = {
            x: 2,
            y: 3,
            piece: -1
        };
        var board = [];
        board[2] = [];
        board[2][3] = position;

        expect(jojBoardService.isPositionEmpty(position, board)).toBe(true);
    });

    var getGame = function() {
        return {
            "boardOptions": {
                "size": {
                    "x": 8,
                    "y": 8
                }
            },
            "white": {
                "pieces": [
                    {
                        "x": 0,
                        "y": 7
                    },
                    {
                        "x": 1,
                        "y": 7
                    },
                    {
                        "x": 2,
                        "y": 7
                    },
                    {
                        "x": 3,
                        "y": 7
                    },
                    {
                        "x": 4,
                        "y": 7
                    },
                    {
                        "x": 5,
                        "y": 7
                    },
                    {
                        "x": 6,
                        "y": 7
                    },
                    {
                        "x": 7,
                        "y": 7
                    }
                ],
                "winners": 0,
                "jumps": 0,
                "points": 0,
                "nMoves": 0,
                "startRow": 7,
                "endRow": 0
            },
            "black": {
                "pieces": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 1,
                        "y": 0
                    },
                    {
                        "x": 2,
                        "y": 1
                    },
                    {
                        "x": 3,
                        "y": 0
                    },
                    {
                        "x": 4,
                        "y": 0
                    },
                    {
                        "x": 5,
                        "y": 0
                    },
                    {
                        "x": 6,
                        "y": 0
                    },
                    {
                        "x": 7,
                        "y": 0
                    }
                ],
                "winners": 0,
                "jumps": 0,
                "points": 0,
                "nMoves": 0,
                "startRow": 0,
                "endRow": 7
            },
            "movements": [],
            "ended": false,
            "whiteTurn": true,
            "board": [
                [
                    {
                        "x": 0,
                        "y": 0,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 0,
                        "y": 1,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 0,
                        "y": 2,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 0,
                        "y": 3,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 0,
                        "y": 4,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 0,
                        "y": 5,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 0,
                        "y": 6,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 0,
                        "y": 7,
                        "backgroundBlack": false,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 1,
                        "y": 0,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 1,
                        "y": 1,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 1,
                        "y": 2,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 1,
                        "y": 3,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 1,
                        "y": 4,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 1,
                        "y": 5,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 1,
                        "y": 6,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 1,
                        "y": 7,
                        "backgroundBlack": true,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 2,
                        "y": 0,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": -1
                    },
                    {
                        "x": 2,
                        "y": 1,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": 0
                    },
                    {
                        "x": 2,
                        "y": 2,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 2,
                        "y": 3,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 2,
                        "y": 4,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 2,
                        "y": 5,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 2,
                        "y": 6,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 2,
                        "y": 7,
                        "backgroundBlack": false,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 3,
                        "y": 0,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 3,
                        "y": 1,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 3,
                        "y": 2,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 3,
                        "y": 3,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 3,
                        "y": 4,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 3,
                        "y": 5,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 3,
                        "y": 6,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 3,
                        "y": 7,
                        "backgroundBlack": true,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 4,
                        "y": 0,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 4,
                        "y": 1,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 4,
                        "y": 2,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 4,
                        "y": 3,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 4,
                        "y": 4,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 4,
                        "y": 5,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 4,
                        "y": 6,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 4,
                        "y": 7,
                        "backgroundBlack": false,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 5,
                        "y": 0,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 5,
                        "y": 1,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 5,
                        "y": 2,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 5,
                        "y": 3,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 5,
                        "y": 4,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 5,
                        "y": 5,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 5,
                        "y": 6,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 5,
                        "y": 7,
                        "backgroundBlack": true,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 6,
                        "y": 0,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 6,
                        "y": 1,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 6,
                        "y": 2,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 6,
                        "y": 3,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 6,
                        "y": 4,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 6,
                        "y": 5,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 6,
                        "y": 6,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 6,
                        "y": 7,
                        "backgroundBlack": false,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ],
                [
                    {
                        "x": 7,
                        "y": 0,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": true,
                        "piece": 0
                    },
                    {
                        "x": 7,
                        "y": 1,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 7,
                        "y": 2,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 7,
                        "y": 3,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 7,
                        "y": 4,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 7,
                        "y": 5,
                        "backgroundBlack": true,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 7,
                        "y": 6,
                        "backgroundBlack": false,
                        "whiteHome": false,
                        "blackHome": false,
                        "piece": -1
                    },
                    {
                        "x": 7,
                        "y": 7,
                        "backgroundBlack": true,
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ]
            ]
        }
    };

    it("getNearPositions onlyEmpty equal false should return only filled near positions", function () {
        var onlyEmpty = false;
        var positions = [{ x: 6, y: 7 }];
        var position = {
            x:7,y:7
        };
        
        console.log(angular.mock.dump(jojBoardService.getNearPositions(position, onlyEmpty, getGame())));
        expect(jojBoardService.getNearPositions(position, onlyEmpty, getGame())).toEqual(positions);
    });

    it("getNearPositions onlyEmpty equal true should return all empty near positions", function () {
        var onlyEmpty = true;
        var positions = [{ x: 6, y: 6 }, { x: 7, y: 6 }];
        var position = {
            x: 7, y: 7
        };

        console.log(angular.mock.dump(jojBoardService.getNearPositions(position, onlyEmpty, getGame())));
        expect(jojBoardService.getNearPositions(position, onlyEmpty, getGame())).toEqual(positions);
    });

    it("getNearPositions onlyEmpty equal undefined should return all near positions", function () {
        var onlyEmpty = undefined;
        var positions = [{ x: 6, y: 6 }, { x: 7, y: 6 },{ x: 6, y: 7 }];
        var position = {
            x: 7, y: 7
        };

        console.log(angular.mock.dump(jojBoardService.getNearPositions(position, onlyEmpty, getGame())));
        expect(jojBoardService.getNearPositions(position, onlyEmpty, getGame())).toEqual(positions);
    });

    it("getJumpPosition should return the jumpPosition", function () {
        var startPosition = {
            "x": 0,
            "y": 0
        };

        var toJumpPosition = {
            "x": 1,
            "y": 0
        };

        var jumpPosition = {
            "x": 2,
            "y": 0
        };

        expect(jojBoardService.getJumpPosition(startPosition, toJumpPosition, getGame())).toEqual(jumpPosition);
    });

    it("getJumpPosition should return undefined because position is not empty", function () {
        var startPosition = {
            "x": 3,
            "y": 0
        };

        var toJumpPosition = {
            "x": 4,
            "y": 0
        };

        var jumpPosition = undefined;

        expect(jojBoardService.getJumpPosition(startPosition, toJumpPosition, getGame())).toEqual(jumpPosition);
    });

    it("isPositionNotAdded should return true", function () {
        var position = {
            "x": 5,
            "y": 2
        };

        var positions = [{
            "x": 4,
            "y": 0
        }, {
            "x": 3,
            "y": 0
        }];

        var jumpPosition = undefined;

        expect(jojBoardService.isPositionNotAdded(position, positions)).toBe(true);
    });

    it("isPositionNotAdded should return false", function () {
        var position = {
            "x": 3,
            "y": 0
        };

        var positions = [{
            "x": 4,
            "y": 0
        }, {
            "x": 3,
            "y": 0
        }];

        var jumpPosition = undefined;

        expect(jojBoardService.isPositionNotAdded(position, positions)).toBe(false);
    });
    
    it("getY0Start7End for white y2 should return 5", function () {
        var y = 2;
        var isBlack = false;

        expect(jojBoardService.getY0Start7End(y, isBlack)).toBe(5);
    });

    it("getY0Start7End for black y2 should return 2", function () {
        var y = 2;
        var isBlack = true;

        expect(jojBoardService.getY0Start7End(y, isBlack)).toBe(2);
    });

    it("getY7Start0End for white y2 should return 2", function () {
        var y = 2;
        var isBlack = false;

        expect(jojBoardService.getY7Start0End(y, isBlack)).toBe(2);
    });

    it("getY7Start0End for black y2 should return 5", function () {
        var y = 2;
        var isBlack = true;

        expect(jojBoardService.getY7Start0End(y, isBlack)).toBe(5);
    });
});