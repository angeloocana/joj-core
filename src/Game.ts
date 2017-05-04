import copy from 'ptz-copy';
import { BoardPosition } from './BoardPosition';
import { GameBoard } from './GameBoard';
import { GameColor } from './GameColor';

import { IBoardPosition } from './typings/IBoardPosition';
import { ICleanGame } from './typings/ICleanGame';
import { IGame } from './typings/IGame';
import { IGameArgs } from './typings/IGameArgs';
import { IGameBoard } from './typings/IGameBoard';
import { IGameColor } from './typings/IGameColor';
import { IMove } from './typings/IMove';
import { IPlayer } from './typings/IPlayer';
import { IPlayers } from './typings/IPlayers';

export class Game implements IGame {
    ended: boolean = false;
    players: IPlayers;
    movements: IMove[];
    board: IGameBoard;
    white: IGameColor;
    black: IGameColor;
    blackWin: boolean;

    /**
     * Create new Game
     */
    constructor(args: IGameArgs = {}) {
        if (args.needToValidateMovements !== true && args.needToValidateMovements !== false)
            args.needToValidateMovements = true;

        this.board = new GameBoard(args.boardArgs);

        this.white = new GameColor(this.board.boardOptions, false);
        this.black = new GameColor(this.board.boardOptions, true);

        this.setMovements(args.movements, args.needToValidateMovements);
        this.setPlayers(args.players);
    }

    setPlayers(players: IPlayers) {
        // Validate Players
        this.players = players;
    }

    setMovements(movements: IMove[] = [], needToValidateMovements: boolean = true) {
        // Validate Movements
        // if(needToValidateMovements)

        this.movements = movements;
        this.board.fillAllPiecesOnBoard(this.white.pieces, this.black.pieces);
    }

    isWhiteTurn(): boolean {
        return this.movements.length % 2 === 0;
    }

    setWhereCanIGo(startPosition: IBoardPosition): void {
        this.board.cleanBoardWhereCanIGo();

        const blackPiece = startPosition.isBlackPiece();
        const whiteTurn = this.isWhiteTurn();

        if (this.ended || blackPiece === null
            || (!blackPiece && !whiteTurn)
            || (blackPiece && whiteTurn))
            return;

        this.board.setWhereCanIGo(startPosition, blackPiece);
    }

    verifyWinner(): void {
        this.white.setColorWinners();
        this.black.setColorWinners();

        if (this.white.win())
            this.blackWin = false;
        else if (this.black.win())
            this.blackWin = true;
    }

    canMove(startPosition: IBoardPosition, nextPosition: IBoardPosition): boolean {

        const positionsWhereCanIGo = this.board.getPositionsWhereCanIGo(startPosition, !this.isWhiteTurn()).positions;
        var nextPositionFound = false;

        nextPositionFound = positionsWhereCanIGo.findIndex(position =>
            position.x === nextPosition.x
            && position.y === nextPosition.y
        ) >= 0;

        this.board.cleanBoardWhereCanIGo();

        return nextPositionFound;
    }

    move(startPosition: IBoardPosition, nextPosition: IBoardPosition, backMove: boolean = false): void {

        if (startPosition.isSamePositionAs(nextPosition))
            throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');

        if (!backMove)
            if (!this.canMove(startPosition, nextPosition))
                throw new Error('ERROR_CANT_MOVE_TO_POSITION');

        this.board.move(startPosition, nextPosition
            , backMove, this.isWhiteTurn());

        this.black.move(startPosition, nextPosition);
        this.white.move(startPosition, nextPosition);

        if (!backMove) {
            this.movements.push({ startPosition, nextPosition });
            this.verifyWinner();
        }
    }

    backMove(): void {
        this.board.cleanBoardWhereCanIGo();

        let lastMove = this.movements.pop();

        if (lastMove)
            this.move(lastMove.nextPosition, lastMove.startPosition, true);

        if (this.getPlayerTurn().isComputer()) {
            lastMove = this.movements.pop();
            if (lastMove) {
                this.board.cleanBoardWhereCanIGo();
                this.move(lastMove.nextPosition, lastMove.startPosition, true);
            }
        }
    }

    getColorTurn(): IGameColor {
        return this.isWhiteTurn ? this.white : this.black;
    }

    getPlayerTurn(): IPlayer {
        return this.isWhiteTurn ? this.players.white : this.players.black;
    }

    getNewCopy(): IGame {
        return new Game(this);
    }

    getCopy(): IGame {
        return copy(this);
    }
}

export function getCleanGameToSaveOnServer(game: IGame): ICleanGame {
    const cleanGame: ICleanGame = {
        ended: game.ended,
        movements: [],
        blackWin: game.blackWin
    };

    cleanGame.movements = game.movements.map(move => {
        const startPosition = new BoardPosition({ x: move.startPosition.x, y: move.startPosition.y });
        const nextPosition = new BoardPosition({ x: move.nextPosition.x, y: move.nextPosition.y });
        return { startPosition, nextPosition };
    });

    return cleanGame;
}
