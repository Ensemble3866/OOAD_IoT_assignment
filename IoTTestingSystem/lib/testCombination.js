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
        var result = this.versionList.find((item) => {
            return item.category == category;
        });
        return result;
    }

    GetCategories(){
        var categoryList = new Array();
        this.versionList.forEach((version) => {
            categoryList.push(version.category);
        });
        return categoryList;
    }
}

module.exports = TestCombination;