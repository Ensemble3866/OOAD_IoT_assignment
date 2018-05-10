const should = require('should');
const TestVersion = require('../lib/testVersion');
const TestMission = require('../lib/testMission');
const TestMissionManager = require('../lib/testMissionManager');
const testdata = require('./testdata');

var testVersionManager = testdata.testVersionManager;
var testMission = new TestMission("myTestMission",
                                  testVersionManager.GetVersionByCategory("Phone"),
                                  testVersionManager.GetVersionByCategory("App"),
                                  testVersionManager.GetVersionByCategory("Frameware"),
                                  testVersionManager.GetVersionByCategory("Sensor"),
                                  testVersionManager.GetVersionByCategory("Config"));

var testMissionManager = testdata.testMissionManager;

describe('#TestMission', () => {
    it('Test testMission lifecycle', done => {
        testMission.GetTitle().should.equal("myTestMission");
        testMission.GetCombinationAmount().should.equal(48);
        testMission.GetStatus().should.equal("inital");
        testMission.StartTesting();
        testMission.GetStatus().should.equal("testing");
        testMission.GetSuccessRate().should.equal(0);
        done();
    })
});
                
describe('#TestCombination', () => {
    it('Test testCombination function', done => {
        let categories = testMission.GetCombinationByIndex(0).GetCategories();
        categories[0].should.equal("Phone");
        categories[1].should.equal("App");
        categories[2].should.equal("Frameware");
        categories[3].should.equal("Sensor");
        categories[4].should.equal("Config");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Phone").GetName().should.equal("Android 5.01");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("App").GetName().should.equal("MyApp 1.00");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Frameware").GetName().should.equal("J");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Sensor").GetName().should.equal("Monitor 1.0");
        testMission.GetCombinationByIndex(0).GetVersionByCategory("Config").GetName().should.equal("JP");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Phone").GetName().should.equal("Android Oreo");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("App").GetName().should.equal("MyApp Beta");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Frameware").GetName().should.equal("J1");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Sensor").GetName().should.equal("Thermo 1.1");
        testMission.GetCombinationByIndex(47).GetVersionByCategory("Config").GetName().should.equal("TW");
        done();
    })
});

describe('#TestMissionManager', () => {
    it('Test testMissionManager methods', done => {
        var phones = new Array();
        var apps = new Array();
        var framewares = new Array();
        var sensors = new Array();
        var configs = new Array();
        
        phones.push(new TestVersion("iOS 10", "Phone"));
        apps.push(new TestVersion("app 0.5", "App"));
        framewares.push(new TestVersion("alpha", "Frameware"));
        sensors.push(new TestVersion("Monitor1", "Sensor"));
        configs.push(new TestVersion("CH", "Config"));
            
        testMissionManager.CreateMission("testOtherMission", phones, apps, framewares, sensors, configs);

        var missionList =  testMissionManager.GetMissions();
        missionList.length.should.equal(2);
        missionList[1].GetCombinationAmount().should.equal(1);
        missionList[1].GetCombinationByIndex(0).GetVersionByCategory("Phone").GetName().should.equal("iOS 10");
        testMissionManager.GetMissionByTitle("testOtherMission").should.equal(missionList[1]);
        done();
    })
});


/*
describe('#TestMissionManager', () => {
    it('Test testMissionManager, and version\'s category less than 5.', done => {
        var phones = new Array();
        var apps = new Array();
        var framewares = new Array();
        var sensors = new Array();
        var configs = new Array();
        
        apps.push(new TestVersion("app 0.5", "App"));
        apps.push(new TestVersion("app 0.7", "App"));
        framewares.push(new TestVersion("alpha", "Frameware"));
        configs.push(new TestVersion("CH", "Config"));
        configs.push(new TestVersion("US", "Config"))
            
        testMissionManager.CreateMission("testSmallMission", phones, apps, framewares, sensors, configs);

        var missionList =  testMissionManager.GetMissions();
        missionList.length.should.equal(3);
        missionList[2].GetCombinationAmount().should.equal(4);
        missionList[2].GetCombinationByIndex(0).GetVersionByCategory("Phone").GetName().should.equal("app 0.5");
        testMissionManager.GetMissionByTitle("testSmallMission").should.equal(missionList[2]);
        done();
    })
});
*/
describe('#TestMissionManager title repeat error', () => {
    it('Test testMissionManager error.', done => {
        try{
            testMissionManager.CreateMission("testMission", phones, apps, framewares, sensors, configs);
        }
        catch(error){
            error.message.should.equal("Title repeat.");
        }
        finally{
            done();
        }
    })
});
