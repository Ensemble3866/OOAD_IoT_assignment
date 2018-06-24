const assert = require('assert');
const User = require('../lib/user');

describe('#User', function() {
    describe('Login()', () => {
        it('should return the true result', function() {
            var user = new User('1', '林亮勳', 'acc1', 'pas1', '開發人員');
            assert.equal(user.Login('acc1', 'pas1'), true,  'Login should be true');
        });
        it('should return the false result', function() {
            var user = new User('1', '林亮勳', 'acc1', 'pas1', '開發人員');
            assert.equal(user.Login('acc2', 'pas2'), false,  'Login should be false');
        });
    });
});