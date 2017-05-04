"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function isBackGroundBlack(x, y) {
    if (x % 2 === 0) {
        if (y % 2 === 0) return true;else return false;
    } else {
        if (y % 2 === 0) return false;else return true;
    }
}
function isPositionNotAdded(position, positions) {
    return positions.find(function (p) {
        return p.x === position.x && p.y === position.y;
    }) ? true : false;
}
function getIndexToSearchOrder(x) {
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
function getY0Start7End(y, isBlack) {
    if (isBlack) return y;
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
function getY7Start0End(y, isBlack) {
    if (!isBlack) return y;
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
var boardHelper = exports.boardHelper = {
    isBackGroundBlack: isBackGroundBlack,
    isPositionNotAdded: isPositionNotAdded,
    getIndexToSearchOrder: getIndexToSearchOrder,
    getY0Start7End: getY0Start7End,
    getY7Start0End: getY7Start0End
};
//# sourceMappingURL=BoardHelper.js.map
//# sourceMappingURL=BoardHelper.js.map