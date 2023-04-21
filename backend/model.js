const mongoose = require('mongoose');

// Subscriber schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});


// Subscriber model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;