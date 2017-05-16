'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boardData = require('./board.data.test');

Object.keys(_boardData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _boardData[key];
    }
  });
});

var _gameData = require('./game.data.test');

Object.keys(_gameData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gameData[key];
    }
  });
});
//# sourceMappingURL=index.data.test.js.map