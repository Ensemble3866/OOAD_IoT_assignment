const request = require('request');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
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
        this.report = null;
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
        this.report = this.script.name + '_' +  Date.now().toString();
        request('http://ensemble:3866@localhost:8080/job/FullTest/buildWithParameters?token=iottestingsystem&repoName=' 
        + this.report + '&testAmount=' + this.combinations.length, 
            function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
        });
    }

    UpdateResult(){
        var combinationIndex = 0;
        var robotframeworkReport = fs.readFileSync("IoTTestingSystem/RFRepo/" + this.report);
        robotframeworkReport.split(/\r?\n/).forEach(function(line){
            if(line == "true"){
                this.combinations[combinationIndex].result = true;
            }
            else{
                this.combinations[combinationIndex].result = false;
            }
            this.combinations[combinationIndex].report = "IoTTestingSystem/RFRepo/" + this.report + ".txt";
            combinationIndex = combinationIndex + 1;
        });
        
        this.combinations.forEach((combination) => {

        });
    }
    
}

module.exports = TestMission;