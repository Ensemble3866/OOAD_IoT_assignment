const should = require('should');
const TestVersionManager = require('../lib/testVersionManager');
const TestMissionManager = require('../lib/testMissionManager');
const testdata = require('./testdata');

var testVersionManager = testdata.testVersionManager;
var testScriptManager = testdata.testScriptManager;

var testVersionManager2 = new TestVersionManager();
testVersionManager.MakeNewVersion("Android 5.01", "Phone");
testVersionManager.MakeNewVersion("Android 5.02", "Phone");
testVersionManager.MakeNewVersion("MyApp 1.00", "App");
testVersionManager.MakeNewVersion("MyApp Beta", "App");

var testVersionManager3 = new TestVersionManager();
testVersionManager.MakeNewVersion("Android 5.01", "Phone");
testVersionManager.MakeNewVersion("Android 5.02", "Phone");

var testVersionManager4 = new TestVersionManager();
testVersionManager.MakeNewVersion("Android 5.01", "Phone");
testVersionManager.MakeNewVersion("Android 5.02", "Phone");
testVersionManager.MakeNewVersion("Monitor 1.0", "Sensor");
testVersionManager.MakeNewVersion("Thermo 1.1", "Sensor");

describe('#TestMissionManager', () => {
    it('TestMissionManager.CreateMission', done => {
        var testMissionManager = new TestMissionManager();
        testMissionManager.CreateMission(testScriptManager.scripts[0], testVersionManager);
        testMissionManager.missionList.length.should.equal(1);
        done();
    })
});

describe('#TestMissionManager', () => {
    it('TestMissionManager.CreateMission', done => {
        var testMissionManager = new TestMissionManager();
        testMissionManager.CreateMission(testScriptManager.scripts[0], testVersionManager);
        testMissionManager.missionList.length.should.equal(1);
        done();
    })
});
/*
describe('#TestMissionManager', () => {
    it('Test testMissionManager methods', done => {
        var phones = new Array();
        var apps = new Array();
        var firmwares = new Array();
        var sensors = new Array();
        var configs = new Array();
        
        phones.push(new TestVersion("iOS 10", "Phone"));
        apps.push(new TestVersion("app 0.5", "App"));
        firmwares.push(new TestVersion("alpha", "Firmware"));
        sensors.push(new TestVersion("Monitor1", "Sensor"));
        configs.push(new TestVersion("CH", "Config"));
            
        testMissionManager.CreateMission("testOtherMission", phones, apps, firmwares, sensors, configs);

        var missionList =  testMissionManager.GetMissions();
        missionList.length.should.equal(2);
        missionList[1].GetCombinationAmount().should.equal(1);
        missionList[1].GetCombinationByIndex(0).GetVersionByCategory("Phone").GetName().should.equal("iOS 10");
        testMissionManager.GetMissionByTitle("testOtherMission").should.equal(missionList[1]);
        done();
    })
});

describe('#TestMissionManager', () => {
    it('Test testMissionManager, and version\'s category less than 5.', done => {
        var phones = new Array();
        var apps = new Array();
        var firmwares = new Array();
        var sensors = new Array();
        var configs = new Array();
        
        apps.push(new TestVersion("app 0.5", "App"));
        apps.push(new TestVersion("app 0.7", "App"));
        firmwares.push(new TestVersion("alpha", "Firmware"));
        configs.push(new TestVersion("CH", "Config"));
        configs.push(new TestVersion("US", "Config"))
            
        testMissionManager.CreateMission("testSmallMission", phones, apps, firmwares, sensors, configs);

        var missionList =  testMissionManager.GetMissions();
        missionList.length.should.equal(3);
        missionList[2].GetCombinationAmount().should.equal(4);
        missionList[2].GetCombinationByIndex(0).GetVersionByCategory("Phone").GetName().should.equal("app 0.5");
        testMissionManager.GetMissionByTitle("testSmallMission").should.equal(missionList[2]);
        done();
    })
});

describe('#TestMissionManager title repeat error', () => {
    it('Test testMissionManager error.', done => {
        try{
            testMissionManager.CreateMission("testMission", phones, apps, firmwares, sensors, configs);
        }
        catch(error){
            error.message.should.equal("Title repeat.");
        }
        finally{
            done();
        }
    })
});
*/