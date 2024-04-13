import transporter from '../services/email.service';

const sendEmail = async (mailConfigurations) => {
  const result = await transporter.sendMail(mailConfigurations);
  return result;
};

export default sendEmail;
