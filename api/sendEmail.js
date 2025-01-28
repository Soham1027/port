// api/sendEmail.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

    // Basic validation
    if (!contactName || !contactEmail || !contactMessage) {
      return res.status(400).json({ message: 'Name, Email, and Message are required.' });
    }

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use another email provider if you prefer
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS, // Use environment variable for password
      },
    });

    // Define the email options
    const mailOptions = {
      from: contactEmail,
      to: 'sohamghayal02@gmail.com', // Your recipient email
      subject: contactSubject || 'Contact Form Submission',
      html: `
        <p>Email from: ${contactName}</p>
        <p>Email address: ${contactEmail}</p>
        <p>Message: </p>
        <p>${contactMessage}</p>
      `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  } else {
    // Method Not Allowed
    res.status(405).json({ message: 'Method not allowed' });
  }
}
