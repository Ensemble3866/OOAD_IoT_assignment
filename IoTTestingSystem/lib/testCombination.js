class TestCombination{
    constructor(versionList){
        this.versionList = new Array();
        this.versionList = versionList;
        this.result = false;
        this.report = null;
    }

    UpdateResult(result, report){
        this.result = result;
        this.report = report;
    }

    GetVersionByCategory(category){
        var result = this.versionList.find((item, index, array) => {
            return item.category == category;
        });
        return result;
    }

    GetCategories(){
        var categoryList = new Array();
        this.versionList.forEach((version, versionIndex, versionArray) => {
            categoryList.push(version.GetCategory());
        });
        return categoryList;
    }

    GetResult(){
        return this.result;
    }

    GetReport(){
        return this.report;
    }
}

module.exports = TestCombination;