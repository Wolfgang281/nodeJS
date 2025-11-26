//! path ==> it provides utilities to work with paths of files and folders

let path = require("path");

//? C:\Users\ASUS\Desktop\Classes\node_1030\NodeJS\Modules\Built In\path.js --> absolute path of the file

//? C:\Users\ASUS\Desktop\Classes\node_1030\NodeJS\Modules\Built In
/* 
{
  root: 'C:\\',
  dir: 'C:\\Users\\ASUS\\Desktop\\Classes\\node_1030\\NodeJS\\Modules',
  base: 'Built In',
  ext: '',
  name: 'Built In'
}
*/
//

//! it returns the absolute path (root of the OS) of the file/folder

//! extname(), basename(), format(), parse(), join()

//~ join("", "", "") ==> it is used to join different path parameters
//? folder1\folder2
//? folder1\folder2

/* 
let fs = require("fs");
const path4 = require("path");
? let data = fs.readFileSync("../../Starter/demo.js", "utf-8");
//? 

~ let path2 = path.join(__dirname, "..", "..", "Starter", "demo.js");


// C:\Users\ASUS\Desktop\Classes\node_1030\NodeJS\Starter\demo.js

let data = fs.readFileSync(path2, "utf-8");
 */

//? join() ==> "/", "\"

// let fs = require("fs")
let pathOfFile = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "JavaScript",
  "index.html"
);

// console.log(pathOfFile)

// let data = fs.readFileSync(pathOfFile, "utf-8")
// console.log(data)

// console.log(path.extname("./demo.java"));
// console.log(path.extname("folder1/folder2/data.txt"));
// console.log(path.extname(__dirname)); // " "
// console.log(path.extname(__filename)); // .js

//~ basename() ==> returns the last part of the path
console.log(path.basename("./demo.java"));
console.log(path.basename("folder1/folder2/data.txt"));
console.log(path.basename(__dirname)); // " "
console.log(path.basename(__filename)); // .js

//~ parse() ==> it returns an object of the path
// console.log(path.parse("./demo.java"));
// console.log(path.parse("folder1/folder2/data.txt"));
// console.log(path.parse(__dirname)); // " "
// console.log(path.parse(__filename)); // .js

/* 
C:\Users\ASUS\Desktop\Classes\node_1030\NodeJS\Modules\Built In\path.js

{
  root: 'C:\\',
  dir: 'C:\\Users\\ASUS\\Desktop\\Classes\\node_1030\\NodeJS\\Modules\\Built In',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
 */

let obj = {
  root: "C:\\",
  dir: "C:\\Users\\ASUS\\Desktop\\Classes\\node_1030\\NodeJS\\Modules\\Built In",
  base: "path.js",
  ext: ".js",
  name: "path",
};
console.log(path.format(obj));
