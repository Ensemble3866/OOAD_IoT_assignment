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
  res.render('performTests', { scriptList: scriptList });
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
  var missions = repository.testMissionRepository.missionList;
  res.render('historyRecord', { missions: missions });
});

/* GET testResults page. */
router.get('/testResults', function(req, res, next) {
  var mission = repository.testMissionRepository.GetMissionById(req.query.missionId);
  res.render('testResults', { mission: mission });
});

/* GET createMission. */
router.get('/createMission', function(req, res, next) {
  // console.log('query = ' + JSON.stringify(req.query));

  var testVersionGroup = new TestVersionManager();
  var versions = req.query.versions;
  for (const key in versions) {
    testVersionGroup.MakeNewVersion(versions[key].versionName, versions[key].categoryName);
  }
  console.log(testVersionGroup);

  try{
    var mission = repository.testMissionRepository.CreateMission(repository.testScriptRepository.GetScrictByName(req.query.script), testVersionGroup);
    mission.StartTesting();
    /*
    // 隨機設定幾筆成功以做測試
    var thisMission = testdata.testMissionManager.missionList[testdata.testMissionManager.missionList.length - 1];
    for (const key in thisMission.combinations) {
      var r = Math.floor(Math.random()*(2)+0);
      if(r==1) thisMission.combinations[key].result = true;
    }
    */
  }
  catch(error){
    res.send(error.massage);
  }
  finally{
    // res.sendStatus(200);
    res.send('OK');
  }  
});

/* GET manageVersions page. */
router.get('/manageVersions', function(req, res, next) {
  var categories = repository.testVersionRepository.GetCategories();
  var categoryList = new Array();
  for (const key in categories){
    var obj = {
      category: categories[key],
      list: repository.testVersionRepository.GetVersionByCategory(categories[key])
    }
    categoryList.push(obj);
  }
  res.render('manageVersions', { categoryList: categoryList });
});

/* GET MakeNewVersion. */
router.get('/MakeNewVersion', function(req, res, next) {
  console.log('query = ' + JSON.stringify(req.query));

  try{
    repository.testVersionRepository.MakeNewVersion(req.query.versionName, req.query.categoryName);
  }
  catch(error){
    res.send(error.massage);
  }
  finally{
    // res.sendStatus(200);
    res.send('OK');
  }  
});

/* GET RemoveVersion. */
router.get('/RemoveVersion', function(req, res, next) {
  console.log('query = ' + JSON.stringify(req.query));

  try{
    repository.testVersionRepository.RemoveVersion(req.query.versionName, req.query.categoryName);
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