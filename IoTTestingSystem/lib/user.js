
class User{
    constructor(account, password, auth){
        this.account = account;
        this.password = password;
        this.auth = auth;
    }

    GetAccount(){
        return this.account;
    }

    GetPassword(){
        return this.password;
    }

    GetAuth(){
        return this.auth;
    }
}

export default User;