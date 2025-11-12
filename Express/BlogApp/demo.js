// class A {
//   constructor(a) {
//     console.log(a);
//     console.log("constructor of a called");
//   }
//   hello(params) {
//     console.log("hi");
//   }
// }
// // let objectOfA = new A();
// // objectOfA.hello();

// class B extends A {
//   constructor() {
//     super();
//   }
// }

// let objectOfA = new A(10);
// let objectOfB = new B(10);
// objectOfB.hello();

// let emp = {
//   name: "abc",
//   age: 34,
//   address: {
//     city: "bangalore",
//     state: "karnataka",
//   },
// };

// console.log(Object.keys(emp));
// console.log(Object.values(emp));

let error = {
  errorLabelSet: {},
  errorResponse: {
    index: 0,
    code: 11000,
    errmsg:
      'E11000 duplicate key error collection: blogAPP.blogs index: title_1 dup key: { title: "places" }',
    keyPattern: {
      title: 1,
    },
    keyValue: {
      title: "places",
    },
  },
  index: 0,
  code: 11000,
  keyPattern: {
    title: 1,
  },
  keyValue: {
    title: "places",
    something: 1,
  },
};
console.log(Object.keys(error.keyValue)[0]);
