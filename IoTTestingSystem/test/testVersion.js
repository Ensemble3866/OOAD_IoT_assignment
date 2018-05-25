const should = require('should');
const TestVersion = require('../lib/testVersion');

var testVersion = new TestVersion("Android 5.01", "SmartPhone");
var testVersionError = new TestVersion();

describe('#TestVersion', () => {
    it('should return the attribute of version', done => {
        testVersion.name.should.equal("Android 5.01");
        testVersion.category.should.equal("SmartPhone");

        should.not.exist(testVersionError.name);
        should.not.exist(testVersionError.name);
        done();
    })
});