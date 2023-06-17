/*
============================================
; Title: index.js
; Author: Jocelyn Dupuis
; Date: 06/15/2023
; Description: JavaScript file for Pets-R-Us 
============================================
*/

// Strict mode
"use strict";

// Imports and paths required
const express = require('express');
const path = require('path');

// Express application created
const app = express();

// Sets view and view engines
app.set('views', './views');
app.set('view engine', 'ejs');

// Variable created and given port value 
const PORT = process.env.PORT || 3000;

// Sites view (index)
app.get('/', (req, res) => {
    res.render('index')
})

// Sites view (grooming)
app.get('/grooming', function(req, res) {
    res.render('grooming', { });
});

// Image(s) access for site
app.use(express.static('public'));
app.use('/public/images/', express.static('./public/images'));

// Starts the server on port 3000
app.listen(PORT, () => {
    console.log('Hello World application started and listening on PORT ' + PORT);
});