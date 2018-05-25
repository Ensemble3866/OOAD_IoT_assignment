const uuidv1 = require('uuid/v1');
const TestCombination = require('../lib/testCombination');

class TestMission{
    constructor(script, testVersionManager){
        if(script.parameters.length == testVersionManager.GetCategories().length){
            script.parameters.forEach((parameter) => {
                if(testVersionManager.GetCategories().find((category) => {
                    return parameter == category; 
                }) === undefined){
                    throw Error("Script's parameter(" + parameter + ") not found in versions.");
                };
            });
        }
        else throw Error("Parameter's length of script is different from versions.");
        
        this.status = "inital";
        this.id = uuidv1();
        this.script = script;
        this.versions = testVersionManager;
        this.startTime = new Date();
        this.combinations = new Array();
 
        var versionList = new Array();

        testVersionManager.GetCategories().forEach((category) => {
            versionList.push(testVersionManager.GetVersionByCategory(category));
        });

        versionList.forEach((versions, versionsIndex, versionsArray) => {
            if(this.combinations.length == 0){
                versions.forEach((version) => {
                    var newCombination = new Array();
                    newCombination.push(version);
                    this.combinations.push(new TestCombination(newCombination));
                });
            }
            else{
                var originLength = this.combinations.length;
                for(var i = 0; i < originLength; i++){
                    versions.forEach((version) => {
                        var newCombination = Array.from(this.combinations[i].versionList);
                        newCombination.push(version);
                        this.combinations.push(new TestCombination(newCombination));
                    })
                };
                this.combinations.splice(0, originLength);
            }
        });
    }

    GetSuccessRate(){
        var successAmount = 0;
        var failAmount = 0;
        this.combinations.forEach((combination) => {
            if(combination.result)
                successAmount++;
            else 
                failAmount++;
        });
        return Math.round(successAmount / (successAmount + failAmount) * 100);
    }

    StartTesting(){
        this.status = "testing";
    }

    ReciveResult(resultList){
        resultList.forEach((result, resultIndex, resultArray) => {

        });
    }
    
}

module.exports = TestMission;