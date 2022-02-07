// server.js
console.log('Running file:: ' + __filename);

// Verbose comments in server-withNotes.js & server-withDatabaseNotes.js

/*****************
 * requires
 * ***************/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

/***************
 * middleware
 * *************/

// body-parser is a `middleware` - they help tidy up the `request` object before we use them. express lets us use middleware with the `use` method !

// note: make sure you place your body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
// here, the `urlencoded` method within body-parser tells body-parse to extract data from the `<form>` element and add them to the `body` property in the `request` object

// you should be able to see values from the `<form>` element inside `req.body` now
// try doing a `console.log` and see what it is !

/***************
 * route handling
 * *************/
/*
CRUD::
Create (POST) - Make something
Read (GET)- Get something
Update (PUT) - Change something
Delete (DELETE)- Remove something
*/

// use method `sendFile` in `res` object
// with parameter `__dirname`
// to send GET request to current directory + `/index.html` endpoint

app.get('/', (req, res) => {
  console.log('/ route GET request made');
  res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  console.log('/quotes route POST request made');
  console.log(req.body)
});


/**********************
 * database connection
 * ********************/

const url = 'mongodb://localhost:27017/star-wars';
mongoose.connect(url, { useNewUrlParser: true });

/*
to check whether the connection has succeeded, we can use the `open` event
to check whether the connection failed, we use the `error` event
*/
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url);
});
db.on('error', err => {
  console.error('connection error:', err);
});

/****************
 * load db models
 * **************/

// Load the quote model
const Quote = require('./models/Quote');

// Create a new quote
const yoda = new Quote ({
  name: 'Yoda',
  quote: 'No! Try not! Do or do not, there is no try.'
});

// note: `new Quote` creates the quote in memory. It has not been saved to the database yet. +++++++++++ To save to the database, you can run the `save` method
yoda.save( (error, document) => {
  if (error) console.error(error);
  console.log(document);
});

// ++++++++++++ the following is the same as above, but done with promises
function saveQuote (quote) {
  const q = new Quote(quote)
  return q.save()
}

saveQuote({
  name: 'Master Yoda',
  quote: 'Train yourself to let go of everything you fear to lose.'
})
  .then(doc => { console.log(doc) })
  .catch(error => { console.error(error) })

// ++++++++++++ you can also use the `await` keyword if you have an async function
const getQuotes = async _ => {
  return {
    name: 'Yoda Best',
    quote: 'The more we learn, the more we discover how much we do not know.'
  }
}
getQuotes()
  .then(value => {
    console.log("getQuotes", value)
  })

// ++++++++++++ !!! or, alternatively, after some creative thinking ...
const quotesTable = async _ => {
  const quotes = [
  {
    "name": 'Yoda Bomb',
    "quote": 'The greatest teacher, failure is.'
  },
  {
    "name": 'The Mandalorian',
    "quote": 'This is the way.'
  },
  {
    "name": 'Placeholder-1',
    "quote": 'Content'
  },
  {
    "name": 'Placeholder-2',
    "quote": 'Content'
  },
  {
    "name": 'Placeholder-2',
    "quote": 'Duped Content'
  },
  {
    "name": 'Placeholder-3',
    "quote": 'Content',
    "label": ['More Content', 'Even More Content']
  },
  {
    "name": 'Placeholder-4',
    "quote": 'New Content'
  }];
  quotes.forEach((q) => {
    // console.log(q.name)
    // console.log(q.quote)
    // ...

    // you can run saves in this function with the next 2 lines
    // let qp = new Quote(q) // wip
    // qp.save(qp)

    // or break it up into multiple async functions
    saveQuote(q)
      .then(doc => { console.log(doc) })
      .catch(error => { console.error(error) })
  });
  return(quotes);
}
quotesTable()
  .then(value => { console.log("quotesTable", value) })
  .catch(error => { console.log(error) })

console.log("quotesTable()", quotesTable);

// `db.quotes.remove({})` will remove all documents in the `quotes` collection
// `db.quotes.deleteMany({})` will remove all documents in the `quotes` collection

/***************
 * port listener
 * *************/

app.listen(3000, () => {
  console.log('Listening on port: 3000');
});

