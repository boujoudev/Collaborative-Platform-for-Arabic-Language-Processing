const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Configure ton API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// L'expéditeur doit être une adresse vérifiée sur SendGrid
const sender = {
  email: process.env.FROM_EMAIL, // ex: "noreply@tondomaine.com"
  name: "TAL-Arab Platform",
};

module.exports = { sgMail, sender };
