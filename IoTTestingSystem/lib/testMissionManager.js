const TestMission = require("./testMission");

class TestMissionManager{
    constructor(){
        this.missionList = new Array();
    }

    CreateMission(script, testVersionManager){
        this.missionList.push(new TestMission(script, testVersionManager));
    }
    /*
    GetMissionByStartTime(time){
        var script = this.scripts.find((script) => {
            return script.name == scriptName;
        });
        return script;
    }
    */
}

module.exports = TestMissionManager;