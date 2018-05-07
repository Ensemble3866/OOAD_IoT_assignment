class TestVersion{
    constructor(name, category){
        this.name = name;
        this.category = category;
    }

    GetName(){
        return this.name;
    }

    GetCategory(){
        return this.category;
    }
}

module.exports = TestVersion;