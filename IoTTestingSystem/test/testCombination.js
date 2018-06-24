const assert = require('assert');
const TestCombination = require('../lib/testCombination');
const TestVersion = require('../lib/testVersion');

describe('#TestCombination', function() {
    describe('UpdateResult()', () => {
        it('should update the result', function() {
            var versionList = new Array();
            versionList.push(new TestVersion('Android 5.01', 'Phone'));
            versionList.push(new TestVersion('MyApp 1.00', 'App'));
            var testCombination = new TestCombination(versionList);
            testCombination.UpdateResult(true, 'reportUrl');
            assert.equal(testCombination.result, true,  'result should be true');
            assert(testCombination.report == 'reportUrl', 'Incorrect report');
        });
    });

    describe('GetVersionByCategory()', () => {
        it('should return the version', function() {
            var versionList = new Array();
            versionList.push(new TestVersion('Android 5.01', 'Phone'));
            versionList.push(new TestVersion('MyApp 1.00', 'App'));
            var testCombination = new TestCombination(versionList);
            assert(testCombination.GetVersionByCategory('Phone').name == 'Android 5.01', 'Incorrect name');
            assert(testCombination.GetVersionByCategory('App').name == 'MyApp 1.00', 'Incorrect name');
        });
    });

    describe('GetCategories()', () => {
        it('should return the categories', function() {
            var versionList = new Array();
            versionList.push(new TestVersion('Android 5.01', 'Phone'));
            versionList.push(new TestVersion('MyApp 1.00', 'App'));
            versionList.push(new TestVersion('J1', 'Firmware'));
            versionList.push(new TestVersion('Monitor 1.0', 'Sensor'));
            versionList.push(new TestVersion('JP', 'Config'));
            var testCombination = new TestCombination(versionList);
            var categories = testCombination.GetCategories();
            assert(categories[0] == 'Phone', 'Incorrect categories');
            assert(categories[1] == 'App', 'Incorrect categories');
            assert(categories[2] == 'Firmware', 'Incorrect categories');
            assert(categories[3] == 'Sensor', 'Incorrect categories');
            assert(categories[4] == 'Config', 'Incorrect categories');
        });
    });
});