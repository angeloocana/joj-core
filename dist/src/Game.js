import PieceHelper from "./helpers/PieceHelper";
import GameBoard from "./GameBoard";
import GameColor from "./GameColor";
import ObjectHelper from "./helpers/ObjectHelper";
export default class Game {
    constructor(args = {}) {
        this.ended = false;
        this.board = new GameBoard();
        this.white = new GameColor(this.board.boardOptions, false);
        this.black = new GameColor(this.board.boardOptions, true);
        if (args.needToValidateMovements !== true && args.needToValidateMovements !== false)
            args.needToValidateMovements = true;
        this.setMovements(args.movements, args.needToValidateMovements);
        this.setPlayers(args.players);
    }
    setPlayers(players) {
        this.players = players;
    }
    setMovements(movements = [], needToValidateMovements = true) {
        this.movements = movements;
        this.board.generateBoard(this.white.pieces, this.black.pieces);
    }
    isWhiteTurn() {
        return this.movements.length % 2 == 0;
    }
    getCleanGameToSaveOnServer() {
        let cleanGame = {
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
    setWhereCanIGo(startPosition) {
        this.board.cleanBoardWhereCanIGo();
        let blackPiece = PieceHelper.isBlackPiece(startPosition);
        let whiteTurn = this.isWhiteTurn();
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
        var positionsWhereCanIGo = this.board.getPositionsWhereCanIGo(startPosition, !this.isWhiteTurn()).positions;
        var nextPositionFound = false;
        nextPositionFound = positionsWhereCanIGo.findIndex(position => position.x === nextPosition.x
            && position.y === nextPosition.y) >= 0;
        this.board.cleanBoardWhereCanIGo();
        return nextPositionFound;
    }
    move(startPosition, nextPosition, backMove = false) {
        if (!backMove)
            if (!this.canMove(startPosition, nextPosition))
                return;
        this.board.move(startPosition, nextPosition, backMove, this.isWhiteTurn());
        this.black.move(startPosition, nextPosition);
        this.white.move(startPosition, nextPosition);
        if (!backMove) {
            this.movements.push({ startPosition: startPosition, nextPosition: nextPosition });
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
        return ObjectHelper.getCopy(this);
    }
}
//# sourceMappingURL=Game.js.map