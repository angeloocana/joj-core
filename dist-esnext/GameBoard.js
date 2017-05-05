import { BoardPosition } from './BoardPosition';
import { boardHelper } from './helpers/BoardHelper';
export const defaultBoardOptions = {
    size: {
        x: 8,
        y: 8
    }
};
export class GameBoard {
    /**
     * Game Board
     */
    constructor(args) {
        if (!args)
            args = {};
        this.logMove = args.logMove || false;
        this.boardOptions = args.boardOptions || { size: { x: 8, y: 8 } };
        this.generateBoard();
        this.fillAllPiecesOnBoard(args.whitePieces, args.blackPieces);
    }
    fillPiecesOnBoard(pieces) {
        if (!pieces)
            return;
        pieces.forEach(piece => this.getPosition(piece.position).setPiece(piece.position.isBlackPiece()));
    }
    fillAllPiecesOnBoard(whitePieces, blackPieces) {
        this.fillPiecesOnBoard(whitePieces);
        this.fillPiecesOnBoard(blackPieces);
    }
    generateBoard() {
        this.board = [];
        for (let x = 0; x < this.boardOptions.size.x; x++) {
            for (let y = 0; y < this.boardOptions.size.y; y++) {
                if (!this.board[x])
                    this.board[x] = [];
                const position = new BoardPosition({ x, y });
                if (y === this.boardOptions.size.y - 1)
                    position.isWhiteHome = true;
                if (y === 0)
                    position.isBlackHome = true;
                this.board[x][y] = position;
            }
        }
    }
    boardHasThisPosition(position) {
        return (position.x < 0
            || position.y < 0
            || position.x >= this.boardOptions.size.x
            || position.y >= this.boardOptions.size.y)
            ? false : true;
    }
    getPosition(position) {
        try {
            return this.board[position.x][position.y];
        }
        catch (e) {
            console.log('Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
            console.log(position);
            console.log('Error getting position: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
            throw new Error('Error getting position');
        }
    }
    getNearPositions(position, onlyEmpty) {
        const positions = [];
        const board = this;
        function add(plusX, plusY) {
            var newPosition = new BoardPosition({
                x: position.x + plusX,
                y: position.y + plusY
            });
            if (!board.boardHasThisPosition(newPosition))
                return;
            newPosition = board.getPosition(newPosition);
            if (typeof onlyEmpty !== 'undefined') {
                if (onlyEmpty === newPosition.isEmpty())
                    positions.push(newPosition);
            }
            else
                positions.push(newPosition);
        }
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
        var jumpPosition = new BoardPosition({ x: 0, y: 0 });
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
        if (!this.boardHasThisPosition(jumpPosition)) {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            // console.log("getJumpPosition boardHasThisPosition = false");
            // console.log("startPosition");
            // console.log(startPosition);
            // console.log("toJumpPosition");
            // console.log(toJumpPosition);
            // console.log("jumpPosition");
            // console.log(jumpPosition);
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            return;
        }
        jumpPosition = this.getPosition(jumpPosition);
        if (!jumpPosition.isEmpty()) {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            // console.log("getJumpPosition isEmpty = false");
            // console.log("startPosition");
            // console.log(startPosition);
            // console.log("toJumpPosition");
            // console.log(toJumpPosition);
            // console.log("jumpPosition");
            // console.log(jumpPosition);
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            return;
        }
        return jumpPosition;
    }
    // tslint:disable-next-line:max-line-length
    whereCanIJump(jumpStartPosition, positions, orderedPositions, isBlack) {
        const nearFilledPositions = this.getNearPositions(jumpStartPosition, false);
        nearFilledPositions.forEach(nearFilledPosition => {
            const jumpPosition = this.getJumpPosition(jumpStartPosition, nearFilledPosition);
            if (jumpPosition) {
                if (boardHelper.isPositionNotAdded(jumpPosition, positions)) {
                    jumpPosition.lastPosition = jumpStartPosition;
                    jumpPosition.jumpingBlackPiece = nearFilledPosition.isBlackPiece();
                    jumpPosition.jumps = jumpStartPosition.jumps ? jumpStartPosition.jumps++ : 2;
                    positions.push(jumpPosition);
                    const y = boardHelper.getY0Start7End(jumpPosition.y, isBlack);
                    if (!orderedPositions[y])
                        orderedPositions[y] = [];
                    orderedPositions[y][boardHelper.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;
                    this.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                }
            }
        });
    }
    getPositionsWhereCanIGo(startPosition, isBlack) {
        if (!startPosition)
            return null;
        const allNearPositions = this.getNearPositions(startPosition, undefined);
        const positions = [];
        const orderedPositions = [];
        for (let i = 0; i < allNearPositions.length; i++) {
            const nearPosition = allNearPositions[i];
            if (nearPosition.isEmpty()) {
                positions.push(nearPosition);
                const y = boardHelper.getY0Start7End(nearPosition.y, isBlack);
                if (!orderedPositions[y])
                    orderedPositions[y] = [];
                orderedPositions[y][boardHelper.getIndexToSearchOrder(nearPosition.x)] = nearPosition;
            }
            else {
                const jumpPosition = this.getJumpPosition(startPosition, nearPosition);
                if (jumpPosition) {
                    jumpPosition.jumps = 1;
                    positions.push(jumpPosition);
                    const y = boardHelper.getY0Start7End(jumpPosition.y, isBlack);
                    if (!orderedPositions[y])
                        orderedPositions[y] = [];
                    orderedPositions[y][boardHelper.getIndexToSearchOrder(jumpPosition.x)] = jumpPosition;
                    this.whereCanIJump(jumpPosition, positions, orderedPositions, isBlack);
                }
            }
        }
        return {
            positions,
            orderedPositions
        };
    }
    setWhereCanIGo(startPosition, blackPiece) {
        const positions = this.getPositionsWhereCanIGo(startPosition, blackPiece).positions;
        positions.forEach(position => {
            this.getPosition(position).iCanGoHere = true;
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
    printUnicode() {
        var board = '';
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[y].length; x++) {
                const position = this.board[x][y];
                if (boardHelper.isBackGroundBlack(x, y)) {
                    if (position.isWhitePiece())
                        board += '\u{25CF}';
                    else if (position.isBlackPiece())
                        board += '\u{25CB}';
                    else
                        board += ' ';
                }
                else {
                    if (position.isWhitePiece())
                        board += '\u{25D9}';
                    else if (position.isBlackPiece())
                        board += '\u{25D8}';
                    else
                        board += '\u{2588}';
                }
            }
            board += '\n';
        }
        return board;
    }
    move(startPosition, nextPosition, backMove, whiteTurn) {
        if (backMove) {
            this.getPosition(nextPosition).setPiece(!whiteTurn);
            this.getPosition(startPosition).removePiece();
        }
        else
            this.getPosition(startPosition).move(this.getPosition(nextPosition));
        let jumpPosition = nextPosition.lastPosition;
        while (jumpPosition) {
            this.getPosition(jumpPosition).lastMoveJump = true;
            jumpPosition = jumpPosition.lastPosition;
        }
        this.getPosition(nextPosition).lastMove = true;
        this.getPosition(startPosition).lastMove = true;
        if (this.logMove)
            console.log(this.printUnicode());
    }
}
//# sourceMappingURL=GameBoard.js.map