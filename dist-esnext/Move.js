import * as Board from './Board';
import * as Game from './Game';
import * as GameColor from './GameColor';
import * as Player from './Player';
import * as Position from './Position';
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
function canMove(game, move) {
    if (!Game.isMyTurn(game, move.from))
        return false;
    const positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, Game.isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(position => position.x === move.to.x
        && position.y === move.to.y) >= 0;
}
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
 *  - .board (Cleans board, set positions and move breadcrumb)
 *  - .black (Calculate score)
 *  - .white (Calculate score)
 *  - .movements (add new move)
 */
function getGameAfterMove(game, move, backMove = false) {
    // Fix to be immutable
    // I dont know if it is the best way
    game = Object.assign({}, game);
    game.board = Board.getCleanBoard(game.board);
    if (!backMove && !canMove(game, move))
        throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = getBoardAfterMove(game.board, move);
    game.black = GameColor.getColorAfterMove(game.black, move);
    game.white = GameColor.getColorAfterMove(game.white, move);
    if (!backMove) {
        game.movements = game.movements.concat(getMoveXAndY(move));
        game.ended = game.black.score.won || game.white.score.won;
    }
    return game;
}
function getGameBeforeLastMove(game) {
    let lastMove = game.movements.pop();
    if (lastMove)
        game = getGameAfterMove(game, getBackMove(lastMove), true);
    if (Player.isComputer(Game.getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }
    return game;
}
export { canMove, getBackMove, getGameAfterMove, getGameBeforeLastMove, getMoveXAndY };
//# sourceMappingURL=Move.js.map