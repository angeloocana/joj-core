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
function getMoveXandY(move) {
    return {
        from: Position.getXandY(move.from),
        to: Position.getXandY(move.to)
    };
}
function canMove(game, move) {
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
function getGameAfterMove(game, move, backMove = false) {
    if (Position.hasSamePosition(move.from, move.to))
        throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
    game.board = Board.getCleanBoard(game.board);
    if (!backMove)
        if (!canMove(game, move))
            throw new Error('ERROR_CANT_MOVE_TO_POSITION');
    game.board = getBoardAfterMove(game.board, move);
    game.black = GameColor.getColorAfterMove(game.black, move);
    game.white = GameColor.getColorAfterMove(game.white, move);
    if (!backMove) {
        game.movements.push(getMoveXandY(move));
        game = Game.getWinner(game);
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
export { canMove, getBackMove, getGameAfterMove, getGameBeforeLastMove, getMoveXandY };
//# sourceMappingURL=Move.js.map