var Version = require('../lib/testVersion');

class TestVersionManager{
    constructor(){
        this.versionList = new Array();
    }

    MakeNewVersion(name, category){
        var newVersion = new Version(name, category);
        this.versionList.push(newVersion);
    }

    GetVersionByIndex(index){
        return this.versionList[index];
    }

    GetVersionByNameAndCategory(name, category){
        var result = this.versionList.find((item, index, array) => {
            return item.name == name && item.category == category;
        });
        return result;
    }

    GetVersionByCategory(category){
        var result = this.versionList.filter((item, index, array) => {
            return item.category == category;
        });
        return result;
    }

    GetCategories(){
        var categoryList = new Array();
        this.versionList.forEach((version, versionIndex, versionArray) => {
            if(categoryList.find((category, categoryIndex, categoryArray) => {
                return category == version.category; }) === undefined){
                    categoryList.push(version.category);
            };
        });
        return categoryList;
    }
}

module.exports = TestVersionManager;