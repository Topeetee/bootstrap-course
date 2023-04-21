const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
let Subscriber =  require("./model");
const path = require('path');

app.use(express.json());


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
    user: 'temitopeakinwekomi28@gmail.com',
    pass: 'Topee_tee28'
  }
});


// Body parser middleware
// app.use(express.urlencoded());
// Subscribe route



app.post('/', async (req, res) => {
  const email = req.body.email;
  res.status(200).sendFile(path.join(__dirname, '/server.html'));;

  // Store email in MongoDB
  try {
    const subscriber = new Subscriber({ email: email });
    await subscriber.save();
    
    const mailOptions = {
      from: 'temitopeakinwekomi28@gmail.com',
      to: email,
      subject: 'Subscription confirmation',
      text: 'You have subscribed successfully!'
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});






// Server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
