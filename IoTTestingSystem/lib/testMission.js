const TestVersion = require('../lib/testVersion');
const TestCombination = require('../lib/testCombination');

class TestMission{
    constructor(PhoneVersions, appVersions, FWVersions, ChannelVersions, HWVersions){
        this.status = "inital";

        this.combinations = new Array();
        PhoneVersions.forEach((Phone, PhoneIndex, PhoneArray) => {
            appVersions.forEach((app, appIndex, appArray) => {
                FWVersions.forEach((FW, FWIndex, FWArray) => {
                    ChannelVersions.forEach((channel, channelIndex, channelArray) => {
                        HWVersions.forEach((HW, HWIndex, HWArray) => {
                            var newCombinationList = new Array();
                            newCombinationList.push(Phone);
                            newCombinationList.push(app);
                            newCombinationList.push(FW);
                            newCombinationList.push(channel);
                            newCombinationList.push(HW);
                            var newCombination = new TestCombination(newCombinationList);
                            this.combinations.push(newCombination);
                        })
                    })
                });
            });
        });
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

    StartTesting(){
        this.status = "testing";
    }

    ReciveResult(resultList){
        resultList.forEach((result, resultIndex, resultArray) => {

        });
    }
    
}

module.exports = TestMission;