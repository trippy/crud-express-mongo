// server.js
console.log('May Node be with you');

// we use express by requiring it
const express = require('express');
const app = express();


// app.get(endpoint, callback)
// when you visit localhost:300 you're actually visiting localhost:3000/
// in this case, browsers send a GET request to the endpoint
// and we are requesting for `/`

// `callback` tells the server what to do when the requested endpoint matches the endpoint stated. It takes two arguements: A `request` object and a `response` object

// we normally abbreviate `request` to `req` and `response` to `res`
// app.get('/', function (req, res) {
//   // let's write `hello world` back to the browser
//   // we do this by using a `send` method that comes with the `response` object
//   res.send('Hello World');
// });

// to change the above method to ES6, we can replace the `function()` with an ES6 arrow function. The below code is the same as the above code!
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// great work!
// next, let's change `server.js` so we serve up an `index.html` page back to the browser. To do this, we use the `sendFile` method that's provided by the `res` object
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // console.log(__dirname);
  // we got back `~/peach/crud-express-mongo/index.html` in our browser!
});

// note: now we have changed from `res.send()` to `res.sendFile()` !
// in the `sendFile` method above, we told Express to serve an index.html file that can be found in the root of your project folder. We don't have that file yet. Let's make it now. `touch index.html`
// we create a server that browsers can connect to
app.listen(3000, function() {
  console.log('listening on port 3000');
});

// next, we installed nodemon using `npm install nodemon --save-dev`
// the `--save-dev` flag here since we're only using nodemon when developing stuff
// we're not using it on the actual server, so `--save-dev` adds Nodemon as a
// `devDependency` in the `package.json` file

// next, we added `"dev": "nodemon server.js"` to the `package.json` file
// this lets us run `nodemon server.js` without the `./node_modules...` preamble
// now, we can run `npm run dev` to trigger `nodemon server.js`

// CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (POST, GET, PUT and DELETE requests respectively). This is what each operation does:

// Create (POST) - Make something
// Read (GET)- Get something
// Update (PUT) - Change something
// Delete (DELETE)- Remove something

// Browsers can only perform a CREATE operation if they send POST request to the server. This POST request can be triggered through JavaScript or through a <form> element.

// Let’s figure out how to use a <form> element to create new entries for this Star Wars quote application for now. We’ll examine how to send requests via JavaScript later.

// To send a POST request through a <form>, you need to add the <form> element to your index.html file.

// You need three things on this form element:

// 1. An `action` attribute
// 2. A `method` attribute
// 3. `name` attributes on each `<input>` elements within the form

// next, we added form to `index.html`
// the `method` tells browsers what kind of request to send. In this case, we use `POST` because we're sending a `POST` request.

// the `action` attribute tells the browser where to send the `POST` request. In this case, we're sending the `POST` request to `/quotes`

// we can handle this `POST` request with a `post` method in `server.js`. The `path` path should be the value you placed in the `action` attribute
app.post('/quotes', (req, res) => {
  console.log('Heloooooooooo!');
});

// great! now we know that Express is handling the form for us
// the next question is... how do we get the input values with Express?
// turns out... express doesn't handle reading data from the `<form>` element on it's own. we have to add another package called `body-parser` to gain this functionality.

// `npm install body-parser --save`
// body-parser is a `middleware` - they help tidy up the `request` object before we use them. express lets us use middleware with the `use` method !

// note: make sure you place your body-parser before your CRUD handlers!
// EOF: duplicating file and creating new `server.js` file, while renaming this file
// To see the continuation of this file, see `server-withDatabaseNotes.js`
