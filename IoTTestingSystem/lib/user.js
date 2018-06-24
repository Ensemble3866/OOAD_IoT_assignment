class User{
    constructor(id, name, account, password, auth){
        this.id = id;
        this.name = name;
        this.account = account;
        this.password = password;
        this.authority = auth;
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