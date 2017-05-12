import { compose, not } from 'ramda';
import * as Board from './Board';
import * as GameColor from './GameColor';
import * as Players from './Players';
import * as Position from './Position';

import { ICleanGame } from './ICleanGame';
import { IGame, IGameArgs } from './IGame';
import { IPosition } from './IPosition';

function createGame(args: IGameArgs): IGame {
    const boardConf = args.boardConf || Board.defaultBoardConf;

    const { board, blackPieces, whitePieces } = Board.getInitialBoard(boardConf);

    const game: IGame = {
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

function getCleanGameToSaveOnServer({ ended, movements }: IGame): ICleanGame {
    return {
        ended,
        movements
    };
}

const isWhiteTurn = (game: IGame) => game.movements.length % 2 === 0;

const isBlackTurn = compose(not, isWhiteTurn);

/**
 * Returns true if from piece can be played.
 */
function isMyTurn(game: IGame, from: IPosition): boolean {
    if (game.ended)
        return false;

    from = Board.getPosition(game.board, from);
    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}

const getColorTurn = (game: IGame) => isWhiteTurn(game) ? game.white : game.black;

const getPlayerTurn = (game: IGame) => isWhiteTurn(game) ? game.players.white : game.players.black;

export {
    createGame,
    getColorTurn,
    getPlayerTurn,
    isBlackTurn,
    isWhiteTurn,
    isMyTurn,
    getCleanGameToSaveOnServer
};
