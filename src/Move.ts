import R from 'ramda';
import * as Board from './Board';
import * as Game from './Game';
import * as Player from './Player';
import * as Position from './Position';
import * as Score from './Score';
import * as I from './typings';

/**
 * Returns reverse move: from = to, to = from
 */
function getBackMove(move: I.IMove): I.IMove {
    return {
        from: move.to,
        to: move.from
    };
}

/**
 * Takes a move and returns it with clean positions {from: {x,y}, to: {x,y}}.
 */
function getMoveXAndY(move: I.IMove): I.IMove {
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
function canMove(game: I.IGame, move: I.IMove): boolean {
    if (!Game.isMyTurn(game, move.from))
        return false;

    const positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, Game.isBlackTurn(game));
    return positionsWhereCanIGo.some(position => Position.hasSameXY(position, move.to));
}

/**
 * Can not move
 */
const canNotMove = R.compose(R.not, canMove);

/**
 * Get board after move, return a new board with:
 *  - From: Remove piece and add .lastMove: true
 *  - To: Set piece from move.from and add .lastMove: true
 *  - Jumps: Create jump breadcrumb by setting .lastMoveJump: true
 */
function getBoardAfterMove(board: I.IBoard, move: I.IMove): I.IBoard {
    const from = Board.getPosition(board, move.from);

    return Board.mapBoard(board, p => {
        const { x, y, isBlack } = p;

        if (Position.hasSameXY(from, p))
            return { x, y, lastMove: true };

        if (Position.hasSameXY(move.to, p))
            return { x, y, isBlack: from.isBlack, lastMove: true };

        if (Position.hasPiece(p))
            return { x, y, isBlack };

        if (Position.containsXY(move.to.jumps, p))
            return { x, y, lastMoveJump: true };

        return { x, y };
    });
}

/**
 * Takes game and move and returns new game after move.
 *
 * Updates:
 *  - .board (It cleans board, set new positions and move breadcrumb)
 *  - .score
 *  - .moves (add new move if valid)
 */
function getGameAfterMove(game: I.IGame, move: I.IMove, backMove: boolean = false): I.IGame {
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

function getGameBeforeLastMove(game: I.IGame): I.IGame {
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
function getMoveFromArray(move: number[][]): I.IMove {
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
const getMovesFromArray = (moves: number[][][]): I.IMove[] =>
    moves.map(move => getMoveFromArray(move));

/**
 * Get game after n moves.
 */
function getGameAfterMoves(game: I.IGame, moves: I.IMove[]): I.IGame {
    return moves.reduce((lastGame: I.IGame, move: I.IMove) => {
        return getGameAfterMove(lastGame, move);
    }, game);
}

export {
    canMove,
    getBackMove,
    getBoardAfterMove,
    getGameAfterMove,
    getGameAfterMoves,
    getGameBeforeLastMove,
    getMoveFromArray,
    getMovesFromArray,
    getMoveXAndY
};
