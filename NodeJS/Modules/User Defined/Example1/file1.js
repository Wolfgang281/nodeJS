// function greet() {
//   console.log("hello world");
//   return "end";
// }

// let emp = {
//   name: "abc",
//   age: 24,
// };

// let string = "admin";

//!============================ commonJS format =================== (nodeJS uses by default)
//? pack or export first
//!>>>>>>>>>>>>>>>> 1) <<<<<<<<<<<<<<<<<<<<<<
// module.exports = {
//   greet,
//   emp,
//   string,
// };

//!>>>>>>>>>>>>>>>> 2) <<<<<<<<<<<<<<<<<<<<<<
// exports = greet; //? this is wrong
// module.exports = emp;
// module.exports = string;
//! this is like a default export, can only be used one time in a file and with this we can only export a single component.
//? all previous export statement will be overridden by the next one

//!============================ ESM format ===================
//? for nodeJS projects, add ` "type": "module" ` (package.json)

//!  ============== 1) named export
//? syntax ==> export let/const variableName = value
// export function greet() {
//   console.log("hello world");
//   return "end";
// }

// export let emp = {
//   name: "abc",
//   age: 24,
// };

// export let string = "admin";

//!  ============== 2) default export

let printName = (name) => {
  console.log("hello, " + name);
};

export default printName;
