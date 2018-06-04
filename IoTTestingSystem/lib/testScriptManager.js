const TestScript = require('../lib/testScript');

class TestScriptManager{
    constructor(){
        this.scripts = new Array();
        //從資料庫中讀取已存在之Script

    }

    CreateScript(scriptName, parameters){
        var newScript = new TestScript(scriptName, parameters);
        this.scripts.push(newScript);
    }

    GetScrictByName(scriptName){
        var script = this.scripts.find((script) => {
            return script.name == scriptName;
        });
        return script;
    }
}

module.exports = TestScriptManager;