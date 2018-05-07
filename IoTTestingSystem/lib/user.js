
class User{
    constructor(id, account, password, auth){
        this.id = id;
        this.account = account;
        this.password = password;
        this.authority = auth;
    }

    GetId(){
        return this.id;
    }

    GetAccount(){
        return this.account;
    }

    GetPassword(){
        return this.password;
    }

    GetAuthority(){
        return this.authority;
    }
}

module.exports = User;