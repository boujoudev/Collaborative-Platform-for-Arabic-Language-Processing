const { sgMail, sender } = require('./sendgrid.config.js'); // Réutilise ton setup existant
const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} = require('./emailTemplates.js');

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const msg = {
      to: email,
      from: sender,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    const response = await sgMail.send(msg);
    console.log('Verification email sent:', response[0].statusCode);
  } catch (error) {
    console.error('Error sending verification email:', error.response?.body || error.message);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await sgMail.send({
      to: email,
      from: sender,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log('Password Reset email sent:', response[0].statusCode);
  } catch (error) {
    console.error('Error sending reset email:', error.response?.body || error.message);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  try {
    const response = await sgMail.send({
      to: email,
      from: sender,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log('Success Password Reset email sent:', response[0].statusCode);
  } catch (error) {
    console.error('Error sending success email:', error.response?.body || error.message);
    throw new Error(`Error sending success email: ${error}`);
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  
};
