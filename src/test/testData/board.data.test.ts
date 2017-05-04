// tslint:disable:max-line-length
const cleanBoard = [
  [{ x: 0, y: 0, isBlackHome: true }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7, isWhiteHome: true }],
  [{ x: 1, y: 0, isBlackHome: true }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7, isWhiteHome: true }],
  [{ x: 2, y: 0, isBlackHome: true }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7, isWhiteHome: true }],
  [{ x: 3, y: 0, isBlackHome: true }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7, isWhiteHome: true }],
  [{ x: 4, y: 0, isBlackHome: true }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7, isWhiteHome: true }],
  [{ x: 5, y: 0, isBlackHome: true }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7, isWhiteHome: true }],
  [{ x: 6, y: 0, isBlackHome: true }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7, isWhiteHome: true }],
  [{ x: 7, y: 0, isBlackHome: true }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 }, { x: 7, y: 7, isWhiteHome: true }]
];

const boardStartPositions = [
  [{ x: 0, y: 0, isBlackHome: true, piece: 'B' }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 1, y: 0, isBlackHome: true, piece: 'B' }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 2, y: 0, isBlackHome: true, piece: 'B' }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 3, y: 0, isBlackHome: true, piece: 'B' }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 4, y: 0, isBlackHome: true, piece: 'B' }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 5, y: 0, isBlackHome: true, piece: 'B' }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 6, y: 0, isBlackHome: true, piece: 'B' }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7, isWhiteHome: true, piece: 'W' }],
  [{ x: 7, y: 0, isBlackHome: true, piece: 'B' }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 }, { x: 7, y: 7, isWhiteHome: true, piece: 'W' }]
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

export {
  cleanBoard, boardStartPositions, unicodeStartBoard
};
