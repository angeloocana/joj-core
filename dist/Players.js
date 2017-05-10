'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = undefined;

var _Player = require('./Player');

var Player = _interopRequireWildcard(_Player);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function create(args) {
    return {
        white: Player.createWhite(args.white),
        black: Player.createBlack(args.black)
    };
}
exports.create = create;
//# sourceMappingURL=Players.js.map
//# sourceMappingURL=Players.js.map