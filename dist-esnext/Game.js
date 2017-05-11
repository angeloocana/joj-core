import { compose, not } from 'ramda';
import * as Board from './Board';
import * as GameColor from './GameColor';
import * as Move from './Move';
import * as Player from './Player';
import * as Players from './Players';
import * as Position from './Position';
function create(args) {
    const boardConf = args.boardConf || Board.defaultBoardConf;
    const { board, blackPieces, whitePieces } = Board.getInitialBoard(boardConf);
    const game = {
        ended: false,
        movements: args.movements || [],
        players: Players.create(args.players),
        boardConf,
        white: GameColor.create(boardConf, false, whitePieces),
        black: GameColor.create(boardConf, true, blackPieces),
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
    game.white.score = GameColor.getScore(game.white);
    game.black.score = GameColor.getScore(game.black);
    if (GameColor.hasWon(game.white))
        game.blackWin = false;
    else if (GameColor.hasWon(game.black))
        game.blackWin = true;
    return game;
}
function isMyTurn(game, from) {
    if (game.ended)
        return false;
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
function getGameWhereCanIGo(game, from) {
    game.board = Board.clean(game.board);
    if (!isMyTurn(game, from))
        return game;
    game.board = Board.setWhereCanIGo(game.board, from, Position.hasBlackPiece(from));
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
    const positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(position => position.x === move.to.x
        && position.y === move.to.y) >= 0;
}
function getGameAfterMove(game, move, backMove = false) {
    if (Position.hasSamePosition(move.from, move.to))
        throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
    game.board = Board.clean(game.board);
    if (!backMove)
        if (!canMove(game, move))
            throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = Board.getBoardAfterMove(game.board, move);
    game.black = GameColor.getColorAfterMove(game.black, move);
    game.white = GameColor.getColorAfterMove(game.white, move);
    if (!backMove) {
        game.movements.push(move);
        game = getWinner(game);
    }
    return game;
}
function getGameBeforeLastMove(game) {
    let lastMove = game.movements.pop();
    if (lastMove)
        game = getGameAfterMove(game, Move.getBackMove(lastMove), true);
    if (Player.isComputer(getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, Move.getBackMove(lastMove), true);
        }
    }
    return game;
}
export { canMove, create, getColorTurn, getPlayerTurn, getWinner, getGameWhereCanIGo, getGameAfterMove, getGameBeforeLastMove, setPlayers, setMovements, getCleanGameToSaveOnServer };
//# sourceMappingURL=Game.js.map