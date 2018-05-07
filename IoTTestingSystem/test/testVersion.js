const should = require('should');
const TestVersion = require('../lib/testVersion');

var testVersion = new TestVersion("Android 5.01", "SmartPhone");
var testVersionError = new TestVersion();

describe('#TestVersion', () => {
    it('should return the attribute of version', done => {
        testVersion.GetName().should.equal("Android 5.01");
        testVersion.GetCategory().should.equal("SmartPhone");

        should.not.exist(testVersionError.GetName());
        should.not.exist(testVersionError.GetCategory());
        done();
    })
});