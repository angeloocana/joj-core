'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isComputer = exports.createWhite = exports.createBlack = undefined;

var _ramda = require('ramda');

function create(isBlack, args) {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack: isBlack
    };
}
var curriedCreate = (0, _ramda.curry)(create);
var createWhite = curriedCreate(false);
var createBlack = curriedCreate(true);
function isComputer(player) {
    return player.ai ? true : false;
}
exports.createBlack = createBlack;
exports.createWhite = createWhite;
exports.isComputer = isComputer;
//# sourceMappingURL=Player.js.map
//# sourceMappingURL=Player.js.map