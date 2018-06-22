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
    
    GetMissionById(id){
        var mission = this.missionList.find((mission) => {
            return mission.id == id;
        });
        return mission;
    }
    
}

module.exports = TestMissionManager;