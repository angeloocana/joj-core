'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require('./Game');

Object.keys(_Game).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Game[key];
    }
  });
});

var _Board = require('./Board');

Object.keys(_Board).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Board[key];
    }
  });
});

var _GameColor = require('./GameColor');

Object.keys(_GameColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GameColor[key];
    }
  });
});

var _Piece = require('./Piece');

Object.keys(_Piece).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Piece[key];
    }
  });
});

var _Player = require('./Player');

Object.keys(_Player).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Player[key];
    }
  });
});

var _Players = require('./Players');

Object.keys(_Players).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Players[key];
    }
  });
});

var _Position = require('./Position');

Object.keys(_Position).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Position[key];
    }
  });
});
//# sourceMappingURL=index.js.map