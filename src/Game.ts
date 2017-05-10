import { compose, not } from 'ramda';
import * as Board from './Board';
import * as GameColor from './GameColor';
import * as Player from './Player';
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

function getCleanGameToSaveOnServer(game: IGame): ICleanGame {
    const cleanGame: ICleanGame = {
        ended: game.ended,
        movements: [],
        blackWin: game.blackWin
    };

    cleanGame.movements = game.movements.map(move => {
        const from = { x: move.from.x, y: move.from.y };
        const to = { x: move.to.x, y: move.to.y };
        return { from, to };
    });

    return cleanGame;
}

function getWinner(game: IGame): IGame {
    game.white.score = GameColor.getScore(game.white);
    game.black.score = GameColor.getScore(game.black);

    if (GameColor.hasWon(game.white))
        game.blackWin = false;
    else if (GameColor.hasWon(game.black))
        game.blackWin = true;

    return game;
}

function isMyTurn(game: IGame, from: IPosition): boolean {
    if (game.ended)
        return false;

    return isWhiteTurn(game) ? Position.hasWhitePiece(from) : Position.hasBlackPiece(from);
}

function getGameWhereCanIGo(game: IGame, from: IPosition): IGame {
    game.board = Board.clean(game.board);

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

function canMove(game: IGame, move: IMove): boolean {
    const positionsWhereCanIGo = Board.getPositionsWhereCanIGo(game.board, move.from, isBlackTurn(game)).positions;
    return positionsWhereCanIGo.findIndex(position =>
        position.x === move.to.x
        && position.y === move.to.y
    ) >= 0;
}

function getGameAfterMove(game: IGame, move: IMove, backMove: boolean = false): IGame {
    if (Position.hasSamePosition(move.from, move.to))
        throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');

    game.board = Board.clean(game.board);

    if (!backMove)
        if (!canMove(game, move))
            throw new Error('ERROR_CANT_MOVE_TO_POSITION');

    game.board = Board.getBoardAfterMove(game.board, move);

    game.black = GameColor.getColorAfterMove(game.black, move);
    game.white = GameColor.getColorAfterMove(game.white, move);

    if (!backMove) {
        game.movements.push(move);
        game = getWinner(game);
    }

    return game;
}

function getBackMove(move: IMove): IMove {
    return {
        from: move.to,
        to: move.from
    };
}

function getGameBeforeLastMove(game: IGame): IGame {
    let lastMove = game.movements.pop();

    if (lastMove)
        game = getGameAfterMove(game, getBackMove(lastMove), true);

    if (Player.isComputer(getPlayerTurn(game))) {
        lastMove = game.movements.pop();
        if (lastMove) {
            game = getGameAfterMove(game, getBackMove(lastMove), true);
        }
    }

    return game;
}

export {
    canMove,
    create,
    getBackMove,
    getColorTurn,
    getPlayerTurn,
    getWinner,
    getGameWhereCanIGo,
    getGameAfterMove,
    getGameBeforeLastMove,
    setPlayers,
    setMovements,
    getCleanGameToSaveOnServer
};
