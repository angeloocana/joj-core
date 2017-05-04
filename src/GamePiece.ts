import { BoardPosition } from './BoardPosition';

import { IBoardPosition } from './typings/IBoardPosition';
import { IGamePiece } from './typings/IGamePiece';
import { IPositionsWhereCanIGo } from './typings/IPositionsWhereCanIGo';

export class GamePiece implements IGamePiece {
    position: IBoardPosition;

    whereCanIGo?: IPositionsWhereCanIGo;
    movimentsToWin?: number[];

    constructor(x: number, y: number, isBlack: boolean) {
        this.position = new BoardPosition({ x, y });
        this.position.setPiece(isBlack);
    }
}
