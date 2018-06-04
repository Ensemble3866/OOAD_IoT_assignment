const should = require('should');
const TestScript = require('../lib/testScript');
const TestScriptManager = require('../lib/testScriptManager');

var testScript = new TestScriptManager();

describe('#TestVersion', () => {
    it('should return the attribute of version', done => {
        var parameter1 = ["Phone", "App", "Firmware", "Sensor", "Config"];
        var parameter2 = ["App"];
        var parameter3 = ["Phone", "App"];

        testScript.CreateScript("整合測試", parameter1);
        testScript.CreateScript("App單元測試", parameter2);
        testScript.CreateScript("App安裝測試", parameter3);

        testScript.GetScrictByName("整合測試").name.should.equal("整合測試");
        testScript.GetScrictByName("整合測試").parameters[0].should.equal("Phone");
        testScript.GetScrictByName("整合測試").parameters[1].should.equal("App");
        testScript.GetScrictByName("整合測試").parameters[2].should.equal("Firmware");
        testScript.GetScrictByName("整合測試").parameters[3].should.equal("Sensor");
        testScript.GetScrictByName("整合測試").parameters[4].should.equal("Config");
        testScript.GetScrictByName("App單元測試").name.should.equal("App單元測試");
        testScript.GetScrictByName("App單元測試").parameters[0].should.equal("App");

        done();
    })
});