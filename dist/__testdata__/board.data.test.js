'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.xAndYStartBoard = exports.unicodeStartBoard = exports.initialBoardExpected = exports.defaultInitialBoard = undefined;

var _index = require('../index');

/**
 * [ATTENTION] USE IT ONLY FOR TESTS!
 * Code for any board size =D
 *
 * Default 8x8 board in start position
 */
var defaultInitialBoard = _index.Board.getInitialBoard(_index.Board.defaultBoardSize);
// tslint:disable:no-string-literal
// tslint:disable:max-line-length
var initialBoardExpected = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }].map(_index.Position.setPieceToBlack), [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }], [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }], [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }], [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }], [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }], [{ x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }], [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }].map(_index.Position.setPieceToWhite)];
var whiteRow = '\u25D9\u25CF\u25D9\u25CF\u25D9\u25CF\u25D9\u25CF\n';
var cleanRowWhite = '\u2588 \u2588 \u2588 \u2588 \n';
var cleanRowBlack = ' \u2588 \u2588 \u2588 \u2588\n';
var blackRow = '\u25CB\u25D8\u25CB\u25D8\u25CB\u25D8\u25CB\u25D8\n';
var unicodeStartBoard = blackRow + cleanRowWhite + cleanRowBlack + cleanRowWhite + cleanRowBlack + cleanRowWhite + cleanRowBlack + whiteRow;
var xAndYStartBoard = ' 0,0 | 1,0 | 2,0 | 3,0 | 4,0 | 5,0 | 6,0 | 7,0 |\n' + ' 0,1 | 1,1 | 2,1 | 3,1 | 4,1 | 5,1 | 6,1 | 7,1 |\n' + ' 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | 5,2 | 6,2 | 7,2 |\n' + ' 0,3 | 1,3 | 2,3 | 3,3 | 4,3 | 5,3 | 6,3 | 7,3 |\n' + ' 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | 5,4 | 6,4 | 7,4 |\n' + ' 0,5 | 1,5 | 2,5 | 3,5 | 4,5 | 5,5 | 6,5 | 7,5 |\n' + ' 0,6 | 1,6 | 2,6 | 3,6 | 4,6 | 5,6 | 6,6 | 7,6 |\n' + ' 0,7 | 1,7 | 2,7 | 3,7 | 4,7 | 5,7 | 6,7 | 7,7 |\n';
exports.defaultInitialBoard = defaultInitialBoard;
exports.initialBoardExpected = initialBoardExpected;
exports.unicodeStartBoard = unicodeStartBoard;
exports.xAndYStartBoard = xAndYStartBoard;
//# sourceMappingURL=board.data.test.js.map
//# sourceMappingURL=board.data.test.js.map