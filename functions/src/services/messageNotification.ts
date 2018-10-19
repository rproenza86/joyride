import { logger } from './../utils/logger';
import { accountSid, authToken } from './../config';

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

export const sendText = (time, receiver = null, carImage = null, emailLandingUrl = null) => {
  client.messages
    .create({
      body: `
            Your test drive was scheduled for ${time}!
            ${emailLandingUrl ||
              'https://shop.dealer.com/sp/service/email-landing?connectionId=5ba3bd2357de900001c3782b&vin=JN1AZ4FH0HM940255'}
        `,
      to: receiver || '+17866248576',
      from: '+16789318275 ',
      mediaUrl:
        carImage ||
        'https://firebasestorage.googleapis.com/v0/b/universal-cars-browser.appspot.com/o/test-drive.jpg?alt=media&token=6b2472b5-3083-4b2b-926c-5ba42a11443f'
    }) // Text this number // From a valid Twilio number
    .then(message => logger('*** Twilio message submission data ***', message))
    .catch(error => logger('*** Error using Twilio to send message notification***', error));
};
