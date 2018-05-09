const TestMission = require("./testMission");
var testdata = require('../test/testdata');

class TestMissionManager{
    constructor(){
        this.missionList = new Array();
    }
    
    CreateMission(title, phones, apps, framewares, sensors, configs){
        var result = this.missionList.find((mission, index, array) => {
            return mission.title == title;
        });
        if(result != undefined){
            throw new Error("Title repeat.");
        }
        var newMission = new TestMission(title, phones, apps, framewares, sensors, configs);
        this.missionList.push(newMission);
    }

    GetMissions(){
        return this.missionList;
    }

    GetMissionByTitle(title){
        var result = this.missionList.find((mission, index, array) => {
            return mission.title == title;
        });
        return result;
    }
}

module.exports = TestMissionManager;