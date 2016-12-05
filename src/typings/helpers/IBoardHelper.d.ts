interface IBoardHelper {
    isBackGroundBlack(x: number, y: number): boolean;

    isPositionNotAdded(position: IBoardPosition, positions: IBoardPosition[]): boolean;

    getIndexToSearchOrder(x: number): number;

    getY0Start7End(y: number, isBlack: boolean): number;

    getY7Start0End(y: number, isBlack: boolean): number;
}