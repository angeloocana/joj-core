import { compose, not } from 'ramda';
import * as Board from './Board';
import * as GameColor from './GameColor';
import * as Players from './Players';
import * as Position from './Position';
function createGame(args) {
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
function getCleanGameToSaveOnServer({ ended, movements }) {
    return {
        ended,
        movements
    };
}
const isWhiteTurn = (game) => game.movements.length % 2 === 0;
const isBlackTurn = compose(not, isWhiteTurn);
/**
 * Returns true if from piece can be played.
 */
function isMyTurn(game, from) {
    if (game.ended)
        return false;
    from = Board.getPosition(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
const getColorTurn = (game) => isWhiteTurn(game) ? game.white : game.black;
const getPlayerTurn = (game) => isWhiteTurn(game) ? game.players.white : game.players.black;
export { createGame, getColorTurn, getPlayerTurn, isBlackTurn, isWhiteTurn, isMyTurn, getCleanGameToSaveOnServer };
//# sourceMappingURL=Game.js.map