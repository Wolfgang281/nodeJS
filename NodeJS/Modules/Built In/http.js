//! HTTP ==> Hypertext Transfer Protocol. in order to communicate with the server, we need to use HTTP protocol. it is used when communication is between server and client or server and server.

//? get ==> this is used for fetching a resource.
//? post ==> this is used when a resource sent to server
//? delete ==> this is used for deleting a resource
//? put ==> this is used for updating a resource (fully)
//? patch ==> this is used for updating a resource (partially)

//! http module ==> it is a built-in module, through which we can create servers

//~ 1) import http module
//~ 2) use createServer() --> this accepts one parameter, which is a callback function. and store it in a variable
//? this callback function accepts two parameters --> req and res (objects)
//~ 3) assign a port number using listen() --> inside this, pass portNumber and one callback function(not mandatory)

// let {createReadStream} = require("fs")
// let http = require("http")

/* import fs from 'fs';
import http from 'http';
// console.log(http);

let server = http.createServer((req, res) => {
  //! write() is used to display message on the UI
  //   res.write('hello from server');
  //! to end the req-res cycle use end()
  //   res.end();
  //~====================-======
  //   res.end('this is from end()');
  //~===========================
  //   res.write('first statement');
  //   res.write('second statement');
  //   res.end();
  //   res.write('third statement'); // this will crash the server
  //~===========================
  // res.writeHead(201, { 'Content-Type': 'text/plain' });
  // res.end('hello from server');
  //~=========================== Sending html file===============
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.writeHead(200, 'msg', { 'Content-Type': 'text/html' });
  let payload = fs.createReadStream('./index.html', 'utf-8');
  payload.pipe(res); // pipe() internally calls the end()/ req-res cycle is ended
  //~=========================== Sending css file===============
  // res.writeHead(200, { 'Content-Type': 'text/css' });
  // let payload = createReadStream('./styles.css', 'utf-8');
  // payload.pipe(res);
  //~=========================== Sending json file===============
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // createReadStream('./data.json', 'utf-8').pipe(res);
});

server.listen(9000, (err) => {
  if (err) console.log(err);
  console.log(`server running at port 9000`);
}); */

//! to close the server, press "ctrl+c" on terminal
//! after every modification, restart the server

//! if the current port is occupied, we will get an error : "address already in use".
//! node --watch filename.js

//   res.writeHead(StatusCode, { 'Content-Type': '' });
// statusCode -->
//? (processing) --> 1XX (101, 100, 103),
//? (success) --> 2XX (201, 202, 204),
//? (redirection) --> 3XX (300, 301, etc.)
//? (client error) -->  4XX (400, 401, 404)
//? (server error) --> 5XX (500, 501, etc.)

// console.log(http);

//~ content-type --> defines what content is being sent to the client
// for string messages --> "text/plain"
// for html files --> "text/html"
// for css files --> "text/css"
// for json files --> "application/json"

//! utf-8 ==> unicode transformation format. it defines the encoding value which specifies the number of bits the conversion in going to take (8 bit)
//? encoding --> utf-8 --> 8bit binary form store

// https://nodejs.org/en --> home page
// https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
// https://nodejs.org/en/about
// https://nodejs.org/en/download

//~ Routing ==> handling user's multiple requests
// endpoints ==?  "/about", "/learn"

import http from 'http';

let server = http.createServer((req, res) => {
  // res.end(req.url);
  // let endpoint = req.url;
  // if (endpoint === '/about') res.end('this is about page');
  // else {
  //   res.end('something else');
  // }

  //! home page =====
  if (req.url === '/') {
    // for --< localhost:9000 or localhost:9000/
    res.end('this is home/landing page');
  }
  //! about me page =====
  else if (req.url === '/register') {
    // for --< localhost:9000/me
    // db calls
    // updation
    res.end('this is about page'); // later, a json response will be sent

    /* let jsonResponse = {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: {}, // optional
    }; */
  }
  //! download page =====
  else if (req.url === '/download') {
    // for --< localhost:9000/download
    res.end('this is download page');
  }
  //! 404 page =====
  else {
    // for --< localhost:9000/xyz
    res.end('page not found');
  }
});

server.listen(9000, (err) => {
  if (err) console.log(err);
  console.log('running');
});

// localhost:9000
// localhost:9000/
