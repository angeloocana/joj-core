import R from 'ramda';
import * as Board from './Board';
import * as Game from './Game';
import * as Player from './Player';
import * as Position from './Position';
import * as Score from './Score';
/**
 * Returns reverse move: from = to, to = from
 */
function getBackMove(move) {
    return {
        from: move.to,
        to: move.from
    };
}
/**
 * Takes a move and returns it with clean positions {from: {x,y}, to: {x,y}}.
 */
function getMoveXAndY(move) {
    return {
        from: Position.getXAndY(move.from),
        to: Position.getXAndY(move.to)
    };
}
/**
 * Takes game and move then:
 *  - Checks if it is my turn to play otherwise returns false.
 *  - Get positions where can i go.
 *  - Returns true if move.to is in the positions where can i go.
 */
function canMove(game, move) {
    if (!Game.isMyTurn(game, move.from))
        return false;
    const positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, Game.isBlackTurn(game));
    return positionsWhereCanIGo.some(position => Position.hasSameXY(position, move.to));
}
/**
 * Can not move
 */
const canNotMove = R.compose(R.not, canMove);
function getBoardAfterMove(board, move) {
    move.to.lastMove = true;
    move.from.lastMove = true;
    board = Board.setPieceOnBoard(board, move.to, Position.hasBlackPiece(move.from));
    board = Board.removePieceOnBoard(board, move.from);
    let jumpPosition = move.to.lastPosition;
    while (jumpPosition) {
        Board.getPosition(board, jumpPosition).lastMoveJump = true;
        jumpPosition = jumpPosition.lastPosition;
    }
    return board;
}
/**
 * Takes game and move and returns new game after move.
 *
 * Updates:
 *  - .board (It cleans board, set new positions and move breadcrumb)
 *  - .score
 *  - .moves (add new move if valid)
 */
function getGameAfterMove(game, move, backMove = false) {
    if (!backMove && canNotMove(game, move))
        throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    const board = getBoardAfterMove(game.board, move);
    return {
        players: game.players,
        board,
        score: Score.getScore(game.board),
        moves: backMove ? game.moves : game.moves.concat(getMoveXAndY(move))
    };
}
function getGameBeforeLastMove(game) {
    let lastMove = game.moves.pop();
    if (lastMove)
        game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (Player.isComputer(Game.getPlayerTurn(game))) {
        lastMove = game.moves.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
/**
 * Get IMove from an array like
 * [[fromX,fromY], [toX, toY]]
 *
 * const move = [[5, 7], [5, 6]];
 */
function getMoveFromArray(move) {
    return {
        from: Position.getPositionFromArray(move[0]),
        to: Position.getPositionFromArray(move[1])
    };
}
/**
 * Get IMove[] from an array like
 * [[fromX,fromY], [toX, toY]]
 *
 * const moves = [
 *      [[5, 7], [5, 6]],
 *      [[2, 0], [2, 1]],
 *      [[7, 7], [5, 5]]
 * ];
 */
const getMovesFromArray = (moves) => moves.map(move => getMoveFromArray(move));
/**
 * Get game after n moves.
 */
function getGameAfterMoves(game, moves) {
    return moves.reduce((lastGame, move) => {
        return getGameAfterMove(lastGame, move);
    }, game);
}
export { canMove, getBackMove, getGameAfterMove, getGameAfterMoves, getGameBeforeLastMove, getMoveFromArray, getMovesFromArray, getMoveXAndY };
//# sourceMappingURL=Move.js.map