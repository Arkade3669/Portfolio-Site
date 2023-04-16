app.post('/contact', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Do something with the form data, like sending an email or saving it to a database

  res.send('Your amazing message has been sent!');
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Display contact form
app.get('/', function(req, res) {
  res.render('contact');
});

// Handle form submission
app.post('/submit', function(req, res) {
  // Create Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'YOUR_EMAIL_ADDRESS',
      pass: 'YOUR_EMAIL_PASSWORD'
    }
  });

  // Send email
  const mailOptions = {
    from: req.body.name + ' <' + req.body.email + '>',
    to: 'YOUR_EMAIL_ADDRESS',
    subject: 'New Contact Form Submission',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thank you for your message!');
    }
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
