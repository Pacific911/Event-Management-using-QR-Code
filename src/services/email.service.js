// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// async function transporter({ email, subject, content }) {
//   console.log(process.env.SENDER);
//   console.log(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: email, // Change to your recipient
//     from: process.env.SENDER, // Change to your verified sender
//     subject,
//     text: 'and easy to do anywhere, even with Node.js',
//     html: content,
//   };
//   sgMail.send(msg).then((res) => {
//     console.log(res);
//   });
//   // return result;
// }
// export default transporter;

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // port: 465,
  // secure: true,
  auth: {
    user: 'managingevents8@gmail.com',
    pass: 'Managingevent250',
  },
});

export default transporter;
