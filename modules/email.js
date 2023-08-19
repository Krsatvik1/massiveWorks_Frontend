const nodemailer    = require("nodemailer");
const dotenv        = require("dotenv");
dotenv.config();
let date_ob         = new Date()
var date = ("0" + date_ob.getDate()).slice(-2);

// current month
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
var year = date_ob.getFullYear();

// current hours
var hours = date_ob.getHours();

// current minutes
var minutes = date_ob.getMinutes();

// current seconds
var seconds = date_ob.getSeconds();

var dateH = date + "-" + month + "-" + year;
var time = hours + ":" + minutes + ":" + seconds;

function timeRev() {
  (date_ob = new Date()), (date = ("0" + date_ob.getDate()).slice(-2));

  // current month
  month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  year = date_ob.getFullYear();

  // current hours
  hours = date_ob.getHours();

  // current minutes
  minutes = date_ob.getMinutes();

  // current seconds
  seconds = date_ob.getSeconds();

  dateH = date + "-" + month + "-" + year;
  time = hours + ":" + minutes + ":" + seconds;
}
timeRev();

async function mail(data) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "email-smtp.ap-south-1.amazonaws.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.AWS_SES_USERNAME,
      pass: process.env.AWS_SES_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: '"Website" <' + process.env.WEBSITE_MAIL_ADDRESS + ">", // sender address
    to: process.env.WEBSITE_MAIL_TO, // list of receivers
    replyTo: data.email,
    subject: "Submission of form on website by " + data.name, // Subject line
    text:
      data.name +
      " has submitted form on website. On " +
      dateH +
      " " +
      time +
      ". Mobile- " +
      data.mobileNo +
      " Email- " +
      data.email, // plain text body
    html: `<!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Website Form Submission</title>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
              <link href="https://pirata.design/Thunder-BlackLC.css" rel="stylesheet">
          </head>
          
          <body style=" font-family: ThunderBlack , sans-serif;color:black; font-size:5rem; margin: 0;">
              <div style="padding: 2rem;">
                  <div style="height: 3rem">
                      <img src="https://pirata.design/logo.png" style="height: 3rem">
                  </div>
                  <p
                      style=" width: 100%; padding-top:2rem; font-family: ThunderBlack, sans-serif;line-height: 0.8; font-size: 6rem; margin: 1rem 0;">
                      <img src="https:pirata.design/newmessage.png" style="width: 50%;">
                  </p>
                  <div style=" width: 100%; font-family: 'Instrument Serif', serif;">
                      <p style="font-size: 2rem; margin-bottom: 1rem;">Here are the details:</p>
                      <table>
                          <tr>
                              <td style="padding: 0.5rem 0; padding-right: 2rem;">
                                  <p style="font-size: 1.4rem; line-height: 0.8;">Name: <span
                                          style="font-weight: 400;">${data.name}</span></p>
                              </td>
                              <td>
                                  <p style="font-size: 1.4rem; line-height: 0.8;">Email: <span
                                          style="font-weight: 400;">${data.email}</span></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0.5rem 0; padding-right: 2rem;">
                                  <p style="font-size: 1.4rem; line-height: 0.8;">Phone: <span
                                          style="font-weight: 400;">${data.phone}</span></p>
                              </td>
                              <td>
                                  <p style="font-size: 1.4rem; line-height: 0.8;">Query: <span
                                          style="font-weight: 400;">${data.query}</span></p>
                              </td>
                          </tr>
                      </table>
                      <p style="font-style: italic; color:#5b5b5b; font-size: 1.2rem;">Timestamp: ${dateH} ${time}</p>
                  </div>
              </div>
          </body>
          
          </html>`,
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = mail;
