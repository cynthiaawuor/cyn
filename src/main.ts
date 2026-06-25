import cyn from "./index.js";

const myEmail = "";

const errorMessages = cyn.validate(myEmail, [cyn.isRequired, cyn.isEmail]);

console.log(Object.keys(errorMessages));
