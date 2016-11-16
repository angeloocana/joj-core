"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardHelper = function () {
    function BoardHelper() {
        _classCallCheck(this, BoardHelper);
    }

    _createClass(BoardHelper, null, [{
        key: "isBackGroundBlack",
        value: function isBackGroundBlack(x, y) {
            if (x % 2 === 0) {
                if (y % 2 === 0) return true;else return false;
            } else {
                if (y % 2 === 0) return false;else return true;
            }
        }
    }, {
        key: "isPositionNotAdded",
        value: function isPositionNotAdded(position, positions) {
            return positions.find(function (p) {
                return p.x == position.x && p.y == position.y;
            }) ? true : false;
        }
    }, {
        key: "getIndexToSearchOrder",
        value: function getIndexToSearchOrder(x) {
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
    }, {
        key: "getY0Start7End",
        value: function getY0Start7End(y, isBlack) {
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
    }, {
        key: "getY7Start0End",
        value: function getY7Start0End(y, isBlack) {
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
    }]);

    return BoardHelper;
}();

exports.default = BoardHelper;