import * as functions from 'firebase-functions';

export const accountSid = functions.config().twilio.sid;
export const authToken = functions.config().twilio.token;