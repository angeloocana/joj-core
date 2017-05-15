'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isComputer = exports.createPlayers = exports.createWhitePlayer = exports.createBlackPlayer = exports.createPlayerCurried = exports.createPlayer = undefined;

var _ramda = require('ramda');

function createPlayer(isBlack, args) {
    return {
        ai: args.ai,
        name: args.name,
        foto: args.foto,
        isBlack: isBlack
    };
}
var createPlayerCurried = (0, _ramda.curry)(createPlayer);
var createWhitePlayer = createPlayerCurried(false);
var createBlackPlayer = createPlayerCurried(true);
function isComputer(player) {
    return player.ai ? true : false;
}
var initialPlayers = {
    white: {
        isBlack: false,
        name: 'White'
    },
    black: {
        isBlack: true,
        name: 'Black'
    }
};
function createPlayers(args) {
    return args ? {
        white: createWhitePlayer(args.white),
        black: createBlackPlayer(args.black)
    } : initialPlayers;
}
exports.createPlayer = createPlayer;
exports.createPlayerCurried = createPlayerCurried;
exports.createBlackPlayer = createBlackPlayer;
exports.createWhitePlayer = createWhitePlayer;
exports.createPlayers = createPlayers;
exports.isComputer = isComputer;
//# sourceMappingURL=Player.js.map
//# sourceMappingURL=Player.js.map