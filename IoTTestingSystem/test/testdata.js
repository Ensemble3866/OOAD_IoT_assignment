const TestVersionManager = require('../lib/testVersionManager');

var testVersionManager = new TestVersionManager();
testVersionManager.MakeNewVersion("Android 5.01", "Phone");
testVersionManager.MakeNewVersion("Android 5.02", "Phone");
testVersionManager.MakeNewVersion("Android Oreo", "Phone");
testVersionManager.MakeNewVersion("MyApp 1.00", "App");
testVersionManager.MakeNewVersion("MyApp Beta", "App");
testVersionManager.MakeNewVersion("J", "Frameware");
testVersionManager.MakeNewVersion("J1", "Frameware");
testVersionManager.MakeNewVersion("Monitor 1.0", "感測器");
testVersionManager.MakeNewVersion("Thermo 1.1", "感測器");
testVersionManager.MakeNewVersion("JP", "Config");
testVersionManager.MakeNewVersion("TW", "Config");

exports.testVersionManager = testVersionManager;