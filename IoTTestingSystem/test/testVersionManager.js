const should = require('should');
const TestVersion = require('../lib/testVersion');
const TestVersionManager = require('../lib/testVersionManager');

var testVersionManager = new TestVersionManager();
var testVersionManagerEmpty = new TestVersionManager();

describe('#TestVersionManager.constructor #TestVersionManager.MakeNewVersion', () => {
    it('should return the attribute of VersionList', done => {
        testVersionManager.MakeNewVersion("Android 5.01", "Phone");
        testVersionManager.MakeNewVersion("Android 5.02", "Phone");
        testVersionManager.MakeNewVersion("Android Oreo", "Phone");
        testVersionManager.MakeNewVersion("J", "Firmware");
        testVersionManager.MakeNewVersion("J1", "Firmware");
        testVersionManager.MakeNewVersion("Monitor 1.0", "Sensor");
        testVersionManager.MakeNewVersion("Thermo 1.1", "Sensor");

        testVersionManager.versionList[0].name.should.equal("Android 5.01");
        testVersionManager.versionList[0].category.should.equal("Phone");
        testVersionManager.versionList[6].name.should.equal("Thermo 1.1");
        testVersionManager.versionList[6].category.should.equal("Sensor");

        should.not.exist(testVersionManagerEmpty.versionList[0]);
        done();
    })
});

describe('#TestVersionManager.GetVersionByCategory', () => {
    it('should return the attribute of Version', done => {
        let versionList = testVersionManager.GetVersionByCategory("Phone");
        versionList[0].category.should.equal("Phone");
        versionList[0].name.should.equal("Android 5.01");
        versionList[1].name.should.equal("Android 5.02");
        versionList[2].name.should.equal("Android Oreo");

        let versionEmptyList = testVersionManagerEmpty.GetVersionByCategory("Phone");
        (versionEmptyList.length > 0).should.not.be.true;
        done();
    })
});

describe('#TestVersionManager.GetCategories', () => {
    it('should return the attribute of CategoryList', done => {
        let categoryList = testVersionManager.GetCategories();
        categoryList[0].should.equal("Phone");
        categoryList[1].should.equal("Firmware");
        categoryList[2].should.equal("Sensor");

        let categoryEmptyList = testVersionManagerEmpty.GetCategories();
        (categoryEmptyList.length > 0).should.not.be.true;
        done();
    })
});

describe('#TestVersionManager.MakeVersionsSameCategory', () => {
    it('test MakeVersionsSameCategory method', done => {
        let PhoneVersionList = ["iOS 7", "iOS 8", "iOS 9"];
        let ConfigVersionList = ["CN", "US", "EU"];
        testVersionManager.MakeVersionsSameCategory(PhoneVersionList, "Phone");
        testVersionManager.MakeVersionsSameCategory(ConfigVersionList, "Config");
        
        testVersionManager.GetVersionByCategory("Phone").length.should.equal(6);
        testVersionManager.GetVersionByCategory("Phone")[3].name.should.equal("iOS 7");
        testVersionManager.GetVersionByCategory("Phone")[4].name.should.equal("iOS 8");
        testVersionManager.GetVersionByCategory("Phone")[5].name.should.equal("iOS 9");
        testVersionManager.GetVersionByCategory("Config").length.should.equal(3);
        testVersionManager.GetVersionByCategory("Config")[0].name.should.equal("CN");
        testVersionManager.GetVersionByCategory("Config")[1].name.should.equal("US");
        testVersionManager.GetVersionByCategory("Config")[2].name.should.equal("EU");
        testVersionManager.GetCategories().length.should.equal(4);
        done();
    })
});

exports.TestVersionManager = testVersionManager;
exports.TestVersionManagerEmpty = testVersionManagerEmpty;