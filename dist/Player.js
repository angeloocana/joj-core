'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isComputer = exports.createWhitePlayer = exports.createBlackPlayer = undefined;

var _ramda = require('ramda');

function createPlayer(isBlack, args) {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack: isBlack
    };
}
var curriedCreatePlayer = (0, _ramda.curry)(createPlayer);
var createWhitePlayer = curriedCreatePlayer(false);
var createBlackPlayer = curriedCreatePlayer(true);
function isComputer(player) {
    return player.ai ? true : false;
}
exports.createBlackPlayer = createBlackPlayer;
exports.createWhitePlayer = createWhitePlayer;
exports.isComputer = isComputer;
//# sourceMappingURL=Player.js.map
//# sourceMappingURL=Player.js.map