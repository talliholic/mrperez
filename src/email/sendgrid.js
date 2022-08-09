const sendgrid = require("@sendgrid/mail");
const key = process.env.SENDGRID;

sendgrid.setApiKey(key);

const sendPassword = (email, link) => {
  sendgrid.send({
    to: email,
    from: "ivan.perez@gcb.edu.co",
    subject: "Reset password for mrperez.herokuapp.com",
    html:
      "<p>Hello from Mr. Perez. Here's a link to reset your password.</p><p>This link is valid for 24 hours.</p> " +
      link,
  });
};

module.exports = sendPassword;
