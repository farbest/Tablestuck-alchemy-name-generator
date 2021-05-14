var ang = require("./AlchemyNameGenerator.js");


const mainItem = "IceFireSword";
const otherItemNames = ["PanGunDog", "PredatorDietLaundry", "GroanDiscoverBait"];
const captchacode = "4adFz4t!"

const type = captchacode.charAt(0);

let alchemyName = ang.getAlchemyFusionName(mainItem, otherItemNames, captchacode, type);

console.log(alchemyName);


