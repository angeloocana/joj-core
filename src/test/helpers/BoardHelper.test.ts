import { equal, notOk, ok } from 'ptz-assert';
import {
    boardHelper,
    BoardPosition
} from '../../index';

describe('GameBoard', () => {

    describe('isBackGroundBlack', () => {
        it('0,0 => true', () => {
            ok(boardHelper.isBackGroundBlack(0, 0));
        });

        it('0,1 => false', () => {
            ok(!boardHelper.isBackGroundBlack(0, 1));
        });
    });

    describe('isPositionNotAdded', () => {
        it('added', () => {
            const position = new BoardPosition({ x: 5, y: 2 });

            const positions = [new BoardPosition({ x: 4, y: 0 }),
            new BoardPosition({ x: 3, y: 0 })];

            ok(boardHelper.isPositionNotAdded(position, positions));
        });

        it('not added', () => {
            const position = new BoardPosition({ x: 3, y: 0 });

            const positions = [new BoardPosition({ x: 4, y: 0 }),
            new BoardPosition({ x: 3, y: 0 })];

            notOk(boardHelper.isPositionNotAdded(position, positions));
        });
    });

    describe('getY0Start7End', () => {
        it('for white y2 should return 5', () => {
            const y = 2;
            const isBlack = false;

            equal(boardHelper.getY0Start7End(y, isBlack), 5);
        });

        it('for black y2 should return 2', () => {
            const y = 2;
            const isBlack = true;

            equal(boardHelper.getY0Start7End(y, isBlack), 2);
        });
    });

    describe('getY7Start0End', () => {
        it('for white y2 should return 2', () => {
            const y = 2;
            const isBlack = false;

            equal(boardHelper.getY7Start0End(y, isBlack), 2);
        });

        it('for black y2 should return 5', () => {
            const y = 2;
            const isBlack = true;

            equal(boardHelper.getY7Start0End(y, isBlack), 5);
        });
    });
});
