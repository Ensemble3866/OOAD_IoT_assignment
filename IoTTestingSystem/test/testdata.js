var TestMission = require('../lib/testMission');
var testVersionManager = require('../lib/testVersionManager');
var TestScriptManager = require('../lib/testScriptManager');
var TestMissionManager = require('../lib/testMissionManager');

var testVersionManager = new testVersionManager();
testVersionManager.MakeNewVersion("Android 5.01", "Phone");
testVersionManager.MakeNewVersion("Android 5.02", "Phone");
testVersionManager.MakeNewVersion("Android Oreo", "Phone");
testVersionManager.MakeNewVersion("MyApp 1.00", "App");
testVersionManager.MakeNewVersion("MyApp Beta", "App");
testVersionManager.MakeNewVersion("J", "Firmware");
testVersionManager.MakeNewVersion("J1", "Firmware");
testVersionManager.MakeNewVersion("Monitor 1.0", "Sensor");
testVersionManager.MakeNewVersion("Thermo 1.1", "Sensor");
testVersionManager.MakeNewVersion("JP", "Config");
testVersionManager.MakeNewVersion("TW", "Config");


var testScriptManager = new TestScriptManager();
var parameter1 = ["Phone", "App", "Firmware", "Sensor", "Config"];
var parameter2 = ["App"];
var parameter3 = ["Phone", "App"];
testScriptManager.CreateScript("FullTest", parameter1);
testScriptManager.CreateScript("AppUnitTest", parameter2);
testScriptManager.CreateScript("AppInstallTest", parameter3);

var testMissionManager = new TestMissionManager();

exports.testVersionManager = testVersionManager;
exports.testScriptManager = testScriptManager;
exports.testMissionManager = testMissionManager;