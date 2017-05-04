import copy from 'ptz-copy';
import { BoardPosition } from './BoardPosition';
import { GameBoard } from './GameBoard';
import { GameColor } from './GameColor';
export class Game {
    /**
     * Create new Game
     */
    constructor(args = {}) {
        this.ended = false;
        if (args.needToValidateMovements !== true && args.needToValidateMovements !== false)
            args.needToValidateMovements = true;
        this.board = new GameBoard(args.boardArgs);
        this.white = new GameColor(this.board.boardOptions, false);
        this.black = new GameColor(this.board.boardOptions, true);
        this.setMovements(args.movements, args.needToValidateMovements);
        this.setPlayers(args.players);
    }
    setPlayers(players) {
        // Validate Players
        this.players = players;
    }
    setMovements(movements = [], needToValidateMovements = true) {
        // Validate Movements
        // if(needToValidateMovements)
        this.movements = movements;
        this.board.fillAllPiecesOnBoard(this.white.pieces, this.black.pieces);
    }
    isWhiteTurn() {
        return this.movements.length % 2 === 0;
    }
    setWhereCanIGo(startPosition) {
        this.board.cleanBoardWhereCanIGo();
        const blackPiece = startPosition.isBlackPiece();
        const whiteTurn = this.isWhiteTurn();
        if (this.ended || blackPiece === null
            || (!blackPiece && !whiteTurn)
            || (blackPiece && whiteTurn))
            return;
        this.board.setWhereCanIGo(startPosition, blackPiece);
    }
    verifyWinner() {
        this.white.setColorWinners();
        this.black.setColorWinners();
        if (this.white.win())
            this.blackWin = false;
        else if (this.black.win())
            this.blackWin = true;
    }
    canMove(startPosition, nextPosition) {
        const positionsWhereCanIGo = this.board.getPositionsWhereCanIGo(startPosition, !this.isWhiteTurn()).positions;
        var nextPositionFound = false;
        nextPositionFound = positionsWhereCanIGo.findIndex(position => position.x === nextPosition.x
            && position.y === nextPosition.y) >= 0;
        this.board.cleanBoardWhereCanIGo();
        return nextPositionFound;
    }
    move(startPosition, nextPosition, backMove = false) {
        if (startPosition.isSamePositionAs(nextPosition))
            throw new Error('ERROR_CANT_MOVE_TO_SAME_POSITION');
        if (!backMove)
            if (!this.canMove(startPosition, nextPosition))
                throw new Error('ERROR_CANT_MOVE_TO_POSITION');
        this.board.move(startPosition, nextPosition, backMove, this.isWhiteTurn());
        this.black.move(startPosition, nextPosition);
        this.white.move(startPosition, nextPosition);
        if (!backMove) {
            this.movements.push({ startPosition, nextPosition });
            this.verifyWinner();
        }
    }
    backMove() {
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
    getColorTurn() {
        return this.isWhiteTurn ? this.white : this.black;
    }
    getPlayerTurn() {
        return this.isWhiteTurn ? this.players.white : this.players.black;
    }
    getNewCopy() {
        return new Game(this);
    }
    getCopy() {
        return copy(this);
    }
}
export function getCleanGameToSaveOnServer(game) {
    const cleanGame = {
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
//# sourceMappingURL=Game.js.map