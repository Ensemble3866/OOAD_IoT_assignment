var express = require('express');
var router = express.Router();

var testdata = require('../test/testdata');
const TestVersion = require('../lib/TestVersion');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET performTests page. */
router.get('/performTests', function(req, res, next) {
  var categories = testdata.testVersionManager.GetCategories();

  var categoryList = new Array();
  for (const key in categories) {
    var obj = {
      category: categories[key],
      list: testdata.testVersionManager.GetVersionByCategory(categories[key])
    }
    categoryList.push(obj);
  }
  
  res.render('performTests', { categoryList: categoryList });
});

/* GET sendTest page. */
router.get('/sendTest', function(req, res, next) {
  res.render('sendTest', { title: 'Express' });
});

/* GET historyRecord page. */
router.get('/historyRecord', function(req, res, next) {
  var missions = testdata.testMissionManager.GetMissions();
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

  var phoneList = new Array();
  for (const key in req.query.phone) {
    phoneList.push(new TestVersion(req.query.phone[key], 'Phone'));
  }

  var appList = new Array();
  for (const key in req.query.app) {
    appList.push(new TestVersion(req.query.app[key], 'App'));
  }

  var firmwareList = new Array();
  for (const key in req.query.firmware) {
    firmwareList.push(new TestVersion(req.query.firmware[key], 'Firmware'));
  }

  var sensorList = new Array();
  for (const key in req.query.sensor) {
    sensorList.push(new TestVersion(req.query.sensor[key], 'Sensor'));
  }

  var configList = new Array();
  for (const key in req.query.config) {
    configList.push(new TestVersion(req.query.config[key], 'Config'));
  }


  try{
    testdata.testMissionManager.CreateMission(req.query.title, phoneList, appList,
      firmwareList, sensorList, configList);

    // 隨機設定幾筆成功以做測試
    var thisMission = testdata.testMissionManager.GetMissionByTitle(req.query.title);
    for (const key in thisMission.combinations) {
      var r = Math.floor(Math.random()*(2)+0);
      if(r==1) thisMission.combinations[key].result = true;
    }
  }
  catch(error){
    res.send('有重複的標題命名！');
  }
  finally{
    // res.sendStatus(200);
    res.send('OK');
  }  
});

module.exports = router;