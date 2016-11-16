import BoardHelper from "./helpers/BoardHelper";
import PieceHelper from "./helpers/PieceHelper";
import { random } from "ptz-math";
export default class AiMedium {
    addBestMoviment(bestMoviments, positionsAHead, startPosition, nextPosition, nivel, isBlack) {
        if (!bestMoviments)
            bestMoviments = [];
        if (!bestMoviments[nivel])
            bestMoviments[nivel] = [];
        let positionsAHeadOnMoviment = BoardHelper.getY0Start7End(nextPosition.y, isBlack)
            - BoardHelper.getY0Start7End(startPosition.y, isBlack);
        let indexPositionsAHead = positionsAHead + positionsAHeadOnMoviment;
        if (!bestMoviments[nivel][indexPositionsAHead])
            bestMoviments[nivel][indexPositionsAHead] = [];
        let bestMovimentIndex = bestMoviments[nivel][indexPositionsAHead].findIndex(bestMoviment => bestMoviment.startPosition.x === startPosition.x
            && bestMoviment.startPosition.y === startPosition.y
            && bestMoviment.nextPosition.x === nextPosition.x
            && bestMoviment.nextPosition.y === nextPosition.y);
        if (bestMovimentIndex >= 0)
            return bestMoviments;
        if (indexPositionsAHead < 0)
            return bestMoviments;
        if (!bestMoviments[nivel][indexPositionsAHead])
            bestMoviments[nivel][indexPositionsAHead] = [];
        bestMoviments[nivel][indexPositionsAHead].push({
            startPosition: startPosition,
            nextPosition: nextPosition
        });
        return bestMoviments;
    }
    getBestNivel(bestMoviments) {
        let bestNivel = 0;
        for (let k = 0; k < bestMoviments.length; k++) {
            let bestMoves = bestMoviments[k];
            let bestMovesBestNivel = bestMoviments[bestNivel];
            if (bestMoves.length > bestMovesBestNivel.length
                && bestMoves[bestMoves.length - 1].length > 0)
                bestNivel = k;
        }
        return bestNivel;
    }
    fillPiecesWhereCanTheyGo(game, pieces, isBlack) {
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].whereCanIGo
                = game.board
                    .getPositionsWhereCanIGo(pieces[i], isBlack);
        }
        return pieces;
    }
    getWinPosition(winPositions, x, isBlack) {
        let winPosition = winPositions[x];
        if (winPosition && winPosition.length > 0 && winPosition[0].nextPosition) {
            for (let i = 0; i < winPosition.length; i++) {
                if (winPosition[i].nextPosition) {
                    let move = winPosition[i].nextPosition.lastMoviment
                        ? winPosition[i].nextPosition.lastMoviment
                        : winPosition[i];
                    if (BoardHelper.getY0Start7End(move.startPosition.y, isBlack) < 7)
                        return move;
                }
            }
        }
    }
    getDistance(piece, isBlack) {
        let winPositions = [];
        for (let x = 0; x < 8; x++) {
            let y = BoardHelper.getY7Start0End(piece.y, isBlack);
            let xDistance = x - piece.x;
            if (xDistance < 0)
                xDistance = xDistance * -1;
            let moviments = xDistance > y || y === 0
                ? xDistance
                : y;
            if (moviments > 1) {
                for (let i = 0; i < piece.whereCanIGo.positions.length; i++) {
                    let nextPosition = piece.whereCanIGo.positions[i];
                    let nextPositionY = BoardHelper.getY7Start0End(nextPosition.y, isBlack);
                    let nextPositionXDistance = x - nextPosition.x;
                    if (nextPositionXDistance < 0)
                        nextPositionXDistance = nextPositionXDistance * -1;
                    let nextPositionMoviments = (nextPositionXDistance > nextPositionY || nextPositionY === 0 ? nextPositionXDistance : nextPositionY) + 1;
                    if (nextPositionMoviments < moviments)
                        moviments = nextPositionMoviments;
                }
            }
            winPositions[x] = moviments < 0
                ? moviments * -1
                : moviments;
        }
        return winPositions;
    }
    getNMovimentsToWin(pieces, isBlack) {
        pieces.forEach(piece => piece.movimentsToWin = this.getDistance(piece, isBlack));
        let winPositions = [];
        for (let x = 0; x < 8; x++) {
            if (!winPositions[x])
                winPositions[x] = [];
            for (let j = 0; j < pieces.length; j++) {
                let piece = pieces[j];
                if (!winPositions[x][piece.movimentsToWin[x]])
                    winPositions[x][piece.movimentsToWin[x]] = [];
                winPositions[x][piece.movimentsToWin[x]].push(piece);
            }
        }
        return winPositions;
    }
    isGameEnding(allPieces, isBlack) {
        for (let i = 0; i < allPieces.length; i++) {
            let piece = allPieces[i];
            if (BoardHelper.getY0Start7End(piece.y, isBlack) < 4)
                return false;
        }
        return true;
    }
    getLastMovimentToWin(nMovimentsToWin) {
        for (let i = 0; i < nMovimentsToWin.length; i++) {
            if (nMovimentsToWin[i])
                return i;
        }
        return 10;
    }
    getPiecesFurtherAway(pieces, isBlack) {
        let lastMovimentToWin = -1;
        let nMovimentsToWin = this.getNMovimentsToWin(pieces, isBlack);
        for (let i = 0; i < nMovimentsToWin.length; i++) {
            let nMoves = this.getLastMovimentToWin(nMovimentsToWin[i]);
            if (nMoves > lastMovimentToWin)
                lastMovimentToWin = nMoves;
        }
        return lastMovimentToWin;
    }
    getBestMoviment(game, moves, isBlack) {
        let bestMoviment = [];
        for (let i = 0; i < moves.length; i++) {
            let gameCopy = game.getNewCopy();
            let move = moves[i];
            gameCopy.move(move.startPosition, move.nextPosition);
            let pieces = game.getColorTurn().pieces;
            pieces = this.fillPiecesWhereCanTheyGo(gameCopy, pieces, isBlack);
            let furtherPiece = this.getPiecesFurtherAway(pieces, isBlack);
            if (!bestMoviment[furtherPiece])
                bestMoviment[furtherPiece] = [];
            bestMoviment[furtherPiece].push(move);
        }
        for (let j = 0; j < bestMoviment.length; j++) {
            if (bestMoviment[j]) {
                const randomIndex = random(1, bestMoviment[j].length) - 1;
                return bestMoviment[j][randomIndex];
            }
        }
    }
    getMoveNearWinPosition(allPieces, moviments, orderedPieces, winPositions, isBlack, game) {
        let winMove = undefined;
        if (this.isGameEnding(allPieces, isBlack)) {
            if (winPositions && winPositions.length > 0) {
                winMove = this.getWinPosition(winPositions, 0, isBlack);
                if (winMove)
                    return winMove;
                winMove = this.getWinPosition(winPositions, 7, isBlack);
                if (winMove)
                    return winMove;
            }
            winMove = this.getWinPosition(winPositions, 1, isBlack);
            if (winMove)
                return winMove;
            winMove = this.getWinPosition(winPositions, 3, isBlack);
            if (winMove)
                return winMove;
            winMove = this.getWinPosition(winPositions, 5, isBlack);
            if (winMove)
                return winMove;
        }
        let winPositionEmpty = [];
        let winAndPreWinPositionEmpty = [];
        if (orderedPieces[7]) {
            for (let i = 0; i < moviments.length; i++) {
                let move = moviments[i];
                let empty = true;
                let emptyPreWin = true;
                for (let j = 0; j < orderedPieces[7].length; j++) {
                    let piece = orderedPieces[7][j];
                    if (piece && piece.x === move.nextPosition.x) {
                        empty = false;
                    }
                }
                if (orderedPieces[6])
                    for (let j = 0; j < orderedPieces[6].length; j++) {
                        let piece = orderedPieces[6][j];
                        if (piece && piece.x === move.nextPosition.x) {
                            emptyPreWin = false;
                        }
                    }
                if (empty) {
                    winPositionEmpty.push(move);
                    if (emptyPreWin)
                        winAndPreWinPositionEmpty.push(move);
                }
            }
        }
        let positions = winAndPreWinPositionEmpty.length > 0 ? winAndPreWinPositionEmpty : winPositionEmpty;
        let choosenMove = this.getBestMoviment(game, (positions.length > 0 ? positions : moviments), isBlack);
        return choosenMove;
    }
    addWinPositions(startPosition, nextPosition, winPositions, nivel, isBlack) {
        if (!nextPosition) {
            if (BoardHelper.getY0Start7End(startPosition.y, isBlack) === 7) {
                if (!winPositions[startPosition.x])
                    winPositions[startPosition.x] = [];
                for (let i = 0; i < winPositions[startPosition.x].length; i++) {
                    let winPosition = winPositions[startPosition.x][i];
                    if (winPosition.startPosition.x === startPosition.x &&
                        winPosition.startPosition.y === startPosition.y)
                        return winPositions;
                }
                winPositions[startPosition.x].push({
                    startPosition: startPosition,
                    nivel: nivel
                });
            }
        }
        else {
            if (BoardHelper.getY0Start7End(nextPosition.y, isBlack) === 7) {
                if (!winPositions[nextPosition.x])
                    winPositions[nextPosition.x] = [];
                for (let i = 0; i < winPositions[nextPosition.x].length; i++) {
                    let winPosition = winPositions[nextPosition.x][i];
                    if (winPosition.startPosition.x === startPosition.x &&
                        winPosition.startPosition.y === startPosition.y)
                        return winPositions;
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
    addBestMovimentsAfterMove(piece, startPositionY, startPositionBeforeMove, nextPositionBeforeMove, game, isBlack, bestMoviments, winPositions) {
        let gameCopy = game.getNewCopy();
        gameCopy.move(startPositionBeforeMove, nextPositionBeforeMove);
        let whereCanIGoAfterMove = gameCopy.board.getPositionsWhereCanIGo(piece, isBlack);
        if (piece.whereCanIGo.orderedPositions.length < whereCanIGoAfterMove.orderedPositions.length) {
            let higherPositions = whereCanIGoAfterMove.orderedPositions[whereCanIGoAfterMove.orderedPositions.length - 1];
            for (let p = 0; p < higherPositions.length; p++) {
                let nextPosition = higherPositions[p];
                if (nextPosition) {
                    nextPosition.lastMoviment = { startPosition: startPositionBeforeMove, nextPosition: nextPositionBeforeMove };
                    let nextPositionY = BoardHelper.getY0Start7End(nextPosition.y, isBlack);
                    bestMoviments = this.addBestMoviment(bestMoviments, (nextPositionY - startPositionY), startPositionBeforeMove, nextPositionBeforeMove, 1, isBlack);
                    winPositions = this.addWinPositions(piece, nextPosition, winPositions, 1, isBlack);
                }
            }
        }
        return bestMoviments;
    }
    getBestMove(game) {
        let pcColor = game.getColorTurn();
        let isBlack = !game.isWhiteTurn;
        let bestMoviments = [];
        let winPositions = [];
        let allPieces = this.fillPiecesWhereCanTheyGo(game, pcColor.pieces, isBlack);
        this.getNMovimentsToWin(allPieces, isBlack);
        let orderedPieces = PieceHelper.getPiecesOrdered(allPieces, isBlack);
        for (let l = 0; l < orderedPieces.length; l++) {
            if (orderedPieces[l]) {
                let pieces = orderedPieces[l];
                for (let m = 0; m < pieces.length; m++) {
                    let piece = pieces[m];
                    this.addWinPositions(piece, null, winPositions, -1, isBlack);
                    let startPositionY = BoardHelper.getY0Start7End(piece.y, isBlack);
                    let nextPositions = piece.whereCanIGo.orderedPositions[piece.whereCanIGo.orderedPositions.length - 1];
                    if (nextPositions)
                        for (let i = 0; i < nextPositions.length; i++) {
                            let nextPosition = nextPositions[i];
                            if (nextPosition) {
                                let nextPositionY = BoardHelper.getY0Start7End(nextPosition.y, isBlack);
                                bestMoviments = this.addBestMoviment(bestMoviments, (nextPositionY - startPositionY), piece, nextPosition, 0, isBlack);
                                bestMoviments = this.addBestMovimentsAfterMove(piece, startPositionY, piece, nextPosition, game, isBlack, bestMoviments, winPositions);
                                winPositions = this.addWinPositions(piece, nextPosition, winPositions, 0, isBlack);
                            }
                        }
                    if (piece.whereCanIGo.orderedPositions.length < 8) {
                        let otherPieces = PieceHelper.getOtherPieces(allPieces, piece);
                        for (let n = 0; n < otherPieces.length; n++) {
                            let otherPiece = otherPieces[n];
                            for (let o = 0; o < otherPiece.whereCanIGo.positions.length; o++) {
                                let otherPieceMove = otherPiece.whereCanIGo.positions[o];
                                bestMoviments = this.addBestMovimentsAfterMove(piece, startPositionY, otherPiece, otherPieceMove, game, isBlack, bestMoviments, winPositions);
                                winPositions = this.addWinPositions(otherPiece, otherPieceMove, winPositions, 0, isBlack);
                            }
                        }
                    }
                }
            }
        }
        let bestNivel = this.getBestNivel(bestMoviments);
        let higherBestMoviments = bestMoviments[bestNivel][bestMoviments[bestNivel].length - 1];
        let move = this.getMoveNearWinPosition(allPieces, higherBestMoviments, orderedPieces, winPositions, isBlack, game);
        return move;
    }
    getComputerMove(game) {
        if (game.ended)
            return null;
        return this.getBestMove(game);
    }
}
//# sourceMappingURL=AiMedium.js.map