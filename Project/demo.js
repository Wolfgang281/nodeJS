class A {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log("getName called");
    console.log(this.name);
  }
}

// let objOfA = new A("abc");
// objOfA.getName();

A.getName();

//! every non-static method or variables can only be accessed by using object of that class

let a = 20;
if (a == 20) next();
console.log("false");

//! for sending mail
//? 1) add emailVFT and it's expiry
//? 2) added configuration for nodemailer
//? 3) created an email service(function)
//? 4) after registering send the email verification link to the registered email
