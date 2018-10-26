import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import { logger } from './../utils/logger';
import { mailgunUser, mailgunPass } from '../config';

const sendEmailMailgun = (options = null, viewPath = null) => {
  return new Promise(function(fullfill, reject) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: mailgunUser,
        pass: mailgunPass
      }
    });

    transporter.use(
      'compile',
      hbs({
        viewPath: viewPath || './views/emails',
        extName: '.hbs'
      })
    );
    // this return a promise object
    transporter.sendMail(options, (error, info) => {
      if (error) reject(error);
      else fullfill(info);
    });
  });
};

export const sentJoyrideEmailNotification = (
  userInfo = { name: ' ', email: '', profileImg: '', date: '' }
) => {
  // sent autoresponse to client
  const mailClientOptions = {
    from: `"MCOD Consulting" <info@atomiccoders.com>`,
    to: userInfo.email,
    subject: `Esteemed ${userInfo.name}, thanks for use Joyride`,
    template: 'confirm',
    context: userInfo
  };

  sendEmailMailgun(mailClientOptions)
    .then(values => {
      const result = {
        message: `Messages send to MCOD Consulting and ${userInfo.name} <${userInfo.email}>`,
        success: 1,
        error: {}
      };
      logger('sentJoyrideEmailNotification', { result });
    })
    .catch(error => {
      const result = { message: 'An error happend.', success: 0, error };
      logger('sentJoyrideEmailNotification error', { result });
    });
};
