import { BoardPosition } from './BoardPosition';
export class GamePiece {
    constructor(x, y, isBlack) {
        this.position = new BoardPosition({ x, y });
        this.position.setPiece(isBlack);
    }
}
//# sourceMappingURL=GamePiece.js.map