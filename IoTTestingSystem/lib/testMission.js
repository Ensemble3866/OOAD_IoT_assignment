const TestVersion = require('../lib/testVersion');
const TestCombination = require('../lib/testCombination');

class TestMission{
    constructor(title, PhoneVersions, appVersions, FWVersions, ChannelVersions, HWVersions){
        this.status = "inital";
        this.title = title;
        this.startTime = new Date();

        this.phoneList = PhoneVersions;
        this.appList = appVersions;
        this.firmwareList = FWVersions;
        this.channelList = ChannelVersions;
        this.hardwareList = HWVersions;

        this.combinations = new Array();
        PhoneVersions.forEach((Phone, PhoneIndex, PhoneArray) => {
            appVersions.forEach((app, appIndex, appArray) => {
                FWVersions.forEach((FW, FWIndex, FWArray) => {
                    ChannelVersions.forEach((channel, channelIndex, channelArray) => {
                        HWVersions.forEach((HW, HWIndex, HWArray) => {
                            var newCombinationList = new Array();
                            newCombinationList.push(PhoneVersions.length > 0 ? Phone : null);
                            newCombinationList.push(appVersions.length > 0 ? app : null);
                            newCombinationList.push(FWVersions.length > 0 ? FW : null);
                            newCombinationList.push(ChannelVersions.length > 0 ? channel : null);
                            newCombinationList.push(HWVersions.length > 0 ? HW : null);
                            var newCombination = new TestCombination(newCombinationList);
                            this.combinations.push(newCombination);
                        })
                    })
                });
            });
        });
    }

    GetTitle(){
        return this.title;
    }

    GetStartTime(){
        return this.startTime;
    }

    GetCombinationAmount(){
        return this.combinations.length;
    }

    GetStatus(){
        return this.status;
    }

    GetCombinationByIndex(index){
        return this.combinations[index];
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