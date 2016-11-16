"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BoardHelper = require("./helpers/BoardHelper");

var _BoardHelper2 = _interopRequireDefault(_BoardHelper);

var _PieceHelper = require("./helpers/PieceHelper");

var _PieceHelper2 = _interopRequireDefault(_PieceHelper);

var _ptzMath = require("ptz-math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AiMedium = function () {
    function AiMedium() {
        _classCallCheck(this, AiMedium);
    }

    _createClass(AiMedium, [{
        key: "addBestMoviment",
        value: function addBestMoviment(bestMoviments, positionsAHead, startPosition, nextPosition, nivel, isBlack) {
            if (!bestMoviments) bestMoviments = [];
            if (!bestMoviments[nivel]) bestMoviments[nivel] = [];
            var positionsAHeadOnMoviment = _BoardHelper2.default.getY0Start7End(nextPosition.y, isBlack) - _BoardHelper2.default.getY0Start7End(startPosition.y, isBlack);
            var indexPositionsAHead = positionsAHead + positionsAHeadOnMoviment;
            if (!bestMoviments[nivel][indexPositionsAHead]) bestMoviments[nivel][indexPositionsAHead] = [];
            var bestMovimentIndex = bestMoviments[nivel][indexPositionsAHead].findIndex(function (bestMoviment) {
                return bestMoviment.startPosition.x === startPosition.x && bestMoviment.startPosition.y === startPosition.y && bestMoviment.nextPosition.x === nextPosition.x && bestMoviment.nextPosition.y === nextPosition.y;
            });
            if (bestMovimentIndex >= 0) return bestMoviments;
            if (indexPositionsAHead < 0) return bestMoviments;
            if (!bestMoviments[nivel][indexPositionsAHead]) bestMoviments[nivel][indexPositionsAHead] = [];
            bestMoviments[nivel][indexPositionsAHead].push({
                startPosition: startPosition,
                nextPosition: nextPosition
            });
            return bestMoviments;
        }
    }, {
        key: "getBestNivel",
        value: function getBestNivel(bestMoviments) {
            var bestNivel = 0;
            for (var k = 0; k < bestMoviments.length; k++) {
                var bestMoves = bestMoviments[k];
                var bestMovesBestNivel = bestMoviments[bestNivel];
                if (bestMoves.length > bestMovesBestNivel.length && bestMoves[bestMoves.length - 1].length > 0) bestNivel = k;
            }
            return bestNivel;
        }
    }, {
        key: "fillPiecesWhereCanTheyGo",
        value: function fillPiecesWhereCanTheyGo(game, pieces, isBlack) {
            for (var i = 0; i < pieces.length; i++) {
                pieces[i].whereCanIGo = game.board.getPositionsWhereCanIGo(pieces[i], isBlack);
            }
            return pieces;
        }
    }, {
        key: "getWinPosition",
        value: function getWinPosition(winPositions, x, isBlack) {
            var winPosition = winPositions[x];
            if (winPosition && winPosition.length > 0 && winPosition[0].nextPosition) {
                for (var i = 0; i < winPosition.length; i++) {
                    if (winPosition[i].nextPosition) {
                        var move = winPosition[i].nextPosition.lastMoviment ? winPosition[i].nextPosition.lastMoviment : winPosition[i];
                        if (_BoardHelper2.default.getY0Start7End(move.startPosition.y, isBlack) < 7) return move;
                    }
                }
            }
        }
    }, {
        key: "getDistance",
        value: function getDistance(piece, isBlack) {
            var winPositions = [];
            for (var x = 0; x < 8; x++) {
                var y = _BoardHelper2.default.getY7Start0End(piece.y, isBlack);
                var xDistance = x - piece.x;
                if (xDistance < 0) xDistance = xDistance * -1;
                var moviments = xDistance > y || y === 0 ? xDistance : y;
                if (moviments > 1) {
                    for (var i = 0; i < piece.whereCanIGo.positions.length; i++) {
                        var nextPosition = piece.whereCanIGo.positions[i];
                        var nextPositionY = _BoardHelper2.default.getY7Start0End(nextPosition.y, isBlack);
                        var nextPositionXDistance = x - nextPosition.x;
                        if (nextPositionXDistance < 0) nextPositionXDistance = nextPositionXDistance * -1;
                        var nextPositionMoviments = (nextPositionXDistance > nextPositionY || nextPositionY === 0 ? nextPositionXDistance : nextPositionY) + 1;
                        if (nextPositionMoviments < moviments) moviments = nextPositionMoviments;
                    }
                }
                winPositions[x] = moviments < 0 ? moviments * -1 : moviments;
            }
            return winPositions;
        }
    }, {
        key: "getNMovimentsToWin",
        value: function getNMovimentsToWin(pieces, isBlack) {
            var _this = this;

            pieces.forEach(function (piece) {
                return piece.movimentsToWin = _this.getDistance(piece, isBlack);
            });
            var winPositions = [];
            for (var x = 0; x < 8; x++) {
                if (!winPositions[x]) winPositions[x] = [];
                for (var j = 0; j < pieces.length; j++) {
                    var piece = pieces[j];
                    if (!winPositions[x][piece.movimentsToWin[x]]) winPositions[x][piece.movimentsToWin[x]] = [];
                    winPositions[x][piece.movimentsToWin[x]].push(piece);
                }
            }
            return winPositions;
        }
    }, {
        key: "isGameEnding",
        value: function isGameEnding(allPieces, isBlack) {
            for (var i = 0; i < allPieces.length; i++) {
                var piece = allPieces[i];
                if (_BoardHelper2.default.getY0Start7End(piece.y, isBlack) < 4) return false;
            }
            return true;
        }
    }, {
        key: "getLastMovimentToWin",
        value: function getLastMovimentToWin(nMovimentsToWin) {
            for (var i = 0; i < nMovimentsToWin.length; i++) {
                if (nMovimentsToWin[i]) return i;
            }
            return 10;
        }
    }, {
        key: "getPiecesFurtherAway",
        value: function getPiecesFurtherAway(pieces, isBlack) {
            var lastMovimentToWin = -1;
            var nMovimentsToWin = this.getNMovimentsToWin(pieces, isBlack);
            for (var i = 0; i < nMovimentsToWin.length; i++) {
                var nMoves = this.getLastMovimentToWin(nMovimentsToWin[i]);
                if (nMoves > lastMovimentToWin) lastMovimentToWin = nMoves;
            }
            return lastMovimentToWin;
        }
    }, {
        key: "getBestMoviment",
        value: function getBestMoviment(game, moves, isBlack) {
            var bestMoviment = [];
            for (var i = 0; i < moves.length; i++) {
                var gameCopy = game.getNewCopy();
                var move = moves[i];
                gameCopy.move(move.startPosition, move.nextPosition);
                var pieces = game.getColorTurn().pieces;
                pieces = this.fillPiecesWhereCanTheyGo(gameCopy, pieces, isBlack);
                var furtherPiece = this.getPiecesFurtherAway(pieces, isBlack);
                if (!bestMoviment[furtherPiece]) bestMoviment[furtherPiece] = [];
                bestMoviment[furtherPiece].push(move);
            }
            for (var j = 0; j < bestMoviment.length; j++) {
                if (bestMoviment[j]) {
                    var randomIndex = (0, _ptzMath.random)(1, bestMoviment[j].length) - 1;
                    return bestMoviment[j][randomIndex];
                }
            }
        }
    }, {
        key: "getMoveNearWinPosition",
        value: function getMoveNearWinPosition(allPieces, moviments, orderedPieces, winPositions, isBlack, game) {
            var winMove = undefined;
            if (this.isGameEnding(allPieces, isBlack)) {
                if (winPositions && winPositions.length > 0) {
                    winMove = this.getWinPosition(winPositions, 0, isBlack);
                    if (winMove) return winMove;
                    winMove = this.getWinPosition(winPositions, 7, isBlack);
                    if (winMove) return winMove;
                }
                winMove = this.getWinPosition(winPositions, 1, isBlack);
                if (winMove) return winMove;
                winMove = this.getWinPosition(winPositions, 3, isBlack);
                if (winMove) return winMove;
                winMove = this.getWinPosition(winPositions, 5, isBlack);
                if (winMove) return winMove;
            }
            var winPositionEmpty = [];
            var winAndPreWinPositionEmpty = [];
            if (orderedPieces[7]) {
                for (var i = 0; i < moviments.length; i++) {
                    var move = moviments[i];
                    var empty = true;
                    var emptyPreWin = true;
                    for (var j = 0; j < orderedPieces[7].length; j++) {
                        var piece = orderedPieces[7][j];
                        if (piece && piece.x === move.nextPosition.x) {
                            empty = false;
                        }
                    }
                    if (orderedPieces[6]) for (var _j = 0; _j < orderedPieces[6].length; _j++) {
                        var _piece = orderedPieces[6][_j];
                        if (_piece && _piece.x === move.nextPosition.x) {
                            emptyPreWin = false;
                        }
                    }
                    if (empty) {
                        winPositionEmpty.push(move);
                        if (emptyPreWin) winAndPreWinPositionEmpty.push(move);
                    }
                }
            }
            var positions = winAndPreWinPositionEmpty.length > 0 ? winAndPreWinPositionEmpty : winPositionEmpty;
            var choosenMove = this.getBestMoviment(game, positions.length > 0 ? positions : moviments, isBlack);
            return choosenMove;
        }
    }, {
        key: "addWinPositions",
        value: function addWinPositions(startPosition, nextPosition, winPositions, nivel, isBlack) {
            if (!nextPosition) {
                if (_BoardHelper2.default.getY0Start7End(startPosition.y, isBlack) === 7) {
                    if (!winPositions[startPosition.x]) winPositions[startPosition.x] = [];
                    for (var i = 0; i < winPositions[startPosition.x].length; i++) {
                        var winPosition = winPositions[startPosition.x][i];
                        if (winPosition.startPosition.x === startPosition.x && winPosition.startPosition.y === startPosition.y) return winPositions;
                    }
                    winPositions[startPosition.x].push({
                        startPosition: startPosition,
                        nivel: nivel
                    });
                }
            } else {
                if (_BoardHelper2.default.getY0Start7End(nextPosition.y, isBlack) === 7) {
                    if (!winPositions[nextPosition.x]) winPositions[nextPosition.x] = [];
                    for (var _i = 0; _i < winPositions[nextPosition.x].length; _i++) {
                        var _winPosition = winPositions[nextPosition.x][_i];
                        if (_winPosition.startPosition.x === startPosition.x && _winPosition.startPosition.y === startPosition.y) return winPositions;
                    }
                    winPositions[nextPosition.x].push({
                        startPosition: startPosition,
                        nextPosition: nextPosition,
                        nivel: nivel
                    });
                }
            }
            return winPositions;
        }
    }, {
        key: "addBestMovimentsAfterMove",
        value: function addBestMovimentsAfterMove(piece, startPositionY, startPositionBeforeMove, nextPositionBeforeMove, game, isBlack, bestMoviments, winPositions) {
            var gameCopy = game.getNewCopy();
            gameCopy.move(startPositionBeforeMove, nextPositionBeforeMove);
            var whereCanIGoAfterMove = gameCopy.board.getPositionsWhereCanIGo(piece, isBlack);
            if (piece.whereCanIGo.orderedPositions.length < whereCanIGoAfterMove.orderedPositions.length) {
                var higherPositions = whereCanIGoAfterMove.orderedPositions[whereCanIGoAfterMove.orderedPositions.length - 1];
                for (var p = 0; p < higherPositions.length; p++) {
                    var nextPosition = higherPositions[p];
                    if (nextPosition) {
                        nextPosition.lastMoviment = { startPosition: startPositionBeforeMove, nextPosition: nextPositionBeforeMove };
                        var nextPositionY = _BoardHelper2.default.getY0Start7End(nextPosition.y, isBlack);
                        bestMoviments = this.addBestMoviment(bestMoviments, nextPositionY - startPositionY, startPositionBeforeMove, nextPositionBeforeMove, 1, isBlack);
                        winPositions = this.addWinPositions(piece, nextPosition, winPositions, 1, isBlack);
                    }
                }
            }
            return bestMoviments;
        }
    }, {
        key: "getBestMove",
        value: function getBestMove(game) {
            var pcColor = game.getColorTurn();
            var isBlack = !game.isWhiteTurn;
            var bestMoviments = [];
            var winPositions = [];
            var allPieces = this.fillPiecesWhereCanTheyGo(game, pcColor.pieces, isBlack);
            this.getNMovimentsToWin(allPieces, isBlack);
            var orderedPieces = _PieceHelper2.default.getPiecesOrdered(allPieces, isBlack);
            for (var l = 0; l < orderedPieces.length; l++) {
                if (orderedPieces[l]) {
                    var pieces = orderedPieces[l];
                    for (var m = 0; m < pieces.length; m++) {
                        var piece = pieces[m];
                        this.addWinPositions(piece, null, winPositions, -1, isBlack);
                        var startPositionY = _BoardHelper2.default.getY0Start7End(piece.y, isBlack);
                        var nextPositions = piece.whereCanIGo.orderedPositions[piece.whereCanIGo.orderedPositions.length - 1];
                        if (nextPositions) for (var i = 0; i < nextPositions.length; i++) {
                            var nextPosition = nextPositions[i];
                            if (nextPosition) {
                                var nextPositionY = _BoardHelper2.default.getY0Start7End(nextPosition.y, isBlack);
                                bestMoviments = this.addBestMoviment(bestMoviments, nextPositionY - startPositionY, piece, nextPosition, 0, isBlack);
                                bestMoviments = this.addBestMovimentsAfterMove(piece, startPositionY, piece, nextPosition, game, isBlack, bestMoviments, winPositions);
                                winPositions = this.addWinPositions(piece, nextPosition, winPositions, 0, isBlack);
                            }
                        }
                        if (piece.whereCanIGo.orderedPositions.length < 8) {
                            var otherPieces = _PieceHelper2.default.getOtherPieces(allPieces, piece);
                            for (var n = 0; n < otherPieces.length; n++) {
                                var otherPiece = otherPieces[n];
                                for (var o = 0; o < otherPiece.whereCanIGo.positions.length; o++) {
                                    var otherPieceMove = otherPiece.whereCanIGo.positions[o];
                                    bestMoviments = this.addBestMovimentsAfterMove(piece, startPositionY, otherPiece, otherPieceMove, game, isBlack, bestMoviments, winPositions);
                                    winPositions = this.addWinPositions(otherPiece, otherPieceMove, winPositions, 0, isBlack);
                                }
                            }
                        }
                    }
                }
            }
            var bestNivel = this.getBestNivel(bestMoviments);
            var higherBestMoviments = bestMoviments[bestNivel][bestMoviments[bestNivel].length - 1];
            var move = this.getMoveNearWinPosition(allPieces, higherBestMoviments, orderedPieces, winPositions, isBlack, game);
            return move;
        }
    }, {
        key: "getComputerMove",
        value: function getComputerMove(game) {
            if (game.ended) return null;
            return this.getBestMove(game);
        }
    }]);

    return AiMedium;
}();

exports.default = AiMedium;