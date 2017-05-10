'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notContains = exports.contains = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contains(positions, position) {
    return positions.some(function (p) {
        return p.x === position.x && p.y === position.y;
    });
}
var notContains = _ramda2.default.compose(_ramda2.default.not, contains);
exports.contains = contains;
exports.notContains = notContains;
//# sourceMappingURL=Positions.js.map
//# sourceMappingURL=Positions.js.map