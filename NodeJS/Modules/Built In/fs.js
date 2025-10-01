//! before using any built-in module, we have to import it.
// let/const variableName = require("name of the module") "fs, path, os, etc..." ==> CJS
// import variableName from "path of the module" ==> ESM

let fs = require('fs');
// ! fs --> file system. it provides utilities to interact with files and folders present in the OS (operating system)
// interaction ==> CRUD (create, read, update, delete)

//! we can execute js code in two ways -->
//? sync : blocking code
//? async (callbacks, then/catch, async/await) : non-blocking code

// console.log(fs);

// parameters and arguments

/* function printName(name) {
  // parameter
  console.log("hi", name);
}
printName("abc"); // argument */

//! path -->
// "." --> means current folder
// ".." --> means one folder back (parent folder)
// "/" --> to access the folder

//! ============= synchronous execution using fs =====================

//! 1) <===== create : creating a file =====>
//? method --> writeFileSync()
// syntax --> fs.writeFileSync("path/ name of the file.ext", "data to be added")
//? both the arguments are mandatory

// console.log("Start");
// fs.writeFileSync("./data.json", `{"key2":"value2"}`);
// console.log("file added");
// console.log("middle");
// console.log("end");

//~ if the file is present at the given path, new data will override the old one
//~ if the file is not present, then a file will be created with the given data

//! 2) <===== update : appending(add something at last) a file =====>
//~ using this we can only add some data at the last of the file
//? method --> appendFileSync()
// syntax --> fs.appendFileSync("path of the file", "new data")
//? both the arguments are mandatory

// "\n" --> new line

// console.log(1);
// fs.appendFileSync("./Emp.java", `class Emp{}`);
// console.log("data added");
// console.log(2);
// console.log(3);

//! appendFileSync() ==> if the file is present at the path, then data will be appended, otherwise a new file will be created.

//! 3) <===== read : fetch a file =====>
//? method --> readFileSync()
// syntax --> fs.readFileSync("path of the file", "encoding")
//~ encoding --> while converting into binary format, encoding value defines that how many bits will it use the convert a single character/digit
//? "encoding" is not mandatory

// console.log(1);
// let data = fs.readFileSync("./demo.txt");
// console.log(data);

//~ buffer value --> array of binary numbers
//? whatever the content was, it got converted into binary format
//! 1) use toString() ==> default argument of toString() is: "utf-8"
// console.log(data.toString()); //TODO: buffer and streams

//! 2) use encoding value
// let data = fs.readFileSync("./demo.txt", "utf-8");
// console.log(data);

// console.log(2);
// console.log(3);

//~ ques) copy the contents of "about.html" into a new file "about.txt"
// let payload = fs.readFileSync("./about.html", "utf-8");
// fs.writeFileSync("./about.txt", payload);
// console.log("file created");

//! 4) <===== delete a file =====>
//? method --> unlinkSync()
// syntax --> fs.unlinkSync("path of the file")

// try {
//   console.time("file op");

//   console.log("Start");

//   fs.unlinkSync("./about.html");
//   console.log("file deleted");

//   console.log("middle");
//   console.log("end");

//   console.timeEnd("file op");
// } catch (error) {
//   console.log("something went wrong");
// }

//! 5) <===== renaming a file/folder =====>
//? method name ==> renameSync()
// syntax --> fs.renameSync("old file/folder path/name", "new file/folder path/name")

// fs.renameSync("../demo", "../Express");

// fs.renameSync("./about.txt", "./readme.md");
// console.log("file renamed");

//! 6) <===== creating a folder/directory =====>
//? method name ==> mkdirSync()
// syntax ==> fs.mkdirSync("path of the folder/name")

// console.log(1);
// fs.mkdirSync("./Folder1");
// fs.mkdirSync("./Folder1/sub"); //~ for nested structure, create the outer layer first
// console.log(2);
// console.log(3);

//~ ques) create this structure --> "backend/controller/app.js"
// fs.mkdirSync("../../Backend");
// fs.mkdirSync("../../Backend/Controller");
// fs.writeFileSync("../../Backend/Controller/app.js", "data");

//! 7) <===== deleting a folder/directory =====>
//? method name ==> rmdirSync()
// syntax ==> fs.rmdirSync("path of the folder")

//~ for nested structure, delete the inner layer first

// fs.rmdirSync("./demo"); //~ --> using this, we can delete only empty folders
// console.log("folder deleted");

// fs.unlinkSync("./demo/app.js");
// fs.rmdirSync("./demo");
// console.log("deleted");

// fs.rmdirSync("./demo", { recursive: true }); // do delete all files and folders recursively

//! ============= asynchronous execution using fs (callbacks) =====================

//! 1) creating a file
//? method name ==> writeFile()
// syntax --> writeFile("path/name of the file.ext", "data", callback)

//~ error first callback --> in nodeJS, inside callback functions, the first parameter is mostly reserved for error, this is called as error first callback

// console.log(1);

// fs.writeFile('./demo.py', 'def', (err) => {
//   if (err) console.log(err);
//   console.log('file created');
// });

// setTimeout(() => {
//   console.log('setTimeout');
// }, 3000);

// console.log(2);
// console.log(3);

//! 2)===== reading a file
//? method name ==> readFile()
// syntax --> readFile("path", "encoding", callback)

// console.log(1);

// fs.readFile('./demo.py', 'utf-8', (err, xyz) => {
//   if (err) console.log(err);
//   console.log(xyz);
// });

// console.log(2);
// console.log(3);

//! 3)===== appending a file
//? method name ==> appendFile()
// syntax --> appendFile("path", "data", callback)

// console.log(1);

// fs.appendFile('./demo.py', 'this is second line', (err) => {
//   if (err) console.log(err);
//   console.log(':File updated');
// });

// console.log(2);
// console.log(3);

//! 4) ============ deleting a file
//! 5) ============ creating a folder
//! 6) ============ deleting a folder
//! 7) ============ renaming a folder/file

//! ============= asynchronous execution using fs (promise --> then/catch) =====================
let fsPromise = require('fs').promises;
// let fsPromise = require('fs/promises');
// import fsP from "fs/promises"

//~ 1) creating a file
//? method name ==> writeFile()
// syntax --> writeFile("path/name of the file.ext", "data").then().catch()

// console.log(1);
// let writePromise = fsPromise.writeFile('./java.txt', 'data');
// // console.log(readPromise);
// writePromise
//   .then(() => {
//     console.log('file created');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// console.log(2);
// console.log(3);

//~ 2) reading a file
//? method name ==> readFile()
// syntax --> readFile("path/name of the file.ext", "encoding").then().catch()
// let readPromise = fsPromise.readFile('./java.txt', 'utf-8');
// console.log(readPromise);
// readPromise
//   .then((payload) => {
//     console.log('payload:', payload);
//     console.log('file read');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//~ 3) deleting a file
//? method name ==> unlink()
// syntax --> unlink("path of file").then().catch()
// let deletePr = fsPromise.unlink('./java.txt');
// deletePr
//   .then(() => {
//     console.log('file deleted');
//   })
//   .catch((err) => {
//     console.log('something went wrong');
//   });

// let promise = new Promise((res, rej) => {
//   let a = 1;
//   if (a == 2) {
//     res({ name: 'xyz' });
//   } else {
//     rej([1, 2, 3, 4]);
//   }
// });

// console.log(promise);

// promise
//   .then((a) => {
//     console.log(a);
//     console.log('promise is resolved');
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('some error');
//   });

//~ updating a file, creating a folder, renaming a file/ folder, deleting a folder

//! ============= asynchronous execution using fs (promise --> async and await) =====================
//~ async and await both are keywords which are used together.
//~ async in used in function declaration
//~ await is used inside function body ( await --> will suspend the function execution in call stack till the promise is resolved)
//~ async function always returns a promise.

/* async function greet() {
  return 'hELLO';
}
let data = greet();
console.log(data); */

/* async function getTodos() {
  console.log('first function');
  let output = await fetch('https://jsonplaceholder.typicode.com/posts');
  console.log('api called1');
}
async function getTodos2() {
  console.log('second function');
  let output = await fetch('https://jsonplaceholder.typicode.com/posts');
  console.log('api called2');
}

getTodos();
getTodos2(); */

//! 1) =================== creating a file
//? method name ==> writeFile()

async function createFile() {
  await fsPromise.writeFile('./demo.txt', 'data to be written');
  console.log('file created');
}

// createFile();

//! 2) =================== reading a file
//? method name ==> readFile()

async function readFile() {
  let data = await fsPromise.readFile('./demo.txt', 'utf-8');
  console.log('file read', data);
}
// readFile();

//! name of the global object in NodeJS ==> Global {
//! fs:{readFile:Function}
//! readFile: Function
//!}

//~ ques> create this structure ==> "Project/backend/app.js" (outer layer)
async function createStructure() {
  await fsPromise.mkdir('./Project');
  await fsPromise.mkdir('./Project/backend');
  await fsPromise.writeFile('./Project/backend/app.js', "console.log('hi')");
  console.log('created');
}

// createStructure();

//! deleting a file and folder, renaming a file/folder

//? createReadStream, createWriteStream:TODO

//~ Buffers ==> it is an array like object which holds binary data, which is used to store data in memory (RAM).
//! Buffer size cannot be controlled or set. it cannot be modified also throughout the operation.
//! once the operation is done, buffer is destroyed

//~ Streams ==> streams in nodeJS are used to transfer data from source to destination
//! Transferring the data from source to destination in continuous chunks (or pieces of data) is called as streaming.
//! In NodeJS there are total 4 types of streams:
//? 1) Readable Stream: it is used to read the data in continuous chunks
// method name ==> createReadStream()

//? 2) Writable Stream: it is used to write the data in continuous chunks
// method name ==> createWriteStream()

//? 3) Duplex Stream: it is used to perform read and write together in continuous chunks.

//? 4) Transform Stream: it is similar to duplex, but data can be modified.

//~ example for Readable Stream
// let read = fs.createReadStream('./index.html', 'utf-8');
// this createReadStream() emits a event --> "data"
// to execute an event --> on("name of the event", cb)
// console.log(read);
// read.on('data', (chunk) => {
//   console.log(chunk);
// });
//! default chunk size is 64Kb, {higherWaterMark: 100}

//  RAM = 8GB, free = 3.5GB, maximum buffer size ==> formula (OS)
//? Theoretical max buffer size ≈ Free RAM / Number of parallel buffers
//? Node.js hard limit for a single Buffer ≈ 2 GB
//? Practical safe chunk size: 64 KB – 16 MB

//~ example for Writable Stream
// let result = fs.createWriteStream('./demo.txt');
// result.write('data to be written', () => {
//   console.log('file written');
// });

//~ example for Duplex Stream
let read = fs.createReadStream('./index.html', 'utf-8'); // read
let write = fs.createWriteStream('./demo.txt'); // write
//! pipe() ==> source.pipe(destination), pipe() connects source and destination
read.pipe(write);
console.log('file written');
