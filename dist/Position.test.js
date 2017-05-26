'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Position', function () {
    describe('hasSameXY', function () {
        it('true', function () {
            var position1 = { x: 2, y: 3 };
            var position2 = { x: 2, y: 3 };
            assert.equal(_index.Position.hasSameXY(position1, position2), true);
        });
        it('false', function () {
            var position1 = { x: 3, y: 2 };
            var position2 = { x: 2, y: 3 };
            assert.equal(_index.Position.hasSameXY(position1, position2), false);
        });
    });
    describe('hasBlackPiece', function () {
        it('return true for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.ok(_index.Position.hasBlackPiece(position));
        });
        it('return false for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.notOk(_index.Position.hasBlackPiece(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.notOk(_index.Position.hasBlackPiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(_index.Position.hasBlackPiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(_index.Position.hasBlackPiece(position));
            });
        });
    });
    describe('hasNoPiece', function () {
        it('return false for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.notOk(_index.Position.hasNoPiece(position));
        });
        it('return false for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.notOk(_index.Position.hasNoPiece(position));
        });
        describe('return true for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.ok(_index.Position.hasNoPiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.ok(_index.Position.hasNoPiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.ok(_index.Position.hasNoPiece(position));
            });
        });
    });
    describe('hasWhitePiece', function () {
        it('return false for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.notOk(_index.Position.hasWhitePiece(position));
        });
        it('return true for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.ok(_index.Position.hasWhitePiece(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.notOk(_index.Position.hasWhitePiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(_index.Position.hasWhitePiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(_index.Position.hasWhitePiece(position));
            });
        });
    });
    describe('hasPiece', function () {
        it('return true for black piece', function () {
            var position = { x: 2, y: 3, isBlack: true };
            assert.ok(_index.Position.hasPiece(position));
        });
        it('return true for white piece', function () {
            var position = { x: 2, y: 3, isBlack: false };
            assert.ok(_index.Position.hasPiece(position));
        });
        describe('return false for no piece', function () {
            it('null', function () {
                var position = { x: 2, y: 3, isBlack: null };
                assert.notOk(_index.Position.hasPiece(position));
            });
            it('undefined', function () {
                var position = { x: 2, y: 3, isBlack: undefined };
                assert.notOk(_index.Position.hasPiece(position));
            });
            it('no prop', function () {
                var position = { x: 2, y: 3 };
                delete position.isBlack;
                assert.notOk(_index.Position.hasPiece(position));
            });
        });
    });
    describe('isBackGroundBlack', function () {
        it('0,0 => true', function () {
            assert.ok(_index.Position.isBackGroundBlack(0, 0));
        });
        it('0,1 => false', function () {
            assert.ok(!_index.Position.isBackGroundBlack(0, 1));
        });
    });
    describe('getToSearchOrder', function () {
        var getToSearchOrder8x8 = _index.Position.getToSearchOrder({ x: 8, y: 8 });
        it('return 0 for 0', function () {
            return assert.equal(getToSearchOrder8x8(0), 0);
        });
        it('return 1 for 7', function () {
            return assert.equal(getToSearchOrder8x8(7), 1);
        });
        it('return 2 for 1', function () {
            return assert.equal(getToSearchOrder8x8(1), 2);
        });
        it('return 3 for 6', function () {
            return assert.equal(getToSearchOrder8x8(6), 3);
        });
        it('return 4 for 2', function () {
            return assert.equal(getToSearchOrder8x8(2), 4);
        });
        it('return 5 for 5', function () {
            return assert.equal(getToSearchOrder8x8(5), 5);
        });
        it('return 6 for 3', function () {
            return assert.equal(getToSearchOrder8x8(3), 6);
        });
        it('return 7 for 4', function () {
            return assert.equal(getToSearchOrder8x8(4), 7);
        });
        it('return null for invalid x', function () {
            return assert.notOk(getToSearchOrder8x8(-1));
        });
    });
    describe('getY0Start', function () {
        describe('4x4 Board', function () {
            describe('for white', function () {
                it('return 7 for 0', function () {
                    return assert.equal(_index.Position.getY0Start(4, 0, false), 3);
                });
                it('return 6 for 1', function () {
                    return assert.equal(_index.Position.getY0Start(4, 1, false), 2);
                });
                it('return 5 for 2', function () {
                    return assert.equal(_index.Position.getY0Start(4, 2, false), 1);
                });
                it('return 4 for 3', function () {
                    return assert.equal(_index.Position.getY0Start(4, 3, false), 0);
                });
            });
            describe('for black', function () {
                it('return 0 for 0', function () {
                    return assert.equal(_index.Position.getY0Start(4, 0, true), 0);
                });
                it('return 1 for 1', function () {
                    return assert.equal(_index.Position.getY0Start(4, 1, true), 1);
                });
                it('return 2 for 2', function () {
                    return assert.equal(_index.Position.getY0Start(4, 2, true), 2);
                });
                it('return 3 for 3', function () {
                    return assert.equal(_index.Position.getY0Start(4, 3, true), 3);
                });
            });
        });
        describe('8x8 Board', function () {
            describe('for white', function () {
                it('return 7 for 0', function () {
                    return assert.equal(_index.Position.getY0Start(8, 0, false), 7);
                });
                it('return 6 for 1', function () {
                    return assert.equal(_index.Position.getY0Start(8, 1, false), 6);
                });
                it('return 5 for 2', function () {
                    return assert.equal(_index.Position.getY0Start(8, 2, false), 5);
                });
                it('return 4 for 3', function () {
                    return assert.equal(_index.Position.getY0Start(8, 3, false), 4);
                });
                it('return 3 for 4', function () {
                    return assert.equal(_index.Position.getY0Start(8, 4, false), 3);
                });
                it('return 2 for 5', function () {
                    return assert.equal(_index.Position.getY0Start(8, 5, false), 2);
                });
                it('return 1 for 6', function () {
                    return assert.equal(_index.Position.getY0Start(8, 6, false), 1);
                });
                it('return 0 for 7', function () {
                    return assert.equal(_index.Position.getY0Start(8, 7, false), 0);
                });
            });
            describe('for black', function () {
                it('return 0 for 0', function () {
                    return assert.equal(_index.Position.getY0Start(8, 0, true), 0);
                });
                it('return 1 for 1', function () {
                    return assert.equal(_index.Position.getY0Start(8, 1, true), 1);
                });
                it('return 2 for 2', function () {
                    return assert.equal(_index.Position.getY0Start(8, 2, true), 2);
                });
                it('return 3 for 3', function () {
                    return assert.equal(_index.Position.getY0Start(8, 3, true), 3);
                });
                it('return 4 for 4', function () {
                    return assert.equal(_index.Position.getY0Start(8, 4, true), 4);
                });
                it('return 5 for 5', function () {
                    return assert.equal(_index.Position.getY0Start(8, 5, true), 5);
                });
                it('return 6 for 6', function () {
                    return assert.equal(_index.Position.getY0Start(8, 6, true), 6);
                });
                it('return 7 for 7', function () {
                    return assert.equal(_index.Position.getY0Start(8, 7, true), 7);
                });
            });
        });
    });
    describe('getY0End', function () {
        describe('4x4 Board', function () {
            var getY0End4x4 = _index.Position.getY0End(4);
            describe('for white', function () {
                it('return 0 for 0', function () {
                    return assert.equal(getY0End4x4(0, false), 0);
                });
                it('return 1 for 1', function () {
                    return assert.equal(getY0End4x4(1, false), 1);
                });
                it('return 2 for 2', function () {
                    return assert.equal(getY0End4x4(2, false), 2);
                });
                it('return 3 for 3', function () {
                    return assert.equal(getY0End4x4(3, false), 3);
                });
            });
            describe('for black', function () {
                it('return 7 for 0', function () {
                    return assert.equal(getY0End4x4(0, true), 3);
                });
                it('return 6 for 1', function () {
                    return assert.equal(getY0End4x4(1, true), 2);
                });
                it('return 5 for 2', function () {
                    return assert.equal(getY0End4x4(2, true), 1);
                });
                it('return 4 for 3', function () {
                    return assert.equal(getY0End4x4(3, true), 0);
                });
            });
        });
        describe('8x8 Board', function () {
            var getY0End8x8 = _index.Position.getY0End(8);
            describe('for white', function () {
                it('return 0 for 0', function () {
                    return assert.equal(getY0End8x8(0, false), 0);
                });
                it('return 1 for 1', function () {
                    return assert.equal(getY0End8x8(1, false), 1);
                });
                it('return 2 for 2', function () {
                    return assert.equal(getY0End8x8(2, false), 2);
                });
                it('return 3 for 3', function () {
                    return assert.equal(getY0End8x8(3, false), 3);
                });
                it('return 4 for 4', function () {
                    return assert.equal(getY0End8x8(4, false), 4);
                });
                it('return 5 for 5', function () {
                    return assert.equal(getY0End8x8(5, false), 5);
                });
                it('return 6 for 6', function () {
                    return assert.equal(getY0End8x8(6, false), 6);
                });
                it('return 7 for 7', function () {
                    return assert.equal(getY0End8x8(7, false), 7);
                });
            });
            describe('for black', function () {
                it('return 7 for 0', function () {
                    return assert.equal(getY0End8x8(0, true), 7);
                });
                it('return 6 for 1', function () {
                    return assert.equal(getY0End8x8(1, true), 6);
                });
                it('return 5 for 2', function () {
                    return assert.equal(getY0End8x8(2, true), 5);
                });
                it('return 4 for 3', function () {
                    return assert.equal(getY0End8x8(3, true), 4);
                });
                it('return 3 for 4', function () {
                    return assert.equal(getY0End8x8(4, true), 3);
                });
                it('return 2 for 5', function () {
                    return assert.equal(getY0End8x8(5, true), 2);
                });
                it('return 1 for 6', function () {
                    return assert.equal(getY0End8x8(6, true), 1);
                });
                it('return 0 for 7', function () {
                    return assert.equal(getY0End8x8(7, true), 0);
                });
            });
        });
    });
    describe('containsXY', function () {
        it('not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.notOk(_index.Position.containsXY(positions, position));
        });
        it('contains', function () {
            var position = { x: 3, y: 0 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.ok(_index.Position.containsXY(positions, position));
        });
        it('undefined not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = undefined;
            assert.notOk(_index.Position.containsXY(positions, position));
        });
    });
    describe('positionsNotContains', function () {
        it('not contains', function () {
            var position = { x: 5, y: 2 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.ok(_index.Position.notContainsXY(positions, position));
        });
        it('contains', function () {
            var position = { x: 3, y: 0 };
            var positions = [{ x: 4, y: 0 }, { x: 3, y: 0 }];
            assert.notOk(_index.Position.notContainsXY(positions, position));
        });
    });
    describe('setICanGoHere', function () {
        it('I can go here', function () {
            var positionsWhereCanIGo = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
            var oldPosition = { x: 0, y: 0 };
            var newPosition = _index.Position.setICanGoHere(positionsWhereCanIGo, oldPosition);
            assert.notOk(oldPosition.iCanGoHere);
            assert.ok(newPosition.iCanGoHere);
            assert.notEqual(oldPosition, newPosition);
        });
    });
    describe('getOrderedPositionsY0End', function () {
        describe('board=8x8', function () {
            var getOrderedPositionsY0End8x8 = _ramda2.default.curry(_index.Position.getOrderedPositionsY0EndCurried(8));
            describe('white positions', function () {
                var getOrderedPositionsY0End8x8ForWhite = getOrderedPositionsY0End8x8(false);
                it('return all positions in orderedPositions[0]', function () {
                    var positions = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }];
                    var orderedPositions = getOrderedPositionsY0End8x8ForWhite(positions);
                    assert.equal(orderedPositions[0].length, 8);
                });
            });
            describe('black positions', function () {
                var getOrderedPositionsY0End8x8ForBlack = getOrderedPositionsY0End8x8(true);
                it('return all positions in orderedPositions[0]', function () {
                    var positions = [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }];
                    var orderedPositions = getOrderedPositionsY0End8x8ForBlack(positions);
                    assert.equal(orderedPositions[0].length, 8);
                });
                it('return all positions in orderedPositions[7]', function () {
                    var positions = [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }];
                    var orderedPositions = getOrderedPositionsY0End8x8ForBlack(positions);
                    assert.equal(orderedPositions[0].length, 8);
                });
            });
        });
    });
});
//# sourceMappingURL=Position.test.js.map
//# sourceMappingURL=Position.test.js.map