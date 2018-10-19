import { BasicCard, Image, SimpleResponse, Suggestions } from 'actions-on-google';
import * as moment from 'moment';
import { BACKGROUND_IMAGE } from './../constants';
import { sendText } from './../services/messageNotification';
import { logger } from './../utils/logger';

const scheduleTestDrive = (conv, { date, time }) => {
  const formatedDate = moment(new Date(date[0])).format('LL'); // better capture for date

  const formatedTime = moment(new Date(time[0])).format('hh:mm:ss a'); // better capture for time

  const completeFormatedDate = ` ${formatedDate} ${formatedTime}`;

  logger('scheduleTestDrive intent: date, time', {
    date,
    formatedDate,
    time,
    formatedTime,
    completeFormatedDate
  });

  const textResponse = `You are set. Your test drive appointment was scheduled for  ${completeFormatedDate}. Check your email inbox for more details.`;

  // TODO: Use just for demo til the POC been approved
  // sendText(completeFormatedDate);

  conv.close(new SimpleResponse({ text: textResponse, speech: textResponse }));

  const selectedCar = (conv.user.storage as any).selectedCar;

  if (conv.screen) {
    conv.close(
      new BasicCard({
        text: `Enjoy your test drive of ${selectedCar.make} ${
          selectedCar.model
          } at ${formatedDate} ${formatedTime}`,
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
