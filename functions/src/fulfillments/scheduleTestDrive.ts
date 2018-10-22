import { BasicCard, Image, SimpleResponse, Suggestions } from 'actions-on-google';
import * as moment from 'moment';
import { BACKGROUND_IMAGE } from './../constants';
import { sendText } from './../services/messageNotification';
import { logger } from './../utils/logger';

const scheduleTestDrive = (conv, { dateTime }) => {
  const formatedDateTime = moment(new Date(dateTime.date_time)).format('LLLL');

  logger('scheduleTestDrive intent: dateTime', { dateTime, formatedDateTime });

  const textResponse = `You are set. Your test drive appointment was scheduled for  ${formatedDateTime}. Check your email inbox for more details.`;

  // TODO: Use just for demo til the POC been approved
  // sendText(completeFormatedDate);

  conv.close(new SimpleResponse({ text: textResponse, speech: textResponse }));

  const selectedCar = (conv.user.storage as any).selectedCar;

  if (conv.screen) {
    conv.close(
      new BasicCard({
        text: `Enjoy your test drive of ${selectedCar.make} ${
          selectedCar.model
          } at ${formatedDateTime}`,
        title: `Appointment message from ${selectedCar.dealerName}`,
        image: new Image({
          url: BACKGROUND_IMAGE,
          alt: 'Test Drive Appointment'
        })
      })
    );
  }

  conv.ask('Would you like to check others cars or end your search for today?');

  // Suggestions will be placed at the end of the response
  conv.ask(new Suggestions("Let's search another car", 'No thanks, end my search'));
};

export default scheduleTestDrive;
