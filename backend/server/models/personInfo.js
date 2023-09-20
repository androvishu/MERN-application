const mongoose = require("mongoose");


const person = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    gmail: { type: String, require: true },
    country: { type: String, require: true },
    state: { type: String, require: true },
    city: { type: String, require: true },
    gender: { type: String, require: true },
    dob: { type: String, require: true },
}, { timestamps: true });

const Person = mongoose.model('person', person);
module.exports = Person;