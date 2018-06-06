var express = require('express');
var router = express.Router();

const TestVersionManager = require('../lib/TestVersionManager');
const TestVersion = require('../lib/TestVersion');

var testdata = require('../test/testdata');
var repository = require('../lib/repository');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET performTests page. */
router.get('/performTests', function(req, res, next) {

  var scripts = repository.testScriptRepository.scripts;
  var scriptList = new Array();
  for (const key in scripts){
    scriptList.push(scripts[key].name);
  }
  // console.log(scripts);
  // console.log(scriptList);

  var categories = repository.testVersionRepository.GetCategories();
  var categoryList = new Array();
  for (const key in categories){
    var obj = {
      category: categories[key],
      list: repository.testVersionRepository.GetVersionByCategory(categories[key])
    }
    categoryList.push(obj);
  }
  
  res.render('performTests', { categoryList: categoryList, scriptList: scriptList });
});

/* GET getScriptByName. */
router.get('/getScriptByName', function(req, res, next) {
  console.log('scriptName = ' + req.query.scriptName);
  var script = repository.testScriptRepository.GetScrictByName(req.query.scriptName);
  console.log('parameters = ' + script.parameters);

  var categoryList = new Array();
  for (const key in script.parameters){
    var obj = {
      category: script.parameters[key],
      list: repository.testVersionRepository.GetVersionByCategory(script.parameters[key])
    }
    categoryList.push(obj);
  }

  res.send(categoryList);
});

/* GET sendTest page. */
router.get('/sendTest', function(req, res, next) {
  res.render('sendTest', { title: 'Express' });
});

/* GET historyRecord page. */
router.get('/historyRecord', function(req, res, next) {
  var missions = testdata.testMissionManager.missionList;
  res.render('historyRecord', { missions: missions });
});

/* GET testResults page. */
router.get('/testResults', function(req, res, next) {
  console.log('missionName = ' + req.query.missionName);
  var mission = testdata.testMissionManager.GetMissionByTitle(req.query.missionName);
  console.log('mission = ' + mission);
  res.render('testResults', { mission: mission, test: JSON.stringify(mission) });
});

/* GET createMission. */
router.get('/createMission', function(req, res, next) {
  // console.log('query = ' + JSON.stringify(req.query));
  console.log('title = ' + req.query.title);
  console.log('phone = ' + req.query.phone);
  console.log('app = ' + req.query.app);
  console.log('firmware = ' + req.query.firmware);
  console.log('sensor = ' + req.query.sensor);
  console.log('config = ' + req.query.config);

  var testVersionManager = new TestVersionManager();
  testVersionManager.MakeVersionsSameCategory(req.query.phone, 'Phone');
  testVersionManager.MakeVersionsSameCategory(req.query.app, 'App');
  testVersionManager.MakeVersionsSameCategory(req.query.firmware, 'Firmware');
  testVersionManager.MakeVersionsSameCategory(req.query.sensor, 'Sensor');
  testVersionManager.MakeVersionsSameCategory(req.query.config, 'Config');

  try{
    testdata.testMissionManager.CreateMission(testdata.testScriptManager.GetScrictByName("整合測試"), testVersionManager);

    // 隨機設定幾筆成功以做測試
    var thisMission = testdata.testMissionManager.missionList[testdata.testMissionManager.missionList.length - 1];
    for (const key in thisMission.combinations) {
      var r = Math.floor(Math.random()*(2)+0);
      if(r==1) thisMission.combinations[key].result = true;
    }
  }
  catch(error){
    res.send(error.massage);
  }
  finally{
    // res.sendStatus(200);
    res.send('OK');
  }  
});

module.exports = router;