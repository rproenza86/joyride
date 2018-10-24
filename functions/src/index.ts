import * as functions from 'firebase-functions';
import { dialogflow } from 'actions-on-google';

import defaultWelcomeIntent from './fulfillments/defaultWelcomeIntent';
import searchCar from './fulfillments/searchCar';
import selectCar from './fulfillments/selectCar';
import scheduleTestDrive, {
  askForSignInPermissionConfirmation,
  askForDateTimeConfirmation
} from './fulfillments/scheduleTestDrive';
import endConversation from './fulfillments/endConversation';
import noInputHandler from './fulfillments/noInputHandler';

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', defaultWelcomeIntent as any);

// Handle the Dialogflow intent named 'vehicle make and model'.
// The intent collects the parameters named 'make' and 'model' for a desire car to search.
app.intent('search car', searchCar as any);

// Handle the Dialogflow intent named 'vehicle make and model'.
// The intent collects the parameters named 'make' and 'model' for a desire car to search.
app.intent('select car', selectCar as any);
app.intent('select car by list', selectCar as any); // Listen the event "actions_intent_OPTION" of the list selection

// Handle the Dialogflow intent named 'book joyride'.
// The intent collects the parameters named 'date' and 'time' to be use in the test drive appointment schedule.
app.intent('book joyride', scheduleTestDrive as any);
app.intent('actions.intent.PERMISSION', askForSignInPermissionConfirmation as any);
app.intent('actions.intent.DATETIME', askForDateTimeConfirmation as any);

// Handle the Dialogflow intent named 'end conversation'.
app.intent('end conversation', endConversation as any);

// Handle the Dialogflow intent named 'end conversation'.
app.intent('no input handler', noInputHandler as any);

export const searchVehicle = functions.https.onRequest(app);
