var synonyms = require("synonyms");
var seedrandom = require("seedrandom");

module.exports = {
  /**
   *
   * @param {*} mainItemName The name of the item deciding the kind of the alchemised item
   * @param {*} otherItemsName An array containing the name of the items fused with the main item
   * @param {*} captchaCode captchaCode of the alchemised item
   * @param {*} type The type of the item as a char
   * @returns The name of the alchemised item
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

    const rng = seedrandom(captchaCode);
    otherItemsName.sort();
    let parsedOtherItemNames = otherItemsName.map((word) => getCutWordArray(word));
    
    let  mainItemArray = getCutWordArray(mainItemName);


    let returnName = "";

    
    let flavorWordPool = [];

    for (let i = 0; i < mainItemArray.length - 1; i++){
      flavorWordPool.push(mainItemArray[i]);
    }

    for (let i = 0; i < parsedOtherItemNames.length; i++){
      for(let j = 0; mainItemArray.length !== 1 ? j < mainItemArray.length - 1 : j < mainItemArray.length ; j++){
        flavorWordPool.push(parsedOtherItemNames[i][j]);
      }
    }

    for (let i = 0; i < 3 && flavorWordPool.length > 0; i++){
      returnName = returnName + getRandomSynonym(flavorWordPool.splice(flavorWordPool.length * rng(),1)[0],rng());
    }

    
    const hasItemSpecialLastWord = rng() * 10 + 1 > 10

    let lastWord = hasItemSpecialLastWord ? getSpecialLastWord(type) : mainItemArray[mainItemArray.length - 1];
    returnName = returnName + lastWord;
    
    return returnName;

  },
  getCutWordArray,
  getRandomSynonym,
  getSpecialLastWord,
};

function getCutWordArray(word) {
  //separate camel case words in the string ("ExampleWordJumble" -> "Example Word Jumble")
  let cutWord = word.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });

  let cutWordArray = cutWord.trim().split(" ");

  cutWordArray[0] = cutWordArray[0].charAt(0).toUpperCase() + cutWordArray[0].slice(1);

  return cutWordArray;
}

function getRandomSynonym(word, randomSeed) {

  const rng = seedrandom(randomSeed);

  let words = synonyms(word);
  let synonym = "";
  
  if (words.n) {
    synonym = words.n[Math.floor(rng() * words.n.length)]
    synonym = synonym.charAt(0).toUpperCase() + synonym.slice(1);
    return synonym;
  }
  return word;
    
}

function getSpecialLastWord(type, randomSeed) {
  
  const rng = seedrandom(randomSeed);

  types = {
    "!": ["thingy"], //customkind 1
    "?" : ["thingy"], //customkind 2
    "0" : ["thingy"], //artifactkind
    "1" : ["Meta","Arranger"], //moduskind
    "2" : ["Smasher"], //hammerkind
    "3" : ["Pocker"], //needlekind
    "4" : ["Slasher"], //bladekind
    "5" : ["thingy"], //riflekind
    "6" : ["thingy"], //utensilkind
    "7" : ["thingy"], //fistkind
    "8" : ["thingy"], //puppetkind
    "9" : ["thingy"], //pistolkind
    "A" : ["thingy"], //lancekind
    "B" : ["thingy"], //thrwstarkind
    "C" : ["thingy"], //sicklekind
    "D" : ["thingy"], //clawkind
    "E" : ["thingy"], //chainsawkind
    "F" : ["thingy"], //canekind
    "G" : ["thingy"], //dicekind
    "H" : ["thingy"], //bowkind
    "I" : ["thingy"], //clubkind
    "J" : ["thingy"], //wandkind
    "K" : ["thingy"], //spearkind
    "L" : ["thingy"], //bunnykind
    "M" : ["thingy"], //paperkind
    "N" : ["thingy"], //fncysntakind
    "O" : ["thingy"], //umbrellakind
    "P" : ["thingy"], //broomkind
    "Q" : ["thingy"], //flshlghtkind
    "R" : ["thingy"], //sawkind
    "S" : ["thingy"], //wrenchkind
    "T" : ["thingy"], //scrwdrvrkind
    "U" : ["thingy"], //plierkind
    "V" : ["thingy"], //nailkind
    "W" : ["thingy"], //crowbarkind
    "X" : ["thingy"], //bookkind
    "Y" : ["thingy"], //yoyokind
    "Z" : ["thingy"], //staplerkind
    "a" : ["thingy"], //shotgunkind
    "b" : ["thingy"], //pencilkind
    "c" : ["thingy"], //brushkind
    "d" : ["thingy"], //scythekind
    "e" : ["thingy"], //scissorkind
    "f" : ["thingy"], //knifekind
    "g" : ["thingy"], //shovelkind
    "h" : ["thingy"], //cordkind
    "i" : ["thingy"], //axekind
    "j" : ["thingy"], //dartkind
    "k" : ["thingy"], //chainkind
    "l" : ["thingy"], //ballkind
    "m" : ["thingy"], //rockkind
    "n" : ["thingy"], //hckystckkind
    "o" : ["thingy"], //Tridentkind
    "p" : ["thingy"], //razorkind
    "q" : ["thingy"], //fankind
    "r" : ["thingy"], //cardkind
    "s" : ["thingy"], //armorkind
    "t" : ["thingy"], //shoekind
    "u" : ["thingy"], //hatkind
    "v" : ["thingy"], //glasseskind
    "w" : ["thingy"], //picturekind
    "x" : ["thingy"], //bustkind
    "y" : ["thingy"], //furniturekind
    "z" : ["thingy"], //vehiclekind
    "/" : ["thingy"], //constructkind
    "#" : ["thingy"], //totemkind
    "@" : ["thingy"], //trnsprtlzrkind
  }
  
  selectedType = types[type];

  if (selectedType)
    return selectedType[Math.floor(rng() * selectedType.length)]
  
  return "Error"
}


