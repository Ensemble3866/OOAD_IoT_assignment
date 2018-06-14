var firebase = require("firebase");
var TestVersion = require('../lib/testVersion');
var TestScript = require('../lib/testScript');
var TestVersionManager = require('../lib/testVersionManager');
var TestScriptManager = require('../lib/testScriptManager');
var TestMissionManager = require('../lib/testMissionManager');

var config = {
    apiKey: "AIzaSyAn3w4Ze15AczTtIEXJIghFBTwKVH9eHqQ",
    authDomain: "iottestingsystem.firebaseapp.com",
    databaseURL: "https://iottestingsystem.firebaseio.com",
    projectId: "iottestingsystem",
    storageBucket: "iottestingsystem.appspot.com",
    messagingSenderId: "347887465993"
}

firebase.initializeApp(config);
var database = firebase.database();

var testVersionRepository = new TestVersionManager();
var testScriptRepository = new TestScriptManager();
var testMissionRepository = new TestMissionManager();

var TestVersionRef = database.ref("TestVersion/");
TestVersionRef.once("value", function(snapshot){
    let list = snapshot.val();
    for(let version in list){
        var newVersion = new TestVersion(list[version].name, list[version].category);
        testVersionRepository.versionList.push(newVersion);
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

var TestScriptRef = database.ref("TestScript/");
TestScriptRef.once("value", function(snapshot){
    let list = snapshot.val();
    for(let script in list){
        let parameters = list[script].parameters.split(",");
        let parameterList = new Array();
        for(let index in parameters){
            parameterList.push(parameters[index]);
        }
        testScriptRepository.CreateScript(list[script].name, parameterList);
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

var TestMissionRef = database.ref("TestMission/");
TestMissionRef.once("value", function(snapshot){

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

exports.testVersionRepository = testVersionRepository;
exports.testScriptRepository = testScriptRepository;
exports.testMissionRepository = testMissionRepository;