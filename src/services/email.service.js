import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'princeineza@gmail.com',
    pass: 'zigp jdcg ojih uxeh',
  },
});

export default transporter;
