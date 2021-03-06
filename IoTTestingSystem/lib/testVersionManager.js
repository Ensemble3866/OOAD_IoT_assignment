var TestVersion = require('../lib/testVersion');

class TestVersionManager{
    constructor(){
        this.versionList = new Array();
    }

    MakeNewVersion(name, category){
        this.versionList.push(new TestVersion(name, category));
    }

    RemoveVersion(name, category){
        let versions =this.versionList;
        versions.forEach((version, versionIndex, versionArray) => {
            if(version.name == name && version.category == category){
                versions.splice(versionIndex, 1);
            }
        });
    }

    MakeVersionsSameCategory(versionList, categoryName){
        versionList.forEach((version) => {
            this.versionList.push(new TestVersion(version, categoryName));
        });
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