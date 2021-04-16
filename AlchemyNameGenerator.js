var synonyms = require("synonyms");
var seedrandom = require("seedrandom");

module.exports = {
    
    getAlchemyFusionName :function (mainItem,otherItemsName, captchaCode, type) {
        //safeguards in case the funcytion is used wrongly
        if (!otherItemsName)
            return mainItem
        if (otherItemsName.length === 0)
            return mainItem
        
        var rng = seedrandom(captchaCode);

        otherItemsName.sort();

        let cutOtherItemsName = otherItemsName.map( word => getCutWord(word))

        console.log(cutOtherItemsName);
        

    }
}

function getCutWord(word) {
    //separate camel case words ("ExampleWordJumble" -> "Example Word Jumble")
    let cutWord = word.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { return str.toUpperCase(); })
    
    console.log(cutWord)
    
    let cutWordArray = cutWord.trim().split(cutWord, " ")
    
    console.log(cutWordArray);

    return cutWordArray;
}

