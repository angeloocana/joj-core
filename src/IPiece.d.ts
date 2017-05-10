import { IPosition } from './IPosition';
import { IPositionsWhereCanIGo } from './IPositionsWhereCanIGo';

export interface IPiece {
    position: IPosition;

    whereCanIGo?: IPositionsWhereCanIGo;
    movimentsToWin?: number[];
}
