const TestVersionManager = require('../lib/testVersionManager');
const TestMission = require('../lib/testMission');
const TestMissionManager = require('../lib/testMissionManager');

var testVersionManager = new TestVersionManager();
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

var testMissionManager = new TestMissionManager();
testMissionManager.CreateMission("針對所有裝置測試",
                                  testVersionManager.GetVersionByCategory("Phone"),
                                  testVersionManager.GetVersionByCategory("App"),
                                  testVersionManager.GetVersionByCategory("Firmware"),
                                  testVersionManager.GetVersionByCategory("Sensor"),
                                  testVersionManager.GetVersionByCategory("Config"));

exports.testVersionManager = testVersionManager;
exports.testMissionManager = testMissionManager;