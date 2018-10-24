import {
  BasicCard,
  Image,
  SimpleResponse,
  Suggestions,
  DateTime,
  Permission
} from 'actions-on-google';
import * as moment from 'moment';
import { BACKGROUND_IMAGE } from './../constants';
import { sendText } from './../services/messageNotification';
import { logger } from './../utils/logger';
import { getSelectedCar } from '../selectors/car';
import { selectUserName, selectUserGivenName } from '../selectors/user';
import { updateUser } from '../actions/userActions';

const notifySuccessfulBookText = (conv, formatedDateTime, name) => {
  const useName = name ? name + '! ' : '';
  const textResponse = `Good news ${useName}Your are set. Your test drive appointment was scheduled for  ${formatedDateTime}. Check your email inbox for more details.`;
  conv.close(new SimpleResponse({ text: textResponse, speech: textResponse }));
};

const notifySuccessfulBookCard = (conv, formatedDateTime, name) => {
  const selectedCar = getSelectedCar(conv);
  const useName = name ? name + '! ' : '';

  conv.close(
    new BasicCard({
      text: `${useName}Enjoy your JOYRIDE on the  ${selectedCar.make} ${
        selectedCar.model
      } at ${formatedDateTime}`,
      title: `Appointment message from ${selectedCar.dealerName}`,
      image: new Image({
        url: BACKGROUND_IMAGE,
        alt: 'Test Drive Appointment'
      })
    })
  );
};

const endJoyrideBooking = conv => {
  conv.ask('Would you like to check others cars or end your search for today?');
  conv.ask(new Suggestions("Let's search another car", 'No thanks, end my search'));
};

export const askForDateTime = conv => {
  const userGivenName = selectUserGivenName(conv);
  const options = {
    prompts: {
      initial: `When would you like to book your JOYRIDE ${userGivenName}?`,
      date: 'What day was that?',
      time: 'What time?'
    }
  };
  conv.ask(new DateTime(options));
};

export const askForDateTimeConfirmation = (conv, params, confirmationGranted) => {
  if (confirmationGranted) {
    const { month, year, day } = confirmationGranted.date;
    const name = selectUserName(conv);
    const preFormatedDateTime = `${year}-${month}-${day} ${confirmationGranted.time.hours}`;
    const formatedDateTime = moment(preFormatedDateTime).format('LLLL');

    logger('askForDateTimeConfirmation intent: dateTime', {
      formatedDateTime,
      preFormatedDateTime,
      name,
      mail: conv.user.email,
      confirmationGranted
    });

    notifySuccessfulBookText(conv, formatedDateTime, name);

    if (conv.screen) {
      notifySuccessfulBookCard(conv, formatedDateTime, name);
    }

    endJoyrideBooking(conv);
  } else {
    conv.ask("Hey! We really need a date to book your JOYRIDE. Let's try again.");
    askForDateTime(conv);
  }
};

export const askForSignInPermission = conv => {
  const options = {
    context: 'Almost done booking your JOYRIDE',
    // Ask for more than one permission. User can authorize all or none.
    permissions: ['NAME']
  };
  conv.ask(new Permission(options as any));
};

export const askForSignInPermissionConfirmation = (conv, params, confirmationGranted) => {
  logger('Initial params for intent: askForSignInPermissionConfirmation', {
    params,
    confirmationGranted,
    user: conv.user
  });

  updateUser(conv, conv.user.name);

  if (confirmationGranted) {
    askForDateTime(conv);
  } else {
    conv.ask(`Okay, no worries! You always can come back and book a JOYRIDE another day.`);
    conv.ask('Would you like to check others cars?');
    // Suggestions will be placed at the end of the response
    conv.ask(new Suggestions('Nissan Altima', 'Honda Accord', 'Nissan Rogue'));
  }
};

const scheduleTestDrive = conv => {
  const user = selectUserName(conv);

  if (user) {
    askForDateTime(conv);
  } else {
    askForSignInPermission(conv);
  }

  // TODO: Use just for demo til the POC been approved
  // sendText(completeFormatedDate);
};

export default scheduleTestDrive;
