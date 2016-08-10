var chai = require('chai');
var spy = require('chai-spies');
var expect = chai.expect;
chai.use(spy);

describe('Check whether 2+2 = 4', function() {
    it('should return 4', function() {
        expect(2 + 2).to.equal(4);
    });
});

describe('check whether the setTimeout is working', function() {
    it('should console.log after 1000ms', function(done) {
        var start = new Date();
        setTimeout(function() {
            var duration = new Date() - start;
            expect(duration).to.be.closeTo(1000, 50);
            done();
        }, 1000);

    });
})


describe('Check how many times forEach is ran ', function() {
    it('forEach should run for each element', function() {
        var arr = [1, 2, 3];

        function add(element) {
            console.log(element);
        }

        log = chai.spy(add);
        arr.forEach(log);
        expect(log).to.have.been.called.exactly(arr.length);
    });
});

