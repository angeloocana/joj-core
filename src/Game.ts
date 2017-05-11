import { compose, not } from 'ramda';
import * as Board from './Board';
import * as GameColor from './GameColor';
import * as Players from './Players';
import * as Position from './Position';

import { ICleanGame } from './ICleanGame';
import { IGame, IGameArgs } from './IGame';
import { IGameColor } from './IGameColor';
import { IMove } from './IMove';
import { IPlayer } from './IPlayer';
import { IPlayers } from './IPlayers';
import { IPosition } from './IPosition';

function create(args: IGameArgs): IGame {
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

function getCleanGameToSaveOnServer({ ended, blackWon, movements }: IGame): ICleanGame {
    return {
        ended,
        movements,
        blackWon
    };
}

/**
 * Takes a game and checks:
 *  - black won return true.
 *  - white won return false.
 *  - nobody won return undefined.
 */
function hasBlackWon(game: IGame): boolean {
    if (GameColor.hasWon(game.black))
        return true;
    else if (GameColor.hasWon(game.white))
        return false;

    return;
}

function isMyTurn(game: IGame, from: IPosition): boolean {
    if (game.ended)
        return false;

    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}

function getGameWhereCanIGo(game: IGame, from: IPosition): IGame {
    game.board = Board.getCleanBoard(game.board);

    if (!isMyTurn(game, from))
        return game;

    game.board = Board.setWhereCanIGo(game.board, from, Position.hasBlackPiece(from));
}

function isWhiteTurn(game: IGame): boolean {
    return game.movements.length % 2 === 0;
}

const isBlackTurn = compose(not, isWhiteTurn);

function getColorTurn(game: IGame): IGameColor {
    return isWhiteTurn(game) ? game.white : game.black;
}

function getPlayerTurn(game: IGame): IPlayer {
    return isWhiteTurn(game) ? game.players.white : game.players.black;
}

function setPlayers(players: IPlayers) {
    // Validate Players
    this.players = players;
}

function setMovements(movements: IMove[] = [], needToValidateMovements: boolean = true) {
    // Validate Movements
    // if(needToValidateMovements)

    this.movements = movements;
    // This must be called in another place
    // this.board.fillAllPiecesOnBoard(this.white.pieces, this.black.pieces);
}

export {
    create,
    getColorTurn,
    getPlayerTurn,
    hasBlackWon,
    getGameWhereCanIGo,
    isBlackTurn,
    isWhiteTurn,
    isMyTurn,
    setPlayers,
    setMovements,
    getCleanGameToSaveOnServer
};
