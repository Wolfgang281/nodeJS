console.log("inside server.js");

function printName(name) {
  console.log("hello,", name);
}

function printAge(age) {
  console.log(age, "years old");
}

module.exports = {
  printAge,
  printName,
};

// iife ==> immediately invoked function expression

// (function (exports, require, module, __filename, __dirname) {
//   console.log("inside server.js");

//   function printName(name) {
//     console.log("hello,", name);
//   }

//   function printAge(age) {
//     console.log(age, "years old");
//   }
// })();

//! module wrapper --> every code in nodeJS is wrapped inside an IIFE by NodeJS, with 5 parameters passed namely ==> exports, require, module, __filename, __dirname
