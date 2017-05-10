import { compose, not } from 'ramda';
import { defaultBoardConf, getBoardAfterMove, getCleanBoardWhereCanIGo, getInitialBoard, getPositionsWhereCanIGo, setWhereCanIGo } from './Board';
import { colorWin, createGameColor, getColorAfterMove, getColorScore } from './GameColor';
import { isComputer } from './Player';
import { createPlayers } from './Players';
import { hasBlackPiece, hasWhitePiece, isSamePositionAs } from './Position';
function createGame(args) {
    const boardConf = args.boardConf || defaultBoardConf;
    const { board, blackPieces, whitePieces } = getInitialBoard(boardConf);
    const game = {
        ended: false,
        movements: args.movements || [],
        players: createPlayers(args.players),
        boardConf,
        white: createGameColor(boardConf, false, whitePieces),
        black: createGameColor(boardConf, true, blackPieces),
        board
    };
    return game;
}
function getCleanGameToSaveOnServer(game) {
    const cleanGame = {
        ended: game.ended,
        movements: [],
        blackWin: game.blackWin
    };
    cleanGame.movements = game.movements.map(move => {
        const from = { x: move.from.x, y: move.from.y };
        const to = { x: move.to.x, y: move.to.y };
        return { from, to };
    });
    return cleanGame;
}
function getWinner(game) {
    game.white.score = getColorScore(game.white);
    game.black.score = getColorScore(game.black);
    if (colorWin(game.white))
        game.blackWin = false;
    else if (colorWin(game.black))
        game.blackWin = true;
    return game;
}
function isMyTurn(game, from) {
    if (game.ended)
        return false;
    return isWhiteTurn(game) ? hasWhitePiece(from) : hasBlackPiece(from);
}
function getGameWhereCanIGo(game, from) {
    game.board = getCleanBoardWhereCanIGo(game.board);
    if (!isMyTurn(game, from))
        return game;
    game.board = setWhereCanIGo(game.board, from, hasBlackPiece(from));
}
function isWhiteTurn(game) {
    return game.movements.length % 2 === 0;
}
const isBlackTurn = compose(not, isWhiteTurn);
function getColorTurn(game) {
    return isWhiteTurn(game) ? game.white : game.black;
}
function getPlayerTurn(game) {
    return isWhiteTurn(game) ? game.players.white : game.players.black;
}
function setPlayers(players) {
    // Validate Players
    this.players = players;
}
function setMovements(movements = [], needToValidateMovements = true) {
    // Validate Movements
    // if(needToValidateMovements)
    this.movements = movements;
    // This must be called in another place
    // this.board.fillAllPiecesOnBoard(this.white.pieces, this.black.pieces);
}
function canMove(game, move) {
    const positionsWhereCanIGo = getPositionsWhereCanIGo(game.board, move.from, isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(position => position.x === move.to.x
        && position.y === move.to.y) >= 0;
}
function getGameAfterMove(game, move, backMove = false) {
    if (isSamePositionAs(move.from, move.to))
        throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
    game.board = getCleanBoardWhereCanIGo(game.board);
    if (!backMove)
        if (!canMove(game, move))
            throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = getBoardAfterMove(game.board, move);
    game.black = getColorAfterMove(game.black, move);
    game.white = getColorAfterMove(game.white, move);
    if (!backMove) {
        game.movements.push(move);
        game = getWinner(game);
    }
    return game;
}
function getBackMove(move) {
    return {
        from: move.to,
        to: move.from
    };
}
function getGameBeforeLastMove(game) {
    let lastMove = game.movements.pop();
    if (lastMove)
        game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (isComputer(getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
export { canMove, createGame, getBackMove, getColorTurn, getPlayerTurn, getWinner, getGameWhereCanIGo, getGameAfterMove, getGameBeforeLastMove, setPlayers, setMovements, getCleanGameToSaveOnServer };
//# sourceMappingURL=Game.js.map