import { IPosition } from './IPosition';

/**
 * Board = IPosition[position.y][position.x]
 *
 * x = rows, y = columns
 */
export type IBoard = IPosition[][];

export interface IBoardSize {
    x: number;
    y: number;
}

export interface IStartEndRow {
    startRow: number;
    endRow: number;
}

export interface IStartEndRows {
    white: IStartEndRow;
    black: IStartEndRow;
}

export type IMapBoardFunc = (position: IPosition) => IPosition;
