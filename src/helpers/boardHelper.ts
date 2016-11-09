export default class BoardHelper {

    //Tested
    static isBackGroundBlack(x: number, y: number): boolean {
        if (x % 2 === 0) {
            if (y % 2 === 0)
                return true;
            else
                return false;
        } else {
            if (y % 2 === 0)
                return false;
            else
                return true;
        }
    }

    //Tested
    static isPositionNotAdded(position: IGamePosition, positions: IGamePosition[])
        : boolean {

        return positions.find(p =>
            p.x == position.x && p.y == position.y)
            ? true : false;
    }

    static getIndexToSearchOrder(x: number): number {
        switch (x) {
            case 0:
                return 0;
            case 1:
                return 2;
            case 2:
                return 4;
            case 3:
                return 6;
            case 4:
                return 7;
            case 5:
                return 5;
            case 6:
                return 3;
            case 7:
                return 1;
            default:
                return null;
        }
    }

    //Tested
    static getY0Start7End(y: number, isBlack: boolean)
        : number {
        if (isBlack)
            return y;

        switch (y) {
            case 0:
                return 7;
            case 1:
                return 6;
            case 2:
                return 5;
            case 3:
                return 4;
            case 4:
                return 3;
            case 5:
                return 2;
            case 6:
                return 1;
            case 7:
                return 0;
            default:
                return null;
        }
    }

    //Tested
    static getY7Start0End(y: number, isBlack: boolean): number {
        if (!isBlack)
            return y;

        switch (y) {
            case 0:
                return 7;
            case 1:
                return 6;
            case 2:
                return 5;
            case 3:
                return 4;
            case 4:
                return 3;
            case 5:
                return 2;
            case 6:
                return 1;
            case 7:
                return 0;
            default:
                return null;
        }
    }
}
