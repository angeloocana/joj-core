'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPlayers = exports.createWhitePlayer = exports.createBlackPlayer = exports.createPlayer = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPlayer = _ramda2.default.curry(function (isBlack, args) {
    return {
        isAi: args.isAi,
        name: args.name,
        foto: args.foto,
        isBlack: isBlack
    };
});
var createWhitePlayer = createPlayer(false);
var createBlackPlayer = createPlayer(true);
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
exports.createBlackPlayer = createBlackPlayer;
exports.createWhitePlayer = createWhitePlayer;
exports.createPlayers = createPlayers;
//# sourceMappingURL=Player.js.map
//# sourceMappingURL=Player.js.map