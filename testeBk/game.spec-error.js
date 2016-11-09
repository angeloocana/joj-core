describe("jojGameService", function () {
    var jojGameService = {};
    beforeEach(module("jojApp"));
    beforeEach(inject(function (_jojGameService_) {
        jojGameService = _jojGameService_;
    }));
    it("isComputerTurn game ended return false", function () {
        var game = {
            ended: true
        };
        expect(jojGameService.isComputerTurn(game)).toBe(false);
    });
    it("isComputerTurn game vsComputer false return false", function () {
        var game = {
            ended: false,
            players: {
                vsComputer: false
            }
        };
        expect(jojGameService.isComputerTurn(game)).toBe(false);
    });
    it("isComputerTurn game vsComputer:true whiteTurn:false computerIsWhite:false return true", function () {
        var game = {
            ended: false,
            whiteTurn: false,
            players: {
                vsComputer: true,
                computerIsWhite: false
            }
        };
        expect(jojGameService.isComputerTurn(game)).toBe(true);
    });
    it("isComputerTurn game vsComputer:true whiteTurn:true computerIsWhite:true return true", function () {
        var game = {
            ended: false,
            whiteTurn: true,
            players: {
                vsComputer: true,
                computerIsWhite: true
            }
        };
        expect(jojGameService.isComputerTurn(game)).toBe(true);
    });
    it("isComputerTurn game vsComputer:true whiteTurn:true computerIsWhite:false return false", function () {
        var game = {
            ended: false,
            whiteTurn: true,
            players: {
                vsComputer: true,
                computerIsWhite: false
            }
        };
        expect(jojGameService.isComputerTurn(game)).toBe(false);
    });
    it("isComputerTurn game vsComputer:true whiteTurn:false computerIsWhite:true return false", function () {
        var game = {
            ended: false,
            whiteTurn: false,
            players: {
                vsComputer: true,
                computerIsWhite: true
            }
        };
        expect(jojGameService.isComputerTurn(game)).toBe(false);
    });
    it("getCleanGame should return a new clean game", function () {
        var game = {
            "boardOptions": {
                "size": {
                    "x": 1,
                    "y": 2
                }
            },
            "white": {
                "pieces": [
                    {
                        "x": 5,
                        "y": 21
                    }
                ],
                "winners": 4,
                "jumps": 3,
                "points": 54,
                "nMoves": 3,
                "startRow": 5,
                "endRow": 3
            },
            "black": {
                "pieces": [
                    {
                        "x": 4,
                        "y": 2
                    }
                ],
                "winners": 45,
                "jumps": 35,
                "points": 532,
                "nMoves": 3,
                "startRow": 54,
                "endRow": 235
            },
            "movements": [3, 2, 4, 5],
            "ended": true,
            "whiteTurn": false
        };
        var expectedGame = {
            "boardOptions": {
                "size": {
                    "x": 1,
                    "y": 2
                }
            },
            "white": {
                "pieces": [
                    {
                        "x": 0,
                        "y": 1
                    }
                ],
                "winners": 0,
                "jumps": 0,
                "points": 0,
                "nMoves": 0,
                "startRow": 1,
                "endRow": 0
            },
            "black": {
                "pieces": [
                    {
                        "x": 0,
                        "y": 0
                    }
                ],
                "winners": 0,
                "jumps": 0,
                "points": 0,
                "nMoves": 0,
                "startRow": 0,
                "endRow": 1
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
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ]
            ],
            "computerTurn": undefined
        };
        expect(jojGameService.getCleanGame(game)).toEqual(expectedGame);
    });
    it("resetGame should return a new clean game with the new players", function () {
        var players = {
            white: { name: "PC", foto: "http://jojsc.azurewebsites.net/img/pc.png" },
            black: { name: "You", foto: "http://jojsc.azurewebsites.net/img/white_user.png" },
            vsComputer: true,
            computerIsWhite: true
        };
        var game = {
            "boardOptions": {
                "size": {
                    "x": 1,
                    "y": 2
                }
            },
            "white": {
                "pieces": [
                    {
                        "x": 5,
                        "y": 21
                    }
                ],
                "winners": 4,
                "jumps": 3,
                "points": 54,
                "nMoves": 3,
                "startRow": 5,
                "endRow": 3
            },
            "black": {
                "pieces": [
                    {
                        "x": 4,
                        "y": 2
                    }
                ],
                "winners": 45,
                "jumps": 35,
                "points": 532,
                "nMoves": 3,
                "startRow": 54,
                "endRow": 235
            },
            "movements": [3, 2, 4, 5],
            "ended": true,
            "whiteTurn": true,
            players: players
        };
        var expectedGame = {
            "boardOptions": {
                "size": {
                    "x": 1,
                    "y": 2
                }
            },
            "white": {
                "pieces": [
                    {
                        "x": 0,
                        "y": 1
                    }
                ],
                "winners": 0,
                "jumps": 0,
                "points": 0,
                "nMoves": 0,
                "startRow": 1,
                "endRow": 0
            },
            "black": {
                "pieces": [
                    {
                        "x": 0,
                        "y": 0
                    }
                ],
                "winners": 0,
                "jumps": 0,
                "points": 0,
                "nMoves": 0,
                "startRow": 0,
                "endRow": 1
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
                        "whiteHome": true,
                        "blackHome": false,
                        "piece": 1
                    }
                ]
            ],
            players: players,
            "computerTurn": true
        };
        expect(jojGameService.resetGame(game, players)).toEqual(expectedGame);
    });
    it("backMove offline game", function () {
        var players = {
            white: { name: "Angelo", foto: "img/black_user.png" },
            black: { name: "Gabi", foto: "img/white_user.png" },
            vsComputer: false,
            computerIsWhite: false
        };
        var game = jojGameService.newGame(null, players);
        game = jojGameService.move(game, { x: 2, y: 7 }, { x: 2, y: 6 });
        var gameBeforeLastMove = JSON.parse(JSON.stringify(game));
        game = jojGameService.move(game, { x: 2, y: 0 }, { x: 2, y: 1 });
        expect(jojGameService.backMove(game).movements).toEqual(gameBeforeLastMove.movements);
    });
    it("backMove vsComputer game", function () {
        var players = {
            white: { name: "Angelo", foto: "img/black_user.png" },
            black: { name: "Gabi", foto: "img/white_user.png" },
            vsComputer: true,
            computerIsWhite: false
        };
        var game = jojGameService.newGame(null, players);
        game = jojGameService.move(game, { x: 2, y: 7 }, { x: 2, y: 6 });
        game = jojGameService.move(game, { x: 2, y: 0 }, { x: 2, y: 1 });
        var gameBeforeLastMove = JSON.parse(JSON.stringify(game));
        game = jojGameService.move(game, { x: 2, y: 6 }, { x: 2, y: 5 });
        game = jojGameService.move(game, { x: 2, y: 1 }, { x: 2, y: 2 });
        expect(jojGameService.backMove(game).movements).toEqual(gameBeforeLastMove.movements);
    });
});
