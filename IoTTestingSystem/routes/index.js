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

module.exports = router;
