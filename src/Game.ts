import PieceHelper from "./helpers/PieceHelper";
import GameBoard from "./GameBoard";
import GameColor from "./GameColor";
import Players from "./Players";
import copy from "ptz-copy";

export default class Game implements IGame {
    ended: boolean = false;
    players: IPlayers;
    movements: IMove[];
    board: IGameBoard = new GameBoard();
    white: IGameColor = new GameColor(this.board.boardOptions, false);
    black: IGameColor = new GameColor(this.board.boardOptions, true);
    blackWin: boolean;

    /**
     * Create new Game
     */
    constructor(args: IGameArgs = {}) {
        if (args.needToValidateMovements !== true && args.needToValidateMovements !== false)
            args.needToValidateMovements = true;

        this.setMovements(args.movements, args.needToValidateMovements);
        this.setPlayers(args.players);
    }

    setPlayers(players: IPlayers) {
        //Validate Players
        this.players = players;
    }

    setMovements(movements: IMove[] = [], needToValidateMovements: boolean = true) {
        //Validate Movements
        //if(needToValidateMovements)

        this.movements = movements;
        this.board.generateBoard(this.white.pieces, this.black.pieces);
    }

    isWhiteTurn(): boolean {
        return this.movements.length % 2 == 0;
    }

    getCleanGameToSaveOnServer(): ICleanGame {
        let cleanGame: ICleanGame = {
            ended: this.ended,
            movements: [],
            blackWin: this.blackWin
        };

        for (let i = 0; i < this.movements.length; i++) {
            let move = this.movements[i];
            cleanGame.movements.push({
                startPosition: { x: move.startPosition.x, y: move.startPosition.y },
                nextPosition: { x: move.nextPosition.x, y: move.nextPosition.y }
            });
        }

        return cleanGame;
    }

    setWhereCanIGo(startPosition): void {
        this.board.cleanBoardWhereCanIGo();

        let blackPiece = PieceHelper.isBlackPiece(startPosition);
        let whiteTurn = this.isWhiteTurn();

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

    canMove(startPosition: IGamePosition,
        nextPosition: IGamePosition): boolean {

        var positionsWhereCanIGo = this.board.getPositionsWhereCanIGo(startPosition, !this.isWhiteTurn()).positions;
        var nextPositionFound = false;

        nextPositionFound = positionsWhereCanIGo.findIndex(position =>
            position.x === nextPosition.x
            && position.y === nextPosition.y
        ) >= 0;

        this.board.cleanBoardWhereCanIGo();

        return nextPositionFound;
    }

    move(startPosition: IGamePosition,
        nextPosition: IGamePosition, backMove: boolean = false): void {

        if (!backMove)
            if (!this.canMove(startPosition, nextPosition))
                return;

        this.board.move(startPosition, nextPosition
            , backMove, this.isWhiteTurn());

        this.black.move(startPosition, nextPosition);
        this.white.move(startPosition, nextPosition);

        if (!backMove) {
            this.movements.push({ startPosition: startPosition, nextPosition: nextPosition });
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