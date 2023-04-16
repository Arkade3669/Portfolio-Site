//oh damn i forgor how to js i need help :pray emoji:
//OH NEVERMIND
// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create an instance of the express application
const app = express();

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve a form for users to fill out
app.get('/contact', (req, res) => {
  res.send(`
    <h1>Contact Me</h1>
    <form method="POST" action="/contact">
      <label for="name">Name</label>
      <input type="text" name="name" required>
      <br>
      <label for="email">Email</label>
      <input type="email" name="email" required>
      <br>
      <label for="message">Message</label>
      <textarea name="message" required></textarea>
      <br>
      <button type="submit">Send</button>
    </form>
    <p>Don't worry, I won't share your email with any Nigerian princes!</p>
  `);
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });

  // Set up email message options
  const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'youremail@gmail.com',
    subject: `New message from ${name}`,
    text: `Email: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Oops, something went wrong. Please try again later.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thanks for contacting me! I will get back to you as soon as possible.');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
    