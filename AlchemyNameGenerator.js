var synonyms = require("synonyms");
var seedrandom = require("seedrandom");
var synonyms = require("synonyms");

module.exports = {
  /**
   *
   * @param {*} mainItemName The name of the item deciding the kind of the alchemised item
   * @param {*} otherItemsName An array containing the name of the items fused with the main item
   * @param {*} captchaCode captchaCode of the alchemised item
   * @param {*} type
   * @returns  {*} The name of the alchemised item
   */
  getAlchemyFusionName: function (
    mainItemName,
    otherItemsName,
    captchaCode,
    type
  ) {
    //safeguards in case the funcytion is used wrongly
    if (!otherItemsName) return mainItemName;
    if (otherItemsName.length === 0) return mainItemName;

    var rng = seedrandom(captchaCode);

    otherItemsName.sort();

    let parsedOtherItemNames = otherItemsName.map((word) => getCutWord(word));
  },
};

function getCutWord(word) {
  //separate camel case words ("ExampleWordJumble" -> "Example Word Jumble")
  let cutWord = word.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });

  let cutWordArray = cutWord.trim().split(" ");

  return cutWordArray;
}

function getRandomSynonym(word) {}
