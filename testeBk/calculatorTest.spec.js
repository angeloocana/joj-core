"use strict";
/// <reference path="../typings/globals/mocha/index.d.ts" />
var index_1 = require('../index');
describe('Calculator', function () {
    var subject;
    beforeEach(function () {
        subject = new index_1["default"]();
    });
    describe('#add', function () {
        it('should add two numbers together', function () {
            var result = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});
