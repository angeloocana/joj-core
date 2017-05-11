import { IPiece } from './IPiece';
import { IPosition } from './IPosition';

export type IBoard = IPosition[][];

export interface IBoardSize {
    x: number;
    y: number;
}

export interface IStartEndRow {
    startRow: number;
    endRow: number;
}

export interface IBoardConf {
    size: IBoardSize;
    endRow: number;
    white: IStartEndRow;
    black: IStartEndRow;
}

export interface IGetInitialBoardResult {
    board: IPosition[][];
    whitePieces: IPiece[];
    blackPieces: IPiece[];
}

export type IMapBoardFunc = (position: IPosition) => IPosition;
