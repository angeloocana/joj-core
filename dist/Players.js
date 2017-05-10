'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPlayers = undefined;

var _Player = require('./Player');

function createPlayers(args) {
    return {
        white: (0, _Player.createWhitePlayer)(args.white),
        black: (0, _Player.createBlackPlayer)(args.black)
    };
}
exports.createPlayers = createPlayers;
//# sourceMappingURL=Players.js.map
//# sourceMappingURL=Players.js.map