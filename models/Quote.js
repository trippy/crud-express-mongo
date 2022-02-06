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
  name: String,
  quote: String,
  label: Array,
  createdAt: Date
});

// ... we use mongoose's `model` method to create the model
module.exports = mongoose.model('Quote', quoteSchema)
