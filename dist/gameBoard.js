import BoardHelper from "./helpers/boardHelper";
import PieceHelper from "./helpers/pieceHelper";
import { GamePieceType } from "./enums/gamePieceType";
export default class GameBoard {
    constructor() {
        this.boardOptions = { size: { x: 8, y: 8 } };
    }
    fillPiecesOnBoard(pieces, pieceType) {
        for (let i = 0; i < pieces.length; i++) {
            let piece = pieces[i];
            this.board[piece.x][piece.y].piece = pieceType.toString();
        }
    }
    generateBoard(whitePieces, blackPieces) {
        this.board = [];
        for (let x = 0; x < this.boardOptions.size.x; x++) {
            for (let y = 0; y < this.boardOptions.size.y; y++) {
                if (!this.board[x])
                    this.board[x] = [];
                let position = {
                    x: x,
                    y: y,
                    backgroundBlack: BoardHelper.isBackGroundBlack(x, y),
                    whiteHome: y === this.boardOptions.size.y - 1,
                    blackHome: y === 0,
                    piece: null
                };
                this.board[x][y] = position;
            }
        }
        this.fillPiecesOnBoard(whitePieces, GamePieceType.White.toString());
        this.fillPiecesOnBoard(blackPieces, GamePieceType.Black.toString());
        return this.board;
    }
    boardHasThisPosition(position) {
        return (position.x < 0
            || position.y < 0
            || position.x >= this.boardOptions.size.x
            || position.y >= this.boardOptions.size.y)
            ? false : true;
    }
    getPosition(position) {
        return this.board[position.x][position.y];
    }
    isPositionEmpty(position) {
        return !(this.getPosition(position).piece);
    }
    getNearPositions(position, onlyEmpty) {
        let positions = [];
        let add = function (plusX, plusY) {
            let newPosition = { x: position.x + plusX, y: position.y + plusY };
            if (!this.boardHasThisPosition(newPosition, this.boardOptions))
                return;
            if (typeof onlyEmpty != "undefined") {
                let positionEmpty = this.isPositionEmpty(newPosition);
                if (onlyEmpty === positionEmpty)
                    positions.push(newPosition);
            }
            else
                positions.push(newPosition);
        };
        add(-1, -1);
        add(0, -1);
        add(+1, -1);
        add(-1, 0);
        add(+1, 0);
        add(-1, +1);
        add(0, +1);
        add(+1, +1);
        return positions;
    }
    getJumpPosition(startPosition, toJumpPosition) {
        let jumpPosition = {
            x: 0,
            y: 0
        };
        if (startPosition.x < toJumpPosition.x)
            jumpPosition.x = toJumpPosition.x + 1;
        else if (startPosition.x > toJumpPosition.x)
            jumpPosition.x = toJumpPosition.x - 1;
        else
            jumpPosition.x = toJumpPosition.x;
        if (startPosition.y < toJumpPosition.y)
            jumpPosition.y = toJumpPosition.y + 1;
        else if (startPosition.y > toJumpPosition.y)
            jumpPosition.y = toJumpPosition.y - 1;
        else
            jumpPosition.y = toJumpPosition.y;
        if (this.boardHasThisPosition(jumpPosition)
            && this.isPositionEmpty(jumpPosition))
            return jumpPosition;
    }
    whereCanIJump(jumpStartPosition, positions, orderedPositions, isBlack) {
        let nearFilledPositions = this.getNearPositions(jumpStartPosition, false);
        nearFilledPositions.forEach(nearFilledPosition => {
            let jumpPosition = this.getJumpPosition(jumpStartPosition, nearFilledPosition);
            if (jumpPosition) {
                if (BoardHelper.isPositionNotAdded(jumpPosition, positions)) {
                    jumpPosition.lastPosition = jumpStartPosition;
                    jumpPosition.jumpingBlackPiece = PieceHelper.isBlackPiece(nearFilledPosition);
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
    getPositionsWhereCanIGo(startPosition, isBlack) {
        if (!startPosition)
            return null;
        let allNearPositions = this.getNearPositions(startPosition, undefined);
        let positions = [];
        let orderedPositions = [];
        for (let i = 0; i < allNearPositions.length; i++) {
            let nearPosition = allNearPositions[i];
            if (this.isPositionEmpty(nearPosition)) {
                positions.push(nearPosition);
                let y = BoardHelper.getY0Start7End(nearPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][BoardHelper.getIndexToSearchOrder(nearPosition.x)] = nearPosition;
            }
            else {
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
        };
    }
    setWhereCanIGo(startPosition, blackPiece) {
        let positions = this.getPositionsWhereCanIGo(startPosition, blackPiece).positions;
        positions.forEach(position => {
            this.board[position.x][position.y].iCanGoHere = true;
        });
    }
    cleanBoardWhereCanIGo() {
        for (var x = 0; x < this.board.length; x++) {
            for (var y = 0; y < this.board[x].length; y++) {
                this.board[x][y].iCanGoHere = false;
                this.board[x][y].lastMove = false;
                this.board[x][y].lastMoveJump = false;
            }
        }
    }
    move(startPosition, nextPosition, backMove, whiteTurn) {
        if (backMove) {
            this.board[nextPosition.x][nextPosition.y].piece
                = whiteTurn
                    ? GamePieceType.Black.toString()
                    : GamePieceType.White.toString();
            this.board[startPosition.x][startPosition.y].piece = null;
        }
        else {
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
    }
}
//# sourceMappingURL=gameBoard.js.map