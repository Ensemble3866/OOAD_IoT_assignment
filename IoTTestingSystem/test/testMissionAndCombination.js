const should = require('should');
const TestVersion = require('../lib/testVersion');
const TestMission = require('../lib/testMission');
const testdata = require('./testdata');

var testVersionManager = testdata.testVersionManager;

var testMission = new TestMission(testVersionManager.GetVersionByCategory("Phone"),
                                  testVersionManager.GetVersionByCategory("App"),
                                  testVersionManager.GetVersionByCategory("Frameware"),
                                  testVersionManager.GetVersionByCategory("感測器"),
                                  testVersionManager.GetVersionByCategory("Config"));

describe('#TestMission', () => {
    it('Test testMission lifecycle', done => {
        testMission.GetCombinationAmount().should.equal(48);
        testMission.GetStatus().should.equal("inital");
        testMission.StartTesting();
        testMission.GetStatus().should.equal("testing");
        done();
    })
});
                
describe('#TestCombination', () => {
    it('Test testCombination function', done => {
        let categories = testMission.GetCombinationByIndex(0).GetCategories();
        categories[0].should.equal("Phone");
        categories[1].should.equal("App");
        categories[2].should.equal("Frameware");
        categories[3].should.equal("感測器");
        categories[4].should.equal("Config");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Phone").GetName().should.equal("Android 5.01");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("App").GetName().should.equal("MyApp 1.00");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Frameware").GetName().should.equal("J");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("感測器").GetName().should.equal("Monitor 1.0");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Config").GetName().should.equal("JP");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Phone").GetName().should.equal("Android Oreo");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("App").GetName().should.equal("MyApp Beta");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Frameware").GetName().should.equal("J1");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("感測器").GetName().should.equal("Thermo 1.1");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Config").GetName().should.equal("TW");
        done();
    })
});