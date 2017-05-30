import { compose, not } from 'ramda';
import * as Board from './Board';
import * as Player from './Player';
import * as Position from './Position';
import * as Score from './Score';

import I from './typings';

function createGame(args?: I.IGameArgs): I.IGame {
    args = args || [];
    const boardSize = args.boardSize || Board.defaultBoardSize;

    const game: I.IGame = {
        moves: args.moves || [],
        players: Player.createPlayers(args.players),
        score: Score.getInitialScore(),
        board: Board.getInitialBoard(boardSize)
    };

    return game;
}

const isWhiteTurn = (game: I.IGame) => game.moves.length % 2 === 0;

const isBlackTurn = compose(not, isWhiteTurn);

/**
 * Returns true if from piece can be played.
 */
function isMyTurn(game: I.IGame, from: I.IPosition): boolean {
    if (game.score.ended)
        return false;

    from = Board.getPositionFromBoard(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}

const getPlayerTurn = (game: I.IGame) => isWhiteTurn(game) ? game.players.white : game.players.black;

/**
 * Gets all positions from current player turn.
 */
function getTurnPieces(game: I.IGame): I.IPosition[] {
    const isBlack = isBlackTurn(game);
    return game.board.reduce((piecesRow, row) => {
        return piecesRow.concat(row.reduce((pieces, position) =>
            (isBlack !== position.isBlack)
                ? pieces
                : pieces.concat({ x: position.x, y: position.y, isBlack })
            , []));
    }, []);
}

/**
 * Gets all pieces from current player turn with whereCanIGo positions.
 */
const getTurnPiecesWhereCanIGo = (game: I.IGame): I.IPiece[] =>
    Board.getPiecesWhereCanIGo(game.board, getTurnPieces(game));

export {
    createGame,
    getPlayerTurn,
    isBlackTurn,
    isWhiteTurn,
    isMyTurn,
    getTurnPieces,
    getTurnPiecesWhereCanIGo
};
