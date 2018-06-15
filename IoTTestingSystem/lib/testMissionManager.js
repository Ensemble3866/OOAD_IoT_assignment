const TestMission = require("./testMission");

class TestMissionManager{
    constructor(){
        this.missionList = new Array();
    }

    CreateMission(script, testVersionManager){
        var newTestMission = new TestMission(script, testVersionManager);
        this.missionList.push(newTestMission);
        return newTestMission;
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