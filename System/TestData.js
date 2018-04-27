import User from './models/user';

class TestData{
    SetTestUser(){
        var testUser1 = new User("mike", "123", "1");
        var testUser2 = new User("jack", "123", "2");
        var testUser3 = new User("mary", "123", "2");
        
        
    }
}

export default TestData;