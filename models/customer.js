/*
============================================
; Title: customer.js
; Author: Jocelyn Dupuis
; Date: 06/21/2023
; Description: Customer file for Pets-R-Us App
============================================
*/

// Requires mongoose
const mongoose = require('mongoose');

// Customer schema with customer fields: id and email
let customerSchema = new mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
});

// Exports the customer module
module.exports = mongoose.model('Customer', customerSchema);


