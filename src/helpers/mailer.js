import transporter from '../services/email.service';

const sendEmail = async (mailConfigurations) => {
  const result = await transporter(
    // mailConfigurations,
    {
      email: mailConfigurations.to,
      subject: mailConfigurations.subject,
      content: mailConfigurations.html,
    },
  );
  return result;
};

export default sendEmail;
