import R from 'ramda';
import * as Board from './Board';
import * as Game from './Game';
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

    const positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from);
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
    const from = Board.getPositionFromBoard(board, move.from);

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
 * Takes game and move then returns new game after move.
 *
 * Updates:
 *  - .board (It cleans board, set new positions and move breadcrumb)
 *  - .score
 *  - .moves (add new move if valid and it is not backMove)
 */
function getGameAfterMove(game: I.IGame, move: I.IMove, backMove: boolean = false): I.IGame {
    if (!backMove && canNotMove(game, move))
        return game;

    const board = getBoardAfterMove(game.board, move);

    return {
        players: game.players,
        board,
        score: Score.getScore(game.board),
        moves: backMove ? game.moves : game.moves.concat(getMoveXAndY(move))
    };
}

/**
 * Get game before last move,
 * if playing vs Ai rollback Ai move too.
 */
function getGameBeforeLastMove(game: I.IGame): I.IGame {
    // $Fix I do NOT know if it is the best way to make game immutable.
    game = Object.assign({}, game);

    let lastMove = game.moves.pop();

    if (lastMove)
        game = getGameAfterMove(game, getBackMove(lastMove), true);

    if (Game.getPlayerTurn(game).isAi) {
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
const getGameAfterMoves = (game: I.IGame, moves: I.IMove[]) =>
    moves.reduce((lastGame: I.IGame, move: I.IMove) => {
        return getGameAfterMove(lastGame, move);
    }, game);

/**
 * Takes an array like:
 *
 * [[fromX, fromY], ...[toX, toY]]
 *
 * and return IMove[]
 */
function getAllowedMovesFromArray(moves: number[][]): I.IMove[] {
    const from = Position.getPositionFromArray(R.head(moves));
    return R.tail(moves).map(to => {
        return { from, to: Position.getPositionFromArray(to) };
    });
}

/**
 * Takes an array like:
 *
 * [
 *
 *   [[fromX, fromY], ...[toX, toY]],
 *
 *   [[fromX, fromY], ...[toX, toY]]
 *
 * ]
 *
 * and return IMove[].
 *
 * Used to create smaller test data.
 */
function getAllowedMovesFromArrays(arrMoves: number[][][]): I.IMove[] {
    return arrMoves.reduce((moves: I.IMove[], a) => {
        return moves.concat(getAllowedMovesFromArray(a));
    }, []);
}

/**
 * Takes 2 moves and compares theirs **from** and **to** positions.
 */
const sameMove = (a: I.IMove, b: I.IMove) =>
    Position.hasSameXY(a.from, b.from) && Position.hasSameXY(a.to, b.to);

/**
 * Checks if a list of moves contains some move.
 */
const movesContains = (moves: I.IMove[], move: I.IMove) =>
    moves.some(m => sameMove(move, m));

export {
    canMove,

    getAllowedMovesFromArray,
    getAllowedMovesFromArrays,

    getBackMove,
    getBoardAfterMove,

    getGameAfterMove,
    getGameAfterMoves,
    getGameBeforeLastMove,

    getMoveFromArray,
    getMovesFromArray,
    getMoveXAndY,

    movesContains,
    sameMove
};
