const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
let Subscriber =  require("./model")

require('dotenv').config();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI
// MongoDB connection
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!');
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

// Body parser middleware
app.use(express.json());

// Subscribe route
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  // Store email in MongoDB
  const subscriber = new Subscriber({ email: email });
  subscriber.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Send confirmation email
      const mailOptions = {
        from: 'temitopeakinwekomi28@gmail.com',
        to: email,
        subject: 'Subscription confirmation',
        text: 'You have subscribed successfully!'
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log('Email sent: ' + info.response);
          res.sendStatus(200);
        }
      });
    }
  });
});







// Server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
