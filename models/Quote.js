const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
permitted SchemaTypes:
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
*/

// Once we've created `quoteSchema` ...
const quoteSchema = new Schema({
  name: { type: String, unique: true },
  quote: { type: String, unique: true },
  label: { type: Array }
});

// ... we use mongoose's `model` method to create the model
module.exports = mongoose.model('Quote', quoteSchema)
