const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.DREAMRENTAL_EMAIL, // Your Gmail address
    pass: process.env.DREAMRENTAL_PASSWORD // App password generated from Gmail
  }
});

module.exports = transporter;
