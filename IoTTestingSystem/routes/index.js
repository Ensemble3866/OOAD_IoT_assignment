var express = require('express');
var router = express.Router();

var testdata = require('../test/testdata');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
                        testName : testdata.testVersionManager.GetVersionByIndex(0).GetName(),
                        categoryList: testdata.testVersionManager.GetCategories()
                      });
});

/* GET performTests page. */
router.get('/performTests', function(req, res, next) {
  res.render('performTests', { title: 'Express' });
});

/* GET sendTest page. */
router.get('/sendTest', function(req, res, next) {
  res.render('sendTest', { title: 'Express' });
});

/* GET historyRecord page. */
router.get('/historyRecord', function(req, res, next) {
  res.render('historyRecord', { title: 'Express' });
});

/* GET testResults page. */
router.get('/testResults', function(req, res, next) {
  res.render('testResults', { title: 'Express' });
});

module.exports = router;
