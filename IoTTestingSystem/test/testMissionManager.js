const assert = require('assert');
const TestMissionManager = require('../lib/testMissionManager');
const TestScript = require('../lib/testScript');
const TestVersionManager = require('../lib/testVersionManager');

describe('#TestMissionManager', function() {
    describe('CreateMission()', () => {
        it('should create a mission', function() {
            var script = new TestScript('InstallTest', ["Phone", "App"]);
            var testVersionManager = new TestVersionManager();
            testVersionManager.MakeNewVersion("Android 5.01", "Phone");
            testVersionManager.MakeNewVersion("Android 5.02", "Phone");
            testVersionManager.MakeNewVersion("Android Oreo", "Phone");
            testVersionManager.MakeNewVersion("MyApp 1.00", "App");
            testVersionManager.MakeNewVersion("MyApp Beta", "App");
            var testMissionManager = new TestMissionManager();
            testMissionManager.CreateMission(script, testVersionManager);
            assert.equal(testMissionManager.missionList.length, 1,  'length should be 1');
            assert.equal(testMissionManager.missionList[0].status, 'inital',  'status should be inital');
            assert.equal(testMissionManager.missionList[0].script.name, 'InstallTest',  'Incorrect name of script');
            assert.equal(testMissionManager.missionList[0].combinations.length, 6,  'Incorrect length of combinations');
        });
    });

    describe('GetMissionById()', () => {
        it('should return the mission', function() {
            var script = new TestScript('InstallTest', ["Phone", "App"]);
            var testVersionManager = new TestVersionManager();
            testVersionManager.MakeNewVersion("Android 5.01", "Phone");
            testVersionManager.MakeNewVersion("Android 5.02", "Phone");
            testVersionManager.MakeNewVersion("MyApp 1.00", "App");
            testVersionManager.MakeNewVersion("MyApp Beta", "App");
            var testMissionManager = new TestMissionManager();
            testMissionManager.CreateMission(script, testVersionManager);
            var id = testMissionManager.missionList[0].id;
            var mission = testMissionManager.GetMissionById(id);
            assert.equal(mission.status, 'inital',  'status should be inital');
            assert.equal(mission.script.name, 'InstallTest',  'Incorrect name of script');
            assert.equal(mission.combinations.length, 4,  'Incorrect length of combinations');
        });
    });
});