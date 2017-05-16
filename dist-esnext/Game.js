import { compose, not } from 'ramda';
import * as Board from './Board';
import * as Player from './Player';
import * as Position from './Position';
import * as Score from './Score';
function createGame(args) {
    args = args || [];
    const boardSize = args.boardSize || Board.defaultBoardSize;
    const game = {
        moves: args.moves || [],
        players: Player.createPlayers(args.players),
        score: Score.getInitialScore(),
        board: Board.getInitialBoard(boardSize)
    };
    return game;
}
const isWhiteTurn = (game) => game.moves.length % 2 === 0;
const isBlackTurn = compose(not, isWhiteTurn);
/**
 * Returns true if from piece can be played.
 */
function isMyTurn(game, from) {
    if (game.score.ended)
        return false;
    from = Board.getPosition(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}
const getPlayerTurn = (game) => isWhiteTurn(game) ? game.players.white : game.players.black;
/**
 * Gets all positions from current player turn.
 */
function getTurnPieces(game) {
    const isBlack = isBlackTurn(game);
    return game.board.reduce((piecesRow, row) => {
        return piecesRow.concat(row.reduce((pieces, position) => (isBlack !== position.isBlack)
            ? pieces
            : pieces.concat({ x: position.x, y: position.y, isBlack }), []));
    }, []);
}
export { createGame, getPlayerTurn, isBlackTurn, isWhiteTurn, isMyTurn, getTurnPieces };
//# sourceMappingURL=Game.js.map