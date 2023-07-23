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
const mongoose = require('mongoose');
const fs = require('fs');

// Imports customer model
const Customer = require('./models/customer');

// Imports appointment model
const Appointment = require('./models/appointment');

// Express application created
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection and port value
const CONN = 'mongodb+srv://web340_admin:d46WcswC8POiYFMO@cluster0.tydee4p.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

// Connects MongoDB and output message
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

// Image(s) access to site
app.use(express.static('public'));
app.use('/public/images/', express.static('./public/images'));

// Sets view and view engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Sites view (index)
app.get('/', (req, res) => {
    res.render('index');
});

// Sites view (grooming)
app.get('/grooming', (req, res) => {
    res.render('grooming');
});

// Sites view (boarding)
app.get('/boarding', (req, res) => {
    res.render('boarding');
});

// Sites view (training)
app.get('/training', (req, res) => {
    res.render('training');
});

// Sites view (register)
app.get('/register', (req, res) => {
    res.render('register');
});

// Sites view (appointments)
app.get('/my-appointments', (req, res) => {
    res.render('my-appointments');
});

app.get('/api/appointments/:email', async (req, res) => {
    try {
      const appointments = await Appointment.find({ email: req.params.email });
      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/booking', (req, res) => {
    const services = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'public/data/services.json'), 'utf8'));
    
    res.render('booking', { services });
  });
  
  // Post route for when user submits form
  app.post('/register', (req, res) => {
    const { customerId, email } = req.body;
  
    const newCustomer = new Customer({ customerId, email });
  
    newCustomer.save()
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
          console.log(error);
        res.status(500).send('Error registering customer.');
      });
  });
  
  // Post route for when user submits form
  app.post('/appointments', (req, res) => {
    const { custFirstName, custLastName, custId, custEmail, service } = req.body;
  
    const newAppointment = new Appointment({ custFirstName, custLastName, custId, custEmail, service });
  
    newAppointment.save()
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('Error registering an appointment.');
      });
  });
  
  // Get route for list of customers
  app.get('/customer-list', (req, res) => {
    Customer.find()
      .then((result) => {
        res.render('customer-list', { customers: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  // Sets the port and the console log
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log('Press Ctrl-C to terminate');
  });