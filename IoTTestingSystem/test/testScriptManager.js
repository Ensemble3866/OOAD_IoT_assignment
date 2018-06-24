const assert = require('assert');
const TestScriptManager = require('../lib/testScriptManager');

var testScriptManager = new TestScriptManager();


describe('#TestScriptManager', function() {
    describe('CreateScript()', () => {
        it('should create a script', function() {
            var parameter = ["Phone", "App"];
            testScriptManager.CreateScript("App安裝測試", parameter);
            assert(testScriptManager.scripts[0].name == 'App安裝測試', 'Incorrect name');
            assert(testScriptManager.scripts[0].parameters[0] == 'Phone', 'Incorrect parameters');
            assert(testScriptManager.scripts[0].parameters[1] == 'App', 'Incorrect parameters');
        });
    });

    describe('GetScrictByName()', () => {
        it('should return the script', function() {
            var parameter = ["Phone", "App", "Firmware", "Sensor", "Config"];
            testScriptManager.CreateScript("整合測試", parameter);
            assert(testScriptManager.GetScrictByName("整合測試").name == '整合測試', 'Incorrect name');
            assert(testScriptManager.GetScrictByName("整合測試").parameters[0] == 'Phone', 'Incorrect parameters');
            assert(testScriptManager.GetScrictByName("整合測試").parameters[1] == 'App', 'Incorrect parameters');
            assert(testScriptManager.GetScrictByName("整合測試").parameters[2] == 'Firmware', 'Incorrect parameters');
            assert(testScriptManager.GetScrictByName("整合測試").parameters[3] == 'Sensor', 'Incorrect parameters');
            assert(testScriptManager.GetScrictByName("整合測試").parameters[4] == 'Config', 'Incorrect parameters');
        });
    });
});