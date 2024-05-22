const nodemailer = require('nodemailer');

function generateRandomHex() {
    const length = 16;

    const randomBytes = new Uint8Array(length / 2);
    window.crypto.getRandomValues(randomBytes);

    return Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function generateUrl(randomHex, user_id) {
    const baseUrl = 'http://localhost:3000/signup';

    // Parameters to add
    const params = {
        userid: user_id,
        verify: randomHex,
    };
    
    // Create a URL object
    const urlObj = new URL(baseUrl);
    
    // Use URLSearchParams to append parameters
    const urlParams = new URLSearchParams(params);
    
    // Append the parameters to the URL
    urlObj.search = urlParams.toString();
    
    const finalUrl = urlObj.toString();

    return finalUrl;
}

export async function sendEmail(email, username, user_id) {
  const randomHex = generateRandomHex();
  const verificationUrl = generateUrl(randomHex, user_id);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"SolutionVault" <${process.env.EMAIL_USER}>`,
    to: `${email}`,
    subject: "Hello",
    text: `Hello ${username}, Please verify email: ${verificationUrl}`,
    html: `<p>Hello ${username}, </p><p>Please verify email: ${verificationUrl}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};