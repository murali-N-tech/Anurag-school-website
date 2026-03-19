const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter (the service that will send the email)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Anurag School Website <${process.env.EMAIL_FROM}>`,
    to: options.to,
    subject: options.subject,
    html: options.html, // We'll send a formatted HTML email
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;