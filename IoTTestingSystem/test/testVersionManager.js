const should = require('should');
const TestVersion = require('../lib/testVersion');
const TestVersionManager = require('../lib/testVersionManager');

var testVersionManager = new TestVersionManager();
var testVersionManagerEmpty = new TestVersionManager();

describe('#TestVersionManager.GetVersion', () => {
    it('should return the attribute of VersionList', done => {
        testVersionManager.MakeNewVersion("Android 5.01", "SmartPhone");
        testVersionManager.MakeNewVersion("Android 5.02", "SmartPhone");
        testVersionManager.MakeNewVersion("Android Oreo", "SmartPhone");
        testVersionManager.MakeNewVersion("J", "Firmware");
        testVersionManager.MakeNewVersion("J1", "Firmware");
        testVersionManager.MakeNewVersion("Monitor 1.0", "Sensor");
        testVersionManager.MakeNewVersion("Thermo 1.1", "Sensor");

        testVersionManager.GetVersionByIndex(0).GetName().should.equal("Android 5.01");
        testVersionManager.GetVersionByIndex(0).GetCategory().should.equal("SmartPhone");
        testVersionManager.GetVersionByIndex(6).GetName().should.equal("Thermo 1.1");
        testVersionManager.GetVersionByIndex(6).GetCategory().should.equal("Sensor");

        should.not.exist(testVersionManagerEmpty.GetVersionByIndex(0));
        done();
    })
});

describe('#TestVersionManager.GetVersionByNameAndCategory', () => {
    it('should return the attribute of Version', done => {
        testVersionManager.GetVersionByNameAndCategory("J", "Firmware").GetName().should.equal("J");
        testVersionManager.GetVersionByNameAndCategory("J", "Firmware").GetCategory().should.equal("Firmware");

        should.not.exist(testVersionManagerEmpty.GetVersionByNameAndCategory("J", "Firmware"));
        done();
    })
});

describe('#TestVersionManager.GetVersionByCategory', () => {
    it('should return the attribute of Version', done => {
        let versionList = testVersionManager.GetVersionByCategory("SmartPhone");
        versionList[0].GetCategory().should.equal("SmartPhone");
        versionList[0].GetName().should.equal("Android 5.01");
        versionList[1].GetName().should.equal("Android 5.02");
        versionList[2].GetName().should.equal("Android Oreo");

        let versionEmptyList = testVersionManagerEmpty.GetVersionByCategory("SmartPhone");
        (versionEmptyList.length > 0).should.not.be.true;
        done();
    })
});

describe('#TestVersionManager.GetCategories', () => {
    it('should return the attribute of CategoryList', done => {
        let categoryList = testVersionManager.GetCategories();
        categoryList[0].should.equal("SmartPhone");
        categoryList[1].should.equal("Firmware");
        categoryList[2].should.equal("Sensor");

        let categoryEmptyList = testVersionManagerEmpty.GetCategories();
        (categoryEmptyList.length > 0).should.not.be.true;
        done();
    })
});

exports.TestVersionManager = testVersionManager;
exports.TestVersionManagerEmpty = testVersionManagerEmpty;