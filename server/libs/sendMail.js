const config = require('../config');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const transport = nodemailer.createTransport(mailgun({
  auth: {
    api_key: config.mailer.api_key,
    domain: config.mailer.domain
  }
}));

module.exports = async (options) => await transport.sendMail({
  from: {
    name: config.app_name,
    address: `support@${config.mailer.domain}`
  },
  to: {
    name: options.to.name,
    address: options.to.address
  },
  subject: options.subject,
  html: options.html
});

