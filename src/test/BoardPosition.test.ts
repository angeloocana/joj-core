import { equal } from 'ptz-assert';
import { BoardPosition } from '../BoardPosition';
import { IBoardPosition } from '../typings/IBoardPosition';

describe('BoardPosition', () => {
    describe('New', () => {
        var position: IBoardPosition;

        beforeEach(() => {
            position = new BoardPosition({ x: 0, y: 0 });
        });

        it('x');
    });

    describe('isBlackPiece', () => {
        var position: IBoardPosition;

        beforeEach(() => {
            position = new BoardPosition({ x: 0, y: 0 });
        });

        it('true', () => {
            position.setPiece(true);
            const actual = position.isBlackPiece();
            equal(actual, true);
        });

        it('false', () => {
            position.setPiece(false);
            const actual = position.isBlackPiece();
            equal(actual, false);
        });

        it('null', () => {
            position.removePiece();
            const actual = position.isBlackPiece();
            equal(actual, null);
        });
    });

    describe('isSamePositionAs', () => {
        it('true', () => {
            const position1 = new BoardPosition({ x: 2, y: 3 });
            const position2 = new BoardPosition({ x: 2, y: 3 });
            equal(position1.isSamePositionAs(position2), true);
        });

        it('false', () => {
            const position1 = new BoardPosition({ x: 3, y: 2 });
            const position2 = new BoardPosition({ x: 2, y: 3 });
            equal(position1.isSamePositionAs(position2), false);
        });
    });

    describe('setPiece', () => {
        var position: IBoardPosition;

        beforeEach(() => {
            position = new BoardPosition({ x: 0, y: 0 });
        });

        it('black', () => {
            position.setPiece(true);
            equal(position.isBlackPiece(), true);
            equal(position.isEmpty(), false);
        });

        it('white', () => {
            position.setPiece(false);
            equal(position.isBlackPiece(), false);
            equal(position.isEmpty(), false);
        });

        it('empty', () => {
            position.setPiece(null);
            equal(position.isEmpty(), true);
        });
    });

    describe('isEmpty', () => {
        var position: IBoardPosition;

        beforeEach(() => {
            position = new BoardPosition({ x: 2, y: 3 });
        });

        it('true', () => {
            position.removePiece();
            equal(position.isEmpty(), true);
        });

        it('false, black piece', () => {
            position.setPiece(true);
            equal(position.isEmpty(), false);
        });

        it('false, white piece', () => {
            position.setPiece(false);
            equal(position.isEmpty(), false);
        });
    });
});
