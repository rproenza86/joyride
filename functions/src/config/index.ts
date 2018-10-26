import * as functions from 'firebase-functions';

export const accountSid = functions.config().twilio.sid;
export const authToken = functions.config().twilio.token;
export const clientId = functions.config().joyride.client_id;
export const mailgunUser = functions.config().mailgun.user;
export const mailgunPass = functions.config().mailgun.pass;