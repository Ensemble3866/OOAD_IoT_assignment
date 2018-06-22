class User{
    constructor(id, name, account, password, auth){
        this.id = id;
        this.name = name;
        this.account = account;
        this.password = password;
        this.authority = auth;
    }

    GetId(){
        return this.id;
    }

    GetAuthority(){
        return this.authority;
    }

    Login(account, password){
        var status = false;
        if(account==this.account && password==this.password){
            status = true;
        }
        return status;
    }
}

module.exports = User;