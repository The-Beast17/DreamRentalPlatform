const transporter = require('../config/nodemailerConfig');
const dotenv = require('dotenv');
dotenv.config();

module.exports.contactMessageController = async (req, res) => {
    const { fullName, emailAddress, subject, messageContent } = req.body;
    
    const mailOptions = {
      from: emailAddress,
      to: process.env.DREAMRENTAL_EMAIL, // Your email to receive contact form messages
      subject: subject,
      text: `Message from ${fullName} (${emailAddress}):\n\n${messageContent}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).send({ message: 'Failed to send message' });
    }
 
  };