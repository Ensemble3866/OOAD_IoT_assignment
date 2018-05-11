class TestScriptManger{
    constructor(){
        this.scripts = new Array();
        //從資料庫中讀取已存在之Script

    }

    GetScrictByName(scriptName){
        var script = this.scripts.find((script) => {
            return script.name == scriptName;
        });
        return script;
    }
}

class TestScript{
    constructor(scriptName, parameters){
        this.name = scriptName;
        this.parameters = parameters;
    }
}

module.exports = TestScript;