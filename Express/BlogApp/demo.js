class A {
  constructor(a) {
    console.log(a);
    console.log("constructor of a called");
  }
  hello(params) {
    console.log("hi");
  }
}
// let objectOfA = new A();
// objectOfA.hello();

class B extends A {
  constructor() {
    super();
  }
}

let objectOfA = new A(10);
let objectOfB = new B(10);
objectOfB.hello();
