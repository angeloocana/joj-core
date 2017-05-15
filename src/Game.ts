import { compose, not } from 'ramda';
import * as Board from './Board';
import * as Player from './Player';
import * as Position from './Position';
import * as Score from './Score';

import I from './typings';

function createGame(args: I.IGameArgs): I.IGame {
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

    from = Board.getPosition(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}

const getPlayerTurn = (game: I.IGame) => isWhiteTurn(game) ? game.players.white : game.players.black;

export {
    createGame,
    getPlayerTurn,
    isBlackTurn,
    isWhiteTurn,
    isMyTurn
};
