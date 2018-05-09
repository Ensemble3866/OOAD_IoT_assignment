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
  /* Create testMission. */
  try{
  testdata.testMissionManager.CreateMission(req.body.title, req.body.phones, req.body.apps,
                                            req.body.framewares, req.body.sensors, req.body.configs);
  }
  catch(error){

  }
  finally{
    res.render('sendTest', { title: 'Express' });
  }
});

/* GET historyRecord page. */
router.get('/historyRecord', function(req, res, next) {
  var missions = testdata.testMissionManager.GetMissions();
  res.render('historyRecord', { missions: missions,test: JSON.stringify(missions) });
});

/* GET testResults page. */
router.get('/testResults', function(req, res, next) {
  console.log(req.body);
  // console.log(res);
  res.render('testResults', { title: 'Express' });
});

module.exports = router;
