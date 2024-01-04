const nodemailer = require('nodemailer');

// Create a transport object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken:process.env.OAUTH_ACCESS_TOKEN,
    expires: 3600
  }
});

// Function to send a verification email
const sendVerificationEmail = (email, verificationLink) => {
  const mailOptions = {
    from: '',
    to: email,
    subject: 'Dunsel Network account validation',
    html: `<div>
    <h1>DUNSEL NETWORK</h1>
    </br>
    <p>Click <a href="${verificationLink}">here</a> to verify your email.
    </p>
    </div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendVerificationEmail;