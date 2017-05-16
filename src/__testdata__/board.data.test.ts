import { Board, Position } from '../index';

const startBlackPiecesExpected = [
  { x: 0, y: 0, isBlack: true },
  { x: 1, y: 0, isBlack: true },
  { x: 2, y: 0, isBlack: true },
  { x: 3, y: 0, isBlack: true },
  { x: 4, y: 0, isBlack: true },
  { x: 5, y: 0, isBlack: true },
  { x: 6, y: 0, isBlack: true },
  { x: 7, y: 0, isBlack: true }
];

const startWhitePiecesExpected = [
  { x: 0, y: 7, isBlack: false },
  { x: 1, y: 7, isBlack: false },
  { x: 2, y: 7, isBlack: false },
  { x: 3, y: 7, isBlack: false },
  { x: 4, y: 7, isBlack: false },
  { x: 5, y: 7, isBlack: false },
  { x: 6, y: 7, isBlack: false },
  { x: 7, y: 7, isBlack: false }
];

const startBlackPiecesWhereCanIGoExpected = Position.getPositionsWhereCanIGoFromArray(true, [
  [[0, 0], [0, 1], [1, 1]],
  [[1, 0], [0, 1], [1, 1], [2, 1]],
  [[2, 0], [1, 1], [2, 1], [3, 1]],
  [[3, 0], [2, 1], [3, 1], [4, 1]],
  [[4, 0], [3, 1], [4, 1], [5, 1]],
  [[5, 0], [4, 1], [5, 1], [6, 1]],
  [[6, 0], [5, 1], [6, 1], [7, 1]],
  [[7, 0], [6, 1], [7, 1]]
]);

const startWhitePiecesWhereCanIGoExpected = Position.getPositionsWhereCanIGoFromArray(false, [
  [[0, 7], [0, 6], [1, 6]],
  [[1, 7], [0, 6], [1, 6], [2, 6]],
  [[2, 7], [1, 6], [2, 6], [3, 6]],
  [[3, 7], [2, 6], [3, 6], [4, 6]],
  [[4, 7], [3, 6], [4, 6], [5, 6]],
  [[5, 7], [4, 6], [5, 6], [6, 6]],
  [[6, 7], [5, 6], [6, 6], [7, 6]],
  [[7, 7], [6, 6], [7, 6]]
]);

const startPiecesExpected = [
  { x: 7, y: 0, isBlack: true }, { x: 7, y: 7, isBlack: false },
  { x: 6, y: 0, isBlack: true }, { x: 6, y: 7, isBlack: false },
  { x: 5, y: 0, isBlack: true }, { x: 5, y: 7, isBlack: false },
  { x: 4, y: 0, isBlack: true }, { x: 4, y: 7, isBlack: false },
  { x: 3, y: 0, isBlack: true }, { x: 3, y: 7, isBlack: false },
  { x: 2, y: 0, isBlack: true }, { x: 2, y: 7, isBlack: false },
  { x: 1, y: 0, isBlack: true }, { x: 1, y: 7, isBlack: false },
  { x: 0, y: 0, isBlack: true }, { x: 0, y: 7, isBlack: false }
];

// tslint:disable:max-line-length
const cleanBoardExpected = [
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }],
  [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }],
  [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }],
  [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }],
  [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }],
  [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }],
  [{ x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }],
  [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }]
];

/**
 * Clean 8x8 board
 */
const cleanBoard = Board.getCleanBoard(Board.defaultBoardSize);

/**
 * [ATTENTION] USE IT ONLY FOR TESTS!
 * Code for any board size =D
 *
 * Default 8x8 board in start position
 */
const initialBoard = Board.getInitialBoard(Board.defaultBoardSize);

// tslint:disable:no-string-literal
// tslint:disable:max-line-length
const initialBoardExpected = [
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }].map(Position.setPieceToBlack),
  [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }],
  [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }],
  [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }],
  [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }],
  [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }],
  [{ x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }],
  [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }].map(Position.setPieceToWhite)
];

const whiteRow = '\u{25D9}\u{25CF}\u{25D9}\u{25CF}\u{25D9}\u{25CF}\u{25D9}\u{25CF}\n';
const cleanRowWhite = '\u{2588} \u{2588} \u{2588} \u{2588} \n';
const cleanRowBlack = ' \u{2588} \u{2588} \u{2588} \u{2588}\n';
const blackRow = '\u{25CB}\u{25D8}\u{25CB}\u{25D8}\u{25CB}\u{25D8}\u{25CB}\u{25D8}\n';

const unicodeStartBoard = blackRow
  + cleanRowWhite
  + cleanRowBlack
  + cleanRowWhite
  + cleanRowBlack
  + cleanRowWhite
  + cleanRowBlack
  + whiteRow;

const xAndYStartBoard =
  ' 0,0 | 1,0 | 2,0 | 3,0 | 4,0 | 5,0 | 6,0 | 7,0 |\n' +
  ' 0,1 | 1,1 | 2,1 | 3,1 | 4,1 | 5,1 | 6,1 | 7,1 |\n' +
  ' 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | 5,2 | 6,2 | 7,2 |\n' +
  ' 0,3 | 1,3 | 2,3 | 3,3 | 4,3 | 5,3 | 6,3 | 7,3 |\n' +
  ' 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | 5,4 | 6,4 | 7,4 |\n' +
  ' 0,5 | 1,5 | 2,5 | 3,5 | 4,5 | 5,5 | 6,5 | 7,5 |\n' +
  ' 0,6 | 1,6 | 2,6 | 3,6 | 4,6 | 5,6 | 6,6 | 7,6 |\n' +
  ' 0,7 | 1,7 | 2,7 | 3,7 | 4,7 | 5,7 | 6,7 | 7,7 |\n';

export {
  cleanBoard,
  cleanBoardExpected,
  initialBoard,
  initialBoardExpected,
  startBlackPiecesExpected,
  startPiecesExpected,
  startWhitePiecesExpected,
  startBlackPiecesWhereCanIGoExpected,
  startWhitePiecesWhereCanIGoExpected,
  unicodeStartBoard,
  xAndYStartBoard
};
