import { IBoardPosition } from './IBoardPosition';
import { IPositionsWhereCanIGo } from './IPositionsWhereCanIGo';

export interface IGamePiece {
    position: IBoardPosition;

    whereCanIGo?: IPositionsWhereCanIGo;
    movimentsToWin?: number[];
}
