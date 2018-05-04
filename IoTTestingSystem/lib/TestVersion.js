class TestVersion{
    constructor(name, category){
            this.name = name;
            this.category = category;
        }
        GetName(){
            return this.name;
        }
    }

    var testVersion = new TestVersion("test", "test");

    export default testVersion;