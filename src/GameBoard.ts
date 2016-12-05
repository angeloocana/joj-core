import BoardHelper from "./helpers/BoardHelper";
import PieceHelper from "./helpers/PieceHelper";
import GamePieceType from "./GamePieceType";
import BoardPosition from "./BoardPosition";

export default class GameBoard implements IGameBoard {

    board: IBoardPosition[][];
    boardOptions: IBoardOptions;
    logMove: boolean;

    /**
     * Game Board
     */
    constructor(args?: IGameBoardArgs) {
        if (!args) args = {};

        this.logMove = args.logMove || false;
        this.boardOptions = args.boardOptions || { size: { x: 8, y: 8 } };
        this.generateBoard();
        this.fillAllPiecesOnBoard(args.whitePieces, args.blackPieces);
    }

    fillPiecesOnBoard(pieces: IGamePiece[], pieceType: string)
        : void {

        if (!pieces)
            return;

        for (let i = 0; i < pieces.length; i++) {
            let piece = pieces[i];
            this.board[piece.x][piece.y].piece = pieceType;
        }
    }

    fillAllPiecesOnBoard(whitePieces: IGamePiece[], blackPieces: IGamePiece[])
        : void {

        this.fillPiecesOnBoard(whitePieces, GamePieceType.white);
        this.fillPiecesOnBoard(blackPieces, GamePieceType.black);
    }

    generateBoard()
        : void {

        this.board = [];
        for (let x = 0; x < this.boardOptions.size.x; x++) {
            for (let y = 0; y < this.boardOptions.size.y; y++) {
                if (!this.board[x])
                    this.board[x] = [];

                let position: IBoardPosition = new BoardPosition({ x, y });

                if (y === this.boardOptions.size.y - 1)
                    position.isWhiteHome = true;

                if (y === 0)
                    position.isBlackHome = true;

                this.board[x][y] = position;
            }
        }
    }

    boardHasThisPosition(position: IBoardPosition): boolean {
        return (position.x < 0
            || position.y < 0
            || position.x >= this.boardOptions.size.x
            || position.y >= this.boardOptions.size.y)
            ? false : true;
    }

    getPosition(position: IBoardPosition): IBoardPosition {
        try {
            return this.board[position.x][position.y];
        }
        catch (e) {
            console.log("Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
            console.log(position);
            console.log("Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
            throw "Error getting position";
        }
    }

    isPositionEmpty(position: IBoardPosition): boolean {
        return !(this.getPosition(position).piece);
    }

    getNearPositions(position, onlyEmpty): IBoardPosition[] {
        let positions: IBoardPosition[] = [];
        let board = this;
        let add = function (plusX: number, plusY: number, board: IGameBoard) {
            let newPosition: IBoardPosition = new BoardPosition({
                x: position.x + plusX,
                y: position.y + plusY
            });

            if (!board.boardHasThisPosition(newPosition))
                return;

            if (typeof onlyEmpty != "undefined") {
                let positionEmpty = board.isPositionEmpty(newPosition);

                if (onlyEmpty === positionEmpty)
                    positions.push(newPosition);
            } else
                positions.push(newPosition);
        }

        add(-1, -1, this);
        add(0, -1, this);
        add(+1, -1, this);

        add(-1, 0, this);
        add(+1, 0, this);

        add(-1, +1, this);
        add(0, +1, this);
        add(+1, +1, this);

        return positions;
    }

    getJumpPosition(startPosition: IBoardPosition, toJumpPosition: IBoardPosition)
        : IBoardPosition {
        let jumpPosition: IBoardPosition = new BoardPosition({ x: 0, y: 0 });

        if (startPosition.x < toJumpPosition.x)
            jumpPosition.x = toJumpPosition.x + 1;
        else if (startPosition.x > toJumpPosition.x)
            jumpPosition.x = toJumpPosition.x - 1;
        else jumpPosition.x = toJumpPosition.x;

        if (startPosition.y < toJumpPosition.y)
            jumpPosition.y = toJumpPosition.y + 1;
        else if (startPosition.y > toJumpPosition.y)
            jumpPosition.y = toJumpPosition.y - 1;
        else jumpPosition.y = toJumpPosition.y;

        if (this.boardHasThisPosition(jumpPosition)
            && this.isPositionEmpty(jumpPosition))
            return jumpPosition;
    }


    whereCanIJump(jumpStartPosition: IBoardPosition, positions,
        orderedPositions: IBoardPosition[][], isBlack: boolean)
        : void {

        let nearFilledPositions: IBoardPosition[]
            = this.getNearPositions(jumpStartPosition, false);

        nearFilledPositions.forEach(nearFilledPosition => {
            let jumpPosition: IBoardPosition
                = this.getJumpPosition(jumpStartPosition,
                    nearFilledPosition);

            if (jumpPosition) {
                if (BoardHelper.isPositionNotAdded(jumpPosition,
                    positions)) {

                    jumpPosition.lastPosition = jumpStartPosition;
                    jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlackPiece();
                    jumpPosition.jumps = jumpStartPosition.jumps ? jumpStartPosition.jumps++ : 2;

                    positions.push(jumpPosition);
                    let y = BoardHelper.getY0Start7End(jumpPosition.y, isBlack);
                    if (!orderedPositions[y])
                        orderedPositions[y] = [];
                    orderedPositions[y][BoardHelper.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;

                    this.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                }
            }
        });
    }

    getPositionsWhereCanIGo(startPosition: IBoardPosition,
        isBlack: boolean): IPositionsWhereCanIGo {
        if (!startPosition)
            return null;

        let allNearPositions = this.getNearPositions(startPosition, undefined);
        let positions = [];
        let orderedPositions = [];

        for (let i = 0; i < allNearPositions.length; i++) {
            let nearPosition = allNearPositions[i];
            if (this.isPositionEmpty(nearPosition)) {
                positions.push(nearPosition);

                let y = BoardHelper.getY0Start7End(nearPosition.y,
                    isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];

                orderedPositions[y][
                    BoardHelper.getIndexToSearchOrder(nearPosition.x)] = nearPosition;
            } else {
                let jumpPosition = this.getJumpPosition(startPosition, nearPosition);
                if (jumpPosition) {
                    jumpPosition.jumps = 1;
                    positions.push(jumpPosition);

                    let y = BoardHelper.getY0Start7End(jumpPosition.y, isBlack);
                    if (!orderedPositions[y])
                        orderedPositions[y] = [];
                    orderedPositions[y][BoardHelper.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;

                    this.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                }
            }
        }

        return {
            positions: positions,
            orderedPositions: orderedPositions
        }
    }

    setWhereCanIGo(startPosition: IBoardPosition, blackPiece: boolean): void {
        let positions = this.getPositionsWhereCanIGo(startPosition, blackPiece).positions;

        positions.forEach(position => {
            this.board[position.x][position.y].iCanGoHere = true;
        });
    }

    cleanBoardWhereCanIGo(): void {
        for (var x = 0; x < this.board.length; x++) {
            for (var y = 0; y < this.board[x].length; y++) {
                this.board[x][y].iCanGoHere = false;
                this.board[x][y].lastMove = false;
                this.board[x][y].lastMoveJump = false;
            }
        }
    }

    printUnicode(): string {
        var board = "";
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[y].length; x++) {
                var position = this.board[x][y];

                if (BoardHelper.isBackGroundBlack(x, y)) {
                    if (position.piece == GamePieceType.white)
                        board += "\u{25CF}";
                    else if (position.piece == GamePieceType.black)
                        board += "\u{25CB}";
                    else
                        board += " ";
                }
                else {
                    if (position.piece == GamePieceType.white)
                        board += "\u{25D9}";
                    else if (position.piece == GamePieceType.black)
                        board += "\u{25D8}";
                    else
                        board += "\u{2588}";
                }
            }

            board += "\n";
        }

        return board;
    }

    move(startPosition: IBoardPosition, nextPosition: IBoardPosition,
        backMove?: boolean, whiteTurn?: boolean): void {
        if (backMove) {
            this.board[nextPosition.x][nextPosition.y].piece
                = whiteTurn
                    ? GamePieceType.black
                    : GamePieceType.white;
            this.board[startPosition.x][startPosition.y].piece = null;
        } else {
            this.board[nextPosition.x][nextPosition.y].piece = this.board[startPosition.x][startPosition.y].piece;
            this.board[startPosition.x][startPosition.y].piece = null;
        }

        let jumpPosition = nextPosition.lastPosition;
        while (jumpPosition) {
            this.board[jumpPosition.x][jumpPosition.y].lastMoveJump = true;
            jumpPosition = jumpPosition.lastPosition;
        }

        this.board[nextPosition.x][nextPosition.y].lastMove = true;
        this.board[startPosition.x][startPosition.y].lastMove = true;

        if (this.logMove)
            console.log(this.printUnicode());
    }
}

