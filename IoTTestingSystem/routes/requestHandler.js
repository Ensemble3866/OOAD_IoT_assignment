var express = require('express');
var router = express.Router();

var testdata = require('../test/testdata');

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
  console.log('frameware = ' + req.query.frameware);
  console.log('sensor = ' + req.query.sensor);
  console.log('config = ' + req.query.config);

  var phoneList = new Array();
  for (const key in req.query.phone) {
    var obj = {
      name: req.query.phone[key],
      category: 'Phone'
    }
    phoneList.push(obj);
  }

  var appList = new Array();
  for (const key in req.query.app) {
    var obj = {
      name: req.query.app[key],
      category: 'App'
    }
    appList.push(obj);
  }

  var framewareList = new Array();
  for (const key in req.query.frameware) {
    var obj = {
      name: req.query.frameware[key],
      category: 'Frameware'
    }
    framewareList.push(obj);
  }

  var sensorList = new Array();
  for (const key in req.query.sensor) {
    var obj = {
      name: req.query.sensor[key],
      category: 'Sensor'
    }
    sensorList.push(obj);
  }

  var configList = new Array();
  for (const key in req.query.config) {
    var obj = {
      name: req.query.config[key],
      category: 'Config'
    }
    configList.push(obj);
  }


  try{
    console.log('try');
    testdata.testMissionManager.CreateMission(req.query.title, phoneList, appList,
      framewareList, sensorList, configList);
    // testdata.testMissionManager.CreateMission(req.query.title, req.query.phone, req.query.app,
    //   req.query.frameware, req.query.sensor, req.query.config);

    var thisMission = testdata.testMissionManager.GetMissionByTitle(req.query.title);
    thisMission.combinations[0].result = true;
    thisMission.combinations[1].result = true;
  }
  catch(error){
   console.log('error');
  }
  finally{
    console.log('finally');
    res.sendStatus(200);
  }  
});


// router.post('/send', async function(req, res, next) {
//   console.log('send')
//   console.log(req.body)
//   res.sendStatus(200);
// });

module.exports = router;
