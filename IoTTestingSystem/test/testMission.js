const should = require('should');
const TestMission = require('../lib/testMission');
const testdata = require('./testdata');

var testVersionManager = testdata.testVersionManager;
var testScriptManager = testdata.testScriptManager;

var testMission = new TestMission(testScriptManager.GetScrictByName("FullTest"), testVersionManager);

describe('#TestMission #TestCombination', () => {
    it('Test testMission lifecycle', done => {
        testMission.status.should.equal("inital");
        testMission.script.name.should.equal("FullTest");
        testMission.combinations.length.should.equal(48);
        let categories = testMission.combinations[0].GetCategories();
        categories[0].should.equal("Phone");
        categories[1].should.equal("App");
        categories[2].should.equal("Firmware");
        categories[3].should.equal("Sensor");
        categories[4].should.equal("Config");
        testMission.combinations[0].GetVersionByCategory("Phone").name.should.equal("Android 5.01");
        testMission.combinations[0].GetVersionByCategory("App").name.should.equal("MyApp 1.00");
        testMission.combinations[0].GetVersionByCategory("Firmware").name.should.equal("J");
        testMission.combinations[0].GetVersionByCategory("Sensor").name.should.equal("Monitor 1.0");
        testMission.combinations[0].GetVersionByCategory("Config").name.should.equal("JP");
        testMission.combinations[47].GetVersionByCategory("Phone").name.should.equal("Android Oreo");
        testMission.combinations[47].GetVersionByCategory("App").name.should.equal("MyApp Beta");
        testMission.combinations[47].GetVersionByCategory("Firmware").name.should.equal("J1");
        testMission.combinations[47].GetVersionByCategory("Sensor").name.should.equal("Thermo 1.1");
        testMission.combinations[47].GetVersionByCategory("Config").name.should.equal("TW");

        testMission.StartTesting();
        testMission.status.should.equal("testing");
        testMission.GetSuccessRate().should.equal(0);
        done();
    })
});