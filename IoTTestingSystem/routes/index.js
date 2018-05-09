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
  res.render('historyRecord', { title: 'Express' });
});

/* GET testResults page. */
router.get('/testResults', function(req, res, next) {
  res.render('testResults', { title: 'Express' });
});

module.exports = router;
