/*
============================================
; Title: index.js
; Author: Jocelyn Dupuis
; Date: 07/20/2023
; Description: JavaScript file for appointments 
============================================
*/

// Requires  mongoose
const mongoose = require('mongoose');

// Appointment schema with fields
let appointmentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true }
});

// Exports the appointments module
module.exports = mongoose.model('Appointment', appointmentSchema);